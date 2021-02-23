// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 物理删除
export function deleteRangeRel(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdRangeRel/delete',
    params: {...params}
  })
}
//分页查询
export function pageRangeRel(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdRangeRel/page',
      params: {...params}
    })
  }
 // 新增与编辑
export function saveOrUpdate(params) {
    return api({
      method: 'post',
      url: appServer.std + 'stdRangeRel/saveOrUpdate',
      data: {...params}
    })
  }
// get  
export function getRangeRel(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdRangeRel/get',
      params: {...params}
    })
  }
  export function checkName(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdRangeRel/checkName',
      params: {...params}
    })
  }
  
  // list
 export function listStdRangeRel(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdRangeRel/list',
      params: {...params}
    })
  } 
