<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >

</style>
<template>
  <div class="wrap">

    <div class="mainPage">
      <div class="maincon">
        <!--<keep-alive>-->
        <!---->
        <!--</keep-alive>-->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mainPage',
    data() {
      return {}
    },
    created: function () {
      //
    }
  }
</script>
