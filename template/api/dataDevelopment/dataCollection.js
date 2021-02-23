// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function getAllGovTaskCategory(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getAllGovTaskCategory',
    params: {...params}
  })
}

// 获取父节点下的子节点
export function getGovTaskCategoryTreeNodeInfo(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getGovTaskCategoryTreeNodeInfo',
    params: {...params}
  })
}

// 获取任务及日志相关列表
export function getRuntaskListInfo(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getRunTaskList',
    params: {...params}
  })
}

// 查看日志接口
export function getTaskLogByTaskId(params) {
  return api({
    method: 'get',
    url: appServer.task + 'readLogByRunTaskId',
    params: {...params}
  })
}

// 日志下载功能
export function downTaskLogByTaskId(params) {
  return api({
    method: 'get',
    url: appServer.task + 'downLogByRuntaskId',
    params: {...params}
  })
}

// 批量下载
export function batchDownLog(params) {
  return api({
    method: 'get',
    url: appServer.task + 'runTaskLogMultipleDownload',
    params: {...params}
  })
}
