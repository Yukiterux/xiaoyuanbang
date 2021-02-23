// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
export function getFileInfo(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findFileRelation',
    params: {...params}
  })
}

// 文件下载
export function fileDownload(params) {
  return api({
    method: 'get',
    url: appServer.system + 'download',
    params: {...params}
  })
}
// 根据标准ID查询
export function findStdById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdId',
    params: {...params}
  })
}

export function findFileInfoByStdId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findFileRelationByStdId',
    params: {...params}
  })
}

// 保存数据标准文档审核信息
export function saveStdDocAuditInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'dataDocAudit',
    params: {...params}
  })
}

// 删除文件及文件信息
export function deleteFileByFileId(params) {
  return api({
    method: 'get',
    url: appServer.system + 'deleteFileByFileId',
    params: {...params}
  })
}
