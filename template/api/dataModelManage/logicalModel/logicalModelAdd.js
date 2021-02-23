// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

 //数据编辑回显
 export function getByModId(params){
    return api({
      method: 'get',
      url: appServer.std + 'modInfo/get',
      params: {...params}
    })    
  }
  // 新增采集数据
export function saveInfo(params) {
    return api({
      method: 'post',
      url: appServer.std + 'modInfo/saveOrUpdate',
      data: {...params}
    })
  }
  