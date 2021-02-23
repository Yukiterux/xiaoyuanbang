const compArray = [
  {
    'firstComp': '输入',
    'compType': 'input',
    'childComp': [
      {
        'text': '输入源',
        'type': 'TBinput'
      }
    ]
  },
  {
    'firstComp': '输出',
    'compType': 'output',
    'childComp': [
      {
        'text': '表输出',
        'type': 'TBoutput'
      },
      {
        'text': '文件输出',
        'type': 'Foutput'
      }
    ]
  },
  // {
  //   'firstComp': '脚本',
  //   'compType': 'dataScript',
  //   'childComp': [
  //     // {
  //     //   'text': 'SQL脚本',
  //     //   'type': 'sqlEdit'
  //     // },
  //     // {
  //     //   'text': 'Python脚本',
  //     //   'type': 'python'
  //     // }
  //   ]
  // },
  {
    'firstComp': '数据预处理',
    'compType': 'pretreatment',
    'childComp': [
      {
        'text': '特征构造',
        'type': 'feature'
      },
      {
        'text': '表堆叠',
        'type': 'TStacking'
      },
      {
        'text': '记录选择',
        'type': 'recordOption'
      },
      {
        'text': '表连接',
        'type': 'TConnect'
      },
      {
        'text': '新增序列',
        'type': 'addSequences'
      },
      // {
      //   'text': '数据集划分',
      //   'type': 'dataPartition'
      // },
      {
        'text': '类型转换',
        'type': 'typeConversion'
      },
      {
        'text': '缺失值处理',
        'type': 'missingValue'
      },
      {
        'text': '记录去重',
        'type': 'recordReduplication'
      },
      {
        'text': '异常值处理',
        'type': 'abnormalProcessing'
      },
      {
        'text': '数据标准化',
        'type': 'dataStandard'
      },
      {
        'text': '数学类函数',
        'type': 'mathFunction'
      },
      {
        'text': '排序',
        'type': 'dataSort'
      },
      {
        'text': '分组聚合',
        'type': 'groupAggregation'
      },
      {
        'text': '修改列名',
        'type': 'renameColumn'
      }
    ]
  },
  {
    'firstComp': '统计分析',
    'compType': 'statisticalAnalysis',
    'childComp': [
      // {
      //   'text': '数据探索',
      //   'type': 'dataExploration'
      // },
      {
        'text': '纯随机性检验',
        'type': 'randomTest'
      },
      {
        'text': '相关性分析',
        'type': 'correlationAnalysis'
      },
      {
        'text': '单样本T检验',
        'type': 'TtestSingle'
      },
      {
        'text': '正态性检验',
        'type': 'normalityTest'
      },
      {
        'text': '双样本T检验',
        'type': 'TtestDouble'
      },
      {
        'text': '主成分分析',
        'type': 'principalComponent'
      },
      {
        'text': '频数统计',
        'type': 'frequencyStatistic'
      },
      {
        'text': '全表统计',
        'type': 'fullTableStatistics'
      },
      {
        'text': '平稳性检验',
        'type': 'stationarityTest'
      },
      {
        'text': '因子分析',
        'type': 'factorAnalysis'
      },
      {
        'text': '卡方检验',
        'type': 'squareTest'
      }
    ]
  },
  {
    'firstComp': '分类',
    'compType': 'classification',
    'childComp': [
      {
        'text': 'CART分类树',
        'type': 'CARTTree'
      },
      {
        'text': 'ID3分类树',
        'type': 'ID3Tree'
      },
      {
        'text': '最近邻分类树',
        'type': 'neighborTree'
      },
      {
        'text': '朴素贝叶斯',
        'type': 'naiveBayes'
      },
      {
        'text': '逻辑回归',
        'type': 'logisticRegression'
      },
      {
        'text': '支持向量机',
        'type': 'supportVector'
      },
      {
        'text': '多层感知神经网络',
        'type': 'multilayerPerception'
      }
    ]
  },
  {
    'firstComp': '回归',
    'compType': 'regression',
    'childComp': [
      {
        'text': 'CART回归树',
        'type': 'CARTRegressionTree'
      },
      {
        'text': 'LASSO回归树',
        'type': 'LASSORegressionTree'
      },
      {
        'text': '线性回归',
        'type': 'linearRegression'
      },
      {
        'text': '支持向量回归',
        'type': 'VectorRegression'
      },
      {
        'text': '最近邻回归',
        'type': 'NeighborRegression'
      }
    ]
  },
  {
    'firstComp': '聚类',
    'compType': 'clustering',
    'childComp': [
      {
        'text': 'DBSCAN密度聚类',
        'type': 'DBSCANDensity'
      },
      {
        'text': 'KMeans',
        'type': 'KMeans'
      },
      {
        'text': '层次聚类',
        'type': 'hierarchicalClustering'
      }
    ]
  },
  {
    'firstComp': '时序模型',
    'compType': 'timingModel',
    'childComp': [
      {
        'text': 'GM(1,1)',
        'type': 'GMModel'
      },
      {
        'text': '差分',
        'type': 'Difference'
      },
      {
        'text': 'ARIMA',
        'type': 'ARIMA'
      }
    ]
  }
  // {
  //   'firstComp': '模型评估',
  //   'compType': 'modelAssessmentClass',
  //   'childComp': [
  //     {
  //       'text': '模型评估',
  //       'type': 'modelAssessment'
  //     }
  //   ]
  // },
  // {
  //   'firstComp': '模型预测',
  //   'compType': 'modelPredictionClass',
  //   'childComp': [
  //     {
  //       'text': '模型预测',
  //       'type': 'modelPrediction'
  //     }
  //   ]
  // }
]
export default compArray
