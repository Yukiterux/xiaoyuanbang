// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询所有数据
export function saveOrUpdateCmDictInfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveOrUpdateCmDictInfo',
    data: {...params}
  })
}

export function getCmDictInfoByDictId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmDictInfoByDictId',
    params: {...params}
  })
}

export function getCmDictInfoPageList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmDictInfoPageList',
    params: {...params}
  })
}

export function deleteCmDictInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteCmDictInfo',
    params: {...params}
  })
}

export function getCheckDictNameCn(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCheckDictNameCn',
    params: {...params}
  })
}
