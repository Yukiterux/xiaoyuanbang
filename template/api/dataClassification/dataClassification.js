// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'
// 数据层级分类管理
export function getGradeInfoList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getGradeInfoList',
    params: {...params}
  })
}
// 数据层级分类新增
export function saveOrUpdateGradeInfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveOrUpdateGradeInfo',
    data: {...params}
  })
}
// 数据层级分类编辑
export function getGradeInfoByGradeId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getGradeInfoByGradeId',
    params: {...params}
  })
}
export function displayGradeInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'displayGradeInfo',
    params: {...params}
  })
}
// 数据层级删除
export function updateGradeStatus(params) {
  return api({
    method: 'get',
    url: appServer.data + 'updateGradeStatus',
    params: {...params}
  })
}
export function getGradeTypeCount(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getGradeTypeCount',
    params: {...params}
  })
}

