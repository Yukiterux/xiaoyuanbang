// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function addSysFeedback(params) {
  return api({
    method: 'post',
    url: appServer.system + 'addSysFeedback',
    data: {...params}
  })
}

export function getSysFeedback(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getSysFeedback',
    params: {...params}
  })
}
