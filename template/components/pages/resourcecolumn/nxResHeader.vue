<template>
  <section class="mark-head">
    <div class="login-info">
      <span style="font-style: italic;font-size:12px;color:#f5f5f5">{{userName}}</span>
      <!-- <a class="outbtn" @click="loginOut">退出</a> -->
    </div>
    <div class="menu-top">
      <div class="simple-menu">
        <a class="a1" @click="gotoindex"><img src="../../../assets/img/dataMarketIndex/menu-index-icon.png" alt=""> 首页</a>
        <template v-for="(it,index) in dataGovernList[0].childLists">
          <a class="a1" @click="enterDataGoverBtn(it, $event)" v-if="index < 3">
            <img :src="require('../../../assets/img/dataMarketIndex/menu-top-icon'+(index>11?11:index+1)+'.png')" alt=""> {{it.authorityName}}
          </a>
        </template>
        <Icon type="md-arrow-dropdown" style="font-size: 40px;cursor: pointer;" @click="slideMenu()"/>
      </div>
      <div class="all-menu" @mouseleave="hideMenu()">
        <a class="a1" @click="gotoindex"><img src="../../../assets/img/dataMarketIndex/menu-index-icon.png" alt=""> 首页</a>
        <template v-for="(it,index) in dataGovernList[0].childLists">
          <a class="a1" @click="enterDataGoverBtn(it, $event)">
            <img :src="require('../../../assets/img/dataMarketIndex/menu-top-icon'+(index>11?11:index+1)+'.png')" alt=""> {{it.authorityName}}
          </a>
        </template>
      </div>
    </div>
  </section>
