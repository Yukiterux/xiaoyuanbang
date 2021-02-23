// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function listTaskCategory(params) {
  return api({
    method: 'get',
    url: appServer.task + 'listTaskCategory',
    params: {...params}
  })
}

// 获取数据列表
export function pageTaskExecution(params) {
  return api({
    method: 'get',
    url: appServer.task + 'pageTaskExecution',
    params: {...params}
  })
}

export function countTaskExecutionByState(params) {
  return api({
    method: 'get',
    url: appServer.task + 'countTaskExecutionByState',
    params: {...params}
  })
}

export function pageTaskRunInfoByExecutionId(params) {
  return api({
    method: 'get',
    url: appServer.task + 'pageTaskRunInfoByExecutionId',
    params: {...params}
  })
}

export function listTaskRunItem(params) {
  return api({
    method: 'get',
    url: appServer.task + 'listTaskRunItem',
    params: {...params}
  })
}

export function pageTaskRunInfo(params) {
  return api({
    method: 'get',
    url: appServer.task + 'pageTaskRunInfo',
    params: {...params}
  })
}

export function countRunTaskInfoByState(params) {
  return api({
    method: 'get',
    url: appServer.task + 'countRunTaskInfoByState',
    params: {...params}
  })
}

export function getTaskDisplayContent(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskDisplayContent',
    params: {...params}
  })
}

export function downLogByRuntaskId(params) {
  return api({
    method: 'get',
    url: appServer.task + 'downLogByRuntaskId',
    params: {...params}
  })
}

export function readLogByRunTaskId(params) {
  return api({
    method: 'get',
    url: appServer.task + 'readLogByRunTaskId',
    params: {...params}
  })
}

export function updateExecutionStateById(params) {
  return api({
    method: 'get',
    url: appServer.task + 'updateExecutionStateById',
    params: {...params}
  })
}

export function getTaskRunInfoIndex(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskRunInfoIndex',
    params: {...params}
  })
}

export function getExecutionIndex(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getExecutionIndex',
    params: {...params}
  })
}

export function getSystemInfo() {
  return api({
    method: 'get',
    url: appServer.task + 'getSystemInfo'
  })
}

export function getRunTaskCountByDate(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getRunTaskCountByDate',
    params: {...params}
  })
}

export function getTaskExecutionCountByDate(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskExecutionCountByDate',
    params: {...params}
  })
}

export function saveOrUpdateTaskExecution(params) {
  return api({
    method: 'post',
    url: appServer.task + 'saveOrUpdateTaskExecution',
    data: {...params}
  })
}

export function getOneRunTaskItemByTaskInfoId(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getOneRunTaskItemByTaskInfoId',
    params: {...params}
  })
}
