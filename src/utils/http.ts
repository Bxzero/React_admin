import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  // baseURL: '/api',

  timeout: 5000,
})

// request
instance.interceptors.request.use((config) => {
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  config.data = qs.stringify(config.data)
  // ... cookie...
  console.log('[request]')
  return config
})
// response
instance.interceptors.response.use((res) => {
  const { status } = res
  switch (status) {
    case 200:
      console.log('[]status:', status)
      break
    case 500:
      // redirect 500page
      console.log('[]status:', status)
      break
    case 403:
      // redirect 403page
      console.log('[]status:', status)
      break
  }
  return res
})

export const get = (url: string, data?: any) => {
  return instance
    .get(url, data)
    .then((res) => res.data)
    .catch((err) => err)
}
export const post = (url: string, data?: any) => {
  return instance
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => err)
}
export const put = (url: string, data?: any) => {
  return instance
    .put(url, data)
    .then((res) => res.data)
    .catch((err) => err)
}
export const patch = (url: string, data?: any) => {
  return instance
    .patch(url, data)
    .then((res) => res.data)
    .catch((err) => err)
}
export const dele = (url: string, data?: any) => {
  return instance
    .delete(url, data)
    .then((res) => res.data)
    .catch((err) => err)
}
export default instance
