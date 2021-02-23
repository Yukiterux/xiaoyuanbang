// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取审核列表
export function findStandAuditList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStandAuditListByUserId',
    params: {...params}
  })
}

export function getStandardDetailList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStandardDetailList',
    params: {...params}
  })
}
    // 获取下级审核人
export function getUserList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getAdminBelongToTSysUserList',
    params: {...params}
  })
}

export function saveStandAudit(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveStandAudit',
    data: {...params}
  })
}

// 批量审核
export function batchSaveStandAudit(params) {
  return api({
    method: 'post',
    url: appServer.data + 'batchSaveStandAudit',
    data: {...params}
  })
}

export function publishStanderdFile(params) {
  return api({
    method: 'post',
    url: appServer.data + 'publishStanderdFile',
    params: {...params}
  })
}

// 获取批量发布列表
export function getStandardPublishList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStandardPublishList',
    params: {...params}
  })
}

// 取消发布
export function cancelPublishStananderd(params) {
  return api({
    method: 'get',
    url: appServer.data + 'cancelPublishStananderd',
    params: {...params}
  })
}

// 审核详情查看
export function standardAuditDetail(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStandAuditDetaileByStandardId',
    params: {...params}
  })
}

export function isAdminRoleByUserId(userId) {
  return api({
    method: 'get',
    url: appServer.system + 'isAdminRoleByUserId',
    params: {userId: userId}
  })
}

export function getNextSysUserList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getNextSysUserList',
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

export function updateStandardByStandardAndStandardState(params) {
  return api({
    method: 'get',
    url: appServer.data + 'updateStandardByStandardAndStandardState',
    params: {...params}
  })
}

export function batchUpdateStatus(data, params) {
  return api({
    method: 'post',
    url: appServer.data + 'batchUpdateStatus',
    params: {...params},
    data: {...data}
  })
}

export function batchAudit(data, params) {
  return api({
    method: 'post',
    url: appServer.data + 'batchAudit',
    params: {...params},
    data: data
  })
}