<style lang="scss">
  .header-wraps {
    height: 60px;
    line-height: 60px;
    background: linear-gradient(315deg, rgba(56, 126, 231, 1) 0%, rgba(1, 151, 235, 1) 100%);
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);

    .head-le {
      font-size: 0;
      float: left;

      i,img,
      span {
        display: inline-block;
        vertical-align: middle;
      }

      .icon {
        width: 33px;
        height: 33px;
        /*background: url(../../../assets/img/icon/head-log-ing@2x.png) no-repeat;*/
        background-size: 100% 100%;
        margin: 0 0 0 18px;
      }

      .iconlogo {
        font-size: 22px;
        color: #ffffff;
        font-weight: bold;
        margin-left: 14px;
      }
    }

    .head-ri {
      float: right;
      font-size: 0;

      i,
      span {
        display: inline-block;
        vertical-align: middle;
      }

      .list1 {
        width: 18px;
        height: 18px;
        background: url(../../../assets/img/icon/navbar_icon_home.png) no-repeat;
        background-size: 100% 100%;
      }

      .list1 {
        width: 18px;
        height: 18px;
        background: url(../../../assets/img/icon/navbar_icon_home.png) no-repeat;
        background-size: 100% 100%;
      }

      .list2 {
        width: 25px;
        height: 17px;
        background: url(../../../assets/img/icon/navbar_icon_quanjing.png) no-repeat;
        background-size: 100% 100%;
      }

      .list3 {
        width: 16px;
        height: 16px;
        background: url(../../../assets/img/icon/ente-funct.png) no-repeat;
        background-size: 100% 100%;
      }

      .list4 {
        cursor: pointer;
        width: 16px;
        height: 16px;
        background: url(../../../assets/img/icon/navbar_icon_quanping.png) no-repeat;
        background-size: 100% 100%;
      }

      .list5 {
        cursor: pointer;
        width: 15px;
        height: 17px;
        background: url(../../../assets/img/icon/change-pwd.png) no-repeat;
        background-size: 100% 100%;
      }

      .list6 {
        cursor: pointer;
        margin: 0 36px 0 22px;
        width: 15px;
        height: 17px;
        background: url(../../../assets/img/icon/navbar_icon_close.png) no-repeat;
        background-size: 100% 100%;
      }

      .list7 {
        cursor: pointer;
        margin: 0 1px 0 1px;
        width: 16px;
        height: 16px;
        background: url(../../../assets/img/icon/user.png) no-repeat;
        background-size: 100% 100%;
      }
      .list8 {
        cursor: pointer;
        margin: 0 1px 0 1px;
        width: 17px;
        height: 17px;
        background: url(../../../assets/img/icon/menu.png) no-repeat;
        background-size: 100% 100%;
      }

      .head-hove {
        margin-right: 17px;
        cursor: pointer;

        span {
          margin: 0 0 0 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 1);
        }
      }

      .head-hove:hover {
        span {
          color: #8bc1ff;
        }
      }
    }

    .ivu-tooltip-inner {
      color: #3e8be2;
    }

    .ivu-tooltip-light.ivu-tooltip-popper {
      margin-top: -10px;
    }
  }
