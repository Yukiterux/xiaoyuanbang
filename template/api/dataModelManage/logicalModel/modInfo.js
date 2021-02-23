// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'
import { data } from 'jquery'

// 逻辑删除
export function deleteModInfo(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modInfo/delete',
    params: {...params}
  })
}
//分页查询
export function pageModInfoSearch(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfo/page',
      params: {...params}
    })
  }
 // 状态修改 
  export function updateModState(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfo/updateStatus',
      params: {...params}
    })
  }

  export function getModInfoByModId(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfo/get',
      params: {...params}
    })
  }

  export function saveOrUpdate(params) {
    return api({
      method: 'post',
      url: appServer.std + 'modInfo/saveOrUpdate',
      data: {...params}
    })
  }
  export function listModInfo(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfo/list',
      params: {...params}
    })
  }

  // submit publish
  export function modInfoSubmitPublish(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfo/submitPublish',
      params: {...params}
    })
  }
  // list category tree
  export function listModCategory(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modCategory/listModCategory',
      params: {...params}
    })
  }

  export function modInfoPublish(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfo/publish',
      params: {...params}
    })
  }

  export function listStdDataElement(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdDataElementVersion/list',
      params: {...params}
    })
  }
  export function exportData(params) {
    return api({
      method: 'post',
      url: appServer.std + 'modInfo/exportData',
      data: params
    })
  }
  // excel import
  export function importData(params) {
    return api({
      method: 'post',
      url: appServer.std + 'modInfo/importData',
      processData: false,
      contentType: false,
      data: params
    })
  }
  // pdm import
  export function importDataByPdm(params) {
    return api({
      method: 'post',
      url: appServer.std + 'modInfo/importDataByPdm',
      processData: false,
      contentType: false,
      data: params
    })
  }
 // generateLogicModInfo
 export function generateLogicModInfo(data,params) {
    return api({
      method: 'post',
      url: appServer.std + 'modInfo/generateLogicModInfo',
      data:data,
      params: {...params}
    })
  }
 //modNameCn or modCode repeat check
  export function checkNameOrCode(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfo/checkNameOrCode',
      params: {...params}
    })
  }
  //获取代码集分类
  export function getAllCategory(params) {
    return api({
      method: 'get',
      url: appServer.std + 'category/getAllCategory',
      params: {...params}
    })
  }
  // 获取数据库类型
  export function getDictInfoByTypeId(params) {
    return api({
      method: 'get',
      url: appServer.system + 'getDictInfoByTypeId',
      params: {...params}
    })
  }
// 获取已发布数据元
export function listStdDataElementVersion(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdDataElementVersion/list',
      params: {...params}
    })
}

// 物化库表
export function generateDbTable(params,data) {
  return api({
    method: 'post',
    url: appServer.std + 'modInfo/generateDbTable',
    params: {...params},
    data:data
  })
}

// 数据源分类
export function getDatasourceCategory(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listDatasourceCategory',
    params: {...params}
  })
}

// 获取数据源
export function getDatasource(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmDataSourceListByCategoryId',
    params: {...params}
  })
}




  