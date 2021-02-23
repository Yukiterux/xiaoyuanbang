// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 标签编辑
export function metaDataPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaData/page',
    params: {...params}
  })
}

// 模型删除
export function metaDataDelete(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaData/delete',
    params: {...params}
  })
}

// 元模型新增编辑保存
export function saveOrUpdate(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaData/saveOrUpdate',
    data: {...params}
  })
}

// 根据模型Id查模型信息
export function metaDataGet(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaData/get',
    params: {...params}
  })
}

// 标签单条提交审核
export function submitMetaData(params, data) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaData/submit',
    params: {...params},
    data: {...data}
  })
}

// 分页获取模型扩展属性
export function metaDataAttrPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataAttr/page',
    params: {...params}
  })
}

// 分页获取模型扩展属性
export function metaDataAttrList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataAttr/list',
    params: {...params}
  })
}

// 扩展属性保存
export function metaDataAttrSaveOrUpdate(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaDataAttr/saveOrUpdate',
    data: {...params}
  })
}

// 根据扩展属性Id查扩展属性
export function metaDataAttrGet(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataAttr/get',
    params: {...params}
  })
}

// 删除扩展属性
export function metaDataAttrDelete(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataAttr/delete',
    params: {...params}
  })
}

// 关系 主动列表
export function metaDataRelationshipPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataRelationship/page',
    params: {...params}
  })
}

// 主动关系保存
export function metaDataRelationshipSaveOrUpdate(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaDataRelationship/saveOrUpdate',
    data: {...params}
  })
}

// 根据主动关系Id查属性
export function metaDataRelationshipGet(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataRelationship/get',
    params: {...params}
  })
}

// 删除主动关系
export function metaDataRelationshipDelete(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataRelationship/delete',
    params: {...params}
  })
}

export function initRelationChart(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataRelationship/initRelationChart',
    params: {...params}
  })
}

export function codeCount(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaData/codeCount',
    params: {...params}
  })
}

export function metaDataImport(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaDataBaseInfo/importMetaData',
    processData: false,
    contentType: false,
    data: params
  })
}

export function metaDataImportPreview(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaData/dataImportPreview',
    processData: false,
    contentType: false,
    data: params
  })
}

export function metaDataAttrDataImport(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaDatalAttr/dataImport',
    processData: false,
    contentType: false,
    data: params
  })
}

export function metaDataAttrDataImportPreview(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaDataAttr/dataImportPreview',
    processData: false,
    contentType: false,
    data: params
  })
}

