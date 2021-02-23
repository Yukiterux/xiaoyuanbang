  // 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

  // 所有数据标签定义列表
export function listLabelInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listLabelInfo',
    params: {...params}
  })
}
// 分页数据标签定义列表数据查询
export function pageLabelInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageLabelInfo',
    params: {...params}
  })
}
  // 修改标签状态
export function updateLabelInfoState(params) {
  return api({
    method: 'get',
    url: appServer.data + 'updateLabelInfoState',
    params: {...params}
  })
}
  // 逻辑删除
export function deleteLabelInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteLabelInfo',
    params: {...params}
  })
}
  // 保存数据标签
export function saveOrUpdateLabelInfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveOrUpdateLabelInfo',
    data: {...params}
  })
}
//   // 单条提交审核
// export function saveAuditFlow(params) {
//   return api({
//     method: 'post',
//     url: appServer.data + 'saveAuditFlow',
//     data: {...params}
//   })
// }

  // 标签编辑
export function getLabelInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getLabelInfo',
    params: {...params}
  })
}
  // 根据标签名称查询子级标签
export function listLabelInfoByName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listLabelInfoByName',
    params: {...params}
  })
}
  // 标签重名校验
export function checkLabelInfoByName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'checkLabelInfoByName',
    params: {...params}
  })
}
  // 标签单条提交审核
export function submitLabelInfo(params, data) {
  return api({
    method: 'post',
    url: appServer.data + 'submitLabelInfo',
    params: {...params},
    data: {...data}
  })
}
  // 编辑回显
export function displayLabelInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'displayLabelInfo',
    params: {...params}
  })
}
  // 回显父标签规则
export function displayLabelInfoContentArray(params) {
  return api({
    method: 'post',
    url: appServer.data + 'displayLabelInfoContentArray',
    data: {...params}
  })
}
