// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取部门列表
export function getRuleReportDepts(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getRuleReportDepts',
    params: {...params}
  })
}

// 获取部门报告
export function getDeptRuleReport(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getDeptRuleReport',
    params: {...params}
  })
}
// 获取数据源报告
export function getDsRuleReport(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getDsRuleReport',
    params: {...params}
  })
}
//获取规则报告页
export function getRuleReport(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getRuleReport',
    params: {...params}
  })
}
