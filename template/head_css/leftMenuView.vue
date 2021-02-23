<template>
  <div class="fn-clear">
    <!-- 头部开始 -->
    <!--<res-header :mode="nightMode"></res-header>-->
    <!-- 头部结束 -->
    <!-- 左侧菜单开始 -->
    <div class="left-menu">
      <div class="sidebar" :class="classObject">
        <ul class="sidebar-list">
          <li :key="item.id" v-for="(item,index) in sidebarList" @mouseover="menuMoseover(item,index)"
              @mouseout="menuMoseout(item,index)">
            <!-- 左侧菜单一级菜单开始 -->
            <div class="first-menu fn-clear" :class="{active:firstMenuCur===index}" @click="firstMenuTab(item,index)" @mouseover="addIconHover($event, item.iconName)" @mouseout="removeIconHover($event, item.iconName)">
              <span v-if="item.iconName" class="left-icon"><i :class="['icons', item.iconName]"></i></span>
              <span v-if="item.iconName === null" class="left-icon"><i :class="['left-icon'+index,{'packup-active':packupSide&&packupSideAct===index}]"></i></span>
              <span class="menu-name" :class="{'night-state':nightMode}">{{item.firstMenu}}</span>
              <span class="msg-noreminder" v-show="!item.msgReminder"></span>
              <span class="msg-reminder" v-show="item.msgReminder">{{item.msgReminder}}</span>
              <i class="pull-arrow" :class="{active3:secondMenuShow===index}"></i>
            </div>
            <!-- 左侧菜单一级菜单结束 -->
            <!-- 左侧菜单没有二级菜单时收起时hover效果开始 -->
            <dl class="first-menu2" v-show="packupSide&&!item.secondMenuList&&menuPackupHover===index">
              <dt @click="firstMenuTab(item,index)"><span>{{item.firstMenu}}</span></dt>
            </dl>
            <!-- 左侧菜单没有二级菜单时收起时hover效果结束 -->
            <!-- 左侧菜单展开状态二级菜单开始 -->
            <dl class="second-menu" v-show="secondMenuShow===index">
              <dt :key="it.id" v-for="(it,i) in item.secondMenuList"
                  :class="{'night-state':nightMode,active:secondMenuCur===i}" @click="secondMenuTab(it,i)"><i></i><span>{{it.menuText}}</span>
              </dt>
            </dl>
            <!-- 左侧菜单展开状态二级菜单结束 -->
            <!-- 左侧菜单收起状态二级菜单开始 -->
            <dl class="second-menu2" v-show="packupSide&&menuPackupHover===index">
              <dt :key="it.id" v-for="(it,i) in item.secondMenuList" @click="secondMenuTab(it,i,index)">
                {{it.menuText}}
              </dt>
            </dl>
            <!-- 左侧菜单收起状态二级菜单结束 -->
          </li>
        </ul>
        <!-- 左侧菜单展开收起按钮开始 -->
        <i class="simple-sidebar" :class="packupObject" @click="packupSideTab"></i>
        <!-- 左侧菜单展开收起按钮结束 -->
        <!-- 白天夜间模式切换开始 -->
        <div class="module-tab" :class="{active:nightMode,'self-width':packupSide}" @click="nightMode=!nightMode">
          <i></i><span>{{nightMode?'白天模式':'夜间模式'}}</span></div>
        <!-- 白天夜间模式切换结束 -->
      </div>
    </div>
    <!-- 左侧菜单结束 -->
    <!-- 右侧内容开始 -->
    <div class="right-content" :class="{active:packupSide}">
      <bread-crumb :crumbName="crumbName"></bread-crumb>
      <transition name="fade" enter-active-class="fadeIn" leave-active-class="fadeOut">
          <router-view :menuWidth='menuWidth'></router-view>
      </transition>
    </div>
    <!-- 右侧内容结束 -->
  </div>
