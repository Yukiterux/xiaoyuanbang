// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取值域标准列表
export function getStdRangeListByStandardId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listStdRangeByStandardId',
    params: {...params}
  })
}

// 获取标准部门
export function getTstdCategoryDept(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getTstdCategoryDept',
    params: {...params}
  })
}

// 获取部门标准
export function getdeptStandard(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStandardListByStdCategoryId',
    params: {...params}
  })
}

// 保存映射关系
export function saveRangeMapping(params) {
  return api({
    method: 'get',
    url: appServer.data + 'saveRangeMapping',
    params: {...params}
  })
}
// 获取映射关系列表
export function getStdRangeRelLists(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStdRangeRelLists',
    params: {...params}
  })
}

// 逻辑删除
export function updateStdRangeRel(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteStdRangeRel',
    params: {...params}
  })
}

// 根据映射关系Id获取实体
export function getStdRangeRelByRangeRelId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStdRangeRelByRangeRelId',
    params: {...params}
  })
}

// 根据slaveId获取实体
export function getStandardByrangeSlaveId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdId',
    params: {...params}
  })
}

export function saveStdRangeRel(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveStdRangeRel',
    data: {...params}
  })
}

export function findStdCategoryName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdCategoryName',
    params: {...params}
  })
}
