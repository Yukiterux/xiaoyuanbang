<template>
  <div class="mainCons">
    <p id="version">{{version}}</p>
    <top-head v-if="headMode" :sysName="sysName" :userName="userName" @childBtnlue="chilBtnlue"></top-head>
    <div :class="[headMode === true ? 'left-texs' : 'left-texs-no-head']">
      <Tabs :value="tabsValue" @on-click="handleClick">
        <TabPane v-for="(item, index) in dataGovernList" :name="'model'+(index + 1).toString()"
                 :label="item.authorityName" :key="item.authorityId" icon="logo-apple">
          <div class="content">
            <ul class="col-text fn-clear">
              <li v-for="(it,index) in item.childLists" :key="index">
                <div class="text-lists" :class="true?'ctive':''" @mouseenter="entres($event, index+1)"
                     @mouseleave="leaves($event, index+1)">
                  <i :class="'menuIcon' + (index + 1)"></i>
                  <p>{{it.authorityName}}</p>
                  <span v-show="textshow" @click="enterDataGoverBtn(it,$event)">进入系统</span>
                </div>
              </li>
            </ul>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="40%" :close-on-press-escape="false"
               :show-close="false" :close-on-click-modal="false">
      <el-form label-width="100px" :model="pwdForm" ref="pwdForm" status-icon :rules="rulesForm">
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="pwdForm.newPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="rePwd">
          <el-input v-model="pwdForm.rePwd" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button type="primary" @click="saveData('pwdForm')" size="small">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import env from '../../../config/env'
  import {
    userLoginByUserId,
    getUserInfo,
    getSystemSettings,
    updateUserPassword,
    userLoginBysuzhouSsoId
  } from '@/api/components/login'
  import {listToTree} from '@/api/support/jsonHelp'
  import topHead from './children/mainHeader'
  import {loadRouter} from '@/router/asyncRouter'
  import {buildMenu, saveParames} from '@/api/support/buildMenu'
  import {headLoading} from '@/api/appServer'

  export default {
    name: 'firstcon',
    components: {topHead},
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value !== this.pwdForm.newPwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var strongPass = (rule, value, callback) => {
        var reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_])[\da-zA-Z~!@#$%^&*_]{6,}$/ // 全是数字或字母
        if (!value.match(reg)) {
          callback(new Error('密码必须是数字和大小写字母和特殊字符的组合!'))
        } else {
          callback()
        }
      }
      return {
        tabsValue: 'model1',
        dialogVisible: false,
        pwdForm: {},
        rulesForm: {
          newPwd: [{required: true, message: '请输入新密码', trigger: 'blur'}, {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }, {validator: strongPass, trigger: 'blur'}],
          rePwd: [{required: true, message: '请确认新密码', trigger: 'blur'}, {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }, {validator: validatePass2, trigger: 'blur'}]
        },
        headMode: true,
        version: '',
        index: 0,
        indext: 0,
        nowindex: 0,
        textshow: false,
        bigshow: true,
        dataPage: false,
        dataGovernList: [],
        sysName: undefined,
        userName: undefined
      }
    },
    methods: {
      getVersion() {
        this.version = env.version
      },
      alertIframe() {
        this.index = 1
        $('#service').css('display', 'inline')
      },
      closeIframe() {
        this.index = 0
        $('#service').css('display', 'none')
      },
      start() {
        // 获取数据治理列表
        this.getModelAuthor()
      },
      // Tab 切换
      handleClick(name) {
        this.tabsValue = name
        sessionStorage.setItem('tabsIndex', name)
      },
      // 获取数据治理列表
      getModelAuthor() {
        if (sessionStorage.getItem('authList') == null) {
          this.$router.replace('/login')
        } else {
          const authList = JSON.parse(sessionStorage.getItem('authList'))
          // 遍历每一个功能模块
          for (let i = 0, len = authList.length; i < len; i++) {
            // 遍历大模块下面的子模块，并生成惨菜
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
          this.dataGovernList = authList
          sessionStorage.setItem('authList', JSON.stringify(this.dataGovernList))
          loadRouter()
          this.dataPage = true
          const pageName = this.getUrlKey('pageFlag')
          if (pageName) {
            sessionStorage.setItem('userDeptCode', '001')
            this.$router.push('/nomain/' + pageName)
          }
        }
      },

      navBtn: function (index) {
        this.indext = index
        this.nowindex = index
      },
      entres(e, index) {
        $(e.currentTarget).children('i').addClass('menuIcon' + index + '_hover')
        this.textshow = true
      },
      leaves(e, index) {
        $(e.currentTarget).children('i').removeClass('menuIcon' + index + '_hover')
        this.textshow = false
      },
      enterBtn: function () {
        this.$router.push({path: '/homepage'})
      },
      enterDataGoverBtn: function (item) {
        if (item.authorityName === '后台管理') {
          let urlOpen = 'http://10.18.31.224:10000/ump/#/ssologin?access_token=' + sessionStorage.getItem('token') + '&app_code=client_dsjpt'
          window.open(item.path)
          return
        }
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
      // 数字滚动
      dataAction() {
        const _self = this
        const eles = _self.$refs.numberGrow
        for (let i = 0; i < eles.length; i++) {
          for (let j = 0; j < _self.messlist.length; j++) {
            if (i === j) {
              _self.numberGrow(eles[i], _self.messlist[j].num)
            }
          }
        }
      },
      // 数字滚动增加方法
      numberGrow(ele, num) {
        const step = num / 200
        let current = 0
        let start = 0
        let t = setInterval(function () {
          start += step
          if (start > num) {
            clearInterval(t)
            start = num
            t = null
          }
          if (current === start) {
            return
          }
          current = start
          ele.innerHTML = parseInt(current)
        }, 50)
      },
      chilBtnlue() {
        this.bigshow = !this.bigshow
      },
      getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
      },
      getSystemSetting() {
        new Promise((resolve, reject) => {
          getSystemSettings().then(res => {
            if (res.data.resultCode === '0000') {
              const sysSettings = {}
              res.data.resultData.forEach(item => {
                this.$set(sysSettings, item.parameterNameEn, item.parameterValue)
              })
              window.sessionStorage.setItem('sysSettings', JSON.stringify(sysSettings))

              try {
                this.sysName = sysSettings.sysName
              } catch (e) {
                this.sysName = '数据资源管理系统'
              }
            }
          })
        })
      },
      compare(property) {
        return function (a, b) {
          const value1 = a[property]
          const value2 = b[property]
          return value2 - value1
        }
      },
      compareAESC(property) {
        return function (a, b) {
          const value1 = Number(a[property])
          const value2 = Number(b[property])
          return value1 - value2
        }
      },
      // 统一身份获取权限结构 转数据资源原有权限结构
      menuListToAuthList(menuList) {
        const authList = []
        menuList = menuList.sort(this.compare('sort'))
        for (let i = 0, len = menuList.length; i < len; i++) {
          let param = {}
          param = JSON.parse(menuList[i].configItem)
          let auth = {}
          auth = {
            authorityDescribe: '',
            authorityId: menuList[i].id,
            authorityName: menuList[i].menuName,
            authorityType: '1',
            configureFlag: param.configureFlag,
            createDate: '',
            isShow: '1',
            orderIndex: menuList[i].sort.toString(),
            param: param.param,
            parentAuthorityId: menuList[i].parentId,
            remark: param.remark,
            state: '0',
            updateDate: '',
            childLists: []
          }
          if (menuList[i].enabled === 1) {
            auth.isShow = '0'
          }
          if (menuList[i].menuPath) {
            auth.componentUrl = menuList[i].menuPath
          }
          if (menuList[i].menuUrl) {
            auth.path = menuList[i].menuUrl
          }
          if (param.iconName) {
            auth.iconName = param.iconName
          }

          authList.push(auth)
        }
        return listToTree(authList, 'authorityId', 'parentAuthorityId').sort(this.compareAESC('orderIndex'))
      },

      getUserInfoByUuid(uuid) {
        new Promise((resolve, reject) => {
          userLoginByUserId({userId: uuid}).then(res => {
            if (res.data.msgCode === '0') {
              console.info(res.data)
              window.sessionStorage.setItem('user', res.data)
              window.sessionStorage.setItem('userName', res.data.userName)
              window.sessionStorage.setItem('token', res.data.token)
              window.sessionStorage.setItem('userDeptCode', res.data.deptCode)
              window.sessionStorage.setItem('deptId', res.data.deptment.id)
              window.sessionStorage.setItem('deptName', res.data.deptment.name)
              window.sessionStorage.setItem('nickName', res.data.nickName)
              window.sessionStorage.setItem('authList', JSON.stringify(res.data.authList))
              window.sessionStorage.setItem('userId', res.data.userId)
              this.userName = '欢迎您,' + res.data.userName
              this.getModelAuthor()
              if (sessionStorage.getItem('sysSettings') === undefined || sessionStorage.getItem('sysSettings') === null) {
                this.getSystemSetting()
              } else {
                this.sysName = JSON.parse(sessionStorage.getItem('sysSettings')).sysName
              }
              this.dataPage = true
            } else {
              this.$message({
                message: '登录失败',
                type: 'error'
              })
              this.$router.replace('/login')
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      getUserInfoBySuzhouSsoid(suzhouSsoId) {
        userLoginBysuzhouSsoId({userId: suzhouSsoId}).then(res => {
          if (res.data.msgCode === '0') {
            console.info(res.data)
            window.sessionStorage.setItem('user', res.data)
            window.sessionStorage.setItem('userName', res.data.userName)
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('userDeptCode', res.data.deptCode)
            window.sessionStorage.setItem('deptId', res.data.deptment.id)
            window.sessionStorage.setItem('deptName', res.data.deptment.name)
            window.sessionStorage.setItem('nickName', res.data.nickName)
            window.sessionStorage.setItem('authList', JSON.stringify(res.data.authList))
            window.sessionStorage.setItem('userId', res.data.userId)
            this.userName = '欢迎您,' + res.data.userName
            this.getModelAuthor()
            if (sessionStorage.getItem('sysSettings') === undefined || sessionStorage.getItem('sysSettings') === null) {
              this.getSystemSetting()
            } else {
              this.sysName = JSON.parse(sessionStorage.getItem('sysSettings')).sysName
            }
            this.dataPage = true
          } else {
            this.$message({
              message: '登录失败',
              type: 'error'
            })
            this.$router.replace('/login')
          }
        }).catch(error => {
          this.$router.replace('/login')
        })
      },
      getUserInfoByAccessToken(token) {
        console.log('调用token信息')
        new Promise((resolve, reject) => {
          getUserInfo({accessToken: token}).then(res => {
            if (res.data.resultCode === 0) {
              sessionStorage.setItem('deptId', res.data.resultData.user.deptment.id)
              sessionStorage.setItem('deptName', res.data.resultData.user.deptment.name)
              if (res.data.resultData.user.isAdmin === 0) {
                sessionStorage.setItem('admin_flag', '1')
              } else {
                sessionStorage.setItem('admin_flag', '0')
              }
              sessionStorage.setItem('authList', JSON.stringify(this.menuListToAuthList(res.data.resultData.menuList)))
              sessionStorage.setItem('nickName', res.data.resultData.user.nickName)
              sessionStorage.setItem('token', token)
              sessionStorage.setItem('user', res.data.resultData.user)
              sessionStorage.setItem('userDeptCode', res.data.resultData.user.deptment.deptCode)
              if (res.data.resultData.user.deptment.distno) {
                sessionStorage.setItem('distNo', res.data.resultData.user.deptment.distno)
              } else {
                sessionStorage.setItem('distNo', res.data.resultData.user.deptment.distNo)
              }
              sessionStorage.setItem('userId', res.data.resultData.user.id)
              sessionStorage.setItem('userName', res.data.resultData.user.name)
              this.userName = '欢迎您,' + res.data.resultData.user.name
              this.getModelAuthor()
              if (sessionStorage.getItem('sysSettings') === undefined || sessionStorage.getItem('sysSettings') === null) {
                this.getSystemSetting()
              }
              this.dataPage = true
            } else {
              this.$message({
                message: '登录失败',
                type: 'error'
              })
              this.$router.replace('/login')
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      checkPwd() {
        const pwd = sessionStorage.getItem('pwd')
        if (pwd && pwd === 'single') {
          this.dialogVisible = true
        } else {
          this.dialogVisible = false
        }
      },
      cancelForm(formName) {
        this.dialogVisible = false
        if (this.$refs[formName] !== undefined) {
          setTimeout(() => {
            this.$refs[formName].resetFields()
          }, 100)
        }
      },
      saveData(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var params = {
              userId: sessionStorage.getItem('userId'),
              oldPwd: '12345678',
              newPwd: this.pwdForm.newPwd
            }
            new Promise((resolve, reject) => {
              updateUserPassword(params).then(res => {
                if (res.data.resultCode === '0000' && res.data.resultData.msgCode === 'true') {
                  this.$message({
                    message: res.data.resultData.msg,
                    type: 'success'
                  })
                  this.dialogVisible = false
                  sessionStorage.clear()
                  this.$router.push('/login')
                } else {
                  this.$message.error({message: res.data.resultData.msg})
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          } else {
            this.$Message.error('请填写完整的字段信息')
          }
        })
      }
    },
    created() {
      const pathFlag = sessionStorage.getItem('tabsIndex')
      if (pathFlag) {
        this.tabsValue = pathFlag
      }
      this.headMode = headLoading
      this.checkPwd()
      const sessionToken = sessionStorage.getItem('token')
      if (sessionToken) {
        this.getVersion()
        this.getModelAuthor()
        this.getSystemSetting()
        this.userName = '欢迎您,' + sessionStorage.getItem('userName')
      } else {
        const token = this.getUrlKey('access_token')
        const uuid = this.getUrlKey('uuid')
        const suzhouSsoId = this.getUrlKey('suzhouSsoId')
        if (token) {
          this.getUserInfoByAccessToken(token)
        } else if (uuid) {
          this.getUserInfoByUuid(uuid)
        } else if (suzhouSsoId) {
          this.getUserInfoBySuzhouSsoid(suzhouSsoId)
        } else {
          this.$router.replace('/login')
        }
      }
    },
    mounted() {

    }
  }
</script>
<style lang='scss'>
  #service {
    position: absolute;
    z-index: 1000;
    display: none;
  }

  .mainCons {
    .left-list {
      position: fixed;
      top: 60px;
      left: 0;
      bottom: 0;
      width: 217px;
      border: 1px solid rgba(155, 155, 155, 0.24);
      background: #fff;

      .message {
        height: 72px;
        background: url(../../assets/img/icon/image-back.png) no-repeat;
        background-size: 100% 100%;
      }

      .age-img {
        margin-top: 8px;
        margin-left: 23px;
        float: left;
        width: 56px;
        height: 56px;
        background: url(../../assets/img/icon/image-log.png) no-repeat;
        background-size: 100% 100%;
        border-radius: 56px;
      }

      .age-text {
        float: left;
        text-align: left;
        margin-left: 8px;
      }

      .name {
        margin-top: 13px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        line-height: 24px;
      }

      .list {
        line-height: 22px;
        font-size: 14px;
        color: #333;
      }

      .title {
        border-top: 1px solid rgba(155, 155, 155, 0.24);
        padding-top: 11px;
        text-align: left;
        font-size: 0;

        i,
        span {
          display: inline-block;
          vertical-align: middle;
        }

        i {
          margin: 0 8px 0 6px;
          width: 16px;
          height: 27px;
          background: url(../../assets/img/icon/enter-tit.png) no-repeat;
          background-size: 100% 100%;
        }

        span {
          font-size: 14px;
          color: #333;
          font-weight: bold;
        }
      }

      .tit-mar {
        margin-top: 12px;
      }
    }

    .list-col {
      padding: 0 2px;

      li {
        float: left;
        width: 50%;
        margin-top: 11px;
        text-align: center;
        cursor: pointer;
      }

      .icon {
        display: inline-block;
        width: 49px;
        height: 49px;
        -webkit-transition: all 360ms;
        -ms-transition: all 360ms;
        -moz-transition: all 360ms;
        -o-transition: all 360ms;
        transition: all 360ms;
      }

      p {
        -webkit-transition: all 360ms;
        -ms-transition: all 360ms;
        -moz-transition: all 360ms;
        -o-transition: all 360ms;
        transition: all 360ms;
      }

      .icon0 {
        background: url(../../assets/img/icon/nav-icon1.png) no-repeat center;
        background-size: 100% 100%;
      }

      .icon1 {
        background: url(../../assets/img/icon/nav-icon2.png) no-repeat center;
        background-size: 100% 100%;
      }

      .icon2 {
        background: url(../../assets/img/icon/nav-icon3.png) no-repeat center;
        background-size: 100% 100%;
      }

      .icon3 {
        background: url(../../assets/img/icon/nav-icon4.png) no-repeat center;
        background-size: 100% 100%;
      }

      .icon4 {
        background: url(../../assets/img/icon/nav-icon5.png) no-repeat center;
        background-size: 100% 100%;
      }

      .icon5 {
        background: url(../../assets/img/icon/nav-icon6.png) no-repeat center;
        background-size: 100% 100%;
      }

      li:hover {
        .icon,
        p {
          transform: translate3d(0, -3px, 0);
          -ms-transform: translate3d(0, -3px, 0);
          -moz-transform: translate3d(0, -3px, 0);
          -webkit-transform: translate3d(0, -3px, 0);
          -o-transform: translate3d(0, -3px, 0);
        }

        .icon0 {
          background: url(../../assets/img/icon/nav-iconh1.png) no-repeat center;
          background-size: 100% 100%;
        }

        .icon1 {
          background: url(../../assets/img/icon/nav-iconh2.png) no-repeat center;
          background-size: 100% 100%;
        }

        .icon2 {
          background: url(../../assets/img/icon/nav-iconh3.png) no-repeat center;
          background-size: 100% 100%;
        }

        .icon3 {
          background: url(../../assets/img/icon/nav-iconh4.png) no-repeat center;
          background-size: 100% 100%;
        }

        .icon4 {
          background: url(../../assets/img/icon/nav-iconh5.png) no-repeat center;
          background-size: 100% 100%;
        }

        .icon5 {
          background: url(../../assets/img/icon/nav-iconh6.png) no-repeat center;
          background-size: 100% 100%;
        }

        p {
          font-weight: bold;
          color: #3b92e3;
        }
      }

      em {
        font-family: "reducto_condensed_ssiCn";
        font-size: 26px;
        color: #333;
        font-style: normal;
      }

      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        color: #333;
      }

      .texts {
        margin-left: 4px;
        display: inline-block;
        vertical-align: middle;
        width: 10px;
        height: 12px;
        background: url(../../assets/img/icon/text-up.png) no-repeat;
        background-size: 100% 100%;
      }

      .text {
        background: url(../../assets/img/icon/text-down.png) no-repeat;
        background-size: 100% 100%;
      }

      .one {
        margin-top: 4px;
        transform: translateZ(0);
      }

      .two {
        height: 16px;
        line-height: 16px;
        margin-top: -4px;
      }
    }

    .left-texs {
      transition: all .5s ease-in-out;
      padding: 24px 70px 54px 70px;
      position: fixed;
      top: 60px;
      left: 0;
      bottom: 0;
      right: 0;
      background: url(../../assets/img/icon/xiewen-bg.png) repeat;
      overflow-y: auto;
    }

    .left-texs-no-head {
      transition: all .5s ease-in-out;
      padding: 24px 70px 54px 70px;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: url(../../assets/img/icon/xiewen-bg.png) repeat;
      overflow-y: scroll;
    }

    .let-lists {
      left: 0;
    }

    /* 平台首页V2 版本一 */
    .title-nav {
      box-shadow: 0 0 10px 0 rgba(219, 219, 219, 0.5);

      li {
        background: #f8f8f8;
        text-align: center;
        float: left;
        width: 14.286%;
        font-size: 0;
        height: 56px;
        line-height: 56px;
        border: 1px solid #e7e7e7;
        border-left: none;
        cursor: pointer;
        position: relative;

        i,
        span {
          display: inline-block;
          vertical-align: middle;
        }

        span {
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
      }

      li:first-child {
        border-left: 1px solid #e7e7e7;
      }

      .active {
        background: linear-gradient(
            152deg,
            rgba(3, 154, 255, 1) 0%,
            rgba(64, 210, 255, 1) 100%
        );
        border-bottom: 1px solid linear-gradient(
            152deg,
            rgba(3, 154, 255, 1) 0%,
            rgba(64, 210, 255, 1) 100%
        );

        /* i {
          width: 17px;
          height: 17px;
          background: url(../../assets/img/icon/yuan-tab.png) no-repeat;
        } */

        span {
          margin-left: 7px;
          color: #fff;
          text-shadow: 0px 1px 2px rgba(26, 105, 220, 1);
        }

        .jiao {
          position: absolute;
          bottom: -1px;
          left: 50%;
          margin-left: -6px;
          height: 0;
          width: 0;
          border-left: 8px solid transparent;
          border-bottom: 8px solid #fff;
          border-right: 8px solid transparent;
        }
      }
    }

    /* 平台首页V1 版本一 */
    .title-nav2 {
      box-shadow: none;
    }

    .content {
      box-shadow: 0 0 10px 0 rgba(219, 219, 219, 0.5);
      /*height: 830px !important;*/
      background: #fff;
      padding: 15px 54px 54px 54px !important;
      border: 1px solid rgba(231, 231, 231, 1);
      border-top: none;
    }

    .col-text {
      margin: 0 -14px;

      li {
        float: left;
        width: 25%;
      }

      .text-lists {
        text-align: center;
        margin: 30px 14px 0;
        height: 227px;
        background: rgba(248, 248, 248, 1);
        border-radius: 11px;
        border: 1px solid rgba(227, 227, 227, 1);

        i {
          display: inline-block;
          width: 99px;
          height: 99px;
          background: url(../../assets/img/icon/enter-hui.png) no-repeat;
          background-size: 100% 100%;
          margin-top: 31px;
        }

        p {
          margin-top: 34px;
          line-height: 24px;
          font-size: 18px;
          color: #333;
        }

        span {
          font-size: 0;
        }
      }

      .ctive {
        background: #fff;
        border: 1px solid rgba(215, 215, 215, 1);
        -webkit-transition: all 360ms;
        -ms-transition: all 360ms;
        -moz-transition: all 360ms;
        -o-transition: all 360ms;
        transition: all 360ms;

        i {
          background: url(../../assets/img/icon/enter-acti.png) no-repeat;
          background-size: 100% 100%;
          -webkit-transition: all 360ms;
          -ms-transition: all 360ms;
          -moz-transition: all 360ms;
          -o-transition: all 360ms;
          transition: all 360ms;
        }

        span {
          -webkit-transition: all 360ms;
          -ms-transition: all 360ms;
          -moz-transition: all 360ms;
          -o-transition: all 360ms;
          transition: all 360ms;
        }
      }

      .ctive:hover {
        border-color: #dedddd;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        transform: translate3d(0, -3px, 0);
        -ms-transform: translate3d(0, -3px, 0);
        -moz-transform: translate3d(0, -3px, 0);
        -webkit-transform: translate3d(0, -3px, 0);
        -o-transform: translate3d(0, -3px, 0);

        i {
          display: inline-block;
          width: 59px;
          height: 63px;
          background: url(../../assets/img/icon/source-icon1.png) no-repeat;
          background-size: 100% 100%;
          margin-top: 40px;
        }

        p {
          margin-top: 13px;
          line-height: 24px;
          font-size: 18px;
          color: #333;
        }

        span {
          margin-top: 10px;
          cursor: pointer;
          display: inline-block;
          width: 123px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          background: linear-gradient(
              152deg,
              rgba(3, 154, 255, 1) 0%,
              rgba(64, 210, 255, 1) 100%
          );
          border-radius: 5px;
          font-size: 14px;
          color: #fff;
        }
      }
    }

    .ivu-tabs-nav {
      width: 100%;
      box-shadow: 0 0 10px 0 rgba(219, 219, 219, 0.5);
    }

    .ivu-tabs-nav .ivu-tabs-tab {
      margin-right: 0;
      width: 14.286%;
      text-align: center;
      padding: 0;
      height: 56px;
      line-height: 56px;
      font-size: 18px;
      color: #333;
      font-weight: bold;
      background: #f8f8f8;
      background-size: 100% 100%;
      border: 1px solid #e7e7e7;
      border-left: none;
      transition: color 0s ease-in-out;
    }

    .ivu-tabs-nav .ivu-tabs-tab:nth-child(1) {
      border-left: 1px solid #e7e7e7;
    }

    .ivu-tabs-ink-bar {
      height: 0;
      width: 0;
    }

    .ivu-tabs-nav .ivu-tabs-tab-active {
      z-index: 100;
      background-color: #fff;
      background-image: url(../../assets/img/icon/back-jiao.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }

    .ivu-tabs-nav-container:focus .ivu-tabs-tab-focused {
      border-color: #e7e7e7 !important;
    }

    .ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
      width: 17px;
      height: 17px;
      display: none;
      margin-right: 4px;
    }

    .ivu-tabs-nav .ivu-tabs-tab.ivu-tabs-tab-active .ivu-icon {
      width: 17px;
      height: 17px;
      display: inline-block;
      background: url(../../assets/img/icon/yuan-tab.png) no-repeat;
      background-size: 100% 100%;
    }

    .ivu-icon-logo-apple:before {
      content: "";
    }

    .ivu-tabs-nav .ivu-tabs-tab:hover {
      z-index: 100;
      background-color: #fff;
      background-image: url(../../assets/img/icon/back-jiao.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #fff;

      .ivu-icon {
        width: 17px;
        height: 17px;
        display: inline-block;
        background: url(../../assets/img/icon/yuan-tab.png) no-repeat;
        background-size: 100% 100%;
      }
    }

    .ivu-tabs-tab-focused {
      border: none;
      outline: none;
    }

    .ivu-tabs-bar {
      margin-bottom: 0;
      border-left: 1px solid #e7e7e7;
    }
  }

  .menuIcon1 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon1.png") !important;
    background-size: cover !important;
  }

  .menuIcon2 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon2.png") !important;
    background-size: cover !important;
  }

  .menuIcon3 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon3.png") !important;
    background-size: cover !important;
  }

  .menuIcon4 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon4.png") !important;
    background-size: cover !important;
  }

  .menuIcon5 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon5.png") !important;
    background-size: cover !important;
  }

  .menuIcon6 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon6.png") !important;
    background-size: cover !important;
  }

  .menuIcon7 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon7.png") !important;
    background-size: cover !important;
  }

  .menuIcon8 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon1.png") !important;
    background-size: cover !important;
  }

  .menuIcon9 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon2.png") !important;
    background-size: cover !important;
  }

  .menuIcon10 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon3.png") !important;
    background-size: cover !important;
  }

  .menuIcon11 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon4.png") !important;
    background-size: cover !important;
  }

  .menuIcon12 {
    width: 99px !important;
    height: 99px !important;
    background: url("../../assets/img/indexIcon/icon5.png") !important;
    background-size: cover !important;
  }

  .menuIcon1_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon1_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon2_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon2_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon3_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon3_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon4_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon4_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon5_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon5_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon6_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon6_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon7_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon7_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon8_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon1_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon9_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon2_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon10_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon3_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon11_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon4_hover.png") no-repeat !important;
    background-size: cover !important;
  }

  .menuIcon12_hover {
    width: 59px !important;
    height: 63px !important;
    background: url("../../assets/img/indexIcon/icon5_hover.png") no-repeat !important;
    background-size: cover !important;
  }
</style>
