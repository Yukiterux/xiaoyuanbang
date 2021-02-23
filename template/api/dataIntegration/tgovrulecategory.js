// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function getTGovRuleCategoryInfo(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTGovRuleCategoryInfo',
    params: {...params}
  })
}

// 新增及修改方法
export function saveTGovRuleCategory(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveTGovRuleCategory',
    data: {...params}
  })
}

// 逻辑删除
export function delTGovRuleCategory(params) {
  return api({
    method: 'post',
    url: appServer.template + 'delTGovRuleCategory',
    params: {...params}
  })
}

// 查询所有列表
export function getAllInfo() {
  return api({
    method: 'get',
    url: appServer.template + 'getAllInfo'
  })
}

// 校验父级分类下规则分类中文名称是否重名 true：重名 false：不重名
export function checkRuleCategoryNameCn(params) {
  return api({
    method: 'get',
    url: appServer.template + 'checkRuleCategoryNameCn',
    params: {...params}
  })
}
