// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'


// 获取元数据分类列表
export function getCollectionTaskCategoryList(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'collectTaskCategory/getCollectionTaskCategoryList',
      params: {...params}
    })
  }

//删除元数据
export function deleteCollectionTaskCategory(params) {
    return api({
      method: 'post',
      url: appServer.meta + 'collectTaskCategory/deleteCollectionTaskCategory',
      params: {...params}
    })
  }

  //启/停用标签分类
  export function startOrStopCollTaskCategory(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'collectTaskCategory/startOrStopCollTaskCategory',
      params: {...params}
    })
  }

    //左侧分类树
    export function getCollectionTaskCategoryTree(params) {
        return api({
          method: 'get',
          url: appServer.meta + 'collectTaskCategory/getCollectionTaskCategoryTree',
          params: {...params}
      })
  }

    //生成分类编码
    export function createCollecTaskCategoryCode(params){
      return api({
        method: 'get',
        url: appServer.meta + 'collectTaskCategory/autoCreateCollecTaskCategoryCode',
        params: {...params}
      })
    }

    //名称重复校验 checkLabelCategoryName
    export function checkCollectionTaskCategoryName(params){
      return api({
        method: 'get',
        url: appServer.meta + 'collectTaskCategory/checkCollectionTaskCategoryName',
        params: {...params}
      })
    }
//标签分类保存
    export function saveCollectTaskCategory(params){
      return api({
        method: 'post',
        url: appServer.meta + 'collectTaskCategory/saveCollectTaskCategory',
        data: {...params}
      })
    }


    //数据编辑回显
    export function getCollectionTaskCategoryById(params){
      return api({
        method: 'get',
        url: appServer.meta + 'collectTaskCategory/editCollectionTaskCategoryInfo',
        params: {...params}
      })
    }

