<template>
    <div>
    <el-row class="tac" style="margin-left:180px;background-color:#f5f5f5">
    <el-col :span="4" >
    
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
     style="background-color:#f5f5f5"
     router
      >
    
       <el-menu-item index="/order/addOrder/buyOrder">
        <i class="el-icon-menu"></i>
        <span slot="title">帮我买东西</span>
      </el-menu-item>
      <el-menu-item index="/order/addOrder/sendOrder">
        <i class="el-icon-menu"></i>
        <span slot="title">帮我送东西</span>
      </el-menu-item>
      <el-menu-item index="/order/addOrder/takeOrder" >
        <i class="el-icon-document"></i>
        <span slot="title">帮我取东西</span>
      </el-menu-item>
      <el-menu-item index="/order/addOrder/queueOrder">
        <i class="el-icon-setting"></i>
        <span slot="title">帮我排队</span>
      </el-menu-item>
      <el-menu-item index="/order/addOrder/otherOrder">
        <i class="el-icon-setting"></i>
        <span slot="title">万能帮</span>
      </el-menu-item>
    </el-menu>
</el-col>
    <el-col :span="18" >
          <nuxt-child/>
      </el-col>
</el-row>

    </div>
</template>
<script>
export default {
     created:function(){
      this.$router.push('/order/addOrder/buyOrder'); 
    },
    data() {
      return {
        activeIndex: "/order/addOrder/buyOrder"
      };
    }
}
</script>
