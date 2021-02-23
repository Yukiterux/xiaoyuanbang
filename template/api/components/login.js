import api from '@/libs/ajax/http'
import login from '@/libs/ajax/login'
// 引用服务名
import {appServer} from '../appServer'

export function defaultKaptcha() {
  return login({
    method: 'get',
    url: appServer.system + 'defaultKaptcha'
  })
}

export function userLogin(params) {
  return login({
    method: 'post',
    url: appServer.system + 'userLogin',
    data: {...params}
  })
}

export function getPublicKey(params) {
  return login({
    method: 'get',
    url: appServer.system + 'oauth/getPublicKey',
    params: {...params}
  })
}

export function userLoginByUuid(params) {
  return login({
    method: 'get',
    url: appServer.system + 'userLoginByUuid',
    params: {...params}
  })
}

export function userLoginByUserId(params) {
  return login({
    method: 'get',
    url: appServer.system + 'userLoginByUserId',
    params: {...params}
  })
}

export function updateUserPassword(params) {
  return api({
    method: 'post',
    url: appServer.system + 'updateUserPassword',
    params: {...params}
  })
}

export function getSystemSettings() {
  return login({
    method: 'get',
    url: appServer.system + 'oauth/getSystemSettings'
  })
}

// 统一身份认证平台登录
export function umpLogin() {
  return login({
    method: 'get',
    url: appServer.system + 'oauth/umpLogin'
  })
}

// 统一身份认证平台登录
export function getUserInfo(params) {
  return login({
    method: 'get',
    url: appServer.system + 'oauth/getUserInfo',
    params: {...params}
  })
}

// 统一身份认证平台登录
// export function userLoginByUuid(params) {
//   return login({
//     method: 'get',
//     url: appServer.system + '/userLoginByUuid',
//     params: {...params}
//   })
// }

export function userLoginBysuzhouSsoId(params) {
  return login({
    method: 'get',
    url: appServer.system + 'suzhouSsoLogin',
    params: {...params}
  })
}
