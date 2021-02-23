// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'
import { data } from 'jquery'

// 逻辑删除
export function deleteModShip(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modRelationship/delete',
    params: {...params}
  })
}
//分页查询
export function pageModShip(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modRelationship/page',
      params: {...params}
    })
  }
 // 状态修改 
  export function updateShipState(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modRelationship/updateShipState',
      params: {...params}
    })
  }

  export function getModShipByShipId(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modRelationship/get',
      params: {...params}
    })
  }

  export function saveOrUpdate(params) {
    return api({
      method: 'post',
      url: appServer.std + 'modRelationship/saveOrUpdate',
      data: {...params}
    })
  }

  export function listModShip(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modRelationship/list',
      params: {...params}
    })
  }

  export function checkName(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modRelationship/checkName',
      params: {...params}
    })
  }


 
