// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询所有数据
export function getCmDictTypePageList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmDictTypePageList',
    params: {...params}
  })
}

// 删除
export function deleteCmDictType(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteCmDictType',
    params: {...params}
  })
}

// 依据id查询
export function getCmDictTypeByDictTypeId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmDictTypeByDictTypeId',
    params: {...params}
  })
}

// 新增与修改
export function saveOrUpdateCmDictType(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveOrUpdateCmDictType',
    data: {...params}
  })
}

export function getCmCategoryById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmCategoryById',
    params: {...params}
  })
}

export function getCmDataSourceListByCategoryId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmDataSourceListByCategoryId',
    params: {...params}
  })
}

export function queryTableNameList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'queryTableNameList',
    params: {...params}
  })
}

export function getAllColumnByTableId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllColumnByTableId',
    params: {...params}
  })
}

// 数据字典同步
export function syscCmDictType(params) {
  return api({
    method: 'get',
    url: appServer.data + 'syscCmDictType',
    params: {...params}
  })
}

// 查询当前数据字典正在使用的数据源
export function getDictUsedDatasourceListByCategoryId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDictUsedDatasourceListByCategoryId',
    params: {...params}
  })
}
