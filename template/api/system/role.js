// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function findSysRoles(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findSysRoles',
    params: {...params}
  })
}

export function getAuthoritysByRoleId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getAuthoritysByRoleId',
    params: {...params}
  })
}

export function deleteSysRoleByRoleId(params) {
  return api({
    method: 'post',
    url: appServer.system + 'deleteSysRoleByRoleId',
    params: {...params}
  })
}

export function checkRoleNameApi(params) {
  return api({
    method: 'get',
    url: appServer.system + 'checkRoleName',
    params: {...params}
  })
}

export function saveSysRole(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveSysRole',
    data: {...params}
  })
}

export function addSysRoleAuthoritys(params) {
  return api({
    method: 'post',
    url: appServer.system + 'addSysRoleAuthoritys',
    data: {...params}
  })
}

export function getSysRoleByRoleId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getSysRoleByRoleId',
    params: {...params}
  })
}

export function findAuthorityInfo(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findAuthorityInfo',
    params: {...params}
  })
}

export function findAllSysAuthority(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findAllSysAuthority',
    params: {...params}
  })
}
export function getRoleManagementByName(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getRoleManagementByName',
    params: {...params}
  })
}
export function updateRoleManagement(params) {
  return api({
    method: 'get',
    url: appServer.system + 'updateRoleManagement',
    params: {...params}
  })
}
export function saveAndUpdateRoleManagement(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveAndUpdateRoleManagement',
    data: {...params}
  })
}
export function deleteRoleManagementById(params) {
  return api({
    method: 'get',
    url: appServer.system + 'deleteRoleManagementById',
    params: {...params}
  })
}
export function findRoleManagementById(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findRoleManagementById',
    params: {...params}
  })
}
export function saveOrUpdate(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveOrUpdateManagement',
    data: {...params}
  })
}
