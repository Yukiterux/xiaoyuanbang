<template>
  <!-- 面包屑  top: 60px-->
  <div style="padding: 5px;position: fixed;top:0px;width: 100%;z-index: 100;background: #F2F2F6;">
    <i class="location"></i>
    <Breadcrumb style="display: inline-block;vertical-align: middle;">
      <BreadcrumbItem>
        当前位置: {{ $route.name }}
        <!--<template v-if="routerName === 'home'">-->
        <!--当前位置: 首页-->
        <!--</template>-->
        <!--<template v-if="routerName !== 'home'">-->
        <!--当前位置: {{routerName}}-->
        <!--</template>-->
        <!-- {{$store.state.breadcrumb.routerName}} -->
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
  export default {
    props: {
      crumbName: {
        type: String
      }
    },
    computed: {
      getCrumbName: function () {
        let routerName = this.crumbName
        if (routerName === '') {
          routerName = sessionStorage.getItem('crumbName');
        }
        return routerName
      }
    }
    // computed: {
    //   routerName: function () {
    //     var routerName = this.$store.state.breadcrumb.routerName
    //     if (routerName === '') {
    //       routerName = sessionStorage.getItem('routerName');
    //     }
    //     return routerName
    //   }
    // }
  }
</script>

<style lang="scss" scoped>
  /deep/ .location {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../../../src/assets/img/location3.png") no-repeat;
    vertical-align: middle;
    margin-right: 8px;
    margin-left: 5px;
    background-size: cover;
  }
</style>
