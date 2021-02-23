<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <el-aside width="200px" class="box-pannle">
          <div class="panel-heading"><i class="el-icon-menu"></i> 控件面板</div>
          <div class="components-list">
            <template v-if="basicFields.length">
              <div class="widget-cate" @click="handleChangePannle">
                <i class="el-icon-menu"></i>基础字段
              </div>
              <draggable
                tag="ul"
                :list="basicComponents"
                v-bind="{
                  group: { name: 'people', pull: 'clone', put: false },
                  sort: false,
                  ghostClass: 'ghost',
                }"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                <li
                  v-if="basicFields.indexOf(item.type) >= 0"
                  class="form-edit-widget-label"
                  :class="{ 'no-put': item.type == 'divider' }"
                  v-for="(item, index) in basicComponents"
                  :key="index"
                >
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </draggable>
            </template>

            <template v-if="advanceFields.length">
              <div class="widget-cate" @click="handleChangePannle">
                <i class="el-icon-menu"></i>高级字段
              </div>
              <draggable
                tag="ul"
                :list="advanceComponents"
                v-bind="{
                  group: { name: 'people', pull: 'clone', put: false },
                  sort: false,
                  ghostClass: 'ghost',
                }"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                <li
                  v-if="advanceFields.indexOf(item.type) >= 0"
                  class="form-edit-widget-label"
                  :class="{ 'no-put': item.type == 'table' }"
                  v-for="(item, index) in advanceComponents"
                  :key="index"
                >
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </draggable>
            </template>

            <template v-if="layoutFields.length">
              <div class="widget-cate" @click="handleChangePannle">
                <i class="el-icon-menu"></i>布局字段
              </div>
              <draggable
                tag="ul"
                :list="layoutComponents"
                v-bind="{
                  group: { name: 'people', pull: 'clone', put: false },
                  sort: false,
                  ghostClass: 'ghost',
                }"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove"
              >
                <li
                  v-if="layoutFields.indexOf(item.type) >= 0"
                  class="form-edit-widget-label no-put"
                  v-for="(item, index) in layoutComponents"
                  :key="index"
                >
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </draggable>
            </template>
          </div>
        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 48px">
            <span class="title">
              <i class="el-icon-edit-outline"></i> 表单设计区域
            </span>
            <slot name="action"></slot>
            <el-button
              v-if="upload"
              type="text"
              class="btn btn-default"
              size="medium"
              icon="el-icon-upload2"
              @click="handleUpload"
              >导入JSON</el-button
            >
            <el-button
              v-if="clearable"
              type="text"
              class="btn btn-default"
              size="medium"
              icon="el-icon-delete"
              @click="handleClear"
              >清空</el-button
            >
            <el-button
              v-if="preview"
              type="text"
              class="btn btn-default"
              size="medium"
              icon="el-icon-view"
              @click="handlePreview"
              >预览</el-button
            >
            <el-button
              v-if="generateJson"
              type="text"
              class="btn btn-default"
              size="medium"
              icon="el-icon-tickets"
              @click="handleGenerateJson"
              >生成JSON</el-button
            >
            <el-button
              v-if="generateCode"
              type="text"
              class="btn btn-default"
              size="medium"
              icon="el-icon-document"
              @click="handleGenerateCode"
              >生成代码</el-button
            >
          </el-header>
          <el-main
            :class="{ 'widget-empty': widgetForm.list.length == 0 }"
            class="box-pannle"
          >
            <widget-form
              v-if="!resetJson"
              ref="widgetForm"
              :data="widgetForm"
              :select.sync="widgetFormSelect"
            ></widget-form>
          </el-main>
        </el-container>

        <el-aside class="widget-config-container" width="280px">
          <div class="panel-heading">
            <i class="el-icon-setting"></i> 属性面板
          </div>
          <el-container>
            <el-header height="45px">
              <div
                style="width: 118px"
                class="config-tab"
                :class="{ active: configTab == 'widget' }"
                @click="handleConfigSelect('widget')"
              >
                字段属性
              </div>
              <div
                style="width: 118px"
                class="config-tab"
                :class="{ active: configTab == 'form' }"
                @click="handleConfigSelect('form')"
              >
                表单属性
              </div>
            </el-header>
            <el-main class="config-content box-pannle">
              <widget-config
                v-show="configTab == 'widget'"
                :data="widgetFormSelect"
                :selectValues="selectValues"
              ></widget-config>
              <form-config
                v-show="configTab == 'form'"
                :data="widgetForm.config"
              ></form-config>
            </el-main>
          </el-container>
        </el-aside>

        <cus-dialog
          :visible="previewVisible"
          @on-close="previewVisible = false"
          ref="widgetPreview"
          width="1000px"
          form
        >
          <generate-form
            insite="true"
            @on-change="handleDataChange"
            v-if="previewVisible"
            :data="widgetForm"
            :value="widgetModels"
            :remote="remoteFuncs"
            ref="generateForm"
          >
            <template v-slot:blank="scope">
              宽度：
              <el-input
                v-model="scope.model.blank.width"
                style="width: 100px"
              ></el-input
              >高度：
              <el-input
                v-model="scope.model.blank.height"
                style="width: 100px"
              ></el-input>
            </template>
          </generate-form>

          <template slot="action">
            <el-button type="primary" @click="handleTest">获取数据</el-button>
            <el-button @click="handleReset">重置</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="uploadVisible"
          @on-close="uploadVisible = false"
          @on-submit="handleUploadJson"
          ref="uploadJson"
          width="800px"
          form
        >
          <el-alert
            type="info"
            title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"
          ></el-alert>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="editContent"
          ></el-input>
          <!-- <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div> -->
        </cus-dialog>

        <cus-dialog
          :visible="jsonVisible"
          @on-close="jsonVisible = false"
          ref="jsonPreview"
          width="800px"
          form
        >
          <div id="jsoneditor" style="height: 400px; width: 100%">
            {{ jsonTemplate }}
          </div>

          <template slot="action">
            <el-button
              type="primary"
              class="json-btn"
              :data-clipboard-text="jsonCopyValue"
              >复制数据</el-button
            >
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="codeVisible"
          @on-close="codeVisible = false"
          ref="codePreview"
          width="800px"
          form
          :action="false"
        >
          <div id="codeeditor" style="height: 500px; width: 100%">
            {{ htmlTemplate }}
          </div>
        </cus-dialog>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import Clipboard from 'clipboard'
