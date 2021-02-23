// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 地市下发
export function getCountryIssueResult() {
  return api({
    method: 'get',
    url: appServer.quality + 'getCountryIssueResult'
  })
}

// 上报国家
export function getCountryReportedResult() {
  return api({
    method: 'get',
    url: appServer.quality + 'getCountryReportedResult'
  })
}

// 数据汇聚
export function getDataAggregationResult() {
  return api({
    method: 'get',
    url: appServer.quality + 'getDataAggregationResult'
  })
}

// 数据中心预览
export function getDataCenterResult() {
  return api({
    method: 'get',
    url: appServer.quality + 'getDataCenterResult'
  })
}

// 事项覆盖率和错误率
export function getDataErrorRateResult() {
  return api({
    method: 'get',
    url: appServer.quality + 'getDataErrorRateResult'
  })
}

// 定时任务执行接口
export function saveGovTask() {
  return api({
    method: 'get',
    url: appServer.quality + 'saveTGovTaskInfo'
  })
}

// 数据交换趋势图
export function getDataExchangeResult() {
  return api({
    method: 'get',
    url: appServer.quality + 'getDataExchangeResult'
  })
}

// 部门汇聚
export function getDepartmentDataAggregationResult() {
  return api({
    method: 'get',
    url: appServer.quality + 'getDepartmentDataAggregationResult'
  })
}

// 部门数据汇聚月增长
export function getDepartmentDataAggregationIncreaseResult() {
  return api({
    method: 'get',
    url: appServer.quality + 'getDepartmentDataAggregationIncreaseResult'
  })
}

// 错误数据整改情况
export function getErrorDataSolveResult() {
  return api({
    method: 'get',
    url: appServer.quality + 'getErrorDataSolveResult'
  })
}

// 获取数据大盘统计结果-苏州
export function getDataMarketReportSuZhou() {
  return api({
    method: 'get',
    url: appServer.quality + 'getDataMarketReportSuZhou'
  })
}

// 获取数据大盘统计结果-平凉
export function getDataMarketReportPl() {
  return api({
    method: 'get',
    url: appServer.quality + 'getDataMarketReportPl'
  })
}
