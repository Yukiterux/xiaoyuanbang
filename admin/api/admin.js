import request from '@/utils/request'
const api_name = 'admin'
export default {
  getCount(){
    return request({
      url: `/${api_name}/count`,
      method: 'get',

    })
  },
  login(admin){
    return request({
      url: `/${api_name}/login`,
      method: 'post',
      data: admin,
    })
  },
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
  update(id, pojo) {
    if (id === null || id === '') {
      return this.save(pojo)
    }
    return request({
      url: `/${api_name}/${id}`,
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
  info() {
    return request({
      url: `/${api_name}/info`,
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
  updatePassword(pojo) {
    return request({
      url: `/${api_name}/change/password`,
      method: 'put',
      data: pojo
    })
  },
}
