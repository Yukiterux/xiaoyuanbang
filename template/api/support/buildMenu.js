export function buildMenu(menudata) {
  // menudata为子模块菜单
  let sidebarList = []
  try {
    if (menudata === undefined) {
      return sidebarList
    }
    for (var i = 0, len = menudata.length; i < len; i++) {
      let tempMenu = {}
      // 可展示
      if (menudata[i].isShow === '1') {
        // 一级菜单
        tempMenu.firstMenu = menudata[i].authorityName
        tempMenu.iconName = menudata[i].iconName
        tempMenu.authorityId = menudata[i].authorityId
        tempMenu.configureFlag = menudata[i].configureFlag
        tempMenu.param = menudata[i].param
        if (menudata[i].path) {
          tempMenu.url = menudata[i].path
        }
        if (menudata[i].childLists != null && menudata[i].childLists.length > 0) {
          tempMenu.secondMenuList = []
          for (var j = 0, length = menudata[i].childLists.length; j < length; j++) {
            if (menudata[i].childLists[j].isShow === '1') {
              tempMenu.secondMenuList.push(
                {
                  menuText: menudata[i].childLists[j].authorityName,
                  url: menudata[i].childLists[j].path,
                  authorityId: menudata[i].childLists[j].authorityId,
                  configureFlag: menudata[i].childLists[j].configureFlag,
                  param: menudata[i].childLists[j].param,
                  iconName: menudata[i].childLists[j].iconName
                }
                )
            }
          }
        }
        sidebarList.push(tempMenu)
      }
    }
  } catch (e) {
    console.log('菜单加载异常信息:');
    console.log(e.name + ': ' + e.message);
  }
  return sidebarList
}
export function saveParames(item) {
  sessionStorage.setItem('btnAuthor', item.authorityId)
  sessionStorage.setItem('viewParam', item.param)
}
export function getMenu(path) {
  let menuList = []
  let authList = JSON.parse(sessionStorage.getItem('authList'))
  try {
    // 大模块循环
    for (let i = 0, len1 = authList.length; i < len1; i++) {
      // 子模块循环
      if (authList[i].childLists !== undefined) {
        for (let j = 0, len2 = authList[i].childLists.length; j < len2; j++) {
          // 判断该路径是否为子模块一级菜单路径
          if (authList[i].childLists[j].childLists !== undefined) {
            for (let k = 0, len3 = authList[i].childLists[j].childLists.length; k < len3; k++) {
              if (path === authList[i].childLists[j].childLists[k].path) {
                menuList = authList[i].childLists[j].menuList
                return menuList
              }
              // 判断该路径是否为子模块二级菜单路径
              if (authList[i].childLists[j].childLists[k].childLists !== undefined) {
                for (let m = 0, len4 = authList[i].childLists[j].childLists[k].childLists.length; m < len4; m++) {
                  if (path === authList[i].childLists[j].childLists[k].childLists[m].path) {
                    menuList = authList[i].childLists[j].menuList
                    return menuList
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (e) {

  }
  return menuList
}
export function getMenuLocation(path, menu) {
  let location = {
    secondMenuShow: 0,
    secondMenuCur: 0,
    flag: false
  }
  for (var i = 0, len = menu.length; i < len; i++) {
    // 无2级菜单
    if (menu[i].secondMenuList == undefined) {
      if (menu[i].url == path) {
        location.secondMenuShow = i
        location.flag = true
        break
      }
    } else {
      for (var j = 0, len1 = menu[i].secondMenuList.length; j < len1; j++) {
        if (menu[i].secondMenuList[j].url == path) {
          location.secondMenuShow = i
          location.secondMenuCur = j
          location.flag = true
          break
        }
      }
      if (location.flag) {
        break
      }
    }
  }
  return location
}
