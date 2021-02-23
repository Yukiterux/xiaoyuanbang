<template>
  <el-dialog title="选择图标" :visible.sync="iconDialog" width="1200px"
             :close-on-press-escape="false" :show-close="false" :close-on-click-modal="true" append-to-body :before-close="closeDialog">
    <Card dis-hover>
      <template v-for="(item, index) in iconList">
        <div class="icon-box" @click="selected(item)">
          <!--<Icon class="icon-class" :type="item" size="26"/>-->
          <img :src="require('../assets/img/menu-icon/' + item + '.png')" alt="" style="width: 30px;height: 30px;display: inline-block;">
          <span class="icon-name">{{item}}</span>
        </div>
      </template>
      <Page @on-change="changePage" :total="totalCount"/>
    </Card>
  </el-dialog>
</template>

<script>
  import {iconArray} from '@/assets/menuIcon'

  export default {
    name: 'iconPop',
    props: {
      iconDialog: {
        type: Boolean
      }
    },
    components: {},
    data() {
      return {
        iconList: [],
        pageNo: 1,
        pageSize: 30,
        totalCount: 0
      }
    },
    methods: {
      // 获取图标集合
      getIconList() {
        this.iconList = this.pagination()
        this.totalCount = iconArray.length / 3
      },
      // 前端分页实现
      pagination() {
        let offset = (this.pageNo - 1) * this.pageSize;
        return (offset + this.pageSize >= iconArray.length) ? iconArray.slice(offset, iconArray.length) : iconArray.slice(offset, offset + this.pageSize);
      },
      // 点击分页
      changePage(count) {
        this.pageNo = count
        this.getIconList()
      },
      // 选中图标
      selected(iconName) {
        this.$emit('hideIconView', 'false', iconName)
      },
      // 关闭按钮
      closeDialog() {
        this.$emit('hideIconView', 'false')
      }
    },
    created() {
      this.getIconList()
    },
    mounted() {
    },
    computed: {},
    watch: {}
  }
</script>

<style lang="scss" >
  .icon-box {
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    padding: 15px;
    text-align: center;
    &:hover {
      background: #f9f9f9;
    }
    .icon-class {
      display: block;
      text-align: center;
      height: 20px;
    }
    .icon-name {
      display: block;
      text-align: center;
      width: 150px;
    }
  }
</style>
