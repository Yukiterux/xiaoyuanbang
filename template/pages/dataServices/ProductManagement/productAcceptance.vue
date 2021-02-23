<template>
  <div class="list-apadd">
    <div class="formtable-warp">
      <div class="formtab-warp">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="待验收" name="first">
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
                        <DropdownItem v-if="btnList['查看']" name="maintain" align="center">查看</DropdownItem>
                        <DropdownItem v-if="btnList['验收']" name="examine" align="center">验收</DropdownItem>
                      </template>
                    </DropdownMenu>
                  </Dropdown>
                </template>
              </el-table-column>
            </DataTable>
          </el-tab-pane>
          <el-tab-pane label="已验收" name="second">
            <div class="lefts">
              <input type="text" v-model="taskNameHave" placeholder="请输入产品名称" maxlength="20"/>
              <span class="serachBtn" @click="handleSearchHave">搜索</span>
            </div>
            <DataTable
              :tableData="gridDataHave"
              :columnData="columnDataHave"
              :noSelects="true"
              :pages="pagesHave"
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
                        <DropdownItem v-if="btnList['查看']" name="maintainTwo" align="center">查看</DropdownItem>
                        <DropdownItem v-if="btnList['验收记录']" name="record" align="center">验收记录</DropdownItem>
                      </template>
                    </DropdownMenu>
                  </Dropdown>
                </template>
              </el-table-column>
            </DataTable>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-dialog
        title="产品查看"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="45%"
      >
        <Check :disabled="true" :form="productInfo">
          <div class="operation">
            <el-button @click="goback(1)">返回</el-button>
          </div>
        </Check>
      </el-dialog>
      <el-dialog
        title="产品验收"
        :visible.sync="dialogAcceptancemVisible"
        :close-on-click-modal="false"
        width="45%"
      >
        <Check :disabled="true" :form="productInfo" :opinion="true" ref="form">
          <el-form-item label="产品验收意见" required>
            <el-input type="textarea" v-model="acceptanceOpinion" maxlength="120"></el-input>
          </el-form-item>
          <div class="operation">
            <el-button @click="pass">通过</el-button>
            <el-button @click="noPass">不通过</el-button>
            <el-button @click="goback(2)">取消</el-button>
          </div>
        </Check>
      </el-dialog>
      <el-dialog
        title="产品查看"
        :visible.sync="dialogFormVisibleTwo"
        :close-on-click-modal="false"
        width="45%"
      >
        <Check :disabled="true" :form="productInfo" :checkNum="checkNum">
          <div class="operation">
            <el-button @click="goback(3)">返回</el-button>
          </div>
        </Check>
      </el-dialog>
      <el-dialog
        title="验收记录"
        :visible.sync="dialogFormVisibleRecord"
        :close-on-click-modal="false"
        width="45%"
      >
        产品名称：{{productName}}
        <DataTable
          :tableData="tableDataRecord"
          :columnData="columnDataRecord"
          :noSelects="true"
          :loading="loading"
          :nopages="true"
        >
          <div class="operation">
            <el-button @click="goback(4)">返回</el-button>
          </div>
        </DataTable>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getproductAcceptance,
  ObtainProductDetail,
  passAcceptance,
  NoPassAcceptance,
  ObtainProductRecord,
} from "@/api/dataServices/index";
import Check from "./productDetail.vue";
export default {
  data() {
    return {
      loading: true,
      activeName: "first",
      taskName: "",
      taskNameHave: "",
      gridData: [],
      gridDataHave: [],
      tableDataRecord: [],
      columnData: [
        {
          dataKey: "productRequirementsName",
          name: "产品需求名称",
        },
        {
          dataKey: "productName",
          name: "产品名称",
        },
        {
          dataKey: "productCode",
          name: "产品编号",
        },
        {
          dataKey: "productType",
          name: "产品分类",
        },
        {
          dataKey: "requirementsApplicationTime",
          name: "申请时间",
        },
        {
          dataKey: "expectedEndTime",
          name: "期望完成日期",
        },
        {
          dataKey: "actualEndTime",
          name: "实际完成日期",
        },
      ],
      columnDataHave: [
        {
          dataKey: "productRequirementsName",
          name: "产品需求名称",
        },
        {
          dataKey: "productName",
          name: "产品名称",
        },
        {
          dataKey: "productCode",
          name: "产品编号",
        },
        {
          dataKey: "productType",
          name: "产品分类",
        },
        {
          dataKey: "requirementsApplicationTime",
          name: "申请时间",
        },
        {
          dataKey: "expectedEndTime",
          name: "期望完成日期",
        },
        {
          dataKey: "acceptTime",
          name: "验收日期",
        },
        {
          dataKey: "acceptStatus",
          name: "验收结果",
        },
      ],
      columnDataRecord: [
        {
          dataKey: "acceptUser",
          name: "申请人",
        },
        {
          dataKey: "acceptOpinion",
          name: "验收意见",
        },
        {
          dataKey: "acceptTime",
          name: "验收时间",
        },
        {
          dataKey: "acceptStatus",
          name: "验收结果",
        },
      ],
      pages: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
      pagesHave: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
      searchFlag: "0",
      btnList: {},
      productInfo: {}, //产品信息
      dialogFormVisible: false,
      dialogAcceptancemVisible: false,
      dialogFormVisibleTwo: false,
      dialogFormVisibleRecord: false,
      acceptanceOpinion: "", //验收意见
      checkNum: "",
      productName: "", //产品名称
    };
  },
  components: {
    Check,
  },
  created() {
    this.getBtnList();
    this.getproductReleaseList(0);
  },
  methods: {
    //按钮权限
    async getBtnList() {
      this.btnList = await this.$util.getAuthBtn();
    },
    // 列表接口 productStatus=0为待办1为已办
    getproductReleaseList(a) {
      let params = {
        acceptanceClassification: a,
        keywords: this.taskName,
        queryConditionBean: {
          pageNum: a == 0 ? this.pages.currentPage : this.pagesHave.currentPage,
          pageSize: a == 0 ? this.pages.pageSize : this.pagesHave.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        getproductAcceptance(params)
          .then((res) => {
            if (a == 0) {
              this.gridData = res.data.resultData.list;
              this.pages.total = res.data.resultData.totalCount;
              this.pages.currentPage = res.data.resultData.pageNum;
              this.pages.pageSize = res.data.resultData.pageSize;
              this.loading=false
            } else if (a == 1) {
              this.gridDataHave = res.data.resultData.list;
              this.gridDataHave.map((item) => {
                if (item.acceptStatus == "0") {
                  item.acceptStatus = "未验收";
                } else if (item.acceptStatus == "1") {
                  item.acceptStatus = "验收通过";
                } else if (item.acceptStatus == "2") {
                  item.acceptStatus = "验收未通过";
                }
              });
              this.pagesHave.total = res.data.resultData.totalCount;
              this.pagesHave.currentPage = res.data.resultData.pageNum;
              this.pagesHave.pageSize = res.data.resultData.pageSize;
              this.loading=false
            }

            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //详情
    getDetail(id, num) {
      const params = { id: id };
      new Promise((resolve, reject) => {
        ObtainProductDetail(params)
          .then((res) => {
            this.productInfo = res.data.resultData;
            this.productInfo.productType = this.productInfo.productType.split(
              ","
            );
            if (this.productInfo.acceptStatus == 0) {
              this.productInfo.acceptStatus = "未验收";
            } else if (this.productInfo.acceptStatus == 1) {
              this.productInfo.acceptStatus = "验收通过";
            } else if (this.productInfo.acceptStatus == 2) {
              this.productInfo.acceptStatus = "验收未通过";
            }
            if (num == 1) {
              this.dialogFormVisible = true;
            } else if (num == 2) {
              this.dialogAcceptancemVisible = true;
            } else if (num == 3) {
              this.dialogFormVisibleRecord = true;
            } else if (num == 4) {
              this.checkNum = 4;
              this.dialogFormVisibleTwo = true;
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //更多操作按钮
    moreOption(index, row, event) {
      if (event == "examine") {
        this.getDetail(row.id, 2);
      } else if (event == "maintain") {
        this.getDetail(row.id, 1);
      } else if (event == "record") {
        this.records(row.productOrderId, row.productName, 3);
      } else if (event == "maintainTwo") {
        this.getDetail(row.id, 4);
      }
    },
    //待验收分页
    currentChange(e) {
      this.pages.currentPage = e;
      this.getproductReleaseList(0);
    },
    //已验收分页
    currentChangeHave(e) {
      this.pagesHave.currentPage = e;
      this.getproductReleaseList(1);
    },
    // 待验收搜索
    handleSearch() {
      this.getproductReleaseList(0);
    },
    //已验收搜索
    handleSearchHave() {
      this.getproductReleaseList(1);
    },
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.getproductReleaseList(0);
      } else if (tab.name == "second") {
        this.getproductReleaseList(1);
      }
    },
    goback(num) {
      if (num == 1) {
        this.dialogFormVisible = false;
      } else if (num == 2) {
        this.dialogAcceptancemVisible = false;
      } else if (num == 3) {
        this.dialogFormVisibleTwo = false;
      } else if (num == 4) {
        this.dialogFormVisibleRecord = false;
      }
    },
    //验收通过
    pass() {
      let formdetail = this.$refs.form.form;
      const paramss = {
        acceptOpinion: this.acceptanceOpinion,
        id: formdetail.id,
      };
      if (this.acceptanceOpinion == "") {
        this.$message({
          message: "请填写验收意见",
          type: "warning",
        });
      } else {
        new Promise((resolve, reject) => {
          passAcceptance(paramss)
            .then((res) => {
              if (res.data.resultCode == 0) {
                this.$message({
                  message: res.data.resultMsg,
                  type: "success",
                });
              } else {
                this.$message.error(res.data.resultMsg);
              }
              this.acceptanceOpinion = "";
              this.dialogAcceptancemVisible = false;
              this.getproductReleaseList(0);
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        });
      }
    },
    //验收不通过
    noPass() {
      let formdetail = this.$refs.form.form;
      const params = {
        acceptOpinion: this.acceptanceOpinion,
        id: formdetail.id,
      };
      if (this.acceptanceOpinion == "") {
        this.$message({
          message: "请填写验收意见",
          type: "warning",
        });
      } else {
        new Promise((resolve, reject) => {
          NoPassAcceptance(params)
            .then((res) => {
              if (res.data.resultCode == 0) {
                this.$message({
                  message: res.data.resultMsg,
                  type: "success",
                });
              } else {
                this.$message.error(res.data.resultMsg);
              }
              this.acceptanceOpinion = "";
              this.dialogAcceptancemVisible = false;
              this.getproductReleaseList(0);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      }
    },
    records(id, productName) {
      this.productName = productName;
      const params = { productOrderId: id };
      new Promise((resolve, reject) => {
        ObtainProductRecord(params)
          .then((res) => {
            if (res.data.resultCode == 0) {
              this.tableDataRecord = res.data.resultData;
              this.tableDataRecord.map((item) => {
                if (item.acceptStatus == "0") {
                  item.acceptStatus = "未验收";
                } else if (item.acceptStatus == "1") {
                  item.acceptStatus = "验收通过";
                } else if (item.acceptStatus == "2") {
                  item.acceptStatus = "验收未通过";
                }
              });

              this.dialogFormVisibleRecord = true;
            } else {
              this.$message.error(res.data.resultMsg);
            }
            this.loading=false
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
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
.operation {
  display: flex;
  justify-content: space-around;
}
</style>