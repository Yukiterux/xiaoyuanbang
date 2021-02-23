// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 分页查询获取所有数据
export function getAnalysisTaskList(params) {
  return api({
    method: 'get',
    url: appServer.quality + 'getTAnalysisTaskInfo',
    params: {...params}
  })
}

export function deleteTAnalysisTaskById(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'deleteTAnalysisTaskById',
    params: {...params}
  })
}

export function startAnalysisTask(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'startAnalysisTask',
    params: {...params}
  })
}

export function saveOrUpdateTAnalysisTask(params) {
  return api({
    method: 'post',
    url: appServer.quality + 'saveOrUpdateTAnalysisTask',
    data: {...params}
  })
}
