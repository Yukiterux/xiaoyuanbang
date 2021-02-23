// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function pageLabelExecutionInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageLabelExecutionInfo',
    params: {...params}
  })
}

export function countLabelExecutionInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'countLabelExecutionInfo',
    params: {...params}
  })
}

export function updateExecutionState(params) {
  return api({
    method: 'get',
    url: appServer.scheduler + 'updateExecutionState',
    params: {...params}
  })
}

export function deleteExecution(params) {
  return api({
    method: 'get',
    url: appServer.scheduler + 'deleteExecution',
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