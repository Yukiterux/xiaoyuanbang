// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据源分类
export function findDataSourceType() {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceCategoryTree',
    params: {}
  })
}
// 获取数据源
export function findAllDataSources(catalogCode) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceListByCatalogId',
    params: {catalogCode: catalogCode}
  })
}

// 获取数据表
export function findAllTable(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllTables',
    params: {...params}
  })
}

// 获取数据字段
export function findAllColumn(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllColumnByTableId',
    params: {...params}
  })
}

// 用字段ID(数组类型)来获取所有字段的详细信息
export function getAllColumnById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmColumnInfoListByColumnIdList',
    params: {columnIdList: params}
  })
}

// 获取数据源下的表是否包含主键
export function isExistPrimary(tableId) {
  return api({
    method: 'get',
    url: appServer.data + 'checkPrimaryKeyExistByTableId',
    params: {tableId: tableId}
  })
}
