const host = process.env.VUE_APP_BASE_URL
const port = process.env.VUE_APP_PORT
const path = process.env.VUE_APP_PATH
export const urlWithoutPath = port ? `${host}:${port}` : `${host}`
const url = urlWithoutPath + path

export default url
