<template>
  <div class="ALLpagestable">
    <div class="leftpage">
      <div class="toppage">
        <div class="departmenttop">
          <p class="card-title">
            <span>接入应用</span>
            <span class="viewMore">
            </span>
          </p>
          <div class="dataTwo">
            <div class="item">
              <div class="topText">
                应用数量
                <span class="fonsize">(个)</span>
              </div>
              <div class="midNumber">{{jryy.yysl || 0 }}</div>
            </div>
            <div class="item">
              <div class="topText">
                今日接入
                <span class="fonsize">(个)</span>
              </div>
              <div class="midNumber">{{jryy.jrjr || 0 }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="middlepage">
        <p class="card-title">
          <span>事项归集</span>
          <span class="viewMore">
          </span>
        </p>
        <div class="dataFour">
          <div class="item">
            <div class="topText">基本信息</div>
            <div class="fonsize w">({{sxgj.jbxx < 10000 ? unitText.t : sxgj.jbxx > 10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(sxgj.jbxx,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">扩展信息</div>
            <div class="fonsize w">({{sxgj.kzxx < 10000?unitText.t:sxgj.kzxx > 10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(sxgj.kzxx,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">材料信息</div>
            <div class="fonsize w">({{sxgj.clxx < 10000?unitText.t: sxgj.clxx > 10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(sxgj.clxx,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">问题信息</div>
            <div class="fonsize w">({{sxgj.wtxx < 10000?unitText.t:sxgj.wtxx > 10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(sxgj.wtxx,1,0) || 0}}</div>
          </div>
        </div>
      </div>
      <div class="middlepage">
        <p class="card-title">
          <span>办件归集</span>
          <span class="viewMore">
          </span>
        </p>
        <div class="dataFour">
          <div class="item">
            <div class="topText">受理信息</div>
            <div class="fonsize w">({{bjgj.slxx < 10000?unitText.t:bjgj.slxx > 10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(bjgj.slxx,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">过程信息</div>
            <div class="fonsize w">({{bjgj.gcxx < 10000?unitText.t:bjgj.gcxx > 10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(bjgj.gcxx,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">材料信息</div>
            <div class="fonsize w">({{bjgj.clxx < 10000?unitText.t:bjgj.clxx > 10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(bjgj.clxx,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">结果信息</div>
            <div class="fonsize w">({{bjgj.jgxx < 10000?unitText.t:bjgj.jgxx > 10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(bjgj.jgxx,1,0) || 0}}</div>
          </div>
        </div>
      </div>
      <div class="tailpage">
        <p class="card-title">
          <span>电子证照增长趋势</span>
          <span class="viewMore">
          </span>
        </p>
        <div class="echartLeft">
          <div id="exchangetrends"></div>
        </div>
      </div>
    </div>
    <div class="centerpage">
      <p class="card-title">
        <span>数据中心概览</span>
        <span class="viewMore"></span>
      </p>
      <div class="centerTop">
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>ODS区</span>
              <span
                class="fonsize w">({{sjzxgl.ods < 10000?unitText.t:sjzxgl.ods > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(sjzxgl.ods,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>DW区</span>
              <span class="fonsize w">({{sjzxgl.dw < 10000?unitText.t:sjzxgl.dw > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(sjzxgl.dw,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>DM区</span>
              <span class="fonsize w">({{sjzxgl.dm < 10000?unitText.t:sjzxgl.dm > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(sjzxgl.dm,1,0) || 0}}</div>
        </div>
      </div>
      <div class="centerMid">
        <img src="../../assets/img/dataMarketIndex/centernew.gif" style="height:100%;width:100%" alt/>
      </div>
      <p class="card-title" style="margin-top: 50px">
        <span>注册用户概览</span>
        <span class="viewMore"></span>
      </p>
      <div class="centerTop">
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>累计注册</span>
              <span
                class="fonsize w">({{zcyhgl.ljzc < 10000?unitText.t:zcyhgl.ljzc > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(zcyhgl.ljzc,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>个人注册</span>
              <span
                class="fonsize w">({{zcyhgl.grzc < 10000?unitText.t:zcyhgl.grzc > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(zcyhgl.grzc,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>法人注册</span>
              <span
                class="fonsize w">({{zcyhgl.frzc < 10000?unitText.t:zcyhgl.frzc > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(zcyhgl.frzc,1,0) || 0}}</div>
        </div>
      </div>
    </div>
    <div class="rightpage">
      <div class="abovepage">
        <p class="card-title">
          <span>主题库概览</span>
          <span class="viewMore">
          </span>
        </p>
        <ul class="ulList">
          <li>
            政务服务事项库(条)
            <span>{{ztkgl.zwfwsxk || 0}}</span>
          </li>
          <li>
            政务服务办件库(条)
            <span>{{ztkgl.zwfwbjk || 0}}</span>
          </li>
          <li>
            人口库(条)
            <span>{{ztkgl.rkk || 0}}</span>
          </li>
          <li>
            法人库(条)
            <span>{{ztkgl.frk || 0}}</span>
          </li>
          <li>
            电子证照库(条)
            <span>{{ztkgl.dzzzk || 0}}</span>
          </li>
          <li>
            电子文件库(条)
            <span>{{ztkgl.dzwjk || 0}}</span>
          </li>
          <li>
            统一用户库(条)
            <span>{{ztkgl.tyyhk || 0}}</span>
          </li>
          <!--          <li>-->
          <!--            数据共享交换库-->
          <!--            <span>{{listCenStor.creditAmount || 0}}</span>-->
          <!--          </li>-->
          <!--          <li>-->
          <!--            数据资源整合库-->
          <!--            <span>{{listCenStor.leprAmount || 0}}</span>-->
          <!--          </li>-->
        </ul>
      </div>
      <div class="belowpage">
        <p class="card-title">
          <span>电子文件增长趋势</span>
          <span class="viewMore">
          </span>
        </p>
        <div class="echartRight">
          <div id="growth"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDataMarketReportPl} from '@/api/dataMarket/dataMarket'

  export default {
    name: 'dataCenter',
    data() {
      return {
        unitText: {
          w: '万条',
          t: '条'
        },
        jryy: {
          yysl: 0,
          jrjr: 0
        },
        sxgj: {
          jbxx: 0,
          kzxx: 0,
          clxx: 0,
          wtxx: 0
        },
        bjgj: {
          slxx: 0,
          gcxx: 0,
          clxx: 0,
          jgxx: 0
        },
        sjzxgl: {
          dm: 0,
          ods: 0,
          dw: 0
        },
        zcyhgl: {
          grzc: 0,
          ljzc: 0,
          frzc: 0
        },
        ztkgl: {
          rkk: 0,
          zwfwsxk: 0,
          zwfwbjk: 0,
          dzwjk: 0,
          tyyhk: 0,
          frk: 0,
          dzzzk: 0
        },

        listInDept: 0, // 接入部门总数量
        listInDeptDay: 0, // 今日接入部门数量
        listCreate: {
          averCreate: 0,
          dayCreate: 0
        }, // 今日新增
        listDeptIn: {
          totalAggr: 0
        }, // 数据汇入统计
        listStaCn: {
          ewsData: 0,
          complaintsData: 0,
          creditData: 0,
          listMattersData: 0
        }, // 国省下发
        listCenDc: {
          convergenceZone: 0,
          lowerHairArea: 0,
          storageArea: 0,
          reportArea: 0,
          appZone: 0,
          problemArea: 0
        }, // 数据中心概览
        listCenStor: {
          ipoiAmount: 0,
          biroAmount: 0,
          lormAmount: 0,
          rbiAmount: 0,
          kepbAmount: 0,
          icrrmAmount: 0,
          creditAmount: 0,
          leprAmount: 0,
          kbiAmount: 0
        }, // 数据中心存储情况
        timeData: [],
        timeDataEcharts: {},
        liLsit: []
      }
    },
    created() {
      this.getIndexData()
      console.log('获取了数据')
      // this.createTime()
      // this.echartsAll()
    },
    mounted() {
    },
    filters: {
      addSup(msg) {
        var num = msg + '',
          reg = /(?=(\B)(\d{3})+$)/g
        return num.replace(reg, ',')
      }
    },
    methods: {
      // 万条处理
      filterNumber(s, n, type) {
        if(!s) {
          return 0
        }
        if(s*1 >= 10000) {
          return (s/10000).toFixed(1)
        } else {
          return s  
        }
        // if (s == undefined) {
        //   return 0
        // }
        // var s2 = 0
        // if (s == 0) {
        //   return s2
        // }
        // if (type === 0 && s > 10000) {
        //   var s1 = s / 10000
        // } else {
        //   var s1 = s
        // }
        // var n = n > 0 && n <= 20 ? n : 2
        // s2 = parseFloat((s1 + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
        // return s2
      },
      // 动态生成当前月份数据
      createTime() {
        var date = new Date()
        var result = []
        //  for(var i = 0; i < date.getMonth()+1; i++) {
        for (var i = date.getMonth(); i >= 0; i--) {
          var d = new Date()
          d.setDate(1)
          d.setMonth(d.getMonth() - i)
          var m = d.getMonth() + 1
          m = m < 10 ? '0' + m : m
          // 在这里可以自定义输出的日期格式
          result.push(d.getFullYear() + '-' + m)
          // result.push(d.getFullYear() + "年" + m + '月');
        }
        console.info(result)
        this.timeData = result
      },
      // 获取数据
      getIndexData() {
        new Promise((resolve, reject) => {
          getDataMarketReportPl().then(res => {
            if (res.data.resultData) {
              const result = res.data.resultData
              this.jryy = result.jryy
              this.sxgj = result.sxgj
              this.bjgj = result.bjgj
              this.sjzxgl = result.sjzxgl
              this.zcyhgl = result.zcyhgl
              this.ztkgl = result.ztkgl
              this.echartsAll(result.dzzz, result.dzwj)
            }
          })
        })
      },
      echartsAll(data1, data2) {
        const myEcharts1 = this.$echarts.init(document.getElementById('exchangetrends'))
        const myEcharts2 = this.$echarts.init(document.getElementById('growth'))

        // data1 = {
        //     date: ["2020-02", "2020-03", "2020-04", "2020-05", "2020-06", "2020-07"],
        //     count: [120, 438, 377, 59, 310, 218]
        // }
        // data2 = {
        //   date: ["2020-02", "2020-03", "2020-04", "2020-05", "2020-06", "2020-07"],
        //   count: [120, 438, 377, 59, 310, 218]
        // }
        const option1 = {
          color: ['#FF8787', '#4DA1FF'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
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
            data: data1.date
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
                color: ['#F5F7FA','#fff']
              }
            }

          },
          series: [
            {
              data: data1.count,
              type: 'line',
              smooth: true
            },
            {
              type: 'bar',
              barWidth: '20%',
              data: data1.count
            }
          ]
        }

        const option2 = {
          color: ['#FF8787', '#4DA1FF'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
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
            data: data2.date
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
                color: ['#F5F7FA','#fff']
              }
            }

          },
          series: [
            {
              data: data2.count,
              type: 'line',
              smooth: true
            },
            {
              type: 'bar',
              barWidth: '20%',
              data: data2.count
            }
          ]
        }
        myEcharts1.setOption(option1)
        myEcharts2.setOption(option2)

        window.onresize = function () {
          myEcharts1.resize()
          myEcharts2.resize()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: "DS-Digib";
    src: url("../../../static/font/DS-DIGIB-2.ttf"),
    url("../../../static/font/DS-DIGIB-2.eot") format("embedded-opentype");
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
      height: 921px;
      flex: 1;
      width: 30%;

      .toppage {
        height: 203px;
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
          border-top: 2px solid #dfdfdf;
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
      height: 921px;
      flex: 1.2;
      width: 30%;
      margin-left: 20px;
      background: #fff;
      padding: 20px;

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
        height: 500px;
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
      height: 921px;
      margin-left: 20px;
      flex: 1;
      width: 30%;

      .abovepage {
        height: 630px;
        background: #fff;
        padding: 20px;

        .ulList {
          border-top: 2px dashed #dfdfdf;
          margin-top: 10px;
          height: 580px;
          font-size: 16px;

          li {
            &:nth-child(1) {
              margin-top: 20px;
            }

            height: 76px;
            list-style: none;
            line-height: 56px;
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


