<template>
  <div class="content-con">
    <p id="version">{{version}}</p>
    <canvas id="Mycanvas"></canvas>
    <div class="con-text">
      <h2>{{sysName}}</h2>
      <Form :model="loginForm" :label-width="0" :rules="rules" ref="loginForm">
        <Form-item label="" prop="name">
          <i class="icon-user"></i>
          <Input v-model="loginForm.name" placeholder="用户名" class="txt-ipt" @keyup.enter.native="login"> </Input>
        </Form-item>
        <Form-item label="" prop="pwd">
          <i class="icon-pass"></i>
          <Input type="password" v-model="loginForm.pwd" placeholder="密码" class="txt-ipt" @keyup.enter.native="login">
          </Input>
        </Form-item>
        <Form-item label="" prop="yzm">
          <i class="icon-two"></i>
          <Input v-model="loginForm.yzm" placeholder="验证码" class="yzm-ipt" style="width:130px"
                 @keyup.enter.native="login"> </Input>
          <div class="code" @click="refreshCode">
            <canvas id="canvas"
                    style="width:100px;height: 35px;display: inline-block;vertical-align: middle;cursor: pointer;"></canvas>
          </div>
        </Form-item>
        <Form-item label="" prop="login-bt">
          <Button type="info" @click="login" class="login-btn" long>登录</Button>
        </Form-item>
      </Form>
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="40%" :modal-append-to-body="false"
                 :close-on-click-modal="false">
        <el-form label-width="100px" :model="pwdForm" ref="pwdForm" :rules="rulesForm">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input v-model="pwdForm.oldPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pwdForm.newPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="rePwd">
            <el-input v-model="pwdForm.rePwd" type="password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button type="primary" @click="saveData" size="small">保 存</el-button>
        </span>
      </el-dialog>
      <div class="tetx-img">

      </div>
      <div class="footers fn-clear">
        <!--<div class="ter-le">-->
          <!--<i></i>-->
        <!--</div>-->
        <div class="ter-ri">
          <p class="pass1">{{copyrightInfo}}</p>
          <!-- <p class="pass2">版权所有（C）甘肃政务服务信息资源目录管理系统</p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import env from '../../../config/env'
  import '@/libs/jsencrypt.min.js'
  import {
    getUrlValue,
    getUserInfoLogin
  } from '@/libs/accountOption'
  import {
    defaultKaptcha,
    userLogin,
    getSystemSettings,
    umpLogin,
    getPublicKey,
    updateUserPassword
  } from '@/api/components/login'
  import {loginMode} from '@/api/appServer'
  export default {
    name: 'maincon',
    data() {
      var checkUserName = (rule, value, callback) => {
        if ((!value) || value === '') {
          return callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if ((!value) || value === '') {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      var checkValidcode = (rule, value, callback) => {
        if ((!value) || value === '') {
          callback(new Error('验证码不能为空'))
        } else {
          callback()
        }
      }
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
          callback(new Error('密码必须包含数字、大小写字母、特殊字符'))
        } else {
          callback()
        }
      }
      return {
          rulesForm: {
          oldPwd: [{required: true, message: '请输入旧密码', trigger: 'blur'}, {
            min: 8,
            max: 18,
            message: '长度在 8 到 18 个字符',
            trigger: 'blur'
          }],
          newPwd: [{required: true, message: '请输入新密码', trigger: 'blur'}, {
            min: 8,
            max: 18,
            message: '长度在 8 到 18 个字符',
            trigger: 'blur'
          }, {validator: strongPass, trigger: 'blur'}],
          rePwd: [{required: true, message: '请确认新密码', trigger: 'blur'}, {
            min: 8,
            max: 20,
            message: '长度在 8 到 18 个字符',
            trigger: 'blur'
          }, {validator: validatePass2, trigger: 'blur'}]
        },
        dialogVisible:false,
        pwdForm:{
          oldPwd:'',
          newPwd:'',
          rePwd:''
        },
        nxPage: this.GLOBAL.nxPage,
        rules: {
          pwd: [{validator: validatePass, trigger: 'blur'}],
          name: [{validator: checkUserName, trigger: 'blur'}],
          yzm: [{validator: checkValidcode, trigger: 'blur'}]
        },
        loginForm: {
          name: '',
          pwd: '',
          yzm: ''
        },
        loading2: false,
        identifyCodes: '1234567890',
        identifyCode: '',
        loginFlag: true,    // 控制登陆方式 true为非oauth登录 false为oauth登录
        sysName: '数据资源管理系统',
        version: '',
        copyrightInfo:'',
      }
    },
    methods: {
      async saveData() {
        this.$refs['pwdForm'].validate(valid => {
          if (valid) {
            let params = {
              userId: sessionStorage.getItem('userId'),
              oldPwd: this.pwdForm.oldPwd,
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
      },
      getVersion() {
        this.version = env.version
      },
      getSystemSettings() {
        new Promise((resolve, reject) => {
          getSystemSettings().then(res => {
            if (res.data.resultCode === '0000') {
              const sysSettings = {}
              res.data.resultData.forEach(item => {
                if(item.parameterNameCn==='版权信息'){
                  this.copyrightInfo=item.parameterValue
                }
                this.$set(sysSettings, item.parameterNameEn, item.parameterValue)
              })
              window.sessionStorage.setItem('sysSettings', JSON.stringify(sysSettings))

              try {
                this.sysName = JSON.parse(sessionStorage.getItem('sysSettings')).sysName
              } catch (e) {
                this.sysName = '数据资源管理系统'
              }
            }
          })
        })
      },
      // 验证码更新
      refreshCode() {
        this.identifyCode = ''
        new Promise((resolve, reject) => {
          defaultKaptcha().then(res => {
            this.identifyCode = res.data
            this.drawPic()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      umpLogin() {
        new Promise((resolve, reject) => {
          umpLogin().then(res => {
            window.location.href = res.data.resultData
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      getPublicKeyMethde() {
        return new Promise((resolve, reject) => {
          getPublicKey().then(res => {
            resolve(res.data)
          }).catch(error => {
            reject(error)
          })
        })
      },
      async login() {
        const key = await this.getPublicKeyMethde()
        this.$refs['loginForm'].validate(valid => {
          if (valid) {
            this.loading2 = true
            const jse = new JSEncrypt()
            jse.setPublicKey(key)
          // 非oauth认证
            new Promise((resolve, reject) => {
              userLogin({
                u: jse.encrypt(this.loginForm.name),
                p: jse.encrypt(this.loginForm.pwd),
                code: this.loginForm.yzm.toLowerCase()
              }).then(res => {
                this.loading2 = false
                if (res.data.msgCode === '0' || res.data.msgCode === '-2') {
                  this.$store.commit('setUser', res.data)
                  if (this.loginForm.pwd === '12345678') {
                    sessionStorage.setItem('pwd', 'single')
                  } else {
                    if (sessionStorage.getItem('pwd')) {
                      sessionStorage.removeItem('pwd')
                    }
                  }
                   if(res.data.msgCode === '-2'){
                    this.dialogVisible = true;
                    this.$message({
                    message: '检查到你的密码强度不够，请务必重新设置',
                    type: 'warning'
                    })
                  }else{
                    this.$router.push(this.nxPage ? '/dataMark' : '/first')
                  }
                }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  })
                  this.refreshCode()
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }
        })
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      randomColor(min, max) {
        const r = this.randomNum(min, max)
        const g = this.randomNum(min, max)
        const b = this.randomNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      },
      drawPic() {
        const canvas = document.getElementById('canvas')
        const width = canvas.width
        const height = canvas.height
        const ctx = canvas.getContext('2d')
        ctx.textBaseline = 'bottom'

        /** 绘制背景色**/
        ctx.fillStyle = '#fff' // 颜色若太深可能导致看不清
        ctx.fillRect(0, 0, width, height)

        /** 绘制文字**/
          // var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
          // for (var i = 0; i < 4; i++) {}
        const txt = this.identifyCode
        ctx.fillStyle = '#666' // 随机生成字体颜色
        ctx.font = 'italic bold 80px sans-serif' // 随机生成字体大小
        // var x = 10 + i * 25;
        // var y = this.randomNum(25, 45);
        // var deg = this.randomNum(-45, 45);
        // //修改坐标原点和旋转角度
        // ctx.translate(x, y);
        // ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(txt, 60, 130)
        // 恢复坐标原点和旋转角度
        // ctx.rotate(-deg * Math.PI / 180);
        // ctx.translate(-x, -y);
        /** 绘制干扰线**/
        for (let i = 0; i < 8; i++) {
          ctx.strokeStyle = this.randomColor(40, 180)
          ctx.beginPath()
          ctx.moveTo(this.randomNum(6, width), this.randomNum(6, height))
          ctx.lineTo(this.randomNum(6, width), this.randomNum(6, height))
          ctx.stroke()
        }
        /** 绘制干扰点**/
        for (let i = 0; i < 100; i++) {
          ctx.fillStyle = this.randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(this.randomNum(10, width), this.randomNum(0, height), 2, 0, 2 * Math.PI)
          ctx.fill()
        }
      },
      async getLoginInfo() {
        const userName2 = await getUrlValue('userName')
        if (userName2) {
          const sessionInfo = await getUserInfoLogin(userName2)
          this.$store.commit('setUser', sessionInfo)
          if (sessionInfo) {
            this.$router.push(this.nxPage ? '/dataMark' : '/first')
          } else {
            this.$router.replace('/login')
          }
        }
      }
    },
    mounted() {
      if (loginMode === 'dgms') {
        this.getVersion()
        this.refreshCode()
        this.getLoginInfo()
        this.getSystemSettings()
      } else if (loginMode === 'ump') {
        this.umpLogin()
      }
      let query = this.$route.query
      if (query.fail) {
        this.$Messsage.error("单点登录失败,将跳转的登录页面！")
      }
    },
    create() {
      sessionStorage.clear()
    }
  }
</script>

<style lang="scss" scoped>
  .content-con {
    position: relative;
    background: url(../../assets/img/icon/login-bgone.png) no-repeat center fixed;
    background-size: cover;
    width: 100%;
    height: 100%;
    background-size: cover;
    -webkit-background-size: cover;

    .con-text {
      text-align: center;
      z-index: 999;
      position: fixed;
      left: 50%;
      top: 12%;
      margin: auto auto auto -382px;
      width: 764px;

      h2 {
        font-size: 38px;
        color: #fff;
        font-weight: bold;
        text-shadow: 0 4px 0 #374EB5;
      }
    }

    .code {
      right: 5px;
      position: absolute;
      line-height: 34px;
      width: 100px;
      border: 1px solid #1164b7;
      top: 1px;
      background: #cbeac6;

      .s-canvas {
        height: 32px;
        line-height: 32px;
        text-align: center;

        canvas {
          vertical-align: middle;
        }
      }
    }

    .ivu-form {
      width: 280px;
      margin: 0 auto;
      text-align: left;

      i {
        display: inline-block;
        vertical-align: middle;
      }

      i {
        width: 21px;
        height: 24px;
      }

      .icon-user {
        background: url(../../assets/img/icon/usernamea.png) no-repeat center;
      }

      .icon-pass {
        background: url(../../assets/img/icon/passworda.png) no-repeat center;
      }

      .icon-two {
        background: url(../../assets/img/icon/two-pass.png) no-repeat center;
      }

      /deep/ .ivu-input-wrapper {
        width: 243px;
        margin-left: 8px;
      }

      /deep/ .ivu-input {
        width: 243px !important;
        height: 36px;
        line-height: 36px;
        padding: 0;
        margin-left: 8px;
        border: none;
        outline: none;
        font-size: 14px;
        color: #fff;
        background: transparent;
      }
      /deep/ .ivu-form-item-error .ivu-input:hover, .ivu-form-item-error .ivu-input {
        border: none;
      }
      /deep/ .ivu-form-item {
        margin-bottom: 0;
        border-bottom: 1px solid #fff;
      }

      /deep/ .ivu-btn-info {
        margin-top: 20px;
        height: 40px;
        line-height: 40px;
        background: rgba(0, 44, 145, 1);
        opacity: 0.6;
        border-radius: 20px;
        font-size: 18px;
        color: #fff;
        border: none;
      }

      /deep/ .ivu-btn {
        padding: 0;
      }

      /deep/ .ivu-icon-ios-loading:before {
        content: "";
      }
    }

    /deep/ .ivu-form-item-content {
      height: 40px;
      line-height: 36px;
      margin-top: 18px;
    }

    /deep/ .ivu-form-item:last-child {
      border-bottom: none;
    }

    /deep/ .ivu-input:hover {
      border: none;
    }

    /deep/ .ivu-input:focus {
      box-shadow: none;
    }

    .tetx-img {
      width: 764px;
      height: 500px;
      margin-top: -8px;
      background: url(../../assets/img/icon/text-imgst.png) no-repeat;
    }

    .footers {
      position: fixed;
      bottom: 10%;
      left: 50%;
      margin-left: -224px;
      height: 40px;

      .ter-le {
        height: 40px;
        float: left;
        border-right: 1px solid rgba(213, 228, 255, 1);

        i {
          margin: 0 20px 0 46px;
          display: inline-block;
          width: 38px;
          height: 40px;
          background: url(../../assets/img/icon/login-bottomt.png) no-repeat;
        }
      }

      .ter-ri {
        float: left;
        margin-left: 12px;

        p {
          font-size: 14px;
          height: 14px;
          color: rgba(213, 228, 255, 1);
        }

        // .pass1 {
        //   margin-top: -3px;
        // }
        .pass1 {
          margin-top: 5px;
        }
        .pass2 {
          margin-top: 11px;
        }
      }
    }

    canvas {
      display: inline-block;
    }
  }
</style>
