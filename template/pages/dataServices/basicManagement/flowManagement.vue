<template>
  <div class="list-apadd">
    <div class="formtable-warp">
      <div class="formtab-warp">
        <div class="tab-lista fn-clear">
          <div class="lefts">
            <input type="text" v-model="taskNameHave" placeholder="请输入流程名称" />
            <span class="serachBtn" @click="handleSearchHave">搜索</span>
            <span v-if="searchFlag === '0'" class="better-ntn1" @click="showSearch1">
              <span>高级搜索</span>
              <i></i>
            </span>
            <span v-else class="better-ntn" @click="showSearch">
              <span>高级搜索</span>
              <i></i>
            </span>
          </div>
          <div class="button_right">
            <Button icon="md-person" type="primary" ghost @click="newFlow">新增</Button>
          </div>
        </div>
        <!--高级搜索弹框-->
        <div id="Advancedsearch">
          <input type="text" v-model="demandName" placeholder="请输入流程编号" maxlength="20" />
          <Button type="primary" @click="handleSearchHave">搜索</Button>
          <Button type="warning" @click="resetForm('taskForm')">重置</Button>
        </div>
        <DataTable
          :tableData="gridData"
          :columnData="columnData"
          :noSelects="true"
          :pages="pages"
          :loading="loading"
          @currentChange="currentChangeHave"
        >
          <el-table-column show-overflow-tooltip label="操作" align="center">
            <template slot-scope="scope">
              <Dropdown
                transfer
                trigger="click"
                @on-click="moreOption(scope.$index,scope.row, $event)"
              >
                <Button>
                  更多操作
                  <Icon type="md-arrow-dropdown" />
                </Button>
                <DropdownMenu slot="list">
                  <template>
                    <DropdownItem v-if="btnList['修改']" name="amend" align="center">修改</DropdownItem>
                    <DropdownItem v-if="btnList['删除']" name="delete" align="center">删除</DropdownItem>
                  </template>
                </DropdownMenu>
              </Dropdown>
            </template>
          </el-table-column>
        </DataTable>
        <el-dialog
          title="新增工作流程分类"
          :visible.sync="dialogFormVisible"
          :close-on-click-modal="false"
          width="45%"
        >
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="流程名称" prop="name">
              <el-input v-model="ruleForm.name" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="流程编码" prop="key">
              <el-input v-model="ruleForm.key" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="上级分类" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="productDescription">
              <el-input type="textarea" v-model="ruleForm.productDescription" maxlength="120"></el-input>
            </el-form-item>
          </el-form>
          <div class="operation">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button type="primary" @click="goback()">返回</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisibleissue" :close-on-click-modal="false" width="30%">
          <span>确认删除流程?</span>    
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleissue = false">取 消</el-button>
            <el-button type="primary" @click="issue">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getFlowImg, getFlowInfoList } from "@/api/dataServices/index";
