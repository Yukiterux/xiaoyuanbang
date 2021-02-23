import api from '@/libs/ajax/http';
// 引用服务名
import {
  appServer
} from '../appServer';

// 判读用户是adminRole
export function isAdminRoleByUserId(userId) {
  return api({
    method: 'get',
    url: appServer.system + 'isAdminRoleByUserId',
    params: {userId: userId}
  })
}

export function getNextSysUserList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getNextSysUserList',
    params: {...params}
  })
}