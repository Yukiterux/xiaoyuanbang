<template>
  <div>
    <div class="block">
      <div class="con_header" :style="conhead">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple filterItem">
              <label class="labelclass">用户id</label>
              <el-input v-model="order.userid" placeholder="请输入用户id"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light filterItem">
              <label class="labelclass">配送员id</label>
              <el-input v-model="order.errandsid" placeholder="配送员id"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light filterItem">
              <label class="labelclass">用户评分</label>
              <el-input v-model="order.user_grade" placeholder="用户评分"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple filterItem">
              <label class="labelclass">配送员评分</label>
              <el-input v-model="order.errands_grade" placeholder="配送员评分"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light filterItem">
              <label class="labelclass"></label>
              <el-button type="primary" class="search" @click="search" icon="el-icon-search">查询</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple filterItem"></div>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table
          :default-sort="{prop: 'create_time',order: 'descending'}"
          :data="items.rows"
          style="width: 100%"
          border
        >
          <el-table-column prop="id" label="评价编号" width="180"></el-table-column>

          <el-table-column label="用户" width="280">
            <template slot-scope="scope">
              <el-avatar :src="scope.row.userAvatar"></el-avatar>
              <nuxt-link :to="'/admin/user/info/'+scope.row.userid">{{scope.row.userNickname}}</nuxt-link>

              <!-- <el-button type="text">{{scope.row.userNickname}}</el-button> -->
              <el-tag>信誉分：{{scope.row.userGrade}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="user_comment" label="用户评价" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="user_grade" label="用户评分" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column label="配送员" width="280">
            <template slot-scope="scope">
              <el-avatar :src="scope.row.errandsAvatar"></el-avatar>
              <nuxt-link :to="'/admin/user/info/'+scope.row.errandsid">{{scope.row.errandsNickname}}</nuxt-link>
              <!-- <el-button type="text">{{scope.row.userNickname}}</el-button> -->
              <el-tag>信誉分：{{scope.row.errandsGrade}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="errands_comment" label="配送员评价" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="errands_grade" label="配送员评分" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="jump('/admin/comment/info/'+scope.row.id)"
              >修改评价</el-button>
              <el-button size="small" type="danger" @click="deleteCom">删除评价</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="items.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import orderApi from "~/api/order.js";

import dzdm from "../order/info/dzdm.json";
export default {
  created() {
    this.search();
  },
  watch: {
   
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      items: {},
      formLabelWidth: "120px",
      orderProp: { status: "5" },
      order: { status: "5", order_type: "全部" },
      commentStatus: "0",
      conhead: {
        height: "200px",
        boxSizing: "border-box",
        margin: "10px",
        border: "1px solid #ccc",
        boxShadow: "0px 3px 3px 0px #ccc",
        position: "relative"
      }
    };
  },
  methods: {
    deleteCom() {
      orderApi.deleteComment(this.comm).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "删除成功",
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
    jump(url) {
      let routeUrl = this.$router.resolve({
        path: url
      });
      window.open(routeUrl.href, "_blank");
    },
    search() {
      this.orderProp = this.order;
      orderApi.searchComment(1, 10, this.orderProp).then(res => {
        this.items = res.data.data;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      orderApi
        .searchComment(this.currentPage, this.pageSize, this.orderProp)
        .then(res => {
          this.items = res.data.data;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      orderApi
        .searchComment(this.currentPage, this.pageSize, this.orderProp)
        .then(res => {
          this.items = res.data.data;
        });
    },
    formatType(row, column) {
      switch (row.order_type + "") {
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
    formatInfo(row) {
      switch (row.order_type + "") {
        case "1":
          return "buyOrder";
          break;
        case "2":
          return "sendOrder";
          break;
        case "3":
          return "takeOrder";
          break;
        case "4":
          return "queueOrder";
          break;
        default:
          return "otherOrder";
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
<style >
.filterItem {
  padding: 10px 10px 10px 10px;
  text-align: left;
  position: relative;
}
input::-webkit-input-placeholder {
  color: red;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: red;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: red;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}
.con_header .el-input {
  width: 100%;
}

label {
  display: inline-block;
  width: 20%;
  text-align: right;
}
.con_header .el-button {
  width: 80px;
  height: 35px;
  margin-top: 5px;
}
.con_header .el-select {
  width: 80%;
}

.con_header .el-input {
  width: 80%;
}
.con_header .works.el-select {
  width: 32%;
  margin-right: 10px;
}
.el-table th > .cell {
  text-align: center;
  font-weight: 900;
}
.table {
  top: 297px;
  left: 0px;
  width: calc(100% - 20px);
  height: calc(100% - 358px);
  margin: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 3px 3px 0px #ccc;
  overflow: auto;
}
.el-table th {
  background-color: #d6e5ff;
  color: #023499;
  font-size: 16px;
}
.el-table .cell {
  line-height: 38px;
}
.el-table td,
.el-table th {
  padding: 0 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}
.el-table th,
td {
  border-right: 1px solid rgb(230, 230, 230);
}
</style>