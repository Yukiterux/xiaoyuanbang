// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// // 综合报告总量统计
// export function comprehensiveStatisticsReportTotal(params) {
//   return api({
//     method: 'get',
//     url: appServer.quality + 'comprehensiveStatisticsReportTotal',
//     params: {...params}
//   })
// }
// // 表错误量占比前六
// export function tableErrorsCccountForTheTopSix(params) {
//   return api({
//     method: 'get',
//     url: appServer.quality + 'tableErrorsCccountForTheTopSix',
//     params: {...params}
//   })
// }
// // 综合报告7日错误数据
// export function comprehensiveReportOfWeek(params) {
//   return api({
//     method: 'get',
//     url: appServer.quality + 'comprehensiveReportOfWeek',
//     params: {...params}
//   })
// }
// // 七日规则错误量占比
// export function weekRuleErrorPercentage(params) {
//   return api({
//     method: 'get',
//     url: appServer.quality + 'weekRuleErrorPercentage',
//     params: {...params}
//   })
// }

// 总体报告页
export function getOverviewReport(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getOverviewReport',
    params: {...params}
  })
}