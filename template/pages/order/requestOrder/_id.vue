<template>
  <div>
    <el-form
      ref="form"
     label-position="left"
      label-width="180px"
      style="margin-left:40%"
    >
      <el-form-item
        label="发布人"
        type="textarea"
        
      >
        {{user.nickname}} <img
          :src="user.avatar"
          width="50px"
          height="50px"
        />
      </el-form-item>
      <el-form-item
        label="发布人信誉分"
        type="textarea"
        autosize
      >
        <el-tag>信誉分：{{user.grade}}</el-tag>
      </el-form-item>
      <el-form-item
        label="发布时间"
        type="textarea"
        autosize
      >
        {{formatDatetime(item.create_time)}}
      </el-form-item>
      <!-- <el-form-item
        label="收货地址"
        type="textarea"
        autosize
      >
        {{item.receiver_address}}
      </el-form-item>
      <el-form-item
        label="备注地址"
        type="textarea"
        autosize
      >
        {{item.receiver_remark_address}}
      </el-form-item>

      <hr>
      <el-form-item
        label="购买地址"
        type="textarea"
        autosize
      >
        {{item.buy_address}}
      </el-form-item>
      <el-form-item
        label="购买备注地址"
        type="textarea"
        autosize
      <!-->
        <!-- {{item.buy_remark_address}}
      </el-form-item> -->
      <el-form-item label="购买要求-所有人可见">
        {{item.buy_request}}
      </el-form-item>
      <hr>
      <el-form-item  v-if="item.order_type==1"  label="商品价格">
        {{item.buy_price}}元
      </el-form-item>
      
      <el-form-item v-if="item.order_type==1" label="商品重量">
        {{item.buy_weight}}KG

      </el-form-item>
      <hr>
      <el-form-item
        v-if="item.appointment_time==null"
        label="立即进行"
      >
        <el-button
          type="success"
          icon="el-icon-check"
          circle
        ></el-button>
      </el-form-item>
      <el-form-item
        v-if="item.appointment_time!=null"
        label="预约进行时间"
      >
        {{formatDatetime(item.appointment_time)}}

      </el-form-item>
<el-form-item
        v-if="item.appointment_time!=null"
        label="预约取消订单时间"
      >
        {{formatDatetime(item.cancel_time)}}
      </el-form-item>
      <hr>
      <el-form-item label="跑腿费用">
        {{item.reward}}元
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="makeOrder()"
        >接单</el-button>
      </el-form-item>

      <hr>
      <el-form-item>
        <el-button
          type="primary"
          @click="$router.back(-1)"
        >返回上一页</el-button>
      </el-form-item>
      <hr>
    </el-form>
  </div>
</template>
<script>
import orderApi from "~/api/order.js";
import userApi from "~/api/user.js";

export default {
  created() {
    //通过订单id获取订单信息
    orderApi.findSomeById(this.$route.params.id).then(res => {
      this.item = res.data.data;
      //通过用户id获取用户信息
      userApi.findById(res.data.data.userid).then(res2 => {
        this.user = res2.data.data;
      });
    });
  },
  data() {
    return {
      item: {},
      user: {}
    };
  },
  methods: {
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
    },

    makeOrder() {
      this.$confirm("确认接单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi.startOrder(this.item.id).then(res => {
              if (res.data.flag) {
                this.$message({
                  message: "接单成功",
                  type: "success"
                });
                this.$router.push({ path: "/order/requestOrder" });
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消接单"
          });
        });
    }
  }
};
</script>
<style>

</style>

