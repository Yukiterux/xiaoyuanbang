<template>
  <div>
    <div class="block">
      <div class="con_header" :style="conhead">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple filterItem">
              <label class="labelclass">用户id</label>
              <el-input v-model="user.id" placeholder="请输入用户id"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light filterItem">
              <label class="labelclass">手机号</label>
              <el-input v-model="user.mobile" placeholder="请输入用户手机号"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple filterItem">
              <label class="labelclass">真实姓名</label>
              <el-input v-model="user.name" placeholder="请输入真实姓名"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          
          <el-col :span="8">
            <div class="grid-content bg-purple-light filterItem">
              <label class="labelclass">身份证号</label>
              <el-input v-model="user.id_card" placeholder="请输入身份证号"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
             <div class="grid-content bg-purple-light filterItem">
              <label class="labelclass">用户昵称</label>
              <el-input v-model="user.nickname" placeholder="请输入用户昵称"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple filterItem">
              <label class="labelclass"></label>
              <el-button type="primary" class="search" @click="search" icon="el-icon-search">查询</el-button>
            </div>
          </el-col>
        </el-row>

        
      </div>
      <div class="table">
        <el-table
          :default-sort="{prop: 'create_time',user: 'descending'}"
          :data="items.rows"
          style="width: 100%"
          buser
        >
          <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
          <el-table-column
            prop="is_errands"
            label="用户是否已成为配送员"
            width="180"
            :formatter="formatErrands"
          ></el-table-column>

          <el-table-column
            prop="mobile"
            label="手机号"
            width="180"
          ></el-table-column>
          <el-table-column
            sortable
            prop="nickname"
            label="用户昵称"
            width="100"
          ></el-table-column>
          <el-table-column
            sortable
            prop="account_balance"
            label="用户余额"
            width="120"

          ></el-table-column>

          <el-table-column label="用户" width="280">
            <template slot-scope="scope">
              <el-avatar :src="scope.row.avatar"></el-avatar>
              <nuxt-link :to="'/admin/user/info/'+scope.row.id">{{scope.row.userNickname}}</nuxt-link>

              <!-- <el-button type="text">{{scope.row.userNickname}}</el-button> -->
              <el-tag>信誉分：{{scope.row.grade}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="check(scope.row,'1')"
              >审核通过</el-button>
              <el-button
                size="small"
                @click="check(scope.row,'3')"
              >审核不通过</el-button>
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
import userApi from "~/api/user.js";
import dzdm from "../../order/info/dzdm.json";
export default {
  created() {
    this.search();
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      items: {},
      formLabelWidth: "120px",
      userProp: {is_errands:"2"},
      user: {is_errands:"2"},
      caseTypeData:dzdm.dm4,
      conhead: {
        height: "200px",
        boxSizing: "buser-box",
        margin: "10px",
        buser: "1px solid #ccc",
        boxShadow: "0px 3px 3px 0px #ccc",
        position: "relative"
      }
    };
  },
  methods: {
    check(user,is_errands){
      user.is_errands=is_errands
      userApi.update(user).then(res => {
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
    changeUser(url) {
      let routeUrl = this.$router.resolve({
        path: url
      });
      window.open(routeUrl.href, "_blank");
    },
    deleteUser(row) {
      userApi.deleteById(row.id).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.search();
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    formatErrands(row,column,cellValue) {
      if (cellValue == "1") {
        return "是";
      } else if(cellValue == "2") {
        return "审核中";
      }else if(cellValue == "3") {
        return "不通过";
      }else if(cellValue=="0"){
        return "否";
      }
    },
    search() {
      this.userProp = this.user;
      userApi.search(1, 10, this.userProp).then(res => {
        this.items = res.data.data;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      userApi
        .search(this.currentPage, this.pageSize, this.userProp)
        .then(res => {
          this.items = res.data.data;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      userApi
        .search(this.currentPage, this.pageSize, this.userProp)
        .then(res => {
          this.items = res.data.data;
        });
    },
    formatType(row, column) {
      switch (row.user_type + "") {
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
          return "用户申请取消用户";
          break;
        case "7":
          return "接单员申请取消用户";
          break;
        case "9":
          return "管理员仲裁";
          break;
        default:
          return "已取消";
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
  width: 16%;
  text-align: right;
  margin-right: 5px;
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
  buser: 1px solid #ccc;
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
  -webkit-box-sizing: buser-box;
  box-sizing: buser-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}
.el-table th,
td {
  buser-right: 1px solid rgb(230, 230, 230);
}
</style>