</template>
<script>
  // 头部
  import ResHeader from '@/components/pages/resourcecolumn/ResHeader';
  // 首页
  import HomePage from '@/components/pages/resourcecolumn/rightpages/HomePage';
  // 面包屑
  import BreadCrumb from '@/components/pages/resourcecolumn/breadcrumb'
  // 资源目录
  import ResourceCol from '@/components/pages/resourcecolumn/rightpages/ResourceCol';
  // 目录注册
  import ColRegister from '@/components/pages/resourcecolumn/rightpages/ColRegister';
  // 目录审核
  import ColAudit from '@/components/pages/resourcecolumn/rightpages/ColAudit';

  import {saveParames, getMenuLocation, getMenu} from '@/api/support/buildMenu'

  export default {
    components: {
      ResHeader,
      HomePage,
      ResourceCol,
      ColRegister,
      ColAudit,
      BreadCrumb
    },
    data() {
      return {
        nightMode: false, // 左侧菜单夜间模式
        firstMenuCur: 0, // 一级菜单当前位置
        secondMenuShow: '', // 显示二级菜单
        secondMenuCur: 0, // 二级菜单当前位置
        packupSide: false, // 左侧菜单收起
        packupIndex: 0, // 左侧菜单收起时展示二级菜单的一级菜单索引
        menuPackupHover: '', // 二级菜单隐藏时菜单hover效果
        packupSideAct: 0, // 菜单收起时切换效果
        menuWidth: '', // 左侧菜单的宽度
        crumbName: '', // 当前位置
        // 左侧菜单栏数据
        sidebarList: []
      };
    },
    created: function () {
      this.getMenuList()
    },
    mounted() {
      this.menuAutoHide();
      this.menuScroll();
    },
    computed: {
      // 左侧菜单模式及菜单收起
      classObject() {
        return {
          active: this.nightMode,
          'hide-menu': this.packupSide
        };
      },
      // 左侧菜单栏收起展开按钮样式
      packupObject() {
        return {
          night: this.nightMode === true,
          'night-active': this.nightMode && this.packupSide,
          'day-active': !this.nightMode && this.packupSide
        };
      }
    },
    methods: {
      addIconHover(e, iconName) {
        $(e.currentTarget).find('.icons').removeClass(iconName).addClass(iconName + '-hover')
      },
      removeIconHover(e, iconName) {
        $(e.currentTarget).find('.icons').removeClass(iconName + '-hover').addClass(iconName)
      },
      // 获取菜单列表
      getMenuList() {
        // 进入模块前加载菜单
        // this.sidebarList = JSON.parse(sessionStorage.getItem('menu'))
        let location = {}
        try {
          // '1' 代表从first界面跳转至菜单，'2'代表浏览器刷新或浏览器地址栏输入跳转至菜单
          let entresFlag = sessionStorage.getItem('routeEntresFlag')
          if (entresFlag == '1') {
            this.sidebarList = JSON.parse(sessionStorage.getItem('menuList'))
          } else {
            this.sidebarList = getMenu(this.$route.path)
          }
          entresFlag = '2'
          sessionStorage.setItem('routeEntresFlag', entresFlag)

          if (this.sidebarList == null || this.sidebarList.length == 0) {
            this.$message({
              message: '该模块下暂无内容！',
              type: 'warning '
            })
            this.$router.push({path: '/first'});
          } else {
            location = getMenuLocation(this.$route.path, this.sidebarList)
          }
        } catch (e) {
          this.$message({
            message: '菜单加载异常，请重新操作！',
            type: 'warning '
          })
          this.$router.push({path: '/first'});
        }

        if (location.flag) {
          this.secondMenuShow = location.secondMenuShow
          this.secondMenuCur = location.secondMenuCur
        } else {
          if (this.sidebarList.length > 0) {
            if (this.sidebarList[0].url) {
              saveParames(this.sidebarList[0])
              this.$router.push({path: this.sidebarList[0].url});
            } else {
              saveParames(this.sidebarList[0].secondMenuList[0])
              this.$router.push({path: this.sidebarList[0].secondMenuList[0].url});
              this.secondMenuShow = 0;
              this.secondMenuCur = 0;
            }
          }
        }
      },
      // 分辨率小于1300时菜单默认收起
      menuAutoHide() {
        let w = window.innerWidth;
        if (w <= 1300) {
          this.packupSide = true;
        }
      },
      // 一级菜单右侧内容切换
      firstMenuTab(item, index) {
        this.firstMenuCur = index;
        this.secondMenuShow = index;
        this.packupIndex = index;

        // 一级菜单展开后默认展示二级菜单第一条内容
        if (item.url) {
          saveParames(item)
          sessionStorage.setItem('btnAuthor', item.authorityId);
          this.$store.commit('setBtnAuthor', item.authorityId);
          this.$router.replace({path: item.url});
        } else {
          saveParames(item.secondMenuList[0])
          this.secondMenuCur = 0;
          sessionStorage.setItem('btnAuthor', item.secondMenuList[0].authorityId);
          this.$store.commit('setBtnAuthor', item.secondMenuList[0].authorityId);
          this.$router.replace({path: item.secondMenuList[0].url});
        }
        // 菜单收起后左侧菜单切换效果
        if (this.packupSide) {
          this.packupSideAct = index
        } else {
          this.packupSideAct = ''
        }
      },
      // 一级菜单hover效果
      menuMoseover(item, index) {
        this.menuPackupHover = index;
      },
      menuMoseout(item, index) {
        this.menuPackupHover = '';
      },
      // 二级菜单右侧内容切换
      secondMenuTab(it, i, firstMenuIndex) {
        // 给面包屑赋值
        this.crumbName = it.menuText
        this.secondMenuCur = i;
        this.packupSide ? (this.packupSideAct = firstMenuIndex) : (this.packupSideAct = 0);
        sessionStorage.setItem('btnAuthor', it.authorityId);
        sessionStorage.setItem('crumbName', it.menuText);
        this.$store.commit('setBtnAuthor', it.authorityId);
        saveParames(it)
        this.$router.replace(it.url);
      },
      // 左侧菜展开与收起
      packupSideTab() {
        this.packupSide = !this.packupSide;
        this.menuWidth = document.getElementsByClassName('sidebar-list')[0].offsetWidth;
      },
      // 左侧菜单滚动条
      menuScroll() {
        let h = window.innerHeight - 120;
        document.getElementsByClassName('sidebar-list')[0].style.height = h + 'px';
      }
    }
  };
