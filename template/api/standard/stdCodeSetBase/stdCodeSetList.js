// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 逻辑删除
export function deleteStdCodeSetList(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdCodeSetList/delete',
    params: {...params}
  })
}
//分页查询
export function page(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetList/page',
      params: {...params}
    })
  }
  
  export function getByListId(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetList/get',
      params: {...params}
    })
  } 
  export function listStdCode(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetList/list',
      params: {...params}
    })
  } 

  export function saveOrUpdate(params) {
    return api({
      method: 'post',
      url: appServer.std + 'stdCodeSetList/saveOrUpdate',
      data: {...params}
    })
  } 

  export function updateStatus(params) {
    return api({
      method: 'get',
      url: appServer.std + 'updateStatus',
      params: {...params}
    })
  } 
  export function listStdOrg(params) {
    return api({
      method: 'get',
      url: appServer.std + 'listStdOrg',
      params: {...params}
    })
  }