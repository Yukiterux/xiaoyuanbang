// 引用封装后的axios
import api from '@/libs/ajax/http'
import qs from 'qs'
// 引用服务名
import {appServer} from '../../appServer'

//分页查询数据元
export function findStandardElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/page',
    params: {...params}
  })
}

//统计数据元
export function countStandardElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/countAudit',
    params: {...params}
  })
}


//删除数据元
export function deleteStandardElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/delete',
    params: {...params}
  })
}


//获取一条数据元
export function oneStandardElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/get',
    params: {...params}
  })
}


//导入数据元
export function importStandardElement(params) {
  return api({
    method: 'post',
    url: appServer.std + 'stdDataElement/importData',
    data: params,
    processData: false,
    contentType: false,
  })
}


//预览数据源
export function viewStandardElement(params) {
  return api({
    method: 'post',
    url: appServer.std + 'stdDataElement/previewData',
    data: params,
    processData: false,
    contentType: false,
  })
}


//发布数据元
export function publishStandardElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/publish',
    params: {...params}
  })
}


//新增或修改数据元
export function saveStandardElement(params) {
  return api({
    method: 'post',
    url: appServer.std + 'stdDataElement/saveOrUpdate',
    data: {...params}
  })
}


//提交审核
export function authStandardElement(params) {
  return api({
    method: 'post',
    url: appServer.std + 'stdDataElement/submit',
    data: params
  })
}


//更新状态
export function statusStandardElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/updateStatus',
    params: {...params}
  })
}


//获取审核发布数据
export function auditStandardElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/pageAudit',
    params: {...params}
  })
}

//获取数据集合
export function getVersionElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElementVersion/list',
    params: {...params}
  })
}

//获取数据集合
export function getVersionElementPage(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElementVersion/page',
    params: {...params}
  })
}


//获取数据元发布集合
export function getVersionElementCount(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElementVersion/count',
    params: {...params}
  })
}


//获取数据元发布集合
export function getVersionElementAudit(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/updateAuditStatus',
    params: {...params}
  })
}


//获取数据元发布集合
export function exportElementdata(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/exportData',
    params: params
  })
}


//获取数据元发布集合
export function changeElementdataStatus(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElementVersion/updateStatus',
    params: params
  })
}


//已发布的详情
export function getVersionDetail(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElementVersion/get',
    params: params
  })
}

//标准数据元统计
export function getStandCount(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/count',
    params: {...params}
  })
}

//批量审核
export function saveBatchAuthData(data, params) {
  return api({
    method: 'post',
    url: appServer.data + 'batchAudit',
    params: {...params},
    data: data
  })
}

//批量改变审核状态
export function saveBatchStatus(params) {
  const keys = params.keys.map(_ => `keys=${_}`).join('&');
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/updateAuditStatusBatch',
    params: params
  })
}

//批量发布
export function saveBatchPublish(param) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElement/publish',
    params: param,
  })
}

//废弃数据元
export function abandonDataEl(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElementVersion/abandonDataEl',
    params: params
  })
}

//获取数据元
export function getElementVersion(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElementVersion/get',
    params: {...params}
  })
}

//获取数据元分类
export function getDatasource(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmDataSourceListByCategoryId',
    params: {...params}
  })
}

//数据源
export function getDatasourceCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listDatasourceCategory',
    params: {...params}
  })
}

//查询接口
export function getAllColumnByDatasourceId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllColumnByDatasourceId',
    params: {...params}
  })
}

//保存
export function saveColumnElement(params, id) {
  return api({
    method: 'post',
    url: appServer.std + 'stdDataElementDatasourceService/saveOrUpdateList',
    data: params,
    params: id
  })
}

//查询数据源映射
export function getAllStdElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataElementDatasourceService/list',
    params: {...params}
  })
}

//查询数据标准分类
export function getCategoryName(params) {
  return api({
    method: 'get',
    url: appServer.std + 'category/getCategoryById',
    params: {...params}
  })
}

export function getStdElementDsJccj(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataDatasourceJccj/get',
    params: {...params}
  })
}

export function saveStdElementDsJccj(params) {
  return api({
    method: 'post',
    url: appServer.std + 'stdDataDatasourceJccj/saveOrUpdate',
    data: {...params}
  })
}

export function delStdElementDsJccj(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataDatasourceJccj/delete',
    params: {...params}
  })
}

export function pageStdElementDsJccj(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataDatasourceJccj/page',
    params: {...params}
  })
}

export function checkColumnStdElementDsJccj(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataDatasourceJccj/checkColumn',
    params: {...params}
  })
}

export function checkIsMainStdElementDsJccj(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataDatasourceJccj/page',
    params: {...params}
  })
}

export function setMainStdElementDsJccj(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDataDatasourceJccj/setMain',
    params: {...params}
  })
}
