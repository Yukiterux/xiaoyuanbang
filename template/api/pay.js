import request from '@/utils/request'
export default {
    getPayUrl(pojo) {
    return request({
      url: '/alipay/alipay',
      method: 'post',
      data: pojo
    })},
    transfer() {
      return request({
        url: '/alipay/transfer',
        method: 'post',
    })}
}