</style>
<template>
  <div class="header-wraps fn-clear">
    <div class="head-le">
      <img  src="" id="portrait"  style="width: 32px;height: 32px;margin: 0 0 0 18px;"><img>
      <!--<i class="icon"></i>-->
      <span class="iconlogo">{{sysName}}</span>
    </div>
    <div class="head-ri">
      <!-- <span class="head-hove">
        <i class="list1"></i>
        <span>平台首页</span>
      </span>
      <span class="head-hove">
        <i class="list2"></i>
        <span>台全景图</span>
      </span>
      <span class="head-hove">
        <i class="list3"></i>
        <span>功能功能</span>
      </span>
      <Tooltip content="全屏" placement="bottom" theme="light">
        <i class="list4" @click="bigImgs"></i>
      </Tooltip> -->
      <!-- <Tooltip content="首页" placement="bottom" theme="light">
        <i class="list8" @click="backIndex"></i>
      </Tooltip> -->
      <span class="head-hove">
				<!-- <i class="list7"></i> -->
				<span style="font-style: italic;font-size:12px">{{userName}}</span>
			</span>
      <Tooltip content="修改密码" placement="bottom" theme="light">
        <i class="list5" @click="changePwd"></i>
      </Tooltip>
      <Tooltip content="退出" placement="bottom" theme="light">
        <i class="list6" @click="loginOut"></i>
      </Tooltip>
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="40%" :close-on-press-escape="false"
                 :show-close="false" :close-on-click-modal="false">
        <el-form label-width="100px" :model="pwdForm" ref="pwdForm" status-icon :rules="rulesForm">
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
          <el-button @click="cancelForm('pwdForm')" size="small">取 消</el-button>
          <el-button type="primary" @click="saveData('pwdForm')" size="small">保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import '@/libs/jsencrypt.min.js'
  import {updateUserPassword,getPublicKey} from '@/api/components/login'
  import {appServer} from '@/api/appServer'
  export default {
    name: 'mainHeader',
    props: {
        sysName: {
          type: String,
          default: '数据资源管理系统'
        },
        userName: {
          type: String,
          default: '欢迎您'
        },
      },
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
        dialogVisible: false,
        pwdForm: {},
        rulesForm: {
          oldPwd: [{required: true, message: '请输入旧密码', trigger: 'blur'}, {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }],
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
      }
    },
    mounted() {
      let img = sessionStorage.getItem('dgms_logo')
      if (img) {
        document.getElementById('portrait').src = img
      } else {
        let url = 'http://' + window.location.host + appServer.system + 'getLogo'
        this.$axios.get(url, {
          responseType: 'arraybuffer'
        }).then(function (response) {
          let imgBase64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
          if (imgBase64 === '') {
            imgBase64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACiklEQVRYha2Xa7GkMBCFrwQk' +
              'RAISkIAEJCABB0hAAhKQgAQkjIRvf9C9OYQEcmc3VVTNJCf9PN1Jfn4qB9AAHTABG7ADH/t2YAVmoKuV+RvFsylCFAIsZtAq6z5mIPxPxR' +
              'vQ23xjc6MZ4Abt9n9RQ75VvorQNoPRiGwpBmjFkB1oapW3wCFhvG20+aJxCdbH5w3rnh8GHgrrnu8PsL7IC6Z8kj3hSbmHvU/mB8u/M79' +
              '3frwY0Lo8+b2XwFNKGtuk7N7dAxNK0aMT0ylG/s8psDFFh+acK5vRkCOV8GDAYBiV6VEOCnTvu4IAH0OyvpTSIHkHmDKGLwo+yBCKs84x' +
              'QQtJRUhIU8Mb7o0pyHo0XHLZF4S8Mf0gQyxiKbsDmgbXOWj4U++8C77VecmBRZQPBecWJ8WeAJz905Nywa/KBVGQbWSG2YDth7O0UgOcQF' +
              'Xtk9hwtmR/eNhz8kBy9bdfUyDlixGeCk/d9IKf3QA/TDxfzon+ScCDVzfSPWE9Bavl3Y/VGykrDRhlf7FBGXYFDieDEsjrd0/Z+yJwIPYLP' +
              'y2nB/wB7DEX14WV61meNcSi5p/flJxHo+wPmb1gZejkaWVhEAVuCGaYr81cx+3SkaR15izPUeZ6DbvzIC5cBenVKzdGiUZv35gx1Eckqnjph' +
              '0/3kLuGWCk1w1OzkEQzFepgKDQQrhdVP74/ZnjLeTh1EolAbYtPvEovmO61K55SwTVDIpy/KSPkID5C9AGylqJToTyQVEoOlJ7jrrT/xmOR6' +
              'zftqptxKx4P3yoVeZ3Iq2vvFgmt3/CFYiVsthnVCNEarnp4msdaKcU7Qa0RgfvteDHBE7HZbMSjPftc++dBfJCkyg7iqforwv4BcAQjn1dM' +
              'w8kAAAAASUVORK5CYII='
          }
          return 'data:image/png;base64,' + imgBase64
        }).then(function (data) {
          document.getElementById('portrait').src = data
          sessionStorage.setItem('dgms_logo', data)
        }).catch(function (err) {
          console.log('获取logo：' + err)
        })
      }
    },
    created() {
    },
    methods: {
      getPublicKeyMethde() {
        return new Promise((resolve, reject) => {
          getPublicKey().then(res => {
            resolve(res.data)
          }).catch(error => {
            reject(error)
          })
        })
      },
      bigImgs() {
        this.$emit('childBtnlue')
      },
      backIndex() {
       window.location.href="http://10.18.101.81:9901/ump/#/homePage";  
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
     async saveData(formName) {
        const key = await this.getPublicKeyMethde()
        this.$refs[formName].validate(valid => {
          if (valid) {
            const jse = new JSEncrypt()
            jse.setPublicKey(key)
            var params = {
              userId: sessionStorage.getItem('userId'),
              oldPwd: jse.encrypt(this.pwdForm.oldPwd),
              newPwd: jse.encrypt(this.pwdForm.newPwd)
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
    }
  }
</script>
