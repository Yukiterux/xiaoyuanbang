<template>
  <div>
    <el-form
      label-width="180px"
      style="margin-left:20%"
    >
      <el-form-item label="账号">
        <el-input v-model="admin.id"></el-input>
      </el-form-item>
      <el-form-item
        label="昵称"
        prop="name"
      >
        <el-input v-model="admin.loginname"></el-input>
      </el-form-item>

      <el-form-item label="头像">
        <el-avatar
          shape="square"
          :size="100"
          :src="admin.avatar"
        ></el-avatar>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <nuxt-link
          size="small"
          tag="el-button"
          :to="'/admin/profile/changeAvatar/'"
        >修改头像</nuxt-link>
      </el-form-item>
      <el-form-item
        label="上次登录时间"
        prop="name"
      >
        {{formatDate(admin.last_login_time)}}
      </el-form-item>

      <el-form-item>
        <el-button
          type="warning"
          @click="updatePassword()"
        >修改密码</el-button>
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
import adminApi from "~/api/admin.js";

export default {
  created() {
    adminApi.info().then(res => {
      if (res.data.flag) {
        this.admin = res.data.data;
      } else {
        this.$message({
          message: res.data.message,
          type: "error"
        });
      }
    });
  },
  data() {
    return {
      admin: {}
    };
  },
  methods: {
    formatDate(time) {
      var unixtimestamp = new Date(time);
      var year = 1900 + unixtimestamp.getYear();
      var month = "0" + (unixtimestamp.getMonth() + 1);
      var date = "0" + unixtimestamp.getDate();
      var hour = "0" + unixtimestamp.getHours();
      var minute = "0" + unixtimestamp.getMinutes();
      var second = "0" + unixtimestamp.getSeconds();
      return (
        year +
        "-" +
        month.substring(month.length - 2, month.length) +
        "-" +
        date.substring(date.length - 2, date.length) +
        " " +
        hour.substring(hour.length - 2, hour.length) +
        ":" +
        minute.substring(minute.length - 2, minute.length) +
        ":" +
        second.substring(second.length - 2, second.length)
      );
    },
    updatePassword(){
      location.href='/admin/profile/changePassword'
    },
    updateInfo() {
      return adminApi.updateInfo(this.admin).then(res => {
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
    }
  }
};
</script>

