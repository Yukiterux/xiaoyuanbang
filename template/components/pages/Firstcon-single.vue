<style lang='scss'>
  .mainCons {
    .left-list {
      position: fixed;
      top: 50px;
      left: 0;
      bottom: 0;
      width: 217px;
      border: 1px solid rgba(155, 155, 155, 0.24);
      background: #fff;

      .message {
        height: 72px;
        background: url(../../assets/img/icon/image-back.png) no-repeat;
        background-size: 100% 100%;
      }

      .age-img {
        margin-top: 8px;
        margin-left: 23px;
        float: left;
        width: 56px;
        height: 56px;
        background: url(../../assets/img/icon/image-log.png) no-repeat;
        background-size: 100% 100%;
        border-radius: 56px;
      }

      .age-text {
        float: left;
        text-align: left;
        margin-left: 8px;
      }

      .name {
        margin-top: 13px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        line-height: 24px;
      }

      .list {
        line-height: 22px;
        font-size: 14px;
        color: #333;
      }

      .title {
        border-top: 1px solid rgba(155, 155, 155, 0.24);
        padding-top: 11px;
        text-align: left;
        font-size: 0;

        i,
        span {
          display: inline-block;
          vertical-align: middle;
        }

        i {
          margin: 0 8px 0 6px;
          width: 16px;
          height: 27px;
          background: url(../../assets/img/icon/enter-tit.png) no-repeat;
          background-size: 100% 100%;
        }

        span {
          font-size: 14px;
          color: #333;
          font-weight: bold;
        }
      }

      .tit-mar {
        margin-top: 12px;
      }
    }

    .list-col {
      padding: 0 2px;

      li {
        float: left;
        width: 50%;
        margin-top: 11px;
        text-align: center;
        cursor: pointer;
      }

      .icon {
        display: inline-block;
        width: 49px;
        height: 49px;
        -webkit-transition: all 360ms;
        -ms-transition: all 360ms;
        -moz-transition: all 360ms;
        -o-transition: all 360ms;
        transition: all 360ms;
      }

      p {
        -webkit-transition: all 360ms;
        -ms-transition: all 360ms;
        -moz-transition: all 360ms;
        -o-transition: all 360ms;
        transition: all 360ms;
      }

      .icon0 {
        background: url(../../assets/img/icon/nav-icon1.png) no-repeat center;
        background-size: 100% 100%;
      }

      .icon1 {
        background: url(../../assets/img/icon/nav-icon2.png) no-repeat center;
        background-size: 100% 100%;
      }

      .icon2 {
        background: url(../../assets/img/icon/nav-icon3.png) no-repeat center;
        background-size: 100% 100%;
      }

      .icon3 {
        background: url(../../assets/img/icon/nav-icon4.png) no-repeat center;
        background-size: 100% 100%;
      }

      .icon4 {
        background: url(../../assets/img/icon/nav-icon5.png) no-repeat center;
        background-size: 100% 100%;
      }

      .icon5 {
        background: url(../../assets/img/icon/nav-icon6.png) no-repeat center;
        background-size: 100% 100%;
      }

      li:hover {
        .icon,
        p {
          transform: translate3d(0, -3px, 0);
          -ms-transform: translate3d(0, -3px, 0);
          -moz-transform: translate3d(0, -3px, 0);
          -webkit-transform: translate3d(0, -3px, 0);
          -o-transform: translate3d(0, -3px, 0);
        }

        .icon0 {
          background: url(../../assets/img/icon/nav-iconh1.png) no-repeat center;
          background-size: 100% 100%;
        }

        .icon1 {
          background: url(../../assets/img/icon/nav-iconh2.png) no-repeat center;
          background-size: 100% 100%;
        }

        .icon2 {
          background: url(../../assets/img/icon/nav-iconh3.png) no-repeat center;
          background-size: 100% 100%;
        }

        .icon3 {
          background: url(../../assets/img/icon/nav-iconh4.png) no-repeat center;
          background-size: 100% 100%;
        }

        .icon4 {
          background: url(../../assets/img/icon/nav-iconh5.png) no-repeat center;
          background-size: 100% 100%;
        }

        .icon5 {
          background: url(../../assets/img/icon/nav-iconh6.png) no-repeat center;
          background-size: 100% 100%;
        }

        p {
          font-weight: bold;
          color: #3b92e3;
        }
      }

      em {
        font-family: "reducto_condensed_ssiCn";
        font-size: 26px;
        color: #333;
        font-style: normal;
      }

      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        color: #333;
      }

      .texts {
        margin-left: 4px;
        display: inline-block;
        vertical-align: middle;
        width: 10px;
        height: 12px;
        background: url(../../assets/img/icon/text-up.png) no-repeat;
        background-size: 100% 100%;
      }

      .text {
        background: url(../../assets/img/icon/text-down.png) no-repeat;
        background-size: 100% 100%;
      }

      .one {
        margin-top: 4px;
        transform: translateZ(0);
      }

      .two {
        height: 16px;
        line-height: 16px;
        margin-top: -4px;
      }
    }

    .left-tex {
      transition: all .5s ease-in-out;
      padding: 24px 70px 54px 70px;
      position: fixed;
      top: 60px;
      left: 217px;
      bottom: 0;
      right: 0;
      background: url(../../assets/img/icon/xiewen-bg.png) repeat;
      overflow-y: auto;
    }

    .let-lists {
      left: 0;
    }

    /* 平台首页V2 版本一 */
    .title-nav {
      box-shadow: 0px 0px 10px 0px rgba(219, 219, 219, 0.5);

      li {
        background: #f8f8f8;
        text-align: center;
        float: left;
        width: 14.286%;
        font-size: 0;
        height: 56px;
        line-height: 56px;
        border: 1px solid #e7e7e7;
        border-left: none;
        cursor: pointer;
        position: relative;

        i,
        span {
          display: inline-block;
          vertical-align: middle;
        }

        span {
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
      }

      li:first-child {
        border-left: 1px solid #e7e7e7;
      }

      .active {
        background: linear-gradient(
            152deg,
            rgba(3, 154, 255, 1) 0%,
            rgba(64, 210, 255, 1) 100%
        );
        border-bottom: 1px solid linear-gradient(
            152deg,
            rgba(3, 154, 255, 1) 0%,
            rgba(64, 210, 255, 1) 100%
        );

        /* i {
          width: 17px;
          height: 17px;
          background: url(../../assets/img/icon/yuan-tab.png) no-repeat;
        } */

        span {
          margin-left: 7px;
          color: #fff;
          text-shadow: 0px 1px 2px rgba(26, 105, 220, 1);
        }

        .jiao {
          position: absolute;
          bottom: -1px;
          left: 50%;
          margin-left: -6px;
          height: 0px;
          width: 0px;
          border-left: 8px solid transparent;
          border-bottom: 8px solid #fff;
          border-right: 8px solid transparent;
        }
      }
    }

    /* 平台首页V1 版本一 */
    .title-nav2 {
      box-shadow: none;
    }

    .content {
      box-shadow: 0px 0px 10px 0px rgba(219, 219, 219, 0.5);
      /*height: 590px;*/
      background: #fff;
      padding: 15px 54px 0 54px;
      border: 1px solid rgba(231, 231, 231, 1);
      border-top: none;
    }

    .col-text {
      margin: 0 -14px;

      li {
        float: left;
        width: 25%;
      }

      .text-lists {
        text-align: center;
        margin: 0 14px;
        margin-top: 30px;
        height: 227px;
        background: rgba(248, 248, 248, 1);
        border-radius: 11px;
        border: 1px solid rgba(227, 227, 227, 1);

        i {
          display: inline-block;
          width: 99px;
          height: 99px;
          background: url(../../assets/img/icon/enter-hui.png) no-repeat;
          background-size: 100% 100%;
          margin-top: 31px;
        }

        p {
          margin-top: 34px;
          line-height: 24px;
          font-size: 18px;
          color: #333;
        }

        span {
          font-size: 0;
        }
      }

      .ctive {
        background: #fff;
        border: 1px solid rgba(215, 215, 215, 1);
        -webkit-transition: all 360ms;
        -ms-transition: all 360ms;
        -moz-transition: all 360ms;
        -o-transition: all 360ms;
        transition: all 360ms;

        i {
          background: url(../../assets/img/icon/enter-acti.png) no-repeat;
          background-size: 100% 100%;
          -webkit-transition: all 360ms;
          -ms-transition: all 360ms;
          -moz-transition: all 360ms;
          -o-transition: all 360ms;
          transition: all 360ms;
        }

        span {
          -webkit-transition: all 360ms;
          -ms-transition: all 360ms;
          -moz-transition: all 360ms;
          -o-transition: all 360ms;
          transition: all 360ms;
        }
      }

      .ctive:hover {
        border-color: #dedddd;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        transform: translate3d(0, -3px, 0);
        -ms-transform: translate3d(0, -3px, 0);
        -moz-transform: translate3d(0, -3px, 0);
        -webkit-transform: translate3d(0, -3px, 0);
        -o-transform: translate3d(0, -3px, 0);

        i {
          display: inline-block;
          width: 59px;
          height: 63px;
          background: url(../../assets/img/icon/source-icon1.png) no-repeat;
          background-size: 100% 100%;
          margin-top: 40px;
        }

        p {
          margin-top: 13px;
          line-height: 24px;
          font-size: 18px;
          color: #333;
        }

        span {
          margin-top: 30px;
          cursor: pointer;
          display: inline-block;
          width: 123px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          background: linear-gradient(
              152deg,
              rgba(3, 154, 255, 1) 0%,
              rgba(64, 210, 255, 1) 100%
          );
          border-radius: 5px;
          font-size: 14px;
          color: #fff;
        }
      }
    }

    .ivu-tabs-nav {
      width: 100%;
      box-shadow: 0px 0px 10px 0px rgba(219, 219, 219, 0.5);
    }

    .ivu-tabs-nav .ivu-tabs-tab {
      margin-right: 0;
      width: 14.286%;
      text-align: center;
      padding: 0;
      height: 56px;
      line-height: 56px;
      font-size: 18px;
      color: #333;
      font-weight: bold;
      background: #f8f8f8;
      background-size: 100% 100%;
      border: 1px solid #e7e7e7;
      border-left: none;
      transition: color 0s ease-in-out;
    }

    .ivu-tabs-nav .ivu-tabs-tab:nth-child(1) {
      border-left: 1px solid #e7e7e7;
    }

    .ivu-tabs-ink-bar {
      height: 0px;
      width: 0px;
    }

    .ivu-tabs-nav .ivu-tabs-tab-active {
      z-index: 100;
      background-color: #fff;
      background-image: url(../../assets/img/icon/back-jiao.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }

    .ivu-tabs-nav-container:focus .ivu-tabs-tab-focused {
      border-color: #e7e7e7 !important;
    }

    .ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
      width: 17px;
      height: 17px;
      display: none;
      margin-right: 4px;
    }

    .ivu-tabs-nav .ivu-tabs-tab.ivu-tabs-tab-active .ivu-icon {
      width: 17px;
      height: 17px;
      display: inline-block;
      background: url(../../assets/img/icon/yuan-tab.png) no-repeat;
      background-size: 100% 100%;
    }

    .ivu-icon-logo-apple:before {
      content: "";
    }

    .ivu-tabs-nav .ivu-tabs-tab:hover {
      z-index: 100;
      background-color: #fff;
      background-image: url(../../assets/img/icon/back-jiao.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #fff;

      .ivu-icon {
        width: 17px;
        height: 17px;
        display: inline-block;
        background: url(../../assets/img/icon/yuan-tab.png) no-repeat;
        background-size: 100% 100%;
      }
    }

    .ivu-tabs-tab-focused {
      border: none;
      outline: none;
    }

    .ivu-tabs-bar {
      margin-bottom: 0;
      border-left: 1px solid #e7e7e7;
    }
  }
</style>
<template>
  <div class="mainCons">
    <p id="version">{{version}}</p>
    <top-head @childBtnlue="chilBtnlue"></top-head>
    <div class="left-tex" :class="{'let-lists':bigshow}">
      <Tabs>
        <TabPane v-for="item in dataGovernList" :label="item.authority_name" :key="item.authority_id" icon="logo-apple">
          <div class="content">
            <ul class="col-text fn-clear">
              <li v-for="it in item.routeList">
                <div class="text-lists" :class="true?'ctive':''" @mouseenter="entres" @mouseleave="leaves">
                  <i></i>
                  <p>{{it.authorityName}}</p>
                  <span v-show="textshow" @click="enterDataGoverBtn(it,$event)">进入系统</span>
                </div>
              </li>
            </ul>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import env from '../../../config/env'
  import {
    getUrlValue,
    getUserInfoByLogin
  } from '@/libs/accountOption'

  import topHead from './children/mainHeader'
  import {asyncRouter, loadRouter} from '@/router/asyncRouter'
  import {buildMenu, saveParames} from '@/api/support/buildMenu'
  import dataMarketIndex from './dataMarketIndex'
  export default {
    name: 'firstcon',
    components: {topHead, dataMarketIndex},
    data() {
      return {
        version: '',
        ipAds: '',
        indext: 0,
        nowindex: 0,
        textshow: false,
        bigshow: true,
        dataGovernList: [],
        menulist: [
          '目录编目',
          '目录订阅',
          '资源注册',
          '接口注册',
          '订阅审核',
          '我的申请'
        ],
        messlist: [
          {
            num: 683,
            text: '个',
            name: '接入部门',
            show: false
          },
          {
            num: 496,
            text: '万条',
            name: '上报目录',
            show: false
          },
          {
            num: 683,
            text: '个',
            name: '共享数据',
            show: false
          },
          {
            num: 683,
            text: '个',
            name: '发布接口',
            show: true
          },
          {
            num: 683,
            text: '个',
            name: '支撑业务',
            show: true
          },
          {
            num: 683,
            text: '个',
            name: '数据存储',
            show: false
          }
        ],
        navList: [
          '数据治理',
          '基础库',
          '数据采集',
          '数据分析',
          '共享开放',
          '数据交易',
          '数据服务'
        ],
        sourceList: [
          {
            id: 1,
            show: true,
            text: '资源目录管理系统',
            butt: '进入系统'
          },
          {
            id: 2,
            show: true,
            text: '资源目录管理系统',
            butt: '进入系统'
          },
          {
            id: 3,
            show: true,
            text: '资源目录管理系统',
            butt: '进入系统'
          },
          {
            id: 4,
            show: false,
            text: '资源目录管理系统',
            butt: '进入系统'
          },
          {
            id: 5,
            show: true,
            text: '资源目录管理系统',
            butt: '进入系统'
          },
          {
            id: 6,
            show: true,
            text: '资源目录管理系统',
            butt: '进入系统'
          }
        ]
      }
    },
    mounted() {
      this.getVersion()
      this.getLoginInfo()
      this.dataAction() // 数字滚动增加
    },
    methods: {
      getVersion() {
        this.version = env.version
      },
      // 获取数据治理列表
      getModelAuthor() {
        let tempList = JSON.parse(sessionStorage.getItem('authList'))
        // 遍历每一个功能模块
        for (var i = 0, len = tempList.length; i < len; i++) {
          // 遍历大模块下面的子模块，并生成惨菜单
          for (var j = 0, len1 = tempList[i].routeList.length; j < len1; j++) {
            if (tempList[i].routeList[j].menuList == undefined || tempList[i].routeList[j].menuList == null) {
              tempList[i].routeList[j].menuList = buildMenu(tempList[i].routeList[j].childLists)
            }
          }
        }
        this.dataGovernList = tempList
        sessionStorage.setItem('authList', JSON.stringify(this.dataGovernList))
        loadRouter()
        this.$Spin.hide()
      },
      navBtn: function (index) {
        this.indext = index
        this.nowindex = index
      },
      entres: function () {
        this.textshow = true
      },
      leaves: function () {
        this.textshow = false
      },
      enterBtn: function () {
        this.$router.push({path: '/homepage'})
      },
      enterDataGoverBtn: function (item) {
        // '1' 代表从first界面跳转至菜单，'2'代表浏览器刷新或浏览器地址栏输入跳转至菜单
        let entresFlag = '1'
        sessionStorage.setItem('routeEntresFlag', entresFlag)
        sessionStorage.setItem('menuList', JSON.stringify(item.menuList))
        try {
          if (item.menuList[0].url) {
            saveParames(item.menuList[0])
            this.$router.push({path: item.menuList[0].url})
          } else if (item.menuList[0].secondMenuList[0].url) {
            saveParames(item.menuList[0].secondMenuList[0])
            this.$router.push({path: item.menuList[0].secondMenuList[0].url})
          } else {
            saveParames(item)
            this.$router.push({path: item.url})
          }
        } catch (e) {
          console.log(e.name + ': ' + e.message)
          this.$router.push({path: item.path})
        }
      },
      // 数字滚动
      dataAction() {
        let _self = this
        let eles = _self.$refs.numberGrow
        for (let i = 0; i < eles.length; i++) {
          for (let j = 0; j < _self.messlist.length; j++) {
            if (i == j) {
              _self.numberGrow(eles[i], _self.messlist[j].num)
            }
          }
        }
      },
      // 数字滚动增加方法
      numberGrow(ele, num) {
        let step = num / 200
        let current = 0
        let start = 0
        let t = setInterval(function () {
          start += step
          if (start > num) {
            clearInterval(t)
            start = num
            t = null
          }
          if (current === start) {
            return
          }
          current = start
          ele.innerHTML = parseInt(current)
        }, 50)
      },
      chilBtnlue() {
        this.bigshow = !this.bigshow
      },
      async start() {
        var decName = await sessionStorage.getItem('userName')
        if (decName) {
          this.getModelAuthor()
        }
      },
      async getLoginInfo() {
        var userName2 = await getUrlValue('userName')
        if (userName2) {
          var sessionInfo = await getUserInfoByLogin(userName2)
          this.$store.commit('setUser', sessionInfo)
          if (sessionInfo != null || sessionInfo != undefined) {
            this.start()
          } else {
            this.$message({
              message: '单点登录账户与系统用户未建立关联关系',
              type: 'error'
            })
            this.$router.replace('/login')
          }
        }
      }
    }
    // create() {
    //   this.getLoginInfo()
    // }
  }
</script>
