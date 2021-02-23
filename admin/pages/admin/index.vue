<template>
  <div>
    <panel-group :countNum="count"/>
  <el-table
      :data="orders"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单号"
       >
      </el-table-column>
      <el-table-column
        prop="order_type"
        label="订单类型"
        :formatter="formatType"
        >
      </el-table-column>
      <el-table-column
        prop="reward"
        label="订单酬金"
        :formatter="formatReward">
      </el-table-column>
       <el-table-column
        prop="status"
        label="订单状态"
        :formatter="formatStatus">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import PanelGroup from "@/components/PanelGroup";
import adminApi from "~/api/admin.js";
import orderApi from "~/api/order.js";
import Cookies from 'js-cookie'
export default {
  components: {
    PanelGroup
  },
  created() {
    console.log(Cookies.get('token'))
    adminApi.getCount().then(res => {
      if (res.data.flag) {
        this.count=res.data.data
      } else {
        this.$message({
          message: res.data.message,
          type: "error"
        });
      }
    });


 orderApi.recentOrder().then(res => {
      if (res.data.flag) {
        this.orders=res.data.data
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
      count: {},
      orders:[],
    };
  },
  methods:{
    formatType(row, column) {
      switch (row.order_type+"") {
        case "1":
          return "帮买";
          break;
        case "2":
          return "帮送";
          break;
        case "3":
          return "帮取";
          break;
        case "4":
          return "帮排队";
          break;
        default:
          return "其他";
      }
    },
    formatStatus(row, column) {
      switch (row.status) {
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
    formatReward(row, column, cellValue, index) {
      if (row.reward == null) {
        return (row.reward = "0元");
      } else if (
        String(row.reward)
          .toLowerCase()
          .indexOf("元") == -1
      ) {
        return (row.reward = row.reward + "元");
      } else {
        return row.reward;
      }
    },
  }
};
</script>
