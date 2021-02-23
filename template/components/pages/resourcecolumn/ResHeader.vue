<style lang="scss">
  .header-wrap {
    height: 60px;
    padding: 0 29px 0 0px;
    background: -moz-linear-gradient(left, #0197eb 0%, #387ee7 100%);
    background: -webkit-gradient(
        linear,
        left,
        right,
        color-stop(0%, #0197eb),
        color-stop(100%, #387ee7)
    );
    background: -webkit-linear-gradient(left, #0197eb 0%, #387ee7 100%);
    background: -o-linear-gradient(left, #0197eb 0%, #387ee7 100%);
    background: -ms-linear-gradient(left, #0197eb 0%, #387ee7 100%);
    background: linear-gradient(to right, #0197eb 0%, #387ee7 100%);
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 99;

    .left {
      float: left;
      height: 33px;
      line-height: 33px;
      margin-top: 14px;
      font-size: 0;
      cursor: pointer;
      i,img,
      span {
        display: inline-block;
        vertical-align: middle;
      }

      i {
        width: 33px;
        height: 33px;
        background: url(../../../assets/img/icon/head-log-ing@2x.png) no-repeat;
        background-size: 100% 100%;
      }

      span {
        font-size: 22px;
        color: #ffffff;
        font-weight: bold;
        margin-left: 14px;
      }
    }

    .right {
      float: right;
      height: 60px;
      line-height: 60px;

      i,
      span {
        display: inline-block;
        vertical-align: middle;
      }

      .ivu-badge {
        display: inline-block;
        width: 19px;
        height: 25px;
        background: url(../../../assets/img/icon/news-nor-icon@2X.png) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }

      .ivu-badge-count {
        font-family: unset;
        width: 20px;
        height: 20px;
        font-size: 16px;
        color: #fff;
        background: #ff2500;
        border-radius: 10px;
        text-align: center;
        line-height: 20px;
        border: none;
        box-shadow: none;
        top: -10px;
        right: -10px;
      }

      .ivu-poptip {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        margin-left: 30px;
        vertical-align: middle;
        position: relative;
        cursor: pointer;

        .ivu-poptip-rel {
          position: absolute;
          top: -3px;
        }

        img {
          width: 30px;
          height: 30px;
          transition: all 0.6s;

          &:hover {
            -webkit-transform: scale(1.2);
            -moz-transform: scale(1.2);
            -o-transform: scale(1.2);
            transform: scale(1.2);
          }
        }
      }

      .user-opration li {
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;

        &:hover {
          background: #1890ff;
          color: #fff;
        }
      }

      .ivu-poptip-popper {
        min-width: auto;
        width: 100px !important;
        left: -35px !important;
        top: 30px !important;

        .ivu-poptip-body {
          padding: 8px 5px;
        }
      }

      .splitline {
        width: 1px;
        height: 20px;
        background: #fff;
        margin-left: 21px;
      }

      .comeback-home {
        height: 30px;
        line-height: 30px;
        margin-left: 9px;
        font-size: 0;
        cursor: pointer;

        &:hover {
          .come-home {
            color: #8bc1ff;
          }
        }
      }

      .home-icon {
        width: 24px;
        height: 23px;
        background: url(../../../assets/img/icon/home-icon@2x.png) no-repeat;
        background-size: 100% 100%;
      }

      .come-home {
        font-size: 16px;
        color: #fff;
        margin-left: 9px;
      }
    }

    .pop-up {
      width: 336px;
      height: 433px;
      border-bottom: 1px solid #b6b6b7;
      position: absolute;
      right: 106px;
      top: 60px;
      background: #fff;
      border-radius: 0 0 6px 6px;
      z-index: 1000;
      display: none;

      .task-over {
        width: 288px;
        margin-left: 24px;

        .task-list {
          border-bottom: 1px solid #e8e8e8;
          margin-bottom: 12px;
          overflow: hidden;

          .task-tit {
            margin-top: 12px;
            color: #333333;
            font-size: 14px;
          }

          .task-sign {
            padding: 2px 8px;
            border: 1px solid #d9d9d9;
            border-radius: 5px;
            color: #000000;
            background: #f5f5f5;
            float: right;
            cursor: pointer;
          }

          .icons0 {
            border: 1px solid #d9d9d9;
            color: #000000;
            background: #f5f5f5;
          }

          .icons1 {
            border: 1px solid #ffa39e;
            color: #f5222d;
            background: #fff1f0;
          }

          .icons2 {
            border: 1px solid #ffe58f;
            color: #faad14;
            background: #fffbe6;
          }

          .icons3 {
            border: 1px solid #91d5ff;
            color: #1890ff;
            background: #e6f7ff;
          }

          .task-con {
            display: block;
            color: #666666;
            font-size: 12px;
            margin-top: 8px;
            margin-bottom: 12px;
          }
        }

        .tesk-butt {
          text-align: center;
          font-size: 14px;
          height: 46px;
          line-height: 46px;
          color: #000000;

          span {
            cursor: pointer;
          }
        }
      }

      .ivu-tabs-nav {
        width: 336px;
      }

      .ivu-tabs-nav .ivu-tabs-tab {
        text-align: center;
        width: 100px;
        margin-left: 6px;
        margin-right: 6px;
      }
    }
  }

  .header-night {
    background: -moz-linear-gradient(left, #497fe0 0%, #2156aa 100%);
    background: -webkit-gradient(
        linear,
        left,
        right,
        color-stop(0%, #497fe0),
        color-stop(100%, #2156aa)
    );
    background: -webkit-linear-gradient(left, #497fe0 0%, #2156aa 100%);
    background: -o-linear-gradient(left, #497fe0 0%, #2156aa 100%);
    background: -ms-linear-gradient(left, #497fe0 0%, #2156aa 100%);
    background: linear-gradient(to right, #497fe0 0%, #2156aa 100%);
  }
</style>
<template>
  <div class="header-wrap fn-clear" :class="mode?'header-night':''">
    <!-- 头部左侧内容开始 -->
    <div class="left" @click="comebackHome">
      <img id="portrait"  style="width: 32px;height: 32px;margin: 0 0 0 18px;"><img>
      <!--<i></i>-->
      <span>{{sysName}}</span>
    </div>
    <!-- 头部左侧内容结束 -->
    <!-- 头部右侧内容开始 -->
    <div class="right">
      <span>
				<!-- <i class="list7"></i> -->
				<span style="font-style: italic;font-size:12px;color:#f5f5f5">{{userName}}</span>
			</span>
      <!-- <Badge :count="3" ref="badge" class="shake" :class="{'shake-active':isShake}"></Badge>
      <Poptip trigger="hover" placement="bottom">
        <img src="../../../assets/img/icon/personal-center@2x.png" alt="">
        <ul class="user-opration" slot="content">
          <li class="shake-slow">退出登陆</li> -->
      <!-- <li>退出登陆</li> -->
      <!-- </ul>
    </Poptip> -->
      <i class="splitline"></i>
      <span class="comeback-home" @click="comebackHome">
        <i class="home-icon"></i>
      </span>
    </div>
    <!-- 头部右侧内容结束 -->
  </div>
</template>
<script>
  export default {
    name: 'ResHeader',
    props: ['mode'],
    mounted() {
      document.getElementById('portrait').src = sessionStorage.getItem('dgms_logo')
    },
    created() {
      try {
        if (sessionStorage.getItem('userName')) {
          this.userName = '欢迎您，' + sessionStorage.getItem('userName')
        }
        this.sysName = JSON.parse(sessionStorage.getItem('sysSettings')).sysName
      } catch (e) {
        this.userName = '欢迎您'
        this.sysName = '数据资源管理系统'
      }
    },
    methods: {
      // 返回平台首页
      comebackHome() {
        this.$router.push({
          path: '/first',
          // query: {pathFlag: 'model'}
        })
      },
      // 头部通知信息抖动
      getBadge() {
        const _self = this
        const el = _self.$refs.badge.$el.children
        el.length === 0 ? (_self.isShake = false) : (_self.isShake = true)
        if (el.length === 0) {
          _self.isShake = false
        } else {
          setInterval(function() {
            _self.isShake ? (_self.isShake = false) : (_self.isShake = true)
          }, 5000)
        }
      }
    },
    data() {
      return {
        isShake: false, // 头部通知信息抖动
        reminderShow: true, // 通知弹层
        userName: '欢迎您',
        sysName: '数据资源管理系统',
        data_top: [
          {
            title: '任务名称',
            value: '任务需要在 2017-01-12 20:00前启动',
            sign: '未开始'
          },
          {
            title: '第三方紧急代码变更',
            value: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
            sign: '马上到期'
          },
          {
            title: '信息安全考试',
            value: '指派竹尔于 2017-01-09 前完成更新并发布',
            sign: '已耗时8天'
          },
          {
            title: 'ABCD版本发布',
            value: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
            sign: '进行中'
          }
        ]
      }
    }
  }
</script>
