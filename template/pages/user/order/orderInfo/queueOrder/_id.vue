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
{{item.id}}
       </el-form-item>
<el-form-item
        label="下单时间"
        type="textarea"
        autosize
      >
{{formatDatetime(item.create_time)}}
       </el-form-item>
        <el-form-item
        label="订单类型"
        type="textarea"
        autosize
      >
{{formatType(item.order_type)}}
       </el-form-item>

        <el-form-item
        label="订单状态"
        type="textarea"
        autosize
      >
    {{formatStatus(item.status)}}
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
        v-if="item.cancel_time!=null"
        label="预约取消时间"
      >
        {{formatDatetime(item.cancel_time)}}

      </el-form-item>


      <hr>
      <el-form-item label="跑腿费用">
        {{item.reward}}元
      </el-form-item>
      <el-form-item>
        <el-button v-if="item.status==3"
          type="primary"
          @click="makeOrder()"
        >完成订单</el-button>
      </el-form-item>
<el-form-item>
        <el-button
          type="primary"
          @click="$router.back(-1)"
        >返回上一页</el-button>
      </el-form-item>
      <hr>
      <hr>
    </el-form>
  </div>
</template>
<script>
import orderApi from "~/api/order.js";
import userApi from "~/api/user.js";

export default {
  created() {
    orderApi.findById(this.$route.params.id).then(res => {
      this.item = res.data.data;
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

   
    
  }
};
</script>

