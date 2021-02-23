<template>
  <div class="list-apadd">
    <div class="formtable-warp">
      <div class="formtab-warp">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="待办任务" name="first">
            <div class="lefts">
              <input type="text" v-model="taskName" placeholder="请输入产品名称" maxlength="20"/>
              <span class="serachBtn" @click="handleSearch">搜索</span>
            </div>
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
                        <DropdownItem v-if="btnList['办理']" name="examine" align="center">办理</DropdownItem>
                        <DropdownItem v-if="btnList['查看']" name="maintain" align="center">查看</DropdownItem>
                      </template>
                    </DropdownMenu>
                  </Dropdown>
                </template>
              </el-table-column>
            </DataTable>
          </el-tab-pane>
          <el-tab-pane label="已办任务" name="second">
            <div class="lefts">
              <input type="text" v-model="taskName" placeholder="请输入产品名称" maxlength="20"/>
              <span class="serachBtn" @click="handleSearchHave">搜索</span>
            </div>
            <DataTable
              :tableData="haveGridData"
              :columnData="haveColumnData"
              :noSelects="true"
              :pages="Havepages"
              :loading="loading"
              @currentChange="currentChangeHave"
            >
              <el-table-column show-overflow-tooltip label="操作" align="center">
                <template slot-scope="scope">
                  <!-- <el-button
                    v-if="btnList['查看']"
                    size="mini"
                    type="primary"
                    @click="checkDetails(scope.row)"
                  >查看</el-button>-->
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
                        <DropdownItem v-if="btnList['查看']" name="maintain" align="center">查看</DropdownItem>
                      </template>
                    </DropdownMenu>
                  </Dropdown>
                </template>
              </el-table-column>
            </DataTable>
          </el-tab-pane>
        </el-tabs>
        <el-dialog
          title="产品查看"
          :visible.sync="dialogFormVisible"
          :close-on-click-modal="false"
          width="50%"
          @close="closeDialog"
        >
          <Check
            :disabled="true"
            :form="projectDetail"
            :typefile="typefile"
            :actives="0"
            :flowImgView="flowImgView"
          >
            <div class="operation">
              <el-button @click="goback(1)">返回</el-button>
            </div>
          </Check>
        </el-dialog>
        <el-dialog
          title="产品办理"
          :visible.sync="dialogFormVisibleTransaction"
          :close-on-click-modal="false"
          width="45%"
        >
          <Check
            :disabled="true"
            :form="projectDetail"
            :typefile="typefile"
            :actives="5"
            :transactionDetail="transactionDetail"
          >
            <div slot="transaction" class="transaction">
              <div>
                <p></p>
                <el-form ref="form3" :model="form3" label-width="100px" :rules="rules">
                  <div class="itemWarp">
                    <el-form-item label="环节名称">{{form3.flowNodeName}}</el-form-item>
                    <el-form-item label="预计交付时间">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form3.plannedEndTime"
                        style="width: 100%;"
                        :disabled="true"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                  <el-form-item label="任务附件" class="taskfile" prop="fileName">
                    <div class="item3">
                      <el-link type="primary" @click="downloads(form3.fileId)">{{form3.fileName}}</el-link>
                      <el-button
                        type="danger"
                        size="mini"
                        @click="detailFile(form3)"
                        v-if="del && form3.fileName && this.nodeType"
                      >删除</el-button>
                      <el-upload
                        v-if="this.nodeType"
                        class="upload-demo"
                        :action="uploadUrl"
                        :max-size="10240"
                        :show-file-list="false"
                        :on-exceeded-size="handleMaxSize"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        :format="['txt','pdf','doc','docx','xlsx','xls']"
                        :on-format-error="handleFormatError"
                        multiple
                      >
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>
                    </div>
                  </el-form-item>
                  <el-form-item label="任务备注" prop="taskDescription">
                    <el-input
                      type="textarea"
                      v-model="form3.taskDescription"
                      maxlength="120"
                      :disabled="!this.nodeType"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="请选择审批人" v-if="this.nodeType">
                    <el-select v-model="value33" placeholder="请选择下一步审批人" @change="getApproval">
                      <el-option
                        v-for="item in this.valueApproval"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="!this.nodeType">
                <el-form ref="form4" :model="form3" label-width="100px" :rules="rules">
                  <el-form-item label="审批状态">
                    <el-select v-model="value" placeholder="请选择业务流程" @change="getResult">
                      <el-option
                        v-for="item in this.values"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="审批意见" prop="checkOpinion">
                    <el-input type="textarea" v-model="form3.checkOpinion" maxlength="120"></el-input>
                  </el-form-item>
                  <el-form-item label="请选择审批人" v-if="this.passApproval">
                    <el-select v-model="value33" placeholder="请选择下一步审批人" @change="getApproval">
                      <el-option
                        v-for="item in this.valueApproval"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="operation">
              <el-button @click="submitInfo()">提交</el-button>
              <el-button @click="goback(2)">取消</el-button>
            </div>
          </Check>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  deleteStateByFileId,
  getDataproductHaveList,
  getDataproductList,
  getproductDetail,
  fillInFor,
  AuditToDeal,
  getFlowImg,
} from "@/api/dataServices/index";
import { appServer } from "@/api/appServer";
import { updateStateByFileId } from "@/api/standard/stdFile/stdFile";
import Check from "../checkProduct.vue";
export default {
  data() {
    return {
      loading: true,
      activeName: "first",
      taskName: "",
      typefile: "1",
      gridData: [], //待办
      haveGridData: [], //已办
      path: `http://${window.location.host}${appServer.system}`,
      token: sessionStorage.getItem("token"),
      deptCode: sessionStorage.getItem("userDeptCode"),
      del: true,
      uploadUrl:
        "http://" +
        window.location.host +
        appServer.system +
        "fileUpload/" +
        sessionStorage.getItem("token") +
        "/" +
        sessionStorage.getItem("userDeptCode"),
      columnData: [
        //待办
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
          dataKey: "flowNodeName",
          name: "任务环节",
        },
        {
          dataKey: "plannedEndTime",
          name: "计划完成日期",
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
      haveColumnData: [
        //已办
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
          dataKey: "flowNodeName",
          name: "任务环节",
        },
        {
          dataKey: "plannedEndTime",
          name: "计划交付日期",
        },
        {
          dataKey: "plannedEndTime",
          name: "实际交付日期",
        },
        {
          dataKey: "checkStatus",
          name: "任务审批状态",
        },
      ],
      pages: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
      Havepages: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
      searchFlag: "0",
      btnList: {},
      dialogFormVisible: false,
      dialogFormVisibleTransaction: false,
      projectDetail: {},
      transactionDetail: [],
      form3: {},
      values: [
        {
          value: "1",
          label: "通过",
        },
        {
          value: "0",
          label: "不通过",
        },
      ],
      valueApproval: [
        {
          value: "1",
          label: "张三",
        },
        {
          value: "0",
          label: "李四",
        },
        {
          value: "3",
          label: "王五",
        },
      ],
      value33: "",
      value: "",
      passApproval: false,
      nodeType: false,
      flowImgView: "",
      rules: {
        taskDescription: [
          { required: true, message: "请输入任务备注", trigger: "blur" },
        ],
        fileName: [
          { required: true, message: "请上传产品文档", trigger: "blur" },
        ],
        checkOpinion: [
          { required: true, message: "请填写审批意见", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    Check,
  },
  created() {
    this.getBtnList();
    this.getDataproductList();
  },
  methods: {
    //按钮权限
    async getBtnList() {
      this.btnList = await this.$util.getAuthBtn();
    },
    //更多操作按钮
    moreOption(index, row, event) {
      if (event == "examine") {
        if (row.nodeType == 0) {
          this.nodeType = false;
        } else if (row.nodeType == 1) {
          this.nodeType = true;
        }
        this.getDetail(row, 1);
      } else if (event == "maintain") {
        this.getDetail(row, 2);
      }
    },
    //分页
    currentChange(e) {
      this.pages.currentPage = e;
      this.getDataproductList();
    },
    currentChangeHave(e) {
      this.Havepages.currentPage = e;
      this.getDataproductHaveList();
    },
    // 待办搜索
    handleSearch() {
      this.getDataproductList();
    },
    //已办搜索
    handleSearchHave() {
      this.getDataproductHaveList();
    },
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.getDataproductList();
      } else if (tab.name == "second") {
        this.getDataproductHaveList();
      }
    },
    getDataproductHaveList() {
      let params = {
        productName: this.taskName,
        queryConditionBean: {
          pageNum: this.Havepages.currentPage,
          pageSize: this.Havepages.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        getDataproductHaveList(params)
          .then((res) => {
            if (res.data.resultCode == 0) {
              this.haveGridData = res.data.resultData.list;
              this.Havepages.total = res.data.resultData.totalCount;
              this.Havepages.currentPage = res.data.resultData.pageNum;
              this.Havepages.pageSize = res.data.resultData.pageSize;
              this.loading = false;
            } else {
              this.$message.error(res.data.resultMsg);
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getDataproductList() {
      let params = {
        productName: this.taskName,
        queryConditionBean: {
          pageNum: this.pages.currentPage,
          pageSize: this.pages.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        getDataproductList(params)
          .then((res) => {
            if (res.data.resultCode == 0) {
              this.gridData = res.data.resultData.list;
              this.pages.total = res.data.resultData.totalCount;
              this.pages.currentPage = res.data.resultData.pageNum;
              this.pages.pageSize = res.data.resultData.pageSize;
              this.loading = false;
            } else {
              this.$message.error(res.data.resultMsg);
            }

            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // checkDetails(row) {
    //   this.getDetail(row, 2);
    // },
    //查看详情
    getDetail(row, num) {
      const params = {
        id: row.productOrderId,
        orderProcessId:row.id
      };
      new Promise((resolve, reject) => {
        getproductDetail(params)
          .then((res) => {
            // console.log('查看产品详情',res.data.resultData.orderDetail)
            this.projectDetail = res.data.resultData.orderDetail;
            this.projectDetail.productTypeName = this.projectDetail.productTypeName.split(
              ","
            );
            this.transactionDetail = [];
            for (
              var i = 0;
              i < res.data.resultData.orderProcessList.length - 1;
              i++
            ) {
              this.transactionDetail.push(
                res.data.resultData.orderProcessList[i]
              );
            }
            this.form3 = res.data.resultData.orderProcessList.slice(-1)[0];
            if (num == 1) {
              this.dialogFormVisibleTransaction = true;
            } else if (num == 2) {
              this.dialogFormVisible = true;
              //获取查看流程图
              if (this.projectDetail.processInstanceId) {
                new Promise((resolve, reject) => {
                  getFlowImg({ instId: this.projectDetail.processInstanceId })
                    .then((res) => {
                      this.flowImgView = res.request.responseURL;
                      resolve();
                    })
                    .catch((err) => {
                      this.dialogFormVisible = true;
                      reject(err);
                    });
                });
              } else {
                this.flowImgView = "";
                this.dialogFormVisible = true;
              }
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
        this.dialogFormVisibleTransaction = false;
      }
    },
    //文件删除
    detailFile(form) {
      //   console.log("form", form);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            fileId: form.fileId,
            state: "0",
            userId: sessionStorage.getItem("userId"),
          };
          let params2 = {
            fileType: this.typefile,
            businessKey: form.id,
            userId: sessionStorage.getItem("userId"),
            userName: sessionStorage.getItem("userName"),
          };
          updateStateByFileId(params).then((res) => {
            if (res.data.resultData) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.form3.fileName = "";
              this.form3.fileId = "";
              this.del = false;
            } else {
              this.$message.error(res.data.resultMsg);
            }
          });
          deleteStateByFileId(params2).then((res) => {
            // console.log(res);
          });
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //文件下载
    downloads(fileId) {
      window.location.href = `${this.path}fileDownload/${this.token}/${this.deptCode}?fileId=${fileId}`;
    },
    handleFormatError() {
      this.$message({
        message: "上传文件类型错误，只能上传pdf,doc,docx,txt,xls,xlsx",
        type: "warning",
      });
    },
    // 文件上传失败
    uploadError() {
      this.$message({ message: "文件上传失败!", type: "error" });
    },
    handleMaxSize() {
      this.$message({ message: "上传文件不能超过10M", type: "warning" });
    },
    // 文件上传成功返回提示信息
    uploadSuccess(response) {
      const fileName =
        response.resultData.fileName + "." + response.resultData.fileType;
      this.form3.fileName = fileName;
      this.form3.fileId = response.resultData.fileId;
      this.del = true;
    },
    getResult() {
      //   console.log("value", this.value);
      if (this.value == 1) {
        this.passApproval = true;
      } else if (this.value == 0) {
        this.passApproval = false;
      }
    },
    getApproval() {
      //   console.log("value33", this.value33);
    },
    closeDialog() {
      this.flowImgView = "";
    },
    submitInfo() {
      //   console.log("hhh", this.form3, this.value, this.value33);
      const params = {
        fileId: this.form3.fileId,
        fileName: this.form3.fileName,
        id: this.form3.id,
        taskDescription: this.form3.taskDescription,
      };
      const paramss = {
        checkStatus: this.value,
        id: this.form3.id,
        checkOpinion: this.form3.checkOpinion,
      };

      if (this.nodeType) {
        if (this.form3.fileId == "" || this.form3.fileId == null) {
          this.$message({
            message: "请上传附件，再提交",
            type: "warning",
          });
        } else if (
          this.form3.taskDescription == "" ||
          this.form3.taskDescription == null
        ) {
          this.$message({
            message: "请填写备注意见，再提交",
            type: "warning",
          });
        } else {
          fillInFor(params)
            .then((res) => {
              if (res.data.resultCode == 0) {
                // console.log("申请填写成功", res.data);
                this.$message({
                  message: "操作成功",
                  type: "success",
                });
                this.dialogFormVisibleTransaction = false;
                this.getDataproductList();
              } else {
                this.$message.error(res.data.resultMsg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          this.getDataproductList();
        }
      } else {
        if (this.value == "" || this.value == null) {
          this.$message({
            message: "请选择审批状态，再提交",
            type: "warning",
          });
        } else if (
          this.form3.checkOpinion == "" ||
          this.form3.checkOpinion == null
        ) {
          this.$message({
            message: "请填写审批意见，再提交",
            type: "warning",
          });
        } else {
          AuditToDeal(paramss)
            .then((res) => {
              if (res.data.resultCode == 0) {
                // console.log("审核提交成功", res.data);
                this.$message({
                  message: "操作成功",
                  type: "success",
                });
                this.dialogFormVisibleTransaction = false;
                this.getDataproductList();
              } else {
                this.$message.error(res.data.resultMsg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          this.getDataproductList();
        }
      }
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
.operation {
  display: flex;
  justify-content: space-around;
  margin-top: 3%;
}
.transaction {
  // width: 100px;
  margin-top: 3%;
}
.itemWarp {
  display: flex;
  justify-content: space-between;
}
.taskfile .el-form-item__content {
  // width: 100px;
  .item3 {
    display: flex;
    .el-button--mini,
    .el-button--mini.is-round {
      margin: 5px 5px 0 5px;
      width: 50px;
      height: 30px;
    }
  }
}
</style>