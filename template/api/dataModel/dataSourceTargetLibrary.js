// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据源目标树
export function getSourceLibraryTree(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getSourceLibraryTree',
    params: {...params}
  })
}

// 获取列表数据
export function getAllTableByDataSourceId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmTableList',
    params: {...params}
  })
}
