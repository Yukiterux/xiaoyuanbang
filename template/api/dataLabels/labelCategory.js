// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取标签分类列表
export function getLabelCategoryList(params) {
    return api({
      method: 'get',
      url: appServer.data + 'getLabelCategoryList',
      params: {...params}
    })
  }

//删除标签分类
  export function deleteLabelCategory(params) {
    return api({
      method: 'get',
      url: appServer.data + 'deleteLabelCategoryById',
      params: {...params}
    })
  }

  //启/停用标签分类
  export function startOrStopLabelCategory(params) {
    return api({
      method: 'get',
      url: appServer.data + 'startOrStopLabelCategoryById',
      params: {...params}
    })
  }


    //左侧分类树
    export function getLabelCategoryTree(params) {
        return api({
          method: 'get',
          url: appServer.data + 'getLabelCategoryTree',
          params: {...params}
      })
    }

    //生成分类编码
    export function createLabelCategoryCode(params){
      return api({
        method: 'get',
        url: appServer.data + 'autoCreateLabelCategoryCode',
        params: {...params}
      })
    }

    //名称重复校验 checkLabelCategoryName
    export function checkLabelCategoryName(params){
      return api({
        method: 'get',
        url: appServer.data + 'checkLabelCategoryName',
        params: {...params}
      })
    }
//标签分类保存
    export function saveLabelCategory(params){
      return api({
        method: 'post',
        url: appServer.data + 'saveLabelCategory',
        data: {...params}
      })
    }


    //数据编辑回显
    export function getLabelCategoryBylabelCategoryId(params){
      return api({
        method: 'get',
        url: appServer.data + 'editRebackLabelCategoryInfo',
        params: {...params}
      })
    }