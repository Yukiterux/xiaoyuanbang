// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'


// 血缘分析
export function findBloodChat(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataRelationshipVersion/getMetaDataRelationCharts',
      params: {...params}
    })
}


// 全链分析
export function findCheinChat(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataRelationshipVersion/getFullChainAnalysisCharts',
      params: {...params}
    })
}


// 全链分析
export function findinfluenceChat(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataRelationshipVersion/getImpactAnalysisCharts',
      params: {...params}
    })
}