/*
 * @Author: HJM
 * @Description:
 * @Date: 2020-09-14 09:25:10
 * @LastEditors: M
 * @LastEditTime: 2020-09-18 09:39:53
 */

// 'dgms':数据资源系统登录 'ump':统一平台登录
const loginMode = 'ump'

// true 含头部 false 不含头部
const headLoading = true

// dgms 数据资源系统原部门 jg 监管对接部门
const dept = 'dgms'

// 请求服务名管理 true含网关 false不含网关
const appServer = getAppService(true)

// 是否设置为宁夏数据大盘
const nxPage = false

function getAppService (s) {
  let gateway = ''
  if (loginMode === 'ump') {
    // 统一平台路由
    gateway = '/dgms-ump-gateway'
  } else if (loginMode === 'dgms') {
    // 数据资源系统原路由
    gateway = '/dgms-gateway'
  }
  return {
    // 系统
    system: s ? gateway + '/api-system/' : '/dgms-system/',
    // 数据源
    data: s ? gateway + '/api-data/' : '/dgms-data/',
    // 模板
    template: s ? gateway + '/api-template/' : '/dgms-template/',
    // 任务
    task: s ? gateway + '/api-task/' : '/dgms-task/',
    // 质量
    quality: s ? gateway + '/api-quality/' : '/dgms-quality/',
    // 数据集成
    integrate: s ? gateway + '/api-integrate/' : '/dgms-integrate/',
    // kettle服务
    kettle: s ? gateway + '/api-kettle/' : '/dgms-kettle/',
    // scheduler 服务
    scheduler: s ? gateway + '/api-scheduler/' : '/dgms-scheduler/',
    // scheduler 服务
    meta: s ? gateway + '/api-meta/' : '/dgms-meta/',

    file: s ? gateway + '/api-file/' : '/dgms-file/',
    //batch服务
    batch: '/dgms-batch/',
    // //batch服务
    batch2: '/dgms-batch2/',
    //   //batch服务
    batch3: '/dgms-batch3/',
    demand: '/dgms-fff/demand/',
    sysDictionary: '/sysDictionary/',
    std: s ? gateway + '/api-std/' : '/dgms-std/',
    dataservice: '/dgms-fff/',//数据服务-产品准备
    flow: '/dgms-flow/',//数据服务-工作流
    integratingInformation: '/dgms-info/',//集成信息相关
    collect: '/dgms-collect/',
  }
}

export { appServer, headLoading, dept, loginMode, nxPage }
