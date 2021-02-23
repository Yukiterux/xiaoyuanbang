// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'


// 采集数据列表
export function findCollTaskManagerList(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaCollectTaskInfo/page',
      params: {...params}
    })
}


// 新增采集数据
export function saveCollTaskManagerInfo(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaCollectTaskInfo/saveOrUpdate',
    data: {...params}
  })
}


// 获取单个数据
export function findCollTaskManagerInfo(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaCollectTaskInfo/get',
    params: {...params}
  })
}

// 删除采集任务
export function removeCollTaskManagerInfo(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaCollectTaskInfo/delete/',
    params: {...params}
  })
}

// 更新任务状态
export function updateColleManagerStatus(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaCollectTaskInfo/updateStatus',
    params: {...params}
  })
}

//任务调度
export function saveOrUpdateExecution(params) {
  return api({
    method: 'post',
    url: appServer.scheduler + 'saveOrUpdateExecution',
    data: {...params}
  })
}

//查询调度任务
export function findTaskSchedulingList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaCollectTaskInfo/pageExecution',
    params: {...params}
  })
}

//调度状态数量
export function findTaskSchedulingStatus(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaCollectTaskInfo/countExecution',
    params: {...params}
  })
}


//查询调度记录
export function findSchedulingLogs(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'collectLog/pageRunInfo',
    params: {...params}
  })
}


//查询调度记录数量
export function findSchedulingLogNumber(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'collectLog/countRunInfo/',
    params: {...params}
  })
}

//任务采集数量统计
export function findCollectTaskCount(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaCollectTaskInfo/getCount',
    params: {...params}
  })
}


//更新调度状态
export function updateCollectTaskSceduler(params) {
  return api({
    method: 'get',
    url: appServer.scheduler + 'updateExecutionState',
    params: {...params}
  })
}

//数据预览
export function getPerviewData(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaCollectTaskInfo/preView',
    params: params
  })
}