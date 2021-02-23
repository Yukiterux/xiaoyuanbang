<style lang="scss" >
  .login3-con{
  background:linear-gradient(266deg,rgba(92,138,255,1),rgba(0,72,203,1));
  background-size: cover;
  width: 100%;
  height: 100%;
  background-size:cover;
  -webkit-background-size:cover;
  .con-text{
    z-index: 10;
    position: fixed;
    left: 50%;
    top: 12%;
    margin: auto;
    margin-left: -260px;
    min-width: 520px;
    h2{
      font-size: 40px;
      color: #fff;
      font-weight: bold;
    }
    .titles{
      font-size: 0;
      text-align: center;
      i,span{
        display: inline-block;
        vertical-align: middle;
      }
      i{
        width: 16px;
        height: 11px;
      }
      .le-icon{
        background: url(../../assets/img/icon/le-icon.png) no-repeat;
      }
      .ri-icon{
        background: url(../../assets/img/icon/ri-icon.png) no-repeat;
      }
      span{
        font-size: 24px;
        color: #fff;
        margin: 0 12px;
      }
    }
  }
  .code{
        right: 10px;
        position: absolute;
        line-height:34px;
        height:34px;
        width: 100px;
        border: none;
        top: 5px;
        background: #cbeac6;
        .s-canvas {
            height:34px;
            line-height:34px;
            text-align: center;
            canvas {
                vertical-align: middle;
            }
        }
    }
    .form-text{
    background:rgba(0,0,0,.24);
    border-radius:5px;
      width: 290px;
      margin: 0 auto;
      margin-top: 48px;
      padding: 20px 0 26px 0;
      z-index: 2;
    }
    .ivu-form{
      z-index: 9999;
      width: 260px;
    margin: 0 auto;
    text-align: left;
    i{
      display: inline-block;
      vertical-align: middle;
    }
    .ivu-input-icon-validate{
      width: 20px;
      height: 23px;
    }
    .ivu-input{
      height: 40px;
      line-height: 40px;
      padding: 0;
      outline: none;
      font-size: 14px;
      color: #666;
      background: #fff;
      text-indent: 40px;
    }
    .ivu-input:focus{
      box-shadow:none;
    }
    .ivu-btn{
      padding: 0;
      width: 100%;
      height:40px;
      line-height: 40px;
      background:rgba(0,44,145,0.8);
      border-radius:20px;
      font-size: 16px;
      color: #fff;
    }
    .ivu-btn-primary:focus{
      box-shadow: none;
    }
    .ivu-btn-primary.active, .ivu-btn-primary:active{
      border: none;
    }
    .ivu-btn-primary{
      border: none;
    }
    .ivu-load-loop {
        animation: none;
    }
    .ivu-input-icon{
      right: unset;
        left: 10px;
        top: 8px;
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
    .ivu-checkbox {
        margin-top: -3px;
        margin-right: 10px;
    }
    .ivu-form-item-error-tip{
      right: 17px;
      left: unset;
    }
    .ivu-form-item:nth-child(2){
      .ivu-icon{
        background: url(../../assets/img/icon/usernameb.png) no-repeat center;
      }
    }
    .ivu-form-item:nth-child(3){
      .ivu-icon{
        background: url(../../assets/img/icon/passwordb.png) no-repeat center;
      }
    }
    .ivu-form-item:nth-child(4){
      margin-bottom: 6px;
      .ivu-icon{
        background: url(../../assets/img/icon/pass-twob.png) no-repeat center;
      }
    }
    .ivu-form-item:nth-child(5){
      margin-bottom: 0;
    }
    .ivu-checkbox-wrapper{
      span:nth-child(2){
        font-size: 14px;
        color: #fff;
      }
    }
    .ivu-select-single .ivu-select-selection{
      height: 40px;
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      height: 38px;
      line-height: 38px;
      font-size: 14px;
    }
    }
    .ivu-form-item-content{
    height: 40px;
    line-height: 40px;
  }
  .ivu-form-item:last-child{
    border:none;
    margin-bottom: 0;
  }
  .footers{
    position: fixed;
    bottom: 10%;
    height: 40px;
    .ter-le{
      height: 40px;
      float: left;
      border-right:1px solid rgba(213,228,255,1);
      i{
        margin: 0 20px;
        margin-left: 60px;
        display: inline-block;
        width: 38px;
        height: 40px;
        background: url(../../assets/img/icon/login-bottomt.png) no-repeat;
      }
    }
    .ter-ri{
      float: left;
      margin-left: 12px;
      p{
        font-size:14px;
        height: 14px;
        color:rgba(213,228,255,1);
      }
      .pass1{
        margin-top: -3px;
      }
      .pass2{
        margin-top: 11px;
      }
    }
  }
  canvas {
      display: inline-block;
  }
}
</style>
<template>
  <div class="login3-con">
    <canvas id="Mycanvas"></canvas>
    <div class="con-text">
      <div class="titles">
        <i class="le-icon"></i>
        <span>甘肃省</span>
        <i class="ri-icon"></i>
      </div>
      <h2>数据资源管理系统</h2>
      <div class="form-text">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
          <FormItem prop="city">
            <Select v-model="formCustom.city" placeholder="请选择">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem prop="passwd">
            <Input type="text" v-model="formCustom.passwd" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem prop="age">
            <Input type="text" v-model="formCustom.age" number placeholder="请输入验证码"></Input>
            <div class="code" @click="refreshCode">
              <Sidentify :identifyCode="identifyCode"></Sidentify>
            </div>
          </FormItem>
          <FormItem prop="interest">
            <CheckboxGroup v-model="formCustom.interest">
              <Checkbox label="记住密码"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
          </FormItem>
        </Form>
      </div>
      <div class="footers fn-clear">
        <div class="ter-le">
          <i></i>
        </div>
        <div class="ter-ri">
          <p class="pass1">技术支持：甘肃万维信息技术有限责任公司</p>
          <p class="pass2">版权所有（C）甘肃政务服务信息资源目录管理系统</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidentify from './../pages/children/identify'
import $ from 'jquery'
export default {
  name: 'maincon',
  components: { Sidentify },
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
        interest: [],
        city: ''
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
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
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
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    listBack() {
      // 定义画布宽高和生成点的个数
      var WIDTH = $(window).width() - 4,
        HEIGHT = $(window).height() - 4,
        POINT = 20;

      var canvas = document.getElementById('Mycanvas');
      canvas.width = WIDTH,
        canvas.height = HEIGHT;
      var context = canvas.getContext('2d');
      context.strokeStyle = 'rgba(255,255,255,0.1)',
        context.strokeWidth = 1,
        context.fillStyle = 'rgba(255,255,255,0.3)';
      var circleArr = [];

      // 线条：开始xy坐标，结束xy坐标，线条透明度
      function Line(x, y, _x, _y, o) {
        this.beginX = x,
          this.beginY = y,
          this.closeX = _x,
          this.closeY = _y,
          this.o = o;
      }
      // 点：圆心xy坐标，半径，每帧移动xy的距离
      function Circle(x, y, r, moveX, moveY) {
        this.x = x,
          this.y = y,
          this.r = r,
          this.moveX = moveX,
          this.moveY = moveY;
      }
      // 生成max和min之间的随机数
      function num(max, _min) {
        var min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      // 绘制原点
      function drawCricle(cxt, x, y, r, moveX, moveY) {
        var circle = new Circle(x, y, r, moveX, moveY)
        cxt.beginPath()
        cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
        cxt.closePath()
        cxt.fill();
        return circle;
      }
      // 绘制线条
      function drawLine(cxt, x, y, _x, _y, o) {
        var line = new Line(x, y, _x, _y, o)
        cxt.beginPath()
        cxt.strokeStyle = 'rgba(255,255,255,' + o + ')'
        cxt.moveTo(line.beginX, line.beginY)
        cxt.lineTo(line.closeX, line.closeY)
        cxt.closePath()
        cxt.stroke();
      }
      // 初始化生成原点
      function init() {
        circleArr = [];
        for (var i = 0; i < POINT; i++) {
          circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(60, 2), num(10, -10) / 20, num(10, -10) / 20));
        }
        draw();
      }

      // 每帧绘制
      function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < POINT; i++) {
          drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
        }
        for (var i = 0; i < POINT; i++) {
          for (var j = 0; j < POINT; j++) {
            if (i + j < POINT) {
              var A = Math.abs(circleArr[i + j].x - circleArr[i].x),
                B = Math.abs(circleArr[i + j].y - circleArr[i].y);
              var lineLength = Math.sqrt(A * A + B * B);
              var C = 1 / lineLength * 11 - 0.009;
              var lineOpacity = C > 0.03 ? 0.03 : C;
              if (lineOpacity > 0) {
                drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity);
              }
            }
          }
        }
      }

      // 调用执行
      window.onload = function() {
        init();
        setInterval(function() {
          for (var i = 0; i < POINT; i++) {
            var cir = circleArr[i];
            cir.x += cir.moveX;
            cir.y += cir.moveY;
            if (cir.x > WIDTH) cir.x = 0;
            else if (cir.x < 0) cir.x = WIDTH;
            if (cir.y > HEIGHT) cir.y = 0;
            else if (cir.y < 0) cir.y = HEIGHT;
          }
          draw();
        }, 16);
      }
    }
  },
  mounted() {
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
    this.listBack();
  }
}
</script>
