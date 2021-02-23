<template>
  <div v-cloak>
    <header>
      <el-menu
        @select="handleSelect"
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#40BFFF"
        style="background-color:#f5f5f5"
      >
        <el-menu-item
          index="/"
          style="margin-left:180px;background-color:#f5f5f5"
        >首页</el-menu-item>
        <el-menu-item
          index="/order/addOrder"
          style="background-color:#f5f5f5"
        >在线下单</el-menu-item>
        <el-menu-item
          index="/order/requestOrder"
          style="background-color:#f5f5f5"
        >需求列表</el-menu-item>
        <el-menu-item
          v-show="user.name===undefined"
          index="/login"
          style="float:right;margin-right:180px;background-color:#f5f5f5"
        >注册</el-menu-item>
        <el-menu-item
          v-show="user.name===undefined"
          index="/login"
          style="float:right;background-color:#f5f5f5"
        >登录</el-menu-item>

        <el-menu-item
          style="float:right;margin-right:180px;background-color:#f5f5f5"
          v-show="user.name!=undefined"
        >
          <el-dropdown>

            <el-avatar :src="user.avatar"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <a @click="info">个人信息</a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a @click="orderPlaced"> 我的下单</a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a @click="acceptOrder">我的接单</a>
              </el-dropdown-item>
              <el-dropdown-item><a @click="logout">退出登陆</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item
          style="color:#ff;float:right;marigin:0;background-color:#f5f5f5"
          v-show="user.name!=undefined"
        ><p>{{user.name}}</p></el-menu-item>
      </el-menu>

    </header>
    <nuxt />
    <footer>
      <div>
        <div class="footer">
          <div class="wrapper">
            <div class="footer-bottom">
              <div class="link">
                <dl>
                  <dt>关于我们</dt>
                  <dd>校园帮介绍</dd>
                  <dd>服务条款</dd>
                  <dd>帮助中心</dd>

                </dl>
                <dl>
                  <dt>意见反馈</dt>
                  <dd>如何下单</dd>
                  <dd>如何接单</dd>
                </dl>
                <dl>
                  <dt>联系客服</dt>
                  <dd>客服电话</dd>
                  <dd>客服邮箱</dd>
                  <dd>工作时间</dd>
                </dl>
                <dl>
                  <dt>关注我们</dt>
                  <dd>微博</dd>
                  <dd>twitter</dd>
                </dl>

                <div class="xuke">
                  <h3>内容许可</h3>

                  <p>本站由 校园帮 提供更新服务</p>
                </div>
              </div>

              <p class="Copyright">Copyright © 2019 校园帮 当前版本 0.0.1</p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import '~/assets/plugins/normalize-css/normalize.css'
import '~/assets/plugins/yui/cssgrids-min.css'
import '~/assets/plugins/sui/sui.min.css'
import '~/assets/plugins/sui/sui-append.min.css'
import '~/assets/plugins/font-awesome/css/font-awesome.min.css'
import '~/assets/css/widget-base.css'
import '~/assets/css/widget-head-foot.css'
import Auth from '@/utils/auth'
export default {
  data(){
    return {
      activeIndex2: '1',
      user:{}
    }
  },
  created(){
    this.user=Auth.getUser()
  },
  methods:{
    logout(){
      Auth.removeUser(),
      location.href='/'
    },
    
    info(){
    location.href='/user/info'
    },
    orderPlaced(){
    location.href='/user/order/orderPlaced'
    },
    acceptOrder(){
    location.href='/user/order/acceptOrder'
    },
    jumpuser(){
    location.href='/user/info'
    },
    handleSelect(key, keyPath) {
   this.$router.push({
        path: key,
        params: {data: 'query' }
      })
}
  }
}
</script>



<style>
  
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .round_icon{
  width: 50px;
  height: 50px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}


  a{
    text-decoration:none;color:black
  }
  a:hover{
    text-decoration:none;color:#409EFF
  }

 [v-cloak] {
            display: none !important;
        }
</style>