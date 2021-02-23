import {findAuthoritys} from '@/api/system/sysAuthority'

export function arrayTansObject(array) {
  const obj = {}
  if (array && array.length > 0) {
    const keys = []
    for (const key in array[0]) {
      obj[key] = []
      keys.push(key)
    }
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        obj[keys[j]].push(array[i][keys[j]])
      }
    }
  }
  return obj
}

export function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
}

export function downloadUrl(path) {
  const token = window.sessionStorage.getItem('token')
  const deptCode = window.sessionStorage.getItem('userDeptCode')
  return 'http://' + window.location.host + path + '/' + token + '/' + deptCode
}

export function setAuthId(path) {
  const authList = JSON.parse(sessionStorage.getItem('authList'))
  const authId = getAuthId(path, authList)
  sessionStorage.setItem('btnAuthor', authId)
}

function getAuthId(path, list) {
  if (list && list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].path && list[i].path === path) {
        return list[i].authorityId
      } else {
        const result = getAuthId(path, list[i].childLists)
        if (result && result.length > 0) {
          return result
        }
      }
    }
  }
  return ''
}
export function s2ab(s) {
  if (typeof ArrayBuffer !== 'undefined') {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
  } else {
      var buf = new Array(s.length);
      for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
      return buf;
  }
}
export function saveAs(obj, fileName) { //当然可以自定义简单的下载文件实现方式
    var tmpa = document.createElement("a");
    tmpa.download = fileName || "下载";
    tmpa.href = URL.createObjectURL(obj); //绑定a标签
    tmpa.click(); //模拟点击实现下载
    setTimeout(function () { //延时释放
        URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
}