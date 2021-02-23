<template>
  <div>
    <el-form
      ref="form"
      :rules="rules"
      label-width="80px"
      style="margin-left:20%"
    >
      <el-form-item label="手机号">
        {{user.mobile}}
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <nuxt-link
          size="small"
          tag="el-button"
          :to="'/user/info/changeNum/'"
        >修改绑定手机号</nuxt-link>
      </el-form-item>

      <el-form-item
        label="昵称"
        prop="name"
      >
        <el-input v-model="user.nickname"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="user.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="user.birthday"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar
          shape="square"
          :size="100"
          :src="user.avatar"
        ></el-avatar>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <nuxt-link
          size="small"
          tag="el-button"
          :to="'/user/info/changeAvatar/'"
        >修改头像</nuxt-link>
      </el-form-item>
      <el-form-item label="是否已成为配送员">
        {{formatType(user.is_errands)}}
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <nuxt-link
          v-if="user.is_errands=='0'"
          size="small"
          tag="el-button"
          :to="'/user/info/apply'"
        >申请成为配送员</nuxt-link>
      </el-form-item>
      <el-form-item label="账户余额">{{user.account_balance}} <el-button
          type="primary"
          @click="transfer()"
        >提现</el-button>
      </el-form-item>
      <el-form-item label="信誉分">{{user.grade}}</el-form-item>
      <el-form-item label="qq号">
        <el-input v-model="user.qq"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
<el-form-item label="修改密码">
        <el-switch
          v-model="changePwd"
          active-value="Y"
          inactive-value="N"
        ></el-switch>
      </el-form-item>
      <el-form-item label="新密码" v-if="changePwd=='Y'">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="updateInfo()"
        >修改信息</el-button>
      
      </el-form-item>

    
    </el-form>
  </div>
</template>


<script>
import userApi from "~/api/user.js";
import payApi from "~/api/pay.js";

export default {
  created() {
    userApi.info().then(res => {
      this.user = res.data.data;
    });
  },
  data() {
    var nameValidate = (rule, value, callback) => {
      userApi.checkName(this.user.nickname).then(res => {
        if (res.data.data > 0) {
          callback(new Error("昵称重复"));
        } else {
          callback();
        }
      });
    };
    return {
      changePwd:'N',
      user: {},
      password:'',
      rules: {
        name: [{ required: true, validator: nameValidate, trigger: "blur" }]
      }
    };
  },
  methods: {
    transfer() {
      return payApi.transfer().then(res => {
        if (res.data.flag) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    updateInfo() {
      if(this.changePwd=='Y'){
         var patr = /^(\w){6,20}$/;
        if (!patr.exec(this.password)) {
          this.$message({
            message: "请输入6-20个字母、数字、下划线密码",
            type: "error"
          });
          return;
        }else{
            this.user.password=this.password
        }
      }

      return userApi.updateInfo(this.user,this.changePwd).then(res => {
        if (res.data.flag) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    formatType(row) {
      switch (row) {
        case "0":
          return "否";
          break;
        case "1":
          return "是";
          break;
        case "2":
          return "审核中";
          break;
        case "3":
          return "审核不通过";
          break;
        default:
          return "其他";
      }
    }
  }
};
</script>

<style>
</style>



