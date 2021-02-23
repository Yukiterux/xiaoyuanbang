
<template>
  <div>
    <div>
      <el-table
        @sort-change="sortChange"
        :default-sort="{prop: 'create_time',order: 'descending'}"
        :data="items.rows"
        style="width: 100%"
        show-overflow-tooltip
      >
        <el-table-column prop="id" label="订单编号" width="180"></el-table-column>

        <el-table-column
          sortable
          prop="create_time"
          label="下单日期"
          width="180"
          :formatter="formatDate"
        ></el-table-column>

        <el-table-column
          sortable
          prop="order_type"
          label="订单类型"
          width="180"
          :formatter="formatType"
        ></el-table-column>
        <el-table-column sortable prop="status" label="订单状态" width="180" :formatter="formatStatus"></el-table-column>
        <el-table-column sortable prop="reward" label="报酬" width="180" :formatter="formatReward"></el-table-column>
        <el-table-column label="接单人">
          <template slot-scope="scope">
            <div v-if="scope.row.errandsid!=null">
              <img :src="scope.row.userAvatar" width="50px" height="50px" />
              <nuxt-link :to="'/info/'+scope.row.errandsid">{{scope.row.userNickname}}</nuxt-link>
              <el-tag>信誉分：{{scope.row.userGrade}}</el-tag>
            </div>
            <div v-else>无</div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <nuxt-link
              tag="el-button"
              :to="'/user/order/orderInfo/'+formatInfo(scope.row)+'/'+scope.row.id"
            >订单详情</nuxt-link>
            <el-button
              v-if="scope.row.status==4"
              size="small"
              type="primary"
              @click="completeOrder(scope.row)"
            >完成订单</el-button>
            <el-button
              v-if="scope.row.status==5||scope.row.status==8"
              size="small"
              type="danger"
              @click="deleteOrder(scope.row)"
            >删除订单</el-button>



            <el-button
              v-if="scope.row.status==1"
              size="small"
              type="primary"
              @click="pay(scope.row)"
            >支付订单</el-button>
            <el-button
              size="small"
              type="danger"
              @click="dialogFormVisible = true;currentId=scope.row.id"
              v-if="scope.row.status==1||scope.row.status==2||scope.row.status==3||scope.row.status==4"
            >取消订单</el-button>

            <el-dialog title="取消订单" :visible.sync="dialogFormVisible">
              <el-form>
                <el-form-item label="取消理由" :label-width="formLabelWidth">
                  <el-input v-model="usereason" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="dialogFormVisible = false;cancelOrder(currentId)"
                >确 定</el-button>
              </div>
            </el-dialog>

            <el-button
              v-if="scope.row.status=='7'"
              type="primary"
              @click="AgreecancelOrder(scope.row)"
            >确认取消订单</el-button>

            <nuxt-link
              v-if="scope.row.status=='5'&&scope.row.userC!='Y'"
              size="small"
              tag="el-button"
              :to="'/user/order/orderPlaced/commentOrder/'+scope.row.id"
            >评价订单</nuxt-link>

            <nuxt-link
              v-if="scope.row.userC=='Y'"
              size="small"
              tag="el-button"
              :to="'/user/order/orderPlaced/comment/'+scope.row.id"
            >查看订单评价</nuxt-link>

            <el-button
              v-if="scope.row.status=='7'"
              type="primary"
              @click="dialogFormVisible2= true;currentId=scope.row.id"
            >拒绝取消订单</el-button>
            <el-dialog title="拒绝取消订单" :visible.sync="dialogFormVisible2">
              <el-form>
                <el-form-item label="拒绝理由" :label-width="formLabelWidth">
                  <el-input v-model="userDisReason" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="dialogFormVisible2 = false;disCancelOrder()"
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
        :page-sizes="pageSizeList"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="items.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import orderApi from "~/api/order.js";
import payApi from "~/api/pay.js";

export default {
  created() {
    orderApi.orderPlaced(1, 5, this.orderProp).then(res => {
      this.items = res.data.data;
    });
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      pageSizeList: [5, 10, 20],
      totalSize: 0,
      items: {},
      orderProp: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
      usereason: "",
      dialogFormVisible2: false,
      userDisReason: "",
      currentId: "",
      item: {}
    };
  },
  methods: {
    //排序
    pay(row) {
      this.item.orderid = row.id;
      this.item.money = row.reward.replace("元", "");

      payApi.getPayUrl(this.item).then(res2 => {
        console.log(res2);
        window.location.href = res2.data.data.payUrl;
      });
    },
    log(row) {
      console.log(row);
    },
    completeOrder(row) {
      this.$confirm("确认完成订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi.completeOrder(row.id).then(res => {
              if (res.data.flag) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                orderApi
                  .orderPlaced(1, this.pageSize, this.orderProp)
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
    
    deleteOrder(row) {
      this.$confirm("确认删除订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi.deleteOrderPlaced(row.id).then(res => {
              if (res.data.flag) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                orderApi
                  .orderPlaced(1, this.pageSize, this.orderProp)
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
            orderApi.userAgreeCancelOrder(row.id).then(res => {
              if (res.data.flag) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                orderApi
                  .orderPlaced(1, this.pageSize, this.orderProp)
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
    disCancelOrder() {
    
      this.$confirm("确认拒绝取消订单,订单将由管理员决定是否取消， 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi
              .userDisCancelOrder(this.userDisReason, this.currentId)
              .then(res => {
                if (res.data.flag) {
                  this.$message({
                    message: res.data.message,
                    type: "success"
                  });
                  orderApi
                    .orderPlaced(
                      1,
                      this.pageSize,
                      this.orderProp,
                    )
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
    cancelOrder(row) {
      console.log(this.usereason + "-----" + row);
      this.$confirm("确认取消订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(action => {
          if (action === "confirm") {
            orderApi.userCancelOrder(this.usereason, row).then(res => {
              if (res.data.flag) {
                this.$message({
                  message: res.data.message,
                  type: "success"
                });
                orderApi
                  .orderPlaced(1, this.pageSize, this.orderProp)
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
    handleSizeChange(val) {
      this.pageSize = val;
      orderApi
        .orderPlaced(1, this.pageSize, this.orderProp)
        .then(res => {
          this.items = res.data.data;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      orderApi
        .orderPlaced(this.currentPage, this.pageSize, this.orderProp)
        .then(res => {
          this.items = res.data.data;
        });
    },
    formatType(row, column) {
      switch (row.order_type) {
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
    sortChange(column, prop, order) {
      this.orderProp.columnName = column.prop;
      this.orderProp.order = column.order;
      orderApi
        .orderPlaced(this.currentPage, this.pageSize, this.orderProp)
        .then(res => {
          this.items = res.data.data;
        });
      console.log(column.prop); //prop标签 => nickname
      console.log(column.order); //descending降序、ascending升序
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

