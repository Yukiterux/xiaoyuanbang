<template>
  <div>

    <el-form
    ref="form"
      label-width="180px"
      :rules="rules"
    >
      <el-form-item label="欲绑定手机号"  prop="mobile">
        <el-input
         
          v-model="user.mobile"
        ></el-input>
      </el-form-item>

      <el-form-item label="请输入短信验证码">
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
      </el-form-item>
      <el-form-item label="点击进行下一步">
        <el-button
          type="primary"
          style="float:left;"
          @click.prevent="next()"
        >下一步</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>


<script>
import userApi from "~/api/user.js";
export default {
  created() {
    userApi.info().then(res => {
      this.user = res.data.data;
    });
  },
  data() {
    var moblieValidate = (rule, value, callback) => {
      userApi.checkMobile(this.user.mobile).then(res => {
        console.log(res.data.data);
        if (res.data.data=='1') {
          callback(new Error("此手机号已被绑定"));
        } else {
          callback();
        }
      });
    };
    return {
      user: {},
      code: "",
      rules: {
        mobile: [{ required: true, validator: moblieValidate, trigger: "blur" }]
      }
    };
  },
  methods: {
    sendsms() {
      userApi.sendChange2Sms(this.user.mobile).then(res => {
        if (res.data.flag) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
        } else {
          this.$message({
            message: "发送短信验证码失败",
            type: "error"
          });
        }
      });
    },
    next() {
      userApi.changeNum2(this.user, this.code).then(res => {
        if (res.data.flag) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          location.href = "/user/info/";
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style>
</style>



