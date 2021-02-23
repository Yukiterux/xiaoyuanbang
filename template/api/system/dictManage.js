// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function getDictType(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getDictType',
    params: {...params}
  })
}

export function getDictTypeByDictTypeId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getDictTypeByDictTypeId',
    params: {...params}
  })
}

export function deleteDictType(params) {
  return api({
    method: 'post',
    url: appServer.system + 'deleteDictType',
    params: {...params}
  })
}

export function getDictTypeByDictTypeName(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getDictTypeByDictTypeName',
    params: {...params}
  })
}

export function saveAndUpdateDictType(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveAndUpdateDictType',
    data: {...params}
  })
}

export function getDictInfo(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getDictInfo',
    params: {...params}
  })
}

export function getDictById(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getDictById',
    params: {...params}
  })
}

export function deleteDictInfo(params) {
  return api({
    method: 'post',
    url: appServer.system + 'deleteDictInfo',
    params: {...params}
  })
}

export function getDictInfoByNameCn(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getDictInfoByNameCn',
    params: {...params}
  })
}

export function getDictInfoByNameEn(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getDictInfoByNameEn',
    params: {...params}
  })
}

export function getDictInfoByValue(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getDictInfoByValue',
    params: {...params}
  })
}

export function saveAndUpdateDictInfo(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveAndUpdateDictInfo',
    data: {...params}
  })
}
