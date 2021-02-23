// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function getDataTableDetailPage(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getDataTableReportByDeptId',
    params: {...params}
  })
}

export function getCheckedDeptList(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getCheckedDeptList',
    params: {...params}
  })
}
export function getTableReport(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getTableReport',
    params: {...params}
  })
}

export function getDeptDataTableReport(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getDeptDataTableReport',
    params: {...params}
  })
}

export function getDataSourceList(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getDataSourceList',
    params: {...params}
  })
}

export function getDsDataTableReport(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getDsDataTableReport',
    params: {...params}
  })
}
