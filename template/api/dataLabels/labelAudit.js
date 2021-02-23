// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 标签审核列表
export function getLabelAuditInfoList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getLabelAuditList',
    params: {...params}
  })
}

export function getLabelInfoCount(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getLabelInfoCount',
    params: {...params}
  })
}

export function updateLabelInfoExamineState(params) {
  return api({
    method: 'get',
    url: appServer.data + 'updateLabelInfoExamineState',
    params: {...params}
  })
}

export function auditWorkFlow(params) {
  return api({
    method: 'post',
    url: appServer.data + 'auditWorkFlow',
    data: {...params}
  })
}

export function getNextSysUserList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getNextSysUserList',
    params: {...params}
  })
}

export function pageLabelInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageLabelInfo',
    params: {...params}
  })
}

export function getLabelOnlineCount(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getLabelOnlineCount',
    params: {...params}
  })
}

export function updateLabelInfoState(params) {
  return api({
    method: 'get',
    url: appServer.data + 'updateLabelInfoState',
    params: {...params}
  })
}

export function displayLabelInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'displayLabelInfo',
    params: {...params}
  })
}

// 批量审核标签查询
export function getLabelInfoListByUserId(userId) {
  return api({
    method: 'get',
    url: appServer.data + 'getLabelInfoListByUserId',
    params: {userId: userId}
  })
}

// 批量审核标签保存
export function batchAuditFlow(data, params) {
  return api({
    method: 'post',
    url: appServer.data + 'batchAuditFlow',
    params: {...params},
    data: {...data}
  })
}

export function isAdminRoleByUserId(userId) {
  return api({
    method: 'get',
    url: appServer.system + 'isAdminRoleByUserId',
    params: {userId: userId}
  })
}
export function getAuditWorkflowNodeList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAuditWorkflowNodeList',
    params: {...params}
  })
}
export function saveOrUpdateExecution(params) {
  return api({
    method: 'post',
    url: appServer.scheduler + 'saveOrUpdateExecution',
    data: {...params}
  })
}
export function runJobNow(params) {
  return api({
    method: 'post',
    url: appServer.scheduler + 'runJobNow',
    data: {...params}
  })
}

export function pageLabelExecutionRunInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageLabelExecutionRunInfo',
    params: {...params}
  })
}

export function countLabelExecutionRunInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'countLabelExecutionRunInfo',
    params: {...params}
  })
}

// 查询标签生命周期
export function getLabelOperationList(labelInfoId) {
  return api({
    method: 'get',
    url: appServer.data + 'getLabelOperationList',
    params: {labelInfoId: labelInfoId}
  })
}

// 首页统计信息1
export function getLabelInfoHomeCount() {
  return api({
    method: 'get',
    url: appServer.data + 'getLabelInfoHomeCount'
  })
}
// 首页统计信息2(热度)
export function getLabelInfoUseCount() {
  return api({
    method: 'get',
    url: appServer.data + 'getLabelInfoUseCount'
  })
}

// 数据画像
export function getLabelInfoLevelListByTableId(tableId) {
  return api({
    method: 'get',
    url: appServer.data + 'getLabelInfoLevelListByTableId',
    params: {tableId: tableId}
  })
}
export function getLabelInfoListByLabelInfoState(labelInfoState) {
  return api({
    method: 'get',
    url: appServer.data + 'getLabelInfoListByLabelInfoState',
    params: {labelInfoState: labelInfoState}
  })
}
// 批量上线
export function batchUpdateLabelInfoState(data, params) {
  return api({
    method: 'post',
    url: appServer.data + 'batchUpdateLabelInfoState',
    params: {...params},
    data: data
  })
}