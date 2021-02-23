// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 产品获取接口表单列表
export function ProductObtain(params) {
  return api({
    method: 'post',
    url: appServer.dataservice + 'productObtain/listProductObtainsByDept',
    data: {...params}
  })
}
// 产品获取接口表单列表
export function ProductObtainList(params) {
  return api({
    method: 'post',
    url: appServer.dataservice + 'productObtain/listProductObtains',
    data: {...params}
  })
}
// 产品获取详情
export function selectProductObtainById(params) {
  return api({
    method: 'get',
    url: appServer.dataservice + 'productObtain/selectProductObtainById',
    params: {...params}
  })
}
//产品获取申请
export function ProductApplication(params) {
  return api({
    method: 'post',
    url: appServer.dataservice + 'productObtain/saveProductObtain',
    data: {...params}
  })
  }
  //产品审核（待办）
export function approvalObtain(params) {
  return api({
    method: 'post',
    url: appServer.dataservice + 'productObtain/approvalObtain',
    data: {...params}
    })
  }
  //产品获取详情弹窗下拉列表
  export function selectApplicable(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/productObtain/selectApplicableProductOrder',
      data: {...params}
    })
  }
  //产品获取创建
  export function saveProductObtain(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/productObtain/saveProductObtain',
      data: {...params}
    })
  }
   //待审核产品获取列表
  export function listWaitCheck(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + 'productObtain/listWaitCheckProductObtains',
      data: {...params}
    })
  }
  
  //已审核产品获取列表
  export function listCheckedProduct(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + 'productObtain/listCheckedProductObtains',
      data: {...params}
    })
  }
  ///////////////////////////////////////////
// 产品工单管理列表
export function getDataWorkList(params) { 
    return api({
      method: 'post',
      url: appServer.dataservice + 'order/queryOrderList',
      data: {...params}
    })
}

// 产品研发任务管理待办列表
export function getDataproductList(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + 'order/queryUndoOrderList',
      data: {...params}
    })
} 
// 产品研发任务管理已办列表
export function getDataproductHaveList(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + 'order/queryDoneOrderList',
      data: {...params}
    })
} 

// 产品发布管理列表接口
export function getproductReleaseList(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + 'order/queryReleaseOrderList',
      data: {...params}
    })
} 

// 产品工单详情接口
export function getproductDetail(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/order/orderDetail',
      data: {...params}
    })
} 

//修改产品工单
export function modificationProduct(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/order/updateOrder',
      data: {...params}
    })
} 

//验收列表
export function getproductAcceptance(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/productAccept/selectListProductAccept',
      data: {...params}
    })
} 

//验收详情
export function ObtainProductDetail(params) {
  return api({
    method: 'get',
    url: appServer.dataservice + 'productAccept/selectProductAcceptById',
    params: {...params}
  })
}

//验收通过
export function passAcceptance(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/productAccept/doPassProductAccept',
      data: {...params}
    })
} 

//验收不通过
export function NoPassAcceptance(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/productAccept/doNotPassProductAccept',
      data: {...params}
    })
} 

//查看验收记录
export function ObtainProductRecord(params) {
  return api({
    method: 'get',
    url: appServer.dataservice + 'productAccept/selectProductAcceptRecordByProductOrderId',
    params: {...params}
  })
}

//发布产品
export function passIssue(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/order/releaseOrder',
      data: {...params}
    })
}

//下载文件
export function downLoad(params) {
        return api({
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'blob', // 一定要写
            method: 'get',
            url: appServer.downloadFile + '/fileDownload/',
            params: { ...params }
        });
    }

//文件删除(总数据库)
  export function updateStateByFileId(params) {
    return api({
      method: 'get',
      url: appServer.system + 'updateStateByFileId',
      params: {...params}
    })
  }
//文件删除(数据服务数据库)
  export function deleteStateByFileId(params) {
    return api({
      method: 'get',
      url: appServer.dataservice + 'order/fileDelete',
      params: {...params}
    })
  } 
//获取流程
  export function getFlow(params) {
      return api({
        method: 'post',
        url: appServer.flow + 'bpm/definition/listJson',
        params: {...params}
      })
  } 

//获取产品维护流程图
export function getFlowImg(params) {
    return api({
      method: 'get',
      url: appServer.flow + 'bpm/instance/flowImage',
      params: {...params}
    })
  } 

//获取流程用户相关节点信息
export function getFlowInfo(params) {
      return api({
        method: 'post',
        url: appServer.flow + '/bpm/instance/queryFlowUserNodeInfo',
        params: {...params}
      })
  }
 

  //产品流程办理-申请填写提交
export function fillInFor(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/order/applyDealOrderProcess',
      data: {...params}
    })
}

//产品流程办理-审核提交
export function AuditToDeal(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/order/dealOrderProcess',
      data: {...params}
    })
}

//发起验收
export function Acceptance(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/order/applyAccept',
      data: {...params}
    })
}

//启动流程
export function launchAcceptance(params) {
    return api({
      method: 'post',
      url: appServer.dataservice + '/order/updateOrder',
      data: {...params}
    })
}

//获取流程列表
export function getFlowInfoList(params) {
      return api({
        method: 'post',
        url: appServer.flow + '/bpm/definition/listJson',
        params: {...params}
      })
  }