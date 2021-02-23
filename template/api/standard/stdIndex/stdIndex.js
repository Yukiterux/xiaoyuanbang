// 引用封装后的axios
import api from '@/libs/ajax/http';

// 引用服务名
import {appServer} from '@/api/appServer';

//分页查询
export function searchStd(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdIndex/searchStd',
    params: {...params},
  })
}

//根据机构Id查询数据
export function searchStdByType(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdIndex/searchStdByType',
    params: {...params},
  })
}
