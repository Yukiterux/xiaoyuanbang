<template>
  <div class="cus-tabs">
    <!-- 
        自定义选项卡!!!! 已全局注册 使用 <cusTabs></cusTabs>标签即可
        params: 
            default-value 选项卡初始化默认值
        使用方式:
        <CustTabs @tab-click="btn_task_state" default-value="1">
          <el-radio-button label="1">全部&nbsp;&nbsp;({{tableHeader.all || 0}}条)</el-radio-button>
          <el-radio-button label="2">上线&nbsp;&nbsp;({{tableHeader.up || 0}}条) </el-radio-button>
          <el-radio-button label="3">下线&nbsp;&nbsp;({{tableHeader.down || 0}}条)</el-radio-button>
          <el-radio-button label="4">回收站&nbsp;&nbsp;({{tableHeader.delete || 0}}条)</el-radio-button>
        </CustTabs>
    -->
    <el-radio-group v-model="radio" size="small" @change="handleTabClick">
      <slot></slot>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: "cusTabs",
  props: ['defaultValue'],
  data() {
    return {
      radio: this.defaultValue
    };
  },
  methods: {
      handleTabClick(val) {
        this.$emit('tab-click', val)
      }
  },
  watch: {
    'defaultValue'(val) {
      this.radio = val
    },
  }
};
</script>
<style lang="scss" scoped>
.cus-tabs {
  margin-bottom: 10px;
  /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-color: #1890ff;
    border-color: #1890FF;
    color: #fff;
  }
  /deep/ .el-radio-button__inner {
    color: #1890FF;
  }
}
</style>