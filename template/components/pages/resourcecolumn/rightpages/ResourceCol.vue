<style lang="scss" >
  .formtable-con{
    position: relative;
    .formtable-tree{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 234px;
        background: #fff;
        padding: 10px;
        .ivu-tree ul li{
            margin: 6px 0;
        }
        .ivu-checkbox-focus{
            box-shadow: none;
            z-index: 1;
        }
        .ivu-checkbox-inner{
            border-radius: 0px;
        }
        .ivu-tree .ivu-checkbox-wrapper:focus{
            outline: none;
            border: none;
        }
        .ivu-tree-arrow{
            i{
                width: 19px;
                height: 16px;
            }
        }
        .ivu-tree-children>li{
            .ivu-checkbox-inner{
                width: 19px;
                height: 16px;
                border: none;
                background: url(../../../../assets/img/icon/file-one.png) no-repeat;
            }
        }
        .ivu-tree-children>li{
            .ivu-checkbox-inner:focus{
                outline: none;
                border: none;
            }
        }
        .ivu-tree-children li ul{
            .ivu-checkbox-inner{
                width: 19px;
                height: 14px;
                border: none;
                background: url(../../../../assets/img/icon/file-two.png) no-repeat;
            }

        }
        .ivu-icon-ios-arrow-forward:before{
            content: '';
        }
        .ivu-tree-arrow i{
            display: inline-block;
            width: 13px;
            height: 13px;
            background: url(../../../../assets/img/icon/open-iocn.png) no-repeat;
        }
        .ivu-tree-arrow.ivu-tree-arrow-open{
            i{
                transform: rotate(0deg);
                display: inline-block;
                width: 13px;
                height: 13px;
                background: url(../../../../assets/img/icon/close-icon.png) no-repeat;
            }
        }
        .ivu-checkbox-input{
            outline: none;
        }
        .ivu-checkbox.ivu-checkbox-checked{
            font-size: 0;
        }
        .ivu-checkbox.ivu-checkbox-checked:focus{
            outline: none;
            border: none;
        }
        .ivu-checkbox-checked .ivu-checkbox-inner:after{
            transform: rotate(0deg) scale(1);
            border: none;
        }
        .ivu-checkbox-inner:after{
            border: none;
        }
        .ivu-checkbox:focus{
            outline: none;
            border: none;
        }
    }
    .formtab-ri{
        margin-left: 266px;
        background: #fff;
        height: 800px;
    }
    .tab-tit{
        overflow: hidden;
        border-bottom:1px solid rgba(221,226,233,1);
        li{
            float: left;
            width: 67px;
            margin-right: 6px;
        }
        .text-col{
            cursor: pointer;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border:1px solid rgba(221,226,233,1);
            border-bottom: none;
            border-radius: 4px 4px 0 0;
            color:rgba(44,140,240,1);
            font-size: 16px;
        }
        .text-col:hover{
            background:rgba(44,140,240,1);
            color: #fff;
            border:1px solid #2C8CF0;
        }
        .active{
            background:rgba(44,140,240,1);
            color: #fff;
            border:1px solid #2C8CF0;
        }
        li:last-child{
           margin-right: 0px;
        }
    }
    .formtab-ri{
        position: relative;
        padding: 28px 22px 22px 22px;
        .lefts{
            float: left;
            font-size: 14px;
            input,span{
                display: inline-block;
                vertical-align: middle;
            }
            input{
                height: 30px;
                line-height: 30px;
                text-indent: 20px;
                width: 120px;
                outline: none;
                border-radius:4px 0 0 4px;
                background: url(../../../../assets/img/icon/search-bg.png) no-repeat 4px 40%;
                border:1px solid rgba(223,230,235,1);
                border-right: none;
                transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out,width .4s ease-in-out;
            }
            input:hover{
                border-color: #57a3f3;
                width: 160px;
            }
            input:focus {
                border-color: #57a3f3;
                outline: 0;
                box-shadow: 0 0 0 2px rgba(45,140,240,.2);
            }
            .serachBtn{
                z-index: 100;
                margin-left: -4px;
                height: 30px;
                line-height: 32px;
                width: 64px;
                text-align: center;
                background:rgba(0,123,236,1);
                border-radius:0px 4px 4px 0px;
                color: #fff;
                cursor: pointer;
            }
        }
        .better-ntn{
            cursor: pointer;
            z-index: 777;
            span,i{
                display: inline-block;
                vertical-align: middle;
            }
            span{
                font-size:14px;
                color:rgba(0,123,236,1);
                margin: 0 8px 0 12px;
            }
            i{
                width: 11px;
                height: 6px;
                background: url(../../../../assets/img/icon/better-ser.png) no-repeat;
            }
        }
        .rights{
            float: right;
            li{
                float: left;
                padding: 4px 8px;
                background:rgba(255,255,255,1);
                border-radius:4px;
                border:1px solid rgba(174,174,174,1);
                font-size: 0;
                margin-left: 6px;
            }
            i,span{
                display: inline-block;
                vertical-align: middle;
            }
            span{
                font-size: 14px;
            }
            i{
                margin-top: -2px;
            }
            .icon0{
                width: 12px;
                height: 12px;
                background: url(../../../../assets/img/icon/add-btn-bef.png) no-repeat;
            }
            .icon1{
                width: 13px;
                height: 13px;
                background: url(../../../../assets/img/icon/uop-bens.png) no-repeat;
            }
            .icon2{
                width: 13px;
                height: 13px;
                background: url(../../../../assets/img/icon/uop-bens.png) no-repeat;
            }
            .icon3{
                width: 13px;
                height: 9px;
                background: url(../../../../assets/img/icon/submit-btn.png) no-repeat;
            }
            .icon4{
                width: 12px;
                height: 12px;
                background: url(../../../../assets/img/icon/delete-btn.png) no-repeat;
            }
            .text1{
                color: #0072FF;
                font-size: 14px;
            }
            .listIcon0{
                cursor: pointer;
                border:1px solid rgba(0,114,255,1);
                .icon0{
                    background: url(../../../../assets/img/icon/add-btn.png) no-repeat;
                }
                span{
                    color: #0072FF;
               }
            }
            .listIcon0:hover{
                background: #0072FF;
                .icon0{
                    background: url(../../../../assets/img/icon/add-btn-wh.png) no-repeat;
                }
                span{
                    color: #fff;
                }
            }
            .listIcon1{
                cursor: pointer;
                border:1px solid rgba(3,183,181,1);
                .icon1{
                    background: url(../../../../assets/img/icon/enters-btn.png) no-repeat;
                }
                span{
                    color: #03B7B5;
               }
            }
            .listIcon1:hover{
                background: #03B7B5;
                .icon1{
                    background: url(../../../../assets/img/icon/uop-bens-wh.png) no-repeat;
                }
                span{
                    color: #fff;
                }
            }
            .listIcon2{
                cursor: pointer;
                border:1px solid rgba(245,160,35,1);
                .icon2{
                    background: url(../../../../assets/img/icon/uop-bens-san.png) no-repeat;
                }
                span{
                    color: #F5A023;
               }
            }
            .listIcon2:hover{
                background: #F5A023;
                .icon2{
                    background: url(../../../../assets/img/icon/uop-bens-wh.png) no-repeat;
                }
                span{
                    color: #fff;
                }
            }
            .listIcon3{
                cursor: pointer;
                border:1px solid rgba(0,114,255,1);
                .icon3{
                    background: url(../../../../assets/img/icon/submit-btn-sub.png) no-repeat;
                }
                span{
                    color: #0072FF;
               }
            }
            .listIcon3:hover{
                background: #0072FF;
                .icon3{
                    background: url(../../../../assets/img/icon/submit-btn-wh.png) no-repeat;
                }
                span{
                    color: #fff;
                }
            }
            .listIcon4{
                cursor: pointer;
                border:1px solid rgba(224,55,27,1);
                .icon4{
                    background: url(../../../../assets/img/icon/delete-btn-des.png) no-repeat;
                }
                span{
                    color: #E0371B;
               }
            }
            .listIcon4:hover{
                background: #E0371B;
                .icon4{
                    background: url(../../../../assets/img/icon/delete-btn-wh.png) no-repeat;
                }
                span{
                    color: #fff;
                }
            }
        }
        .ivu-tabs-bar {
            border-bottom: 1px solid #2C8CF0;
            margin-bottom: 10px;
            margin-top: 22px;
        }
        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
            border: 1px solid #2C8CF0;
            border-bottom: none;
            width:82px;
            margin-right: 10px;
            text-align: center;
            background:#fff;
            font-size: 16px;
            padding: 4px 0;
            color: rgba(44,140,240,1);
        }
        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab.ivu-tabs-tab-active{
            border: 1px solid #2C8CF0;
            border-bottom: 1px solid #2C8CF0;
            background: #2C8CF0;
            color: #fff;
        }
        .ivu-badge-count{
            box-shadow:0 0 0;
            right: -33px;
        }
        .ivu-badge-count-alone{
            top: -31px;
            position: absolute;
        }
        .ivu-tabs-nav-scroll{
            overflow: visible;
        }
        .ivu-tabs-nav-wrap{
            overflow: visible;
        }
        .ivu-tabs-nav-container{
            overflow: visible;
        }
    }
    .morelist{
        .ivu-table-cell{
            padding: 0px;
        }

        .ivu-table td, .ivu-table th{
            height: 38px;
            text-align: center;
            font-size: 14px;
            color:rgba(0,0,0,0.85);
        }
        .ivu-table th{
            font-size: 14px;
            font-weight: bold;
            color: #000;
            background:rgba(245,250,255,1);
        }
        .ivu-table td:nth-child(3){
            .ivu-table-cell{
                padding-left: 10px;
                text-align: left;
                width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .ivu-table td:last-child{
          .ivu-table-cell{
            span{
                cursor: pointer;
                color: #007BEC;
                text-decoration: underline;
            }
          }
        }
        .ivu-page{
            margin-top: 27px;
            text-align: center;
        }
        .ivu-page-item-active{
            background:rgba(44,140,240,1);
            color: #fff;
        }
        .ivu-page-item-active a, .ivu-page-item-active:hover a{
            background:rgba(44,140,240,1);
            color: #fff;
        }
        .ivu-page-item:hover{
            background:rgba(44,140,240,1);
        }
        .ivu-page-item:hover a{
            color: #fff;
        }
        .ivu-btn-primary{
            background: transparent;
            border: none;
            span:focus{
                outline: none;
                border: none;
            }
        }
        .ivu-btn-primary:focus {
            box-shadow: none;
        }
    }
    .tex-passs{
        padding-top: 10px;
        position: absolute;
        top: 56px;
        left: 22px;
        right: 22px;
        z-index: 999;
    }
    .dialog-text{
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 2px 0px rgba(152,150,150,0.29);
        border-radius:4px;
        border:1px solid rgba(223,230,240,1);
        padding: 0 15px 20px 0;
        .heights{
            height: 10px;
            background: #fff;
            margin-bottom: 20px;
        }
        .ivu-form .ivu-form-item-label{
                padding: 10px 0 10px 0;
                font-size: 14px;
                color: #333;
        }
        .ivu-input{
            font-size: 14px;
        }
        .ivu-form-item{
            margin-bottom: 0px;
        }
        .querys{
            margin-top: 32px;
            text-align: center;
            span{
                display: inline-block;
                border-radius:4px;
                cursor: pointer;
                width: 70px;
                height: 32px;
                line-height: 32px;
                font-size: 14px;
                color: #fff;
                background: #007BEC;
            }
        }
    }
    .dia-hei{
        height: 150px;
        overflow: visible;
        transition:height 500ms;
    }
    .text-jiao{
        position: absolute;
        top: 2px;
        left: 23%;
        margin-left: -4px;
        height: 0px;
        width: 0px;
        border-left: 9px solid transparent;
        border-bottom: 9px solid rgba(223,230,240,1);
        border-right: 9px solid transparent;
    }
    .jiao{
        position: absolute;
        top: 2px;
        left: 23%;
        margin-left: -8px;
        height: 0px;
        width: 0px;
        border-left: 8px solid transparent;
        border-bottom: 8px solid #fff;
        border-right: 8px solid transparent;
    }

    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateY(10px);
      opacity: 0;
    }


}
</style>
<template>
  <div class="list-apadd" @click="checktanchuceng">
    <div class="formtable-con">
      <div class="formtable-tree">
        <ul class="tab-tit fn-clear">
          <li v-for="(item,index) in textList" :key="index" @click="textBtn(index)">
            <div class="text-col" :class="{active:itempaage==index}">{{item}}</div>
          </li>
        </ul>
        <div class="tab-texts" v-if="itempaage==0">
          <Tree :data="data2" show-checkbox></Tree>
        </div>
        <div class="tab-texts" v-if="itempaage==1">b</div>
        <div class="tab-texts" v-if="itempaage==2">c</div>
      </div>
      <div class="formtab-ri">
        <div class="tab-lista fn-clear">
          <div class="lefts">
            <input type="text" placeholder="按用户账号搜索">
            <span class="serachBtn">搜索</span>
            <span class="better-ntn" @click.stop="toggle">
                <span>高级搜索</span>
                <i></i>
            </span>
          </div>
          <ul class="rights fn-clear">
            <li v-for="(item,index) in btnLists" :key="index" :class="item.iconShow?'listIcon'+index:''" @click="moreBtn(item.iconShow,index)">
              <i :class="'icon'+index"></i>
              <span>{{item.text}}</span>
            </li>
          </ul>
        </div>
        <!-- <transition > -->
        <transition name="slide-fade">
          <div class="tex-passs modalDiaLog" @click.stop="" v-show="dialog">
              <div class="dialog-text">
                <div class="heights"></div>
                <div class="text-jiao">
                  <div class="jiao"></div>
                </div>
                <Form :model="formItem" :label-width="74">
                  <Row>
                    <Col span="6">
                    <FormItem label="名称：">
                      <Input v-model="formItem.input" placeholder="请输入流程分类名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="描述：">
                      <Input v-model="formItem.input2" placeholder="请输入描述内容"></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="业务分类：">
                      <Select v-model="formItem.select">
                        <Option value="请输入描述内容" v-for="item in optionList1" :key="item.id">{{item}}</Option>
                      </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="业务类型：">
                      <Select v-model="formItem.select2">
                        <Option value="请选择内容" v-for="item in optionList2" :key="item.id">{{item}}</Option>
                      </Select>
                    </FormItem>
                    </Col>
                  </Row>
                </Form>
                <div class="querys">
                  <span class="qurbtns" @click="showClose">查询</span>
                </div>
              </div>
          </div>
        </transition>
        <Tabs type="card">
          <TabPane :label="label">
            <div class="morelist">
              <Table border ref="selection" :columns="columns4" :data="data1"></Table>
              <Page :total="100" show-sizer />
            </div>
          </TabPane>
          <TabPane label="草稿">草稿</TabPane>
          <TabPane label="待编审">待编审</TabPane>
          <TabPane label="待编审">待编审</TabPane>
          <TabPane label="已编审">已编审</TabPane>
          <TabPane label="编审退回">编审退回</TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'resourceCol',
  data() {
    return {
      itempaage: 0,
      dialog: false,
      textList: ['基础', '主题', '部门'],
      label: (h) => {
        return h('div', [
          h('span', '全部'),
          h('Badge', {
            props: {
              count: 6
            }
          })
        ])
      },
      data2: [{
        title: '主题信息资源类',
        expand: false,
        children: [{
          title: '资源类1'
        },
        {
          title: '资源类2'
        }
        ]
      },
      {
        title: '省发改委信用目录',
        expand: true,
        children: [{
          title: '信用体系建设'
        },
        {
          title: '行政许可'
        },
        {
          title: '行政处罚'
        }
        ]
      },
      {
        title: '省高级法院信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '失信被执行人名单',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省编办信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省教育厅信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省科技厅信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省工信委信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省民委信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省民政厅信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省财政厅信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省人社厅信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省国土厅信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省环保厅信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省住建厅信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      },
      {
        title: '省交通厅信用目录',
        expand: false,
        children: [{
          title: '资源类1'
        }]
      }
      ],
      btnLists: [{
        iconShow: true,
        text: '新增'
      },
      {
        iconShow: true,
        text: '导入列表'
      },
      {
        iconShow: false,
        text: '批量导出'
      },
      {
        iconShow: false,
        text: '批量提交'
      },
      {
        iconShow: false,
        text: '批量删除'
      }
      ],
      columns4: [{
        type: 'selection',
        width: 60,
        align: 'center'
      },
      {
        title: '序号',
        type: 'index',
        width: 60,
        align: 'center'
      },
      {
        title: '目录名称',
        width: 220,
        key: 'name'
      },
      {
        title: '共享开放类型',
        width: 180,
        key: 'nametype'
      },
      {
        title: '更新周期',
        key: 'updates'
      },
      {
        title: '信息主体',
        key: 'message'
      },
      {
        title: '目录状态',
        key: 'dtatus'
      },
      {
        title: '操作',
        key: 'operation',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.show(params.index)
                }
              }
            }, '详情')
          ]);
        }
      }
      ],
      data1: [{
        name: '水利基础设施项目中央预水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      },
      {
        name: '水利基础设施项目中央预',
        nametype: '无条件共享 / 不可开放',
        updates: '实时',
        message: '法人',
        dtatus: '已编审'
      }
      ],
      formItem: {
        input: '',
        select: '',
        input2: '',
        select2: ''
      },
      optionList1: ['替代文字', '替代文字', '替代文字', '替代文字'],
      optionList2: ['替代文字', '替代文字', '替代文字', '替代文字'],
      dialog: false,
      cIndex: -1,
      datat: [
                    { id: 1, name: 'a' },
                    { id: 2, name: 'b' },
                    { id: 3, name: 'c' },
                    { id: 4, name: 'd' }
      ]
    }
  },
  mounted() {
    let _that = this;
    document.addEventListener('click', (e) => {
      if (e.target.className != 'dialog-text') {
        this.dialog = false;
      }
    })
  },
  methods: {
    textBtn(index) {
      this.itempaage = index;
    },
    moreBtn(text, index) {
      if (text == true) {
        this.$router.push({ path: '/' + 'messlist' })
      }
    },
    // 详情
    show(index) {
      this.$router.push({ path: '/catalogdetails' })
    },
    // 高级搜索
    toggle() {
      this.dialog = !this.dialog;
    },
    // 查询按钮
    showClose: function() {
      this.dialog = false;
    },
    checktanchuceng() {
      if (this.dialog = true) {
        this.dialog = false
      }
    }
  }
}
</script>
