// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
export function getGovList(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTGovTaskInfo',
    params: {...params}
  })
}

// 查询单条流程
export function getTaskById(taskInfoId) {
  return api({
    method: 'get',
    url: appServer.template + 'getTGovTaskInfoById',
    params: {taskInfoId: taskInfoId}
  })
}

// 保存任务
export function saveGovTask(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveTGovTaskInfo',
    data: {...params}
  })
}

// 删除任务
export function deleteGovTaskById(taskId) {
  return api({
    method: 'post',
    url: appServer.template + 'delTGovTaskInfo',
    params: {id: taskId}
  })
}

// 获取流程属性
export function getTaskComp(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTempInfoByIdAndKey',
    params: {...params}
  })
}

// 保存流程属性
export function saveTaskComp(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveOrUpdateTtGovTaskTemp',
    data: {...params}
  })
}

// 保存任务组件
export function saveTaskAll(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveOrUpdateTGovTaskItemList',
    data: {params}
  })
}

// 保存时间cron
export function saveTaskCron(params) {
  return api({
    method: 'post',
    url: appServer.template + 'startGovTask',
    data: {...params}
  })
}

// 单条taskInfoId查询其所有组件的内容
export function getAllCompJsonBytaskId(taskInfoId) {
  return api({
    method: 'get',
    url: appServer.template + 'getTGovTaskItemListByInfoId',
    params: {taskInfoId: taskInfoId}
  })
}

// 查询任务实例
export function getByTimeRunTaskInfo(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getByTimeRunTaskInfo',
    params: {...params}
  })
}

// 获取实时监控详情 === 实例节点信息
export function getByIdRunTaskInfo(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getByIdRunTaskInfo',
    params: {...params}
  })
}
// 实例Excel下载
export function dataIntegrationGetLocalIP(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'dataIntegrationGetLocalIP',
    params: {...params}
  })
}
