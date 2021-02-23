import request from '@/utils/request'
const group_name = 'base'
export default {
    getAddress(address){
        return request({
          url:`/getAddress/${address}`,
          method: 'get',
        })
   }
}