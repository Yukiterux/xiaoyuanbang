// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 保存标签
export function saveOrUpdate(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveCorrelation',
    data: {...params}
  })
}

// 获取标签列表
export function getCorrelationPage(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getCorrelationPage',
    params: {...params}
  })
}

// 根据标签id获取
export function getCorrelationById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getCorrelationById',
    params: {...params}
  })
}

// 删除标签
export function delCorrelationById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'delCorrelationById',
    params: {...params}
  })
}

  // 根据表id查询所有字段
export function getAllColumnByTableId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllColumnByTableId',
    params: {...params}
  })
}

    // 依据datasourceId获取表列表
export function queryTableNameList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'queryTableNameList',
    params: {...params}
  })
}

// 保存表格
export function saveCorrelationInfo(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveCorrelationInfo',
    data: {...params}
  })
}

// 获取字段通过字段id
export function getColumnByColumnId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getColumnByColumnId',
    params: {...params}
  })
}

  // 获取表信息
export function getCmTableinfoByTableId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmTableInfoByTableId',
    params: {...params}
  })
}

 // 获取表格列表
export function getCorrelationInfoPage(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getCorrelationInfoPage',
    params: {...params}
  })
}

// 删除表格
export function delCorrelationInfoById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'delCorrelationInfoById',
    params: {...params}
  })
}

  // 根据表格id获取
export function getCorrelationInfoById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getCorrelationInfoById',
    params: {...params}
  })
}

export function getCmDataSourceById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmDataSourceById',
    params: {...params}
  })
}
