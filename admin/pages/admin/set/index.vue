<template>
  <div style="margin-left:40%">
    <el-button type="primary" @click="jump()">首页轮播图设置</el-button>
    
  </div>
</template>

<script>
export default {
  methods:{
    jump(){
      location.href="/admin/set/setIndex"
    }
  }
}
</script>

<style >
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>