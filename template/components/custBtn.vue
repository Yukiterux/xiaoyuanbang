<template>
  <Button :type="getType" :icon="getIcon" :disabled="isDisabled" @click="childClick(type)">{{name}}</Button>
</template>

<script>
  // add: 新增
  // delete: 删除
  // back: 返回
  // import: 导入
  // export: 导出
  // upload: 上传
  // download: 下载
  // search: 搜索/查询
  // reset: 重置/刷新
  // compare：比对
  // filter: 筛选
  export default {
    name: 'iconPop',
    props: {
      type: {
        type: String
      },
      name: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    data() {
      return {
      }
    },
    methods: {
      childClick(type) {
        this.$emit('childClick', type)
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
      getType() {
        switch (this.type) {
          case 'add':
            return 'primary'
          case 'delete':
            return 'error'
          case 'back':
            return 'primary'
          case 'import':
            return 'success'
          case 'export':
            return 'info'
          case 'upload':
            return 'success'
          case 'download':
            return 'info'
          case 'search':
            return 'primary'
          case 'reset':
            return 'warning'
          case 'compare':
            return 'info'
          case 'filter':
            return 'primary'
        }
      },
      getIcon() {
        switch (this.type) {
          case 'add':
            return 'md-add'
          case 'delete':
            return 'md-trash'
          case 'back':
            return 'md-arrow-back'
          case 'import':
            return 'md-cloud-download'
          case 'export':
            return 'md-cloud-upload'
          case 'upload':
            return 'md-cloud-upload'
          case 'download':
            return 'md-cloud-download'
          case 'search':
            return 'md-search'
          case 'reset':
            return 'md-refresh'
          case 'compare':
            return 'md-git-compare'
          case 'filter':
            return 'ios-funnel'
        }
      },
      isDisabled() {
        return this.disabled === ''
      }
    },
    watch: {}
  }
</script>
