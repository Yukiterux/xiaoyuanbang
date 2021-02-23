// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {
  appServer
} from '../../appServer'
export function pageMetaModelAudit(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/pageMetaModelAudit',
    params: {
      ...params
    }
  })
}
export function metaModelAuditCount(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/metaModelAuditCount',
    params: {
      ...params
    }
  })
}
export function displayMetaModel(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/displayMetaModel',
    params: {
      ...params
    }
  })
}
export function updateMetaModelAuditStatus(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/updateMetaModelAuditStatus',
    params: {
      ...params
    }
  })
}
export function metaModelPublishCount(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/metaModelPublishCount',
    params: {
      ...params
    }
  })
}
export function pageMetaModelPublish(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/pageMetaModelPublish',
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

export function getMetaModelAudit(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/listMetaModelAudit',
    params: {...params}
  })
}
export function batchUpdateModelStatus(data, params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaModel/batchUpdateModelStatus',
    params: {...params},
    data: {...data}
  })
}

export function metaModelPublish(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/metaModelPublish',
    params: {...params}
  })
}

export function listMetaModelPublish(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/listMetaModelPublish',
    params: {...params}
  })
}
export function updateMetaModelStatus(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/updateMetaModelStatus',
    params: {...params}
  })
}
export function pageMetaModelVersion(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelVersion/pageMetaModelVersion',
    params: {...params}
  })
}

// 发布打回
export function pageCallbackPublish(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/withdrawMetaModelPublish',
    params: {...params}
  })
}

// 已发布详情
export function pagePublishModelDetail(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelVersion/get',
    params: {...params}
  })
}
// 未发布详情
export function pageNotPublishModelDetail(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModel/get',
    params: {...params}
  })
}


// 发布详情
export function pagePublishModelChart(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelRelationshipVersion/initRelationChart',
    params: {...params}
  })
}


export function pageNotPublishModelChart(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelRelationship/initRelationChart',
    params: {...params}
  })
}


//获取发布后的元模型主被动关系
export function pagePublishConnectInfo(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelRelationshipVersion/page',
    params: {...params}
  })
}