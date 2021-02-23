// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 表单列表
export function getDynamicFormList(params) {
  return api({
    method: 'get',
    url: appServer.template + 'pageTemplateView',
    params: {...params}
  })
}

// 保存表单
export function saveDynamicForm(params) {
  return api({
    method: 'post',
    url: appServer.template + 'saveOrUpdateTemplateView',
    data: {...params}
  })
}

// 删除表单
export function removeDynamicForm(params) {
  return api({
    method: 'get',
    url: appServer.template + 'delTemplateView',
    params: {...params}
  })
}

// 修改表单
export function getDynamicFormInfo(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTemplateViewById',
    params: {...params}
  })
}

// 表单模板列表
export function getTemplateFormList(params) {
  return api({
    method: 'get',
    url: appServer.template + 'templateViewTemplate/page',
    params: {...params}
  })
}

// 修改或是保存表单模板
export function saveTemplateForm(params) {
  return api({
    method: 'post',
    url: appServer.template + 'templateViewTemplate/saveOrUpdate',
    data: {...params}
  })
}

// 设置表单模板
export function setTemplateForm(params) {
  return api({
    method: 'get',
    url: appServer.template + 'templateViewTemplate/importView',
    params: {...params}
  })
}

// 获取单个表单模板页面
export function getTemplateFormInfo(params) {
  return api({
    method: 'get',
    url: appServer.template + 'templateViewTemplate/get',
    params: {...params}
  })
}

// 删除表单模板
export function deleteTemplateFormInfo(params) {
  return api({
    method: 'get',
    url: appServer.template + 'templateViewTemplate/delete',
    params: {...params}
  })
}

