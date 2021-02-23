// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'
import { data } from 'jquery'

// 逻辑删除
export function deleteModAttr(params) {
  return api({
    method: 'get',
    url: appServer.std + 'modAttr/delete',
    params: {...params}
  })
}
//分页查询
export function pageModAttr(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modAttr/page',
      params: {...params}
    })
  }
 // 状态修改 
  export function updateAttrState(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modAttr/updateAttrState',
      params: {...params}
    })
  }

  export function getModAttrByAttrId(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modAttr/get',
      params: {...params}
    })
  }

  export function saveOrUpdate(params) {
    return api({
      method: 'post',
      url: appServer.std + 'modAttr/saveOrUpdate',
      data: {...params}
    })
  }

  export function listModAttr(params) {
    return api({
      method: 'get',
      url: appServer.std + 'modAttr/list',
      params: {...params}
    })
  }


 
