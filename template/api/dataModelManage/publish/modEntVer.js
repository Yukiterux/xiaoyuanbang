// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'
import { data } from 'jquery'

//分页查询
export function pageModEntVer(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modEntVer/page',
      params: {...params}
    })
  }
  export function listModEntVer(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modEntVer/list',
      params: {...params}
    })
  }

  export function getModEntVer(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modEntVer/get',
      params: {...params}
    })
  }
 
