// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'
import { data } from 'jquery'

// 逻辑删除
export function deleteStdCodeSetBase(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdCodeSetBase/delete',
    params: {...params}
  })
}
//分页查询
export function pageStdCodeSetBase(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/page',
      params: {...params}
    })
  }
  
  export function getByBaseId(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/get',
      params: {...params}
    })
  } 

  export function saveOrUpdate(params) {
    return api({
      method: 'post',
      url: appServer.std + 'stdCodeSetBase/saveOrUpdate',
      data: {...params}
    })
  } 

  export function updateStatus(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/updateStatus',
      params: {...params}
    })
  } 

  export function updateAuditStatus(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/updateAuditStatus',
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
  export function listTStdFile(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdFile/listStdFile',
      params: {...params}
    })
  }
  export function countStdCodeSetBaseAudit(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/countStdCodeSetBaseAudit',
      params: {...params}
    })
  }
  export function pageStdCodeSetBaseAudit(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/pageStdCodeSetBaseAudit',
      params: {...params}
    })
  }
  export function listStdSetBase(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/list',
      params: {...params}
    })
  }
  export function list(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetList/list',
      params: {...params}
    })
  }
  export function batchAudit(data, params) {
    return api({
      method: 'post',
      url: appServer.data + 'batchAudit',
      params: {...params},
      data: data
    })
  }

  export function pageStdCodeSetBasePublish(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/pageStdCodeSetBasePublish',
      params: {...params}
    })
  }

  export function countStdCodeSetBasePublish(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/countStdCodeSetBasePublish',
      params: {...params}
    })
  }


  export function batchUpdateStatus(data,params) {
    return api({
      method: 'post',
      url: appServer.std + 'stdCodeSetBase/batchUpdateStatus',
      data:data,
      params: {...params}
    })
  }
  export function submit(params) {
    return api({
      method: 'post',
      url: appServer.std + 'stdCodeSetBase/submit',
      params: {...params}
    })
  }
  export function batchUpdateAuditStatus(params) {
    return api({
      method: 'post',
      url: appServer.std + 'stdCodeSetBase/batchUpdateAuditStatus',
      data: {...params}
    })
  }

  export function withdrawStdCodeSetBasePublish(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/withdrawStdCodeSetBasePublish',
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
  export function importStdCodeSetBase(params) {
    return api({
      method: 'post',
      url: appServer.std + 'stdCodeSetBase/importStdCodeSetBase',
      processData: false,
      contentType: false,
      data: params
    })
  }
  
  export function exportExcel(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/exportStdCodeSetBaseExcel',
      params:{...params}
    })
  }


 export function getByOrgId(params) {
    return api({
      method: 'get',
      url: appServer.std + 'getByOrgId',
      params:{...params}
    })
  }

  export function getByFileId(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdFile/get',
      params: {...params}
    })
  } 

  export function publish(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCodeSetBase/publish',
      params: {...params}
    })
  } 
  