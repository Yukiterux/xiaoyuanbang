<template>
  <div class="list-apadd">
    <div class="formtable-warp">
      <div class="formtab-warp">
        <div class="lefts">
          <input type="text" v-model="taskNameHave" placeholder="请输入流程编号或流程名称" />
          <span class="serachBtn" @click="handleSearchHave">搜索</span>
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
              <el-button size="mini" type="primary" @click="checkDetails(scope.row)">查看流程图</el-button>
            </template>
          </el-table-column>
        </DataTable>
        <el-dialog
          title="查看流程图"
          :visible.sync="dialogFormVisible"
          :close-on-click-modal="false"
          width="50%"
        >
          <img style="width:100%" :src="this.flowImgView" />
          <div class="operation">
            <el-button @click="goback()">返回</el-button>
          </div>
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
      gridData: [],
      gridDataHave: [],
      projectDetail: {},
      columnData: [
        {
          dataKey: "key",
          name: "流程编号",
        },
        {
          dataKey: "name",
          name: "流程名称",
        },
        {
          dataKey: "version",
          name: "流程版本",
        },
        {
          dataKey: "createTime",
          name: "创建时间",
        },
        {
          dataKey: "status",
          name: "流程状态",
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
      flowImgView: "",
    };
  },
  created() {
    this.getproductReleaseList();
  },
  methods: {
    // 列表接口 productStatus=5为待办6为已办
    getproductReleaseList() {
      let params = {
        offset: this.pages.pageSize * (this.pages.currentPage - 1),
        limit: this.pages.pageSize,
        // type_id_$VEQ: 20000008980004,
        // type_id_$VEQ: '4,5',
        typeId: '4,5',
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
    // 查看流程图
    checkDetails(row) {
      this.getDetail(row.id);
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
  margin-top: 20px;
}
</style>