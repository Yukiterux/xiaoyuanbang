<style lang="scss" >
.login2-con{
	background: url(../../assets/img/icon/login-bgteo.png) no-repeat center fixed;
	background-size: cover;
	width: 100%;
    height: 100%;
    background-size:cover;
    -webkit-background-size:cover;
	.con-text{
		z-index: 999;
		position: fixed;
		left: 10%;
		margin: auto;
		margin-top: 12%;
		min-width: 370px;
		h2{
			font-size: 26px;
			color: #333;
			font-weight: bold;
		}
	}
	.code{
        right: 19px;
        position: absolute;
        line-height: 36px;
        height: 36px;
        width: 100px;
        border: none;
        top: 1px;
        background: #cbeac6;
        .s-canvas {
            height: 36px;
            line-height: 36px;
            text-align: center;
            canvas {
                vertical-align: middle;
            }
        }
    }
    .ivu-form{
    	width: 370px;
		margin: 0 auto;
		margin-top: 36px;
		text-align: left;
		i{
			display: inline-block;
			vertical-align: middle;
		}
		i{
			width: 20px;
			height: 23px;
		}
		.ivu-input-wrapper{
			width: 280px;
		}
		.ivu-input{
			height: 36px;
			line-height: 36px;
			padding: 0;
			outline: none;
			font-size: 14px;
			color: #fff;
			background: transparent;
			text-indent: 40px;
		}
		.ivu-btn-info{
			margin-top: 20px;
			height:37px;
			line-height: 37px;
			background:rgba(45,140,240,1);
			border-radius:19px;
			font-size: 18px;
			color: #fff;
			border:none;
		}
		.ivu-input:focus{
			box-shadow:none;
		}
		.ivu-btn{
			padding: 0;
			width: 280px;
			height:37px;
			line-height: 37px;
			background:rgba(45,140,240,1);
			border-radius:19px;
			font-size: 16px;
			color: #fff;
		}
		.ivu-load-loop {
		    animation: none;
		}
		.ivu-input-icon{
			right: unset;
    		left: 10px;
    		top: 6px;
		}
		.ivu-form-item{
			margin-bottom: 18px;
		}
		.ivu-icon-ios-loading:before {
		    content: "";
		}
		.ivu-form-item-label{
			display: inline-block;
			padding: 0;
			padding-top: 10px;
			font-size: 16px;
			color: #333;
			font-weight: bold;
			text-align: right;
		}
		.ivu-form-item-error-tip{
			right: 17px;
			left: unset;
		}
		.ivu-form-item:nth-child(1){
			.ivu-icon{
				background: url(../../assets/img/icon/usernameb.png) no-repeat center;
			}
		}
		.ivu-form-item:nth-child(2){
			.ivu-icon{
				background: url(../../assets/img/icon/passwordb.png) no-repeat center;
			}
		}
		.ivu-form-item:nth-child(3){
			margin-bottom: 6px;
			.ivu-icon{
				background: url(../../assets/img/icon/pass-twob.png) no-repeat center;
			}
			.ivu-form-item-error-tip{
				right: 138px;
				left: unset;
			}
			.ivu-input-wrapper{
				width: 160px;
			}
		}
		.ivu-form-item:nth-child(4){
			margin-bottom: 0;
		}
		.ivu-checkbox-wrapper{
			span:nth-child(2){
				font-size: 14px;
				color: #333;
			}
		}
    }
    .ivu-form-item-content{
		height: 40px;
		line-height: 36px;
	}
	.ivu-form-item:last-child{
		border:none;
	}
}
</style>
<template>
<div class="login2-con">
	<div class="con-text">
		<h2>数据资源管理系统</h2>
	        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="70">
	        <FormItem label="用户名：" prop="passwd">
	            <Input type="text" v-model="formCustom.passwd" placeholder="请输入用户名"></Input>
	        </FormItem>
	        <FormItem label="密  码：" prop="passwdCheck">
	            <Input type="password" v-model="formCustom.passwdCheck" placeholder="请输入密码"></Input>
	        </FormItem>
	        <FormItem label="验证码：" prop="age">
	            <Input type="text" v-model="formCustom.age" number placeholder="请输入验证码"></Input>
	            <div class="code" @click="refreshCode">
                    <Sidentify :identifyCode="identifyCode"></Sidentify>
                </div>
	        </FormItem>
	        <FormItem label="" prop="interest">
	            <CheckboxGroup v-model="formCustom.interest">
	                <Checkbox label="记住密码"></Checkbox>
	            </CheckboxGroup>
	        </FormItem>
	        <FormItem>
	            <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
	        </FormItem>
	    </Form>
	</div>
</div>
</template>
<script>
import Sidentify from './../pages/children/identify'
export default{
  name: 'maincon',
  components: {Sidentify},
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不正确，请重新输入'));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
    };
    return {
      yzm: '',
      loginForm: {
        loginAccount: '',
        password: ''
      },
      loading2: false,
      identifyCodes: '1234567890',
      identifyCode: '',
      formCustom: {
        passwd: '',
        passwdCheck: '',
        age: '',
        interest: []
      },
      ruleCustom: {
        passwd: [
                    { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
        ],
        age: [
                    { validator: validateAge, trigger: 'blur' }
        ],
        interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
		// 验证码更新
    refreshCode() {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
      }
    },
    login: function() {

    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    }
  },
  mounted() {
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
  }
}
</script>
