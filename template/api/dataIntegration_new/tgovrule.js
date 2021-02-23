// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function getTGovRuleInfo(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getTGovRuleInfo',
    params: {...params}
  })
}

// 新增及修改方法
export function saveOrUpdateTGovRule(params) {
  return api({
    method: 'post',
    url: appServer.integrate + 'saveOrUpdateTGovRule',
    data: {...params}
  })
}

// 逻辑删除
export function delTGovRule(params) {
  return api({
    method: 'post',
    url: appServer.integrate + 'delTGovRule',
    params: {...params}
  })
}

// 查询所有列表
export function getAllInfo() {
  return api({
    method: 'get',
    url: appServer.integrate + 'getAllInfo'
  })
}

// 获取规则树
export function getAllRule(catalogoryCode) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getTGovRuleAllAndCatelogry',
    params: {catalogoryCode: catalogoryCode}
  })
}

// 校验父级分类下规则中文名称是否重名 true：重名 false：不重名
export function checkRuleNameCn(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'checkRuleNameCn',
    params: {...params}
  })
}
//启停
export function startOrStopTGovRuleById(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'startOrStopTGovRuleById',
    params: {...params}
  })
}
