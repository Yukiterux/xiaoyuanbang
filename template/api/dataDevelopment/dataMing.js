// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取临时节点信息
export function getTempNode(uuid) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskDisplayItem',
    params: {uuid: uuid}
  })
}

// 保存临时节点信息
export function saveTempNode(params) {
  return api({
    method: 'post',
    url: appServer.task + 'saveOrUpdateTaskDisplayItem',
    data: {...params}
  })
}
export function getStdRangeRelByColumnId(columnId) {
  return api({
    method: 'get',
    url: appServer.data + 'getStdRangeRelByColumnId',
    params: {columnId: columnId}
  })
}

export function getStdRangeRelByRangeMasterId(rangeMasterId) {
  return api({
    method: 'get',
    url: appServer.data + 'getStdRangeRelByRangeMasterId',
    params: {rangeMasterId: rangeMasterId}
  })
}

// 获取节点连线信息
export function getNodeLine(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskDisplay',
    params: {...params}
  })
}

// 保存节点连线信息
export function saveNodeLine(params) {
  return api({
    method: 'post',
    url: appServer.task + 'saveOrUpdateTaskDisplay',
    data: {...params}
  })
}

// 保存节点连线信息和任务内容
export function saveTaskInfo(params) {
  return api({
    method: 'post',
    url: appServer.task + 'saveOrUpdateTaskInfo',
    data: {...params}
  })
}

// 保存当前任务的taskInfoId+Item的内容
export function saveTaskAndItem(params) {
  return api({
    method: 'post',
    url: appServer.task + 'saveOrUpdateTaskItems',
    data: {...params}
  })
}

// 查询所有的Items
export function getItemsByTaskInfoId(taskInfoId) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskItemsByInfoId',
    params: {taskInfoId: taskInfoId}
  })
}

// 获取挖掘列表
export function getMiningList(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getGovTaskInfoList',
    params: {...params}
  })
}

// 编辑挖掘任务
export function getGovTaskInfoByTaskInfoId(taskInfoId) {
  return api({
    method: 'get',
    url: appServer.task + 'getGovTaskInfoByTaskInfoId',
    params: {taskInfoId: taskInfoId}
  })
}

// 训练
export function runNowGovTask(taskInfoId) {
  return api({
    method: 'get',
    url: appServer.task + 'runNowGovTask',
    params: {taskInfoId: taskInfoId, executionFrequency: '00'}
  })
}

// 获取报告
export function getDataMiningReport(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getDataMiningReport',
    params: {...params}
  })
}

// 修改任任务状态
export function updateGovTaskInfoState(params) {
  return api({
    method: 'get',
    url: appServer.task + 'updateGovTaskInfoState',
    params: {...params}
  })
}

// 通过任务主键获取所有挖掘任务训练实例
export function getAllRunTaskItemByDataMiningTaskId(dataMiningTaskId) {
  return api({
    method: 'get',
    url: appServer.task + 'getAllRunTaskItemByDataMiningTaskId',
    params: {dataMiningTaskId: dataMiningTaskId}
  })
}

// 将模型转变为模版
export function addTaskInfoTemplate(taskInfoId, name, userId) {
  return api({
    method: 'get',
    url: appServer.task + 'addTaskInfoTemplate',
    params: {taskInfoId: taskInfoId, name: name, userId: userId}
  })
}

// 查询所有模版 (不分页）
export function listTaskInfoTemplate(type, state, name) {
  return api({
    method: 'get',
    url: appServer.task + 'listTaskInfoTemplate',
    params: {type: type, state: state, name: name}
  })
}
// 查询所有模版 (分页）
export function pageTaskInfoTemplate(params) {
  return api({
    method: 'get',
    url: appServer.task + 'pageTaskInfoTemplate',
    params: {...params}
  })
}
// 删除模版
export function delTaskInfoTemplateById(taskInfoTemplateId, userId) {
  return api({
    method: 'get',
    url: appServer.task + 'delTaskInfoTemplateById',
    params: {taskInfoTemplateId: taskInfoTemplateId, userId: userId}
  })
}

// 读取数据
export function readData(json) {
  return api({
    method: 'get',
    url: appServer.task + 'readData',
    params: {json: json}
  })
}

// 首页统计
export function getCountTaskInfo(params) {
  return api({
    method: 'get',
    url: appServer.task + 'countTaskInfo',
    params: {...params}
  })
}

// 获取规则分类
export function getAllInfo() {
  return api({
    method: 'get',
    url: appServer.integrate + 'getAllInfo'
  })
}
// 获取规则
export function getGovRuleByCategoryCode(categoryCode) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getGovRuleByCategoryCode',
    params: {categoryCode: categoryCode}
  })
}

// 检查增量字段
export function checkIncrementColumn(params) {
  return api({
    method: 'get',
    url: appServer.kettle + 'checkIncrementColumn',
    params: {...params}
  })
}

// 检查合并组件重复字段
export function checkMergeJoinParams(params) {
  return api({
    method: 'post',
    url: appServer.task + 'checkMergeJoinParams',
    data: params
  })
}
