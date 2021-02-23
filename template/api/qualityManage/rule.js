// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'
// ///////////////////// 规则分类 ////////////////////////
// 分页获取规则分类
export function getRuleType(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getTInspectRuleCategoryInfo',
    params: {...params}
  })
}

// 查询单条规则分类
export function getRuleTypeById(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getTInspectRuleCategoryInfoByRuleCategoryId',
    params: {...params}
  })
}

// 新增及修改方法
export function saveOrUpdateRuleType(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'saveTInspectRuleCategory',
    data: {...params}
  })
}

// 逻辑删除
export function delRuleType(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'delTInspectRuleCategory',
    params: {...params}
  })
}

// 查询所有规则分类
export function getAllInfo() {
  return api({
    method: 'get',
    url: appServer.quality + 'getAllInfo'
  })
}

// //////////////////////////////   规则 /////////////////////////////
// 分页获取规则
export function getRules(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getTInspectRuleInfo',
    params: {...params}
  })
}

// 查询单条规则分类
export function getRuleById(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getTInspectRuleInfoByRuleId',
    params: {...params}
  })
}

// 新增及修改方法
export function saveOrUpdateRule(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'saveOrUpdateTInspectRule',
    data: {...params}
  })
}

// 逻辑删除
export function delRuleById(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'deleteTInspectRule',
    params: {...params}
  })
}

// 查询所有规则
export function getAllRuleInfo() {
  return api({
    method: 'get',
    url: appServer.quality + 'getTInspectRuleAll'
  })
}

// //////////////////////////////   任务管理   /////////////////////////////
// 任务保存
export function saveTaskInfo(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'saveOrUpdateTInspectTaskInfoAndItem',
    data: {...params}
  })
}

// 分页获取任务列表
export function getTaskList(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getTInspectTaskInfoPage',
    params: {...params}
  })
}

// 查询单个任务列表
export function getTaskListById(taskInfoId) {
  return api({
    method: 'get',
    url: appServer.quality + 'getTGovTaskInfoById',
    params: {taskInfoId: taskInfoId}
  })
}

// 删除任务
export function delTaskById(id) {
  return api({
    method: 'post',
    url: appServer.quality + 'delTInspectTaskInfo',
    params: {id: id}
  })
}

// 启用/停用任务
export function startInspectTask(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'startInspectTask',
    data: {...params}
  })
}

//
export function pageInspectTaskRunInfo(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'pageInspectTaskRunInfo',
    params: {...params}
  })
}

export function getInspectTaskRunInfoByRunId(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getInspectTaskRunInfoByRunId',
    params: {...params}
  })
}

export function getInspectTaskRunItemByRunId(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getInspectTaskRunItemByRunId',
    params: {...params}
  })
}

export function startOrStopLabelCategoryById(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'startOrStopLabelCategoryById',
    params: {...params}
  })
}

export function startOrStopLabelById(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'startOrStopLabelById',
    params: {...params}
  })
}

