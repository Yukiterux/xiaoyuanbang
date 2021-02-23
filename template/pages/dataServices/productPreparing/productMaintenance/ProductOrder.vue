<template>
  <div class="list-apadd">
    <div class="formtable-warp">
      <div class="formtab-warp">
        <div class="tab-lista fn-clear">
          <div class="lefts">
            <input type="text" v-model="taskName" placeholder="请输入产品名称" maxlength="20" />
            <span class="serachBtn" @click="handleSearch">搜索</span>
            <span v-if="searchFlag === '0'" class="better-ntn1" @click="showSearch1">
              <span>高级搜索</span>
              <i></i>
            </span>
            <span v-else class="better-ntn" @click="showSearch">
              <span>高级搜索</span>
              <i></i>
            </span>
          </div>
        </div>
        <!--高级搜索弹框-->
        <div id="Advancedsearch">
          <input type="text" v-model="demandName" placeholder="请输入产品描述" maxlength="20" />
          <Button type="primary" @click="handleSearch">搜索</Button>
          <Button type="warning" @click="resetForm('taskForm')">重置</Button>
        </div>
        <div>
          <DataTable
            :tableData="gridData"
            :columnData="columnData"
            :noSelects="true"
            :pages="pages"
            :loading="loading"
            @currentChange="currentChange"
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
                      <DropdownItem v-if="btnList['查看']" name="examine" align="center">查看</DropdownItem>
                      <DropdownItem
                        v-if="btnList['产品维护'] && (scope.row.productStatus == '研发完成' || scope.row.productStatus == '待研发' || scope.row.productStatus == '研发中' || scope.row.productStatus == '验收未通过')"
                        name="maintain"
                        align="center"
                      >产品维护</DropdownItem>
                      <DropdownItem
                        v-if="btnList['发起验收'] && scope.row.productStatus == '研发完成'"
                        name="check"
                        align="center"
                      >发起验收</DropdownItem>
                    </template>
                  </DropdownMenu>
                </Dropdown>
              </template>
            </el-table-column>
          </DataTable>
        </div>
        <div>
          <el-dialog
            title="产品查看"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            width="50%"
          >
            <Check :disabled="true" :form="projectDetail" :flowImgView="flowImgView">
              <div class="operation">
                <el-button @click="goback(1)">返回</el-button>
              </div>
            </Check>
          </el-dialog>
          <el-dialog
            title="产品维护管理"
            :visible.sync="dialogMaintainVisible"
            :close-on-click-modal="false"
            width="50%"
            @close="closeDialog"
          >
            <Check
              :disabled="disabled"
              :form="projectDetail"
              :active="active"
              :typefile="typefile"
              @value="flowList"
            >
              <div slot="header" class="slotHeader">
                <el-steps :active="active" align-center v-if="!disabled">
                  <el-step title="产品基本信息"></el-step>
                  <el-step title="选择业务流程"></el-step>
                  <el-step title="设置流程时限"></el-step>
                  <el-step title="任务分配下发"></el-step>
                </el-steps>
                <el-divider></el-divider>
              </div>
              <div class="operation">
                <el-button type="primary" @click="last" v-if="this.active !== 0">上一步</el-button>
                <el-button type="primary" @click="goback(2)" v-if="this.active == 0">取消</el-button>
                <el-button type="primary" v-if="this.active !== 3" @click="next">下一步</el-button>
                <el-button type="primary" v-if="this.active == 3" @click="launch(1)">启动任务</el-button>
              </div>
            </Check>
          </el-dialog>
          <el-dialog
            title="产品维护管理"
            :visible.sync="dialogMaintainVisibleTwo"
            :close-on-click-modal="false"
            width="50%"
          >
            <Check
              :disabled="disabled"
              :form="projectDetail"
              :typefile="typefile"
              :checkActive="checkActive"
              @value="flowList"
            >
              <div class="operation">
                <el-button type="primary" @click="goback(3)">取消</el-button>
                <el-button type="primary" @click="launch(2)">修改</el-button>
              </div>
            </Check>
          </el-dialog>
          <el-dialog :visible.sync="dialogVisibleAccept" :close-on-click-modal="false" width="30%">
            <span>确认发起验收?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleAccept = false">取 消</el-button>
              <el-button type="primary" @click="passAcceptance">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDataWorkList,
  getproductDetail,
  getFlow,
  Acceptance,
  launchAcceptance,
  getFlowImg,
} from "@/api/dataServices/index";
import Check from "../checkProduct.vue";
export default {
  data() {
    return {
      loading: true,
      taskName: "", //产品名称
      demandName: "", //需求名称
      gridData: [],
      projectDetail: {},
      typefile: "0",
      columnData: [
        {
          dataKey: "productName",
          name: "产品名称",
        },
        {
          dataKey: "productCode",
          name: "产品编号",
        },
        {
          dataKey: "productTypeName",
          name: "产品分类",
        },
        {
          dataKey: "productDescription",
          name: "产品描述",
        },
        {
          dataKey: "plannedEndTime",
          name: "计划交付",
        },
        {
          dataKey: "warnStatus",
          name: "预警状态",
        },
        {
          dataKey: "productStatus",
          name: "产品状态",
        },
      ],
      pages: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
      searchFlag: "0",
      btnList: {},
      dialogFormVisible: false, //查看弹框
      dialogMaintainVisible: false, //产品维护(工作流)
      dialogMaintainVisibleTwo: false, //产品维护
      maintainBtn: false, //维护按钮
      dialogVisibleAccept: false, //发起验收
      active: 0, //步骤
      disabled: false,
      accept: {},
      orderConfigRequests: [],
      flagTime: false,
      flowImgView: "",
      checkActive: "",
    };
  },
  components: {
    Check,
  },
  created() {
    this.getBtnList();
    this.getDataWorkList();
  },
  methods: {
    //按钮权限
    async getBtnList() {
      this.btnList = await this.$util.getAuthBtn();
    },
    //更多操作按钮
    moreOption(index, row, event) {
      if (event == "examine") {
        this.getDetail(row.id, 1);
      } else if (event == "maintain") {
        // console.log("维护", index, row, event);
        this.getDetail(row.id, 2, row.productStatus);
      } else if (event == "check") {
        // this.passAcceptance(row)
        this.dialogVisibleAccept = true;
        this.accept = row;
      }
    },
    //分页
    currentChange(e) {
      this.pages.currentPage = e;
      this.getDataWorkList();
    },
    // 搜索
    handleSearch() {
      this.getDataWorkList();
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
    //列表请求
    getDataWorkList() {
      let params = {
        productDescription: this.demandName,
        productName: this.taskName,
        queryConditionBean: {
          pageNum: this.pages.currentPage,
          pageSize: this.pages.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        getDataWorkList(params)
          .then((res) => {
            this.gridData = res.data.resultData.list;
            this.pages.total = res.data.resultData.totalCount;
            this.pages.currentPage = res.data.resultData.pageNum;
            this.pages.pageSize = res.data.resultData.pageSize;
            this.loading = false;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //详情请求
    getDetail(id, num, status) {
      const params = {
        id: id,
      };
      new Promise((resolve, reject) => {
        getproductDetail(params)
          .then((res) => {
            // console.log('查看产品详情',res.data.resultData.orderDetail)
            this.projectDetail = res.data.resultData.orderDetail;
            this.projectDetail.productTypeName = this.projectDetail.productTypeName.split(
              ","
            );
            if (num == 1) {
              //获取查看流程图
              if (this.projectDetail.processInstanceId) {
                new Promise((resolve, reject) => {
                  getFlowImg({ instId: this.projectDetail.processInstanceId })
                    .then((res) => {
                      if (res.status == 200) {
                        this.flowImgView = res.request.responseURL;
                      } else {
                        this.$message.error(res.data.resultMsg);
                      }
                      //   this.dialogFormVisible = true;
                      resolve();
                    })
                    .catch((err) => {
                      //   this.dialogFormVisible = true;
                      reject(err);
                    });
                });
              } else {
                this.flowImgView = "";
                // this.dialogFormVisible = true;
              }
              this.dialogFormVisible = true;
            } else if (num == 2) {
              if (status == "待研发") {
                this.getflow();
                this.dialogMaintainVisible = true;
              } else {
                if (status == "验收未通过") {
                  this.checkActive = 5;
                } else {
                  this.checkActive = 0;
                }
                this.dialogMaintainVisibleTwo = true;
              }
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    passAcceptance() {
      const params = { id: this.accept.id };
      Acceptance(params)
        .then((res) => {
          if (res.data.resultCode == 0) {
            this.getDataWorkList();
            this.dialogVisibleAccept = false;
            this.$message({
              message: "发起验收成功",
              type: "success",
            });
          } else {
            this.$message.error(res.data.resultMsg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取流程
    getflow() {
      new Promise((resolve, reject) => {
        getFlow({ type_id_$VEQ: 6 })
          .then((res) => {
            if (res.data.code == 200) {
              this.projectDetail = {
                defId: res.data.rows,
                ...this.projectDetail,
              };
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    goback(num) {
      if (num == 1) {
        this.dialogFormVisible = false;
        this.flowImgView = "";
      } else if (num == 2) {
        this.dialogMaintainVisible = false;
      } else if ((num = 3)) {
        this.dialogMaintainVisibleTwo = false;
      }
      this.active = 0;
    },
    closeDialog() {
      this.active = 0;
      this.flowImgView = "";
    },
    next() {
      this.active = this.active + 1;
      if (this.active > 2) {
        this.active = 3;
      }
    },
    last() {
      if (this.active-- < 0) this.active = 0;
    },
    launch(num) {
      if (
        this.projectDetail.orderConfigRequests !== "" &&
        this.projectDetail.orderConfigRequests !== null
      ) {
        this.orderConfigRequests = this.projectDetail.orderConfigRequests.map(
          (item) => {
            return {
              flowNodeName: item.name,
              plannedEndTime: item.documentation,
            };
          }
        );
      }
      var result = true;
      if (
        this.orderConfigRequests !== "" &&
        this.orderConfigRequests !== null
      ) {
        this.orderConfigRequests.map((item) => {
          if (item.plannedEndTime == "" || item.plannedEndTime == null) {
            result = false;
            return false;
          }
        });
        if (
          this.orderConfigRequests.findIndex(
            (item) => item.plannedEndTime == null
          ) == -1
        ) {
          this.flagTime = false;
        } else {
          this.flagTime = true;
        }
      }

      if (
        this.projectDetail.productName == "" ||
        this.projectDetail.productName == null
      ) {
        this.$message({
          message: "请完善信息，填写产品名称",
          type: "warning",
        });
      } else if (
        this.projectDetail.productType == "" ||
        this.projectDetail.productType == null
      ) {
        this.$message({
          message: "请完善信息，选择产品需求类型",
          type: "warning",
        });
      } else if (
        this.projectDetail.productDescription == "" ||
        this.projectDetail.productDescription == null
      ) {
        this.$message({
          message: "请完善信息，填写产品描述",
          type: "warning",
        });
      } else if (
        this.projectDetail.fileId == "" ||
        this.projectDetail.fileId == null
      ) {
        this.$message({
          message: "请完善信息，上传产品文档",
          type: "warning",
        });
      } else if (
        this.projectDetail.productOwner == "" ||
        this.projectDetail.productOwner == null
      ) {
        this.$message({
          message: "请完善信息，填写联系人",
          type: "warning",
        });
      } else if (
        this.projectDetail.productOwnerPhone == "" ||
        this.projectDetail.productOwnerPhone == null
      ) {
        this.$message({
          message: "请完善信息，填写联系电话",
          type: "warning",
        });
      } else if (
        !/^1[3456789]\d{9}$/.test(this.projectDetail.productOwnerPhone)
      ) {
        this.$message({
          message: "请完善信息，填写正确的电话号码",
          type: "warning",
        });
      } else if (
        (this.flowListss == undefined ||
          this.flowListss.processDefinitionId == "" ||
          this.flowListss.processDefinitionId == null) &&
        num == 1
      ) {
        this.$message({
          message: "请完善信息，选择业务流程",
          type: "warning",
        });
      } else if (
        (this.projectDetail.committedEndTime == "" ||
          this.projectDetail.committedEndTime == null) &&
        num == 1
      ) {
        this.$message({
          message: "请完善信息，选择承诺完成时间",
          type: "warning",
        });
      } else if (!result && num == 1) {
        this.$message({
          message: "请完善信息，选择交付时间",
          type: "warning",
        });
      } else {
        if (num == 1) {
          var params = {
            productName: this.projectDetail.productName,
            productType: this.projectDetail.productType,
            productDescription: this.projectDetail.productDescription,
            fileName: this.projectDetail.fileName,
            fileId: this.projectDetail.fileId,
            productOwner: this.projectDetail.productOwner,
            productOwnerPhone: this.projectDetail.productOwnerPhone,
            processDefinitionId: this.flowListss.processDefinitionId,
            committedEndTime: this.projectDetail.committedEndTime,
            orderConfigRequests: this.orderConfigRequests,
            id: this.projectDetail.id,
            activity: true,
          };
        } else if (num == 2) {
          var params = {
            productName: this.projectDetail.productName,
            productType: this.projectDetail.productType,
            productDescription: this.projectDetail.productDescription,
            fileName: this.projectDetail.fileName,
            fileId: this.projectDetail.fileId,
            productOwner: this.projectDetail.productOwner,
            productOwnerPhone: this.projectDetail.productOwnerPhone,
            id: this.projectDetail.id,
            activity: false,
          };
        }
        launchAcceptance(params)
          .then((res) => {
            if (res.data.resultCode == 0) {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              //   this.getDataWorkList();
              this.active = 0;
            } else {
              this.$message.error(res.data.resultMsg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        this.getDataWorkList();
        this.dialogMaintainVisible = false;
        this.dialogMaintainVisibleTwo = false;
        this.flowListss = "";
      }
    },
    flowList(value2) {
      //   console.log("启动", value2);
      this.flowListss = value2;
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
    background: url(../../../../../static/img/search-bg.png) no-repeat 4px 40%;
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
    background: url(../../../../../static/img/search-bg.png) no-repeat 4px 40%;
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
    background: url(../../../../../static/img/hov-icon.png) no-repeat;
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
    background: url(../../../../../static/img/hov-icon1.png) no-repeat;
  }
}
.slotHeader {
  margin-bottom: 5%;
}
.operation {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>