// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取值域标准列表
export function getStdRangeLists(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStdRangeLists',
    params: {...params}
  })
}

// 值域标准逻辑删除
export function updateStdRange(params) {
  return api({
    method: 'get',
    url: appServer.data + 'updateStdRange',
    params: {...params}
  })
}

// 新增与编辑保存
export function saveStdRange(params) {
  return api({
    method: 'post',
    url: appServer.data + 'saveStdRange',
    data: {...params}
  })
}

// 通过id查询
export function getStdRangeById(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getStdRangeById',
    params: {...params}
  })
}

// 检查值域标准详情中文名称是否重复
export function getCheckStdRangeNameCn(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCheckStdRangeNameCn',
    params: {...params}
  })
}

export function getCheckStdRangeValue(params) {
  return api({
    method: 'get',
    url: appServer.data + 'getCheckStdRangeValue',
    params: {...params}
  })
}
