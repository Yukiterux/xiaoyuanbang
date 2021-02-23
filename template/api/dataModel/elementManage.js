// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据元分类
export function getElementCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getElementCategory',
    params: {...params}
  })
}

// 获取数据元分类
export function getElementCategoryByCode(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getElementCategoryByCode',
    params: {...params}
  })
}

// 新增或修改数据元分类
export function saveOrUpdateElementCategory(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveOrUpdateElementCategory',
    data: {...params}
  })
}

// 逻辑删除数据元分类
export function deleteElementCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteElementCategory',
    params: {...params}
  })
}

// 逻辑删除数据元分类校验
export function deleteElementCategoryAfterCheck(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteElementCategoryAfterCheck',
    params: {...params}
  })
}

// 分页查询数据元分类
export function pageElementCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageElementCategory',
    params: {...params}
  })
}

// 获取数据元分类集合
export function listElementCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listElementCategory',
    params: {...params}
  })
}

// 获取数据元分类集合
export function listElementCategoryByParentId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listElementCategoryByParentId',
    params: {...params}
  })
}

// 获取数据元
export function getElementData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getElementData',
    params: {...params}
  })
}

// 新增或修改数据元
export function saveOrUpdateElementData(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveOrUpdateElementData',
    data: {...params}
  })
}

// 逻辑删除数据元
export function deleteElementData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteElementData',
    params: {...params}
  })
}

// 分页查询数据元
export function pageElementData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageElementData',
    params: {...params}
  })
}

// 获取数据元集合
export function listElementData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listElementData',
    params: {...params}
  })
}

// 获取数据元集合
export function listElementDataByCategoryId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listElementDataByCategoryId',
    params: {...params}
  })
}

// 获取数据元集合
export function listElementDataByCategoryIdAndNameCn(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listElementDataByCategoryIdAndNameCn',
    params: {...params}
  })
}

// 获取数据元集合
export function listDataType() {
  let params = {dictTypeId: '2c9180876ed8ce7d016ee9616bf100c7'}
  return api({
    method: 'get',
    url: appServer.system + 'getDictInfoByTypeId',
    params: {...params}
  })
}

// 获取数据元集合
export function listDataObjectClass() {
  let params = {dictTypeId: '2c9180876ed8ce7d016ee962a7c400c8'}
  return api({
    method: 'get',
    url: appServer.system + 'getDictInfoByTypeId',
    params: {...params}
  })
}
