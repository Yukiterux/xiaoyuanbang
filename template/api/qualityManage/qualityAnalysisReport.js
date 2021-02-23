// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// //第一步保存数据源信息
// export function saveTConfig(params) {
//   return api({
//     method: 'post',
//     url: '/dgms-template/saveTConfigTemplateCm',
//     data: {...params}
//   })
// }

// 质量综合报告接口
export function findQualityReportByDateAndDeptcode(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'findQualityReportByDateAndDeptcode',
    params: {...params}
  })
}

// // 任务综合报告接口
// export function findTaskQualityComprehensiveReport(params) {
//   return api({
//     method: 'get',
//     url: appServer.quality + 'findTaskQualityComprehensiveReport',
//     params: {...params}
//   })
// }

// 质量趋势报告接口
export function findDataQualityTrendAnaylisisReport(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'findDataQualityTrendAnaylisisReport',
    params: {...params}
  })
}

// 获取部门
export function findDeptInfo(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'findDeptInfo',
    params: {...params}
  })
}
// 根据部门id获取数据源信息
export function getDataSourceByDeptId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceByDeptId',
    params: {...params}
  })
}

//  //word文档下载
export function exportWordDocument(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'exportWordDocument',
    params: {...params}
  })
}

// pdf文档下载
export function exportPDFDocument(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'exportPDFDocument',
    params: {...params}
  })
}

// 任务综合报告接口
export function getInspectTaskRunInfo(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getInspectTaskRunInfo',
    params: {...params}
  })
}
// 获取分析报告页
export function getAnalysisReport(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getAnalysisReport',
    params: {...params}
  })
}
// 获取趋势报告页
export function getTrendReport(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getTrendReport',
    params: {...params}
  })
}