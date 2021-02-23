// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取模型分类
export function getModCategory(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modCategory/getModCategory',
    params: {...params}
  })
}

// 获取模型分类
export function getModCategoryByCode(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modCategory/getModCategoryByCode',
    params: {...params}
  })
}

// 新增或修改模型分类
export function saveOrUpdateModCategory(params) {
  return api({
    method: 'post',
    url: appServer.std + 'modCategory/saveOrUpdateModCategory',
    data: {...params}
  })
}

// 逻辑删除模型分类
export function deleteModCategory(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modCategory/deleteModCategory',
    params: {...params}
  })
}

export function deleteModCategoryAfterCheck(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modCategory/deleteModCategoryAfterCheck',
    params: {...params}
  })
}

// 分页查询模型分类
export function pageModCategory(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modCategory/pageModCategory',
    params: {...params}
  })
}

// 获取模型分类集合
export function listModCategory(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modCategory/listModCategory',
    params: {...params}
  })
}

// 获取模型分类集合
export function listModCategoryByParentId(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modCategory/listModCategoryByParentId',
    params: {...params}
  })
}

export function updateStartModCategoryState(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modCategory/updateStartModCategoryState',
    params: {...params}
  })
}

export function updateStopModCategoryState(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modCategory/updateStopModCategoryState',
    params: {...params}
  })
}

export function updateStopModCategoryStateAfterCheck(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modCategory/updateStopModCategoryStateAfterCheck',
    params: {...params}
  })
}
// // 获取模型分类集合
// export function ExportModCategory(params) {
//   return api({
//     method: 'get',
//     url: appServer.std + 'modCategory/ExportModCategory',
//     params: {...params}
//   })
// }
//
// // 获取模型分类集合
// export function downLoadFile(params) {
//   return api({
//     method: 'get',
//     url: appServer.std + 'modCategory/downLoadFile',
//     params: {...params}
//   })
// }
//
// // 获取模型分类集合
// export function importModCategory(params) {
//   return api({
//     method: 'get',
//     url: appServer.std + 'modCategory/importModCategory',
//     params: {...params}
//   })
// }


