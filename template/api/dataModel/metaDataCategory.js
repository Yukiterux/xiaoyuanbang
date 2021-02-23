// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 保存
export function saveMetadataRelation(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveMetadataRelation',
    params: {...params}
  })
}

//
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

export function getAllMetadataItemListByInfoId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllMetadataItemListByInfoId',
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
