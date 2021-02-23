<template>
  <div class="ALLpagestable">
    <div class="leftpage">
      <div class="toppage">
        <div class="departmenttop">
          <p class="card-title">
            <span>指标查询统计</span>
            <span class="viewMore">
              <!-- <span class="icon+">+</span>查看更多 -->
            </span>
          </p>
          <div class="dataTwo">
             <el-date-picker
                v-model="value1"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']">
             </el-date-picker>
             <el-input v-model="input" placeholder="请输入部门或区县搜索" class="view-input"></el-input>
             <el-button type="primary" class="view-button">搜 索</el-button>
          </div>
          <div class="dataThree">
            <div class="item">
              <div class="topText">
                 覆盖率
              </div>
              <div class="midNumber">87%</div>
            </div>
            <div class="item">
              <div class="topText">
                及时率
              </div>
              <div class="midNumber">87%</div>
            </div>
            <div class="item">
              <div class="topText">
                准确率
              </div>
              <div class="midNumber">87%</div>
            </div>
            <div class="item">
              <div class="topText">
                归集量（条）
              </div>
              <div class="midNumber">3600</div>
            </div>
          </div>
        </div>
      </div>
      <div class="middlepage">
        <p class="card-title">
          <span>部门数据汇聚情况</span>
          <span class="viewMore">
          </span>
        </p>
        <div class="dataFour">
          <template>
            <el-table
            :data="ulList1"
            style="width: 100%;border:none;margin-top: 20px;"
            height="250px">
            <el-table-column
                prop="label"
                label="部门名称">
            </el-table-column>
            <el-table-column
                prop="total"
                label="覆盖率">
            </el-table-column>
            <el-table-column
                prop="volume"
                label="及时率">
            </el-table-column>
            <el-table-column
                prop="volume"
                label="准确率">
            </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
    <div class="rightpage">
      <div class="abovepage">
        <p class="card-title">
          <span>指标统计</span>
          <span class="viewMore">
          </span>
        </p>  
        <div class="card-list">
          <div class="item">
            <div class="topText">
              <i></i>
            </div>
            <div class="font-wapper">
              覆盖率
            </div>
            <div class="midNumber">80%</div>
          </div> 
          <div class="item">
            <div class="topText">
               <i></i>
            </div>
            <div class="font-wapper">
              准确率
            </div>
            <div class="midNumber">80%</div>
          </div> 
          <div class="item">
            <div class="topText">
            <i></i>
            </div>
            <div class="font-wapper">
              及时率
            </div>
            <div class="midNumber">80%</div>
          </div> 
        </div>
      </div>
      <div class="belowpage">
        <p class="card-title">
        <span>区县数据汇聚情况</span>
        <span class="viewMore">
            <!-- <span class="icon+">+</span>查看更多 -->
        </span>
        </p>
        <div class="list-select">
            <template>
            <el-table
                :data="ulList"
                style="width: 100%;border:none;margin-top: 20px;"
                height="250px">
                <el-table-column
                prop="label"
                label="区县名称">
                </el-table-column>
                <el-table-column
                prop="total"
                label="覆盖率">
                </el-table-column>
                <el-table-column
                prop="volume"
                label="及时率">
                </el-table-column>
                <el-table-column
                prop="volume"
                label="准确率">
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
        value1: '',
        ulList1: [{
          label: '省宣传部',
          total: '89%',
          volume: '89%'
        },
        {
          label: '科技局',
          total: '89%',
          volume: '89%'
        },
        {
          label: '医保局',
          total: '89%',
          volume: '89%'
        },
        {
          label: '发改委',
          total: '89%',
          volume: '89%'
        },
        {
          label: '工信局',
          total: '89%',
          volume: '89%'
        },
        {
          label: '科技局',
          total: '89%',
          volume: '89%'
        },
        {
          label: '科技局',
          total: '89%',
          volume: '89%'
        },
        {
         label: '工信局',
          total: '89%',
          volume: '89%'
        },
        {
          label: '工信局',
          total: '89%',
          volume: '89%'
        },
       {
          label: '科技局',
          total: '89%',
          volume: '89%'
        },
        {
         label: '工信局',
          total: '89%',
          volume: '89%'
        },
        {
          label: '宣传部',
          total: '89%',
          volume: '89%'
        },
        {
          label: '审批局',
          total: '89%',
          volume: '89%'
        },
        {
          label: '科技局',
          total: '89%',
          volume: '89%'
        },
        {
          label: '科技局',
          total: '89%',
          volume: '89%'
        },
        {
          label: '科技局',
          total: '89%',
          volume: '89%'
        },
        {
          label: '科技局',
          total: '89%',
          volume: '89%'
        }
        ],
        ulList: [{
          label: '姑苏区',
          total: '82%',
          volume: '82%'
        },
        {
          label: '相城区',
          total: '82%',
          volume: '82%'
        },
        {
          label: '虎丘区',
          total: '82%',
          volume: '82%'
        },
        {
          label: '吴江区',
          total: '82%',
          volume: '82%'
        },
        {
          label: '吴中区',
          total: '82%',
          volume: '82%'
        },
        {
          label: '高新区',
          total: '82%',
          volume: '82%'
        },
        {
          label: '张家港市',
          total: '82%',
          volume: '82%'
        },
        {
         label: '常熟区',
          total: '82%',
          volume: '82%'
        },
        {
          label: '太仓市',
          total: '82%',
          volume: '82%'
        },
       {
          label: '昆山市',
          total: '82%',
          volume: '82%'
        }
        ],
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
         input: ''       
      }
    },
    created() {
      console.log('获取了数据')   
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
        font-size: 16px;
        color: #333333;
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
        background: #fff;
        padding: 20px 20px 0 20px;

        .dataTwo {
            border-top: 2px dashed #dfdfdf;
            margin-top: 10px;
            padding-top: 20px;
            margin-bottom: 20px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
          .item:nth-child(2) {
            border-right: none;
          }
          .view-input {
            width: 300px;
            margin-left: 30px;
          }
          .view-button {
            margin-left: 10px;
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
              color: #03C5C3;
            }
          }
          .item:nth-child(1) {
            .midNumber {
              color: #124DAB;
            }
          }
          .item:nth-child(2) {
            .midNumber {
              color: #338EFF;
            }
          }

          .item:nth-child(3) {
            .midNumber {
              color: #338EFF;
            }
          }

          .fonsize {
            font-size: 10px;
          }
        }
      }

      .middlepage {
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
          }
        }

        .item:nth-child(1) {
          .midNumber {
            color: #338EFF;
            font-size: 44px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/downleft.png") center no-repeat;
          }
        }

        .item:nth-child(2) {
          .midNumber {
            color: #124DAB;
            font-size: 44px;
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
        background: #fff;
        padding: 20px;
        .card-list {
          border-top: 2px dashed #dfdfdf;
          margin-top: 10px;
          font-size: 16px;
          overflow: hidden;
          display: flex;
          .item {
           height: 177px;
           width: 250px;
           float: left;
           text-align: center;
        //    margin-left: 100px;
        //    margin-right: 50px;
            .topText {
               font-size: 1.1rem;
               font-weight: 800;
               height: 50px;
            }
            .font-wapper {
                font-size: 16px;
                font-family: 微软雅黑;
                color: #333333;
                clear: both;
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
                color: #AB96FE;
                font-size: 44px;
                margin-top: 10px;
            }

            i {
                background: url("../../assets/img/dataMarketIndex/fgl.png") center no-repeat;
            }
        }

        .item:nth-child(2) {
          .midNumber {
            color: #124DAB;
            font-size: 44px;
            margin-top: 10px;
          }

          i {
            background: url("../../assets/img/dataMarketIndex/zql.png") center no-repeat;
          }
        }

        .item:nth-child(3) {
          border-right: none;

          .midNumber {
            color: #03C5C3;
            font-size: 44px;
            margin-top: 10px;
          }
          i {
            background: url("../../assets/img/dataMarketIndex/jsl.png") center no-repeat;
          }
        }
        }
      }

      .belowpage {
        background: #fff;
        margin-top: 20px;
        padding: 20px;

        .echartRight {
          height: 200px;
          border-top: 2px dashed #dfdfdf;
          margin-top: 20px;

          #growth {
            height: 200px;
          }
        }
      }
      .list-select {
        margin-top: 20px;
        border-top: 2px dashed #dfdfdf;
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


