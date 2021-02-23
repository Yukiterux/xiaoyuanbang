// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'
import { data } from 'jquery'

// 逻辑删除
export function setStdCommonWords(params) {
  return api({
    method: 'delete',
    url: appServer.std + 'commonWords/delete',
    params: {...params}
  })
}
//分页查询
export function pageStdCommonWords(params) {
  return api({
    method: 'get',
    url: appServer.std + 'commonWords/page',
    params: {...params}
  })
}

export function stdCommonWordsById(params) {
  return api({
    method: 'get',
    url: appServer.std + 'commonWords/get',
    params: {...params}
  })
}

export function saveOrUpdateTstdCommonWords(params) {
  return api({
    method: 'post',
    url: appServer.std + 'commonWords/saveOrUpdate',
    data: {...params}
  })
}

export function setStdCommonWordsStatus(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdCodeSetBase/updateStatus',
    params: {...params}
  })
}
