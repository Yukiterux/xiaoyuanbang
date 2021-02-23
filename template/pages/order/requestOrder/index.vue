
<template>
  <div>
    <div >
     
      <el-table :data="items.rows" style="width: 100%;">
        <el-table-column  width="80" ></el-table-column>
        <el-table-column prop="create_time" label="订单创建日期" width="180" :formatter="formatDate" ></el-table-column>

        <el-table-column prop="appointment_time" label="订单预约日期" width="180" :formatter="formatDate"></el-table-column>
        <el-table-column prop="cancel_time" label="订单预约自动取消日期" width="180" :formatter="formatDate"></el-table-column>

        <el-table-column prop="order_type" label="订单类型" width="180" :formatter="formatType"></el-table-column>

        <el-table-column prop="reward" label="报酬" width="180" :formatter="formatReward"></el-table-column>

        <el-table-column label="用户">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" width="50px" height="50px" />

            <nuxt-link :to="'/info/'+scope.row.user_id">{{scope.row.userNickname}}</nuxt-link>
            <el-tag>信誉分：{{scope.row.grade}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <nuxt-link :to="'/order/requestOrder/'+scope.row.orderid" tag="el-button">订单详情</nuxt-link>

            <el-button type="primary" @click="makeOrder(scope.$index, scope.row)">接单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block" style="margin-right:180px;float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="items.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import orderApi from "~/api/order.js";
import searchApi from "~/api/search.js";
import userApi from "~/api/user.js";
export default {
  created() {
    searchApi.search(1, 5).then(res => {
      this.items = res.data.data;
    });
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      items: {}
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      searchApi.search(this.currentPage, this.pageSize).then(res => {
        this.items = res.data.data;
      });
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      searchApi.search(this.currentPage, this.pageSize).then(res => {
        this.items = res.data.data;
      });
    },
    formatType(row, column) {
      switch (row.order_type) {
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
    makeOrder(index, row) {
      this.$confirm("确认接单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi.startOrder(row.orderid).then(res => {
              if (res.data.flag) {
                this.$message({
                  message: "接单成功",
                  type: "success"
                });
                searchApi.search(1, 5).then(res => {
                  this.items = res.data.data;
                });
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
.round_icon {
  width: 50px;
  height: 50px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>


