// 引用封装后的axios
import api from '@/libs/ajax/http';
// 引用服务名
import {
  appServer
} from '../../appServer'
export function pageMetaDataAudit(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/pageMetaDataAudit',
    params: {
      ...params
    }
  })
}
export function metaDataAuditCount(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataBaseInfo/metaDataAuditCount',
      params: {
        ...params
      }
    })
  }
  export function displayMetaData(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataBaseInfo/displayMetaData',
      params: {
        ...params
      }
    })
  }
  export function updateMetaDataAuditStatus(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataBaseInfo/updateMetaDataAuditStatus',
      params: {
        ...params
      }
    })
  }  
  export function metaDataPublishCount(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataBaseInfo/metaDataPublishCount',
      params: {
        ...params
      }
    })
  }  
  export function pageMetaDataPublish(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataBaseInfo/pageMetaDataPublish',
      params: {
        ...params
      }
    })
  }  

  // 批量审核保存
export function batchAudit(data, params) {
  return api({
    method: 'post',
    url: appServer.data + 'batchAudit',
    params: {...params},
    data: data
  })
}

export function getMetaDataAudit(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/listMetaDataAudit',
    params: {...params},
  })
}
export function batchUpdateDataStatus(data, params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaDataBaseInfo/batchUpdateDataStatus',
    params: {...params},
    data: {...data}
  })
}

export function metaDataPublish(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/metaDataPublish',
    params: {...params}
  })
} 

export function listMetaDataPublish(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/listMetaDataPublish',
    params: {...params}
  })
} 
export function updateMetaDataStatus(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/updateMetaDataStatus',
    params: {...params}
  })
} 

