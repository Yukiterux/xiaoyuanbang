import request from '@/utils/request'
export default {
    getAddress(address){
        return request({
          url:`/getAddress/${address}`,
          method: 'get',
        })
   }
}