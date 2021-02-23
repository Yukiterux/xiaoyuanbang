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
export function pageStdCodeSetBase(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfo/page',
      params: {...params}
    })
  }
  
  export function updateModState(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfo/updateModState',
      params: {...params}
    })
  }
 
