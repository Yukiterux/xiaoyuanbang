<template>
  <!-- 面包屑  top: 60px-->
  <div :class="[headMode === true ? nxPage ? 'head1':'head' : 'no-head', 'header-border']">
    <i class="location"></i>
    <Breadcrumb style="display: inline-block;vertical-align: middle;">
      <BreadcrumbItem>
        <span class="dgms-home" style="cursor: pointer; font-weight: bold;" @click="backHome">{{homePage}}</span>
        <span class="bread-icon">  <i class="connect-icon"></i> <span v-html="getCrumbName"></span></span>
        <span style="font-weight: bold; color: #515a6e;font-size: 15px"> {{currentView}}</span>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
  import {headLoading} from '@/api/appServer'
  export default {
    props: {
      crumbName: {
        type: String
      }
    },
    data() {
      return {
        nxPage: this.GLOBAL.nxPage,
        headMode: true,
        currentView: '',
        homePage: '',
        list: ''
      }
    },
    created() {
      this.headMode = headLoading
    },
    methods: {
      backHome() {
        this.$router.push({
          path: this.nxPage ? '/dataMark' : '/first',
          query: {pathFlag: 'model'}
        })
      }
    },
    computed: {
      getCrumbName: function() {
        const routerName = this.$route.name
        const routerNameList = routerName.split('-')
        this.list = routerName.split('-')
        const tempName = routerName.substring(routerNameList[0].length + 1 + routerNameList[1].length + 1, routerName.length - routerNameList[routerNameList.length - 1].length)
        const crumbName = tempName.replace(/-/g, ' <i class="connect-icon"></i> ')
        this.currentView = routerNameList[routerNameList.length - 1]
        this.homePage = routerNameList[1]
        return crumbName
      }
    }
  }
</script>

<style lang="scss" scoped>
  .head{
    padding: 5px;
    position: fixed;
    top: 60px;
    width: 100%;
    z-index: 100;
    background: #ffffff;
    margin-left: 5px;
  }
  .head1{
    padding: 5px;
    position: fixed;
    top: 130px;
    width: 100%;
    z-index: 100;
    background: #ffffff;
    margin-left: 5px;
  }
  .no-head{
    padding: 5px;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 100;
    background: #ffffff;
    margin-left: 5px;
  }

  .header-border {
    position: fixed;
    height: 44px;
  }
  .header-border::after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    height: 12px;
    bottom: 0;
    background-color: #f5f7f9;
  }

  /deep/ .location {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../../../src/assets/img/location4.png") no-repeat;
    vertical-align: middle;
    margin-right: 8px;
    margin-left: 5px;
    background-size: cover;
  }
  .bread-icon>>>.connect-icon{
    display: inline-block;
    margin-left: 6px;
    width: 0px;
    height: 0px;
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent  transparent #515a6e;
  }
  .dgms-home:hover{
    color: #3a9dff;
  }
  .ivu-breadcrumb-item-link {
    span {
      font-weight: 400;
    }
  }
</style>
