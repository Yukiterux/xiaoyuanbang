// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function addSysFeedback(params) {
  return api({
    method: 'post',
    url: appServer.system + 'addSysFeedback',
    data: {...params}
  })
}

export function findSysUsers(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findSysUsers',
    params: {...params}
  })
}

export function deleteSysUserByUserId(params) {
  return api({
    method: 'post',
    url: appServer.system + 'deleteSysUserByUserId',
    params: {...params}
  })
}

export function updateUserState(params) {
  return api({
    method: 'post',
    url: appServer.system + 'updateUserState',
    params: {...params}
  })
}

export function resetUserPassword(params) {
  return api({
    method: 'post',
    url: appServer.system + 'resetUserPassword',
    params: {...params}
  })
}

export function updateUnlockSysUser(params) {
  return api({
    method: 'post',
    url: appServer.system + 'updateUnlockSysUser',
    params: {...params}
  })
}

export function getSysUserByUserId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getSysUserByUserId',
    params: {...params}
  })
}

export function saveSysUser(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveSysUser',
    data: {...params}
  })
}

export function upateSysUser(params) {
  return api({
    method: 'post',
    url: appServer.system + 'upateSysUser',
    data: {...params}
  })
}

export function findDeptments(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findDeptments',
    params: {...params}
  })
}

export function findAllDept() {
  return api({
    method: 'get',
    url: appServer.system + 'findAllDept'
  })
}

export function addSysUserRoles(params) {
  return api({
    method: 'post',
    url: appServer.system + 'addSysUserRoles',
    params: {...params}
  })
}

export function findRolesInfo(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findRolesInfo',
    params: {...params}
  })
}


export function checkUserName(params) {
  return api({
    method: 'get',
    url: appServer.system + 'checkUserName',
    params: {...params}
  })
}


export function findUserName(params) {
  return api({
    method: 'get',
    url: appServer.system + 'baseUser/getUserInfoByUserIdUsedInPage',
    params: {...params}
  })
}