<style lang="scss" >
  .mess-lista {
  background: #fff;
  padding: 4px 0 26px;

  h2.titl {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px dashed rgba(221, 221, 221, 1);

    i,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    i {
      margin-left: 15px;
      width: 6px;
      height: 16px;
      background: url(../../../../assets/img/icon/Title-icon.png) no-repeat;
    }

    span {
      margin-left: 10px;
      font-size: 16px;
      color: #000;
    }
  }

  .list-padd {
    padding: 0 20px;
  }

  table {
    text-align: center;
    height: 665px;
    width: 100%;
    text-align: left;
    margin: 0 auto;
    margin-bottom: 41px;

    td {
      border: 1px solid rgba(229, 229, 229, 1);
      padding-left: 20px;
      height: 36px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #333;
    }

    .table_th1,
    .table_th2,
    .table_th3,
    .table_th4 {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #666;
      background: rgba(245, 250, 255, 1);
    }

    .table_th1 {
      width: 14%;
      padding: 0 0 0 12px;
    }

    .table_th2 {
      width: 14%;
      text-align: right;
      padding: 0 20px 0 0;
    }

    .table_th3 {
      width: 33px;
      padding: 41px 11px 39px 13px;
    }

    .table_th4 {
      width: 9.2%;
    }

    .table_tb2 {
      width: 30%;
    }
  }

  .return {
    display: block;
    width: 80px;
    height: 36px;
    margin: 0 auto;
    background: rgba(44, 140, 240, 1);
    border-radius: 4px;
    border: 1px solid rgba(58, 157, 255, 1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 36px;
    cursor: pointer;
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

</style>
<template>
  <div class="list-apadd">
    <div class="mess-lista">
      <h2 class="titl">
            <i></i>
            <span>编目详情</span>
        </h2>
      <div class="list-padd">
        <Tabs type="card">
          <TabPane label="目录信息">
            <div class="text-conts">
              <table cellspacing="0">
                <tr>
                  <td colspan="2" class="table_th1">{{tableData.directoryName}}</td>
                  <td colspan="4" class="table_tb1">{{tableData.columnName}}</td>
                </tr>
                <tr>
                  <td colspan="2" class="table_th1">{{tableData.directoryReferred}}</td>
                  <td class="table_tb2">{{tableData.referredName}}</td>
                  <td colspan="2" class="table_th2">{{tableData.category}}</td>
                  <td class="table_tb2">{{tableData.categoryName}}</td>
                </tr>
                <tr>
                  <td colspan="2" class="table_th1">{{tableData.correlationBasis}}</td>
                  <td>{{tableData.basisName}}</td>
                  <td colspan="2" class="table_th2">{{tableData.relatedTopics}}</td>
                  <td>{{tableData.topicsName}}</td>
                </tr>
                <tr>
                  <td colspan="2" class="table_th1">{{tableData.refreshCycle}}</td>
                  <td>{{tableData.cycleName}}</td>
                  <td colspan="2" class="table_th2">{{tableData.resourceFormat}}</td>
                  <td>{{tableData.formatName}}</td>
                </tr>
                <tr>
                  <td colspan="2" class="table_th1">{{tableData.correlationBasis}}</td>
                  <td>{{tableData.basisName}}</td>
                  <td colspan="2" class="table_th2">{{tableData.relatedTopics}}</td>
                  <td>{{tableData.topicsName}}</td>
                </tr>
                <tr>
                  <td colspan="2" class="table_th1">{{tableData.directoryReferred}}</td>
                  <td>{{tableData.referredName}}</td>
                  <td colspan="2" class="table_th2">{{tableData.category}}</td>
                  <td>{{tableData.categoryName2}}</td>
                </tr>
                <tr>
                  <td colspan="2" class="table_th1">{{tableData.correlationBasis}}</td>
                  <td>{{tableData.basisName}}</td>
                  <td colspan="2" class="table_th2">{{tableData.relatedTopics}}</td>
                  <td>{{tableData.topicsName}}</td>
                </tr>
                <tr>
                  <td colspan="2" class="table_th1">{{tableData.directoryReferred}}</td>
                  <td>{{tableData.referredName}}</td>
                  <td colspan="2" class="table_th2">{{tableData.category}}</td>
                  <td>{{tableData.categoryName2}}</td>
                </tr>
                <tr>
                  <td rowspan="3" class="table_th3">{{tableData.sharedProperty}}</td>
                  <td class="table_th4">{{tableData.sharedType}}</td>
                  <td>{{tableData.sharedTypeName}}</td>
                  <td rowspan="3" class="table_th3">{{tableData.openProperty}}</td>
                  <td class="table_th4">{{tableData.openType}}</td>
                  <td>{{tableData.openTypeName}}</td>
                </tr>
                <tr>
                  <td class="table_th4">{{tableData.sharedMode}}</td>
                  <td>{{tableData.sharedModeName}}</td>
                  <td class="table_th4">{{tableData.openMode}}</td>
                  <td>{{tableData.openModeName}}</td>
                </tr>
                <tr>
                  <td class="table_th4">{{tableData.sharedConditions}}</td>
                  <td>{{tableData.sharedConditionsName}}</td>
                  <td class="table_th4">{{tableData.openConditions}}</td>
                  <td>{{tableData.openConditionsName}}</td>
                </tr>
                <tr>
                  <td rowspan="3" class="table_th3">{{tableData.sharedProperty}}</td>
                  <td class="table_th4">{{tableData.sharedType}}</td>
                  <td>{{tableData.sharedTypeName}}</td>
                  <td rowspan="3" class="table_th3">{{tableData.openProperty}}</td>
                  <td class="table_th4">{{tableData.openType}}</td>
                  <td>{{tableData.openTypeName}}</td>
                </tr>
                <tr>
                  <td class="table_th4">{{tableData.sharedMode}}</td>
                  <td>{{tableData.sharedModeName}}</td>
                  <td class="table_th4">{{tableData.openMode}}</td>
                  <td>{{tableData.openModeName}}</td>
                </tr>
                <tr>
                  <td class="table_th4">{{tableData.sharedConditions}}</td>
                  <td>{{tableData.sharedConditionsName}}</td>
                  <td class="table_th4">{{tableData.openConditions}}</td>
                  <td>{{tableData.openConditionsName}}</td>
                </tr>
                <tr>
                  <td rowspan="3" class="table_th3">{{tableData.sharedProperty}}</td>
                  <td class="table_th4">{{tableData.sharedType}}</td>
                  <td>{{tableData.sharedTypeName}}</td>
                  <td rowspan="3" class="table_th3">{{tableData.openProperty}}</td>
                  <td class="table_th4">{{tableData.openType}}</td>
                  <td>{{tableData.openTypeName}}</td>
                </tr>
                <tr>
                  <td class="table_th4">{{tableData.sharedMode}}</td>
                  <td>{{tableData.sharedModeName}}</td>
                  <td class="table_th4">{{tableData.openMode}}</td>
                  <td>{{tableData.openModeName}}</td>
                </tr>
                <tr>
                  <td class="table_th4">{{tableData.sharedConditions}}</td>
                  <td>{{tableData.sharedConditionsName}}</td>
                  <td class="table_th4">{{tableData.openConditions}}</td>
                  <td>{{tableData.openConditionsName}}</td>
                </tr>
              </table>
              <span class="return" @click="retuanBtn">返回</span>
            </div>
          </TabPane>
          <TabPane label="信息项">信息项</TabPane>
          <TabPane label="审核信息">审核信息</TabPane>
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
      navList: [{
        name: '目录信息'
        //  show: false,
        //   value: 20
      }, {
        name: '信息项'
      }, {
        name: '审核信息'
      }],
      tableData: {
        // nothing:'无',
        columnName: '水利基础设施项目中央预算内补助和贴息补助资金申请报告审批初审（审查）',
        directoryName: '目录名称：',
        directoryReferred: '目录简称：',
        referredName: '无',
        category: '目录分类：',
        categoryName: '省直机构/省发展改革委/行政许可/ -301001003002',
        categoryName2: '无',
        correlationBasis: '关联基础：',
        basisName: '无',
        relatedTopics: '关联主题：',
        topicsName: '无',
        refreshCycle: '更新周期：',
        cycleName: '无',
        resourceFormat: '资源格式：',
        formatName: '电子文件',
        sharedProperty: '共享\n属性',
        openProperty: '开放\n属性',
        sharedType: '共享类型：',
        sharedTypeName: '无条件共享',
        openType: '开放类型：',
        openTypeName: '不可开放',
        sharedMode: '共享方式：',
        sharedModeName: '共享平台方式',
        openMode: '开放方式：',
        openModeName: '无',
        sharedConditions: '共享条件：',
        sharedConditionsName: '无',
        openConditions: '开放条件：',
        openConditionsName: '无'
      }
    }
  },
  methods: {
    tabBtn(index) {
      this.numlist = index;
    },
    retuanBtn() {
      this.$router.go(-1);
    }
  }
}
</script>
