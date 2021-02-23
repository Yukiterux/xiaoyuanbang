<template>
    <div >
<el-container >
<el-aside width="200px">
  <!-- <el-row class="tac" style="margin-left:180px;background-color:#f5f5f5" height="888"> -->
    <!-- <el-col :span="4" > -->

    <el-menu
     :default-active="$route.path"
      class="el-menu-vertical-demo"
      style="background-color:#f5f5f5"
       router>
      <el-submenu index="/user/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的订单</span>
        </template>
        <el-menu-item-group>
     <!-- <el-menu-item index="/user/order/allOrder">所有订单</el-menu-item> -->
          <el-menu-item index="/user/order/orderPlaced">我的下单</el-menu-item>
          <el-menu-item index="/user/order/acceptOrder">我的接单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/user/info">
        <i class="el-icon-menu"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
 <el-submenu index="/user/comment">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的评价</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user/comment/errands">配送员评价</el-menu-item>
          <el-menu-item index="/user/comment/user">用户评价</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-aside>
  <!-- </el-col> -->
    <el-main >
<nuxt-child />
  </el-main >
<!-- </el-row> -->
</el-container>

</div>
</template>
<script>
export default {
    
}
</script>

