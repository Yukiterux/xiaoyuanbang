// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 任务信息保存
export function saveOrUpdateTaskInfo(params) {
  return api({
    method: 'post',
    url: appServer.task + 'saveOrUpdateTaskInfo',
    data: {...params}
  })
}

// 任务保存配置
export function saveOrUpdateCollectionTask(params) {
  return api({
    method: 'post',
    url: appServer.task + 'saveOrUpdateCollectionTask',
    data: {...params}
  })
}

// 编辑任务任务
export function getGovTaskInfoByTaskInfoId(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getGovTaskInfoByTaskInfoId',
    params: {...params}
  })
}

// 编辑任务任务
export function getTaskItemsByInfoId(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskItemsByInfoId',
    params: {...params}
  })
}
