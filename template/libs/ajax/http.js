/*
 * @Author: HJM
 * @Description:
 * @Date: 2020-08-12 11:01:38
 * @LastEditors: M
 * @LastEditTime: 2020-08-14 14:12:15
 */
import router from '../../router/index'
import axios from 'axios'
import { Notice, Message } from 'view-design'
// 创建axios实例
const apiService = axios.create({
  timeout: 150000 // 请求超时时间
  // baseURL: '/zuul'
})

export function successMessage (msg) {
  Message.success(msg)
}

export function errorMessage (msg) {
  Notice.error({
    title: '错误提示',
    desc: msg,
    duration: 6
  })
}

// Request 拦截器
apiService.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem('token')
  const userDeptCode = window.sessionStorage.getItem('userDeptCode')
  const userId = window.sessionStorage.getItem('userId')
  const userName = window.sessionStorage.getItem('userName')
  let Base64 = require('js-base64').Base64;
  const userNames = Base64.encode(userName);
  config.url = config.url + '/' + token + '/' + userDeptCode
  if (token.length > 6) {
    config.url = config.url + '?access_token=' + token
  }
  if(userId && userName){
      config.headers['userId'] = `${userId}`
      config.headers['userName'] = `${userNames}`
  }
  return config
}, error => {
  errorMessage(error)
  return Promise.reject(error)
})

// Response 拦截器
apiService.interceptors.response.use(
  (response) => {
    const ret = response.data
    if (ret.resultCode === '-9999') {
      router.replace('/login')
    }
    // 业务级异常
    if (response.status !== 200) {
      // errorMessage(ret.message);
      return Promise.reject(ret) // 破坏promise链, reject之后的promise不在执行then(),而是直接调用catch()
    } else if (response.data.resultCode === '-9999') {
      errorMessage(ret.resultData)
      // return Promise.reject(ret)
      return Promise.resolve(response)
    } else if(response.status == 201){
        errorMessage("用户token失效，请重新登录")
        router.replace('/login')
    }else {
      return Promise.resolve(response)
    }
    // return Promise.resolve(response);
  },
  (error) => {
    const ret = error.response
    // 系统级异常
    if (ret.status === 400) {
      // errorMessage(ret.data.error_description || error.message); // 登陆失败、参数错误等
      errorMessage('参数错误')
    } else if (ret.status === 403 || ret.status === 401) {
      // errorMessage(ret.data.message); // 无访问权限
      errorMessage('无权限访问')
    }
    else {
      // errorMessage('异常：[' + error.message + ']');
      // errorMessage('服务器遇到错误，无法完成请求')
    }
    // return Promise.reject(error)
  }
)
export default apiService
