/*
 * @Author: HJM
 * @Description:需求管理相关接口
 * @Date: 2020-08-14 09:38:48
 * @LastEditors: M
 * @LastEditTime: 2020-08-17 14:46:35
 */
// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import { appServer } from '../appServer'

// 需求管理列表
export function findDemandPage (params) {
  return api({
    method: 'post',
    url: appServer.demand + 'findDemandPage',
    data: { ...params }
  })
}
//删除产品需求
export function deleteDemand (params) {
  return api({
    method: 'get',
    url: appServer.demand + 'deleteDemand',
    params: params
  })
}
//新增产品需求
export function AddDemand (params) {
  return api({
    method: 'post',
    url: appServer.demand + 'createDemand',
    data: { ...params }
  })
}
//查看产品需求
export function LookDemand (params) {
  return api({
    method: 'get',
    url: appServer.demand + 'findDemand',
    params: params 
  })
}
//修改产品需求
export function reviseDemand (params) {
  return api({
    method: 'post',
    url: appServer.demand + 'updateDemand',
    data: { ...params }
  })
}
//产品需求申请
export function applyDemand (params) {
  return api({
    method: 'get',
    url: appServer.demand + 'applyDemand',
    params:  params 
  })
}
//复选框数组获取
export function getValue (params) {
  return api({
    method: 'get',
    url: appServer.sysDictionary + 'getValue',
    params:  params 
  })
}
//产品需求审核列表（待审核）
export function findDemandProcessPage (params) {
  return api({
    method: 'post',
    url: appServer.demand + 'findDemandProcessPage',
    data:  { ...params }
  })
}
//产品需求审核列表(已完成)
export function findDemandProcessDonePage (params) {
  return api({
    method: 'post',
    url: appServer.demand + 'findDemandProcessDonePage',
    data:  { ...params }
  })
}
//产品需求审核弹窗提交
export function approvalDemand (params) {
  return api({
    method: 'post',
    url: appServer.demand + 'approvalDemand',
    data:  { ...params }
  })
}
  //需求管理文件删除(数据服务数据库)
  export function deleteStateByFileIdReq(params) {
    return api({
      method: 'get',
      url: appServer.demand + 'deleteFile',
      params: {...params}
    })
  }