// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'
import { data } from 'jquery'

//分页查询
export function pageModInfoVer(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfoVer/page',
      params: {...params}
    })
  }
  export function listModInfoVer(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfoVer/list',
      params: {...params}
    })
  }

  export function getModInfoVer(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modInfoVer/get',
      params: {...params}
    })
  }
  export function generatePhysicsModInfo(data,params) {
    return api({
      method: 'post',
      url: appServer.std + 'modInfoVer/generatePhysicsModInfo',
      data: data,
      params:{...params}
    })
  }
  