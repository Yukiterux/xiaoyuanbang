<template>
  <div width="1200">
    <el-form
      ref="form"
      label-width="180px"
      style="margin-left:20%"
    >
      {{item}}
      <el-form-item
        label="订单编号"
        type="textarea"
        autosize
      >
        <el-input v-model="item.id" disabled></el-input>
      </el-form-item>
      <el-form-item
        label="下单时间"
        type="textarea"
        autosize
      >
        <el-date-picker
          v-model="item.create_time"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="支付时间"
        type="textarea"
        autosize
      >
        <el-date-picker
          v-model="item.pay_time"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          disabled=""
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="订单完成时间"
        type="textarea"
        autosize
        v-if="item.complete_time!=null"
      >
        <el-date-picker
          v-model="item.complete_time"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="用户是否已删除订单"
        type="textarea"
        autosize
      >
        {{formatNY(item.is_userdelete)}}
      </el-form-item>
      <el-form-item
        label="配送员是否已删除订单"
        type="textarea"
        autosize
      >
        {{formatNY(item.is_errandsdelete)}}
      </el-form-item>

      <el-form-item
        label="订单类型"
        type="textarea"
        autosize
      >
        <el-select
          v-model="item.order_type"
          placeholder="请选择"
          disabled
        >
          <el-option
            v-for="item in caseTypeData2"
            :key="item.dm"
            :label="item.mc"
            :value="parsenInt2(item.dm)"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="订单状态"
        type="textarea"
        autosize
      >
        <el-select
          v-model="item.status"
          placeholder="请选择"
        >
          <el-option
            v-for="item in caseTypeData"
            :key="item.dm"
            :label="item.mc"
            :value="item.dm"
          ></el-option>
        </el-select>

      </el-form-item>
      <el-form-item
        v-if="item.user_reason!=null"
        label="用户取消理由"
        type="textarea"
        autosize
      >
        {{item.user_reason}}
      </el-form-item>
      <el-form-item
        v-if="item.errands_reason!=null"
        label="配送员取消理由"
        type="textarea"
        autosize
      >
        {{item.errands_reason}}
      </el-form-item>
      <el-form-item
        v-if="item.user_cancel_time!=null"
        label="用户申请取消时间"
        type="textarea"
        autosize
      >
        {{formatDatetime(item.user_cancel_time)}}

      </el-form-item>
      <el-form-item
        v-if="item.errands_cancel_time!=null"
        label="配送员申请取消时间"
        type="textarea"
        autosize
      >
        {{formatDatetime(item.errands_cancel_time)}}
      </el-form-item>
      <el-form-item
        v-if="item.cancel_time!=null"
        label="订单取消时间"
        type="textarea"
        autosize
      >
        {{formatDatetime(item.cancel_time)}}
      </el-form-item>
      <el-form-item
        v-if="item.accept_time!=null"
        label="接单时间"
        type="textarea"
        autosize
      >
        {{formatDatetime(item.accept_time)}}
      </el-form-item>
      <el-form-item
        v-if="item.errands_confirm_time!=null"
        label="配送员确认完成时间"
        type="textarea"
        autosize
      >
        {{formatDatetime(item.errands_confirm_time)}}
      </el-form-item>
      <el-form-item
        v-if="item.errands_disagree_reason!=null"
        label="配送员拒绝取消理由"
        type="textarea"
        autosize
      >
        {{item.errands_disagree_reason}}
      </el-form-item>

      <el-form-item
        v-if="item.user_disagree_reason!=null"
        label="用户拒绝取消理由"
        type="textarea"
        autosize
      >
        {{item.user_disagree_reason}}
      </el-form-item>

      <el-form-item
        label="发布人"
        type="textarea"
        autosize
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
        label="配送员"
        type="textarea"
        autosize
        v-if="item.errandsid!=null"
      >
        {{errands.nickname}} <img
          :src="errands.avatar"
          width="50px"
          height="50px"
        />
      </el-form-item>
      <el-form-item
        v-if="item.errandsid!=null"
        label="配送员信誉分"
        type="textarea"
        autosize
      >
        <el-tag>信誉分：{{errands.grade}}</el-tag>
      </el-form-item>
      <el-form-item
        label="发布时间"
        type="textarea"
        autosize
      >
        {{formatDatetime(item.create_time)}}
      </el-form-item>

    
       <el-form-item
        label="联系电话"
        type="textarea"
        autosize
      >
        {{item.receiver_mobile}}
      </el-form-item>

      <el-form-item
        label="排队地址"
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

      
      <el-form-item label="排队要求-所有人可见">
        {{item.buy_request}}
      </el-form-item>

        <el-form-item label="排队要求-仅配送者可见">
        {{item.secret}}
      </el-form-item>
      
      <el-form-item
        v-if="item.appointment_time==null"
        label="立即排队"
      >
        <el-button
          type="success"
          icon="el-icon-check"
          circle
        ></el-button>
      </el-form-item>
      <el-form-item
        v-if="item.appointment_time!=null"
        label="预约时间排队"
      >
        {{formatDatetime(item.appointment_time)}}

      </el-form-item>

     


      
      <el-form-item
        v-if="item.appointment_time!=null"
        label="预约购买时间"
      >
        {{formatDatetime(item.appointment_time)}}

      </el-form-item>

      <el-form-item
        v-if="item.cancel_time!=null"
        label="预约取消时间"
      >
        {{formatDatetime(item.cancel_time)}}

      </el-form-item>

  
      <el-form-item label="跑腿费用">
        {{item.reward}}元
      </el-form-item>
      <el-form-item>
   
     <el-button
          v-if="item.is_userC=='Y'||item.is_errC=='Y'"
          type="primary"
          @click="jump('/admin/comment/info/'+item.id)"
        >查看订单评价</el-button>
        <el-button
        v-if="item.status=='9'"
          type="primary"
          @click="cancel"
        >确认取消订单</el-button>
        <el-button
             v-if="item.status=='9'"
          type="primary"
          @click="continueOrder"
        >继续订单</el-button>
        <el-button
          type="primary"
          @click="update"
        >确认修改</el-button>
        <el-button
          type="danger"
          @click="deleteOrder"
        >删除订单</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import orderApi from "~/api/order.js";
import userApi from "~/api/user.js";
import dzdm from "../dzdm.json";
export default {
  created() {
    orderApi.findById(this.$route.params.id).then(res => {
      this.item = res.data.data;
      userApi.findById(res.data.data.userid).then(res2 => {
        this.user = res2.data.data;
      });
      if (res.data.data.errandsid != null && this.item.errandsid != "") {
        userApi.findById(res.data.data.errandsid).then(res3 => {
          this.errands = res3.data.data;
        });
      }
    });
  },
  data() {
    return {
      item: {},
      user: {},
      errands: {},
      caseTypeData: dzdm.dm,
      caseTypeData2: dzdm.dm1
    };
  },
  methods: {
     jump(url){
        let routeUrl = this.$router.resolve({
          path: url
     });
     window.open(routeUrl.href, '_blank');
    },
    continueOrder() {
      orderApi.continue(this.item.id).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "修改订单状态成功",
            type: "success"
          });
          location.reload()
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    cancel() {
      orderApi.cancel(this.item.id).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "取消成功",
            type: "success"
          });
          location.reload()
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    update() {
      orderApi.update(this.item).then(res => {
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
    deleteOrder() {
      orderApi.deleteById(this.item.id).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          location.href='/admin/order/info'
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

