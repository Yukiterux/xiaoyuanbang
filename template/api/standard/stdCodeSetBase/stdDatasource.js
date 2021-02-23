// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 物理删除
export function deleteStdDatasource(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdDatasource/delete',
    params: {...params}
  })
}
//分页查询
export function pageStdDatasource(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdDatasource/page',
      params: {...params}
    })
  }
//获取对象
export function getById(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdDatasource/get',
      params: {...params}
    })
  } 

//list
export function listStdDatasource(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdDatasource/list',
      params: {...params}
    })
  } 
 //保存
export function saveOrUpdate(params) {
    return api({
      method: 'post',
      url: appServer.std + 'stdDatasource/saveOrUpdate',
      data: {...params}
    })
  } 

  export function getDatasourceList(params) {
    return api({
      method: 'get',
      url: appServer.data + 'getAllDataSource',
      params: {...params}
    })
  }
  
  export function getTableList(params) {
    return api({
      method: 'get',
      url: appServer.data + 'queryTableNameList',
      params: {...params}
    })
  }
  
  export function getColumnList(params) {
    return api({
      method: 'get',
      url: appServer.data + 'getAllColumnByTableId',
      params: {...params}
    })
  }