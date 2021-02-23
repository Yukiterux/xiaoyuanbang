// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function saveOrUpdate(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveOrUpdate',
    data: {...params}
  })
}

export function deleteCompCategory(params) {
  return api({
    method: 'get',
    url: appServer.system + 'deleteTGovUnitCategory',
    params: {...params}
  })
}

export function getCompCategoryPageList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getTGovUnitCategoryPageList',
    params: {...params}
  })
}

export function getCompCategoryList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getCompCategoryList',
    params: {...params}
  })
}

export function getCompCategoryByUnitCategoryId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getTGovUnitCategoryByUnitCategoryId',   // 'getCompCategoryByUnitCategoryId',
    params: {...params}
  })
}

export function checkUnitCategoryNameCn(params) {
  return api({
    method: 'get',
    url: appServer.system + 'checkUnitCategoryNameCn',
    params: {...params}
  })
}

// getTGovUnitCategoryListByCode
export function getTGovUnitCategoryList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getTGovUnitCategoryList',
    params: {...params}
  })
}
