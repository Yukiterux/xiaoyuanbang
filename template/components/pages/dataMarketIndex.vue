<template>
  <div class="ALLpagestable">
    <div class="leftpage">
      <div class="toppage">
        <div class="departmenttop">
          <p class="card-title">
            <span>接入部门</span>
            <span class="viewMore">
              <!-- <span class="icon+">+</span>查看更多 -->
            </span>
          </p>
          <div class="dataTwo">
            <div class="item">
              <div class="topText">
                数源部门
                <span class="fonsize">(个)</span>
              </div>
              <div class="midNumber">{{listInDept || 0 }}</div>
            </div>
            <div class="item">
              <div class="topText">
                今日接入
                <span class="fonsize">(个)</span>
              </div>
              <div class="midNumber">{{listInDeptDay || 0 }}</div>
            </div>
          </div>
          <div class="dataThree">
            <div class="item">
              <div class="topText">数据汇入</div>
              <p><span class="fonsize">({{listDeptIn.totalAggr < 10000?unitText.t:listDeptIn.totalAggr > 10000?unitText.w:unitText.t}})</span>
              </p>
              <div class="midNumber">{{filterNumber(listDeptIn.totalAggr,1,0) || 0 }}</div>
            </div>
            <div class="item">
              <div class="topText">日均增长</div>
              <p><span class="fonsize">({{listCreate.averCreate < 10000?unitText.t:listCreate.averCreate > 10000?unitText.w:unitText.t}})</span>
              </p>
              <div class="midNumber">{{filterNumber(listCreate.averCreate,1,0) || 0}}</div>
            </div>
            <div class="item">
              <div class="topText">今日新增</div>
              <p><span class="fonsize">({{listCreate.dayCreate < 10000?unitText.t:listCreate.dayCreate > 10000?unitText.w:unitText.t}})</span>
              </p>
              <div class="midNumber">{{filterNumber(listCreate.dayCreate,1,0) || 0}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="middlepage">
        <p class="card-title">
          <span>市级下发</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
          </span>
        </p>
        <div class="dataFour">
          <div class="item">
            <div class="topText">预警信号</div>
            <div class="fonsize w">({{listStaCn.ewsData < 10000?unitText.t:listStaCn.ewsData >
              10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(listStaCn.ewsData,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">投诉举报</div>
            <div class="fonsize w">({{listStaCn.complaintsData < 10000?unitText.t:listStaCn.complaintsData >
              10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(listStaCn.complaintsData,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">信用信息</div>
            <div class="fonsize w">({{listStaCn.creditData < 10000?unitText.t:listStaCn.creditData >
              10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(listStaCn.creditData,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">事项清单</div>
            <div class="fonsize w">({{listStaCn.listMattersData < 10000?unitText.t:listStaCn.listMattersData >
              10000?unitText.w:unitText.t}})
            </div>
            <div class="midNumber">{{filterNumber(listStaCn.listMattersData,1,0) || 0}}</div>
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
    </div>
    <div class="centerpage">
      <p class="card-title">
        <span>数据中心概览</span>
        <span class="viewMore">
          <!-- <span class="icon+">+</span>查看更多 -->
        </span>
      </p>
      <div class="centerTop">
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>采集区</span>
              <span class="fonsize w">({{listCenDc.convergenceZone < 10000?unitText.t:listCenDc.convergenceZone > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(listCenDc.convergenceZone,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>接收区</span>
              <span class="fonsize w">({{listCenDc.lowerHairArea < 10000?unitText.t:listCenDc.lowerHairArea > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(listCenDc.lowerHairArea,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>仓储区</span>
              <span class="fonsize w">({{listCenDc.storageArea < 10000?unitText.t:listCenDc.storageArea > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(listCenDc.storageArea,1,0) || 0}}</div>
        </div>
      </div>
      <div class="centerMid">
        <img src="../../assets/img/dataMarketIndex/centernew.gif" style="height:100%;width:100%" alt/>
      </div>
      <div class="centerBot">
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>上报区</span>
              <span class="fonsize w">({{listCenDc.reportArea < 10000?unitText.t:listCenDc.reportArea > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(listCenDc.reportArea,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>应用区</span>
              <span class="fonsize w">({{listCenDc.appZone < 10000?unitText.t:listCenDc.appZone > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(listCenDc.appZone,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>质检区</span>
              <span class="fonsize w">({{listCenDc.problemArea < 10000?unitText.t:listCenDc.problemArea > 10000?unitText.w:unitText.t}})</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(listCenDc.problemArea,1,0) || 0}}</div>
        </div>
      </div>
    </div>
    <div class="rightpage">
      <div class="abovepage">
        <p class="card-title">
          <span>监管基础库</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
          </span>
        </p>
        <ul class="ulList">
          <li>
            监管对象信息库
            <span>{{listCenStor.ipoiAmount || 0}}</span>
          </li>
          <li>
            监管行为信息库
            <span>{{listCenStor.biroAmount || 0}}</span>
          </li>
          <li>
            执法人员信息库
            <span>{{listCenStor.lormAmount || 0}}</span>
          </li>
          <li>
            投诉举报信息库
            <span>{{listCenStor.rbiAmount || 0}}</span>
          </li>
          <li>
            信用信息库
            <span>{{listCenStor.kepbAmount || 0}}</span>
          </li>
          <li>
            “双随机、一公开” 计划信息库
            <span>{{listCenStor.icrrmAmount || 0}}</span>
          </li>
          <li>
            知识库
            <span>{{listCenStor.creditAmount || 0}}</span>
          </li>
          <li>
            监管事项目录清单库
            <span>{{listCenStor.leprAmount || 0}}</span>
          </li>
          <!-- <li>
            执法人员
            <span>{{listCenStor.leprAmount || 0}}</span>
          </li>
          <li>
            知识库
            <span>{{listCenStor.kbiAmount || 0}}</span>
          </li> -->
        </ul>
      </div>
      <div class="belowpage">
        <p class="card-title">
          <span>数据增长情况</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
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
  import {getDataMarketReportSuZhou} from '@/api/dataMarket/dataMarket'

  export default {
    name: 'dataCenter',
    data() {
      return {
        unitText: {
          w: '万条',
          t: '条'
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
        nationDown: [
          {name: '预警信号'},
          {name: '投诉举报'},
          {name: '信用信息'},
          {name: '事项清单'}
        ],
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
        if (s == undefined) {
          return 0
        }
        var s2 = 0
        if (s == 0) {
          return s2
        }
        if (type === 0 && s > 10000) {
          var s1 = s / 10000
        } else {
          var s1 = s
        }
        var n = n > 0 && n <= 20 ? n : 2
        s2 = parseFloat((s1 + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
        return s2
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
          getDataMarketReportSuZhou().then(res => {
            if (res.data.resultData && res.data.resultData.resultContent !== null) {
              const result = JSON.parse(res.data.resultData.resultContent)
              // 接入部门
              this.listInDept = result.jierubumen.shuyuanbumen // 接入部门总数量
              this.listInDeptDay = result.jierubumen.jinrijieru // 今日接入部门数量
              this.listCreate = {
                averCreate: result.jierubumen.rijunzengzhang,
                dayCreate: result.jierubumen.jinrixinzeng
              }
              this.listDeptIn = {
                totalAggr: result.jierubumen.shujuhuiru
              }
              // 数据中心概览
              this.listCenDc = {
                convergenceZone: result.jierubumen.caijiqu,
                lowerHairArea: result.jierubumen.jieshouqu,
                storageArea: result.jichuku.cangchuqu,
                reportArea: result.shujuzhongxin.shangbaoqu,
                appZone: result.jichuku.yingyongqu,
                problemArea: result.shujuzhongxin.zhijianqu
              }
              // 基础库
              this.listCenStor = {
                ipoiAmount: result.jichuku.jg_jgdx == null ? result.jichuku.jgdxxxk : result.jichuku.jg_jgdx,
                biroAmount: result.jichuku.jg_jgxw == null ? result.jichuku.jgxwxxk : result.jichuku.jg_jgxw,
                lormAmount: result.jichuku.jg_zfry == null ? result.jichuku.zfryxxk : result.jichuku.jg_zfry,
                rbiAmount: result.jichuku.jg_tsjb == null ? result.jichuku.tsjbxxk : result.jichuku.jg_tsjb,
                kepbAmount: result.jichuku.jg_xyxx == null ? result.jichuku.xyxxk : result.jichuku.jg_xyxx,
                icrrmAmount: result.jichuku.jg_ssjygk == null ? result.jichuku.ssjygk : result.jichuku.jg_ssjygk,
                creditAmount: result.jichuku.jg_zsk == null ? result.jichuku.zsk : result.jichuku.jg_zsk,
                leprAmount: result.jichuku.jg_jgsxml == null ? result.jichuku.jgsxmlqdk : result.jichuku.jg_jgsxml,
              }
              // 国省下发
              this.listStaCn = {
                ewsData: result.guoshengxiafa.yujingxinhao,
                complaintsData: result.guoshengxiafa.tousujubao,
                creditData: result.guoshengxiafa.xinyongxinxi,
                listMattersData: result.guoshengxiafa.shixiangqingdan
              }
              const data1 = {date: [], shangbao: [], xiafa: []}
              const data2 = {date: [], huiju: [], xiafa: []}

              for (let i = 0; i < result.shujujiaohuan.length; i++) {
                data1.date.push(result.shujujiaohuan[i].date)
                data1.shangbao.push(result.shujujiaohuan[i].shangbao)
                data1.xiafa.push(result.shujujiaohuan[i].xiafa)
              }
              for (let i = 0; i < result.shujuzengzhang.length; i++) {
                data2.date.push(result.shujuzengzhang[i].date)
                data2.huiju.push(result.shujuzengzhang[i].huiju)
                data2.xiafa.push(result.shujuzengzhang[i].xiafa)
              }
              this.echartsAll(data1, data2)
            } else {
              this.echartsAll(
                {
                  date: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
                  shangbao: [500, 600, 700, 900, 1000, 900, 400, 800],
                  xiafa: [400, 800, 1000, 900, 800, 700, 600, 500]
                }, {
                  date: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
                  huiju: [220, 302, 400, 500, 600, 800, 960, 1200],
                  xiafa: [200, 270, 380, 480, 560, 760, 890, 1120]
                }
              )
            }
          })
        })
      },
      echartsAll(data1, data2) {
        const myEcharts1 = this.$echarts.init(
          document.getElementById('exchangetrends')
        )
        const myEcharts2 = this.$echarts.init(document.getElementById('growth'))

        const option1 = {
          color: ['#4DA1FF', '#FF8787'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            x: 'right',
            data: ['数据上报', '市级下发']
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
                color: ['#fff', '#F5F7FA']
              }
            }

          },
          series: [
            {
              name: '数据上报',
              //  data: this.timeDataEcharts.listIn,
              data: data1.shangbao,
              type: 'line',
              smooth: true
            },
            {
              name: '市级下发',
              // data: this.timeDataEcharts.listOut,
              data: data1.xiafa,
              type: 'line',
              smooth: true
            }
          ]
        }

        const option2 = {
          color: ['#4DA1FF', '#FF8787'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['数据汇聚', '市级下发'],
            x: 'right'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          // xAxis: [
          //   {
          //     type: "category",
          //   //  data: this.timeData
          //     data:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
          //   }
          // ],
          xAxis: {
            type: 'category',
            boundaryGap: [0, 0.01],
            axisLabel: {
              fontSize: 14,
              color: '#333333'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#979797'
              }
            },
            splitLine: {
              show: false
            },
            data: data2.date
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              show: true,
              fontSize: 14,
              color: '#333333'
            },
            axisLine: {
              show: true,
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
              name: '数据汇聚',
              type: 'bar',
              barWidth: '20%',
              // label: {
              //   normal: {
              //     show: true,
              //     // position: "top"
              //   }
              // },
              //  data: this.timeDataEcharts.listOver,
              data: data2.huiju
            },
            {
              name: '市级下发',
              type: 'bar',
              barWidth: '20%',
              // label: {
              //   normal: {
              //     show: true,
              //     position: "top"
              //   }
              // },
              // data: this.timeDataEcharts.listOut,
              data: data2.xiafa
            }
          ]
        }
        myEcharts1.setOption(option1)
        myEcharts2.setOption(option2)

        window.onresize = function() {
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
      height: 846px;
      flex: 1;
      width: 30%;

      .toppage {
        height: 342px;
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
      height: 846px;
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
      height: 846px;
      margin-left: 20px;
      flex: 1;
      width: 30%;

      .abovepage {
        height: 556px;
        background: #fff;
        padding: 20px;

        .ulList {
          border-top: 2px dashed #dfdfdf;
          margin-top: 10px;
          height: 485px;
          font-size: 16px;

          li {
            &:nth-child(1) {
              margin-top: 20px;
            }

            height: 56px;
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


