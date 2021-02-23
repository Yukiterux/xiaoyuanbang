// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
export function getAllData(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdStandard',
    params: {...params}
  })
}

// 根据standardId查询
export function getStdByStdId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdId',
    params: {...params}
  })
}

export function findStdCategoryName(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdCategoryName',
    params: {...params}
  })
}
// 根据id删除 数据
export function deleteByStdId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteStdStandard',
    params: {...params}
  })
}
    // 查询数据标准分类树
export function findCategoryTree(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findCatagetoryTreeByCode',
    params: {...params}
  })
}

// 查询父节点下的所有子节点
export function findChildrenNodes(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdTree',
    params: {...params}
  })
}

// 保存新增或编辑的数据
export function saveStdandard(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveStdStandard',
    data: {...params}
  })
}

export function findStdIsRepeat(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findStdIsRepeat',
    params: {...params}
  })
}

// 获取标准文档列表
export function findDocList(params) {
  return api({
    method: 'get',
    url: appServer.data + 'findDocList',
    params: {...params}
  })
}

// 根据id获取标准信息项详情
export function getDataStdById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getDataStdById',
    params: {...params}
  })
}

// 删除数据标准文档
export function deleteStdAndFile(params) {
  return api({
    method: 'get',
    url: appServer.data + 'deleteStdAndFile',
    params: {...params}
  })
}

// 数据标准信息项获取部门树
export function findDeptTree(params) {
  return api({
    method: 'get',
    url: appServer.system + 'findDeptments',
    params: {...params}
  })
}

// 保存标准及值域标准
export function saveStdandardAndStdRange(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveStandardAndStdRange',
    params: {...params}
  })
}

// 根据标准Id获取值域标准
export function getStdRangeListByStandardId(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStdRangeListByStandardId',
    params: {...params}
  })
}

// 值域标准详情页面逻辑删除
export function updateStdRange(params) {
  return api({
    method: 'get',
    url: appServer.data + 'updateStdRange',
    params: {...params}
  })
}

// 值域标准主页面逻辑删除
export function updateStandardAndStdRange(params) {
  return api({
    method: 'get',
    url: appServer.data + 'updateStandardAndStdRange',
    params: {...params}
  })
}

// 获取标准级别占比图
export function getStandardLevelPercentage(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStandardLevelPercentage',
    params: {...params}
  })
}

// 从数据字典获取标准级别
export function getStandardLevelList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getDictInfoByTypeId',
    params: {...params}
  })
}

// 获取标准编码最大值
export function getMaxStandardNum(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStandardNumMax',
    params: {...params}
  })
}

// 获取用户
export function getUserList(params) {
  return api({
    method: 'get',
    url: appServer.system + 'getAdminBelongToTSysUserList',
    params: {...params}
  })
}

export function saveOrUpadate(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveOrUpadate',
    data: {...params}
  })
}

// 取消发布
export function cancelPublishStananderd(params) {
  return api({
    method: 'get',
    url: appServer.data + 'cancelPublishStananderd',
    params: {...params}
  })
}

// 判断该用户是否有管理员权限
export function isAdminRole(params) {
  return api({
    method: 'get',
    url: appServer.system + 'isAdminRole',
    params: {...params}
  })
}

// 文件导入
export function stdRangeToImportExcel(params) {
  return api({
    // headers:{'Content-Type': 'multipart/form-data'},
    method: 'post',
    url: appServer.data + 'stdRangeToImportExcel',
    params: {...params}
  })
}
