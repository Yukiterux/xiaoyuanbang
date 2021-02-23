// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取实时监控图json
export function getMonitorJson(params) {
  return api({
    method: 'get',
    url: appServer.template + 'transformTaskInfoToEcharts',
    params: {...params}
  })
}

// 获取历史监控图json
export function getHistoryMonitorJson(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getExecutiveTimeCharts',
    params: {...params}
  })
}

// 获取实时监控详情list
export function getMonitorList(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getByGovTaskInfoId',
    params: {...params}
  })
}

// 获取执行次数list
export function getMonitorDateList(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getRecentDateInTen',
    params: {...params}
  })
}
// 新的接口-获取实时监控详情list
export function getTaskDetailList(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getByGovTaskInfoIdAndEndTime',
    params: {...params}
  })
}
