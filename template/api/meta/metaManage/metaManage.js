// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {
  appServer
} from '../../appServer'
// 分页获取元数据基础信息
export function getPageMetaDataInfo(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/getPageMetaDataInfo',
    params: {
      ...params
    }
  })
}

// 用packageid查询元模型
export function metaModelGetPackageId(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/metaModelGetPackageId',
    params: {
      ...params
    }
  })
}

// 保存
export function addOrUpdateMateDataInfo(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaDataBaseInfo/addOrUpdateMateDataInfo',
    params: {
      ...params
    }
  })
}

  // 用id查询元数据
export function metaDataInfoGet(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/metaDataInfoGet',
    params: {
      ...params
    }
  })
}

    // 根据分类code查询元数据采集数
export function collectTypeCount(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/collectTypeCount',
    params: {
      ...params
    }
  })
}

    // 根据分类code查询元数据采集数
export function metaDataInfoDelete(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/metaDataInfoDelete',
    params: {
      ...params
    }
  })
}

// 根据元模型id获取元模型属性
export function modelIdGetModelAttr(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/modelIdGetModelAttr',
    params: {
      ...params
    }
  })
}

// 获取元数据版本信息
export function findMetaDataVersionPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfoVersion/findMetaDataVersionPage',
    params: {
      ...params
    }
  })
}

export function pageMetaDataBaseInfoVersion(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfoVersion/pageMetaDataBaseInfoVersion',
    params: {
      ...params
    }
  })
}

// 元数据变更记录
export function getOperationLogListByBiz(biz, object) {
  return api({
    method: 'get',
    url: appServer.system + 'getOperationLogListByBiz',
    params: {biz: biz, object: object}
  })
}

// 单条查询元数据byId（未发布）
export function getMetaDataBaseInfoByDataId(dataId) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/getMetaDataBaseInfoByDataId',
    params: {dataId: dataId}
  })
}

// 单条查询元数据byId（已发布）
export function getMetaDataBaseInfoVersionByDataId(dataId) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfoVersion/getMetaDataBaseInfoVersionByDataId',
    params: {dataId: dataId}
  })
}

// 提交审核
export function metaDataSubmit(params) {
  return api({
    method: 'post',
    url: appServer.meta + 'metaDataBaseInfo/submit',
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
    url: appServer.meta + 'metaDataBaseInfo/asyncBaseInfo',
    params: params
  })
}

//点击树的最后一层获取元数据
export function metaDataVersion(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfoVersion/asyncBaseInfoVer',
    params: params
  })
}

//子节点被点击时请求列表
export function metaNodeContent(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/getPageMetaDataInfoByDataId',
    params: params
  })
}

// 定版元数据获取目录
export function getMetaVersionList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfoVersion/getPageMetaDataInfoVerByDataId',
    params: params
  })
}

// 定版元数据获取分类已发布
export function getVersionPublishList(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfoVersion/getPageMetaDataInfoVerByCategoryCode',
    params: params
  })
}

