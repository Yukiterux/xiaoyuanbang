// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function findAllBatchJobSync(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllTstdCategoryOrSingle',
    params: {...params}
  })
}

// 通过id删除数据
export function deleteTsCategoryById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteTsCategoryById',
    params: {...params}
  })
}

// 保存数据
export function saveCategory(params) {
  return api({
    method: 'post',
    url: appServer.data + 'addTstdCategory',
    data: {...params}
  })
}

// 获取树形菜单数据
export function findCategoryTree(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findCatagetoryTreeByCode',
    params: {...params}
  })
}

// 通过主键获取信息
export function getCategoryById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCategoryById',
    params: {...params}
  })
}

// 检查中文名称唯一性
export function checkNameExist(params) {
  return api({
    method: 'get',
    url: appServer.data + 'checkNameExist',
    params: {...params}
  })
}

export function hasChildNode(params) {
  return api({
    method: 'get',
    url: appServer.data + 'hasChildNode',
    params: {...params}
  })
}
export function updateCategoryState(params) {
  return api({
    method: 'get',
    url: appServer.data + 'updateCategoryState',
    params: {...params}
  })
}
