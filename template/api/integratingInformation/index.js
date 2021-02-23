/*
 * @Author: HJM
 * @Description:集成信息相关
 * @Date: 2020-09-14 10:19:13
 * @LastEditors: M
 * @LastEditTime: 2020-11-04 09:27:32
 */
// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import { appServer } from '../appServer'
// 新增表单
export function creatForm (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'tableConfif/insert',
    data: data
  })
}
// 修改表单
export function updateForm (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'tableConfif/update',
    data: data
  })
}
// 获取指标下拉树型数据
export function getSelectTreeList () {
  return api({
    method: 'get',
    url: appServer.integratingInformation + 'dynamicTable/indexList',
  })
}
// 采集数据上报管理-获取列表
export function getWaitReportList (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataReport/getWaitReportList',
    data: data
  })
}
// 采集数据上报管理-查看详情
export function queryInfoDetail (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataReport/queryInfoDetail',
    data: data
  })
}
// 采集数据上报管理-删除
export function deleteInfo (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataReport/deleteInfo',
    data: data
  })
}
// 采集数据上报管理-上报
export function applyInfo (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataReport/applyInfo',
    data: data
  })
}
// 采集数据上报审核-待办
export function waitApprovalList (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataReport/waitApprovalList',
    data: data
  })
}
// 采集数据上报审核-审核
export function dealApply (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataReport/dealApply',
    data: data
  })
}
// 采集数据上报审核-已完成
export function isOkApprovalList (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataReport/isOkApprovalList',
    data: data
  })
}
// 采集任务管理
export function collectTaskList (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'collectTask/selectAll',
    data: data
  })
}
// 检验异常
export function errorInfoList (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataVerifyError/selectAll',
    data: data
  })
}

// 上报管理-数据录入-获取表单页面元素
// dynamicTable/tableElement
export function getTableElement (data) {
  return api({
    method: 'get',
    url: appServer.integratingInformation + 'dynamicTable/tableElement',
    params: data
  })
}

// 上报管理-数据录入-手动录入表单数据
export function inputFormDate (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dynamicTable/singleData',
    data: data
  })
}


//上报管理-修改表单数据
export function editFormDate (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataReport/modifyInfo',
    data: data
  })
}

// 任务树
// dynamicTable/taskTree
export function taskTree (data) {
  return api({
    method: 'get',
    url: appServer.integratingInformation + 'dynamicTable/taskTree',
  })
}

// 上传文件回调
export function fileUploaderCallback (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'reportRecordFile/reportFile',
    data: data
  })
}

// 模板下载
export function filedownLoad (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'collectTask/findFileId',
    params: data
  })
}

// 核准
export function report (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataVerifyLog/report',
    data: data
  })
}
// 需求表单列表
export function requireTableList (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'tableConfif/requireTableConfig',
    data: data
  })
}

// 需求表单管理查看表单详情
export function requireTableFormCheck (data) {
  return api({
    method: 'get',
    url: appServer.integratingInformation + 'tableVerify/table',
    params: data
  })
}

//需求表单管理 审核
export function requireTableExamine (data) {
  return api({
    method: 'get',
    url: appServer.integratingInformation + 'tableVerify/open',
    params: data
  })
}

// 采集需求表单审核列表
export function requireTableExamineList (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'tableVerify/tableList',
    data: data
  })
}

//采集需求表单审核-发起审核
export function toExamine (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'tableVerify/verify',
    data: data
  })
}

//部门任务树
export function departmentTaskTree (params) {
  return api({
    method: 'get',
    url: appServer.integratingInformation + 'dept/asyncDeptTreeData',
    params: { ...params }
  })
}

// 采集任务管理_修改任务
export function amendTask (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'collectTask/update',
    data: data
  })
}

// 采集任务管理_发布任务
export function issueTask (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'collectTask/publishJob',
    data: data
  })
}

// 采集任务管理_新增任务
export function addTask (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'collectTask/insert',
    data: data
  })
}

// 采集任务管理_子任务列表
export function collectTaskTwoList (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'collectTask/creatSubmit',
    data: data
  })
}

//获取需求
export function demandList (params) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'collectRequire/getRequireIdAndNameByNotask',
    data: { ...params }
  })
}

// 通过分类查询任务列表
export function searchTnt (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dynamicTable/taskList',
    data: data

  })
}

// 办理中批次列表（任务批次查询接口）
export function batchInfoQuery (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataReport/batchInfoQuery',
    data: data

  })
}

// 办理中/已办理 查看批次详情接口
export function batchDataQuery (data) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'dataReport/batchDataQuery',
    data: data

  })
}
// 任务采集进度
export function checkscheduleList (params) {
  return api({
    method: 'post',
    url: appServer.integratingInformation + 'collectTask/collectTaskStatus',
    data: { ...params }

  })
}

// 通过部门id获取审批人
export function getApprovalList(params) {
      return api({
        method: 'post',
        url: appServer.integratingInformation + 'collectTask/getListUserAndSaveByDeptId',
        data: {...params}
      })
  }

// 工作流审批数据保存
export function ApprovalSave(params) {
      return api({
        method: 'post',
        url: appServer.integratingInformation + 'collectTask/saveCheckPersonIntoDataSource',
        data: {...params}
      })
  }
  
  // 数据填报记录列表
export function dataProvidedList(params) {
      return api({
        method: 'post',
        url: appServer.integratingInformation + 'reportRecordFile/queryFailList',
        data: {...params}
      })
  }

    // 数据启动
export function dataStartList(params) {
      return api({
        method: 'post',
        url: appServer.integratingInformation + 'dataReport/startTask',
        data: {...params}
      })
  }
