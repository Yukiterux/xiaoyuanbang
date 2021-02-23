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
                市级部门
              </div>
              <div class="topText">
                 接入数
              </div>
              <div class="midNumber">{{dataResult.sjbmjrs || 0}}</div>
            </div>
            <div class="item">
              <div class="topText">
                县级市（区）
              </div>
              <div class="topText">
                接入数
              </div>
              <div class="midNumber">{{dataResult.xjsjrs || 0}}</div>
            </div>
            <div class="item">
              <div class="topText">
                县级市（区）
              </div>
              <div class="topText">
                部门接入数
              </div>
              <div class="midNumber">{{dataResult.xjsbmjrs || 0}}</div>
            </div>
            <div class="item">
              <div class="topText">
                市区两级
              </div>
              <div class="topText">
                接入部门总数
              </div>
              <div class="midNumber">{{dataResult.sqljjr || 0}}</div>
            </div>
          </div>
          <div class="dataThree">
            <div class="item">
              <div class="topText">市级部门</div>
              <div class="topText">今日新增（条）</div>
              <div class="midNumber">{{filterNumber(dataResult.sjjrxz,1,0) || 0 }}</div>
            </div>
            <div class="item">
              <div class="topText">县级市（区）</div>
              <div class="topText">今日新增（条）</div>
              <div class="midNumber">{{filterNumber(dataResult.xjjrxz,1,0) || 0 }}</div>
            </div>
            <div class="item">
              <div class="topText">日均增长（条）</div>
              <div class="topText"></div>
              <div class="midNumber">{{filterNumber(dataResult.rjzz,1,0) || 0}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="middlepage">
        <p class="card-title">
          <span>省级下发</span>
          <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
          </span>
        </p>
        <div class="dataFour">
          <div class="item">
            <div class="topText">预警信号</div>
            <div class="fonsize w">条
            </div>
            <div class="midNumber">{{filterNumber(dataResult.yjxh,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">投诉举报</div>
            <div class="fonsize w">条
            </div>
            <div class="midNumber">{{filterNumber(dataResult.tsjb,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">信用信息</div>
            <div class="fonsize w">条
            </div>
            <div class="midNumber">{{filterNumber(dataResult.xyxx,1,0) || 0}}</div>
          </div>
          <div class="item">
            <div class="topText">事项清单</div>
            <div class="fonsize w">万条</div>
            <div class="midNumber">{{filterNumber(dataResult.sxqd,1,0) || 0}}</div>
          </div>
        </div>
      </div>
      <div class="tailpage">
        <p class="card-title">
          <span>数据交换情况</span>
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
        <span>监管数据中心概览</span>
        <span class="viewMore">
          <!-- <span class="icon+">+</span>查看更多 -->
        </span>
      </p>
      <div class="centerTop">
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>汇聚库</span>
              <span class="fonsize w">{{dataResult.hjk > 10000 ? '万条':'条'}}</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(dataResult.hjk,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>基础库</span>
              <span class="fonsize w">{{dataResult.jck > 10000 ? '万条':'条'}}</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(dataResult.jck,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">
            <i></i>
            <span class="font-wapper">
              <span>共享库</span>
              <span class="fonsize w">{{dataResult.gxk > 10000 ? '万条':'条'}}</span>
            </span>
          </div>
          <div class="midNumber">{{filterNumber(dataResult.gxk,1,0) || 0}}</div>
        </div>
      </div>
      <div class="centerMid">
        <img src="../../assets/img/dataMarketIndex/centernew1.png" style="height:100%;width:100%" alt/>
      </div>
      <div class="centerBot">
        <div class="item">
          <div class="topText">市（区）上报</div>
          <div class="fonsize w" style="font-family: 微软雅黑;color: #a09b9b;margin-top: 10px;">{{dataResult.sqsb > 10000 ? '万条':'条'}}</div>
          <div class="midNumber">{{filterNumber(dataResult.sqsb,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">数据下发</div>
          <div class="fonsize w" style="font-family: 微软雅黑;color: #a09b9b;margin-top: 10px;">{{dataResult.sjxf > 10000 ? '万条':'条'}}</div>
          <div class="midNumber">{{filterNumber(dataResult.sjxf,1,0) || 0}}</div>
        </div>
        <div class="item">
          <div class="topText">数据上报</div>
          <div class="fonsize w" style="font-family: 微软雅黑;color: #a09b9b;margin-top: 10px;">{{dataResult.gl_sjsb > 10000 ? '万条':'条'}}</div>
          <div class="midNumber">{{filterNumber(dataResult.gl_sjsb,1,0) || 0}}</div>
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
            监管事项目录清单库
            <!-- <span>{{listCenStor.ipoiAmount || 0}}</span> -->
            <span>{{dataResult.jck_jck ? dataResult.jck_jck.jgsxmlqdk :0}}</span>
          </li>
          <li>
            监管对象信息库
            <!-- <span>{{listCenStor.biroAmount || 0}}</span> -->
            <span>{{dataResult.jck_jck ? dataResult.jck_jck.jgdxxxk :0}}</span>
          </li>
          <li>
            监管行为信息库
            <span>{{dataResult.jck_jck ? dataResult.jck_jck.jgxwxxk :0}}</span>
          </li>
          <li>
            执法人员信息库
            <!-- <span>{{listCenStor.rbiAmount || 0}}</span> -->
            <span>{{dataResult.jck_jck ? dataResult.jck_jck.zfryxxk :0}}</span>
          </li>
          <li>
            投诉举报信息库
            <span>{{dataResult.jck_jck ? dataResult.jck_jck.tsjbxxk :0}}</span>
          </li>
          <li>
            知识库
            <span>{{dataResult.jck_jck ? dataResult.jck_jck.zsk :0}}</span>
          </li>
          <li>
            双随机-公开计划信息库
            <span>{{dataResult.jck_jck ? dataResult.jck_jck.ssjygk :0}}</span>
          </li>
          <li>
            信用信息库
            <span>{{dataResult.jck_jck ? dataResult.jck_jck.xyxxk :0}}</span>
          </li>
          <li>
           风险预警信息库
            <span>{{dataResult.jck_jck ? dataResult.jck_jck.fxyjk :0}}</span>
          </li>
          <li>
            联合监管信息库
            <span>{{dataResult.jck_jck ? dataResult.jck_jck.lhjg :0}}</span>
          </li>
        </ul>
      </div>
      <div class="belowpage">
           <div class="select1" style="float: left;width:150px">
             <template>
                <el-select
                placeholder="请选择" v-model="optionsValue" @change="sbListLoad">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
             </template>
           </div>
           <div class="select2" style="float: right;width:150px">
              <template>
                <el-select
                  placeholder="请选择" @change="sxListLoad" v-model="options1Value">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
              </template>
           </div>
           <div class="list-select">
              <!-- <ul class="ulList" style="overflow-y:scroll;height:245px;">
                <li v-for="(item, index) in ulList" :key="index">
                    {{ item.label }}
                  <span>
                    {{ item.total }}
                  </span>
                  <span>
                    {{ item.volume }}
                  </span>
                </li>
              </ul> -->
              <template>
                <el-table
                  :data="sjList"
                  style="width: 100%;border:none;"
                  height="250px">
                  <el-table-column
                    prop="name"
                    label="部门名称"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="报送量"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="inNum"
                    label="入库量"
                    >
                  </el-table-column>
                </el-table>
              </template>
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
        dataResult:{},
        sjList: [],
        optionsValue:1,
        options1Value:1,
        // 新加 start
         options: [{
           label: '数据上报',
           value: 1
         },
         {
           label: '数据下发',
           value: 2
         }
         ],
         options1: [
         {
           label: '市级',
           value: 1
         },
         {
          label: '县区',
          value:  2
         }
         ],
        // 新加 end
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
      //上报数据选择
      sbListLoad(obj){
        if(obj===1){
          this.sjList=[]
          for(let i=0;i<this.dataResult.sjsb_sj_sb.length;i++){
                let tmp = {
                    name:this.dataResult.sjsb_sj_sb[i].name,
                    num:this.dataResult.sjsb_sj_sb[i].num,
                    inNum:this.dataResult.sjsb_sj_rk[i].num
                }
                 this.sjList.push(tmp)
              }
              this.options1Value = 1   
        }else{
          this.sjList=[]
          for(let i=0;i<this.dataResult.sjxf_sj_xf.length;i++){
                let tmp = {
                    name:this.dataResult.sjxf_sj_xf[i].name,
                    num:this.dataResult.sjxf_sj_xf[i].num,
                }
                 this.sjList.push(tmp)
              }
          this.options1Value = 1    
        }
      },
      //市级或县级数据选择
      sxListLoad(obj){
        if(obj===1 && this.optionsValue===1){
          this.sjList=[]
          for(let i=0;i<this.dataResult.sjsb_sj_sb.length;i++){
                let tmp = {
                    name:this.dataResult.sjsb_sj_sb[i].name,
                    num:this.dataResult.sjsb_sj_sb[i].num,
                    inNum:this.dataResult.sjsb_sj_rk[i].num
                }
                 this.sjList.push(tmp)
              }
        }else if(obj===2 && this.optionsValue===1){
          this.sjList=[]
          for(let i=0;i<this.dataResult.sjsb_qx_sb.length;i++){
                let tmp = {
                    name:this.dataResult.sjsb_qx_sb[i].name,
                    num:this.dataResult.sjsb_qx_sb[i].num,
                    inNum:this.dataResult.sjsb_qx_rk[i].num
                }
                 this.sjList.push(tmp)
              }
        }else if(obj===1 && this.optionsValue===2){
          this.sjList=[]
          for(let i=0;i<this.dataResult.sjxf_sj_xf.length;i++){
                let tmp = {
                    name:this.dataResult.sjxf_sj_xf[i].name,
                    num:this.dataResult.sjxf_sj_xf[i].num,
                }
                 this.sjList.push(tmp)
              }
        }else if(obj===2 && this.optionsValue===2){
          this.sjList=[]
          for(let i=0;i<this.dataResult.sjxf_qx_xf.length;i++){
                let tmp = {
                    name:this.dataResult.sjxf_qx_xf[i].name,
                    num:this.dataResult.sjxf_qx_xf[i].num,
                }
                 this.sjList.push(tmp)
              }
        }
      },
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
              this.dataResult = JSON.parse(res.data.resultData.resultContent)
              for(let i=0;i<this.dataResult.sjsb_sj_sb.length;i++){
                let tmp = {
                    name:this.dataResult.sjsb_sj_sb[i].name,
                    num:this.dataResult.sjsb_sj_sb[i].num,
                    inNum:this.dataResult.sjsb_sj_rk[i].num
                }
                 this.sjList.push(tmp)
              }
              this.echartsAll()
            }
          })
        })
      },
      echartsAll() {
        let date = []
        let data1 = []
        let data2 = []
        let data3 = []
        for(let i=0;i<this.dataResult.sjgj.length;i++){
          date.push(this.dataResult.sjgj[i].date)
          data1.push(this.dataResult.sjgj[i].num==null ? 0 :this.dataResult.sjgj[i].num)
          data2.push(this.dataResult.sjsb[i].num==null ? 0 :this.dataResult.sjsb[i].num)
          data3.push(this.dataResult.sjjh_sjxf[i].sum==null ? 0 :this.dataResult.sjjh_sjxf[i].sum)
        }    
        const myEcharts = this.$echarts.init(
          document.getElementById('exchangetrends')
        )
        const option = {
          color: ['#52ca92', '#4DA1FF', '#FF8787'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            x: 'right',
            data: ['数据归集', '数据上报', '数据下发']
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
            data: date
            // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
              name: '数据归集',
               data: data1,
              // data: ['10', '20', '5', '3', '10', '8', '20', '4', '7', '10', '10', '5'],
              type: 'line',
              smooth: true
            },
            {
              name: '数据上报',
               data: data2,
              // data: ['5', '5', '5', '5', '5', '5', '6', '10', '5', '10', '5', '2', '10'],
              type: 'line',
              smooth: true
            },
            {
              name: '数据下发',
              data: data3,
              // data: ['20', '10', '10', '8', '15', '10', '6', '8', '10', '20', '1', '3'],
              type: 'line',
              smooth: true
            }
          ]
        }
        myEcharts.setOption(option)
        // window.onresize = function() {
        myEcharts.resize()
        // }
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
    .card-title1 {
      height: 24px;
      
    }
    .item {
      //公共样式
      flex: 1;
      height: 120px;
      margin-top: 25px;
      // border-right: 1px solid #cfdae0;
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
            color: #338EFF;
          }
          .item:nth-child(1) {
            .midNumber {
              color: #124DAB;
            }
          }
          .item:nth-child(2) {
            .midNumber {
              color: #338eff;
            }
          }
          .item:nth-child(3) {
            .midNumber {
              color: #338eff;
            }
          }
          .item:nth-child(4) {
            .midNumber {
              color: #03C5C3;
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
            // border-right: 1px solid #cfdae0;

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
              color: #124DAB;
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
            color: #37BD9C;
            font-size: 44px;
            margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/lefticon.png") center no-repeat;
          }
        }

        .item:nth-child(2) {
          .midNumber {
            color: #F88080;
            font-size: 44px;
            margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/downright.png") center no-repeat;
          }
        }

        .item:nth-child(3) {
          border-right: none;

          .midNumber {
            color: #4DA1FF;
            font-size: 44px;
            margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/centericon.png") center no-repeat;
          }
        }
      }

      .centerMid {
        height: 380px;
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

            // .fonsize {
            //   font-size: 10px;
            // }
          }
        }

        .item:nth-child(1) {
          .midNumber {
            color: #338EFF;
            font-size: 44px;
            // margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/downleft.png") center no-repeat;
          }
        }

        .item:nth-child(2) {
          .midNumber {
            color: #124DAB;
            font-size: 44px;
            // margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/downcenter.png") center no-repeat;
          }
        }

        .item:nth-child(3) {
          border-right: none;

          .midNumber {
            color: #03C5C3;
            font-size: 44px;
            // margin-top: 10px;
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
        height: 490px;
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
            // height: 45px;
            list-style: none;
            line-height: 40px;
            position: relative;

            span {
              position: absolute;
              right: 0;
              color: #333333;
            }
          }
        }
      }

      .belowpage {
        height: 335px;
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
      .list-select {
        margin-top: 50px;
      }
      .list-select >>> .el-table__row>td{
        /* 去除表格线 */
        border: none;
       }
       .list-select >>> .el-table th.is-leaf {
         /* 去除上边框 */
        border: none;
       }
      .list-select >>> .el-table__row>td{
      /* 去除表格线 */
       border: none;
      }
      .list-select >>> .el-table::before{
       /* 去除下边框 */
       height: 0;
      }
    }
  }

  .font-wapper {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;

    // .fonsize.w {
    //   font-size: 12px;
    //   font-weight: 400;
    // }
  }
</style>


