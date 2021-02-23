<template>
  <el-dialog :title="'调度配置'" :visible.sync="dialogVisible" width="55%"
             :close-on-press-escape="false" :show-close="false" :close-on-click-modal="false">
         <Form ref="taskExecution" :model="taskExecution" :rules="ruleValidate" label-position="right"
             :label-width="120" style="padding: 0 70px;" id="taskExecution">

             <FormItem label="执行频率"  prop="executionFrequency" >
                  <RadioGroup vertical v-model="taskExecution.executionFrequency" @on-change="getExecutionFrequency" style="width:100%">
                   <Row>
                        <Col :span="7" class="col">
                            <Radio label="01">
                              <span>只执行一次</span>
                            </Radio>
                        </Col>
                        <Col :span="17" class="col">
                           <FormItem label="计划执行时间:">
                              <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" style="width: 210px" size="small" v-model="taskExecution.executionOneTime" :disabled=frequency[0]></el-date-picker>
                           </FormItem>
                       </Col>
                    </Row>
                    <Row>
                        <Col :span="7" class="col">
                           <Radio label="02" >
                              <span>简单重复执行</span>
                          </Radio>
                        </Col>
                         <Col :span="17" class="col">
                            <FormItem label="调度周期:" >
                                <Select  placeholder="请设置频次" style="width:210px" v-model="taskExecution.executionPeriod" @on-change="getExecutionPeriod" :disabled=frequency[1]>
                                    <Option v-for="item in dataFrequencyList" :key="item.value" :value="item.value">{{item.label}}</Option>
                                </Select>
                            </FormItem>
                         </Col>
                          <Col :span="4" push="8" class="col">
                            <div style="margin-left:24px;">具体时间:</div>
                          </Col>
                          <Col :span="10" push="8" style="width:350px;margin-left:8px;" class="col">
                            <InputNumber  v-model="taskExecution.executionPeriodOfMonth"  :max="12" :min="1" size="small" :disabled=frequency[2] style="width:60px" ></InputNumber><span>月</span>
                            <InputNumber  v-model="taskExecution.executionPeriodOfDay"    :max="31" :min="1" size="small" :disabled=frequency[3] style="width:60px" ></InputNumber><span>日</span>
                            <InputNumber  v-model="taskExecution.executionPeriodOfHour"   :max="23" :min="0" size="small" :disabled=frequency[4] style="width:60px" ></InputNumber><span>时</span>
                            <InputNumber  v-model="taskExecution.executionPeriodOfMinute" :max="59" :min="0" size="small" :disabled=frequency[5] style="width:60px" ></InputNumber><span>分</span>
                          </Col>
                    </Row>
                    <Row>
                     <Col :span="10" class="col" >
                        <Radio label="03">
                            <span>cron表达式执行</span>
                        </Radio>
                    </Col>
                    <Col :span="13" class="col" offset="1">
                         <FormItem>
                            <Input style="width:210px;margin-left:30px;" v-model="taskExecution.executionCronTime" :disabled=frequency[6]></Input>
                         </FormItem>
                    </Col>
                    </Row>
                   </RadioGroup>
              </FormItem>
              <FormItem label="有效时间"  prop="failureTime" >
                   <RadioGroup  vertical v-model="taskExecution.failureTime" @on-change="getFailureTime" >
                     <Radio label="01">
                       <span>无限期</span>
                    </Radio>
                    <Row  v-if="taskExecution.executionFrequency!='01'">
                      <Col :span="4">
                         <Radio label="02">
                            <span>设置时间:</span>
                        </Radio>
                      </Col>
                      <Col :span="10">
                        <FormItem prop="executionOpenTime">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 185px" v-model="taskExecution.executionOpenTime" size="small"  :disabled=failureTime[0]></el-date-picker>
                        </FormItem>
                      </Col>
                      <Col :span="2">
                        ------
                      </Col>
                      <Col :span="8">
                        <FormItem prop="executionCloseTime">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="选择时间" style="width: 185px" v-model="taskExecution.executionCloseTime" size="small"  :disabled=failureTime[1]></el-date-picker>
                        </FormItem>
                      </Col>
                    </Row>
                   </RadioGroup>
              </FormItem >
              <FormItem label="调度失败机制"  prop="executionFailureMechanism"  >
                   <RadioGroup  vertical v-model="taskExecution.executionFailureMechanism"  @on-change="getFailureMechanism" style="width:100%;">
                     <Radio label="01">
                        <span>当任务执行失败时,本次执行停止</span>
                    </Radio>
                     <Radio label="02">
                        <span>当任务执行失败时,该任务不再执行</span>
                    </Radio>
                    <Row>
                      <Col :span="5">
                         <Radio label="03">
                            <span>当执行中断时,</span>
                        </Radio>
                      </Col>
                       <Col :span="4">
                            <InputNumber  v-model="taskExecution.executionFailureDateTime" :max="60" :min="1" :disabled=failureMechanism[0] style="width:80px" ></InputNumber>
                      </Col>
                      <Col :span="6">
                        <span>分钟后重新执行一次</span>
                      </Col>
                    </Row>
                   </RadioGroup>
              </FormItem>
                <div style="text-align:center;margin-top:50px;">
                     <Button type="primary" @click="saveScheduleConfig"  style="margin-right:30px;" :loading="loading">保存</Button>
                     <Button type="error" @click="cancelFrom">取消</Button>
                </div>
        </Form>

  </el-dialog>
