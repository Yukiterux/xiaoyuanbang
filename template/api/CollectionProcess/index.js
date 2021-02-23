// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 固定表单列表
export function queryTableAttr(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'tableAttr/queryTableAttr',
      data: {...params}
    })
  }
  // 禁用按钮
export function diableById(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'tableAttr/diableById',
      params: {...params}
    })
  }
    // 启用按钮
export function enableById(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'tableAttr/enableById',
      params: {...params}
    })
  }
  //固定表单新增
  export function addTableAttr(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'tableAttr/addTableAttr',
      data: {...params}
    })
  }
  //固定表单下拉
  export function queryAllField(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'tableAttr/queryAllField',
      data: {...params}
    })
  }
  //固定表单查看
  export function queryById(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'tableAttr/queryById',
      data: {...params}
    })
  }
  ///////采集需求申请
  // 待办表单分页
  export function selectListRequire(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'collectRequire/selectListRequire',
      data: {...params}
    })
  }
  // 新增弹窗下拉列表
  export function queryAllTypeName(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'dataType/queryAllTypeName',
      params: {...params}
    })
  }
  // 新增
  export function addCollectRequire(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'collectRequire/addCollectRequire',
      data: {...params}
    })
  }
  //查看
  export function selectRequireByid(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'collectRequire/selectRequireByid',
      params: {...params}
    })
  }
  //修改
  export function updateCollect(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'collectRequire/updateCollectRequire',
      data: {...params}
    })
  }
   //删除
   export function deleteCollect(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'collectRequire/deleteCollectRequire',
      params: {...params}
    })
  }
   //申请
   export function applyRequire(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'collectRequire/applyRequire',
      data: {...params}
    })
  }
  //////////////需求流程审核
  //待办分页
  export function ToReviewByFlow(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'collectRequire/selectListCollectRequireToReviewByFlow',
      data: {...params}
    })
  }
  //已办分页
  export function RequireToReview(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'collectRequire/selectListCollectRequireToReview',
      data: {...params}
    })
  }
  //审核
  export function ReviewRequire(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'collectRequire/ReviewRequire',
      data: {...params}
    })
  }
  //////////////////////////信息分类(数据标准)
  //分页
  export function queryDataType(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'dataType/queryDataType',
      data: {...params}
    })
  }
  //禁用
  export function diableByIdType(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'dataType/diableById',
      params: {...params}
    })
  }
  //启用
  export function enableByIdType(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'dataType/enableById',
      params: {...params}
    })
  }
  //查看
  export function queryByIdType(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'dataType/queryById',
      params: {...params}
    })
  }
  //dom树
  export function queryDataTypeTree(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'dataType/queryDataTypeTree',
      params: {...params}
    })
  }
  //新增
  export function addDataType(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'dataType/addDataType',
      data: {...params}
    })
  }
  //修改
  export function updateDataType(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'dataType/updateDataType',
      data: {...params}
    })
  }
  //////////////
  //新增任务
  export function insert(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'collectTask/insert',
      data: {...params}
    })
  }
  //新增任务表单下拉
  export function queryAll(params) {
    return api({
      method: 'post',
      url: appServer.integratingInformation + 'tableConfif/queryAll',
      data: {...params}
    })
  }
  //新增任务表单下拉(类型下拉)
  export function listForJccj(params) {
    return api({
      method: 'get',
      url: appServer.collect + 'stdCodeSetList/list',
      params: {...params}
    })
  }
  
 //需求审核查看意见列表
  export function auditOpinionList(params) {
    return api({
      method: 'get',
      url: appServer.integratingInformation + 'requireVerifyLog/selectRequireLogByRequireId',
      params: {...params}
    })
  }