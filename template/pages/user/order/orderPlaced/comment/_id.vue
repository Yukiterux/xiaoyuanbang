<template>
  <div>
    <el-form ref="form" label-width="280px">
      <el-form-item
        v-if="comm.user_comment!=null"
        label="用户评价"
        type="textarea"
        autosize
      >{{comm.user_comment}}</el-form-item>
      <el-form-item v-if="comm.user_grade!=null" label="用户评分" type="textarea" autosize>
        <el-rate
          v-model="comm.user_grade"
          disabled
          show-score
          text-color="#ff9900"
          style="margin-top:10px"
        ></el-rate>
      </el-form-item>
      <el-form-item
        v-if="comm.errands_comment!=null"
        label="配送员评价"
        type="textarea"
        autosize
      >{{comm.errands_comment}}</el-form-item>
      <el-form-item v-if="comm.errands_grade!=null" label="配送者评分" type="textarea" autosize>
        <el-rate
          v-model="comm.errands_grade"
          disabled
          show-score
          text-color="#ff9900"
          style="margin-top:10px"
        ></el-rate>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import orderApi from "~/api/order.js";

export default {
  created() {
    orderApi.comment(this.$route.params.id).then(res => {
      this.comm = res.data.data;
    });
  },

  data() {
    return {
      comm: {}
    };
  }
};
</script>
