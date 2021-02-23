<template>
  <div class="ALLpagestable">
    <!--头部-->
    <nx-res-header></nx-res-header>
    <div class="data-content">
      <!--数据概览-地图-->
      <section class="mark-top">
        <div class="box-left">
          <div class="box-item box-left-top">
            <div class="item-title">
              上报国家
            </div>
            <div class="content">
              <div class="item">
                <div class="left">
                  <img src="../../assets/img/dataMarketIndex/menu-sec-icon1.png" alt="">
                </div>
                <div class="right">
                  <p style="position: relative;height: 45px;">
                    <span style="font-size: 16px;position: absolute;left: 0;top: 10px;">监管行为</span>
                    <span class="dstext" style="position:absolute;right: 0; color: #2075F2;font-size: 30px;">{{(sbxx.jgxwsjkMatters/10000).toFixed(2)}}
                    <span style="color: #10568A;font-size: 12px;" v-if="sbxx.jgxwsjkMatters>=10000">万条</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="sbxx.jgxwsjkMatters<10000">条</span>
                    </span>                    
                  </p>
                  <p>
<!--                    <Progress :percent="90" status="normal" hide-info/>-->
                    <span class="nx-progress progress1"></span>
                  </p>
                </div>
              </div>
              <div class="item">
                <div class="left">
                  <img src="../../assets/img/dataMarketIndex/menu-sec-icon2.png" alt="">
                </div>
                <div class="right">
                  <p style="position: relative;height: 45px;">
                    <span style="font-size: 16px;position: absolute;left: 0;top: 10px;">市场主体</span>
                    <span class="dstext" style="position:absolute;right: 0; color: #01D2CF;font-size: 30px;">{{(sbxx.jgdxsjkMatters/10000).toFixed(2)}}
                    <span style="color: #10568A;font-size: 12px;" v-if="sbxx.jgdxsjkMatters>=10000">万条</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="sbxx.jgdxsjkMatters<10000">条</span>
                    </span>
                  </p>
                  <p>
                    <span class="nx-progress progress2"></span>
                  </p>
                </div>
              </div>
              <div class="item">
                <div class="left">
                  <img src="../../assets/img/dataMarketIndex/menu-sec-icon3.png" alt="">
                </div>
                <div class="right">
                  <p style="position: relative;height: 45px;">
                    <span style="font-size: 16px;position: absolute;left: 0;top: 10px;">执法人员</span>
                    <span class="dstext" style="position:absolute;right: 0; color: #6ECCF6;font-size: 30px;">{{(sbxx.zfryxxkMatters/10000).toFixed(2)}}
                    <span style="color: #10568A;font-size: 12px;" v-if="sbxx.zfryxxkMatters>=10000">万条</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="sbxx.zfryxxkMatters<10000">条</span>                      
                    </span>
                  </p>
                  <p>
                    <span class="nx-progress progress3"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="box-item box-left-bottom">
            <div class="item-title">
              监管行为部门汇聚TOP5
            </div>
            <div class="content">
              <div id="deptGrowth" style="width: 100%;height: 337px;"></div>
            </div>
          </div>
        </div>
        <div class="box-middle">
          <div class="box-item box-middle-bottom">
            <div class="item-title">
              数据中心概览
            </div>
            <div class="content">
              <div class="item-box">
                <div class="item">
                  <p>归集总数</p>
                  <span class="s1 dstext">{{(gjzs / 10000).toFixed(2)}}</span><span class="s2">万条</span>
                </div>
                <div class="item">
                  <p>上报国家总数</p>
                  <span class="s1 dstext">{{(sbgjzs / 10000).toFixed(2)}}</span><span class="s2">万条</span>
                </div>
              </div>
              <div id="mapChart2" style="width: 100%;height: 712px;"></div>
            </div>
          </div>
        </div>
        <div class="box-right">
          <div class="box-item box-right-top">
            <div class="item-title">
              国家下发
            </div>
            <div class="content">
              <div class="item">
                <div class="left">
                  <img src="../../assets/img/dataMarketIndex/menu-right-icon1.png" alt="">
                </div>
                <div class="right">
                  <p><span>预警信号</span></p>
                  <p><span class="dstext" style="color: #02D3D0;">{{listStaCn.earlyWarningInfo>=10000 ? (listStaCn.earlyWarningInfo/10000).toFixed(2) : listStaCn.earlyWarningInfo}}</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="listStaCn.earlyWarningInfo>=10000">万条</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="listStaCn.earlyWarningInfo<10000">条</span>                   
                  </p>
                </div>
              </div>
              <div class="item">
                <div class="left">
                  <img src="../../assets/img/dataMarketIndex/menu-right-icon2.png" alt="">
                </div>
                <div class="right">
                  <p><span>投诉举报</span></p>
                  <p><span class="dstext" style="color: #F363A5;">{{listStaCn.Complaints >=10000 ? (listStaCn.Complaints/10000).toFixed(2) : listStaCn.Complaints}}</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="listStaCn.Complaints>=10000">万条</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="listStaCn.Complaints<10000">条</span>                   
                  </p>
                </div>
              </div>
              <div class="item">
                <div class="left">
                  <img src="../../assets/img/dataMarketIndex/menu-right-icon3.png" alt="">
                </div>
                <div class="right">
                  <p><span>信用信息</span></p>
                  <p><span class="dstext" style="color: #ED8C30;">{{listStaCn.CreditInformation>=10000 ? (listStaCn.CreditInformation/10000).toFixed(2) : listStaCn.CreditInformation}}</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="listStaCn.CreditInformation>=10000">万条</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="listStaCn.CreditInformation<10000">条</span>                  
                  </p>
                </div>
              </div>
              <div class="item">
                <div class="left">
                  <img src="../../assets/img/dataMarketIndex/menu-right-icon4.png" alt="">
                </div>
                <div class="right">
                  <p><span>事项清单</span></p>
                  <p><span class="dstext" style="color: #B26EC2;">{{listStaCn.List>=10000 ? (listStaCn.List/10000).toFixed(2) : listStaCn.List}}</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="listStaCn.List>=10000">万条</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="listStaCn.List<10000">条</span>
                  </p>

                </div>
              </div>
            </div>
          </div>
          <div class="box-item box-right-bottom">
            <div class="item-title">
              数据汇聚
            </div>
            <div class="content">
              <template v-for="item in sjhj">
                <div class="item">
                  <div class="txt">{{item.name}}</div>
                  <div class="parcent-bar-box sjhjbar">
