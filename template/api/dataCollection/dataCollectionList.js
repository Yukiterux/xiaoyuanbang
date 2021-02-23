// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 数据采集保存
export function saveGovTaskInfo(params) {
  return api({
    method: 'post',
    url: appServer.task + 'saveGovTaskInfo',
    data: {...params}
  })
}

  // 数据采集列表
export function getGovTaskInfoPageList(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getGovTaskInfoPageList',
    params: {...params}
  })
}
 // 修改任任务状态
export function updateGovTaskInfo(params) {
  return api({
    method: 'get',
    url: appServer.task + 'updateGovTaskInfo',
    params: {...params}
  })
}

  // 编辑采集任务
export function getGovTaskInfoByTaskInfoId(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getCollectionTaskInfoByTaskInfoId',
    params: {...params}
  })
}
  // 运行任务
export function runNowGovTask(params) {
  return api({
    method: 'get',
    url: appServer.task + 'runNowGovTask',
    params: {...params}
  })
}
  // 名称校验
export function getTaskNameCn(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskNameCn',
    params: {...params}
  })
}

  // 复制源表保存
export function copyTableInfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'copyTableInfo',
    data: {...params}
  })
}
   // 复制源表名称校验
export function getTableInfoListByDatasourceIdAndTableName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getTableInfoListByDatasourceIdAndTableName',
    params: {...params}
  })
}

  // 调度
export function runGovTaskInfo(params) {
  return api({
    method: 'post',
    url: appServer.task + 'runGovTaskInfo',
    data: {...params}
  })
}
   // 查看实例  查询调度列表
export function getPageTaskExecutionList(param) {
  return api({
    method: 'get',
    url: appServer.task + 'getPageTaskExecutionList',
    params: {...param}
  })
}

    // 数据采集首页统计接口
export function getDataCollectionHomePage(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getDataCollectionHomePage',
    params: {...params}
  })
}
     // 新增数据统计
export function getTaskTotalNewData(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskTotalNewData',
    params: {...params}
  })
}
    // 各部门任务成功率
export function getEveryDeptTaskSuccessRate(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getEveryDeptTaskSuccessRate',
    params: {...params}
  })
}
export function cronExpression(cron) {
  return api({
    method: 'get',
    url: appServer.task + 'cronExpression',
    params: {cron: cron}
  })
}
