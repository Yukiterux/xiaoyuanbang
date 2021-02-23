<template>
  <div class="list-apadd">
    <div class="formtable-warp">
      <div class="formtab-warp">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="待发布" name="first">
            <div class="lefts">
              <input type="text" v-model="taskName" placeholder="请输入产品名称" maxlength="20" />
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
                        <DropdownItem v-if="btnList['发布']" name="examine" align="center">发布</DropdownItem>
                        <DropdownItem v-if="btnList['查看']" name="maintain" align="center">查看</DropdownItem>
                      </template>
                    </DropdownMenu>
                  </Dropdown>
                </template>
              </el-table-column>
            </DataTable>
          </el-tab-pane>
          <el-tab-pane label="已发布" name="second">
            <div class="lefts">
              <input type="text" v-model="taskNameHave" placeholder="请输入产品名称" maxlength="20" />
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
          width="45%"
        >
          <Check :disabled="true" :form="projectDetail" :flowImgView="flowImgView">
            <div class="operation">
              <el-button @click="goback(1)">返回</el-button>
            </div>
          </Check>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisibleissue" :close-on-click-modal="false" width="30%">
          <span>确认发布?</span>
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
import {
  getproductReleaseList,
  getproductDetail,
  passIssue,
  getFlowImg,
} from "@/api/dataServices/index";
import Check from "./checkProduct.vue";
export default {
  data() {
    return {
      loading: true,
      activeName: "first",
      taskName: "",
      taskNameHave: "",
      gridData: [],
      gridDataHave: [],
      projectDetail: {},
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
          dataKey: "plannedEndTime",
          name: "计划完成日期",
        },
        {
          dataKey: "warnStatus",
          name: "预警状态",
        },
      ],
      columnDataHave: [
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
          dataKey: "plannedEndTime",
          name: "计划完成日期",
        },
        {
          dataKey: "releaseTime",
          name: "发布日期",
        },
        {
          dataKey: "releaseUserName",
          name: "发布人",
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
      dialogFormVisible: false,
      dialogVisibleissue: false,
      issues: {},
      flowImgView: "",
    };
  },
  components: {
    Check,
  },
  created() {
    this.getBtnList();
    this.getproductReleaseList(5);
  },
  methods: {
    //按钮权限
    async getBtnList() {
      this.btnList = await this.$util.getAuthBtn();
    },
    // 列表接口 productStatus=5为待办6为已办
    getproductReleaseList(a) {
      let params = {
        productStatus: a,
        productName: a == 5 ? this.taskName : this.taskNameHave,
        queryConditionBean: {
          pageNum: this.pages.currentPage,
          pageSize: this.pages.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        getproductReleaseList(params)
          .then((res) => {
            if (a == 5) {
              this.gridData = res.data.resultData.list;
              this.pages.total = res.data.resultData.totalCount;
              this.pages.currentPage = res.data.resultData.pageNum;
              this.pages.pageSize = res.data.resultData.pageSize;
              this.loading = false;
            } else if (a == 6) {
              this.gridDataHave = res.data.resultData.list;
              this.pagesHave.total = res.data.resultData.totalCount;
              this.pagesHave.currentPage = res.data.resultData.pageNum;
              this.pagesHave.pageSize = res.data.resultData.pageSize;
              this.loading = false;
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
        //发布
        this.dialogVisibleissue = true;
        this.issues = row;
      } else if (event == "maintain") {
        //查看
        this.getDetail(row.id, 1);
      }
    },
    // checkDetails(row) {
    //   this.getDetail(row.id, 1);
    // },
    //待办分页
    currentChange(e) {
      this.pages.currentPage = e;
      this.getproductReleaseList(5);
    },
    //已办分页
    currentChangeHave(e) {
      this.pagesHave.currentPage = e;
      this.getproductReleaseList(6);
    },
    // 待办搜索
    handleSearch() {
      this.getproductReleaseList(5);
    },
    //已办搜索
    handleSearchHave() {
      this.getproductReleaseList(6);
    },
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.getproductReleaseList(5);
      } else if (tab.name == "second") {
        this.getproductReleaseList(6);
      }
    },
    //查看详情
    getDetail(id, num) {
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
                      this.flowImgView = res.request.responseURL;
                      this.dialogFormVisible = true;
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
            } else if (num == 2) {
              this.dialogMaintainVisible = true;
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
      } else if (num == 2) {
        this.dialogMaintainVisible = false;
      }
    },
    issue() {
      new Promise((resolve, reject) => {
        passIssue({ id: this.issues.id })
          .then((res) => {
            if (res.data.resultCode == 0) {
              this.getproductReleaseList(5);
              this.dialogVisibleissue = false;
              this.$message({
                message: "发布成功",
                type: "success",
              });
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