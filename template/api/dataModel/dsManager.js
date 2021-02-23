// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
export function getAllData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getTableInfoById',
    params: {...params}
  })
}

// 获取数据源树节点信息
export function findDSManagerTree(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findCatagetoryTreeByCode',
    params: {...params}
  })
}

// 根据columnid查询
export function findDSManagerById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getColumnByColumnId',
    params: {...params}
  })
}

// 删除表字段
export function delDSManagerById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteColumnInfo',
    params: {...params}
  })
}

// 保存新增或编辑数据
export function saveDSManager(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveColumnInfo',
    data: {...params}
  })
}

// 根据tableId获取表数据
export function findCmTableDataByTableId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findCmTableDataByTableId',
    params: {...params}
  })
}

export function findTableData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findTableData',
    params: {...params}
  })
}

// 检测字段名称是否重复
export function checkColName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'checkColName',
    params: {...params}
  })
}

// 获取字段类型
export function findColumnType(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findColumnType',
    params: {...params}
  })
}

// 获取数据源信息
export function getDataSourceById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceById',
    params: {...params}
  })
}

// 查询表中是否有主键
export function getPrimaryKeyInfoByTableId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getPrimaryKeyInfoByTableId',
    params: {...params}
  })
}
