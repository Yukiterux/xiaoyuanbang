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
  saveBuyOrder(order){
    return request({
      url: `/${api_name}/buyOrder`,
      method: 'post',
      data: order
    })
  },
  saveSendOrder(order){
    return request({
      url: `/${api_name}/sendOrder`,
      method: 'post',
      data: order
    })
  },
  saveTakeOrder(order){
    return request({
      url: `/${api_name}/takeOrder`,
      method: 'post',
      data: order
    })
  },
  saveQueueOrder(order){
    return request({
      url: `/${api_name}/queueOrder`,
      method: 'post',
      data: order
    })
  },
  saveOtherOrder(order){
    return request({
      url: `/${api_name}/otherOrder`,
      method: 'post',
      data: order
    })
  },
  startOrder(id) {
    return request({
      url: `/${api_name}/makeOrder/${id}`,
      method: 'put',
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
  //取消订单
  userCancelOrder(cancelReason,id) {
    return request({
      url: `/${api_name}/userCancelOrder/${id}`,
      method: 'put',
      data: cancelReason
    })
  },

  errandsCancelOrder(cancelReason,id) {
    return request({
      url: `/${api_name}/errandsCancelOrder/${id}`,
      method: 'put',
      data: cancelReason
    })
  },

  errandsAgreeCancelOrder(id) {
    return request({
      url: `/${api_name}/errandsAgreeCancelOrder/${id}`,
      method: 'put',
    })
  },
  errandsDisCancelOrder(reason,id) {
    return request({
      url: `/${api_name}/errandsDisagreeCancelOrder/${id}`,
      method: 'put',
      data: reason
    })
  },
  userAgreeCancelOrder(id) {
    return request({
      url: `/${api_name}/userAgreeCancelOrder/${id}`,
      method: 'put',
    })
  },
  userDisCancelOrder(reason,id) {
    return request({
      url: `/${api_name}/userDisagreeCancelOrder/${id}`,
      method: 'put',
      data: reason
    })
  },
  completeOrder(id) {
    return request({
      url: `/${api_name}/completeOrder/${id}`,
      method: 'put',
    })
  },
  errCompleteOrder(id) {
    return request({
      url: `/${api_name}/errCompleteOrder/${id}`,
      method: 'put',
    })
  },
  userComment(comm,id) {
    return request({
      url: `/comment/userComment/${id}`,
      method: 'put',
      data: comm
    })
  },
  errComment(comm,id) {
    return request({
      url: `/comment/errComment/${id}`,
      method: 'put',
      data: comm
    })
  },
}
