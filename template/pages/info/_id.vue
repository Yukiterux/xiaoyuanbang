<template>
  <div >
   {{user}}


    <el-form
      ref="form"
      :rules="rules"
      label-width="80px"
      style="margin-left:40%"
    >
    

      <el-form-item
        label="昵称"
        prop="name"
      >
        {{user.nickname}}
      </el-form-item>

      <el-form-item label="性别">
        {{formatSex(user.sex)}}
      </el-form-item>
      <el-form-item label="生日">
        {{formatDatetime(user.birthday)}}
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar
          shape="square"
          :size="100"
          :src="user.avatar"
        ></el-avatar>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

      </el-form-item>
  
      <el-form-item label="信誉分">
        {{user.grade}}
      </el-form-item>
      <el-form-item label="qq号">
        {{user.qq}}
      </el-form-item>
      <el-form-item label="邮箱">
        {{user.email}}
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="$router.back(-1)"
        >返回上一页</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
import userApi from "~/api/user.js";
export default {
  created() {
      userApi.findInfoById(this.$route.params.id).then(res2 => {
        this.user = res2.data.data;
      });
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
formatSex(sex) {
      switch (sex) {
        case "1":
          return "男";
          break;
        case "2":
          return "女";
          break;
      }
    },
   formatDate(row, column, cellValue, index) {
      if (cellValue != null) {
        return this.formatDatetime(cellValue);
      } else {
        return "无";
      }
      return "无";
    },
    formatDatetime(time) {
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
    }
  }
};
</script>

