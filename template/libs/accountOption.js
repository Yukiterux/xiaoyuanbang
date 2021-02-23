import axios from 'axios'
const APIADS = '/dgms-system'
// 获取url参数后面的值
function getUrlValue(paras) {
  var url = location.href
  var paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
  var paraObj = {}
  var j = ''
  for (var i = 0; (j = paraString[i]); i++) {
    paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length)
  }
  var returnValue = paraObj[paras.toLowerCase()]
  if (typeof returnValue === 'undefined') {
    return ''
  } else {
    return returnValue
  }
}
// 加密
function encryUser(name) {
  return new Promise((resolve, reject) => {
    axios.get(APIADS + '/setPwd', {params: {pwd: name}}).then(res => {
      resolve(res.data)
    })
  })
}
// 解密
function decryUser(name) {
  return new Promise((resolve, reject) => {
    axios.get(APIADS + '/system/getPwd', {params: {pwd: name}}).then(res => {
      resolve(res.data)
    })
  })
}
// 获取用户信息(模拟用户登录，把用户信息保存在sesstion中)
function getUserInfo(name) {
  return new Promise((resolve, reject) => {
    axios.get(APIADS + '/userLoginByUserName', {params: {userName: name}}).then(res => {
      if (res.data.msgCode === '0') {
        window.sessionStorage.setItem('userName', res.data.userName)
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('userDeptCode', res.data.deptCode)
        window.sessionStorage.setItem('nickName', res.data.nickName)
        window.sessionStorage.setItem('userId', res.data.userId)
        for (var i = 0; i < res.data.authList.length; i++) {
          if (res.data.authList[i].authority_name === '用户管理') {
            sessionStorage.setItem('curAuthor', res.data.authList[i].authority_id)
            resolve(res.data)
          }
        }
      } else {
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
      }
    })
  })
}

function getUserInfoLogin(name) {
  return new Promise((resolve, reject) => {
    axios.get(APIADS + '/userLoginByUserName', {params: {userName: name}}).then(res => {
      if (res.data.msgCode === '0') {
        window.sessionStorage.setItem('user', res.data)
        window.sessionStorage.setItem('userName', res.data.userName)
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('userDeptCode', res.data.deptCode)
        window.sessionStorage.setItem('deptId', res.data.deptment.id)
        window.sessionStorage.setItem('deptName', res.data.deptment.name)
        window.sessionStorage.setItem('nickName', res.data.nickName)
        window.sessionStorage.setItem('authList', JSON.stringify(res.data.authList))
        window.sessionStorage.setItem('userId', res.data.userId)
        resolve(res.data)
      } else {
        window.history.go(-1)
      }
    })
  })
}
function getUserInfoByLogin(name) {
  return new Promise((resolve, reject) => {
    axios.get(APIADS + '/userLoginByUuid', {params: {uuid: name}}).then(res => {
      if (res.data.msgCode === '0') {
        console.info(res.data)
        window.sessionStorage.setItem('user', res.data)
        window.sessionStorage.setItem('userName', res.data.userName)
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('userDeptCode', res.data.deptCode)
        window.sessionStorage.setItem('deptId', res.data.deptment.id)
        window.sessionStorage.setItem('deptName', res.data.deptment.name)
        window.sessionStorage.setItem('nickName', res.data.nickName)
        window.sessionStorage.setItem('authList', JSON.stringify(res.data.authList))
        window.sessionStorage.setItem('userId', res.data.userId)
        resolve(res.data)
      } else {
        this.$router.replace('/login')
      }
    })
  })
}
export {getUrlValue, encryUser, decryUser, getUserInfo, getUserInfoLogin, getUserInfoByLogin}
