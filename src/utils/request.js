import axios from 'axios'
import qs from 'qs'
import { local } from './local.js'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.timeout = 5000

axios.interceptors.request.use(config => {
  NProgress.start()
  const token = local.get('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

axios.interceptors.response.use(res => {
  const { code, msg } = res.data
  if (code !== undefined && msg !== undefined) {
    if (code === 0 || code === '00') {
      Message({
        message: msg,
        type: 'success'
      })
    } else {
      Message({
        message: msg,
        type: 'error'
      })
    }
  }
  NProgress.done()
  return res
})

const req = {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params
        })
        .then(data => {
          resolve(data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(params))
        .then(data => {
          resolve(data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default req
