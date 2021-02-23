// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function getAllGovTaskCategory(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getAllGovTaskCategory',
    params: {...params}
  })
}

// 通过id删除数据
export function deleteGovTaskCategory(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'deleteGovTaskCategory',
    params: {...params}
  })
}
// 高级搜索
export function govMultiConditionalQuery(params) {
  return api({
    method: 'post',
    url: appServer.integrate + 'govMultiConditionalQuery',
    data: {...params}
  })
}
// 查看此id下有没有子记录
export function ztreeGovMenuDeleteCheck(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'ztreeGovMenuDeleteCheck',
    params: {...params}
  })
}

// 保存数据
export function saveGovTaskCategory(params) {
  return api({
    method: 'post',
    url: appServer.integrate + 'saveGovTaskCategory',
    data: {...params}
  })
}

// 获取树形菜单数据
export function findAllGovTaskCategoryZtree(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'findAllGovTaskCategoryZtree',
    params: {...params}
  })
}

// 根据id获取
export function getByIdGovTaskCategory(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getByIdGovTaskCategory',
    params: {...params}
  })
}

// name模糊查询
// export function getByCnameGovTaskCategoryList(params){
//   return api({
//     method: 'get',
//     url: '/dgms-system/getByCnameGovTaskCategoryList',
//     params: {...params}
//   })
// }

// name校验
export function checkGovTaskCategoryName(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'checkGovTaskCategoryName',
    params: {...params}
  })
}

// 获取父节点下的子节点
export function getGovTaskCategoryTreeNodeInfo(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getGovTaskCategoryTreeNodeInfo',
    params: {...params}
  })
}

// 获取父节点下的子节点
export function pageGovTaskCategory(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'pageGovTaskCategory',
    params: {...params}
  })
}

export function getTaskCategoryBytaskCategoryId(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskCategoryInfoById',
    params: {...params}
  })
}

// 获取左侧树
export function getTaskCategoryTree(params) {
  return api({
    method: 'get',
    url: appServer.task + 'getTaskCategoryTree',
    params: {...params}
  })
}

// 启/停用分类
export function updateTaskCategoryState(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'updateStateById',
    params: {...params}
  })
}
