import request from '@/utils/request'
const group_name = 'search'
const api_name = 'search'
export default {
    search(page, size) {
        return request({
          url: `/${api_name}/${page}/${size}`,
          method: 'post',
        })
      }
}