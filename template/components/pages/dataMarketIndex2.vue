<template>
  <div class="ALLpagestable">
    <div class="leftpage">
      <div class="toppage">
        <div class="departmenttop">
          <p class="card-title" style="margin-bottom: 10px;">
            <span>上报国家</span>
            <span class="viewMore">
              <!-- <span class="icon+">+</span>查看更多 -->
            </span>
          </p>
          <div class="dataThree">
            <div class="item">
              <div class="midNumber">{{sbxx.regulatoryMatters}}</div>
              <div class="topText">监管事项</div>
              <p><span class="fonsize">({{listDeptIn.regulatoryMatters < 10000?unitText.t:listDeptIn.regulatoryMatters > 10000?unitText.w:unitText.t}})</span>
              </p>
            </div>
            <div class="item">
              <div class="midNumber">{{filterNumber(sbxx.markerSubject,1,0) || 0}}</div>
              <div class="topText">市场主体</div>
              <p><span class="fonsize">({{sbxx.markerSubject < 10000?unitText.t:sbxx.markerSubject > 10000?unitText.w:unitText.t}})</span>
              </p>
            </div>
            <div class="item">
              <div class="midNumber">{{filterNumber(sbxx.lawEnforOfficers,1,0) || 0}}</div>
              <div class="topText">执法人员</div>
              <p><span class="fonsize">({{sbxx.lawEnforOfficers < 10000?unitText.t:sbxx.lawEnforOfficers > 10000?unitText.w:unitText.t}})</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="middlepage">
        <p class="card-title">
          <span>地市下发</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
          </span>
        </p>
        <div class="dataFour">
          <div class="item">
            <div class="topText">预警信号</div>
            <div class="fonsize w">({{listStaCn.earlyWarningInfo < 10000?unitText.t:listStaCn.earlyWarningInfo >
              10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{listStaCn.earlyWarningInfo}}</div>
          </div>
          <div class="item">
            <div class="topText">投诉举报</div>
            <div class="fonsize w">({{listStaCn.Complaints < 10000?unitText.t:listStaCn.Complaints >
              10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{listStaCn.Complaints}}</div>
          </div>
          <div class="item">
            <div class="topText">信用信息</div>
            <div class="fonsize w">({{listStaCn.CreditInformation < 10000?unitText.t:listStaCn.CreditInformation >
              10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{listStaCn.CreditInformation}}</div>
          </div>
          <div class="item">
            <div class="topText">事项清单</div>
            <div class="fonsize w">({{listStaCn.List < 10000?unitText.t:listStaCn.List >
              10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{listStaCn.List}}</div>
          </div>
        </div>
      </div>
      <div class="tailpage">
        <p class="card-title">
          <span>数据交换趋势</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
          </span>
        </p>
        <div class="echartLeft">
          <div id="exchangetrends"></div>
        </div>
      </div>
      <div class="tailpage" style="height: 330px;">
        <p class="card-title">
          <span>事项覆盖率和错误率</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
          </span>
        </p>
        <div class="echartLeft" style="height: 250px;">
          <div id="errortrends" style="height: 250px;"></div>
        </div>
      </div>
    </div>
    <div class="centerpage">
      <div style="background-color: #ffffff;padding: 15px;">
        <p class="card-title">
          <span>数据中心概览</span>
          <span class="viewMore">
          <!-- <span class="icon+">+</span>查看更多 -->
        </span>
        </p>
      </div>
      <div class="centerMid"
           style="border-top: 2px dashed #dfdfdf;padding: 0 15px;background-color: #ffffff;position: relative">
        <div class="centerData">
          <template v-for="item in centerData">
            <p>{{item.name}}（万条）</p>
            <span>{{(item.value / 10000).toFixed(2)}}</span>
          </template>
        </div>
        <!--        <img src="../../assets/img/dataMarketIndex/centernew.gif" style="height:100%;width:100%" alt/>-->
        <div id="nxMap" style="width: 100%;height: 600px;"></div>
      </div>
      <div class="tailpage" style="height: 330px;margin-top: 20px;background-color: #ffffff;padding: 20px;">
        <p class="card-title">
          <span>错误数据整改情况</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
          </span>
        </p>
        <div class="echartLeft" style="height: 250px;border-top: 2px dashed #dfdfdf;margin-top: 20px;">
          <div id="errorDataInfo" style="height: 250px;"></div>
        </div>
      </div>
    </div>
    <div class="rightpage">
      <div class="abovepage">
        <p class="card-title">
          <span>数据汇聚</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
          </span>
        </p>
        <ul class="ulList">
          <template v-for="item in sjhj">
            <li>
              {{item.name}}
              <span>{{item.count || 0}}</span>
            </li>
          </template>
        </ul>
      </div>
      <div class="belowpage" style="height: 310px;">
        <p class="card-title">
          <span>部门汇聚TOP5</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
          </span>
        </p>
        <div class="echartRight">
          <div id="deptGrowth" style="height: 240px;"></div>
        </div>
      </div>
      <div class="belowpage" style="height: 330px;">
        <p class="card-title">
          <span>部门数据汇聚月增长</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
          </span>
        </p>
        <div class="echartRight" style="height: 250px;">
          <div id="deptData" style="height: 250px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-new */
  import 'echarts/map/js/province/ningxia'
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

  export default {
    name: 'dataCenter',
    data() {
      return {
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
        listStaCn: {}, // 地市下发
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
        liLsit: [],
        exchangetrendsData: {},
        sjhj: [],
        centerData: []
      }
    },
    created() {
      this.getCountryIssueResult()
      this.getCountryReportedResult()
      this.getDataAggregationResult()
      this.getDataErrorRateResult()
      this.getDataExchangeResult()
      this.getDepartmentDataAggregationResult()
      this.getDepartmentDataAggregationIncreaseResult()
      this.getErrorDataSolveResult()
      this.getDataCenterResult()
    },
    mounted() {
      //  this.getIndexData();
      //  this.createTime();
      this.echartsAll()
    },
    filters: {
      addSup(msg) {
        var num = msg + ''
        var reg = /(?=(\B)(\d{3})+$)/g
        return num.replace(reg, ',')
      }
    },
    methods: {
      // 地市下发(end)
      getCountryIssueResult() {
        new Promise((resolve, reject) => {
          getCountryIssueResult().then(res => {
            if (res.data.resultCode === '0000') {
              this.listStaCn = JSON.parse(res.data.resultData.resultContent)
            }
          })
        })
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
              console.log(obj)
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
                sxfglValue.push(obj[i].coverageRate)
              }
              let myEcharts4 = this.$echarts.init(document.getElementById('errortrends'))
              let option4 = {
                color: ['#4DA1FF', '#F88080'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  }
                },
                legend: {
                  x: 'right',
                  data: ['事项覆盖率']
                },
                grid: {
                  left: '5%',
                  // right: '4%',
                  bottom: '1%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  // data: this.timeData
                  data: sxfglName,
                  axisLabel: {
                    rotate: 60
                  }
                },
                yAxis: {
                  // name: '万',
                  type: 'value',
                  axisLabel: {
                    fontSize: 14,
                    color: '#333333'
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#979797'
                    }
                  },
                  splitLine: {
                    show: false
                  },
                  splitArea: {
                    show: true,
                    areaStyle: {
                      color: ['#fff', '#F5F7FA']
                    }
                  }
                },
                series: [
                  {
                    name: '监管事项覆盖率',
                    //  data: this.timeDataEcharts.listIn,
                    data: sxfglValue,
                    type: 'line',
                    smooth: true
                  }
                  // {
                  //   name: '错误率',
                  //   // data: this.timeDataEcharts.listOut,
                  //   data: [400, 800, 1000, 900, 800, 700, 600, 500],
                  //   type: 'line',
                  //   smooth: true
                  // }
                ]
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
              let myEcharts1 = this.$echarts.init(document.getElementById('exchangetrends'))
              let option1 = {
                color: ['#4DA1FF', '#6BDFC5'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  }
                },
                legend: {
                  x: 'right',
                  data: ['上报数据', '地市下发']
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
                  // data: this.timeData
                  data: this.exchangetrendsData.month
                },
                yAxis: {
                  type: 'value',
                  axisLabel: {
                    fontSize: 14,
                    color: '#333333'
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#979797'
                    }
                  },
                  splitLine: {
                    show: false
                  },
                  splitArea: {
                    show: true,
                    areaStyle: {
                      color: ['#fff', '#F5F7FA']
                    }
                  }
                },
                series: [
                  {
                    name: '上报数据',
                    //  data: this.timeDataEcharts.listIn,
                    data: this.exchangetrendsData.report,
                    type: 'line',
                    smooth: true
                  },
                  {
                    name: '地市下发',
                    // data: this.timeDataEcharts.listOut,
                    data: this.exchangetrendsData.issue,
                    type: 'line',
                    smooth: true
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
              console.log(obj)
              // let tempStr = obj[0].name.join(',')
              // let tempArray = tempStr.replace(/自治区/g, '')
              // let deptName = tempArray.split(',')
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
                    type: 'shadow'
                  }
                },
                legend: {
                  data: ['汇聚数据总量']
                },
                grid: {
                  left: '1%',
                  right: '10%',
                  bottom: '1%',
                  containLabel: true
                },
                xAxis: {
                  name: '(万)',
                  type: 'value',
                  boundaryGap: [0, 0.01]
                },
                yAxis: {
                  // type: 'category',
                  data: obj[0].name.reverse()
                },
                series: [
                  {
                    name: '汇聚数据总量',
                    type: 'bar',
                    data: deptValue.reverse()
                  }
                ]
              }
              myEcharts3.setOption(option3)
              myEcharts3.resize()
            }
          })
        })
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
                value.push((obj[key]).toPrecision(4) * 100)
              }
              let myEcharts5 = this.$echarts.init(document.getElementById('deptData'))
              let option5 = {
                color: ['#4DA1FF', '#6BDFC5'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  }
                },
                legend: {
                  x: 'right',
                  data: ['月增长率']
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
                  // data: this.timeData
                  data: month
                },
                yAxis: {
                  type: 'value',
                  axisLabel: {
                    fontSize: 14,
                    color: '#333333'
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#979797'
                    }
                  },
                  splitLine: {
                    show: false
                  },
                  splitArea: {
                    show: true,
                    areaStyle: {
                      color: ['#fff', '#F5F7FA']
                    }
                  }
                },
                series: [
                  {
                    name: '月增长率',
                    //  data: this.timeDataEcharts.listIn,
                    data: value,
                    type: 'line',
                    smooth: true
                  }
                  // {
                  //   name: '同比增长',
                  //   // data: this.timeDataEcharts.listOut,
                  //   data: [400, 800, 1000, 900, 800, 700, 600, 500],
                  //   type: 'line',
                  //   smooth: true
                  // }
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
                errorRate.push((obj[i].errorRate).toPrecision(4) * 100)
              }
              let myEcharts2 = this.$echarts.init(document.getElementById('errorDataInfo'))
              let option2 = {
                color: ['#4DA1FF', '#6BDFC5'],
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
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    name: '数据总量(条)',
                    interval: 50,
                    axisLabel: {
                      formatter: '{value}'
                    }
                  },
                  {
                    type: 'value',
                    min: 0,
                    max: 100,
                    interval: 20,
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
      echartsAll() {
        // let clientWidth = document.documentElement.scrollWidth // 获取屏幕尺寸
        // let scale = clientWidth / 1920
        let myEcharts6 = this.$echarts.init(document.getElementById('nxMap'))
        var geoList = [
          {name: '石嘴山', longitude: 106.333447, latitude: 38.981052, value: 1, status: '到报'},
          {name: '银川', longitude: 106.204666, latitude: 38.491113, value: 1, status: '到报'},
          {name: '吴忠', longitude: 106.241461, latitude: 38.070551, value: 1, status: '到报'},
          {name: '中卫', longitude: 105.229609, latitude: 37.501102, value: 1, status: '到报'},
          {name: '固原', longitude: 106.223063, latitude: 36.05075, value: 1, status: '到报'}
        ]
        var series = []
        var convertData = function (data, status) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i]
            var fromCoord = [106.223063, 37.427776]
            var toCoord = [dataItem.longitude, dataItem.latitude]
            if (dataItem.status === status) {
              if (fromCoord && toCoord) {
                res.push({
                  toName: dataItem.name,
                  coords: [toCoord, fromCoord]
                })
              }
            }
          }
          return res
        }
        var convertDataStatus = function (data, status) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i]
            var toCoord = [dataItem.longitude, dataItem.latitude]
            if (dataItem.status === status) {
              if (toCoord) {
                res.push({
                  name: dataItem.name,
                  value: toCoord.concat(dataItem.value)
                })
              }
            }
          }
          return res
        }
        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
        [['银川', geoList]].forEach(function (item, i) {
          series.push({
            name: '到报拖尾',
            type: 'lines',
            zlevel: 2,
            silent: true,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: '#0f0',
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color: '#fff',
                width: 0,
                curveness: 0.2
              }
            },
            data: convertData(item[1], '到报')
          }, {
            name: '到报线',
            type: 'lines',
            silent: true,
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: 'arrow',
              symbolSize: 10
            },
            lineStyle: {
              normal: {
                color: '#0f0',
                width: 2,
                opacity: 0.5,
                curveness: 0.2
              }
            },
            data: convertData(item[1], '到报')
          }, {
            name: '中心点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}',
                textStyle: {
                  fontSize: 15,
                  fontWeight: 'bolder'
                }
              }
            },
            symbolSize: 20,
            itemStyle: {
              normal: {
                color: '#FFEF3A'
              }
            },
            data: [{
              name: '数据中心',
              value: [106.223063, 37.427776, '数据中心']
            }]
          }, {
            name: '到报',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 3,
            // rippleEffect: {
            //   brushType: 'stroke'
            // },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: '#fff'
              }
            },
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#00DBEF'
              }
            },
            data: convertDataStatus(item[1], '到报')
          })
        })
        let option6 = {
          backgroundColor: '#ffffff',
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (params.componentSubType === 'effectScatter') {
                var html = '台站名称: ' + params.name + '<br/>'
                html += params.marker + '经度: ' + params.value[0] + '<br/>'
                html += params.marker + '纬度: ' + params.value[1] + '<br/>'
                html += params.marker + '所属值: ' + params.value[2] + '<br/>'
                return html
              }
            }
          },
          geo: {
            map: '宁夏',
            zoom: 1.1,
            label: {
              show: false,
              textStyle: {
                color: '#fff', // 地图初始化区域字体颜色
                fontSize: 16,
                opacity: 1,
                backgroundColor: 'rgba(53,171,199,0)'
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff', // 地图初始化区域字体颜色
                  fontSize: 16,
                  opacity: 1,
                  backgroundColor: 'rgba(53,171,199,0)'
                }
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#12A8FF',
                borderWidth: 2,
                borderColor: '#0F64C4',
                shadowOffsetX: -3,
                shadowColor: '#B2E0FF',
                shadowBlur: 1
              },
              emphasis: {
                areaColor: '#2464ae'
              }
            }
          },
          series: series
        }
        myEcharts6.setOption(option6)
        window.onresize = function () {
          myEcharts6.resize()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: "DS-Digib";
    src: url("../../../static/font/DS-DIGIB-2.ttf");
  }

  .centerData {
    position: absolute;
    z-index: 99;
    p {
      color: #333;
      font-size: 16px;
      margin: 10px 0;
    }
    span {
      color: #039AFF;
      font-size: 40px;
      font-family: "DS-Digib";
    }
  }

  .ALLpagestable {
    background: #f0f2f5;
    display: flex;
    justify-content: space-between;
    //flex-wrap: nowrap;
    // padding: 20px;
    //公共头部
    .card-title {
      height: 24px;
      font-size: 24px;
      font-family: SourceHanSansCN-Heavy;
      font-weight: 800;
      color: #333333;
      border-left: 4px solid #338eff;
      line-height: 24px;

      span {
        margin-left: 10px;
      }

      .viewMore {
        color: #5ea6ff;
        display: inline-block;
        float: right;
        font-weight: 400;
        font-size: 16px;

        span {
          font-size: 25px;
          margin-right: 10px;
          //color: red;
        }
      }
    }

    .item {
      //公共样式
      flex: 1;
      height: 92px;
      margin-top: 25px;
      border-right: 1px solid #cfdae0;
      text-align: center;

      .topText {
        height: 20px;
        font-size: 1.1rem;
      }

      .midNumber {
        height: 71px;
        line-height: 70px;
        font-size: 44px;
        font-family: "DS-Digib";
      }
    }

    .leftpage {
      flex: 1;
      width: 30%;

      .toppage {
        /*height: 342px;*/
        background: #fff;
        padding: 20px 20px 0 20px;

        .dataTwo {
          height: 143px;
          border-top: 2px dashed #dfdfdf;
          margin-top: 10px;
          display: flex;

          .item:nth-child(2) {
            border-right: none;
          }

          .fonsize {
            font-size: 10px;
          }

          .midNumber {
            font-size: 44px;
            font-weight: bold;
            color: #124dab;
          }

          .item:nth-child(2) {
            .midNumber {
              color: #338eff;
            }
          }
        }

        .dataThree {
          height: 143px;
          border-top: 2px dashed #dfdfdf;
          display: flex;

          .item:nth-child(3) {
            border-right: none;
          }

          .item {
            flex: 1;
            height: 92px;
            margin-top: 25px;
            border-right: 1px solid #cfdae0;

            .midNumber {
              font-weight: bold;
              color: rgba(171, 150, 254, 1);
            }
          }

          .item:nth-child(2) {
            .midNumber {
              color: #124dab;
            }
          }

          .item:nth-child(3) {
            .midNumber {
              color: #03c5c3;
            }
          }

          .fonsize {
            font-size: 10px;
          }
        }
      }

      .middlepage {
        height: 194px;
        background: #fff;
        margin-top: 20px;
        padding: 20px;

        .dataFour {
          display: flex;
          border-top: 2px dashed #dfdfdf;
          margin-top: 20px;

          .item:nth-child(4) {
            border-right: none;
          }

          .item {
            flex: 1;
            margin-top: 15px;

            .fonsize {
              font-size: 10px;
            }

            .midNumber {
              height: 42px;
              line-height: 42px;
              color: #4da1ff;
              font-weight: bold;
            }
          }
        }
      }

      .tailpage {
        height: 270px;
        background: #fff;
        margin-top: 20px;
        padding: 20px;

        .echartLeft {
          height: 200px;
          // border: 1px solid red;
          border-top: 2px dashed #dfdfdf;
          margin-top: 20px;

          #exchangetrends {
            height: 200px;
          }
        }
      }
    }

    .centerpage {
      flex: 1.2;
      width: 30%;
      margin-left: 20px;
      /*background: #fff;*/
      /*padding: 20px 0;*/

      .centerTop {
        border-top: 2px dashed #dfdfdf;
        margin-top: 10px;
        display: flex;

        .item {
          .topText {
            font-size: 1.1rem;
            font-weight: 800;

            .fonsize {
              font-size: 10px;
            }
          }

          i {
            display: inline-block;
            height: 40px;
            width: 40px;
            vertical-align: middle;
            margin-right: 6px;
            margin-left: 6px;
          }
        }

        .item:nth-child(1) {
          .midNumber {
            color: #37bd9c;
            font-size: 44px;
            margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/lefticon.png") center no-repeat;
          }
        }

        .item:nth-child(2) {
          .midNumber {
            color: #4da1ff;
            font-size: 44px;
            margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/centericon.png") center no-repeat;
          }
        }

        .item:nth-child(3) {
          border-right: none;

          .midNumber {
            color: #ab96fe;
            font-size: 44px;
            margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/righticon.png") center no-repeat;
          }
        }
      }

      .centerMid {
        height: 645px;
        // border: 1px solid red;
        // margin-top: 50px;
        // background: url("../../assets/img/center.gif") center no-repeat;
        background-size: 100% 100%;
      }

      .centerBot {
        height: 130px;
        margin-top: 40px;
        display: flex;

        i {
          display: inline-block;
          height: 40px;
          width: 40px;
          vertical-align: middle;
          margin-right: 6px;
          margin-left: 6px;
        }

        .item {
          .topText {
            font-size: 1.1rem;
            font-weight: 800;

            .fonsize {
              font-size: 10px;
            }
          }
        }

        .item:nth-child(1) {
          .midNumber {
            color: #efb956;
            font-size: 44px;
            margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/downleft.png") center no-repeat;
          }
        }

        .item:nth-child(2) {
          .midNumber {
            color: #379cbd;
            font-size: 44px;
            margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/downcenter.png") center no-repeat;
          }
        }

        .item:nth-child(3) {
          border-right: none;

          .midNumber {
            color: #f88080;
            font-size: 44px;
            margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/downright.png") center no-repeat;
          }
        }
      }
    }

    .rightpage {
      margin-left: 20px;
      flex: 1;
      width: 30%;

      .abovepage {
        height: 370px;
        background: #fff;
        padding: 20px;

        .ulList {
          border-top: 2px dashed #dfdfdf;
          margin-top: 10px;
          height: 350px;
          font-size: 16px;
          overflow-y: auto;

          li {
            &:nth-child(1) {
              margin-top: 15px;
            }

            height: 36px;
            list-style: none;
            line-height: 36px;
            position: relative;

            span {
              position: absolute;
              right: 0;
              color: #4da1ff;
            }
          }
        }
      }

      .belowpage {
        height: 270px;
        background: #fff;
        margin-top: 20px;
        padding: 20px;

        .echartRight {
          height: 200px;
          // border: 1px solid red;
          border-top: 2px dashed #dfdfdf;
          margin-top: 20px;

          #growth {
            height: 200px;
          }
        }
      }
    }
  }

  .font-wapper {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;

    .fonsize.w {
      font-size: 12px;
      font-weight: 400;
    }
  }
</style>
