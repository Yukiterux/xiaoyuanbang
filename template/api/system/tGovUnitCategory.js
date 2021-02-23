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

export function deleteTGovUnitCategory(params) {
  return api({
    method: 'get',
    url: appServer.system + 'deleteTGovUnitCategory',
    params: {...params}
  })
}

export function getTGovUnitCategoryPageList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getTGovUnitCategoryPageList',
    params: {...params}
  })
}

export function getTGovUnitCategoryList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getTGovUnitCategoryList',
    params: {...params}
  })
}

export function getTGovUnitCategoryByUnitCategoryId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getTGovUnitCategoryByUnitCategoryId',
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
