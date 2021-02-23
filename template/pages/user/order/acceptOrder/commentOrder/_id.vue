<template>
  <div>
    <el-form
      ref="form"
     
      label-width="80px"
    >

<el-form-item label="评价内容">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入评价内容"
        v-model="comm.errands_comment"
      >
      
      </el-input>
<hr/>
      <el-rate
  v-model="comm.errands_grade"
  show-text>
  </el-rate>

</el-form-item>
<el-form-item >

      <el-button type="primary" @click.prevent="errComment()">评价订单
      </el-button>
</el-form-item >
<el-form-item>
        <el-button
          type="primary"
          @click="$router.back(-1)"
        >返回上一页</el-button>
      </el-form-item>
{{value}}
    </el-form>

  </div>
</template>
<script>
import orderApi from "~/api/order.js";

export default {
    data(){
        return {
            comm:{},
        }
    },
    methods:{
      errComment(){
            if(this.comm.errands_comment==''){
                this.$message({
                        message: '请输入评价内容',
                        type: 'error'
                    })
                    return;
            }


            orderApi.errComment(this.comm,this.$route.params.id).then(res=>{
                if(res.data.flag){
                    this.$message({
                        message: '评价成功',
                        type: 'success'
                    })
                    
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
       
            })
        }
    }

};
</script>
