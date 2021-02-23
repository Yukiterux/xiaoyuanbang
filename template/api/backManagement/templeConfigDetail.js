// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 根据模板id查模板下的列表
export function getTemplateCmByTemplateId(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTemplateCmByTemplateId',
    params: {...params}
  })
}
// 根据页面id查页面对应的数据源信息
export function getCmInfoByDisplayId(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getCmInfoByDisplayId',
    params: {...params}
  })
}

// 基础界面保存
export function saveAndUpdateTemplateDetail(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveAndUpdateTemplateDetail',
    data: {...params}
  })
}

// 获取扩展页面table数据
export function getAllCorrelationInfoList(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getAllCorrelationInfoList',
    params: {...params}
  })
}

// 获取扩展页面table数据
export function getTableInfoByCorrelationInfoId(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTableInfoByCorrelationInfoId',
    params: {...params}
  })
}
// 扩展设置弹框保存
export function saveAndUpdateTemplateSubsidiary(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveAndUpdateTemplateSubsidiary',
    data: {...params}
  })
}
// 删除扩展设置
export function delTemplateSubsidiaryById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'delTemplateSubsidiaryById',
    params: {...params}
  })
}
// 获取扩展设置
export function getlTemplateSubsidiaryById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getlTemplateSubsidiaryById',
    params: {...params}
  })
}

// 获取主界面扩展预览
export function getTemplateSubsidiarPreview(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTemplateSubsidiarPreview',
    params: {...params}
  })
}

// 获取详情模板下配置所有界面
export function getTemplateDetailPage(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTemplateDetailPage',
    params: {...params}
  })
}

// 删除详情配置页面
export function delTemplateDetailById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'delTemplateDetailById',
    params: {...params}
  })
}

// 编辑获取详情模板的主页面详情信息
export function getTemplateDetailPreview(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTemplateDetailPreview',
    params: {...params}
  })
}

// 编辑获取详情模板基础详情信息
export function getTemplateDetailById(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTemplateDetailById',
    params: {...params}
  })
}
