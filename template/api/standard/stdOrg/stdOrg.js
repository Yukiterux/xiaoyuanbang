// 引用封装后的axios
import api from '@/libs/ajax/http';

// 引用服务名
import {appServer} from '../../appServer';

//分页查询
export function pageStdOrg(params,data) {
    return api({
      method: 'post',
      url: appServer.std + 'pageTstdOrg',
      params: {...params},
      data: {...data}
    })
  }

  //根据机构Id查询数据
export function stdOrgById(params) {
    return api({
      method: 'get',
      url: appServer.std + 'tstdOrg',
      params: {...params},
    })
  }
//设置机构的状态
export function setStdOrgStatus(params) {
    return api({
      method: 'delete',
      url: appServer.std + 'tstdOrg',
      params: {...params},
    })
  }

  //设置机构的状态
export function saveOrUpdateTstdOrg(data) {
    return api({
      method: 'post',
      url: appServer.std + 'tstdOrg',
      data: {...data},
    })
  }