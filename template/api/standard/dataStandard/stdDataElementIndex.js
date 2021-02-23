// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 数据元
export function countStdDataElement(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdCount/countStdDataElement',
    params: {...params}
  })
}

// 数据元发布趋势图
export function countStdElementPublish(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCount/countStdElementPublish',
      params: {...params}
    })
}

// 数据元使用top5
export function countStdElementTop5(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCount/countStdElementTop5',
      params: {...params}
    })
}
  
// 数据元检测情况
export function listStdDetectionReport(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdCount/listStdDetectionReport',
      params: {...params}
    })
}