import { basicComponents, layoutComponents, advanceComponents } from './componentsConfig.js'
import { loadJs, loadCss } from './util/index.js'
import request from './util/request.js'
import generateCode from './generateCode.js'

export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    basicFields: {
      type: Array,
      default: () => ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider', 'text', 'divider', 'title']
    },
    advanceFields: {
      type: Array,
      default: () => ['blank', 'imgupload', 'editor', 'cascader']
    },
    layoutFields: {
      type: Array,
      default: () => ['grid']
    }
  },
  data () {
    return {
      editContent: '',
      basicComponents,
      layoutComponents,
      advanceComponents,
      resetJson: false,
      isPannle: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        },
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      remoteFuncs: {
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              { id: '1', name: '1111' },
              { id: '2', name: '2222' },
              { id: '3', name: '3333' }
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken (resolve) {
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback (response, file, fileList) {
          // console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {},
      selectValues: [],
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [
    {
      "type": "input",
      "name": "单行文本",
      "icon": "icon-input",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908864000_94322"
      },
      "key": "1540908864000_94322",
      "model": "input_1540908864000_94322",
      "rules": [
        {
          "type": "string",
          "message": "单行文本格式不正确"
        }
      ]
    },
    {
      "type": "textarea",
      "name": "多行文本",
      "icon": "icon-diy-com-textarea",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908876000_19435"
      },
      "key": "1540908876000_19435",
      "model": "textarea_1540908876000_19435",
      "rules": []
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`
    }
  },
  mounted () {

  },
  methods: {
    handleGoGithub () {
      window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
    },
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      // console.log('end', evt)
    },
    handleMoveStart ({ oldIndex }) {
      // console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    handlePreview () {
      // console.log(this.widgetForm)
      this.previewVisible = true
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e => { })
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleReset () {
      this.$refs.generateForm.reset()
    },
    handleGenerateJson () {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      // console.log(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {

        const editor = ace.edit('jsoneditor')
        editor.session.setMode("ace/mode/json")

        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success('复制成功')
          })
        }
        this.jsonCopyValue = JSON.stringify(this.widgetForm)
      })
    },
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode("ace/mode/html")
      })
    },
    handleUpload () {
      this.uploadVisible = true
      // this.$nextTick(() => {
      //   this.uploadEditor = ace.edit('uploadeditor')
      //   this.uploadEditor.session.setMode("ace/mode/json")
      // })
    },
    handleUploadJson () {
      try {
        // this.setJSON(JSON.parse(this.uploadEditor.getValue()))
        this.setJSON(JSON.parse(this.editContent))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    handleClear () {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          customClass: ''
        },
      }

      this.widgetFormSelect = {}
    },
    handleChangePannle (ev) {
      console.log(ev.target.nextSibling.style.display)
      const dis = ev.target.nextSibling.style.display
      if (dis === 'none') {
        ev.target.nextSibling.style.display = 'block'
      } else {
        ev.target.nextSibling.style.display = 'none'
      }
    },
    getJSON () {
      return this.widgetForm
    },
    getHtml () {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON (json) {
      this.widgetForm = json
      if (json.list.length > 0) {
        this.widgetFormSelect = json.list[0]
      }
    },

    //自定义方法用于展示后端请求的表字段
    setInputSelectKey (e) {
      this.selectValues = e
    },

    handleInput (val) {
      // console.log(val)
      this.blank = val
    },
    handleDataChange (field, value, data) {
      // console.log(field, value, data)
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        console.log('@^%$@%&!*', val)
        const { list = [] } = val
        if (this.selectValues.length > 0) {
          this.selectValues.map(item => {
            const res = list.filter((litem, index) => {
              litem.index = index
              return litem.model && (item.key === litem.model)
            })
            if (res.length > 0) {
              val.list[res[0].index].name = item.value
              item.disabled = true
            } else {
              item.disabled = false
            }
          })
        }
        // console.log(this.$refs.widgetForm)
      }
    }
  }
}
</script>

<style lang="scss">
.widget-empty {
  background-position: 50%;
}
.widget-config-container {
  overflow: hidden;
}
.box-pannle::-webkit-scrollbar {
  width: 3px;
}
.box-pannle::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.box-pannle::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px transparent;
  border-radius: 0;
  background: transparent;
}
/deep/ .el-dialog__headerbtn  {
  position: absolute;
  top: 0px !important;
  right: 5px !important;
}
.el-dialog__headerbtn {
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
.el-dialog__header span::after {
  display: none;
}
</style>
