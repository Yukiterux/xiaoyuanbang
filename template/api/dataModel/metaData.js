// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 导入
export function importExcel(params) {
  return api({
    method: 'post',
    headers: {'Content-type': 'multipart/form-data'},
    url: appServer.data + 'importExcel',
    params: {...params}
  })
}

// 数据模型列表====成功
export function getMetadataInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getMetadataInfo',
    params: {...params}
  })
}

// 模型名称校验 === 成功
export function getMetadataInfoByName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getMetadataInfoByName',
    params: {...params}
  })
}

// 模型代码
export function getMetadataInfoByTableName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getMetadataInfoByTableName',
    params: {...params}
  })
}

// 保存模型信息
export function saveOrUpdateMetadataInfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveOrUpdateMetadataInfo',
    data: {...params}
  })
}

// 获取模型分类信息
export function getByIdMetaDataCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getByIdMetaDataCategory',
    params: {...params}
  })
}

// 获取模型信息
export function getMetadataInfoById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getMetadataInfoById',
    params: {...params}
  })
}

// 获取模型项
export function getAllMetadataItemListByInfoId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllMetadataItemListByInfoId',
    params: {...params}
  })
}

export function getRelationColumnsByItemId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getRelationColumnsByItemId',
    params: {...params}
  })
}

//
export function saveRelationColumnsSort(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveRelationColumnsSort',
    data: {...params}
  })
}

export function deleteMetadataInfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'deleteMetadataInfo',
    params: {...params}
  })
}

// 获取模型关系
export function getAllRelationTableInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllRelationTableInfo',
    params: {...params}
  })
}

export function getMetadataItemByName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getMetadataItemByName',
    params: {...params}
  })
}

export function getMetadataItemprimaryKey(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getMetadataItemprimaryKey',
    params: {...params}
  })
}

export function saveMetadataItem(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveMetadataItem',
    data: {...params}
  })
}

export function getMetadataItem(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getMetadataItem',
    params: {...params}
  })
}

export function getMetadataItemByID(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getMetadataItemByID',
    params: {...params}
  })
}

export function deleteMetadataItem(params) {
  return api({
    method: 'post',
    url: appServer.data + 'deleteMetadataItem',
    params: {...params}
  })
}

export function getRelationColumnByIdData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getRelationColumnById',
    params: {...params}
  })
}

export function getDataSourceCategoryTree(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceCategoryTree',
    params: {...params}
  })
}

export function getDataSourceListByCatalogId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceListByCatalogId',
    params: {...params}
  })
}

export function getAllTableByDataSourceId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllTableByDataSourceId',
    params: {...params}
  })
}

export function getAllColumnsByTableId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllColumnsByTableId',
    params: {...params}
  })
}

export function getRelationColumnById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getRelationColumnById',
    params: {...params}
  })
}

export function pageAllRelationTableInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageAllRelationTableInfo',
    params: {...params}
  })
}

export function deleteRelationTable(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteRelationTable',
    params: {...params}
  })
}

export function listAllRelationTableInfoData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listAllRelationTableInfo',
    params: {...params}
  })
}

// 查询数据关系
export function getDataTableInfo(id, name) {
  return api({
    method: 'get',
    url: appServer.data + 'dataTableInfo/getDataTableInfo',
    params: {id: id, name: name}
  })
}
