import axios from 'axios'
import Cookies from 'js-cookie'

// 创建axios实例
let service = axios.create({
    baseURL: 'http://127.0.0.1:8081/', // api的base_url
    timeout: 30000 // 请求超时时间
  })
  
axios.defaults.headers.common['Authorization'] ="Bearer "+Cookies.get("User-Token");
export default service