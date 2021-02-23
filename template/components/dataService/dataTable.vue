<!-- @Author: FHD  * @Date: 2020-08-13 10:52:54  * @Last Modified by:   FHD.ming  * @Last Modified time: 2020-08-13 10:52:54  -->
<template>
  <div class="wrap" :style="{height:height}" v-loading="loading">
    <!-- 表格 -->
    <el-table
      :row-key="rowKey"
      :tree-props="treeProps"
      :data="tableData"
      v-loading="loading"
      border
      size="small"
      style="width: 100%"
      :header-cell-style="{
              'background': 'rgba(235, 244, 254, 1)',
              'color': 'rgba(51, 51, 51, 1)',
              'font-size':'16px'
          }"
      @selection-change="handleSelectionChange"
      :highlight-current-row="single"
      @current-change="changeSingle"
    >
      <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
      <el-table-column type="selection" width="40" v-if="!noSelects"></el-table-column>
      <el-table-column
        align="center"
        v-for="(i,k) in columnData"
        :key="k"
        :prop="i.dataKey"
        :formatter="i.formatter ? i.formatter : null"
        :label="i.name"
        :width="i.width"
        show-overflow-tooltip
        :sortable="i.sortable"
      ></el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination
      v-if="!nopages"
      :hide-on-single-page="hiddenPageInSingle"
      class="page r-nw-c-c"
      background
      :pager-count="7"
      :total="pages.total"
      :page-size="pages.pageSize"
      :current-page="pages.currentPage"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    noSelects: {
      type: Boolean,
      default: false,
    },

    height: {
      type: String,
      default: "auto",
    },
    // 表格数据
    tableData: {
      required: true,
      type: Array,
    },

    // 列数据
    columnData: {
      type: Array,
      required: true,
    },

    // 分页数据
    pages: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          total: 0,
          pageSize: 10,
        };
      },
    },
    loading: {
      type: Object,
      default: true,
    },
    //是否需要分页
    nopages: {
      type: Boolean,
      default: false,
    },
    // 加载动效
    loading: {
      type: Boolean,
      default: false,
    },
    // 显示单选样式
    single: {
      type: Boolean,
      default: false,
    },
    // 单页时是否隐藏
    hiddenPageInSingle: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
      default: "",
    },
    treeProps: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    // 分页
    currentChange(currentPage) {
      this.$emit("currentChange", currentPage);
    },

    // 多选
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },

    changeSingle(e) {
      if (!e) return;
      this.$emit("single", e);
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.page {
  height: 46px;
  margin: 10px 0;
}
</style>
<style lang='scss'>
.page {
  .number,
  .el-icon-more,
  .el-icon-d-arrow-left,
  .el-icon-d-arrow-right {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
}
.r-nw-c-c {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.el-pager .more::before {
  line-height: 40px;
}
// 设置tooltip最大款宽度
.el-tooltip__popper {
  max-width: 400px;
  line-height: 180%;
}
</style>