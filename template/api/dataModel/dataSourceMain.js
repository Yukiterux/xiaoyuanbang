// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 数据源首页
export function getDsStatisticalResult(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDsStatisticalResult',
    params: {...params}
  })
}

// 数据标准首页
export function getStdHomeStatisticalResult(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStdHomeStatisticalResult',
    params: {...params}
  })
}