export default {
  data() {
    return {
      loading: true,
      activeName: "first",
      taskNameHave: "",
      demandName: "",
      gridData: [],
      gridDataHave: [],
      projectDetail: {},
      columnData: [
        {
          dataKey: "name",
          name: "流程名称",
        },
        {
          dataKey: "key",
          name: "流程编号",
        },
        {
          dataKey: "productDescription",
          name: "产品描述",
        },
      ],
      pages: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
      searchFlag: "0",
      btnList: {},
      dialogFormVisible: false,
      dialogVisibleissue: false,
      flowImgView: "",
      ruleForm: {
        name: "",
        key: "",
        region: "",
        productDescription: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入流程名称", trigger: "blur" },
        ],
        key: [
          { required: true, message: "请输入流程编码", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        productDescription: [
          { required: true, message: "请填写活动形式", trigger: "blur" },
        ],
      },
      issues: {},
    };
  },
  created() {
    this.getBtnList();
    this.getproductReleaseList();
  },
  methods: {
    //按钮权限
    async getBtnList() {
      this.btnList = await this.$util.getAuthBtn();
    },
    //更多操作按钮
    moreOption(index, row, event) {
      if (event == "amend") {
        //修改
        (this.ruleForm = {
          name: "11",
          key: "222",
          region: "333",
          productDescription: "444",
        }),
          (this.dialogFormVisible = true);
        // this.issues = row;
      } else if (event == "delete") {
        //删除
        this.dialogVisibleissue = true;
        this.issues = row;
        // this.getDetail(row.id, 1);
      }
    },
    newFlow() {
      this.dialogFormVisible = true;
    },
    // 列表接口 productStatus=5为待办6为已办
    getproductReleaseList() {
      let params = {
        offset: this.pages.pageSize * (this.pages.currentPage - 1),
        limit: this.pages.pageSize,
        // type_id_$VEQ: 20000008980004,
        // type_id_$VEQ: '4,5',
        typeId: "4,5",
      };
      new Promise((resolve, reject) => {
        getFlowInfoList(params)
          .then((res) => {
            this.gridData = res.data.rows;
            this.gridData.forEach((item) => {
              if (item.status == "deploy") {
                item.status = "发布";
              } else if (item.status == "draft") {
                item.status = "草稿";
              } else if (item.status == "forbidden") {
                item.status = "禁用";
              }
            });
            this.pages.total = res.data.total;
            this.pages.currentPage = params.offset / res.data.pageSize + 1;
            this.pages.pageSize = res.data.pageSize;
            this.loading = false;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //分页
    currentChangeHave(e) {
      console.log("e", e);
      this.pages.currentPage = e;
      this.getproductReleaseList();
    },
    //搜索
    handleSearchHave() {
      this.getproductReleaseList();
    },
    // 高级搜索弹出框
    showSearch() {
      $("#Advancedsearch").slideToggle(500);
      this.searchFlag = "0";
    },
    showSearch1() {
      $("#Advancedsearch").slideToggle(500);
      this.searchFlag = "1";
    },
    // 重置高级搜索
    resetForm(name) {
      //   this.$refs[name].resetFields();
      this.taskName = "";
      this.demandName = "";
      this.handleSearch();
    },
    //查看详情
    getDetail(id) {
      new Promise((resolve, reject) => {
        //获取查看流程图
        new Promise((resolve, reject) => {
          getFlowImg({ defId: id })
            .then((res) => {
              this.flowImgView = res.request.responseURL;
              this.dialogFormVisible = true;
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        });
        resolve();
      }).catch((err) => {
        reject(err);
      });
    },
    goback() {
      this.dialogFormVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    issue() {
      this.dialogVisibleissue = false;
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-dialog__headerbtn {
  position: absolute;
  top: 0px !important;
  right: 5px !important;
}
.fn-clear {
  //   display: flex;
  //   justify-content: space-between;
  .lefts {
    float: left;
    font-size: 14px;
    margin-bottom: 1%;
    input,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    input {
      height: 30px;
      line-height: 30px;
      text-indent: 20px;
      width: 120px;
      outline: none;
      border-radius: 4px 0 0 4px;
      background: url(../../../../static/img/search-bg.png) no-repeat 4px 40%;
      border: 1px solid rgba(223, 230, 235, 1);
      border-right: none;
      transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out, width 0.4s ease-in-out;
    }
    input:hover {
      border-color: #57a3f3;
      width: 160px;
    }

    input:focus {
      border-color: #57a3f3;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
    }

    .serachBtn {
      z-index: 100;
      margin-left: -4px;
      height: 30px;
      line-height: 32px;
      width: 64px;
      text-align: center;
      background: rgba(0, 123, 236, 1);
      border-radius: 0px 4px 4px 0px;
      color: #fff;
      cursor: pointer;
    }
  }
  .button_right {
    float: right;
  }
}
#Advancedsearch {
  padding: 15px 0;
  margin: 15px 0;
  border: 1px dashed gainsboro;
  display: none;
  input {
    height: 30px;
    line-height: 30px;
    text-indent: 20px;
    outline: none;
    border-radius: 4px 0 0 4px;
    background: url(../../../../static/img/search-bg.png) no-repeat 4px 40%;
    border: 1px solid rgba(223, 230, 235, 1);
    // border-right: none;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out, width 0.4s ease-in-out;
  }
}
.better-ntn {
  cursor: pointer;
  z-index: 777;
  span,
  i {
    display: inline-block;
    vertical-align: middle;
  }

  span {
    font-size: 14px;
    color: rgba(0, 123, 236, 1);
    margin: 0 8px 0 12px;
  }

  i {
    width: 12px;
    height: 12px;
    background: url(../../../../static/img/hov-icon.png) no-repeat;
    background-size: 46%;
  }
}
.better-ntn1 {
  cursor: pointer;
  z-index: 777;
  span,
  i {
    display: inline-block;
    vertical-align: middle;
  }
  span {
    font-size: 14px;
    color: rgba(0, 123, 236, 1);
    margin: 0 8px 0 12px;
  }

  i {
    width: 12px;
    height: 8px;
    background: url(../../../../static/img/hov-icon1.png) no-repeat;
  }
}
.operation {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>