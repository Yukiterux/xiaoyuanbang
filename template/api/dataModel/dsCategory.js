// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
export function getAllData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCategoryTypeByLabel',
    params: {...params}
  })
}

// 保存数据源分类对象
export function saveDataSourceCategory(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveDataSourceCategory',
    data: {...params}
  })
}

// 编辑数据源分类对象
export function updateDataSourceCategory(params) {
  return api({
    method: 'post',
    url: appServer.data + 'updateDataSourceCategory',
    data: {...params}
  })
}

// 删除数据源分类对象
export function deleteDataSourceCategory(params) {
  return api({
    method: 'post',
    url: appServer.data + 'deleteDataSourceCategory',
    params: {...params}
  })
}

// 编辑时获取数据
export function getCmCategoryById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmCategoryById',
    params: {...params}
  })
}

export function getDataSourceCategoryLabel(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceCategoryLabel',
    params: {...params}
  })
}

export function getDataSourceCategoryTree(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceCategoryTree',
    params: {...params}
  })
}

// 校验数据源分类名称是否重复
export function checkDsCategoryName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'checkDsCategoryName',
    params: {...params}
  })
}
