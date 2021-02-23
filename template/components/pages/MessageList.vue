<style lang="scss" >
.list-apadd {
  padding: 30px 30px 30px 20px;
}
.mess-listone {
  background: #fff;
  padding: 4px 0 26px;
  .list-padd {
    padding: 0 20px;
    position: relative;
  }

  .ivu-table-wrapper {
    border: none;
  }

  .ivu-table-border td,
  .ivu-table-border th {
    border: none;
  }
  .ivu-table td,
  .ivu-table th {
    border-bottom: none;
    height: 44px;
  }

  .ivu-table-header {
    overflow: hidden;
    display: none;
  }

  table {
    border: none;
    td{
      padding-left: 0;
    }
  }

  .ivu-table:after {
    background: #fff;
  }

  .ivu-table:before {
    background: #fff;
  }

  .ivu-table-cell {
    padding: 0;
    font-size: 16px;
    color: #333;
  }

  td.ivu-table-column-center,
  th.ivu-table-column-center {
    text-align: left;
  }

  .ivu-table-row {
    td:last-child {
      text-align: right;
      .ivu-table-cell {
      font-size: 14px;
      color: #666;
    }
    }

    .ivu-icon {
      width: 6px;
      height: 6px;
      background: rgba(153, 153, 153, 1);
      border-radius: 6px;
    }
  }

  .ivu-page {
    margin-top: 26px;
    text-align: center;
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
  }
  .ivu-tabs-bar {
      border-bottom: 1px solid #2C8CF0;
      margin-bottom: 10px;
      margin-top: 22px;
  }
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
      border: 1px solid #2C8CF0;
      border-bottom: none;
      width:90px;
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
      right: -22px;
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
  .textr {
    z-index: 9999;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    color: rgba(0,123,236,1);
}
}
</style>
<template>
<div class="list-apadd">
  <div class="mess-listone">
    <h2 class="title">
        <i></i>
        <span>消息中心列表</span>
    </h2>
    <div class="list-padd">
      <span class="textr" @click="redBtn">全部转为已读</span>
      <Tabs type="card">
          <TabPane :label="label">
            <Table border ref="selection" :columns="columns4" :data="data1"></Table>
            <Page :total="100" :current="1" show-sizer />
          </TabPane>
          <TabPane label="公告信息">公告信息</TabPane>
          <TabPane label="通知消息">通知消息</TabPane>
        </Tabs>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'messageList',
  data() {
    return {
      numlist: 0,
      label: (h) => {
        return h('div', [
          h('span', '代办事项'),
          h('Badge', {
            props: {
              count: 6
            }
          })
        ])
      },
      columns4: [
        {
          type: 'selection',
          width: 34,
          align: 'center'
        },
        {
          title: 'Icon',
          width: 20,
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              })
            ]);
          }
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Date',
          key: 'date'
        }
      ],
      data1: [
        {
          name: '刘家义龚正对迎接中央第三环保督查组进驻提出要求',
          date: '2018-08-12 09:12:11'
        },
        {
          name: '习近平：深化机构改革推动改革工作',
          date: '2018-08-12 09:12:11'
        },
        {
          name: '盲人办卡遇阻：不仅银行需反思',
          date: '2018-08-12 09:12:11'
        },
        {
          name: '国家林业局：预计今春北方地区沙尘次数为7至10次',
          date: '2018-08-12 09:12:11'
        },
        {
          name: '中国“洋垃圾”禁令实施3个月 美国垃圾成山',
          date: '2018-08-12 09:12:11'
        },
        {
          name: '“全行业禁入”制度倒逼配送员遵法守序',
          date: '2018-08-12 09:12:11'
        },
        {
          name: '刘家义龚正对迎接中央第三环保督查组进驻提出要求',
          date: '2018-08-12 09:12:11'
        },
        {
          name: '习近平：深化机构改革推动改革工作',
          date: '2018-08-12 09:12:11'
        },
        {
          name: '盲人办卡遇阻：不仅银行需反思',
          date: '2018-08-12 09:12:11'
        },
        {
          name: '国家林业局：预计今春北方地区沙尘次数为7至10次',
          date: '2018-08-12 09:12:11'
        }
      ]
    };
  },
  methods: {
    tabBtn(index) {
      this.numlist = index;
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    redBtn() {
      var classs = document.getElementsByClassName('ivu-badge');
      for (var i = 0; i < classs.length; i++) {
        if (i > 0) {
          classs[i].style.display = 'none';
        }
      }
    }
  }
};
</script>
