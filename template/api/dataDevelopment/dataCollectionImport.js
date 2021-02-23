// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function dataCollectionImport(params) {
  return api({
    method: 'get',
    url: appServer.task + 'dataCollectionImport',
    params: {...params}
  })
}

export function grtDatasourceCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceCategoryTree',
    params: {}
  })
}

export function getCmDataSourceListByCategoryId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceListByCatalogId',
    params: {...params}
  })
}

export function saveTableInfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveTableInfo',
    data: {...params}
  })
}

export function queryTableNameList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'queryTableNameList',
    params: {...params}
  })
}

export function getAllColumnByTableId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllColumnByTableId',
    params: {...params}
  })
}

export function save(params) {
  return api({
    method: 'post',
    url: appServer.data + 'save',
    data: {...params}
  })
}

export function getDataCollectionList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataCollectionList',
    params: {...params}
  })
}

export function deleteById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteById',
    params: {...params}
  })
}

export function getTableInfoListByDatasourceIdAndTableName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getTableInfoListByDatasourceIdAndTableName',
    params: {...params}
  })
}

export function getColumnTypeListByDatasourceId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getColumnTypeListByDatasourceId',
    params: {...params}
  })
}

export function getPrimaryKeyInfoByTableId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getPrimaryKeyInfoByTableId',
    params: {...params}
  })
}
// 根据字段id 查询信息
export function getColumnValueById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getColumnValueById',
    params: {...params}
  })
}

export function findAllDataSources(catalogCode) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceListByCatalogId',
    params: {catalogCode: catalogCode}
  })
}