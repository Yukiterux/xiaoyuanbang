// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 元数据源列表
export function metaOriginList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'inputSystem/pageInputSystem',
    params: {...params}
  })
}

// 保存元数据源
export function saveMetaOrigin(params) {
    return api({
      method: 'post',
      url: appServer.meta + 'inputSystem/saveOrUpdate',
      data: {...params}
    })
}

// 测试元数据源
export function saveTestMetaOrigin(params) {
    return api({
      method: 'post',
      url: appServer.meta + 'dataSource/testConnect',
      data: {...params}
    })
}

// 根据id查询
export function getMetaOrigin(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'inputSystem/getInputSystemBySysId',
      params: {...params}
    })
  }

// 修改应用状态
export function updateMetaState(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'inputSystem/updateInputSystemStatus',
      params: {...params}
    })
}

export function listInputSystem(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'inputSystem/listInputSystem',
    params: {...params}
  })
}

export function getByCode(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'inputSystem/getByCode',
    params: {...params}
  })
}


export function getSourceDataList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'listDataSource',
    params: {...params}
  })
}


//获取元数据管理分类树
export function categoryTreeList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataCategory/metaDataCategoryTree',
    params: params
  })
}

//点击树的最后一层获取元数据
export function metaDataList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfoVersion/asyncMetaDataCatalog',
    params: params
  })
}

export function getMetaOnly(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/metaDataInfoOnly',
    params: params
  })
}