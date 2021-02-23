
<template>
  <div>

      {{items}}
      <div>
        <el-table
        @sort-change='sortChange'
         :default-sort = "{prop: 'create_time',order: 'descending'}"
          :data="items.rows"
          style="width: 100%"
        >
        <el-table-column
            prop="id"
            label="订单编号"
            width="180"
        >
        </el-table-column>
          <el-table-column
           sortable
            prop="create_time"
            label="下单日期"
            width="180"
            :formatter="formatDate"
          >
          </el-table-column>

          <el-table-column
            sortable
            prop="appointment_time"
            label="订单预约配送日期"
            width="180"
            :formatter="formatDate"
          >
          </el-table-column>
        <el-table-column
            sortable
            prop="cancel_time"
            label="订单预约取消日期"
            width="180"
            :formatter="formatDate"
          >
          </el-table-column>
          <el-table-column
            sortable
            prop="order_type"
            label="订单类型"
            width="180"
            :formatter="formatType"
          >
          </el-table-column>
<el-table-column
          sortable
          prop="status"
          label="订单状态"
          width="180"
          :formatter="formatStatus"
        >
        </el-table-column>
          <el-table-column
            sortable
            prop="reward"
            label="报酬"
            width="180"
            :formatter="formatReward"
          >
          </el-table-column>
          <el-table-column label="接单人"> 

           
            <template slot-scope="scope">
                <div v-if="scope.row.erransid!=null">
              <img
                :src="scope.row.userAvatar"
                width="50px"
                height="50px"
              />
              <el-button type="text">{{scope.row.userNickname}}</el-button>
              <el-tag>信誉分：{{scope.row.userGrade}}</el-tag>
                </div>
                 <div v-if="scope.row.erransid==null">
                   无
                 </div>
            </template>
           
              
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <nuxt-link  tag="el-button" :to="'/user/order/acceptOrder/'+scope.row.id">订单详情</nuxt-link>
              <el-button
                type="primary"
                @click="makeOrder(scope.$index, scope.row)"
              >完成订单</el-button>


              
            </template>

          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <span class="demonstration">完整功能</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizeList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="items.total"
        >
        </el-pagination>
      </div>

  </div>

</template>
<script>
import orderApi from "~/api/order.js";
export default {
  created() {

    orderApi.orderPlaced(1, 2,this.orderProp).then(res => {
      this.items = res.data.data;
    });
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
      pageSizeList:[1,2,3],
      totalSize:0,
      items: {},
      orderProp:{},

    };
  },
  methods: {
//排序
   

    handleSizeChange(val) {
      this.pageSize = val;
      orderApi.orderPlaced(1, this.pageSize,this.orderProp,this.orderProp).then(res => {
        this.items = res.data.data;
      });
    }
    ,
    handleCurrentChange(val) {
      this.currentPage = val;
      orderApi.orderPlaced(this.currentPage, this.pageSize,this.orderProp).then(res => {
        this.items = res.data.data;
      });
    },
    formatType(row, column) {
      switch (row.order_type) {
        case '1':
          return "帮买";
          break;
        case '2':
          return "帮送";
          break;
        case '3':
          return "帮取";
          break;
        case '4':
          return "帮排队";
          break;
        default:
          return "其他";
      }
    },
    sortChange (column, prop, order){
      this.orderProp.columnName=column.prop;
      this.orderProp.order=column.order;
      orderApi.orderPlaced(this.currentPage, this.pageSize,this.orderProp).then(res => {
        this.items = res.data.data;
      });
      console.log(column.prop); //prop标签 => nickname
      console.log(column.order);//descending降序、ascending升序
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

