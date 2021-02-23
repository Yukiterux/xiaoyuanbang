// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 获取数据列表
export function pageCategory(params) {
  return api({
    method: 'get',
    url: appServer.std + 'category/pageCategory',
    params: {...params}
  })
}


// 保存数据
export function saveCategory(params) {
  return api({
    method: 'post',
    url: appServer.std + 'category/saveOrUpdateCategory',
    data: {...params}
  })
}

// 获取树形菜单数据
export function findCategoryTree(params) {
  return api({
    method: 'get',
    url: appServer.std + 'category/getAllCategory',
    params: {...params}
  })
}

// 通过主键获取信息
export function getCategoryById(params) {
  return api({
    method: 'get',
    url: appServer.std + 'category/getCategoryById',
    params: {...params}
  })
}

export function listCategory(params) {
  return api({
    method: 'get',
    url: appServer.std + 'category/list',
    params: {...params}
  })
}

export function listStdFile(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdFile/listStdFile',
    params: {...params}
  })
}

export function listStdCodeSetBase(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdCodeSetBase/list',
    params: {...params}
  })
}

export function deleteCategoryById(params) {
  return api({
    method: 'get',
    url: appServer.std + 'category/delCategory',
    params: {...params}
  })
}

export function updateCategoryState(params) {
  return api({
    method: 'get',
    url: appServer.std + 'category/updateCategoryState',
    params: {...params}
  })
}


export function checkName(params) {
  return api({
    method: 'get',
    url: appServer.std + 'category/checkName',
    params: {...params}
  })
}

export function listStdTemplate(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdTemplate/list',
    params: {...params}
  })
}

export function listStdDataElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/list',
    params: {...params}
  })
}