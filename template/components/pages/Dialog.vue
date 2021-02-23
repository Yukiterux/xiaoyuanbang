<style lang="scss" >
.dialog-wrap{
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   background: rgba(0,0,0,0.6);
   .dialog-content{
       width: 734px;
       height: 676px;
       background: #fff;
       border-radius: 4px;
       position: absolute;
       top: 50%;
       margin-top: -338px;
       left: 50%;
       margin-left: -367px;
       /*标题*/
       .ivu-icon-md-close{
           font-size: 19px;
           float: right;
           background:none !important;
           position: relative;
           left: -20px;
           font-weight: 500;
           color:#007BEC;
           line-height: 34px;
           cursor: pointer;
       }
       /*主体内容*/
       .dialog-content-mian{
          margin-top: 21px;
          text-align: center;
          vertical-align: middle;
          position: relative;

          .step{
            width: 555px;
            text-align: left;
            margin-left: 110px;
          }
          .step-pre{
            position: absolute;
            top: 550px;
            left: 277px;
            width: 80px;
            height: 36px;
            color: #007BEC;
            background: #fff;
            font-size: 14px;
          }
          .step-next{
            position: absolute;
            top: 550px;
            left: 377px;
            width: 80px;
            height: 36px;
            font-size: 14px;
          }
          .indus-top{
            margin-top: 38px;
          }
          .indus-sel{
            line-height: 55px;
            .input-tip{
              display: inline-block;
              width: 7px;
              height: 7px;
              background: url(../../assets/img/icon/Shape.png) no-repeat;
              background-size: 100% 100%;
              margin-right: 9px;
              vertical-align: middle;
            }
            .input-tip2{
              display: inline-block;
              width: 7px;
              height: 7px;
              margin-right: 9px;
              vertical-align: middle;
            }
            .input-des{
              vertical-align: middle;
              margin-right: 2px;
            }
            .input-con{
              width: 468px;
              text-align: left;
            }
            .input-note{
              display: block;
              margin-left: -240px;
              color: #F08E34;
              font-size: 12px;
              line-height: 30px;
            }
            .ivu-checkbox-group{
              display: inline-block;
            }
            .input-word{
              display: inline-block;
              width: 468px;
              height: 99px;
            }
          }
          .ivu-steps-horizontal .ivu-steps-content{
            width: 50px;
            text-align: center;
            padding-left: 0px;
            margin-top: 8px;
          }
          .ivu-steps .ivu-steps-head-inner{
            width: 48px;
            height: 48px;
            border: none;
            background: url(../../assets/img/icon/sage-default.png) no-repeat;
            span{
              display:inline-block;
              height:48px;
              line-height: 48px;
              color: #fff;
              font-size: 18px;
            }
          }
          .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner{
              width: 50px;
              height: 50px;
              margin-top: -1px;
              background: url(../../assets/img/icon/sage-selected.png) no-repeat;
              span{
                color: #3282FC;
              }
          }
          .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner{
              width: 48px;
              height: 48px;
              border: none;
              background: url(../../assets/img/icon/sage-complete.png) no-repeat;
              span{
                color: #fff;
              }
          }
          .ivu-steps .ivu-steps-tail>i{
            border: 1px dashed #e8eaec;
            background: none;
          }
          .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after{
            background: none;
            border: 1px dashed #2d8cf0;
          }
          .ivu-steps .ivu-steps-tail{
            top:25px;
          }
       }
       .ivu-select-item:hover{
         background: #E8F4FF;
         color: #007BEC;
       }
   }
}
</style>
<template>
    <div class="dialog-wrap">
        <div class="dialog-content">
            <h2 class="title">
                <i></i>
                <span>目录编目页面</span>
                <Icon type="md-close" />
            </h2>
            <div class="dialog-content-mian">
                <Steps :current="current" class="step">
                    <Step title="" content="基本属性"></Step>
                    <Step title="" content="共享属性"></Step>
                    <Step title="" content="开放属性"></Step>
                    <Step title="" content="扩展属性"></Step>
                    <Step title="" content="信息项"></Step>
                </Steps>
                <Button type="primary" @click="pre" class="step-pre">返回</Button>
                <Button type="primary" @click="next" class="step-next">下一步</Button>

                <div class="indus-sel indus-top">
                    <i class="input-tip"></i>
                    <span class="input-des">行业信息：</span>
                    <Select v-model="model1" class="input-con">
                        <Option v-for="item in data1" :value="item.value" :key="item.id">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="indus-sel">
                    <i class="input-tip"></i>
                    <span class="input-des">行业信息：</span>
                    <Input v-model="value" placeholder="行业信息" class="input-con"/>
                    <span class="input-note">注意：填写信息替代文字</span>
                </div>
                <div class="indus-sel">
                    <i class="input-tip2"></i>
                    <span class="input-des">行业信息：</span>
                    <CheckboxGroup v-model="select" class="input-con">
                        <Checkbox label="选中"></Checkbox>
                        <Checkbox label="默认"></Checkbox>
                        <Checkbox label="不可选"></Checkbox>
                    </CheckboxGroup>
                </div>
                <div class="indus-sel">
                    <i class="input-tip"></i>
                    <span class="input-des">行业信息：</span>
                    <Input v-model="value1" placeholder="行业信息" class="input-con"/>
                    <span class="input-note">注意：填写信息替代文字</span>
                </div>
                <div class="indus-sel">
                    <i class="input-tip"></i>
                    <span class="input-des">行业信息：</span>
                    <RadioGroup v-model="disabledGroup" class="input-con">
                        <Radio label="选中"></Radio>
                        <Radio label="不可选"></Radio>
                    </RadioGroup>
                </div>
                <div class="indus-sel">
                    <i class="input-tip2"></i>
                    <span class="input-des">行业地址：</span>
                    <Input class="input-word" v-model="value2" type="textarea" :rows="3" placeholder="请输入地址" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
  data() {
    return {
      current: 0,
      model1: '',
      value: '',
      data1: [
        {
          value: '替代文字',
          label: '替代文字'
        },
        {
          value: '替代文字',
          label: '替代文字'
        },
        {
          value: '替代文字',
          label: '替代文字'
        },
        {
          value: '替代文字',
          label: '替代文字'
        }
      ],
      value1: '',
      select: ['选中', '默认'],
      disabledGroup: '选中',
      value2: ''
    }
  },
  methods: {
    pre () {
      if (this.current == 0) {
        this.current = 0;
      } else {
        this.current -= 1;
      }
    },
    next () {
      if (this.current == 4) {
        this.current = 4;
      } else {
        this.current += 1;
      }
    }

  }
}
</script>

