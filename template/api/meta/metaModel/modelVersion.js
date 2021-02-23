import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '@/api/appServer'

export function metaModelVersionPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelVersion/page',
    params: {...params}
  })
}

export function metaModelVersionInfo(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelVersion/metaModelVersionInfo',
    params: {...params}
  })
}

export function metaModelVersionList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelVersion/list',
    params: {...params}
  })
}

export function metaModelAttrVerPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelAttrVer/page',
    params: {...params}
  })
}



export function metaModelRelationshipVersionPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelRelationshipVersion/page',
    params: {...params}
  })
}

export function initRelationChart(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelRelationshipVersion/initRelationChart',
    params: {...params}
  })
}
export function getMetaModelVersionByActivePartId(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelVersion/metaModelVersionByActivePartId',
    params: {...params}
  })
}