</template>
<script>
import {cronExpression} from '@/api/dataCollection/dataCollectionList'
export default {
  props: {
    updateTrigger: {
      type: Number
    },
    dialogVisible: {
      type: Boolean
    },
    executionTmp: {
     type: Object
    }
  },
  data() {
    return {
      ruleValidate: {
        executionFrequency: [
            { required: true, message: '执行频率不能为空', trigger: 'blur' }
        ],
        failureTime: [
            { required: true, message: '失效时间不能为空', trigger: 'blur'}
        ],
        executionFailureMechanism: [
             { required: true, message: '调度失败机制不能为空', trigger: 'blur'}
        ]
      },
      taskExecution: {
        executionFrequency: '',                            // 执行频率
        executionCronTime: '',                             // cron表达式时间
        executionOneTime: '',                              // 执行一次时间
        failureTime: '',                                   // 失效时间
        executionOpenTime: '',
        executionCloseTime: '',
        executionFailureMechanism: '',                     // 调度失败机制
        executionFailureDateTime:1,                        // 时间或日期
        executionFailureContent: '',                       // 执行失败后的操作
        executionPeriod: '',                               // 调度周期
        executionPeriodOfMonth: 1,                         // 调度周期选择具体时间 月
        executionPeriodOfDay: 1,                           // 日
        executionPeriodOfHour: 0,                          // 时
        executionPeriodOfMinute: 0                         // 分
      },
      loading: false,
      dataFrequencyList: [
        {
          value: 'm',
          label: '分'
        },
        {
          value: 'h',
          label: '小时'
        },
        {
          value: 'd',
          label: '天'
        },
        {
          value: 'w',
          label: '周'
        },
        {
          value: 'M',
          label: '月'
        },
        {
          value: 'y',
          label: '年'
        }
      ],
      frequency: [false, true, true, true, true, true, true],
      failureTime: [true, true],
      failureMechanism: [true],
      executionTime: '',
      cron:true
    }
  },
  methods: {
    cancelFrom() {
           this.taskExecution.executionFrequency = '',
           this.executionTime = '',
           this.taskExecution.executionPeriod = ''
           this.taskExecution.executionPeriodOfMonth = 1
           this.taskExecution.executionPeriodOfDay = 1
           this.taskExecution.executionPeriodOfHour = 0
           this.taskExecution.executionPeriodOfMinute = 0
           this.taskExecution.executionCronTime = '',              // cron表达式时间
           this.taskExecution.executionOneTime = '',               // 执行一次时间
           this.taskExecution.failureTime = '01',                    // 有效时间
           this.taskExecution.executionOpenTime = '',
           this.taskExecution.executionCloseTime = '',
           this.taskExecution.executionFailureMechanism = '',      // 调度失败机制
           this.taskExecution.executionFailureDateTime = 1,        // 时间或日期
           this.taskExecution.executionFailureContent = ''         // 执行
           this.frequency = [false,true,true, true,true,true,true],
           this.failureTime = [true, true],
           this.failureMechanism = [true],
           this.$emit('hideView', 'false')
    },
    saveScheduleConfig() {
      this.$refs['taskExecution'].validate(async valid => {
        if (valid) {
          // 执行频率
          if (this.taskExecution.executionFrequency == '02') {
                  // 按照类似cron表达式的格式存储executionTime      42  09 30  * ?   =任何年 每月 30日 09时 42分
            if (this.taskExecution.executionPeriod == '') {
              this.$Message.error('简单重复执行所填内容不能为空')
              return;
            }
            var M = this.taskExecution.executionPeriodOfMonth
            var d = this.taskExecution.executionPeriodOfDay
            var h = this.taskExecution.executionPeriodOfHour
            var m = this.taskExecution.executionPeriodOfMinute
            var executionTime;
            if (this.taskExecution.executionPeriod === 'y') {
              executionTime = '0 ' + m + ' ' + h + ' ' + d + ' ' + M + ' ? *';
            } else if (this.taskExecution.executionPeriod === 'w') {
              executionTime = '0 ' + m + ' ' + h + ' ? * * *';
            } else if (this.taskExecution.executionPeriod === 'M') {
              executionTime = '0 ' + m + ' ' + h + ' ' + d + ' * ? *';
            } else if (this.taskExecution.executionPeriod === 'd') {
              executionTime = '0 ' + m + ' ' + h + ' * * ? *';
            } else if (this.taskExecution.executionPeriod === 'h') {
                executionTime = '0 ' + m + ' * * * ? *';
              } else if (this.taskExecution.executionPeriod === 'm') {
                executionTime = '0 * * * * ? *';
              }
            this.executionTime = executionTime
          } else if (this.taskExecution.executionFrequency == '03') {
             if (this.taskExecution.executionCronTime == '') {
                this.$Message.error('cron表达式不能为空')
                return;
             }
             await this.getCronException(this.taskExecution.executionCronTime);
             if(!this.cron){
                this.$Message.error('cron表达式不合法，请填写正确的cron表达式')
                return;
              } 

          } else if (this.taskExecution.executionFrequency == '01') {
            if (this.taskExecution.executionOneTime == ''|| this.taskExecution.executionOneTime ==null) {
              this.$Message.error('计划执行时间不能为空')
              return;
            }
          }
          // 失效时间  失效时间为无限期时,执行开始时间与执行关闭时间为空
          if (this.taskExecution.failureTime == '01') {
            this.taskExecution.executionOpenTime = ''
            this.taskExecution.executionCloseTime = ''
          }else{
             var now=new Date().getTime()
            if(this.taskExecution.executionOpenTime!='' && this.taskExecution.executionCloseTime!='' 
               && this.taskExecution.executionOpenTime!=null && this.taskExecution.executionCloseTime!=null){
                var openTime=this.taskExecution.executionOpenTime
                var openDate=new Date(openTime.replace(new RegExp(/-/gm) ,"/")).getTime()
                var closeTime=this.taskExecution.executionCloseTime
                var closeDate=new Date(closeTime.replace(new RegExp(/-/gm) ,"/")).getTime()
                if(openDate<now){
                     this.$Message.error('开始时间必须大于当前系统时间')
                     return;
                }
                if(openDate>closeDate){
                     this.$Message.error('开始时间必须小于结束时间')
                     return;
                }
            }
            if(this.taskExecution.executionOpenTime!='' || this.taskExecution.executionOpenTime!=null){
                var openTime=this.taskExecution.executionOpenTime
                var openDate=new Date(openTime.replace(new RegExp(/-/gm) ,"/")).getTime()
                if(openDate<now){
                     this.$Message.error('开始时间必须大于当前系统时间')
                     return;
                }
            }
            if(this.taskExecution.executionCloseTime!='' || this.taskExecution.executionCloseTime!=null ){
                var closeTime=this.taskExecution.executionCloseTime
                var closeDate=new Date(closeTime.replace(new RegExp(/-/gm) ,"/")).getTime()
                if(closeDate<now){
                     this.$Message.error('结束时间必须大于当前系统时间')
                     return;
                }
            }      
          }
          // 调度失败机制  =03时，设置重启调度频次
          if (this.taskExecution.executionFailureMechanism == '03') {
            this.taskExecution.executionFailureContent = this.taskExecution.executionFailureDateTime;
          }

          var taskExecution = {
            executionFrequency: this.taskExecution.executionFrequency,
            executionTime: '',
            executionCronTime: this.taskExecution.executionCronTime,
            executionOneTime: this.taskExecution.executionOneTime,

            executionPeriod: this.taskExecution.executionPeriod,
            executionPeriodOfMonth: this.taskExecution.executionPeriodOfMonth,
            executionPeriodOfDay: this.taskExecution.executionPeriodOfDay,
            executionPeriodOfHour: this.taskExecution.executionPeriodOfHour,
            executionPeriodOfMinute: this.taskExecution.executionPeriodOfMinute,

            executionFailureMechanism: this.taskExecution.executionFailureMechanism,
            executionOpenTime: this.taskExecution.executionOpenTime,
            executionCloseTime: this.taskExecution.executionCloseTime,

            failureTime: this.taskExecution.failureTime,
            executionFailureDateTime: this.taskExecution.executionFailureDateTime,
            executionFailureContent: this.taskExecution.executionFailureContent,
          }
          if (this.taskExecution.executionFrequency == '01') {
            taskExecution.executionTime = this.taskExecution.executionOneTime
          } else if (this.taskExecution.executionFrequency == '02') {
            taskExecution.executionTime = this.executionTime
          } else if (this.taskExecution.executionFrequency == '03') {
            taskExecution.executionTime = this.taskExecution.executionCronTime
          }
          this.$emit('saveScheduleConfig', taskExecution)
          this.cancelFrom()
        }
      });
    },

    async getCronException(executionCronTime){
       var cron=executionCronTime
       const data = await cronExpression(cron)
       this.cron = data.data.resultData;
    },
    clearItem() {
      this.taskExecution.executionOneTime = ''
      this.taskExecution.executionCronTime = ''
      this.taskExecution.executionPeriod = ''
      this.taskExecution.executionPeriodOfMonth = 1
      this.taskExecution.executionPeriodOfDay = 1
      this.taskExecution.executionPeriodOfHour = 0
      this.taskExecution.executionPeriodOfMinute = 0
      
    },
    getDate(date) {
      var now = new Date();
      if (date == 'y') {
        this.taskExecution.executionPeriodOfMonth = now.getMonth() + 1
        this.taskExecution.executionPeriodOfDay = now.getDate()
        this.taskExecution.executionPeriodOfHour = now.getHours()
        this.taskExecution.executionPeriodOfMinute = now.getMinutes()
      } else if (date == 'M') {
        this.taskExecution.executionPeriodOfMonth = 1
        this.taskExecution.executionPeriodOfDay = now.getDate()
        this.taskExecution.executionPeriodOfHour = now.getHours()
        this.taskExecution.executionPeriodOfMinute = now.getMinutes()
      } else if (date == 'd') {
        this.taskExecution.executionPeriodOfMonth = 1
        this.taskExecution.executionPeriodOfDay = 1
        this.taskExecution.executionPeriodOfHour = now.getHours()
        this.taskExecution.executionPeriodOfMinute = now.getMinutes()
      } else if (date == 'w') {
        this.taskExecution.executionPeriodOfMonth = 1
        this.taskExecution.executionPeriodOfDay = 1
        this.taskExecution.executionPeriodOfHour = now.getHours()
        this.taskExecution.executionPeriodOfMinute = now.getMinutes()
      } else if (date == 'h') {
        this.taskExecution.executionPeriodOfMonth = 1
        this.taskExecution.executionPeriodOfDay = 1
        this.taskExecution.executionPeriodOfHour = 0
        this.taskExecution.executionPeriodOfMinute = now.getMinutes()
      } else if (date == 'm') {
        this.taskExecution.executionPeriodOfMonth = 1
        this.taskExecution.executionPeriodOfDay = 1
        this.taskExecution.executionPeriodOfHour = 0
        this.taskExecution.executionPeriodOfMinute = 0
      }
    },
    getExecutionFrequency(value) {
      this.clearItem()
      if (value === '01') {
        this.frequency = [false, true, true, true, true, true, true]
      } else if (value === '02') {
        this.taskExecution.executionPeriod = 'y'
        this.getDate('y')
        this.frequency = [true, false, false, false, false, false, true]
      } else if (value === '03') {
        this.frequency = [true, true, true, true, true, true, false]
      }
    },
    getExecutionPeriod(date) {
      this.getDate(date)
      if (date == 'y') {
        this.frequency = [true, false, false, false, false, false, true]
      } else if (date == 'M') {
        this.frequency = [true, false, true, false, false, false, true]
      } else if (date == 'd') {
        this.frequency = [true, false, true, true, false, false, true]
      } else if (date == 'w') {
        this.frequency = [true, false, true, true, false, false, true]
      } else if (date == 'h') {
        this.frequency = [true, false, true, true, true, false, true]
      } else if (date == 'm') {
        this.frequency = [true, false, true, true, true, true, true]
      }
    },
    getFailureTime(value) {
      this.taskExecution.executionCloseTime = ''
      this.taskExecution.executionOpenTime = ''
      if (value === '01') {
        this.failureTime = [true, true]
      } else {
        this.failureTime = [false, false]
      }
    },
    getFailureMechanism(value) {
      this.taskExecution.executionFailureDateTime = 1
      if (value === '01') {
        this.failureMechanism = [true]
      } else if (value === '02') {
        this.failureMechanism = [true]
      } else if (value === '03') {
        this.failureMechanism = [false]
      }
    }
  },
  created() {

  },
  watch: {
    updateTrigger(val) {
     if (this.executionTmp.executionId) {
        this.getExecutionFrequency(this.executionTmp.executionFrequency)
        this.taskExecution.executionFrequency = (this.executionTmp.executionFrequency == '00') ? '01' : this.executionTmp.executionFrequency;
        if (this.taskExecution.executionFrequency === '02') {
          var executionTime = this.executionTmp.executionTime
          var time = executionTime.split(' ');
          if (time[4] != '*') {
            this.taskExecution.executionPeriod = 'y'
            this.taskExecution.executionPeriodOfMonth = parseInt(time[4])
            this.taskExecution.executionPeriodOfDay = parseInt(time[3])
            this.taskExecution.executionPeriodOfHour = parseInt(time[2])
            this.taskExecution.executionPeriodOfMinute = parseInt(time[1])
          } else if (time[3] != '*' && time[3] != '?' && time[4] === '*') {
            this.taskExecution.executionPeriod = 'M'
            this.taskExecution.executionPeriodOfDay = parseInt(time[3])
            this.taskExecution.executionPeriodOfHour = parseInt(time[2])
            this.taskExecution.executionPeriodOfMinute = parseInt(time[1])
          } else if (time[2] != '*' && time[3] === '*') {
            this.taskExecution.executionPeriod = 'd'
            this.taskExecution.executionPeriodOfHour = parseInt(time[2])
            this.taskExecution.executionPeriodOfMinute = parseInt(time[1])
          } else if (time[1] != '*' && time[2] === '*') {
            this.taskExecution.executionPeriod = 'h'
            this.taskExecution.executionPeriodOfMinute = parseInt(time[1])
          } else if (time[0] != '*' && time[1] === '*') {
            this.taskExecution.executionPeriod = 'm'
            this.taskExecution.executionPeriodOfMinute = parseInt(time[1])
          } else if (time[5] === '*' && time[3] === '?') {
              this.taskExecution.executionPeriod = 'w'
              this.taskExecution.executionPeriodOfHour = parseInt(time[2])
              this.taskExecution.executionPeriodOfMinute = parseInt(time[1])
            }
          this.getExecutionPeriod(this.taskExecution.executionPeriod)
        } else if (this.taskExecution.executionFrequency === '01') {
          this.taskExecution.executionOneTime = this.executionTmp.executionTime
        } else {
          this.taskExecution.executionCronTime = this.executionTmp.executionTime
        }

        this.taskExecution.executionFailureMechanism = this.executionTmp.executionFailureMechanism
        this.getFailureMechanism(this.executionTmp.executionFailureMechanism)
        if (this.taskExecution.executionFailureMechanism == '03') {
          var failureContent = this.executionTmp.executionFailureContent
          this.taskExecution.executionFailureDateTime = parseInt(failureContent)  
        }
        if ((this.executionTmp.executionOpenTime == null && this.executionTmp.executionCloseTime == null)
        ||(this.executionTmp.executionOpenTime =='' && this.executionTmp.executionCloseTime =='')) {
          this.getFailureTime('01')
          this.taskExecution.failureTime = '01'
        } else {
          this.getFailureTime('02')
          this.taskExecution.failureTime = '02'
          this.taskExecution.executionOpenTime = this.executionTmp.executionOpenTime
          this.taskExecution.executionCloseTime = this.executionTmp.executionCloseTime
        }
      } else {
        this.taskExecution.executionFrequency = '01'
        this.taskExecution.executionFailureMechanism = '01'
        this.taskExecution.failureTime = '01'
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.col{
    margin-bottom: 10px;
}

.inline{
    margin-left: 50px;
    display: inline;
}
.radio{
    margin-top:10px;
    margin-bottom: 10px;
    height: 40px;
}

.radio1{
   height: 85px;
}

  #stdCategoryForm {
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
  }

  .ivu-form-item {
    width: 100%;
  }

  .el-col-8 {
    height: 70px;
  }

  .page-title {
    border-bottom: 1px solid #ddd;
    margin-bottom: 30px;
    font-size: 16px;
    line-height: 40px;
    color: #666;
    i {
      margin: 0 10px;
    }
  }
</style>
