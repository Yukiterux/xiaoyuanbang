// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function getAllMetaDataCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllMetaDataCategory',
    params: {...params}
  })
}
// 查询指定id下有没有子节点
export function ztreeMenuDeleteCheck(params) {
  return api({
    method: 'get',
    url: appServer.data + 'ztreeMenuDeleteCheck',
    params: {...params}
  })
}
// 高级搜索
export function mtdtMultiConditionalQuery(params) {
  return api({
    method: 'post',
    url: appServer.data + 'mtdtMultiConditionalQuery',
    data: {...params}
  })
}
// 通过id删除数据
export function deleteTsCategoryById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteMetaDataCategory',
    params: {...params}
  })
}

// 保存数据
export function saveCategory(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveMetaDataCategory',
    data: {...params}
  })
}

// 获取树形菜单数据
export function findMetadataCategoryTree(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findAllZtreeTypeData',
    params: {...params}
  })
}

// 根据id获取
export function getByIdMetaDataCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getByIdMetaDataCategory',
    params: {...params}
  })
}

// name校验
export function checkMetadataCategoryName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'checkMetadataCategoryName',
    params: {...params}
  })
}

// 获取父节点下的子节点
export function getMetadateCategoryTreeNodeInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getMetadateCategoryTreeNodeInfo',
    params: {...params}
  })
}

// 通过模型建表,保存该信息
export function createTableInfoByModel(params) {
  return api({
    method: 'post',
    url: appServer.data + 'createTableInfoByModel',
    data: {...params}
  })
}

// 获取父节点下的子节点
export function pageMetadateCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageMetadateCategory',
    params: {...params}
  })
}
// 根据分类id获取所有模型
export function getAllMetaInfoByCategoryCode(categoryCode) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllMetaInfoByCategoryCode',
    params: {categoryCode: categoryCode}
  })
}
