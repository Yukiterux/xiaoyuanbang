// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

export function findParameterTypeTree(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getParameterTypeListByTypeId',
    params: {...params}
  })
}

  // 获取数据列表
export function getSysParameterListByType(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getSysParameterListByType',
    params: {...params}
  })
}

export function getSysParameterListByTypeAndName(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getSysParameterListByTypeAndName',
    params: {...params}
  })
}

export function getAccurateSysParameterListByTypeAndName(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getAccurateSysParameterListByTypeAndName',
    params: {...params}
  })
}

export function addSysParameter(params) {
  return api({
    method: 'post',
    url: appServer.system + 'addSysParameter',
    data: {...params}
  })
}

export function updateParameterValueByParameterID(params) {
  return api({
    method: 'post',
    url: appServer.system + 'updateParameterValueByParameterID',
    params: {...params}
  })
}

export function getSystemSettings() {
  return api({
    method: 'get',
    url: appServer.system + 'getSystemSettings'
  })
}

export function saveAndUpdateSystemSettings(params) {
  return api({
    method: 'post',
    url: appServer.system + 'saveAndUpdateSystemSettings',
    data: {...params}
  })
}
