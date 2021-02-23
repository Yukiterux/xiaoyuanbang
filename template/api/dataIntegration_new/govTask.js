// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
export function getGovList(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getTGovTaskInfo',
    params: {...params}
  })
}

// 查询单条流程
export function getTaskById(taskInfoId) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getTGovTaskInfoById',
    params: {taskInfoId: taskInfoId}
  })
}

// 保存任务
export function saveGovTask(params) {
  return api({
    method: 'post',
    url: appServer.integrate + 'saveTGovTaskInfo',
    data: {...params}
  })
}

// 删除任务
export function deleteGovTaskById(taskId) {
  return api({
    method: 'post',
    url: appServer.integrate + 'delTGovTaskInfo',
    params: {id: taskId}
  })
}

// 获取流程属性
export function getTaskComp(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getTempInfoByIdAndKey',
    params: {...params}
  })
}

// 保存流程属性
export function saveTaskComp(params) {
  return api({
    method: 'post',
    url: appServer.integrate + 'saveOrUpdateTtGovTaskTemp',
    data: {...params}
  })
}

// 保存任务组件
export function saveTaskAll(params) {
  return api({
    method: 'post',
    url: appServer.integrate + 'saveOrUpdateTGovTaskItemList',
    data: {params}
  })
}

// 保存时间cron
export function saveTaskCron(params) {
  return api({
    method: 'post',
    url: appServer.integrate + 'startGovTask',
    data: {...params}
  })
}

// 单条taskInfoId查询其所有组件的内容
export function getAllCompJsonBytaskId(taskInfoId) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getTGovTaskItemListByInfoId',
    params: {taskInfoId: taskInfoId}
  })
}

// 上传文件获取sheet信息
export function getSheetNameList(file) {
  return api({
    method: 'post',
    url: appServer.task + 'getSheetNameList',
    data: {file: file}
  })
}
// 获取文件信息（sheet）
export function getColumnNameList(filePath, sheetName) {
  return api({
    method: 'get',
    url: appServer.task + 'getColumnNameList',
    params: {filePath: filePath, sheetName: sheetName}
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
  // 通过字段id获取值域标准的映射或标准分类
export function getStdRangeRelByColumnId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStdRangeRelByColumnId',
    params: {columnId: params}
  })
}
    // 通过标准分类字段获取值域信息
export function getStdStandardListByCategoryId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStdStandardListByCategoryId',
    params: {...params}
  })
}

      // 通过标准分类字段获取值域信息
export function getDictInfoByStaticTypeId() {
  return api({
    method: 'get',
    url: appServer.system + 'getDictInfoByStaticTypeId'
  })
}
