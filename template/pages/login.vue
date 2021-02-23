<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-input-suffix">
          <h3 class="loginsign-title">注册新账号</h3>
          <el-input
            placeholder="昵称"
            v-model="register.nickname"
            class="mymargin"
          >
          </el-input>
          <el-input
            placeholder="手机 号"
            v-model="register.mobile"
            class="mymargin"
          >
          </el-input>
          <el-input
            placeholder="密码：请输入6-20个字母、数字、下划线 "
            v-model="register.password"
            type="password"
            class="mymargin"
          >
          </el-input>

          <el-input
            placeholder="确认密码"
            type="password"
            v-model="repassword"
            class="mymargin"
          >
          </el-input>

          <el-input
            placeholder="短信验证码"
            v-model="code"
            class="mymargin"
          >
            <el-button
              slot="append"
              class="mymargin"
              @click="sendsms()"
            >获取短信验证码</el-button>
          </el-input>
          <el-checkbox
            v-model="checked"
            class="mymargin"
          > 同意协议并接受《服务条款》</el-checkbox>
          <el-button
            type="primary"
            style="float:right;"
            class="mymargin"
            @click.prevent="regist()"
          >注册</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="demo-input-suffix">
          <h3 class="loginsign-title">用户登录</h3>

          <el-input
            placeholder="手机 号"
            v-model="user.mobile"
            class="mymargin"
          >
          </el-input>
          <el-input
            placeholder="密码"
            v-model="user.password"
            type="password"
            class="mymargin"
            @keyup.enter.native="login"
          >
          </el-input>
          <el-button
            type="primary"
            style="float:right;"
            @click.prevent="login()"
          >登陆</el-button>
        </div>

      </el-col>
    </el-row>

  </div>
</template>
<script>
import userApi from "~/api/user.js";
import axios from "axios";
import Vue from "vue";
import Auth from "@/utils/auth";
export default {
  data() {
    return {
      checked: false,
      register: {},
      user: {},
      code: "",
      repassword: ""
    };
  },
  methods: {
    regist() {
      if (
        this.register.nickname == undefined ||
        this.register.nickname.trim().length < 1
      ) {
        this.$message({
          message: "请输入昵称",
          type: "error"
        });
        return;
      }
      const mobileRule = /(?:^1[3456789]|^9[28])\d{9}$/;
      if (!mobileRule.test(this.register.mobile)) {
        this.$message({
          message: "请输入正确手机号",
          type: "error"
        });
        return;
      }
      if (this.code == "") {
        this.$message({
          message: "请输入验证码",
          type: "error"
        });
        return;
      }

      if (this.register.password != this.repassword) {
        this.$message({
          message: "两次密码输入不一致",
          type: "error"
        });
        return;
      }
      var patrn = /^(\w){6,20}$/;
      if (!patrn.exec(this.register.password)) {
        this.$message({
          message: "请输入6-20个字母、数字、下划线密码",
          type: "error"
        });
        return;
      }
      userApi.register(this.register, this.code).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "注册成功",
            type: "success"
          });
          this.pojo = {};
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
        this.register = {};
      });
    },
    sendsms() {
      const mobileRule = /(?:^1[3456789]|^9[28])\d{9}$/;
      if (!mobileRule.test(this.register.mobile)) {
        this.$message({
          message: "请输入正确手机号",
          type: "error"
        });
        return;
      }

      userApi.sendsms(this.register.mobile).then(res => {
        if (res.data.flag) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.pojo = {};
        } else {
          this.$message({
            message: "发送短信验证码失败",
            type: "error"
          });
        }
      });
    },
    login() {
      const mobileRule = /(?:^1[3456789]|^9[28])\d{9}$/;
      if (!mobileRule.test(this.user.mobile)) {
        this.$message({
          message: "请输入正确手机号",
          type: "error"
        });
        return;
      }
      var patr = /^(\w){6,20}$/;
      if (!patr.exec(this.user.password)) {
        this.$message({
          message: "请输入6-20个字母、数字、下划线密码",
          type: "error"
        });
        return;
      }
      userApi.login(this.user).then(res => {
        if (res.data.flag) {
          Auth.setUser(
            res.data.data.token,
            res.data.data.nickname,
            res.data.data.avatar
          );
          location.href = "/";
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
          // this.mobile=''
          this.password = "";
        }
        //   this.user={}
      });
    }
  }
};
</script>

<style>
.loginsign-title {
  margin-bottom: 20px;
  font-weight: normal;
  font-size: 20px;
  color: #676666;
}

.mymargin {
  margin: 10px 10px 10px 10px;
}
</style>
