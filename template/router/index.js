// import Vue from 'vue'
// import Router from 'vue-router'
// import * as appServer from '../api/appServer'
// const nxPage = appServer.nxPage
// Vue.use(Router)
// //push
// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push(to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }

// //replace
// const VueRouterReplace = Router.prototype.replace
// Router.prototype.replace = function replace(to) {
//   return VueRouterReplace.call(this, to).catch(err => err)
// }

// export const asyncRouterMap = [
//   {
//     name: 'Home',
//     path: '/',
//     component: resolve => require(['@/components/pages/Maincon'], resolve)
//   },
//   {
//     name: '登录',
//     path: '/login',
//     component: resolve => require(['@/components/pages/Maincon'], resolve)
//   },
//   {
//     name: '首页1',
//     path: '/first',
//     component: resolve => require(['@/components/pages/Firstcon'], resolve)
//   },
//   {
//     name: '首页2',
//     path: '/first-single',
//     component: resolve => require(['@/components/pages/Firstcon-single'], resolve)
//   },
//   {
//     name: '数据大盘',
//     path: '/dataMark',
//     component: resolve => require(['@/components/pages/'+(nxPage ? 'dataMarketIndex3':'Firstcon')], resolve)
//   },
//   // {
//   //   name: '数据源',
//   //   path: '/noMain',
//   //   component: resolve => require(['@/view/noMain'], resolve),
//   //   children: [
//   //     {
//   //       name: '数据源首页',
//   //       path: '/nomain/datasourceMain',
//   //       component: resolve => require(['@/view/dataModel/datasource/datasourceMain'], resolve)
//   //     },
//   //     {
//   //       name: '数据源分类',
//   //       path: '/nomain/dscategorylist',
//   //       component: resolve => require(['@/view/dataModel/datasource/dsCategoryList'], resolve)
//   //     },
//   //     {
//   //       name: '数据源列表',
//   //       path: '/nomain/datasourceList',
//   //       component: resolve => require(['@/view/dataModel/datasource/datasourceList'], resolve)
//   //     }
//   //   ]
//   // },
//   {
//     name: '数据集成',
//     path: '/noMain',
//     component: resolve => require(['@/view/noMain'], resolve),
//     children: [
//       {
//         name: '任务配置',
//         path: '/nomain/dragMainNew/:gdaTaskNo',
//         component: resolve => require(['@/view/dataIntergrationNew/dataCollection/dragMain'], resolve)
//       }]
//   },
//   {
//     name: '单点登录',
//     path: '/sso',
//     component: resolve => require(['@/components/pages/sso/sso'], resolve)
//   },
//   {
//     name: '单点登录回调',
//     path: '/ssoCallback',
//     component: resolve => require(['@/components/pages/sso/ssoCallback'], resolve)
//   }
//   // {
//   //   name: '用户管理',
//   //   path: '/test',
//   //   component: resolve => require(['@/components/pages/resourcecolumn/rightpages/ResourceCol'], resolve)
//   // }
//   // {
//   //   name: '数据标准',
//   //   path: '/noMain',
//   //   component: resolve => require(['@/view/noMain'], resolve),
//   //   children: [
//   //     {
//   //       name: '标准首页',
//   //       path: '/nomain/dataStandardMain',
//   //       component: resolve => require(['@/view/dataModel/datastandard/dataStandardMain'], resolve)
//   //     },
//   //     {
//   //       name: '标准分类',
//   //       path: '/nomain/catagoryColumn',
//   //       component: resolve => require(['@/view/dataModel/datastandard/catagoryColumn'], resolve)
//   //     },
//   //     {
//   //       name: '标准文件',
//   //       path: '/nomain/dataDocList',
//   //       component: resolve => require(['@/view/dataModel/datastandard/dataDocList'], resolve)
//   //     },
//   //     {
//   //       name: '值域标准',
//   //       path: '/nomain/rangeStandardList',
//   //       component: resolve => require(['@/view/dataModel/datastandard/rangeStandardList'], resolve)
//   //     },
//   //     {
//   //       name: '标准审核',
//   //       path: '/nomain/standardAudit',
//   //       component: resolve => require(['@/view/dataModel/datastandard/standardAudit'], resolve)
//   //     },
//   //     {
//   //       name: '标准发布',
//   //       path: '/nomain/standardReleaseList',
//   //       component: resolve => require(['@/view/dataModel/datastandard/standardReleaseList'], resolve)
//   //     }
//   //   ]
//   // },
//   // {
//   //   name: '权限管理',
//   //   path: '/sysAuthorityList',
//   //   component: resolve => require(['@/view/system/authority/sysAuthorityList'], resolve)
//   // }
// ]
// export default new Router({
//   routes: asyncRouterMap
// })