<!--                    <Progress :percent="99">-->
<!--                      <Icon type="checkmark-circled"></Icon>-->
<!--                      <span>{{item.count}}</span>-->
<!--                    </Progress>-->
                    <span class="nx-progress2"></span>
                    <span style="color: #3F9DF5;display: inline-block;vertical-align: middle;text-align: right">{{(item.count >=10000 ? item.count/10000 : item.count).toFixed(2)}}</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="item.count>=10000">万条</span>
                    <span style="color: #10568A;font-size: 12px;" v-if="item.count<10000">条</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>
      <section class="base-menu">
        <div class="box-item">
          <div class="item-title">
            基础库
          </div>
          <div class="content">
            <template v-for="(it,index) in dataGovernList[1].childLists">
              <a @click="enterDataGoverBtn(it)">
                <img :src="require('../../assets/img/dataMarketIndex/eight-icon'+(index+1)+'.png')" alt="">
                <span>{{it.authorityName}}</span>
              </a>
            </template>
          </div>
        </div>
      </section>
      <section class="data-bottom">
        <div class="data-bottom-top">
          <div class="box-item">
            <div class="item-title">
              数据交换趋势
            </div>
            <div class="content">
              <div id="exchangetrends" style="width: 100%;height: 300px;"></div>
            </div>
          </div>
          <div class="box-item">
            <div class="item-title">
              监管事项覆盖率
            </div>
            <div class="content">
              <div id="errortrends" style="width: 100%;height: 300px;"></div>
            </div>
          </div>
        </div>
        <div class="data-bottom-bottom">
          <div class="box-item">
            <div class="item-title">
              部门数据汇聚月增长
            </div>
            <div class="content">
              <div id="deptData" style="width: 100%;height: 300px;"></div>
            </div>
          </div>
          <div class="box-item">
            <div class="item-title">
              错误数据整改情况
            </div>
            <div class="content">
              <div id="errorDataInfo" style="width: 100%;height: 300px;"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-new */
  // 宁夏头部
  import nxResHeader from '@/components/pages/resourcecolumn/nxResHeader'
  import 'echarts-gl'
  import 'echarts/map/js/province/ningxia'
  import {loadRouter} from '@/router/asyncRouter'
  import {buildMenu, saveParames} from '@/api/support/buildMenu'
  import {
    getCountryIssueResult,
    getCountryReportedResult,
    getDataAggregationResult,
    getDataCenterResult,
    getDataErrorRateResult,
    getDataExchangeResult,
    getDepartmentDataAggregationResult,
    getDepartmentDataAggregationIncreaseResult,
    getErrorDataSolveResult
  } from '@/api/dataMarket/dataMarket'
  import {
    userLoginByUuid,
    getUserInfo,
    getSystemSettings
  } from '@/api/components/login'
  export default {
    name: 'dataCenter',
    components: {
      nxResHeader
    },
    data() {
      return {
        markList: [
          {top: '186', left: '269', lineTop: '174', lineLeft: '261', lineWidth: '23', lineName: 'line_left'}, // 中卫
          {top: '319', left: '349', lineTop: '305', lineLeft: '378', lineWidth: '23', lineName: 'line_right'}, // 固原
          {
            top: '131',
            left: '339',
            lineTop: '85',
            lineLeft: '323',
            lineWidth: '30',
            lineName: 'line_left',
            size: 'mark_small'
          }, // 银川
          {
            top: '50',
            left: '364',
            lineTop: '36',
            lineLeft: '385',
            lineWidth: '23',
            lineName: 'line_right',
            size: 'mark_mini'
          }, // 石嘴山
          {
            top: '94',
            left: '343',
            lineTop: '117',
            lineLeft: '366',
            lineWidth: '69',
            lineName: 'line_right',
            size: 'mark_middle'
          } // 吴中
        ],
        // 浮框定位
        cityData: [
          {name: '银川市', value: '17989784', top: '65', left: '239'},
          {name: '石嘴山', value: '17989784', top: '14', left: '407'},
          {name: '吴忠市', value: '17989784', top: '100', left: '434'},
          {name: '中卫市', value: '17989784', top: '157', left: '177'},
          {name: '固原市', value: '17989784', top: '285', left: '400'}
        ],
        unitText: {
          w: '万条',
          t: '条'
        },
        listInDept: 78, // 接入部门总数量
        listInDeptDay: 35, // 今日接入部门数量
        listCreate: {
          averCreate: 120000,
          dayCreate: 80000
        }, // 今日新增
        listDeptIn: {
          totalAggr: 26532
        }, // 部门接入数据量统计
        listStaCn: {}, // 国家下发
        sbxx: {}, // 上报国家
        listCenDc: {
          convergenceZone: 3604872,
          lowerHairArea: 2628240,
          storageArea: 2011268,
          reportArea: 52000,
          appZone: 48000,
          problemArea: 69000
        }, // 数据中心预览
        listCenStor: {
          ipoiAmount: 204698,
          biroAmount: 325684,
          lormAmount: 203685,
          rbiAmount: 256347,
          kepbAmount: 275402,
          icrrmAmount: 196510,
          creditAmount: 221883,
          leprAmount: 327059,
          kbiAmount: 28000
        }, // 数据中心存储情况
        timeData: [],
        timeDataEcharts: {},
        nationDown: [
          {name: '预警信号'},
          {name: '投诉举报'},
          {name: '信用信息'},
          {name: '事项清单'}
        ],
        urbanStatistics:{},
        liLsit: [],
        exchangetrendsData: {},
        sjhj: [],
        centerData: [],
        dataGovernList: [],
        gjzs:'',
        sbgjzs:'', 
        data:[
         {
            name: '石嘴山'
          },
          {
            name: '银川'
          },
          {
            name: '吴忠'
          },
          {
            name: '中卫'
          },
          {
            name: '固原'
          }
        ],
        geoCoordMap: {
          石嘴山: [106.533447, 39.031052],
          银川: [106.104666, 38.591113],
          吴忠: [106.641461, 37.470551],
          中卫: [105.229609, 37.501102],
          固原: [106.023063, 35.75075]
        },
        dataT:[          {
            name: '石嘴山市',
            value: 80
          },
          {
            name: '中卫市',
            value: 70
          },
          {
            name: '银川市',
            value: 40
          },
          {
            name: '吴忠市',
            value: 20
          },
          {
            name: '固原市',
            value: 50
          }],
      }
    },
    created() {
      let sessionToken = sessionStorage.getItem('token')
      if (sessionToken) {
        this.getModelAuthor()
        this.getCountryIssueResult()
        this.getCountryReportedResult()
        this.getDataAggregationResult()
        this.getDataErrorRateResult()
        this.getDataExchangeResult()
        this.getDepartmentDataAggregationResult()
        this.getDepartmentDataAggregationIncreaseResult()
        this.getErrorDataSolveResult()
        this.getDataCenterResult()
        // this.mapChart2()
      } else {
        const token = this.getUrlKey('access_token')
        const uuid = this.getUrlKey('uuid')
        if (token) {
          this.getUserInfoByAccessToken(token)
        } else if (uuid) {
          this.getUserInfoByUuid(uuid)
        } else {
          this.$router.replace('/login')
        }
      }
    },
    filters: {
      addSup(msg) {
        var num = msg + ''
        var reg = /(?=(\B)(\d{3})+$)/g
        return num.replace(reg, ',')
      }
    },
    methods: {
      // 国家下发(end)
      getCountryIssueResult() {
        new Promise((resolve, reject) => {
          getCountryIssueResult().then(res => {
            if (res.data.resultCode === '0000') {
              this.listStaCn = JSON.parse(res.data.resultData.resultContent)
            }
          })
        })
      },
      // 跳转模块
      enterDataGoverBtn(item) {
        if (item.path !== undefined && item.path !== null && item.path.length > 0) {
          if (item.componentUrl === undefined || item.componentUrl === null || item.componentUrl === '') {
            window.open(item.path)
          } else {
            saveParames(item)
            this.$router.replace({path: item.path})
          }
        } else {
          try {
            if (item.menuList === null || item.menuList.length === 0) {
              this.$message({message: '该模块下暂无内容！', type: 'warning '})
            } else {
              if (item.menuList[0].url) {
                // '1' 代表从first界面跳转至菜单，'2'代表浏览器刷新或浏览器地址栏输入跳转至菜单
                sessionStorage.setItem('routeEnterFlag', '1')
                sessionStorage.setItem('menuList', JSON.stringify(item.menuList))
                saveParames(item.menuList[0])
                this.$router.push({path: item.menuList[0].url})
              } else if (item.menuList[0].secondMenuList[0].url) {
                // '1' 代表从first界面跳转至菜单，'2'代表浏览器刷新或浏览器地址栏输入跳转至菜单
                sessionStorage.setItem('routeEnterFlag', '1')
                sessionStorage.setItem('menuList', JSON.stringify(item.menuList))
                saveParames(item.menuList[0].secondMenuList[0])
                this.$router.push({path: item.menuList[0].secondMenuList[0].url})
              } else {
                this.$message({message: '该模块下暂无内容', type: 'fail'})
              }
            }
          } catch (e) {
            console.log(e.name + ': ' + e.message)
          }
        }
      },
      // 上报国家(end)
      getCountryReportedResult() {
        new Promise((resolve, reject) => {
          getCountryReportedResult().then(res => {
            if (res.data.resultCode === '0000') {
              this.sbxx = JSON.parse(res.data.resultData.resultContent)
            }
          })
        })
      },
      // 数据汇聚(end)
      getDataAggregationResult() {
        new Promise((resolve, reject) => {
          getDataAggregationResult().then(res => {
            if (res.data.resultCode === '0000') {
              this.sjhj = JSON.parse(res.data.resultData.resultContent)
            }
          })
        })
      },
      // 数据中心预览
      getDataCenterResult() {
        new Promise((resolve, reject) => {
          getDataCenterResult().then(res => {
            if (res.data.resultCode === '0000') {
              let obj = JSON.parse(res.data.resultData.resultContent)
              this.centerData = obj
              this.gjzs = this.centerData[0].value;
              this.sbgjzs = this.centerData[1].value;
              let data = this.centerData[2].value
              this.dataT[0].value=data.szss;
              this.dataT[1].value=data.zws;
              this.dataT[2].value=data.ycs;
              this.dataT[3].value=data.wzs;
              this.dataT[4].value=data.gys;
              this.mapChart2()
            }
          })
        })
      },
      // 事项覆盖率和错误率(end)
      getDataErrorRateResult() {
        new Promise((resolve, reject) => {
          getDataErrorRateResult().then(res => {
            if (res.data.resultCode === '0000') {
              let sxfglName = []
              let sxfglValue = []
              let obj = JSON.parse(res.data.resultData.resultContent)
              for (let i in obj) {
                sxfglName.push(obj[i].dapartName)
                //sxfglValue.push(obj[i].coverageRate)
                sxfglValue.push(this.my_tofixed(obj[i].coverageRate))
              }
              let myEcharts4 = this.$echarts.init(document.getElementById('errortrends'))
              let option4 = {
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  data: ['监管事项覆盖率']
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: sxfglName,
                  axisLabel: {
                    rotate: 35,
                    fontSize: 9,
                  },
                  // 网格样式
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: ['#CFDAE0'],
                      width: 1,
                      type: 'dashed'
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  // 网格样式
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: ['#CFDAE0'],
                      width: 1,
                      type: 'dashed'
                    }
                  }
                },
                series: [{
                  name: '事件覆盖率',
                  data: sxfglValue,
                  type: 'line',
                  areaStyle: {},
                  itemStyle: {
                    normal: {
                      symbol: 'circle',
                      symbolSize: 6,   // 设定实心点的大小
                      // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                      color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0, color: '#9FC7FA' // 0% 处的颜色
                        }, {
                          offset: 0.5, color: '#D4E6FD' // 100% 处的颜色
                        }, {
                          offset: 1, color: '#ECF4FE' // 100% 处的颜色
                        }]
                      ),  // 背景渐变色
                      lineStyle: {        // 系列级个性化折线样式
                        width: 2,
                        type: 'solid',
                        color: '#4DA1FF'
                      }
                    }
                  }// 线条样式
                }]
              }
              myEcharts4.setOption(option4)
              myEcharts4.resize()
            }
          })
        })
      },
      // 数据交换趋势图(end)
      getDataExchangeResult() {
        new Promise((resolve, reject) => {
          getDataExchangeResult().then(res => {
            if (res.data.resultCode === '0000') {
              this.exchangetrendsData = JSON.parse(res.data.resultData.resultContent)
              let reportUpward=[];
              let downwardReport=[];
              let date=[];
                for(var key in this.exchangetrendsData.ReportUpward){
                  date.push(key)
                  var value = this.exchangetrendsData.ReportUpward[ key ]; //注意是 [  ]
                  var value2 = this.exchangetrendsData.DownwardReport[ key ]
                  downwardReport.push(value2)
                  reportUpward.push(value)
                }
              let myEcharts1 = this.$echarts.init(document.getElementById('exchangetrends'))
              let option1 = {
                color: ['#4DA1FF', '#6ADFC5'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                legend: {
                  data: ['上报数据', '国家下发']
                },
                xAxis: [
                  {
                    type: 'category',
                    data: date.reverse(),
                    axisLabel: {
                      rotate: 60
                    },
                    // 网格样式
                    splitLine: {
                      show: true,
                      lineStyle: {
                        color: ['#CFDAE0'],
                        width: 1,
                        type: 'dashed'
                      }
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    // 网格样式
                    splitLine: {
                      show: true,
                      lineStyle: {
                        color: ['#CFDAE0'],
                        width: 1,
                        type: 'dashed'
                      }
                    }
                  }
                ],
                series: [
                  {
                    name: '上报数据',
                    type: 'bar',
                    data: reportUpward.reverse()
                  },
                  {
                    name: '国家下发',
                    type: 'bar',
                    data: downwardReport.reverse()
                  }
                ]
              }
              myEcharts1.setOption(option1)
              myEcharts1.resize()
            }
          })
        })
      },
      // 部门汇聚(end)
      getDepartmentDataAggregationResult() {
        new Promise((resolve, reject) => {
          getDepartmentDataAggregationResult().then(res => {
            if (res.data.resultCode === '0000') {
              let obj = JSON.parse(res.data.resultData.resultContent)
              let tempStr = obj[0].name.join(',')
              let deptName = tempStr.split(',')
              let deptValue = []
              for (let i in obj[0].colunt) {
                let tempValue = (obj[0].colunt[i] / 10000).toFixed(2)
                deptValue.push(tempValue)
              }
              let myEcharts3 = this.$echarts.init(document.getElementById('deptGrowth'))
              let option3 = {
                color: ['#4DA1FF', '#F88080'],
                tooltip: {
                  trigger: 'axis',
                    axisPointer: {
                      type: 'shadow',
                  },
                  formatter: '汇聚数据总量：{c}万条'
                },
                grid: {
                  left: 170 // 调整这个属性
                },
                legend: {
                  data: ['汇聚数据总量']
                },
                xAxis: {
                  type: 'value',
                  boundaryGap: [0, 0.01]
                },
                yAxis: {
                  // type: 'category',
                  data: deptName.reverse(),
                  // axisLabel: {
                  //   margin: 20
                  // }
                },
                series: [
                  {
                    name: '汇聚数据总量',
                    type: 'bar',
                    data: deptValue.reverse(),
                  }
                ]
              }
              myEcharts3.setOption(option3)
              myEcharts3.resize()
            }
          })
        })
      },
      //将数字四舍五入，小数点后保留2位(不用考虑正负数)
      my_tofixed (obj) {
        var times = Math.pow(10, parseInt(2));
        var big_float = parseFloat(obj) * times;
        /* 考虑负数 */
        var big_int = (big_float >= 0)? Math.round(big_float): Math.round(-1 * big_float) * -1;
        var res = big_int / times;
        return res;
      },
      // 部门数据月增长(end)
      getDepartmentDataAggregationIncreaseResult() {
        new Promise((resolve, reject) => {
          getDepartmentDataAggregationIncreaseResult().then(res => {
            if (res.data.resultCode === '0000') {
              let obj = JSON.parse(res.data.resultData.resultContent)
              let month = []
              let value = []
              for (var key in obj) {
                month.push(key)
              //  value.push((obj[key]).toPrecision(4) * 100)
              value.push(this.my_tofixed(obj[key]))
              }
              let myEcharts5 = this.$echarts.init(document.getElementById('deptData'))
              let option5 = {
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  data: ['本月数据']
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: month.reverse(),
                  axisLabel: {
                    rotate: 60
                  },
                  // 网格样式
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: ['#CFDAE0'],
                      width: 1,
                      type: 'dashed'
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  // 网格样式
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: ['#CFDAE0'],
                      width: 1,
                      type: 'dashed'
                    }
                  }
                },
                series: [
                  {
                    name: '本月数据',
                    type: 'line',
                    stack: '总量',
                    symbol: 'circle',
                    symbolSize: 6,   // 设定实心点的大小
                    data: value.reverse(),
                    smooth: true,
                    itemStyle: {
                      normal: {
                        color: '#4DA1FF',
                        lineStyle: {
                          width: 3,
                          type: 'solid',
                          color: '#4DA1FF',
                          shadowColor: 'rgba(0,0,0,0.4)',
                          shadowBlur: 10,
                          shadowOffsetY: 10
                        }
                      }
                    }// 线条样式
                  }
                ]
              }
              myEcharts5.setOption(option5)
              myEcharts5.resize()
            }
          })
        })
      },
      // 错误数据整改情况(end)
      getErrorDataSolveResult() {
        new Promise((resolve, reject) => {
          getErrorDataSolveResult().then(res => {
            if (res.data.resultCode === '0000') {
              let obj = JSON.parse(res.data.resultData.resultContent)
              let month = []
              let errorNum = []
              let errorRate = []
              for (let i in obj) {
                month.push(obj[i].month)
                errorNum.push(obj[i].errorNum)
                errorRate.push(((obj[i].errorRate).toPrecision(4) * 100).toFixed(2))
              }
              let myEcharts2 = this.$echarts.init(document.getElementById('errorDataInfo'))
              let option2 = {
                color: ['#4DA1FF', '#6ADFC5'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    crossStyle: {
                      color: '#999'
                    }
                  }
                },
                legend: {
                  data: ['错误量', '错误率']
                },
                xAxis: [
                  {
                    type: 'category',
                    data: month,
                    axisPointer: {
                      type: 'shadow'
                    },
                    axisLabel: {
                      rotate: 60
                    },
                    // 网格样式
                    splitLine: {
                      show: true,
                      lineStyle: {
                        color: ['#CFDAE0'],
                        width: 1,
                        type: 'dashed'
                      }
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    min: 0,
                    name: '数据总量(条)',
                    axisLabel: {
                      formatter: '{value}'
                    },
                    // 网格样式
                    splitLine: {
                      show: true,
                      lineStyle: {
                        color: ['#CFDAE0'],
                        width: 1,
                        type: 'dashed'
                      }
                    }
                  },
                  {
                    type: 'value',
                    min: 0,
                    axisLabel: {
                      formatter: '{value} %'
                    }
                  }
                ],
                series: [
                  {
                    name: '错误量',
                    type: 'bar',
                    data: errorNum
                  },
                  {
                    name: '错误率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: errorRate
                  }
                ]
              }
              
              myEcharts2.setOption(option2)
              myEcharts2.resize()
            }
          })
        })
      },
      convertData (data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var geoCoord = this.geoCoordMap[data[i].name]
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              })
            }
          }
          return res
        },
      // 宁夏地图
      mapChart2() {       
        let myChart = this.$echarts.init(document.getElementById('mapChart2'))
        var planePath =
          'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705'
        var dataFrom = '数据中心'
        this.geoCoordMap['数据中心'] = [106.103063, 37.16075];
        var returnData = [];
        for(var i = 0;i<this.data.length;i++){
          let one =  this.geoCoordMap[this.data[i].name];
          let two =  this.geoCoordMap[dataFrom];
          returnData.push({
            fromName: dataFrom,
            toName: this.data[i].name,
            coords: [
              one,
              two
            ]
           })
        };
        var option2 = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}{c}项'
          },
          visualMap: {
            seriesIndex: 0,
            dimension: 0,
            min: 0,
            max: 6000,
            left: 'left',
            top: 'bottom',
            text: ['事项', '单位：项'],
            calculable: true,
            inRange: {
              color: ['#41ade0', '#1672d2']
            }
          },
          geo3D: {
            show: false,
            map: '宁夏',
            roam: false,
            zlevel: 3,
            top: '0%',
            right: '0%',
            left: '0%',
            bottom: '0%',
            regionHeight: 8,
            itemStyle: {
              areaColor: '#e00',
              opacity: 1,
              borderWidth: 2,
              borderColor: 'rgb(5,163,255)'
            },
            label: {
              show: false,
              textStyle: {
                color: '#fff',
                fontSize: 16,
                opacity: 1
              }
            },
            emphasis: {
              label: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 16
                }
              }
            },
            viewControl: {
              zoomSensitivity: 1,
              damping: 0,
              rotateSensitivity: 1,
              projection: 'orthographic',
              orthographicSize: 600, // 控制地图大小
              maxOrthographicSize: 150,
              minOrthographicSize: 150,
              autoRotate: false,
              animation: true,
              alpha: 50,
              beta: 0,
              minBeta: -330,
              maxBeta: 390,
              autoRotateSpeed: 10
            },
            light: {
              // 光照阴影
              main: {
                color: '#fff', // 光照颜色
                intensity: 1.2, // 光照强度
                shadowQuality: 'high', // 阴影亮度
                shadow: true, // 是否显示阴影
                alpha: 40,
                beta: -10
              },
              ambient: {
                intensity: 0.3
              }
            }
          },
          series: [
            {
              type: 'map3D',
              map: '宁夏',
              geoIndex: 0,
              zlevel: 3,
              regionHeight: 8,
              viewControl: {
                zoomSensitivity: 1,
                damping: 0,
                rotateSensitivity: 1,
                projection: 'orthographic',
                orthographicSize: 600, // 控制地图大小
                maxOrthographicSize: 150,
                minOrthographicSize: 150,
                autoRotate: false,
                animation: true,
                alpha: 50,
                beta: 0,
                minBeta: -330,
                maxBeta: 390,
                autoRotateSpeed: 10
              },
              light: {
                // 光照阴影
                main: {
                  color: '#fff', // 光照颜色
                  intensity: 1.2, // 光照强度
                  shadowQuality: 'high', // 阴影亮度
                  shadow: false, // 是否显示阴影
                  alpha: 40,
                  beta: 0
                },
                ambient: {
                  intensity: 0.3
                }
              },
              groundPlane: {
                show: false
              },
              data: this.dataT,
              postEffect: {
                enable: false
              },
              itemStyle: {
                borderWidth: 2,
                borderColor: '#1a5bb9',
                shadowColor: '#00dbef'
              },

              label: {
                show: false,
                textStyle: {
                  color: '#fff',
                  fontSize: 16,
                  opacity: 2,
                  backgroundColor: 'rgba(0,0,0,0)'
                }
              },
              emphasis: {
                label: {
                  show: false
                },
                itemStyle: {
                  areaColor: '#1a5bb9'
                }
              }
            },
            {
              type: 'lines3D',
              coordinateSystem: 'geo3D',
              zlevel: 5,
              label: {
                normal: {
                  show: true
                }
              },
              tooltip: {
                show: false
              },
              effect: {
                show: true,
                period: 5,
                trailWidth: 4,
                trailOpacity: 0.7,
                trailColor: '#ffffff',
                trailLength: 0.3,
                constantSpeed: 5
              },
              itemStyle: {
                normal: {
                  areaColor: '#1a5bb9',
                  borderWidth: 2,
                  borderColor: '#1a5bb9',
                  shadowColor: '#00dbef'
                },
                emphasis: {
                  areaColor: '#1a5bb9'
                }
              },
              lineStyle: {
                width: 2,
                opacity: 1,
                color: '#00dbef'
              },
              data: returnData
            },
            {
              type: 'scatter3D',
              coordinateSystem: 'geo3D',
              symbolSize: 5,
              zlevel: 3,
              showEffectOn: 'render',
              rippleEffect: {
                scale: 5,
                brushType: 'stroke'
              },
              tooltip: {
                show: false
              },
              hoverAnimation: true,
              symbol: 'circle',
              symbolSize: 12,
              label: {
                normal: {
                  show: true,
                  formatter: '{b}',
                  position: 'right',
                  textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    backgroundColor: 'rgba(255,255,255,0)'
                  }
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#00dbef',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.8)'
                }
              },
              data: this.convertData(this.data)
            },
            {
              name: '数据中心',
              type: 'scatter3D',
              coordinateSystem: 'geo3D',
              zlevel: 5,
              tooltip: {
                show: true,
                formatter: '{b}'
              },
              rippleEffect: {
                scale: 3,
                brushType: 'stroke'
              },
              symbol: 'circle',
              symbolSize: 20,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                color: '#ffef3a',
                opacity: 1,
                borderWidth: 2,
                borderColor: 'rgba(255,255,255,0.8)'
              },
              data: [
                {
                  name: '数组中心',
                  value: this.geoCoordMap['数据中心'],
                  visualMap: false
                }
              ]
            }
          ]
        }
        myChart.setOption(option2)
      },
      
      // 万条处理
      filterNumber(s, n, type) {
        if (s === undefined) {
          return 0
        }
        var s2 = 0
        if (s === 0) {
          return s2
        }
        var s1 = null
        if (type === 0) {
          s1 = s / 10000
        } else {
          s1 = s
        }
        var n1 = n > 0 && n <= 20 ? n : 2
        s2 = parseFloat((s1 + '').replace(/[^\d\.-]/g, '')).toFixed(n1) + ''
        return s2
      },
      // 获取数据治理列表
      getModelAuthor() {
        if (sessionStorage.getItem('authList') == null) {
          this.$router.replace('/login')
        } else {
          let authList = JSON.parse(sessionStorage.getItem('authList'))
          // 遍历每一个功能模块
          for (let i = 0, len = authList.length; i < len; i++) {
            // 遍历大模块下面的子模块，并生成菜单
            if (authList[i].childLists) {
              for (let j = 0, len1 = authList[i].childLists.length; j < len1; j++) {
                if (authList[i].childLists[j].menuList === undefined || authList[i].childLists[j].menuList === null) {
                  authList[i].childLists[j].menuList = buildMenu(authList[i].childLists[j].childLists)
                } else {
                  break
                }
              }
            }
          }
          this.dataGovernList = authList
          sessionStorage.setItem('authList', JSON.stringify(this.dataGovernList))
          loadRouter()
        }
      },
      getUrlKey (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
      },
      getUserInfoByAccessToken(token) {
        new Promise((resolve, reject) => {
          getUserInfo({accessToken: token}).then(res => {
              console.log('res.data.resultData',res.data.resultData)

            if (res.data.resultCode === 0) {
              sessionStorage.setItem('deptId', res.data.resultData.user.deptment.id)
              sessionStorage.setItem('deptName', res.data.resultData.user.deptment.name)
              sessionStorage.setItem('distNo', res.data.resultData.user.deptment.distNo)
              if (res.data.resultData.user.isAdmin === 0) {
                sessionStorage.setItem('admin_flag', '1')
              } else {
                sessionStorage.setItem('admin_flag', '0')
              }
              sessionStorage.setItem('authList', JSON.stringify(this.menuListToAuthList(res.data.resultData.menuList)))
              sessionStorage.setItem('nickName', res.data.resultData.user.nickName)
              sessionStorage.setItem('token', token)
              sessionStorage.setItem('user', res.data.resultData.user)
              sessionStorage.setItem('userDeptCode', res.data.resultData.user.deptment.deptCode)
              sessionStorage.setItem('userId', res.data.resultData.user.id)
              sessionStorage.setItem('userName', res.data.resultData.user.name)
              this.getModelAuthor()
              this.getCountryIssueResult()
              this.getCountryReportedResult()
              this.getDataAggregationResult()
              this.getDataErrorRateResult()
              this.getDataExchangeResult()
              this.getDepartmentDataAggregationResult()
              this.getDepartmentDataAggregationIncreaseResult()
              this.getErrorDataSolveResult()
              this.getDataCenterResult()
              if (sessionStorage.getItem('sysSettings') === undefined || sessionStorage.getItem('sysSettings') === null) {
                this.getSystemSetting()
              }
            } else {
              console.log('res.data',res.data)
              this.$message({
                message: '登录失败',
                type: 'error'
              })
              this.$router.replace('/login')
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      getUserInfoByUuid(uuid) {
        new Promise((resolve, reject) => {
          userLoginByUuid({uuid: uuid}).then(res => {
            console.log('res.data.resultData',res.data.resultData)
            if (res.data.msgCode === '0') {
              window.sessionStorage.setItem('user', res.data)
              window.sessionStorage.setItem('userName', res.data.userName)
              window.sessionStorage.setItem('token', res.data.token)
              window.sessionStorage.setItem('userDeptCode', res.data.deptCode)
              window.sessionStorage.setItem('deptId', res.data.deptment.id)
              window.sessionStorage.setItem('deptName', res.data.deptment.name)
              window.sessionStorage.setItem('nickName', res.data.nickName)
              window.sessionStorage.setItem('authList', JSON.stringify(res.data.authList))
              window.sessionStorage.setItem('userId', res.data.userId)
              this.getModelAuthor()
              this.getCountryIssueResult()
              this.getCountryReportedResult()
              this.getDataAggregationResult()
              this.getDataErrorRateResult()
              this.getDataExchangeResult()
              this.getDepartmentDataAggregationResult()
              this.getDepartmentDataAggregationIncreaseResult()
              this.getErrorDataSolveResult()
              this.getDataCenterResult()
              if (sessionStorage.getItem('sysSettings') === undefined || sessionStorage.getItem('sysSettings') === null) {
                this.getSystemSetting()
              }
            } else {
              this.$message({
                message: '登录失败',
                type: 'error'
              })
              this.$router.replace('/login')
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      getSystemSetting() {
        new Promise((resolve, reject) => {
          getSystemSettings().then(res => {
            if (res.data.resultCode === '0000') {
              let sysSettings = {}
              res.data.resultData.forEach(item => {
                this.$set(sysSettings, item.parameterNameEn, item.parameterValue)
              })
              window.sessionStorage.setItem('sysSettings', JSON.stringify(sysSettings))
              try {
                this.sysName = JSON.parse(sessionStorage.getItem('sysSettings')).sysName
              } catch (e) {
                this.sysName = '数据资源管理系统'
              }
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: "DS-Digib";
    src: url("../../../static/font/DS-DIGIB-2.ttf");
  }

  .dstext {
    font-size: 25px;
    font-family: "DS-Digib";
  }

  .ALLpagestable {
    background-color: #F1F4F7;
  }

  /*.mark-head {*/
  /*  position: relative;*/
  /*  width: 100%;*/
  /*  height: 130px;*/
  /*  background: url(../../assets/img/dataMarketIndex/top2@2x.png) no-repeat;*/
  /*  background-size: contain;*/

  /*  .menu-top {*/
  /*    position: absolute;*/
  /*    right: 0;*/
  /*    bottom: 0;*/
  /*    zoom: 0.7;*/

  /*    a {*/
  /*      display: inline-block;*/
  /*      background-color: #ffffff;*/
  /*      padding: 10px;*/
  /*      border-radius: 5px;*/
  /*      margin-right: 10px;*/
  /*      color: #333333;*/
  /*      cursor: pointer;*/
  /*      text-decoration: none;*/
  /*      font-size: 13px;*/

  /*      img {*/
  /*        width: 26px;*/
  /*        height: 28px;*/
  /*        vertical-align: middle;*/
  /*        margin-right: 10px;*/
  /*      }*/
  /*    }*/
  /*  }*/
  /*}*/

  .data-content {
    padding: 20px;
    margin-top: 130px;
  }

  .mark-top {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

    .box-left {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }

    .box-middle {
      -webkit-box-flex: 1.3;
      -ms-flex: 1.3;
      flex: 1.3
    }

    .box-right {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
  }

  .box-item {
    background-color: #fff;
    margin: 0 10px 20px 10px;

    .item-title {
      position: relative;
      padding: 15px 15px 15px 30px;
      font-size: 20px;
      -webkit-box-shadow: #e7ecf7 1px -2px 20px 0px;
      box-shadow: #e7ecf7 1px -2px 20px 0px;

      &:after {
        content: '';
        position: absolute;
        left: 15px;
        top: 18px;
        width: 5px;
        height: 25px;
        background-color: #10568A;
      }
    }

    .content {
      background-color: #ffffff;
      padding: 25px 15px 15px 15px;
    }
  }

  .data-bottom {
    .data-bottom-top, .data-bottom-bottom {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;

      .box-item {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }
    }

  }

  .base-menu {
    .box-item {
      .content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;

        a {
          display: block;
          cursor: pointer;
          text-align: center;
          border: 1px solid #E8E8E8;
          border-radius: 5px;;
          padding: 15px;
          margin-right: 15px;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          color: #333333;
          font-size: 14px;

          &:hover {
            border: 1px solid #1F74F2;
            color: #1F74F2;
          }

          img {
            width: 70px;
            height: 70px;
            margin-bottom: 10px;
          }

          span {
            display: block;
          }
        }
      }
    }
  }

  .box-left-top {
    .content {
      .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin-bottom: 10px;

        .left {
          text-align: center;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;

          img {
            display: inline-block;
            width: 70px;
            height: 70px;
          }
        }

        .right {
          -webkit-box-flex: 4;
          -ms-flex: 4;
          flex: 4;
          height: 70px;
          padding: 10px;
          display: inline-block;
          vertical-align: top;
          overflow: hidden;

          p {
            overflow: hidden;
          }
        }
      }
    }
  }

  .box-right-top {
    .content {
      overflow: hidden;

      .item {
        display: -webkit-box;
        display: -ms-flexbox;
        width: 50%;
        float: left;
        margin-bottom: 10px;

        .left {
          img {
            display: inline-block;
            width: 70px;
            height: 70px;
          }
        }

        .right {
          height: 70px;
          padding: 10px;
          display: inline-block;
          vertical-align: top;
          overflow: hidden;

          p {
            overflow: hidden;
            font-size: 16px;
          }
        }
      }
    }
  }

  .box-right-bottom {
    .content {
      .item {
        display: flex;
        margin-bottom: 23px;

        .txt {
          flex: 1;
          font-size: 16px;
        }

        .parcent-bar-box {
          flex: 2;
        }
      }
    }
  }

  .box-middle-bottom {
    .content {
      .item-box {
        position: relative;

        .item {
          position: absolute;
          padding: 15px;
          width: 213px;
          height: 90px;
          left: 15px;
          background: url("../../assets/img/dataMarketIndex/center-bg.png") no-repeat;

          p {
            color: #10568A;
            font-size: 14px;
          }

          .s1 {
            display: inline-block;
            font-size: 26px;
            color: #1F74F2;
          }

          .s2 {
            display: inline-block;
            color: #10568A;
            font-size: 12px;
          }
        }

        .item:nth-child(2) {
          margin-top: 100px;
        }
      }
    }
  }
  .nx-progress {
    display: block;
    width: 100%;
    height: 10px;
    border-radius: 10px;
    margin-top: 5px;
  }
  .progress1 {
    background-color: #2075F2;
  }
  .progress2 {
    background-color: #01D2CF;
  }
  .progress3 {
    background-color: #6ECCF6;
  }
  .nx-progress2 {
    display: inline-block;
    width: 70%;
    height: 10px;
    border-radius: 10px;
    background: -moz-linear-gradient(left, #5FD2D6 0%, #3F9DF5 100%);
    background: -webkit-gradient(
        linear,
        left,
        right,
        color-stop(0%, #5FD2D6),
        color-stop(100%, #3F9DF5)
    );
    background: -webkit-linear-gradient(left, #5FD2D6 0%, #3F9DF5 100%);
    background: -o-linear-gradient(left, #5FD2D6 0%, #3F9DF5 100%);
    background: -ms-linear-gradient(left, #5FD2D6 0%, #3F9DF5 100%);
    background: linear-gradient(to right, #5FD2D6 0%, #3F9DF5 100%);
  }
  /deep/ .sjhjbar {
    .ivu-progress-outer {
      width: 90%;
    }
  }
</style>
