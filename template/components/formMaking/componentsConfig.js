export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',

    icon: 'icon-input',
    fileLength: '',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      disabled: false,
      visible: 0,
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: '',
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

    }
  },
  {
    type: 'number',
    name: '计数器',
    icon: 'icon-number',
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: '',
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

    }
  },
  {
    type: 'radio',
    name: '单选框组',
    icon: 'icon-radio-active',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        },
        {
          value: '选项3',
          label: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
    }
  },
  {
    type: 'checkbox',
    name: '多选框组',
    icon: 'icon-check-box',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: '选项1'
        },
        {
          value: '选项2'
        },
        {
          value: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
    }
  },
  {
    type: 'time',
    name: '时间选择器',
    icon: 'icon-time',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '',
    }
  },
  {
    type: 'date',
    name: '日期选择器',
    icon: 'icon-date',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '',
    }
  },
  {
    type: 'rate',
    name: '评分',
    icon: 'icon-pingfen1',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    }
  },
  {
    type: 'color',
    name: '颜色选择器',
    icon: 'icon-color',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false
    }
  },
  {
    type: 'select',
    name: '下拉选择框',
    icon: 'icon-select',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      width: '',
      options: [
        {
          value: '下拉框1'
        },
        {
          value: '下拉框2'
        }, {
          value: '下拉框3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'switch',
    name: '开关',
    icon: 'icon-switch',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: false,
      required: false,
      disabled: false,
    }
  },
  {
    type: 'slider',
    name: '滑块',
    icon: 'icon-slider',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ''
    }
  },
  {
    type: 'text',
    name: '文字',
    icon: 'icon-wenzishezhi-',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: '这是一段文本',
      customClass: '',
    }
  },
  {
    type: 'title',
    name: '标题',
    icon: 'el-icon-document',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: '这是标题',
    }
  },
  {
    type: 'divider',
    name: '分割线',
    icon: 'el-icon-minus',
    options: {
      defaultValue: '',
    }
  }
]

export const advanceComponents = [
  {
    type: 'blank',
    name: '自定义',
    icon: 'icon-zidingyishuju',
    options: {
      defaultType: 'String'
    }
  },
  {
    type: 'imgupload',
    name: '图片',
    icon: 'icon-tupian',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      domain: 'http://pfp81ptt6.bkt.clouddn.com/',
      disabled: false,
      length: 8,
      multiple: false,
      isQiniu: false,
      isDelete: false,
      min: 0,
      isEdit: false,
      action: 'https://jsonplaceholder.typicode.com/photos/'
    }
  },
  {
    type: 'editor',
    name: '编辑器',
    icon: 'icon-fuwenbenkuang',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: '',
      width: ''
    }
  },
  {
    type: 'cascader',
    name: '级联选择器',
    icon: 'icon-jilianxuanze',
    options: {
      indexId: null,
      searchIndex: false,//是否检索字段
      indexRelation: null,//指标检索条件
      alias: '',

      defaultValue: [],
      width: '',
      placeholder: '',
      required: false,
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    name: '栅格布局',
    icon: 'icon-grid-',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  },
  {
    type: 'table',
    name: '表格布局',
    icon: 'icon-input',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      },
    ],
    tableData: [{ id: 1 }],
    options: { // 组件配置信息，根据自定义组件自己添加配置
      defaultValue: [], // 该值表示组件的默认值
    }
  }
]
