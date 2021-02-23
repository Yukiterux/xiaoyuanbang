<template>
  <div>
      {{user}}
      <el-form
      label-width="180px"
    >
      <el-form-item label="已绑定手机号">
        {{user.mobile}}
      </el-form-item>
<el-form-item label="请输入短信验证码">
       <el-input
                        placeholder="短信验证码"
                        v-model="code" class="mymargin">
                        <el-button slot="append"  class="mymargin"  @click="sendsms()">获取短信验证码</el-button>
                    </el-input>
      </el-form-item>
<el-form-item label="点击进行下一步">
       <el-button type="primary" style="float:left;" @click.prevent="next()">下一步</el-button>
      </el-form-item>
    
      </el-form>


  </div>
</template>


<script>
import userApi from "~/api/user.js";
export default {
created() {
      userApi.info().then(res=> {
        this.user = res.data.data;
      });
  },
  data() {
    return {
      user: {},
      code:"",
    };
  },
  methods:{
   sendsms(){
            userApi.sendChange1Sms(this.user.mobile).then(res=>{
                if(res.data.flag){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    })
        
                }else{
                    this.$message({
                        message: "发送短信验证码失败",
                        type: 'error'
                    })
                }
            })
   },
   next(){
      userApi.changeNum1(this.user,this.code).then(res=>{
                if(res.data.flag){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    })
                    location.href='/user/info/changeNum2/'
        
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            })
   }
   }
  
}
</script>

<style>

</style>



