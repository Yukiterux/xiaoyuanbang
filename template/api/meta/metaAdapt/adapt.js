// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

// 适配器
export function findAdaptList(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'adapterBaseInfo/page',
      params: {...params}
    })
}

// 获取单个适配器
export function findAdaptInfo(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'adapterBaseInfo/get',
      params: {...params}
    })
}

// 获取单个适配器
export function findAdaptConfigInfo(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'adapterParams/list',
      params: {...params}
    })
}


// 获取所有适配器
export function findAllAdaptInfo(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'adapterBaseInfo/list',
      params: {...params}
    })
}