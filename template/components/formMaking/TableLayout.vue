<template>
  <div class="table__layout">
    <el-table :data="tableData" border style="width: 100%" :show-header="false" :row-style="{height: '50px'}">
        <el-table-column></el-table-column>
        <el-table-column></el-table-column>
    </el-table>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
export default {
  components: {
    Draggable
  },
  name: "TableLayout",
  data() {
      return {
          tableData:[{}]
      }
  }
};
</script>
<style lang="scss">
.table__layout {
    width: 100%;
}
</style>