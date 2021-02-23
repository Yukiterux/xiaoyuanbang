// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'

//数据元模版管理  新增和修改
export function saveElementTemplate(params) {
    return api({
      method: 'post',
      url: appServer.std + 'stdTemplate/saveOrUpdate',
      data: {...params}
    })
}


//数据元模版列表
export function findElementTemplate(params) {
    return api({
      method: 'get',
      url: appServer.std + 'stdTemplate/page',
      params: {...params}
    })
}

//查询单个数据
export function findElementTemplateInfo(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdTemplate/get',
    params: {...params}
  })
}

//统计模版
export function countElementTemplate(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdTemplate/count',
    params: {...params}
  })
}


//获取所有模版
export function findAllElementTemplate(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdTemplate/list',
    params: {...params}
  })
}

//删除
export function deleteElementTemplate(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdTemplate/delete',
    params: {...params}
  })
}

//下载
export function downloadElementTemplate(params) {
  return api({
    method: 'get',
    url: appServer.std + 'stdTemplate/downLoadFile',
    params: {...params},
    responseType: 'blob'
  })
}