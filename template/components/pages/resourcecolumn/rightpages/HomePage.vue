<style lang="scss" >
.homepage {
  background: #f2f2f6;
  position: relative;
  .mid-content {
    padding: 15px 0;
    margin-right: 205px;
  }
  .grid-item {
    height: 234px;
    background: #fff;
    border-radius: 4px;
    margin: 15px;
  }
  .echarts {
    height: 200px;
  }
  .muzb-ech {
    height: 176px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 18px;
  }
  .grid-item.table-list {
    height: 496px;
  }
  .grid-item.martp {
    margin-top: 30px;
  }
  .grid-item.col-all {
    height: 200px;
    .echarts {
      height: 165px;
    }
  }
  .table-show {
    padding: 10px 8px 28px;
    .ivu-table td {
      border-bottom: 1px dashed #e5e5e5;
    }
    .ivu-table th {
      background: #e8f4ff;
      border: none;
    }
    .ivu-table td,
    .ivu-table th {
      text-align: center;
      color: #333;
    }
    .ivu-table:before,
    .ivu-table:after {
      display: none;
    }
    .ivu-table-wrapper {
      border: none;
    }
  }
  .list-show {
    position: absolute;
    top: 15px;
    right: 15px;
    .grid-item {
      width: 160px;
      height: 612px;
    }
    .grid-item:last-child {
      margin-top: 30px;
    }
  }
  .scroll-list {
    margin-top: 8px;
    height: 565px;
  }
  .ul-list {
    li {
      padding: 8px;
      text-align: left;
      .time {
        font-size: 12px;
        line-height: 18px;
        color: #666666;
      }
      .item-info {
        i {
          float: left;
          width: 21px;
          height: 21px;
          background: url(../../../../assets/img/icon/personal-center.png)
            no-repeat;
          background-size: 100% 100%;
        }
        .item-info-text {
          height: 40px;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
          margin-left: 29px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
  .yhtj {
    width: 100%;
    height: 145.5px;
    padding-top: 27px;
    text-align: center;
    .yhtj9 {
      width: 70px;
      height: 70px;
      margin: 0 auto;
    }
    .yhtjtit {
      height: 50px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #333333;
      line-height: 50px;
      span {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
      }
      .tit1 {
        color: rgba(38, 147, 255, 1);
      }
      .tit2 {
        color: rgba(255, 198, 0, 1);
      }
      .tit3 {
        color: rgba(6, 197, 195, 1);
      }
      .tit4 {
        color: rgba(107, 112, 247, 1);
      }
    }
  }
}
</style>
<template>
  <div class="homepage">
    <div class="mid-content">
      <Row>
        <Col span="12">
        <div class="grid-item">
          <h2 class="title">
            <i></i>
            <span>目录占比</span>
          </h2>
          <div class="fn-clear">
            <Row>
              <Col span="12">
              <div class="muzb-ech" id="ysb"></div>
              </Col>
              <Col span="12">
              <div class="muzb-ech" id="sz"></div>
              </Col>
            </Row>
          </div>
        </div>
        </Col>
        <Col span="12">
        <div class="grid-item">
          <h2 class="title">
            <i></i>
            <span>共享类型目录统计</span>
          </h2>
          <div class="echarts" id="gxlx"></div>
        </div>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <div class="grid-item">
          <h2 class="title">
            <i></i>
            <span>共享方式统计</span>
          </h2>
          <div class="echarts" id="gxtj1" ref="bar"></div>
        </div>
        <div class="grid-item martp">
          <h2 class="title">
            <i></i>
            <span>省直部门不同分类目录TOP10</span>
          </h2>
          <div class="echarts" id="flmltop10"></div>
        </div>
        </Col>
        <Col span="12">
        <div class="grid-item table-list">
          <h2 class="title">
            <i></i>
            <span>全国TOP10发布目录统计</span>
          </h2>
          <div class="table-show">
            <Table height="437" :columns="columns1" :data="data1"></Table>
          </div>
        </div>
        </Col>
      </Row>
      <div class="grid-item col-all">
        <h2 class="title">
          <i></i>
          <span>省直部门不同分类目录</span>
        </h2>
        <div class="echarts" id="flml"></div>
      </div>
      <Row>
        <Col span="12">
        <div class="grid-item">
          <h2 class="title">
            <i></i>
            <span>共享方式统计</span>
          </h2>
          <div class="echarts" id="gxtj2"></div>
        </div>
        </Col>
        <Col span="12">
        <div class="grid-item">
          <h2 class="title">
            <i></i>
            <span>部门目录统计</span>
          </h2>
          <div class="echarts" id="bmtj"></div>
        </div>
        </Col>
      </Row>
    </div>
    <div class="list-show">
      <div class="grid-item">
        <h2 class="title">
          <i></i>
          <span>操作记录</span>
        </h2>
        <div class="scroll-list">
          <ul class="ul-list">
            <Scroll :height="565">
              <li v-for="(item,index) in list_czjl" :key="index">
                <div class="time">{{item.date}}</div>
                <div class="item-info fn-clear">
                  <i></i>
                  <div class="item-info-text">{{item.desp}}</div>
                </div>
              </li>
            </Scroll>
          </ul>
        </div>
      </div>
      <div class="grid-item">
        <h2 class="title">
          <i></i>
          <span>目录用户统计</span>
        </h2>
        <div class="yhtj">
          <div class="yhtj9" id="yhtj91"> </div>
          <div class="yhtjtit">在线数
            <span class="tit1">+43%</span>
          </div>
        </div>
        <div class="yhtj">
          <div class="yhtj9" id="yhtj92"></div>
          <div class="yhtjtit">新用户
            <span class="tit2">+65%</span>
          </div>
        </div>
        <div class="yhtj">
          <div class="yhtj9" id="yhtj93"></div>
          <div class="yhtjtit">浏览数
            <span class="tit3">+25%</span>
          </div>
        </div>
        <div class="yhtj">
          <div class="yhtj9" id="yhtj94"></div>
          <div class="yhtjtit">总用户
            <span class="tit4">+39%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import liquidFill from 'echarts-liquidfill';

export default {
  name: 'HomePage',
  props: ['menuWidth'],
  data() {
    return {
      observer: null,
      columns1: [
        {
          title: '序号',
          width: 80,
          key: 'num'
        },
        {
          title: '部门名称',
          key: 'department'
        },
        {
          title: '部门编号',
          key: 'depNum'
        },
        {
          title: '目录数（条）',
          key: 'colNum'
        }
      ],
      data1: [
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        },
        {
          num: '1',
          department: '周口市',
          depNum: '001004016',
          colNum: '9055'
        }
      ],
      // 目录占比数据
      data_mu1: [96, 100], // 已上报目录占比
      // 共享方式统计环状图数据
      data_gx1: [
        { value: 555, name: '数据库' },
        { value: 679, name: '文件' },
        { value: 848, name: '纸质文件' },
        { value: 348, name: '接口' }
      ],
      // 共享方式统计并图
      data_gx2: [
        { value: 10, name: '拷盘' },
        { value: 5, name: '电子文档' },
        { value: 18, name: 'Excle' },
        { value: 25, name: 'Word' },
        { value: 20, name: 'Excle/Word' }
      ],

      // 共享类型目录统计数据
      enjoyData: {
        dataa5: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        datab5: [1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1],
        datac5: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      },

      // 省直部门不同分类目录TOP10数据
      departTop: {
        data_jichu6: [5, 5, 3, 2, 3, 1, 3, 1, 2, 4],
        data_zhuti6: [5, 5, 3, 2, 3, 1, 3, 1, 2, 4],
        data_bumen6: [5, 5, 3, 2, 3, 1, 3, 1, 2, 4]
      },

      // 省直部门不同分类目录数据
      departCol: {
        data_jichu7: [1, 1, 3, 2, 3, 1, 4, 3, 2, 1],
        data_zhuti7: [2, 3, 4.5, 2, 5, 1, 3, 1, 2, 4.5],
        data_bumen7: [4, 2, 3, 2, 3, 1, 2, 2, 2, 4]
      },

      // 部门目录统计数据
      departStatic: [4, 4.5, 3, 2, 3, 1, 3, 1, 2, 4],
      // 目录用户统计数据
      colUserData: [
        {
          onlineNum: 16000,
          total: 25000
        },
        {
          onlineNum: 16000,
          total: 25000
        },
        {
          onlineNum: 16000,
          total: 25000
        },
        {
          onlineNum: 16000,
          total: 25000
        }
      ],
      data91_1: [16000],
      data91_2: [25000], // 总数

      // echarts92 的数据 （新用户）
      data92_1: [194],
      data92_2: [300], // 总数

      // echarts93 的数据 （浏览数）
      data93_1: [76000],
      data93_2: [300000], // 总数

      // echarts94 的数据 （总用户）
      data94_1: [61000],
      data94_2: [180000], // 总数

      list_czjl: [
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        },
        {
          date: '2018-09-18 09:08:01',
          desp: '登录甘肃政务信 息资源目录管登录甘肃政务信 息资源目录管'
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.drawPie(); // 已上报目录占比初始化
    this.drawWater(); // 省直目录占比初始化
    this.drawPie2(); // 共享方式统计初始化
    this.drawBar(); // 共享类型目录统计初始化
    this.drawBar2(); // 省直部门不同分类目录TOP10初始化
    this.drawLine(); // 省直部门不同分类目录初始化
    this.drawBar3(); // 部门目录统计初始化
    this.drawPie3(); // 共享方式初始化
    this.drawPies(); // 目录用户统计初始化
    this.subStr(); // 操作记录超出显示省略号
  },
  methods: {
    // 已上报占比环状图
    drawPie() {
      let _self = this;
      let myEchart = _self.$echarts.init(document.getElementById('ysb'));
      let option = {
        title: {
          text: (_self.data_mu1[0] / _self.data_mu1[1]) * 100 + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#000',
            fontSize: '26'
          }
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y2: '0',
          itemHeight: 6,
          textStyle: {
            color: '#333333'
          },
          data: [
            {
              name: '已上报目录占比', // 省直目录占比
              icon: 'circle'
            }
          ]
        },
        color: ['#EAEAEA'],
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['40%', '55%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: _self.data_mu1[0],
                name: '已上报目录占比', // 省直目录占比
                itemStyle: {
                  normal: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#0088F5'
                        },
                        {
                          offset: 1,
                          color: '#57B8FF'
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    color: '#00cefc'
                  }
                }
              },
              {
                value: _self.data_mu1[1] - this.data_mu1[0],
                name: '未上报目录占比'
              }
            ]
          },
          {
            type: 'pie',
            radius: ['68%', '70%'],
            color: ['#3E9BFF'],
            animation: false,
            cursor: 'default',
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 1 }]
          }
        ]
      };
      myEchart.setOption(option);
      myEchart.resize();
    },
    // 省直目录占比水球图
    drawWater() {
      let _self = this;
      let myEchart = _self.$echarts.init(document.getElementById('sz'));
      let option = {
        legend: {
          orient: 'horizontal',
          x: 'center',
          y2: '0',
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: '#333333'
          },
          data: [
            {
              name: '省直目录占比',
              icon:
                'image://./../../../../../assets/img/icon/echarts-lengend-icon.png'
            }
          ]
        },
        series: [
          {
            name: '省直目录占比',
            type: 'liquidFill',
            data: [0.8],
            radius: '55%',
            itemStyle: {
              normal: {
                color: {
                  colorStops: [
                    {
                      offset: 0,
                      color: '#57B8FF'
                    },
                    {
                      offset: 1,
                      color: '#0088F5'
                    }
                  ]
                },
                labelLine: {
                  show: false
                }
              }
            },
            label: {
              normal: {
                formatter: ''
              }
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 0
              }
            }
          },
          {
            type: 'pie',
            radius: ['68%', '70%'],
            color: ['#3E9BFF'],
            animation: false,
            cursor: 'default',
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 1 }]
          }
        ]
      };
      myEchart.setOption(option);
      myEchart.resize();
    },
    // 共享方式统计环状图
    drawPie2() {
      let _self = this;
      let myEchart = _self.$echarts.init(document.getElementById('gxtj1'));
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },

        legend: {
          orient: 'vertical',
          x: '75%',
          y: 'center',
          itemWidth: 14,
          itemHeight: 14,
          align: 'left',
          data: ['数据库', '文件', '纸质文件', '接口']
        },
        series: [
          {
            type: 'pie',
            animation: false,
            radius: ['37%', '50%'],
            center: ['35%', '50%'],
            color: ['#6B70F7', '#FFC600', '#03C5C3', '#3A9DFF'],
            label: {
              normal: {
                formatter: '{b}'
              }
            },
            data: _self.data_gx1
          },
          {
            type: 'pie',
            animation: false,
            cursor: 'default',
            radius: ['56%', '58%'],
            center: ['35%', '50%'],
            color: ['#3A9DFF'],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 1 }]
          }
        ]
      };
      myEchart.setOption(option);
      myEchart.resize();
    },
    // 共享类型目录统计柱状图
    drawBar() {
      let _self = this;
      let myEchart = _self.$echarts.init(document.getElementById('gxlx'));
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var result = '';
            params.forEach(function(item) {
              result +=
                item.marker + ' ' + '目录总数: ' + item.value + ' ' + '</br>';
            });
            return result;
          },
          textStyle: {
            fontSize: 12
          }
        },
        legend: {
          x: 'right',
          y: '4%',
          textStyle: {
            color: '#333333',
            fontSize: '14',
            fontFamily: 'PingFangSC'
          },
          height: '20',
          itemWidth: 20,
          data: [
            {
              name: '有条件共享',
              icon: 'roundRect'
            },
            {
              name: '无条件共享',
              icon: 'roundRect'
            },
            {
              name: '不共享',
              icon: 'roundRect'
            }
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '12%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0, // 显示全部列表项目
            fontSize: 10,
            color: '#333333',
            fontFamily: 'PingFangSC'
          },
          axisTick: {
            show: true, // 刻度线
            alignWithLabel: false
          },
          axisLine: {
            lineStyle: {
              color: '#979797' // 轴线颜色
            }
          },
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false // 网格分割线
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#fff', '#F5F6FA']
            }
          },
          axisLabel: {
            interval: 0, // 显示全部列表项目
            textStyle: {
              fontSize: 14,
              color: '#333333',
              fontWeight: 'Regular'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#979797' // 轴线颜色
            }
          },
          min: 0,
          max: 5
        },
        series: [
          {
            name: '不共享',
            type: 'bar',
            barWidth: 15,
            stack: '广告',
            itemStyle: {
              normal: {
                color: '#6B70F7'
              }
            },
            data: _self.enjoyData.datac5
          },
          {
            name: '无条件共享',
            type: 'bar',
            barWidth: 15,
            stack: '广告',
            itemStyle: {
              normal: {
                color: '#03C5C3'
              }
            },
            data: _self.enjoyData.datab5
          },
          {
            name: '有条件共享',
            type: 'bar',
            barWidth: 15,
            stack: '广告',
            itemStyle: {
              normal: {
                color: '#1089EC'
              }
            },
            data: _self.enjoyData.dataa5
          }
        ]
      };
      myEchart.setOption(option);
      myEchart.resize();
    },
    // 共享方式统计饼图
    drawPie3() {
      let _self = this;
      let myEchart = _self.$echarts.init(document.getElementById('gxtj2'));
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: '70%',
          y: 'center',
          data: ['拷盘', '电子文档', 'Excle', 'Word', 'Excle/Word']
        },
        calculable: true,
        series: [
          {
            name: '共享方式统计',
            type: 'pie',
            radius: ['10%', '63%'],
            center: ['30%', '50%'],
            roseType: 'area',
            color: ['#1089EC', '#FFC600', '#03C5C3', '#09B8F7', '#9E7DE9'],
            data: _self.data_gx2
          }
        ]
      };
      myEchart.setOption(option);
      myEchart.resize();
    },
    // 省直部门不同分类目录TOP10柱状图
    drawBar2() {
      let _self = this;
      let myEchart = _self.$echarts.init(document.getElementById('flmltop10'));
      let option = {
        title: {},
        grid: {
          top: '15%',
          bottom: '20%',
          left: '6%',
          right: '4%'
        },
        legend: {
          itemWidth: 20,
          itemGap: 20,
          x: 'right',
          y: '4%',
          textStyle: {
            color: '#333333'
          },
          rich: {
            align: 'left'
          },
          data: [
            {
              name: '基础'
            },
            {
              name: '主题'
            },
            {
              name: '部门'
            }
          ]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0, // 显示全部列表项目
            fontSize: 10,
            color: '#333333',
            showMaxLabel: true
          },
          axisTick: {
            show: true, // 刻度线
            alignWithLabel: false
          },
          axisLine: {
            lineStyle: {
              color: '#979797' // 轴线颜色
            }
          },
          data: [
            '省公安厅',
            '省发展\n改革委',
            '省统计局',
            '省文化厅',
            '省工商局',
            '省教育厅',
            '省农业厅',
            '省安全\n监管局',
            '省民政厅',
            '省人力资源\n社会保障厅'
          ]
        },

        yAxis: {
          type: 'value',
          splitLine: {
            show: false // 网格分割线
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#fff', '#F5F6FA']
            }
          },
          axisLabel: {
            interval: 0, // 显示全部列表项目
            textStyle: {
              fontSize: 14,
              color: '#333',
              fontWeight: 'Regular',
              fontFamily: 'PingFangSC'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#979797' // 轴线颜色
            }
          }
        },

        series: [
          {
            name: '基础',
            type: 'bar',
            barWidth: 8,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new _self.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#1789FA'
                  },
                  {
                    offset: 1,
                    color: '#95CAFF'
                  }
                ])
              }
            },
            data: _self.departTop.data_jichu6
          },
          {
            name: '主题',
            type: 'bar',
            barWidth: 8,
            barGap: '40%',
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new _self.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#8766FC'
                  },
                  {
                    offset: 1,
                    color: '#C3B3FF'
                  }
                ])
              }
            },
            data: _self.departTop.data_zhuti6
          },
          {
            name: '部门',
            type: 'bar',
            barWidth: 8,
            barGap: '40%',
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new _self.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#03C5C3'
                  },
                  {
                    offset: 1,
                    color: '#97E7E6'
                  }
                ])
              }
            },
            data: _self.departTop.data_bumen6
          }
        ]
      };
      myEchart.setOption(option);
      myEchart.resize();
    },
    // 省直部门不同分类目录折线图
    drawLine() {
      let _self = this;
      let myEchart = _self.$echarts.init(document.getElementById('flml'));
      let option = {
        title: {},
        grid: {
          top: '22%',
          bottom: '22%',
          left: '3%',
          right: '3%'
        },
        legend: {
          orient: 'horizontal',
          x: 'right',
          y: '3%',
          itemGap: 45,
          textStyle: {
            color: '#333333'
          },

          data: [
            {
              name: '基础',
              icon: 'line'
            },
            {
              name: '主题',
              icon: 'line'
            },
            {
              name: '部门',
              icon: 'line'
            }
          ]
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            fontSize: 9,
            align: 'left'
          }
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0, // 显示全部列表项目
            fontSize: 10,
            color: '#333333',
            align: 'center'
          },
          boundaryGap: false,
          axisTick: {
            show: true, // 刻度线
            alignWithLabel: false
          },
          axisLine: {
            lineStyle: {
              color: '#979797' // 轴线颜色
            }
          },

          data: [
            '省公安厅',
            '省发展改革委',
            '省统计局',
            '省文化厅',
            '省工商局',
            '省教育厅',
            '省农业厅',
            '省安全监管局',
            '省民政厅',
            '省人力资源\n社会保障厅'
          ]
        },

        yAxis: {
          type: 'value',
          splitLine: {
            show: true // 网格分割线
          },
          axisLabel: {
            interval: 0, // 显示全部列表项目
            textStyle: {
              fontSize: 14,
              color: '#333333',
              fontWeight: 'Regular'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#979797' // 轴线颜色
            }
          }
        },

        series: [
          {
            name: '基础',
            areaStyle: {
              opacity: 0.1,
              color: '#1789FA'
            },
            type: 'line',
            barWidth: 10,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: new _self.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#1789FA'
                  },
                  {
                    offset: 1,
                    color: '#95CAFF'
                  }
                ])
              }
            },
            data: _self.departCol.data_jichu7
          },
          {
            name: '主题',
            areaStyle: {
              opacity: 0.333333
            },
            type: 'line',
            barWidth: 10,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: new _self.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#8766FC'
                  },
                  {
                    offset: 1,
                    color: '#C3B3FF'
                  }
                ])
              }
            },
            data: _self.departCol.data_zhuti7
          },
          {
            name: '部门',
            areaStyle: {
              opacity: 0.2
            },
            type: 'line',
            barWidth: 10,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: new _self.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#03C5C3'
                  },
                  {
                    offset: 1,
                    color: '#97E7E6'
                  }
                ])
              }
            },
            data: _self.departCol.data_bumen7
          }
        ]
      };
      myEchart.setOption(option);
      myEchart.resize();
    },
    // 部门目录统计柱状图
    drawBar3() {
      let _self = this;
      let myEchart = _self.$echarts.init(document.getElementById('bmtj'));
      let option = {
        grid: {
          top: '15%',
          bottom: '20%',
          left: '6%',
          right: '6%'
        },
        legend: {
          x: 'right',
          y: '4%',
          itemWidth: 15,
          textStyle: {
            color: '#333333',
            fontSize: '14'
          },
          data: [
            {
              name: '数量',
              icon: 'rectangle'
            }
          ]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0, // 显示全部列表项目
            fontSize: 9,
            color: '#333333',
            align: 'center',
            showMaxLabel: true
          },
          axisTick: {
            show: true, // 刻度线
            alignWithLabel: false
          },
          axisLine: {
            lineStyle: {
              color: '#979797' // 轴线颜色
            }
          },
          data: [
            '省公安厅',
            '省发展\n改革委',
            '省统计局',
            '省文化厅',
            '省工商局',
            '省教育厅',
            '省农业厅',
            '省安全\n监管局',
            '省信\n息中心',
            '省人力资源\n社会保障厅'
          ]
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false // 网格分割线
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#fff', '#F5F6FA']
            }
          },
          axisLabel: {
            interval: 0, // 显示全部列表项目
            textStyle: {
              fontSize: 14,
              color: '#333333',
              fontWeight: 'Regular'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#979797' // 轴线颜色
            }
          }
        },
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: 21,
            markPoint: {
              symbol: 'pin',
              symbolSize: 40,
              lable: {
                color: '#fff',
                fontSize: 1,
                fontWeight: 'Regular'
              },
              data: [
                {
                  type: 'max',
                  name: '最大值'
                }
              ]
            },
            itemStyle: {
              normal: {
                color: new _self.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#0088F5'
                  },
                  {
                    offset: 1,
                    color: '#57B8FF'
                  }
                ])
              }
            },
            data: _self.departStatic
          }
        ]
      };
      myEchart.setOption(option);
      myEchart.resize();
    },
    // 目录用户统计环比图
    drawPies() {
      // 在线数
      let _self = this;
      let echart91 = _self.$echarts.init(document.getElementById('yhtj91'));
      let option91 = {
        title: {
          text: _self.colUserData[0].onlineNum / 1000 + 'K',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#0580f2',
            fontSize: '24'
          }
        },
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['93%', '100%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: _self.colUserData[0].onlineNum,
                name: '01',
                itemStyle: {
                  normal: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#0088F5'
                        },
                        {
                          offset: 1,
                          color: '#57B8FF'
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                value:
                  _self.colUserData[0].total - _self.colUserData[0].onlineNum,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#EAEAEA'
                        },
                        {
                          offset: 1,
                          color: '#EAEAEA'
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      echart91.setOption(option91);
      // 新用户
      let echart92 = _self.$echarts.init(document.getElementById('yhtj92'));
      let option92 = {
        title: {
          text: _self.colUserData[1].onlineNum / 1000 + 'K',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#FFC600',
            fontSize: '24'
          }
        },
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            radius: ['93%', '100%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: _self.colUserData[1].onlineNum,
                name: '01',
                itemStyle: {
                  normal: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#FEC755'
                        },
                        {
                          offset: 1,
                          color: '#FBD37D'
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                value:
                  _self.colUserData[1].total - _self.colUserData[1].onlineNum,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#EAEAEA'
                        },
                        {
                          offset: 1,
                          color: '#EAEAEA'
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      echart92.setOption(option92);

      // 浏览数
      let echart93 = _self.$echarts.init(document.getElementById('yhtj93'));
      let option93 = {
        title: {
          text: _self.colUserData[2].onlineNum / 1000 + 'K',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#06C5C3',
            fontSize: '24'
          }
        },

        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['93%', '100%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: _self.colUserData[2].onlineNum,
                name: '01',
                itemStyle: {
                  normal: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#97E7E6'
                        },
                        {
                          offset: 1,
                          color: '#03C5C3'
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                value:
                  _self.colUserData[2].total - _self.colUserData[2].onlineNum,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#EAEAEA'
                        },
                        {
                          offset: 1,
                          color: '#EAEAEA'
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      echart93.setOption(option93);

      // 总用户
      let echart94 = _self.$echarts.init(document.getElementById('yhtj94'));
      let option94 = {
        title: {
          text: _self.colUserData[3].onlineNum / 1000 + 'K',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#6B70F7',
            fontSize: '24'
          }
        },
        color: ['#EAEAEA'],
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['93%', '100%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: _self.colUserData[3].onlineNum,
                name: '01',
                itemStyle: {
                  normal: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#6B70F7'
                        },
                        {
                          offset: 1,
                          color: '#9CB7FF'
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                value:
                  _self.colUserData[3].total - _self.colUserData[3].onlineNum,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#EAEAEA'
                        },
                        {
                          offset: 1,
                          color: '#EAEAEA'
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      echart94.setOption(option94);
      echart91.resize();
      echart92.resize();
      echart93.resize();
      echart94.resize();
    },
    // 操作记录列表超出文本显示省略号
    subStr() {
      var strArr = document.getElementsByClassName('item-info-text');
      for (var i = 0; i < strArr.length; i++) {
        var str = strArr[i].innerHTML;
        strArr[i].innerHTML = str.slice(0, 13) + '...';
      }
    }
  },
  watch: {
    // echarts图自适应
    menuWidth() {
      this.drawPie();
      this.drawWater();
      this.drawPie2();
      this.drawBar();
      this.drawBar2();
      this.drawLine();
      this.drawBar3();
      this.drawPie3();
      this.drawPies();
      this.subStr();
    }
  }
};
</script>
