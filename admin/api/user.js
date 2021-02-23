import request from '@/utils/request'
const group_name = 'user'
const api_name = 'user'
export default {
  getList() {
    return request({
      url: `/${api_name}`,
      method: 'get'
    })
  },
  search(page, size, searchMap) {
    return request({
      url: `/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  save(pojo) {
    return request({
      url: `/${api_name}`,
      method: 'post',
      data: pojo
    })
  },
  findById(id) {
    return request({
      url: `/${api_name}/${id}`,
      method: 'get'
    })
  },
  findInfoById(id) {
    return request({
      url: `/${api_name}/info/${id}`,
      method: 'get'
    })
  },
  checkName(name) {
    return request({
      url: `/${api_name}/checkName/${name}`,
      method: 'get'
    })
  },
  checkMobile(mobile) {
    return request({
      url: `/${api_name}/mobile/${mobile}`,
      method: 'get'
    })
  },
  updateInfo(pojo) {
    return request({
      url: `/${api_name}/updateInfo`,
      method: 'put',
      data: pojo
    })
  },
  changeAva(img) {
    return request({
      url: `/${api_name}/change/Ava`,
      method: 'put',
      data: img
    })
  },
  apply(user) {
    return request({
      url: `/${api_name}/apply`,
      method: 'put',
      data: user
    })
  },
  info() {
    return request({
      url: `/${api_name}/info`,
      method: 'get'
    })
  },
  update(pojo) {
    return request({
      url: `/${api_name}/${pojo.id}`,
      method: 'put',
      data: pojo
    })
  },
  deleteById(id) {
    return request({
      url: `/${api_name}/${id}`,
      method: 'delete'
    })
  },
  register(user,code) {
    return request({
      url: `/${api_name}/register/${code}`,
      method: 'post',
      data:user
    })
  },
  changeNum2(user,code) {
    return request({
      url: `/${api_name}/changeNum2/${code}`,
      method: 'post',
      data:user
    })
  }, changeNum1(user,code) {
    return request({
      url: `/${api_name}/changeNum1/${code}`,
      method: 'post',
      data:user
    })
  },
  login(user){
    return request({
      url: `/${api_name}/login`,
      method: 'post',
      data: user,
    })
  },
  sendsms(mobile){
    return request({
      url: `/${api_name}/sendsms/${mobile}`,
      method: 'post',
    })
  },
  sendChange1Sms(mobile){
    return request({
      url: `/${api_name}/sendChange1Sms/${mobile}`,
      method: 'post',
    })
  },
  sendChange2Sms(mobile){
    return request({
      url: `/${api_name}/sendChange2Sms/${mobile}`,
      method: 'post',
    })
  },
}
