<template>
  <div class="list-apadd">
    <div class="formtable-warp">
      <div class="formtab-warp">
        <div class="tab-lista fn-clear">
          <div class="lefts">
            <input type="text" v-model="taskName" placeholder="请输入产品名称" maxlength="20"/>
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
          <el-select v-model="status" placeholder="请选择产品状态" :popper-append-to-body="false">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
                    <DropdownItem name="LookDemand" align="center">查看</DropdownItem>
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
            width="36%"
          >
            <Check :disabled="true" :form="projectDetail">
              <div class="operation">
                <el-button @click="goback()">返回</el-button>
              </div>
            </Check>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataWorkList, getproductDetail } from "@/api/dataServices/index";
import Check from "../productPreparing/checkProduct.vue";
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
          dataKey: "actualEndTime",
          name: "完成日期",
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
      dialogFormVisible: false, //查看弹框
      options: [
        {
          value: "0 ",
          label: "待研发",
        },
        {
          value: "1",
          label: "研发中",
        },
        {
          value: "2",
          label: "研发完成",
        },
        {
          value: "3",
          label: "验收通过",
        },
        {
          value: "4",
          label: "验收未通过",
        },
        {
          value: "5",
          label: "待发布",
        },
        {
          value: "6",
          label: "已发布",
        },
      ],
      status: "",
    };
  },
  components: {
    Check,
  },
  created() {
    this.getDataWorkList();
  },
  methods: {
    moreOption(index, obj, name) {
      if (name == "LookDemand") {
        this.getDetail(obj.id);
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
      this.status = "";
      this.handleSearch();
    },
    //列表请求
    getDataWorkList() {
      let params = {
        productStatus: this.status,
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
    getDetail(id) {
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
            this.dialogFormVisible = true;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    goback() {
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style lang="scss">
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
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out, width 0.4s ease-in-out;
  }
  .el-input__inner {
    width: 180px;
    height: 32px;
    color: black;
  }
  .el-input__suffix {
    height: 32px;
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
