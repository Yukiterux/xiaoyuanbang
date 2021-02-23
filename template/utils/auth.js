import Cookies from 'js-cookie'
const TokenKey = 'User-Token'
const NameKey = 'User-Name'
const AvatarKey = 'User-Avatar'
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
      name:Cookies.get(NameKey),
    }
  },
  removeUser(){
    Cookies.remove(TokenKey),
    Cookies.remove(AvatarKey),
    Cookies.remove(NameKey)
  }
}


