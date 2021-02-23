// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 保存新建库信息
export function saveDatabase(params) {
  return api({
    method: 'post',
    url: appServer.data + 'createDbUser',
    data: {...params}
  })
}

// oracle新建用户
export function createDbUser(params) {
  return api({
    method: 'post',
    url: appServer.data + 'createDbUser',
    data: {...params}
  })
}
