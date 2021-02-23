import request from '@/utils/request'
const api_name = 'order'
export default {
  getList() {
    return request({
      url: `/${api_name}`,
      method: 'get'
    })
  },
  deleteOrderPlaced(id) {
    return request({
      url: `/${api_name}/orderPlaced/${id}`,
      method: 'delete'
    })
  },
  deleteAcceptOrder(id) {
    return request({
      url: `/${api_name}/acceptOrder/${id}`,
      method: 'delete'
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
  update(pojo) {
    return request({
      url: `/${api_name}/${pojo.id}`,
      method: 'put',
      data: pojo
    })
  },
  cancel(id) {
    return request({
      url: `/${api_name}/cancel/${id}`,
      method: 'put',
      data: id
    })
  },
  continue(id) {
    return request({
      url: `/${api_name}/continue/${id}`,
      method: 'put',
      data: id
    })
  },
  findById(id) {
    return request({
      url: `/${api_name}/${id}`,
      method: 'get'
    })
  },
  findSomeById(id) {
    return request({
      url: `/${api_name}/some/${id}`,
      method: 'get'
    })
  },
  comment(id) {
    return request({
      url: `/comment/${id}`,
      method: 'get'
    })
  },
  searchComment(page, size, searchMap) {
    return request({
      url: `/comment/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  updateComment(pojo) {
    return request({
      url: `/comment/${pojo.id}`,
      method: 'put',
      data: pojo
    })
  },
  deleteComment(pojo) {
    return request({
      url: `/comment/${pojo.id}`,
      method: 'delete',
    })
  },
  getErrandsComment(page, size) {
      return request({
        url: `/comment/ErrandsComment/${page}/${size}`,
        method: 'get',
      })
    },
    getUserComment(page, size) {
      return request({
        url: `/comment/userComment/${page}/${size}`,
        method: 'get',
      })
    },
  deleteById(id) {
    return request({
      url: `/${api_name}/${id}`,
      method: 'delete'
    })
  },
 
  //接单查询
  acceptOrder(page, size,prop) {
    return request({
      url: `/${api_name}/acceptOrder/${page}/${size}`,
      method: 'post',
      data: prop
    })
  },
  //下单查询
  orderPlaced(page, size,prop) {
    return request({
      url: `/${api_name}/orderPlaced/${page}/${size}`,
      method: 'post',
      data: prop
    })
  },
  recentOrder(){
    return request({
      url: `/${api_name}/recentOrder`,
      method: 'get',
    })
  }
}
