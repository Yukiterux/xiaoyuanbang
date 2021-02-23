// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取当前数据源下表及相应表字段
export function getTemplateDisplayList(params) {
  return api({
    method: 'get',
    url: appServer.template + 'getTemplateDisplayList',
    params: {...params}
  })
}
