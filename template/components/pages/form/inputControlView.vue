<template>
    <div>
        <!-- 单文本框 -->
        <template v-if="type === '8'">
            <Input v-model="inputValue" :placeholder="placeholder" @on-change="handleChange" style="width: 100%"/>
        </template>
        <!-- 下拉框 -->
        <template v-if="type === '1'">
            <Select v-model="inputValue" :placeholder="placeholder" style="width: 100%" @on-change="handleChange">
                <Option v-for="item in optionsValues" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </template>
        <!-- 时间选择器 -->
        <template v-if="type === '2'">
            <DatePicker type="date" v-model="inputValue" :placeholder="placeholder" @on-change="handleChange" style="width: 100%" format="yyyy-MM-dd"></DatePicker>
        </template>
        <!-- 多文本框 -->
        <template v-if="type === '3'">
            <Input v-model="inputValue" :placeholder="placeholder" @on-change="handleChange" style="width: 100%" type="textarea" :rows="4" show-word-limit maxlength="200"/>
        </template>
        <!-- 多选框 -->
        <template v-if="type === '4'">
            <CheckboxGroup v-model="groupVlaue" @on-change="handleChange">
                <template v-for="(item, index) in optionsValues">
                    <Checkbox  :key="index" :label="item.value">{{item.label}}</Checkbox>
                </template>
            </CheckboxGroup>
        </template>
        <!-- 单选框 -->
        <template v-if="type === '6'">
            <RadioGroup v-model="inputValue" @on-change="handleChange">
                <template v-for="(item, index) in optionsValues">
                    <Radio  :key="index" :label="item.value">{{item.label}}</Radio>
                </template>
            </RadioGroup>
        </template>
        <!-- 密码框 -->
        <template v-if="type === '5'">
            <Input v-model="inputValue" type="password" password :placeholder="placeholder" style="width: 100%"  />
        </template>
        <!-- 开关 -->
        <template v-if="type === '7'">
            <el-switch v-model="inputValue" @change="handleChange" style="width: 100%" active-value="1" inactive-value="2"></el-switch>
        </template>
         <template v-if="type === '10'">
            <el-input-number size="small" v-model="inputValue" style="width: 100%" ></el-input-number>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default:'请输入'
        },
        value: {
           
        },
        options: {
            type: String,
        },
        anyValue: {
            //任意的值 以上输入变化时会返回
        }
    },
    data() {
        return {
         inputValue: this.value,
         optionsValues: [],
         groupVlaue: []
        }
    },
    methods: {
        handleChange(val) {
            if(this.type === '4') {
                this.$emit('input',  JSON.stringify(this.groupVlaue))
                this.$emit('onchange', {value: JSON.stringify(val), item: this.anyValue})
                return 
            } else if(val.target) {
                this.$emit('onchange', {value: val.target.value, item: this.anyValue})
            } else {
                this.$emit('onchange', {value: this.inputValue, item: this.anyValue})
            }
        }
    },
    watch: {
       inputValue(val) {  
         let value = val
         if(typeof val === 'number') {
             value = value +''
         }
         this.$emit('input',  value)
       },
       type(val) {
           if(val === '4') {
               this.groupVlaue = this.value ? JSON.parse(this.value) : []
           }
           if(val === '10') {
               this.inputValue = this.inputValue*1
           }
       },
       options: {
           handler(val) {
            if(val) {
               try {
                   this.optionsValues = JSON.parse(val)
               } catch (error) {
                   this.$message({ message: '采集控件数据解析错误', type: 'error' })
               }
            }
           },
           immediate: true
       }
    }
}

</script>
