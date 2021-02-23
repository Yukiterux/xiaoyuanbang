// import router from './index'

// export function loadRouter() {
//   if (sessionStorage.getItem('authList') == null) {
//     return
//   }
//   const authList = JSON.parse(sessionStorage.getItem('authList'))
//   for (let i = 0, len = authList.length; i < len; i++) {
//     asyncRouter(authList[i])
//   }
//   // console.log(router.options.routes)
// }
// export function asyncRouter(authList) {
//   const routeList = []
//   try {
//     if (authList.childLists === undefined) {
//       return
//     }
//     if (authList.childLists && authList.childLists.length > 0) {
//       // 判断该层级下路由是否已经加入路由
//       for (let i = 0; i < router.options.routes.length; i++) {
//         for (let j = 0; j < authList.childLists.length; j++) {
//           if (router.options.routes[i].name === authList.childLists[j].remark) {
//             return
//           }
//         }
//       }
//       for (let i = 0, len2 = authList.childLists.length; i < len2; i++) {
//         // 添加路由父节点
//         if (authList.childLists[i].path !== null && authList.childLists[i].componentUrl !== null && authList.childLists[i].componentUrl !== '') {
//           if (authList.childLists[i].path === undefined) {
//             authList.childLists[i].path = ''
//           }
//           const parentNodes = {
//             name: authList.childLists[i].remark,
//             path: authList.childLists[i].path,
//             url: authList.childLists[i].componentUrl
//           }
//           parentNodes.component = resolve => require(['@/view' + authList.childLists[i].componentUrl + '.vue'], resolve)
//           // 添加路由子节点
//           if (authList.childLists[i].childLists !== undefined) {
//             if (authList.childLists[i].childLists && authList.childLists[i].childLists.length > 0) {
//               const childrenArray = []
//               for (let j = 0, len3 = authList.childLists[i].childLists.length; j < len3; j++) {
//                 // 判断是否存在一级菜单
//                 if (authList.childLists[i].childLists[j].path === undefined) {
//                   authList.childLists[i].childLists[j].path = null
//                 }
//                 if (authList.childLists[i].childLists[j].path != null && authList.childLists[i].childLists[j].path !== '') {
//                   const childrenNode = {
//                     name: authList.childLists[i].childLists[j].remark,
//                     path: authList.childLists[i].childLists[j].path,
//                     url: authList.childLists[i].childLists[j].componentUrl,
//                     component: resolve => require(['@/view' + authList.childLists[i].childLists[j].componentUrl + '.vue'], resolve)
//                   }
//                   childrenArray.push(childrenNode)
//                 }
//                 // 判断是否存在二级菜单
//                 if (authList.childLists[i].childLists[j].childLists !== undefined) {
//                   if (authList.childLists[i].childLists[j].childLists && authList.childLists[i].childLists[j].childLists.length > 0) {
//                     for (let k = 0, len4 = authList.childLists[i].childLists[j].childLists.length; k < len4; k++) {
//                       if (authList.childLists[i].childLists[j].childLists[k].path === undefined) {
//                         authList.childLists[i].childLists[j].childLists[k].path = null
//                       }
//                       if (authList.childLists[i].childLists[j].childLists[k].path != null) {
//                         const childrenNode = {
//                           name: authList.childLists[i].childLists[j].childLists[k].remark,
//                           path: authList.childLists[i].childLists[j].childLists[k].path,
//                           url: authList.childLists[i].childLists[j].childLists[k].componentUrl
//                         }
//                         childrenNode.component = resolve => require(['@/view' + authList.childLists[i].childLists[j].childLists[k].componentUrl + '.vue'], resolve)
//                         childrenArray.push(childrenNode)
//                       }
//                     }
//                   }
//                 }
//               }
//               parentNodes.children = childrenArray
//             }
//           }
//           routeList.push(parentNodes)
//         }
//       }
//     }
//     router.options.routes = router.options.routes.concat(routeList)
//     router.addRoutes(routeList)
//   } catch (e) {
//     console.log('路由加载:')
//     console.log(e.name + ': ' + e.message)
//   }
// }
