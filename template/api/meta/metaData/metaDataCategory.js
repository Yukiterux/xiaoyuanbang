// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../../appServer'



// 获取元数据分类列表
export function getMetaDataCategoryList(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataCategory/getMetaDataCategoryList',
      params: {...params}
    })
  }

//删除元数据
export function deleteMetaDataCategory(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataCategory/deleteMetaDataCategory',
      params: {...params}
    })
  }

  //启/停用标签分类
  export function startOrStopMetaDataCategory(params) {
    return api({
      method: 'get',
      url: appServer.meta + 'metaDataCategory/startOrStopMetaDataCategory',
      params: {...params, operatUser: sessionStorage.getItem("userId")}
    })
  }

    //左侧分类树
    export function getMetaDataCategoryTree(params) {
        return api({
          method: 'get',
          url: appServer.meta + 'metaDataCategory/getMetaDataCategoryTree',
          params: {...params}
      })
  }

    //生成分类编码
    export function createmetaDataCategoryCode(params){
      return api({
        method: 'get',
        url: appServer.meta + 'metaDataCategory/autoCreateLabelCategoryCode',
        params: {...params}
      })
    }

    //名称重复校验 checkLabelCategoryName
    export function checkMetaDataCategoryName(params){
      return api({
        method: 'get',
        url: appServer.meta + 'metaDataCategory/checkMetaDataCategoryName',
        params: {...params}
      })
    }
//标签分类保存
    export function saveMetaDataCategory(params){
      return api({
        method: 'post',
        url: appServer.meta + 'metaDataCategory/saveMetaDataCategory',
        data: {...params}
      })
    }


    //数据编辑回显
    export function getMetaDataCategoryById(params){
      return api({
        method: 'get',
        url: appServer.meta + 'metaDataCategory/editMetaDataCategoryInfo',
        params: {...params}
      })
    }

    //自动生成编码
    export function createMetaDataCategoryCode(params){
      return api({
        method: 'get',
        url: appServer.meta + 'metaDataCategory/autoCreateMetaDataCategoryCode',
        params: {...params}
      })
    }
