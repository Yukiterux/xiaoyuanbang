// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 错误率变化
export function errorTrendChange(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'errorTrendChange',
    params: {...params}
  })
}
// 规则占比
export function ruleRatio(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'ruleRatio',
    params: {...params}
  })
}
// 总量统计
export function summationInfo(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'summationInfo',
    params: {...params}
  })
}
// 七日核验
export function verificationByWeek(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'verificationByWeek',
    params: {...params}
  })
}

// 首页获取
export function getHomePage(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getHomePage',
    params: {...params}
  })
}
