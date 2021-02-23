
<template>
  <div>
    <div>
      <el-table
        @sort-change="sortChange"
        :default-sort="{prop: 'accept_time',order: 'descending'}"
        :data="items.rows"
        style="width: 100%"
      >
        <el-table-column prop="id" label="订单编号" width="180"></el-table-column>
        <el-table-column
          sortable
          prop="accept_time"
          label="接单日期"
          width="180"
          :formatter="formatDate"
        ></el-table-column>

        <el-table-column
          prop="appointment_time"
          label="订单预约配送日期"
          width="180"
          sortable
          :formatter="formatDate"
        ></el-table-column>

        <el-table-column
          sortable
          prop="order_type"
          label="订单类型"
          width="100"
          :formatter="formatType"
        ></el-table-column>
        <el-table-column sortable prop="status" label="订单状态" width="120" :formatter="formatStatus"></el-table-column>

        <el-table-column prop="reward" label="报酬" width="100" sortable :formatter="formatReward"></el-table-column>
        <el-table-column label="用户" width="280">
          <template slot-scope="scope">
            <img :src="scope.row.userAvatar" width="50px" height="50px" />
            <nuxt-link :to="'/info/'+scope.row.userid">{{scope.row.userNickname}}</nuxt-link>

            <!-- <el-button type="text">{{scope.row.userNickname}}</el-button> -->
            <el-tag>信誉分：{{scope.row.userGrade}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <nuxt-link
              tag="el-button"
              :to="'/user/order/orderInfo/'+formatInfo(scope.row)+'/'+scope.row.id"
            >订单详情</nuxt-link>

            <nuxt-link
              v-if="scope.row.status=='5'&&scope.row.errC!='Y'"
              size="small"
              tag="el-button"
              :to="'/user/order/acceptOrder/commentOrder/'+scope.row.id"
            >评价订单</nuxt-link>

            <nuxt-link
              v-if="scope.row.errC=='Y'"
              size="small"
              tag="el-button"
              :to="'/user/order/orderPlaced/comment/'+scope.row.id"
            >查看订单评价</nuxt-link>

            <el-button
              v-if="scope.row.status==5||scope.row.status==8"
              size="small"
              type="danger"
              @click="deleteOrder(scope.row)"
            >删除订单</el-button>
            <el-button
              v-if="scope.row.status=='3'"
              type="primary"
              @click="errCompleteOrder(scope.row)"
            >确认送达</el-button>

            <el-button
              size="small"
              type="danger"
              @click="dialogFormVisible2= true;currentId=scope.row.id"
              v-if="scope.row.status==3||scope.row.status==4"
            >取消订单</el-button>
            <el-dialog title="取消订单理由" :visible.sync="dialogFormVisible2">
              <el-form>
                <el-form-item label="取消理由" :label-width="formLabelWidth">
                  <el-input v-model="errandsCancelReason" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="dialogFormVisible2 = false;cancelOrder()"
                >确 定</el-button>
              </div>
            </el-dialog>

            <el-button
              v-if="scope.row.status=='6'"
              type="primary"
              @click="AgreecancelOrder(scope.row)"
            >确认取消订单</el-button>
            <el-button
              v-if="scope.row.status=='6'"
              type="primary"
              @click="dialogFormVisible = true;currentId=scope.row.id"
            >拒绝取消订单</el-button>
            <el-dialog title="拒绝取消订单" :visible.sync="dialogFormVisible">
              <el-form>
                <el-form-item label="拒绝理由" :label-width="formLabelWidth">
                  <el-input v-model="errandsReason" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="dialogFormVisible = false;disCancelOrder()"
                >确 定</el-button>
              </div>
            </el-dialog>
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
export default {
  created() {
    orderApi.acceptOrder(1, 5, this.orderProp).then(res => {
      this.items = res.data.data;
    });
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      orderProp: {},
      items: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "120px",
      errandsReason: "",
      errandsCancelReason: "",
      currentId:""
    };
  },
  methods: {
    cancelOrder() {
      this.$confirm("确认取消订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi
              .errandsCancelOrder(this.errandsCancelReason, this.currentId)
              .then(res => {
                if (res.data.flag) {
                  this.$message({
                    message: res.data.message,
                    type: "success"
                  });
                  orderApi
                    .acceptOrder(1, this.pageSize, this.orderProp)
                    .then(res => {
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
            message: "未取消订单"
          });
        });
    },
    sortChange(column, prop, order) {
      this.orderProp.columnName = column.prop;
      this.orderProp.order = column.order;
      orderApi
        .acceptOrder(this.currentPage, this.pageSize, this.orderProp)
        .then(res => {
          this.items = res.data.data;
        });
      console.log(column.prop); //prop标签 => nickname
      console.log(column.order); //descending降序、ascending升序
    },
    deleteOrder(row) {
      this.$confirm("确认删除订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi.deleteAcceptOrder(row.id).then(res => {
              if (res.data.flag) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                orderApi
                  .acceptOrder(1, this.pageSize, this.orderProp)
                  .then(res => {
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
            message: "已取消操作"
          });
        });
    },
    AgreecancelOrder(row) {
      console.log(row.id);
      this.$confirm("确认取消订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi.errandsAgreeCancelOrder(row.id).then(res => {
              if (res.data.flag) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                orderApi.orderApi
                  .acceptOrder(1, this.pageSize, this.orderProp)
                  .then(res => {
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
            message: "已取消操作"
          });
        });
    },
    disCancelOrder() {
      this.$confirm("确认拒绝取消订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi
              .errandsDisCancelOrder(this.errandsReason,this.currentId)
              .then(res => {
                if (res.data.flag) {
                  this.$message({
                    message: res.data.message,
                    type: "success"
                  });
                  orderApi.orderApi
                    .acceptOrder(1, this.pageSize, this.orderProp)
                    .then(res => {
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
            message: "未取消订单"
          });
        });
    },
    errCompleteOrder(row) {
      this.$confirm("确认完成订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi.errCompleteOrder(row.id).then(res => {
              if (res.data.flag) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                orderApi
                  .acceptOrder(1, this.pageSize, this.orderProp)
                  .then(res => {
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
            message: "已取消操作"
          });
        });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      orderApi
        .acceptOrder(this.currentPage, this.pageSize, this.orderProp)
        .then(res => {
          this.items = res.data.data;
        });
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      orderApi
        .acceptOrder(this.currentPage, this.pageSize, this.orderProp)
        .then(res => {
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
    formatInfo(row) {
      switch (row.order_type) {
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

