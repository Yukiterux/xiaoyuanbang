// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'
// 获取数据列表
export function getFindSysLogsList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findSysLogs',
    params: {...params}
  })
}
export function findSysLogsByName(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findSysLogsByName',
    params: {...params}
  })
}
