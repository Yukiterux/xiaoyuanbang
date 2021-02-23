// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'


// 获取树形结构信息
export function findModelTreeList(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaModelTmpExp/getMetaModelTree',
      params: {...params}
    })
}

/*  */
// 获取树形结构信息
export function findModelList(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaModelTmpExp/getMetaModelTmpExpList',
      params: {...params}
    })
}

// 保存
export function saveCollectTemplate(params) {
    return api({
      method: 'post',
      url: appServer.meta + 'metaModelTmpExp/saveOrUpdate',
      data: {...params}
    })
}


// 删除
export function removeCollectTemplate(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaModelTmpExp/deleteMetaModelTmpById',
      params: {...params}
    })
}


// 获取单个信息
export function findCollectTemplateInfo(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaModelTmpExp/editTmpExpInfoById',
      params: {...params}
    })
}

// 改变状态
export function updateCollectStatus(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaModelTmpExp/startOrStopMetaModelTmpById',
      params: {...params}
    })
}

export function getMetaModelTmpList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaModelTmpExp/getMetaModelTmpList',
    params: {...params}
  })
}
