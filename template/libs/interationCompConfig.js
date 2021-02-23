const compArray = [
  {
    'firstComp': '输入',
    'compType': 'input',
    'childComp': [
      {
        'text': '表输入',
        'type': 'TBinput'
      },
      {
        'text': 'EXCEL输入',
        'type': 'EXCELinput'
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
      }
      // {
      //   'text': '文件输出',
      //   'type': 'outputFile'
      // }
    ]
  },
  {
    'firstComp': '脱敏',
    'compType': 'desensitization',
    'childComp': [
      {
        'text': '固定值替换',
        'type': 'replace'
      },
      {
        'text': '前后缀增补',
        'type': 'supplemental'
      },
      {
        'text': '数据模糊化',
        'type': 'fuzzy'
      },
      {
        'text': '数据裁切',
        'type': 'substring'
      },
      {
        'text': '数据截取',
        'type': 'tailoring'
      },
      {
        'text': '常量组件',
        'type': 'constantComponent'
      },
      {
        'text': '变量组件',
        'type': 'varComponent'
      }
    ]
  },
  {
    'firstComp': '加密解密',
    'compType': 'codeOption',
    'childComp': [
      {
        'text': '加密',
        'type': 'encode'
      },
      {
        'text': '解密',
        'type': 'decode'
      },
      {
        'text': '空值处理',
        'type': 'nullCheck'
      }
    ]
  },
  {
    'firstComp': '脚本',
    'compType': 'script',
    'childComp': [
      {
        'text': 'SQL脚本',
        'type': 'sql'
      },
      {
        'text': '正则表达式',
        'type': 'regEx'
      },
      {
        'text': 'JavaScript',
        'type': 'javaScript'
      },
      {
        'text': '存储过程',
        'type': 'storedProcedure'
      }
      ,
      {
        'text': 'Shell脚本',
        'type': 'shellEdit'
      }
    ]
  },
  {
    'firstComp': '转换',
    'compType': 'transform',
    'childComp': [
      {
        'text': '大小写转换',
        'type': 'capitalization'
      },
      {
        'text': '时间转换',
        'type': 'timeChange'
      }, 
       {
        'text': '行转列',
        'type': 'ranksChange'
      }, {
        'text': '列转行',
        'type': 'columnChange'
      }, {
        'text': '值域转换 ',
        'type': 'rangeChange'
      }
    ]
  },
  {
    'firstComp': '通用',
    'compType': 'common',
    'childComp': [
      {
        'text': '空值校验',
        'type': 'nullValueChecking'
      },
      {
        'text': '身份证号码',
        'type': 'identityCard'
      },
      {
        'text': '去重',
        'type': 'duplicateRemoval'
      },
      {
        'text': '过滤',
        'type': 'filterData'
      },
      {
        'text': '数据一致性',
        'type': 'dataCompare'
      },
      {
        'text': '合并',
        'type': 'merge'
      },
      {
        'text': 'switch-case',
        'type': 'switchCase'
      },
      {
        'text': '排序组件',
        'type': 'orderCompare'
      },
      {
        'text': '分组聚合',
        'type': 'groupAggregation'
      },
      {
        'text': '生成uuid',
        'type': 'thirtyEightUUID'
      }
    ]
  }
]
export default compArray