</script>
<style lang="scss" scoped>
  .left-menu {
    top: 0px;
    position: fixed;
    bottom: 0;
    z-index: 999;
  }

  .sidebar {
    height: 100%;
    min-height: 786px;
    background: #fff;
    position: relative;

    &.active {
      background: #363d43;
    }

    &.hide-menu {
      .first-menu {
        .menu-name,
        .pull-arrow,
        .msg-reminder,
        .msg-noreminder {
          display: none !important;
        }

        &:hover {
          i {
            transition: all 0.6s;
            -webkit-transform: scale(1.2);
            -moz-transform: scale(1.2);
            -o-transform: scale(1.2);
            transform: scale(1.2);
          }
        }
      }

      .second-menu,
      .module-tab span {
        display: none !important;
      }
    }

    // .sidebar-list{
    //   overflow-y: scroll;
    // }
    .sidebar-list {
      background: url(../assets/img/icon/nav-bg@2x.png) no-repeat top;
      background-size: 100% auto;
    }

    .sidebar-list li {
      position: relative;

      .second-menu2,
      .first-menu2 {
        position: absolute;
        top: 15px;
        right: -188px;
        box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.5);
        z-index: 999;

        dt {
          width: 188px;
          height: 44px;
          line-height: 44px;
          text-align: left;
          font-size: 18px;
          text-indent: 10px;
          background: #fff;
          cursor: pointer;

          &:hover {
            background: #3a9dff;
            color: #fff;
          }

          &.active {
            background: #f2fafe;
          }
        }
      }
    }

    .first-menu {
      height: 60px;
      line-height: 60px;
      padding: 0 10px;
      font-size: 0;
      cursor: pointer;

      i,
      span {
        display: inline-block;
        vertical-align: middle;
      }

      .left-icon {
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        .icon1 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon1.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon2 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon2.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon3 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon3.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon4 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon4.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon5 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon5.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon6 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon6.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon7 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon7.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon8 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon8.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon9 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon9.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon10 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon10.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon11 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon11.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon12 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon12.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon13 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon13.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon14 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon14.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon15 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon15.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon16 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon16.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon17 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon17.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon18 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon18.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon19 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon19.png) no-repeat;
          background-size: 100% 100%;
        }.icon20 {
           width: 24px;
           height: 23px;
           background: url(../assets/img/menu-icon/icon20.png) no-repeat;
           background-size: 100% 100%;
         }
        .icon21 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon21.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon22 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon22.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon23 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon23.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon24 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon24.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon25 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon25.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon26 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon26.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon27 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon27.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon28 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon28.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon29 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon29.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon30 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon30.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon31 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon31.png) no-repeat;
          background-size: 100% 100%;
        }.icon32 {
           width: 24px;
           height: 23px;
           background: url(../assets/img/menu-icon/icon32.png) no-repeat;
           background-size: 100% 100%;
         }
        .icon33 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon33.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon34 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon34.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon35 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon35.png) no-repeat;
          background-size: 100% 100%;
        }.icon36 {
           width: 24px;
           height: 23px;
           background: url(../assets/img/menu-icon/icon36.png) no-repeat;
           background-size: 100% 100%;
         }
        .icon37 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon37.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon38 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon38.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon39 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon39.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon40 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon40.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon41 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon41.png) no-repeat;
          background-size: 100% 100%;
        }.icon42 {
           width: 24px;
           height: 23px;
           background: url(../assets/img/menu-icon/icon42.png) no-repeat;
           background-size: 100% 100%;
         }
        .icon43 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon43.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon44 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon44.png) no-repeat;
          background-size: 100% 100%;
        }.icon45 {
           width: 24px;
           height: 23px;
           background: url(../assets/img/menu-icon/icon45.png) no-repeat;
           background-size: 100% 100%;
         }
        .icon46 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon46.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon47 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon47.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon48 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon48.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon49 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon49.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon50 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon50.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon1-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon1-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon2-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon2-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon3-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon3-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon4-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon4-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon5-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon5-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon6-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon6-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon7-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon7-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon8-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon8-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon9-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon9-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon10-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon10-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon11-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon11-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon12-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon12-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon13-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon13-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon14-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon14-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon15-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon15-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon16-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon16-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon17-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon17-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon18-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon18-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon19-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon19-hover.png) no-repeat;
          background-size: 100% 100%;
        }.icon20-hover {
           width: 24px;
           height: 23px;
           background: url(../assets/img/menu-icon/icon20-hover.png) no-repeat;
           background-size: 100% 100%;
         }
        .icon21-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon21-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon22-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon22-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon23-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon23-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon24-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon24-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon25-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon25-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon26-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon26-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon27-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon27-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon28-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon28-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon29-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon29-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon30-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon30-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon31-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon31-hover.png) no-repeat;
          background-size: 100% 100%;
        }.icon32-hover {
           width: 24px;
           height: 23px;
           background: url(../assets/img/menu-icon/icon32-hover.png) no-repeat;
           background-size: 100% 100%;
         }
        .icon33-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon33-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon34-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon34-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon35-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon35-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon36-hover {
           width: 24px;
           height: 23px;
           background: url(../assets/img/menu-icon/icon36-hover.png) no-repeat;
           background-size: 100% 100%;
         }
        .icon37-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon37-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon38-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon38-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon39-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon39-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon40-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon40-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon41-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon41-hover.png) no-repeat;
          background-size: 100% 100%;
        }.icon42-hover {
           width: 24px;
           height: 23px;
           background: url(../assets/img/menu-icon/icon42-hover.png) no-repeat;
           background-size: 100% 100%;
         }
        .icon43-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon43-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon44-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon44-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon45-hover {
           width: 24px;
           height: 23px;
           background: url(../assets/img/menu-icon/icon45-hover.png) no-repeat;
           background-size: 100% 100%;
         }
        .icon46-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon46-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon47-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon47-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon48-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon48-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon49-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon49-hover.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon50-hover {
          width: 24px;
          height: 23px;
          background: url(../assets/img/menu-icon/icon50-hover.png) no-repeat;
          background-size: 100% 100%;
        }

        .left-icon0 {
          width: 24px;
          height: 23px;
          background: url(../assets/img/icon/home-nor-icon@2x.png) no-repeat;
          background-size: 100% 100%;

          &.packup-active {
            background: url(../assets/img/icon/home-hov-icon@2x.png) no-repeat;
            background-size: 100% 100%;
          }
        }

        .left-icon1 {
          width: 20px;
          height: 22px;
          background: url(../assets/img/icon/talog-nor-icon1@2x.png) no-repeat;
          background-size: 100% 100%;

          &.packup-active {
            background: url(../assets/img/icon/catalog-hov-icon@2x.png) no-repeat;
            background-size: 100% 100%;
          }
        }

        .left-icon2 {
          width: 24px;
          height: 24px;
          background: url(../assets/img/icon/catalog-nor-icon1@2x.png) no-repeat;
          background-size: 100% 100%;

          &.packup-active {
            background: url(../assets/img/icon/ement-hov-icon@2x.png) no-repeat;
            background-size: 100% 100%;
          }
        }

        .left-icon3 {
          width: 14px;
          height: 24px;
          background: url(../assets/img/icon/ices-nor-icon@2x.png) no-repeat;
          background-size: 100% 100%;

          &.packup-active {
            background: url(../assets/img/icon/vices-hov-icon@2x.png) no-repeat;
            background-size: 100% 100%;
          }
        }

        .left-icon4 {
          width: 24px;
          height: 24px;
          background: url(../assets/img/icon/gement-hov-icon@2x.png) no-repeat;
          background-size: 100% 100%;

          &.packup-active {
            background: url(../assets/img/icon/Cgement-hov-icon1@2x.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }

      .menu-name {
        width: 135px;
        font-size: 16px;
        color: #333;
        text-align: left;
        text-indent: 0.5em;
        /*padding-right: 35px;*/
        &.night-state {
          color: #fff;
        }
      }

      .pull-arrow,
      .msg-reminder,
      .msg-noreminder {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
      }

      .msg-reminder,
      .msg-noreminder {
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #fff;
        background: #ff2500;
        border-radius: 8px;
        //  margin-right: 20px;
      }

      .msg-noreminder {
        background: transparent;
      }

      .pull-arrow {
        width: 6px;
        height: 11px;
        background: url(../assets/img/icon/nor-icon@2x.png) no-repeat;
        background-size: 100% 100%;
        margin-right: 0;

        &.active2 {
          background: url(../assets/img/icon/nor-icon1@2x.png) no-repeat !important;
          background-size: 100% 100% !important;
        }

        &.active3 {
          width: 11px;
          height: 6px;
          background: url(../assets/img/icon/hov-icon1@2x.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
      }

      &:hover {
        .iconStyle {
          color: #007bec !important;
        }

        .left-icon0 {
          background: url(../assets/img/icon/home-hov-icon.png) no-repeat;
          background-size: 100% 100%;
        }

        .left-icon1 {
          background: url(../assets/img/icon/catalog-hov-icon@2x.png) no-repeat;
          background-size: 100% 100%;
        }

        .left-icon2 {
          background: url(../assets/img/icon/ement-hov-icon@2x.png) no-repeat;
          background-size: 100% 100%;
        }

        .left-icon3 {
          background: url(../assets/img/icon/vices-hov-icon@2x.png) no-repeat;
          background-size: 100% 100%;
        }

        .left-icon4 {
          background: url(../assets/img/icon/Cgement-hov-icon1@2x.png) no-repeat;
          background-size: 100% 100%;
        }

        .menu-name {
          color: #007bec;
          font-weight: bold;
          // transition: all 0.6s;
          // -webkit-transform: scale(1.2);
          // -moz-transform: scale(1.2);
          // -o-transform: scale(1.2);
          // transform: scale(1.2);
        }

        .pull-arrow {
          background: url(../assets/img/icon/hov-icon.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }

    .second-menu {
      margin-left: 15px;
      text-align: left;

      dt {
        height: 20px;
        line-height: 20px;
        padding-left: 32px;
        margin-bottom: 20px;
        font-size: 0;
        cursor: pointer;

        &.active,
        &:hover {
          i {
            background: #3a9dff !important;
          }

          span {
            color: #3a9dff !important;
          }
        }

        &.night-state {
          i {
            background: #fff;
          }

          span {
            color: #fff;
          }
        }

        i,
        span {
          display: inline-block;
          vertical-align: middle;
        }

        i {
          width: 6px;
          height: 6px;
          background: #999999;
          border-radius: 3px;
        }

        span {
          font-size: 16px;
          color: #333;
          margin-left: 6px;
        }
      }

      dt:last-child {
        margin-bottom: 0;
      }
    }

    .module-tab {
      position: fixed;
      width: 162px;
      bottom: 25px;
      text-align: center;
      font-size: 0;

      &.self-width {
        width: 44px;
      }

      cursor: pointer;

      i,
      span {
        display: inline-block;
        vertical-align: middle;
      }

      i {
        width: 16px;
        height: 16px;
        background: url(../assets/img/icon/pattern-icon@2x.png) no-repeat;
        background-size: 100% 100%;
      }

      span {
        font-size: 12px;
        color: #007bec;
        margin-left: 8px;
      }

      &.active {
        i {
          width: 19px;
          height: 19px;
          background: url(../assets/img/icon/DayMode-icon@2x.png) no-repeat;
          background-size: 100% 100%;
        }

        span {
          color: #fff;
        }
      }
    }

    .simple-sidebar {
      position: absolute;
      width: 17px;
      height: 43px;
      background: url(../assets/img/icon/Take-up-1@2x.png) no-repeat;
      background-size: 100% 100%;
      top: 50%;
      margin-top: -22px;
      right: -17px;
      cursor: pointer;
      z-index: 999;

      &.day-active {
        background: url(../assets/img/icon/down-1@2x.png) no-repeat;
        background-size: 100% 100%;
      }
    }

    .night {
      background: url(../assets/img/icon/Take-up-2@2x.png) no-repeat;
      background-size: 100% 100%;

      &.night-active {
        background: url(../assets/img/icon/down-2@2x.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .right-content {
    margin-left: 220px;
    margin-top: 0px;

    &.active {
      margin-left: 70px;
    }
  }
  /*.animated{*/
  /*  animation-duration: 12s;*/
  /*}*/
</style>
