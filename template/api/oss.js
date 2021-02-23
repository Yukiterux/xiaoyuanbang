import request from '@/utils/request'
const group_name = 'oss'
const api_name = 'oss'
export default {
  upload(data) {
    return request({
      url: `/${api_name}/uploadArticleImg`,
      method: 'post',
      data: data
    })
  }
}
