import axios from 'axios'
import Cookies from 'js-cookie'

// axios 配置
// axios.defaults.timeout = 5000
let Token = Cookies.get('token')
axios.defaults.headers.post['x-token'] = Token
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'

axios.defaults.headers.get['x-token'] = Token
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'

// axios.defaults.withCredentials = true
// Axios实现请求重试
axios.defaults.retry = 5 // 重试次数
// axios.defaults.retryDelay = 1000 // 重试延时
const UrlAddress = 'http://139.196.4.27:1001' // 测试服

// axios.interceptors.request.use(
//   config => {
//     let Token = Cookies.get('token')
//     if (Token) {
//       config.headers.Authorization = Token
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )
export function get (url, params = {}) {
  let Token = Cookies.get('token')
  axios.defaults.headers.get['x-token'] = Token
  return new Promise((resolve, reject) => {
    axios.get(UrlAddress + url, {
      params: params
    }).then(response => {
      resolve(response.data)
      // console.log(response)
      // if (!response.data) {
      //   this.$message({
      //     message: '网络请求错误',
      //     type: 'error'
      //   })
      // }
    }).catch(err => {
      reject(err)
    })
  })
}

export function post (url, data = {}, headers = {}) {
  let Token = Cookies.get('token')
  axios.defaults.headers.post['x-token'] = Token
  return new Promise((resolve, reject) => {
    axios.post(UrlAddress + url, data, headers).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function shuxin () {
  if (Cookies.get('token')) {
    return location.reload()
  }
}
