<template>
  <div>
    <el-form ref="form" label-width="280px">
      <el-form-item label="创建时间" type="textarea" autosize>
       <el-date-picker
          v-model="comm.ctime"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户评价" type="textarea" autosize>
        <el-input v-model="comm.user_comment"></el-input>
      </el-form-item>
      <el-form-item v-if="comm.user_grade!=null" label="用户评分" type="textarea" autosize>
        <el-rate v-model="comm.user_grade" show-score text-color="#ff9900" style="margin-top:10px"></el-rate>
      </el-form-item>
      <el-form-item label="配送员评价" type="textarea" autosize>
        <el-input v-model="comm.errands_comment"></el-input>
      </el-form-item>
      <el-form-item v-if="comm.errands_grade!=null" label="配送者评分" type="textarea" autosize>
        <el-rate
          v-model="comm.errands_grade"
          show-score
          text-color="#ff9900"
          style="margin-top:10px"
        ></el-rate>
      </el-form-item>
      <el-form-item v-if="comm.errands_grade!=null" label="配送者评分" type="textarea" autosize>
        <el-button @click="updateCom">修改</el-button>
        <el-button type="danger" @click="deleteCom">删除</el-button>
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
  },
  methods:{
    updateCom(){
      orderApi.updateComment(this.comm).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "修改成功",
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
    deleteCom(){
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
  }
};
</script>
