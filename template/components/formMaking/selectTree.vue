<!--
 * @Author: HJM
 * @Description:select-tree
 * @Date: 2020-03-17 19:59:42
 * @LastEditors: M
 * @LastEditTime: 2020-09-28 16:36:04
 -->
<template>
  <el-select
    :value="valueTitle"
    :clearable="clearable"
    @clear="clearHandle"
    :placeholder="placeholderTitle"
    @focus="focusHandle"
  >
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "el-tree-select",
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: 'id',             // ID字段名
          label: 'name',         // 显示名称
          children: 'parentId'    // 子级字段名
        }
      }
    },
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => { return [] }
    },
    /* 初始值 */
    value: {
      type: String,
      default: () => { return null }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => { return true }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => { return false }
    },
    /* placeholder */
    placeholderTitle: {
      type: String,
      default: () => { return null }
    }
  },
  data () {
    return {
      valueId: '',    // 初始值
      valueTitle: '',
      defaultExpandedKey: []
    }
  },
  mounted () {
    this.initHandle()
  },
  methods: {
    // 初始化值
    initHandle () {
      if (this.valueId) {
        this.$nextTick(() => {
          this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label]     // 初始化显示
          this.$refs.selectTree.setCurrentKey(this.valueId)       // 设置默认选中
          this.defaultExpandedKey = [this.valueId]      // 设置默认展开
        })
      } else if (this.$props.value && this.$props.value.length > 0) {
        // console.log(this.$props.options)
        let selectedId = this.$props.value
        this.$refs.selectTree.setCurrentKey(this.$props.value)       // 设置默认选中
        this.defaultExpandedKey = [this.$props.value]      // 设置默认展开
        let that = this
        try {
          this.$props.options.forEach(function (item, index) {
            if (item.id === selectedId) {
              that.valueTitle = item.index_chinese_name
              throw new Error("ending");
            }
          })
        } catch (e) {
          // 跳出循环
        }

      } else {
        this.valueTitle = ''
      }
      this.initScroll()
    },
    // 初始化滚动条
    initScroll () {
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => ele.style.width = 0)
      })
    },
    // 切换选项
    handleNodeClick (node) {
      this.valueTitle = node[this.props.label]
      this.valueId = node[this.props.value]
      this.$emit('getValue', this.valueId, node)
      this.defaultExpandedKey = []
    },
    // 清除选中
    clearHandle () {
      this.valueTitle = ''
      this.valueId = null
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('getValue', null)
    },
    focusHandle () {
      this.$emit('getFocus', null)
    },
    /* 清空选中样式 */
    clearSelected () {
      let allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  },
  watch: {
    value (val) {
      console.log(val)
      // this.valueId = this.value
      this.valueId = val
      this.$nextTick(() => {
        this.initHandle()
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
