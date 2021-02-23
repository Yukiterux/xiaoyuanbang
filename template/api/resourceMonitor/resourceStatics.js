// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function listMonitorHosts(params) {
  return api({
    method: 'get',
    url: appServer.task + 'listMonitorHosts',
    params: {...params}
  })
}
// 获取数据列表
export function pageMonitorInfos(params) {
  return api({
    method: 'get',
    url: appServer.task + 'pageMonitorInfos',
    params: {...params}
  })
}
