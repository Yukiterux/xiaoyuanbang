// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function pageCmIndexByName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageCmIndexByName',
    params: {...params}
  })
}

// JSON格式校验
export function checkJson(params) {
  return api({
    method: 'post',
    url: appServer.data + 'checkJson',
    data: {...params}
  })
}

// 解析索引
export function analyticIndexMapping(params) {
  return api({
    method: 'post',
    url: appServer.data + 'analyticIndexMapping',
    data: {...params}
  })
}

// 保存索引
export function saveOrUpdateCmIndex(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveOrUpdateCmIndex',
    data: {...params}
  })
}

// 通过主键获取索引
export function getCmIndex(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmIndex',
    params: {...params}
  })
}

// 重名校验
export function checkIndexNameEn(params) {
  return api({
    method: 'post',
    url: appServer.data + 'checkIndexNameEn',
    params: {...params}
  })
}

// 删除索引
export function delCmIndex(params) {
  return api({
    method: 'get',
    url: appServer.data + 'delCmIndex',
    params: {...params}
  })
}

// 获取同步列表
export function pageSynchroEsIndexInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageSynchroEsIndexInfo',
    params: {...params}
  })
}

// 同步索引到服务器
export function synchroToEsService(params) {
  return api({
    method: 'get',
    url: appServer.data + 'synchroToEsService',
    params: {...params}
  })
}
