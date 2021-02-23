// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'
import { data } from 'jquery'

// 逻辑删除
export function deleteModEnt(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modEnt/delete',
    params: {...params}
  })
}
//分页查询
export function pageModEnt(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modEnt/page',
      params: {...params}
    })
  }
 // 状态修改 
  export function updateEntState(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modEnt/updateStatus',
      params: {...params}
    })
  }

  export function getModEntByEntId(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modEnt/get',
      params: {...params}
    })
  }

  export function saveOrUpdate(params) {
    return api({
      method: 'post',
      url: appServer.std + 'modEnt/saveOrUpdate',
      data: {...params}
    })
  }

  export function listModEnt(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modEnt/list',
      params: {...params}
    })
  }
  // check name or code
  export function checkNameOrCode(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modEnt/checkNameOrCode',
      params: {...params}
    })
  }
 
