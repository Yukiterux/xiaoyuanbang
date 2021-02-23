// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取实时监控图json
export function getMonitorJson(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'transformTaskInfoToEcharts',
    params: {...params}
  })
}

// 获取历史监控图json
export function getHistoryMonitorJson(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getExecutiveTimeCharts',
    params: {...params}
  })
}

// 获取实时监控详情list
export function getMonitorList(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getByGovTaskInfoId',
    params: {...params}
  })
}

// 获取执行次数list
export function getMonitorDateList(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getRecentDateInTen',
    params: {...params}
  })
}
// 新的接口-获取实时监控详情list
export function getTaskDetailList(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getByGovTaskInfoIdAndEndTime',
    params: {...params}
  })
}
// 新的接口-点击获取错误数据
export function getReportErrorByTaskId(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getReportErrorByTaskId',
    params: {...params}
  })
}
// 新的接口-点击获取详细日志
export function getConsoleLog(params) {
  return api({
    method: 'get',
    url: appServer.batch + 'getConsoleLog',
    params: {...params}
  })
}
// 新的接口-点击获取详细日志
export function getConsoleLog2(params) {
  return api({
    method: 'get',
    url: appServer.batch2 + 'getConsoleLog',
    params: {...params}
  })
}
// 新的接口-点击获取详细日志
export function getConsoleLog3(params) {
  return api({
    method: 'get',
    url: appServer.batch3 + 'getConsoleLog',
    params: {...params}
  })
}
