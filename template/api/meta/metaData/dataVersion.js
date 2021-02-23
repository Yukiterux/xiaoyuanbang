// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer';

export function findMetaDataVerList(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataBaseInfoVersion/getMetaDataVerInfo',
      params: {...params}
    })
  }

export function findMetaDataVerPage(params) {
  return api({
    method: 'get',
    url: appServer.meta + 'metaDataBaseInfoVersion/pageMetaDataVersion',
    params: {...params}
  })
}