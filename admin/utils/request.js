import axios from 'axios'
import Cookies from 'js-cookie'
import Auth from '@/utils/auth'
// 创建axios实例
let service = axios.create({
    baseURL: 'http://127.0.0.1:9998/', // api的base_url
    timeout: 30000 // 请求超时时间
  })
  
axios.defaults.headers.common['Authorization'] ="Bearer "+Cookies.get('token');


 
export default service