<template>
  <div>
    <div class="block">
      <el-carousel height="500px" width="1366px" type="card">
        <el-carousel-item v-for="item in items" :key="item.id" @click="jump(item.url)" :label="item.title">
          <p align="center">
            <img :src="item.pic" height="1080px" width="1920px" />
          </p>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
import contentApi from "~/api/content.js";
export default {
  created() {
    contentApi.getList().then(res => {
      this.items = res.data.data;
      this.items.sort((a, b) => {
        return b.sort_order - a.sort_order;
      });
    });
  },

  data() {
    return {
      items: {}
    };
  },
  methods: {
    jump(url) {
      console.log("？？？")
      let routeData = this.$router.resolve({
        query: url
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

