// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 数据标准子系统首页
export function countStdCodeSetBase(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdCount/countStdCodeSetBase',
    params: {...params}
  })
}
// 数据标准子系统首页列表数据
export function getStdDataStatusList(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdCount/getStdDataStatusList',
    params: {...params}
  })
}