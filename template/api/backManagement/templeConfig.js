// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// // 获取实时监控图json
// export function getColumnJson(params) {
//   return api({
//     method: 'get',
//     url: 'getColumnInfoByIds',
//     params: {...params}
//   })
// }

// 第一步保存数据源信息
export function saveTConfig(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveTConfigTemplateCm',
    data: {...params}
  })
}

// 第二步保存字段信息
export function saveTConfigColumn(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveTConfigTemplateColumninfo',
    data: {...params}
  })
}
// 第三步保存字段信息
export function saveTemplateDisplay(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveTemplateDisplayVo',
    data: {...params}
  })
}

// //第三步保存字段信息===新
// export function saveTemplateDisplay(params) {
//   return api({
//     method: 'post',
//     url: 'saveTConfigTemplateDisplay',
//     data: {...params}
//   })
// }

// 预览接口
export function previewTemplateDisplay(params) {
  return api({
    method: 'get',
    url: appServer.template + 'previewTemplateDisplay',
    params: {...params}
  })
}

// 判断数据表是否有主键
export function getPrimaryKey(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getPrimaryKey',
    params: {...params}
  })
}

// 下钻详情
export function getTempDetailData(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getDataByTableNameAndDatasourceId',
    params: {...params}
  })
}

// 配置模板回显数据源
export function getTConfigTemplateCmById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTConfigTemplateCmById',
    params: {...params}
  })
}

// 选中字段回显
export function getTConfigTemplateColumninfoById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTConfigTemplateColumninfoById',
    params: {...params}
  })
}

// 获取单条模板内容
export function getTConfigTemplateById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTConfigTemplateById',
    params: {...params}
  })
}

// 通过cmId查询模版预览
export function getTConfigTemplateDisplayByCmId(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTConfigTemplateDisplayByCmId',
    params: {...params}
  })
}

// // 通过cmId查询字段信息
// export function getColumnInfoByCmId(params) {
//   return api({
//     method: 'get',
//     url: 'getColumnInfoByCmId',
//     params: {...params}
//   })
// }

// 新增=通过字段 ids 查询字段信息
export function getColumnInfoByIds(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getColumnInfoByIds',
    params: {...params}
  })
}
// 编辑=通过字段 ids 查询字段信息
export function getEditColumnInfoByIds(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getEditColumnInfoByIds',
    params: {...params}
  })
}
// =============================模板管理=================
// 查所有模板接口
export function getTConfigTemplateList(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTConfigTemplateList',
    params: {...params}
  })
}
// 模板新增编辑保存
export function saveTConfigTemplate(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveTConfigTemplate',
    data: {...params}
  })
}

// 删除模板内容
export function updateTConfigTemplateById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'updateTConfigTemplateById',
    params: {...params}
  })
}
//
// 获取菜单展示模块
export function getAuthorityByTemplateId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getAuthorityByTemplateId',
    params: {...params}
  })
}

// 根据displayId查下钻参数
export function getTConfigTemplateDisplay(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTConfigTemplateDisplayByTempDisplayId',
    params: {...params}
  })
}

// 根据displayId删除配置页面
export function updateTConfigTemplateDisplay(params) {
  return api({
    method: 'get',
    url: appServer.template + 'updateTConfigTemplateDisplay',
    params: {...params}
  })
}
// 根据displayId删除配置页面
export function previewTemplateDetail(params) {
  return api({
    method: 'get',
    url: appServer.template + 'previewTemplateDetail',
    params: {...params}
  })
}

// 根据columnId查询值域标准
export function getStdByColId(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getStdByColId',
    params: {...params}
  })
}