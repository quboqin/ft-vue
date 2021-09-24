import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

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
  params?: T,
  mockData?: U,
): Promise<U | void> {
  return new Promise((resolve) => {
    if (mockData) return resolve(mockData)
    return resolve(request(method, path, params))
  })
}
