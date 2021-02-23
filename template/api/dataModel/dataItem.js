// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
export function getAllData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdItemList',
    params: {...params}
  })
}

// 查询数据标准分类树
export function findStdCategoryTree(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findCatagetoryTreeByCode',
    params: {...params}
  })
}

// 保存与编辑
export function saveStdItemInfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveStdItemInfo',
    data: {...params}
  })
}

// 根据主键查询
export function findStdItemById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdItemById',
    params: {...params}
  })
}

// 逻辑删除
export function updateStdItemState(params) {
  return api({
    method: 'get',
    url: appServer.data + 'updateStdItemState',
    params: {...params}
  })
}

// 获取标准信息项审核页面列表
export function findDataItemAuditList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findDataItemAuditList',
    params: {...params}
  })
}
