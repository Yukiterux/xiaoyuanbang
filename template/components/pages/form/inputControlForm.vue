<template>
    <div>
        <!-- 下拉框 -->
        <el-row v-for="(item, index) in selectValue" :key="index" class="select-row">
            <el-col :span="9">
                <Input v-model="item.value" placeholder="请输入选项值" style="width: 100%"/>
            </el-col>
            <el-col :span="9" :offset="1">
                <Input v-model="item.label" placeholder="请输入选项名称" style="width: 100%;"/>
            </el-col>
            <el-col :span="4" class="last-col">
                <i class="el-icon-remove-outline" v-if="selectValue.length > 1"  @click="handleReduce(index)"></i>
                <i class="el-icon-circle-plus-outline" v-if="index === selectValue.length-1" @click="handleAdd"></i>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props:{
       inputControlValue: {
           type: String
       }
    },
    data() {
        return {
          selectValue :[
            {value:'', label: ''}
          ], 
        }
    },
    methods: {
        handleChange(val) {
            this.$emit('onchange', val)
        },
        handleReduce(index) {
            if(this.selectValue.length > 0) {
              let ret = [...this.selectValue]
                ret.splice(index,1)
                this.selectValue = ret  
            }
        },
        handleAdd() {
            this.selectValue.push({value:'', label: ''})
        }
    },
    watch: {
       selectValue:{
         handler(val) {
            this.$emit('dataChange', val)
         },
         deep: true,
       },
        inputControlValue: {
            handler(val) { 
              if(val) {
                const ret = JSON.parse(val)
                if(ret.length > 0) {
                    this.selectValue = ret 
                }
              } else {
                this.selectValue = [ {value:'', label: ''} ]   
              }
            },
            immediate: true
        }
    }
}

</script>
<style lang="scss" scoped>
.last-col {
    padding-left: 8px;
    i{
        font-size: 24px;
        vertical-align: middle;
        color: #F56C6C;
        &:hover {
            cursor: pointer;
        }
    }
}
.select-row {
    margin-top: 10px;
}
.select-row:nth-child(1) {
    margin-top: 0px;
}
</style>