// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取有所索引信息
export function listCmIndex(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listCmIndex',
    params: {...params}
  })
}
// 通过主键获取索引信息
export function getCmIndex(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmIndex',
    params: {...params}
  })
}

// 检索配置模板保存
export function saveOrUpdateTConfigTemplateDeploy(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveOrUpdateTConfigTemplateDeploy',
    data: {...params}
  })
}
// ========================检索配置列表接口=================================
// 查询所有配置的检索模板
export function pageTConfigTemplateDeploy(params) {
  return api({
    method: 'get',
    url: appServer.template + 'pageTConfigTemplateDeploy',
    params: {...params}
  })
}
// 删除配置的检索页面
export function delTConfigTemplateDeploy(params) {
  return api({
    method: 'post',
    url: appServer.template + 'delTConfigTemplateDeploy',
    params: {...params}
  })
}
// 根据主键查配置信息  回显
export function getTConfigTemplateDeployById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTConfigTemplateDeployById',
    params: {...params}
  })
}

// 查询界面信息
export function getDeployHomeInfo(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getDeployHomeInfo',
    params: {...params}
  })
}
// 查询接口
export function pageEsSearchInfo(params) {
  return api({
    method: 'get',
    url: appServer.template + 'pageEsSearchInfo',
    params: {...params}
  })
}
// ES检索详情
export function getEsSearchDetail(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getEsSearchDetail',
    params: {...params}
  })
}
