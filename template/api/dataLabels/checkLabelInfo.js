// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function  getCheckLabelInfoByName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCheckLabelInfoByName',
    params: {...params}
  })
}

export function  addLabekDefinition(params) {
    return api({
      method: 'get',
      url: appServer.data + 'addLabekDefinition',
      params: {...params}
    })
  }

  export function  getCheckLabelInfoLevel(params) {
    return api({
      method: 'get',
      url: appServer.data + 'getCheckLabelInfoLevel',
      params: {...params}
    })
  }  

  export function  downloadTaskAnalysisPresentation(params) {
    return api({
      // method: 'get',
      url: appServer.data + 'downloadTaskAnalysisPresentation',
      params: {...params}
    })
  }  

  export function  getLabelCheck(labelInfoId) {
    return api({
      method: 'get',
      url: appServer.data + 'getLabelCheck',
      params: {labelInfoId: labelInfoId}
    })
  }  

  export function  findAll() {
    return api({
      method: 'get',
      url: appServer.data + 'findAll'
    })
  }

  export function  getCheckLabelInfoLevelCode(labelInfoLevelCode) {
    return api({
      method: 'get',
      url: appServer.data + 'getCheckLabelInfoLevelCode',
      params: {labelInfoLevelCode: labelInfoLevelCode}
    })
  } 
  //数据展示页面
  // 分页数据标签定义列表数据查询
  export function pageLabelInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'pageLabelInfo',
    params: {...params}
    })
  }
  //数据展示
  export function findLabelTableRelByTableId(params) {
    return api({
      method: 'get',
      url: appServer.data + 'findLabelTableRelByTableId',
      params: {...params}
    })
  }
    
  export function findCmColumnInfoById(params) {
    return api({
      method: 'get',
      url: appServer.data + 'findCmColumnInfoById',
      params: {...params}
    })
  }

  export function findLabelTableRelById(params) {
    return api({
      method: 'get',
      url: appServer.data + 'findLabelTableRelById',
      params: {...params}
    })
  }
  export function getTableInfoByTableId(params) {
    return api({
      method: 'get',
      url: appServer.data + 'getTableInfoByTableId',
      params: {...params}
    })
  }



  export function getLabelSearchList(params){
    return api({
      method: 'get',
      url: appServer.data + 'getLabelSearchList',
      params: {...params}
    })
  }

   //标签检索详情左侧
   export function getLabelInfoById(params){
    return api({
     method: 'get',
     url: appServer.data + 'getLabelInfoDetailById',
     params: {...params}
    })
 }

//标签检索详情右上
 export function getLabelInfoRightUp(params){
   return api({
     method: 'get',
     url: appServer.data + 'getTableInfoNumByLabelInfoId',
     params: {...params}
    })
 }

 //标签检索右下
 export function getLabelInfoRightDown(params){
   return api({
     method: 'get',
     url: appServer.data + 'getTableInfoByLabelInfoId',
     params: {...params}
    })
 }

//查看详情
export function findLabelTableInfoById(params){
  return api({
    method: 'get',
    url: appServer.data + 'findLabelTableInfoById',
    params: {...params}
   })
}