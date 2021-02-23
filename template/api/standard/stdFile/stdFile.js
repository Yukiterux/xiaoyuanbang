// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 逻辑删除
export function deleteStdFile(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdFile/delete',
    params: {...params}
  })
}
//分页查询
export function pageStdFile(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdFile/page',
      params: {...params}
    })
  }
  
  export function getByFileId(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdFile/get',
      params: {...params}
    })
  } 

  export function saveOrUpdate(params) {
    return api({
      method: 'post',
      url: appServer.std + 'stdFile/saveOrUpdate',
      data: {...params}
    })
  } 

  export function findFileRelationByStdId(params) {
    return api({
      method: 'get',
      url: appServer.system + 'findFileRelationByStdId',
      params: {...params}
    })
  } 


  export function updateStateByFileId(params) {
    return api({
      method: 'get',
      url: appServer.system + 'updateStateByFileId',
      params: {...params}
    })
  } 

  export function updateStateByBizId(params) {
    return api({
      method: 'get',
      url: appServer.system + 'updateStateByBizId',
      params: {...params}
    })
  } 
  
  export function getAllCategory(params) {
    return api({
      method: 'get',
      url: appServer.std + 'category/getAllCategory',
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

  export function getOperationLogListByBiz(biz, object) {
    return api({
      method: 'get',
      url: appServer.system + 'getOperationLogListByBiz',
      params: {biz: biz, object: object}
    })
  }
  
  export function list(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdFile/list',
      params: {...params}
    })
  }