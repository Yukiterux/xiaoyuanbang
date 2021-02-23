// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'
// 数据采集列表
export function getLogkInfoPageList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getCheckLoginLogByLoginUserName',
    params: {...params}
  })
}
