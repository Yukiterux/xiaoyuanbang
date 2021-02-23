<template>
  <div>
    <!-- 数据结果--{{ dataList }}-- -->
    <div v-for="(item, index) in dataList">
      <div v-if="item.relations != null" style="text-align: center">
        <el-select
          v-model="item.relations"
          placeholder="请选择"
          size="mini"
          style="width: 90px"
          @change="selectEnd"
        >
          <el-option
            size="mini"
            v-for="val in relationOptions"
            :key="val.value"
            :label="val.label"
            :value="val.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-select
        v-model="item.context"
        placeholder="请选择关联指标"
        style="width: 37%"
        @change="selectEnd"
      >
        <el-option
          v-for="val in otherIndes"
          :key="val.value"
          :label="val.label"
          :value="val.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="item.connection"
        placeholder=""
        style="width: 21%"
        size="mini"
        @change="selectEnd"
      >
        <el-option
          v-for="val in connectionOption"
          :key="val.value"
          :label="val.label"
          :value="val.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="item.indexKey"
        placeholder="请选择检索字段"
        style="width: 37%"
        @change="selectEnd"
      >
        <el-option
          v-for="val in searchFieldList"
          :key="val.value"
          :label="val.label"
          :value="val.value"
        >
        </el-option>
      </el-select>
      <div style="margin: 8px; text-align: center">
        <el-button type="primary" size="mini" @click="addSelect(index)"
          >+</el-button
        >
        <el-button type="danger" size="mini" @click="removeSelect(index)"
          >-</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      relationOptions: [{
        value: '||',
        label: '或'
      }, {
        value: '&&',
        label: '且'
      }],
      connectionOption: [{
        value: '>',
        label: '>'
      }, {
        value: '<',
        label: '<'
      }, {
        value: '=',
        label: '='
      }],
    }
  },
  props: {
    dataList: {
      type: Array,
      default: () => { return [] }
    },
    //检索字段list
    searchFieldList: {
      type: Array,
      default: () => { return [] }
    },
    otherIndes: {
      type: Array,
      default: () => { return [] }
    },
  },
  mounted () {
    this.initValue()
  },
  methods: {
    // 初始化
    initValue () {
      console.log(this.$props.dataList)
      if (this.$props.dataList == null) {

        this.$emit('getGeneratorValue', [{ context: null, relations: null, connection: null, indexKey: null }])
      }
    },
    addSelect (index) {
      let val = index + 1
      this.dataList.splice(val, 0, { context: null, relations: '', connection: null, indexKey: null })

    },
    removeSelect (index) {
      let val = index + 1
      this.dataList.splice(val, 1)
    },
    selectEnd () {
      this.$emit('getGeneratorValue', this.$props.dataList)
    }
  }
}
</script>
<style scoped>
</style>
