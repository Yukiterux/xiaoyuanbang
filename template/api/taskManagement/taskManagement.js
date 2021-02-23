// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import { appServer } from '../appServer'

// 表单列表
export function getTaskManagementList (params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDetectionTask/page',
    params: { ...params }
  })
}

// 获取下拉列表数据信息
export function getAllCategoryData () {
  return api({
    method: 'get',
    url: appServer.std + 'category/getAllCategory'
  })
}

// 获取数据源信息
export function getstdDataElementVersionlist (params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElementVersion/list',
    params: { ...params }
  })
}
// 新增数据标准检测任务
export function saveOrUpdate (params) {
  return api({
    method: 'post',
    url: appServer.std + 'stdDetectionTask/saveOrUpdate',
    data: { ...params }
  })
}

export function updateState (params) {
  return api({
    method: 'post',
    url: appServer.std + 'stdDetectionTask/updateState',
    data: { ...params }
  })
}

// 执行任务调度
export function executeSchedule (params) {
  return api({
    method: 'post',
    url: appServer.std + 'stdDetectionTask/executionTask',
    data: { ...params }
  })
}

//获取最新报告
export function getNewReportList (params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDetectionReport/getLatestStdDetectionReport',
    params: { ...params }
  })
}

// 第一层调度记录
export function getScheduleList (params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDetectionReport/page',
    params: { ...params }
  })
}

// 第二层调度记录
export function getRecordList (params) {
  return api({
    method: 'get',
    url: appServer.std + 'tdDetectionReportItem/page',
    params: { ...params }
  })
}
// 查询tab切换count
export function countStdDetectionTask (params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDetectionTask/countStdDetectionTask',
    params: { ...params }
  })
}
// 下线删除
export function deleteRecordListTotal (params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDetectionTask/delete',
    params: { ...params }
  })
}

// 上下线修改状态
export function updateStateOnlineOffLine (params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDetectionTask/updateState',
    params: { ...params }
  })
}