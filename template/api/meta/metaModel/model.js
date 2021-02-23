// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 标签编辑
export function metaModelPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/page',
    params: {...params}
  })
}

// 模型删除
export function metaModelDelete(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/delete',
    params: {...params}
  })
}

// 元模型新增编辑保存
export function saveOrUpdate(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaModel/saveOrUpdate',
    data: {...params}
  })
}

// 根据模型Id查模型信息
export function metaModelGet(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/get',
    params: {...params}
  })
}

// 标签单条提交审核
export function submitMetaModel(params, data) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaModel/submit',
    params: {...params},
    data: {...data}
  })
}

// 分页获取模型扩展属性
export function metaModelAttrPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelAttr/page',
    params: {...params}
  })
}

// 分页获取模型扩展属性
export function metaModelAttrList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelAttr/list',
    params: {...params}
  })
}

// 扩展属性保存
export function metaModelAttrSaveOrUpdate(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaModelAttr/saveOrUpdate',
    data: {...params}
  })
}

// 根据扩展属性Id查扩展属性
export function metaModelAttrGet(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelAttr/get',
    params: {...params}
  })
}

// 删除扩展属性
export function metaModelAttrDelete(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelAttr/delete',
    params: {...params}
  })
}

// 关系 主动列表
export function metaModelRelationshipPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelRelationship/page',
    params: {...params}
  })
}

// 主动关系保存
export function metaModelRelationshipSaveOrUpdate(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaModelRelationship/saveOrUpdate',
    data: {...params}
  })
}

// 根据主动关系Id查属性
export function metaModelRelationshipGet(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelRelationship/get',
    params: {...params}
  })
}

// 删除主动关系
export function metaModelRelationshipDelete(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelRelationship/delete',
    params: {...params}
  })
}

export function initRelationChart(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelRelationship/initRelationChart',
    params: {...params}
  })
}

export function codeCount(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/codeCount',
    params: {...params}
  })
}

export function metaModelDataImport(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaModel/dataImport',
    processData: false,
    contentType: false,
    data: params
  })
}

export function metaModelDataImportPreview(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaModel/dataImportPreview',
    processData: false,
    contentType: false,
    data: params
  })
}

export function metaModelAttrDataImport(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaModelAttr/dataImport',
    processData: false,
    contentType: false,
    data: params
  })
}

export function metaModelAttrDataImportPreview(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaModelAttr/dataImportPreview',
    processData: false,
    contentType: false,
    data: params
  })
}

//
export function findMetaModelList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelVersion/list',
    params: {...params}
  })
}

export function getByName(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/getByName',
    params: {...params}
  })
}
export function getByCode(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/getByCode',
    params: {...params}
  })
}

// 状态更新
export function updateMetaModelStatus(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/updateMetaModelStatus',
    params: {...params}
  })
}


//删除被动关系
export function removeMetaModelConnect(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelRelationship/delete',
    params: {...params}
  })
}