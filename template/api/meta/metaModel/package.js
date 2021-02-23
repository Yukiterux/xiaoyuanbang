// 引用封装后的axios
import api from '@/libs/ajax/http';
// 引用服务名
import {
  appServer
} from '../../appServer';

//获取包数据
export function getPackageList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaPackage/getMetaPackageList',
    params: {
      ...params
    }
  })
}
export function findPackageCount(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaPackage/getPackageCount',
    params: {
      ...params
    }
  })
}
//左侧分类树
export function getPackageTree(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaPackage/getMetaPackageTree',
    params: {
      ...params
    }
  })
}

//删除包
export function deletePackage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaPackage/deleteMetaPackageById',
    params: {
      ...params
    }
  })
}

export function getPackageByParams(params){
  return api({
    method: 'get',
    url: appServer.meta + 'metaPackage/getMetaPackageByParams',
    params: {...params}
  })
}

export function saveMetaPackage(params){
  return api({
    method: 'post',
    url: appServer.meta + 'metaPackage/saveMetaPackage',
    data: {...params}
  })
}

export function checkPackageName(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaPackage/checkPackageName',
    params: {...params}
  })
}

export function createPackageCode(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaPackage/autoCreatePackgeCode',
    params: {...params}
  })
}

export function startOrStopPackage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaPackage/startOrStopPackage',
    params: {...params}
  })
}
//获取启动状态下的包
export function listMetaPackage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaPackage/listMetaPackage',
    params: {
      ...params
    }
  })
}