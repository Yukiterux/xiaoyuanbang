<template>
  <div>
    <el-container>
      <el-aside :style="{'width':isCollapse?'80px':'210px'}">
        <el-menu
          :default-active="activeIndex"
          :unique-opened="true"
          @open="handleOpen"
          @close="handleClose"
          @select="select"
          :collapse="isCollapse"
          router
        >
          <el-menu-item
            :index="child1.url"
            v-for="child1 in menuList"
            :key="child1.id"
            v-if="!child1.childNode"
          >
            <i :class="child1.iconCls"></i>
            <span sloe="title">{{child1.name}}</span>
          </el-menu-item>
          <el-submenu
            :index="child1.url"
            v-for="child1 in menuList"
            :key="child1.id"
            v-if="child1.childNode"
          >
            <el-menu-item
              :index="child2.url"
              :key="child2.id"
              v-for="child2 in child1.childNode"
              v-if="!child2.childNode"
            >
              <i :class="child2.iconCls"></i>
              <span sloe="title">{{child2.name}}</span>
            </el-menu-item>
            <template slot="title" v-if="child1.childNode">
              <i :class="child1.iconCls"></i>
              <span sloe="title">{{child1.name}}</span>
            </template>
            <!-- 二级有子节点-->
            <el-submenu
              :index="child2.url"
              v-for="child2 in child1.childNode"
              v-if="child2.childNode"
              :key="child2.id"
            >
              <template slot="title">
                <i :class="child2.iconCls"></i>
                <span sloe="title">{{child2.name}}</span>
              </template>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header :style="{'padding-left':isCollapse?'0px':'20px'}">
          <hamburger
            :is-active="!isCollapse"
            class="hamburger-container"
            @toggleClick="isCollapse=!isCollapse"
          />

          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="breadcrumbPath" v-if="breadcrumbPath!=''">{{breadcrumbName}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="breadcrumbPath2" v-if="breadcrumbPath2!=''">{{breadcrumbName2}}</el-breadcrumb-item>
          </el-breadcrumb>
       
          <div class="right-menu">
                <div class="adminName" >欢迎您,<a>{{user.name}}</a></div>
            <el-dropdown class="avatar-container" trigger="hover">
              <el-avatar :src="user.avatar"></el-avatar>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link to="/">
                  <el-dropdown-item>首页</el-dropdown-item>
                </router-link>
                <router-link to="/admin/profile">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                  <span style="display:block;" @click="logout">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main :style="{'padding-left':isCollapse?'15px':'35px'}">
           
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import hamburger from "@/components/Hamburger";

import Auth from '@/utils/auth'
import dzdm from "./dzdm.json";
export default {
    middleware:'adminAuth',
  components: {
    Breadcrumb,
    hamburger
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.activeIndex = this.$route.path;
        this.select(val.path);
        console.log(val);
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.user = Auth.getUser();
},     
  data() {
    return {
      isCollapse: false,
      menuList: dzdm.dzdm,
      breadcrumbPath: "",
      breadcrumbName: "",
      breadcrumbPath2: "",
      breadcrumbName2: "",
      activeIndex: this.$route.path,
      user: {}
    };
  },
  methods: {
    logout(){
      Auth.removeUser(),
      location.href='/'
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    select(index) {
      let arr = index.split("/");
      console.log(arr);
      if (arr.length == 3) {
        for (let i = 0; i < this.menuList.length; i++) {
          if (this.menuList[i].url == index) {
            this.breadcrumbPath = this.menuList[i].url;
            this.breadcrumbName = this.menuList[i].name;
            this.breadcrumbPath2 = "";
            this.breadcrumbName2 = "";
            console.log(this.menuList[i].url + this.menuList[i].name);
          }
        }
      } else if (arr.length == 4) {
        for (let i = 0; i < this.menuList.length; i++) {
          if (
            this.menuList[i].url == index.substring(0, index.lastIndexOf("/"))
          ) {
            this.breadcrumbPath = this.menuList[i].url;
            this.breadcrumbName = this.menuList[i].name;
            console.log(this.menuList[i].childNode.length);
            for (let j = 0; j < this.menuList[i].childNode.length; j++) {
              console.log(this.menuList[i].childNode[j]);
              if (this.menuList[i].childNode[j].url == index) {
                this.breadcrumbPath2 = this.menuList[i].childNode[j].url;
                this.breadcrumbName2 = this.menuList[i].childNode[j].name;
                console.log(this.menuList[i].url + this.menuList[i].name);
              }
            }
          }
        }
      } else if (arr.length == 2) {
        this.breadcrumbPath = "";
        this.breadcrumbName = "";
        this.breadcrumbPath2 = "";
        this.breadcrumbName2 = "";
      }
    }
  }
};
</script>
<style>
body {
  margin: 0px;
  overflow-x: hidden;
}
.el-avatar{
    margin-top: 10px
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}
.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
.adminName {
    
    display: inline-block;
      margin-right: 40px;;
  line-height: 50px;
vertical-align: text-bottom;
}
.right-menu {
  float: right;
  margin-right: 50px;;
  height: 100%;
  line-height: 50px;
}
.right-menu:focus {
  outline: none;
}

.right-menu-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: #5a5e66;
  vertical-align: top;
}
</style>