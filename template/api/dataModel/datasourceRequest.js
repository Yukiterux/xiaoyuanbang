// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据源列表
export function findAllDataSources(params) {
  return api({
    method: 'get',
    url: appServer.data + 'queryDataSource',
    params: {...params}
  })
}

// 获取当前数据源下表及相应表字段
export function getAllTableInfos(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getAllTable',
    params: {...params}
  })
}

// 查看数据源名称是否被占用
export function checkSourceName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'checkDataSourceName',
    params: {...params}
  })
}

// 保存数据源信息
export function saveDataSource(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveDataSource',
    data: {...params}
  })
}

// 测试数据源
export function testDataSource(params) {
  return api({
    method: 'post',
    url: appServer.data + 'testDataSource',
    params: {...params}
  })
}

// 删除数据源信息
export function deleteDataSource(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteDataSource',
    params: {...params}
  })
}

// 获取表数量以及列数量
export function getTableCountInfo(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getTableAndColumnCountBySourceId',
    params: {...params}
  })
}

// 新增表信息保存
export function saveTableInfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'createTable',
    data: {...params}
  })
}

// 查看当前表名称是否存在
export function checkTableName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'cheackTableNameExist',
    params: {...params}
  })
}

// 初始化数据源
export function initDataSource(params) {
  return api({
    method: 'get',
    url: appServer.data + 'initDataSource',
    params: {...params}
  })
}

// 数据源信息修改信息回显
export function getdatasourceById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceById',
    params: {...params}
  })
}

// 通过表主键,删除该表
export function delTableById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'delTableById',
    params: {...params}
  })
}

// 表数据详情
export function getTableInfoById(tableId) {
  return api({
    method: 'get',
    url: appServer.data + 'getInfoByTableId',
    params: {tableId}
  })
}

export function getCategoryTree(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataSourceCategoryTree',
    params: {...params}
  })
}

// 建表表名重复性校验
export function cheackTableNameExist(params) {
  return api({
    method: 'get',
    url: appServer.data + 'cheackTableNameExist',
    params: {...params}
  })
}

// 获取参数类型列表
export function getParameterList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getParameterList',
    params: {...params}
  })
}

// 获取hive参数信息
export function getCreateHiveTablePath() {
  return api({
    method: 'get',
    url: appServer.system + 'getCreateHiveTablePathByTypeId'
  })
}

// 监测数据源
export function monitorDataSource(params) {
  return api({
    method: 'get',
    url: appServer.data + 'dataSourceMonitor',
    params: {...params}
  })
}

// 检测以后,进行表的添加功能
export function syncDataStructure(params) {
  return api({
    method: 'get',
    url: appServer.data + 'syncDataStructure',
    params: {...params}
  })
}

export function saveSqltable(params) {
  return api({
    method: 'get',
    url: appServer.data + 'saveSqltable',
    params: {...params}
  })
}

// 获取数据库字段类型
export function getDbParameterList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDbParameterList',
    params: {...params}
  })
}

// 当前url测试,是否ping通
export function urlCanGetResponse(params) {
  return api({
    method: 'get',
    url: appServer.data + 'urlCanGetResponse',
    params: {...params}
  })
}

// 获取对应数据库下的字段类型
export function getColumnTypeByDbName(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getColumnTypeByDbName',
    params: {...params}
  })
}

// 获取对应数据库相对应的SQL
export function findSqlTemplateByType(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findSqlTemplateByType',
    params: {...params}
  })
}

// 通过表主键查看详情
export function getCmTableInfoByTableId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCmTableInfoByTableId',
    params: {...params}
  })
}

// 修改表信息保存(表名,注释等信息)
export function saveOrupdateTableinfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'editCmTableInfo',
    data: {...params}
  })
}

// 主页表数量
export function getMainPageTableNum(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getMainPageTableNum',
    params: {...params}
  })
}

// 单表更新
export function initTableById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'sysncTableInfo',
    params: {...params}
  })
}


export function getDatasourceState(params){
  return api({
    method: 'get',
    url: appServer.data + 'getCmDataSourceById',
    params: {...params}
  })
}