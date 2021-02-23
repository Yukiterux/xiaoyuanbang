// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 获取元数据首页统计数据
export function getMetaDataStatisticsReport(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/getMetaDataStatisticsReport'
    // params: {...params}
  })
}

// 获取元数据首页统计数据
export function getMetaDataListByInputSystemId(modelId) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/getMetaDataListByInputSystemId',
    params: {modelId: modelId}
  })
}

// 元数据检索
export function pageMetaDataSearch(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/pageMetaDataSearch',
    params: {...params}
  })
}

// 元数据检索分类总量
export function listMetaDataSearchCount(searchContent) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfo/listMetaDataSearchCount',
    params: {searchContent: searchContent}
  })
}

// 元数据对比--获取数据版本
export function listVersionNoByBaseDataId(baseDataId) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfoVersion/listVersionNoByBaseDataId',
    params: {baseDataId: baseDataId}
  })
}

// 获取元数据对比信息
export function getMetaDataBaseInfoVersionComparison(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfoVersion/getMetaDataBaseInfoVersionComparison',
    params: {...params}
  })
}

// 元数据关系图
export function getMetaDataRelationshipCharts(baseDataId, verNo) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataRelationshipVersion/getMetaDataRelationshipCharts',
    params: {baseDataId: baseDataId, verNo: verNo}
  })
}

// 元数据关系表格
export function pageMetaDataRelationship(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataRelationship/pageMetaDataRelationship',
    params: {...params}
  })
}
// 标签分类保存
// export function saveMetaDataCategory(params) {
//   return api({
//     method: 'post',
//     url: appServer.meta + 'metaDataCategory/saveMetaDataCategory',
//     data: {...params}
//   })
// }
