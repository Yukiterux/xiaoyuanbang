// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function getDatasourceList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllDataSource',
    params: {...params}
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

// 删除
export function deleteStdDatasource(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteTStdDatasource',
    params: {...params}
  })
}

// 分页
export function getTstdDatasourcePageList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getTstdDatasourcePageList',
    params: {...params}
  })
}

// 保存与更新
export function saveOrUpdateTStdDatasource(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveOrUpdateTStdDatasource',
    data: {...params}
  })
}

export function getTStdDatasourceById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getTStdDatasourceById',
    params: {...params}
  })
}

export function getStdStandardById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdId',
    params: {...params}
  })
}
