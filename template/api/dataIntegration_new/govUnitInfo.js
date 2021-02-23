// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
// export function getAllData(params) {
//   return api({
//     method: 'get',
//     url: appServer.integrate + 'findGovUnitInfo',
//     params: {...params}
//   })
// }

export function findGovUnitByUnitId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findGovUnitInfoByUnitId',
    params: {...params}
  })
}

// 保存新增或编辑的数据
export function saveGovUnitInfo(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveGovUnitInfo',
    data: {...params}
  })
}

// 根据id删除 数据
export function deleteGovUnitInfo(params) {
  return api({
    method: 'get',
    url: appServer.system + 'deleteGovUnitInfo',
    params: {...params}
  })
}

export function findNameIsRepeat(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findNameIsRepeat',
    params: {...params}
  })
}

export function findCategorySel(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findCategorySel',
    params: {...params}
  })
}

export function getTGovUnitCategoryByUnitCategoryId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getTGovUnitCategoryByUnitCategoryId',
    params: {...params}
  })
}
