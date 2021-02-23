import router from '../../router/index'
import axios from 'axios'
import {Notice, Message} from 'view-design';
// 创建axios实例
const apiService = axios.create({
  timeout: 150000 // 请求超时时间
});

export function successMessage(msg) {
  Message.success(msg);
}

export function errorMessage(msg) {
  Notice.error({
    title: '错误提示',
    desc: msg,
    duration: 6
  });
}

// Request 拦截器
apiService.interceptors.request.use((config) => {
  let token = sessionStorage.getItem('token')
  let userDeptCode = window.sessionStorage.getItem('userDeptCode')
  // let token = 'token'
  // let userDeptCode = 'userDeptCode's
  config.url = config.url + '/' + token + '/' + userDeptCode
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  errorMessage(error);
  return Promise.reject(error);
});

// Response 拦截器
apiService.interceptors.response.use(
  (response) => {
    const ret = response.data;
    if (ret.resultCode === '-9999') {
      console.log(router)
      router.replace('/login')
    }
    // 业务级异常
    if (response.status !== 200) {
      errorMessage(ret.message);
      return Promise.reject(ret); // 破坏promise链, reject之后的promise不在执行then(),而是直接调用catch()
    } else if (response.data.resultCode === '-9999') {
      errorMessage(ret.resultData);
      return Promise.reject(ret);
    }
    return Promise.resolve(response);
  },
  (error) => {
    const ret = error.response;
    // 系统级异常
    if (ret.status === 400) {
      errorMessage(ret.data.error_description || error.message); // 登陆失败、参数错误等
    } else if (ret.status === 403 || ret.status === 401) {
      errorMessage(ret.data.message); // 无访问权限
    } else {
      errorMessage('异常：[' + error.message + ']');
    }
    return Promise.reject(error);
  }
);
export default apiService
