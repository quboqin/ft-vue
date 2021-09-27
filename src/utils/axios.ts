import axios from 'axios'

import { getCurrentSession, getUser } from '@/utils/aws-auth'

const port = process.env.VUE_APP_PORT
const url = process.env.VUE_APP_BASE_URL
axios.defaults.baseURL = port ? `${url}:${process.env.VUE_APP_PORT}` : `${url}`
axios.defaults.timeout = process.env.VUE_APP_TIMEOUT
  ? +process.env.VUE_APP_TIMEOUT
  : 5000
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(
  async (config) => {
    const session = await getCurrentSession()
    if (session) {
      config.headers.Authorization = `Bearer ${session
        .getIdToken()
        .getJwtToken()}`
      const user = await getUser()
      config.headers.userId = user.username
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 204) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    if (error.status === 401) console.log('login failed')
    return Promise.reject(error)
  },
)

function get<T, U>(path: string, params: T): Promise<U> {
  return new Promise((resolve, reject) => {
    axios
      .get(path, {
        params: params,
      })
      .then((response) => {
        resolve(response.data.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function post<T, U>(path: string, params: T): Promise<U> {
  return new Promise((resolve, reject) => {
    axios
      .post(path, params)
      .then((response) => {
        resolve(response.data.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function put<T, U>(path: string, params: T): Promise<U> {
  return new Promise((resolve, reject) => {
    axios
      .put(path, params)
      .then((response) => {
        resolve(response.data.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function del<T, U>(path: string, params: T): Promise<U> {
  return new Promise((resolve, reject) => {
    axios
      .delete(path, {
        params: params,
      })
      .then((response) => {
        resolve(response.data.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function request<T, U>(
  method: string,
  path: string,
  params: T,
): Promise<U | void> {
  if (method === 'get') {
    return get(path, params)
  } else if (method === 'del') {
    return del(path, params)
  } else if (method === 'post') {
    return post(path, params)
  } else if (method === 'put') {
    return put(path, params)
  } else {
    return new Promise<void>((resolve) => resolve())
  }
}

export function result<T, U>(
  method: string,
  path: string,
  params?: T | undefined,
  mockData?: U | undefined,
): Promise<U | void> {
  return new Promise((resolve) => {
    if (mockData) return resolve(mockData)
    return resolve(request(method, path, params))
  })
}
