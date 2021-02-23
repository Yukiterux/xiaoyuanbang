<template>
  <div width="1200">
    <el-form ref="form" label-width="180px" style="margin-left:20%">
      {{item}}
      <el-form-item label="用户id" type="textarea" autosize>
        <el-input v-model="item.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户状态" type="textarea" autosize>
        <el-radio-group v-model="item.status">
          <el-radio label="Y">可用</el-radio>
          <el-radio label="N">不可用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户手机号" type="textarea" autosize>
        <el-input v-model="item.mobile"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" type="textarea" autosize>
        <el-input v-model="item.nickname"></el-input>
      </el-form-item>
      <el-form-item label="性别" type="textarea" autosize>
        <el-radio-group v-model="item.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" type="textarea" autosize>
        <el-date-picker
          v-model="item.birthday"
          type="date"
          placeholder="选择日期时间"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="头像" type="textarea" autosize>
         <el-avatar :src="item.avatar"></el-avatar>
      </el-form-item>
      <el-form-item label="身份证号" type="textarea" autosize>
        <el-input v-model="item.id_card"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" type="textarea" autosize>
        <el-input v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item v-if="item.idcard_address!=null" label="身份认证图片" type="textarea" autosize>
        <img :src="item.idcard_address"  alt="身份认证图片" />
        <el-button
          v-if="item.is_errands==2"
          type="primary"
          @click="check(1)"
        >审核通过</el-button>
        <el-button
          v-if="item.is_errands==2"
          type="primary"
          @click="check(3)"
        >审核不通过</el-button>
      </el-form-item>
      <el-form-item label="是否已成为配送员" type="textarea" autosize>
        <el-radio-group v-model="item.is_errands">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
          <el-radio label="2">审核中</el-radio>
          <el-radio label="3">审核不通过</el-radio>
        </el-radio-group>
         
      </el-form-item>
       <el-form-item label="账户余额" type="textarea" autosize>
        <el-input v-model="item.account_balance"></el-input>
      </el-form-item>
      <el-form-item label="信誉分" type="textarea" autosize>
        <el-input v-model="item.grade"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" type="textarea" autosize>
        <el-input v-model="item.email"></el-input>
      </el-form-item>
      <el-form-item label="QQ账号" type="textarea" autosize>
        <el-input v-model="item.qq"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" type="textarea" autosize>
        <el-date-picker
          v-model="item.create_time"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最后登录时间时间" type="textarea" autosize>
        <el-date-picker
          v-model="item.create_time"
          type="datetime"
          placeholder="最后登录时间时间"
          align="right"
          disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item autosize>
        <el-button type="primary" @click="update">确认修改</el-button>
        <el-button type="danger" @click="deleteOrder">删除用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import userApi from "~/api/user.js";
import dzdm from "../../order/info/dzdm.json";
export default {
  created() {
    userApi.findById(this.$route.params.id).then(res => {
      this.item = res.data.data;
      this.user=res.data.data;
    });
  },
  data() {
    return {
      item: {},
      caseTypeData: dzdm.dm,
      caseTypeData2: dzdm.dm1,
      user:{}
    };
  },
  methods: {
    jump(url) {
      let routeUrl = this.$router.resolve({
        path: url
      });
      window.open(routeUrl.href, "_blank");
    },
    update() {
      userApi.update(this.item).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "修改成功",
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
    check(status){
      this.user.is_errands=status;
      console.log(this.user)
      userApi.update(this.user).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "审核成功",
            type: "success"
          });
          location.reload();

        } else {
          this.$message({
            message: '审核失败',
            type: "error"
          });
        }
      });
    },
    deleteOrder() {
      userApi.deleteById(this.item.id).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          location.href = "/admin/order/info";
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    formatDate(row, column, cellValue, index) {
      if (cellValue != null) {
        return this.formatDatetime(cellValue);
      } else {
        return "无";
      }
      return "无";
    },
    formatNY(status) {
      if (status == "Y") {
        return "是";
      } else {
        return "否";
      }
    },
    formatStatus(status) {
      switch (status) {
        case "1":
          return "待支付";
          break;
        case "2":
          return "待接单";
          break;
        case "3":
          return "进行中";
          break;
        case "4":
          return "跑腿完成待用户确认";
          break;
        case "5":
          return "已完成";
          break;
        case "6":
          return "用户申请取消订单";
          break;
        case "7":
          return "接单员申请取消订单";
          break;
        case "9":
          return "管理员仲裁";
          break;
        default:
          return "已取消";
      }
    },
    formatType(order_type) {
      switch (order_type) {
        case 1:
          return "帮买";
          break;
        case 2:
          return "帮送";
          break;
        case 3:
          return "帮取";
          break;
        case 4:
          return "帮排队";
          break;
        default:
          return "其他";
      }
    },
    parsenInt2(val) {
      return Number(val);
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

