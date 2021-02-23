// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
export function getAllAuthorityPage(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getAllAuthorityPage',
    params: {...params}
  })
}

export function getAuthorityTree(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getAuthorityTree',
    params: {...params}
  })
}

// 获取权限菜单
export function findAllSysAuthority(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findAllSysAuthority',
    params: {...params}
  })
}

export function findMenuAuthority(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findMenuAuthority',
    params: {...params}
  })
}

// 保存新增或编辑数据
export function saveSysAuthority(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveSysAuthority',
    data: {...params}
  })
}

// 根据权限ID获取
export function getSysAuthorityByAuthorityId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getSysAuthorityByAuthorityId',
    params: {...params}
  })
}

// 逻辑删除
export function updateStateByAuthorityId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'updateStateByAuthorityId',
    params: {...params}
  })
}

// 校验权限名称是否重复
export function checkAuthorityName(params) {
  return api({
    method: 'get',
    url: appServer.system + 'checkAuthorityName',
    params: {...params}
  })
}

// 获取模板列表
export function getTemplateDisplayList(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTConfigTemplateDisplayList',
    params: {...params}
  })
}

// 根据id获取模板param
export function getTemplateDisplayParam(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTemplateDisplayJsonParamByTempDisplayId',
    params: {...params}
  })
}

// 获取模板地址
export function getConfigTemplate(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTConfigTemplateById',
    params: {...params}
  })
}

// 查询界面信息
export function getTConfigTemplateDeploys(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTConfigTemplateDeploys',
    params: {...params}
  })
}

// 查询界面信息
export function checkAuthorityPath(params) {
  return api({
    method: 'get',
    url: appServer.system + 'checkAuthorityPath',
    params: {...params}
  })
}

export function moveAuthority(params) {
  return api({
    method: 'get',
    url: appServer.system + 'moveAuthority',
    params: {...params}
  })
}

export function findAuthoritys(params) {
  params.mode = 'dgms'
  return api({
    method: 'get',
    url: appServer.system + 'findAuthoritys',
    params: {...params}
  })
}
