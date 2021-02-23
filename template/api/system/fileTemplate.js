// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
export function getFileTemplateList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getFileTemplatePageList',
    params: {...params}
  })
}

// 通过id查询
export function getFileTemplateById(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getFileTemplateById',
    params: {...params}
  })
}

// 删除
export function deleteFileTemplate(params) {
  return api({
    method: 'get',
    url: appServer.system + 'deleteFileTemplate',
    params: {...params}
  })
}

// 编辑与新增
export function saveFileTemplate(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveFileTemplate',
    data: {...params}
  })
}

export function checkTemplateName(params) {
  return api({
    method: 'get',
    url: appServer.system + 'checkTemplateName',
    params: {...params}
  })
}

export function deleteFileRelation(params) {
  return api({
    method: 'get',
    url: appServer.system + 'deleteFileRelation',
    params: {...params}
  })
}

export function getFileRelationByFileId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getFileRelationByFileId',
    params: {...params}
  })
}
