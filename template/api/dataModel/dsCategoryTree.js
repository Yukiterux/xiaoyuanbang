// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function getDataSourceCategoryTree(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceCategoryTree',
    params: {...params}
  })
}