</template>
<script>
  /* eslint-disable no-new */
  import {loadRouter} from '@/router/asyncRouter'
  import {buildMenu, saveParames} from '@/api/support/buildMenu'
  import {appServer} from '@/api/appServer'

  export default {
    name: 'mainHeader',
    data() {
      return {
        dataGovernList: [],
        dialogVisible: false,
        pwdForm: {},
        userName: '欢迎您',
        sysName: '数据资源管理系统'
      }
    },
    mounted() {
    },
    created() {
      this.getModelAuthor()
      try {
        if (sessionStorage.getItem('userName')) {
          this.userName = '欢迎您，' + sessionStorage.getItem('userName')
        }
        this.sysName = JSON.parse(sessionStorage.getItem('sysSettings')).sysName
      } catch (e) {
        this.userName = '欢迎您'
        this.sysName = '数据资源管理系统'
      }
    },
    methods: {
      slideMenu() {
        $('.simple-menu').css('display', 'none')
        $('.all-menu').css('display', 'block')
      },
      hideMenu() {
        $('.simple-menu').css('display', 'block')
        $('.all-menu').css('display', 'none')
      },
      gotoindex() {
        this.$router.replace({path: '/dataMark'})
      },
      // 跳转模块
      enterDataGoverBtn(item, e) {
        $(e.currentTarget).addClass('nav-active').siblings('a').removeClass('nav-active')
        if (item.path !== undefined && item.path !== null && item.path.length > 0) {
          if (item.componentUrl === undefined || item.componentUrl === null || item.componentUrl === '') {
            window.open(item.path)
          } else {
            saveParames(item)
            this.$router.replace({path: item.path})
          }
        } else {
          try {
            if (item.menuList === null || item.menuList.length === 0) {
              this.$message({message: '该模块下暂无内容！', type: 'warning '})
            } else {
              if (item.menuList[0].url) {
                // '1' 代表从first界面跳转至菜单，'2'代表浏览器刷新或浏览器地址栏输入跳转至菜单
                sessionStorage.setItem('routeEnterFlag', '1')
                sessionStorage.setItem('menuList', JSON.stringify(item.menuList))
                saveParames(item.menuList[0])
                this.$router.push({path: item.menuList[0].url})
              } else if (item.menuList[0].secondMenuList[0].url) {
                // '1' 代表从first界面跳转至菜单，'2'代表浏览器刷新或浏览器地址栏输入跳转至菜单
                sessionStorage.setItem('routeEnterFlag', '1')
                sessionStorage.setItem('menuList', JSON.stringify(item.menuList))
                saveParames(item.menuList[0].secondMenuList[0])
                this.$router.push({path: item.menuList[0].secondMenuList[0].url})
              } else {
                this.$message({message: '该模块下暂无内容', type: 'fail'})
              }
            }
          } catch (e) {
            console.log(e.name + ': ' + e.message)
          }
        }
      },
      // 获取数据治理列表
      getModelAuthor() {
        if (sessionStorage.getItem('authList') == null) {
          this.$router.replace('/login')
        } else {
          let authList = JSON.parse(sessionStorage.getItem('authList'))
          // 遍历每一个功能模块
          for (let i = 0, len = authList.length; i < len; i++) {
            // 遍历大模块下面的子模块，并生成菜单
            if (authList[i].childLists) {
              for (let j = 0, len1 = authList[i].childLists.length; j < len1; j++) {
                if (authList[i].childLists[j].menuList === undefined || authList[i].childLists[j].menuList === null) {
                  authList[i].childLists[j].menuList = buildMenu(authList[i].childLists[j].childLists)
                } else {
                  break
                }
              }
            }
          }
          console.log(authList)
          this.dataGovernList = authList
          sessionStorage.setItem('authList', JSON.stringify(this.dataGovernList))
          loadRouter()
        }
      },
      bigImgs() {
        this.$emit('childBtnlue')
      },
      loginOut() {
        sessionStorage.clear()
        this.$router.push('/login')
      },
      changePwd() {
        this.dialogVisible = true
      },
      cancelForm(formName) {
        this.dialogVisible = false
        if (this.$refs[formName] !== undefined) {
          setTimeout(() => {
            this.$refs[formName].resetFields()
          }, 100)
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .mark-head {
    position: fixed;
    width: 100%;
    height: 130px;
    top: 0;
    left: 0;
    background: url(../../../assets/img/dataMarketIndex/top2@2x.png) no-repeat;
    background-color: #F2F2F6;
    background-size: cover;
    z-index: 101;

    .menu-top .simple-menu {
      position: absolute;
      right: 0;
      /*top: 120px;*/
      bottom: 0;
      zoom: 0.6;
      -moz-transform:scale(0.6);
      -moz-transform-origin:bottom right;
      width: 900px;
      a {
        display: inline-block;
        background-color: #ffffff;
        padding: 10px;
        border-radius: 5px;
        margin-right: 10px;
        color: #333333;
        cursor: pointer;
        text-decoration: none;
        font-size: 24px;
        width: 190px;
        margin-bottom: 15px;
        text-align: center;
        border: 1px solid #fff;
        &:hover {
          border: 1px solid #0d6aad;
        }
        img {
          width: 26px;
          height: 28px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }
  .all-menu {
    display: none;
    // position: absolute;
    // top: -60px;
    background-color: rgba(0,0,0,0.3);
    padding: 15px;
    border-radius: 10px;
    // position: absolute;
    position: absolute;
      right: 0;
      /*top: 120px;*/
      bottom: -146px;
      zoom: 0.6;
      -moz-transform:scale(0.6);
      -moz-transform-origin: right;
      width: 900px;
      a {
        display: inline-block;
        background-color: #ffffff;
        padding: 10px;
        border-radius: 5px;
        margin-right: 10px;
        color: #333333;
        cursor: pointer;
        text-decoration: none;
        font-size: 24px;
        width: 190px;
        margin-bottom: 15px;
        text-align: center;
        border: 1px solid #fff;
        &:hover {
          border: 1px solid #0d6aad;
        }
        img {
          width: 26px;
          height: 28px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
  }
  .login-info {
    position: absolute;
    right: 30px;
    top: 15px;
    font-size: 14px;
    .outbtn {
      margin-left: 20px;
      display: inline-block;
      width: 70px;
      height: 25px;
      line-height: 25px;
      background-color: #4C789D;
      color: #ffffff;
      border-radius: 20px;
      text-align: center;
    }
  }
  .nav-active {
    border: 1px solid #0d6aad !important;
  }
</style>
