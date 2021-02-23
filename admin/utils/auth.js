import Cookies from 'js-cookie'
const TokenKey = 'token'
const NameKey = 'name'
const AvatarKey = 'avatar'
export default{
  setUser(token,name,avatar) {  
    Cookies.set(NameKey, name)
    Cookies.set(AvatarKey, avatar)
    Cookies.set(TokenKey, token)
  },
  setUserAva(avatar) {  
    Cookies.set(AvatarKey, avatar)
  },
  getUser(){
    return {
      token:Cookies.get(TokenKey),
      avatar:Cookies.get(AvatarKey),
      name:Cookies.get(NameKey)
    }
  },
  getToken(){
    return Cookies.get(TokenKey)
  },
  removeUser(){
    Cookies.remove(TokenKey),
    Cookies.remove(AvatarKey),
    Cookies.remove(NameKey)
  },
  //获取服务端cookie
  getcookiesInServer:function (req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
     
      let parts = val.split('=');
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    return service_cookie;
  },
  //获取客户端cookie
  getcookiesInClient:function (key) {
    return Cookies.get(key) ? Cookies.get(key) : ''
  }
}


