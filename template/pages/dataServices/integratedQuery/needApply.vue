<template>
  <div class="list-apadd">
    <div class="formtable-con">
      <div class="formtab-main">
        <div class="tab-lista fn-clear">
          <div class="lefts">
            <input type="text" placeholder="按名称搜索" v-model="demandName" />
            <span class="serachBtn" @click="handleSearch()">搜索</span>
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
        <div id="Advancedsearch">
          <el-select
              v-model="status"
              @change="StatusChange"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          <Button type="primary" @click="handleSearch">搜索</Button>
          <Button type="warning" @click="formReset()">重置</Button>
        </div>
        <div class="list-apadd">
          <DataTable
            :tableData="gridData"
            :columnData="columnData"
            :noSelects="true"
            :pages="pages"
            @currentChange="pageQuery"
          >
            <el-table-column show-overflow-tooltip label="操作" align="center">
                  <template slot-scope="scope">
                    <Dropdown transfer trigger="click" @on-click="moreOption(scope.$index,scope.row, $event)">
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
      </div>
    </div>
    <el-dialog title="产品需求" :close-on-click-modal="false" :visible.sync="ObtainVisable" width="50%" height="500px">
        <div class="bigBox">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="产品需求名称">
              <el-input v-model="form.productReqName" placeholder="请输入" :disabled="isdisabledFn"></el-input>
            </el-form-item>
            <div>
              <el-form-item label="产品编码" v-if="ReqCodeShow">
                <el-input v-model="form.productReqCode" placeholder="请输入" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="产品需求类型">
                <el-checkbox-group v-model="form.productReqType" @change="checkChange">
                  <el-checkbox
                    v-for="item in citiesLook"
                    :label="item.code"
                    :key="item.code"
                    :disabled="isdisabledFn"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="产品需求描述">
                <el-input
                  type="textarea"
                  v-model="form.productDescription"
                  :disabled="isdisabledFn"
                ></el-input>
              </el-form-item>
              <el-form-item label="附件材料">
                <div class="item3">
                  <el-link type="primary" @click="downloads(form.fileId)">{{form.fileName}}</el-link>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="detailFile(form)"
                    v-if="del && !isdisabledFn && form.fileName"
                  >删除</el-button>
                  <el-upload
                    v-if="!isdisabledFn"
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
              <el-form-item label="申请人姓名">
                <el-input
                  v-model="form.applicantName"
                  :disabled="isdisabledFn"
                ></el-input>
              </el-form-item>
              <el-form-item label="申请人电话">
                <el-input
                  v-model="form.applicantPhone"
                  placeholder="请输入11位手机号"
                  :disabled="isdisabledFn"
                ></el-input>
              </el-form-item>
              <el-form-item label="期望完成时间">
                <el-col :span="11">
                  <el-date-picker
                    :disabled="isdisabledFn"
                    v-model="form.expectedEndTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    default-time="12:00:00"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="申请时间">
                <el-col :span="11">
                  <el-date-picker
                    :disabled="isdisabledFn"
                    v-model="form.applicationTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    default-time="12:00:00"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import { appServer } from "@/api/appServer";
import { updateStateByFileId } from "@/api/standard/stdFile/stdFile";
import {
LookDemand,
findDemandPage
} from "@/api/produceManagement/index";
export default {
  components: {},
  data() {
    return {
      path: `http://${window.location.host}${appServer.system}`,
      token: sessionStorage.getItem("token"),
      deptCode: sessionStorage.getItem("userDeptCode"),
      uploadUrl:
        "http://" +
        window.location.host +
        appServer.system +
        "fileUpload/" +
        sessionStorage.getItem("token") +
        "/" +
        sessionStorage.getItem("userDeptCode"),
      del: true,
      isdisabledFn: false,
      ReqCodeShow: true,
      ObtainVisable: false,
      searchFlag: "0",
      status:"",
      options: [
        {
          value: '0',
          label: '待审核'
        },
        {
          value: '1',
          label: '已通过'
        }, {
          value: '2',
          label: '未通过'
        }],
      citiesLook: [
        {
          code: "1",
          name: "API",
        },
        {
          code: "2",
          name: "文档",
        },
        {
          code: "3",
          name: "缓存",
        },
      ],
      columnData: [
        {
          dataKey: "productReqName",
          name: "产品需求名称",
        },
        {
          dataKey: "productReqType",
          name: "产品需求分类",
        },
        {
          dataKey: "productDescription",
          name: "产品描述",
        },
        {
          dataKey: "applicationTime",
          name: "申请时间",
        },
        {
          dataKey: "expectedEndTime",
          name: "期望完成日期",
        },
        {
          dataKey: "applicantName",
          name: "申请人",
        },
        {
          dataKey: "checkStatus",
          name: "状态",
        },
      ],
      demandName:"",
      gridData:[],
      form: {
        applicantName:"",
        applicantPhone: "",
        productReqType: [], //
        productDescription: "", //
        fileName: "", //
        fileId: "",
        productReqName: "", //
        productReqCode: "",
        expectedEndTime: "",
        applicationTime: "",
      },
      pages: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getStandardAuditList();
  },
  methods: {
    moreOption(index, obj, name) {
      console.log(name)
      if (name == "LookDemand") {
        this.LookDemand(obj);
      }
    },
    // 获取待审核tab列表
    getStandardAuditList(state) {
      let params = {
        status:this.status,
        productName: this.demandName,
        queryConditionBean: {
          pageNum: this.pages.currentPage,
          pageSize: this.pages.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        findDemandPage(params)
          .then((res) => {
            this.gridData = res.data.resultData.list;
            this.pages.total = res.data.resultData.totalCount;
            this.pages.currentPage = res.data.resultData.pageNum;
            this.pages.pageSize = res.data.resultData.pageSize;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 查看
    LookDemand(row) {
      this.isdisabledFn = true;
      this.ObtainVisable = true;
      const id = row.id;
      new Promise((resolve, reject) => {
        LookDemand({ id: id })
          .then((res) => {
            const str = res.data.resultData.productReqType;
            this.form.productReqType = str.split(",", 3);
            console.log(this.form.productReqType);
            console.log(this.citiesLook);
            this.form.applicantPhone = res.data.resultData.applicantPhone;
            this.form.applicantName = res.data.resultData.applicantName;
            this.form.productDescription = res.data.resultData.productDescription;
            this.form.fileName = res.data.resultData.fileName;
            this.form.fileId = res.data.resultData.fileId;
            this.form.productReqName = res.data.resultData.productReqName;
            this.form.expectedEndTime = res.data.resultData.expectedEndTime;
            this.form.applicationTime = res.data.resultData.applicationTime;
            this.form.productReqCode = res.data.resultData.productReqCode;
            resolve();
            console.log("查看详情");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    checkChange(val) {
      this.form.productReqType = val;
      console.log(this.form.productReqType);
    },
    //文件下载
    downloads(fileId) {
      window.location.href = `${this.path}fileDownload/${this.token}/${this.deptCode}?fileId=${fileId}`;
    },
    //文件删除
    detailFile(form) {
      console.log("form", form);
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
              this.form.fileName = "";
              this.del = false;
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          });
          deleteStateByFileIdReq(params2).then((res) => {
            console.log(res);
          });
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
      this.form.fileName = fileName;
      this.form.fileId = response.resultData.fileId;
      this.del = true;
    },
    pageQuery(count) {
      this.pages.currentPage = count;
      this.getStandardAuditList();
    },
    StatusChange(val){
      console.log(val)
      this.status = val
    },
    // 高级搜索弹出框
    showSearch() {
      $("#Advancedsearch").slideToggle(500);
      this.searchFlag = "0";
    },
    // 高级搜索弹出框
    showSearch1() {
      $("#Advancedsearch").slideToggle(500);
      this.searchFlag = "1";
    },
    handleSearch(){
      this.getStandardAuditList()
    },
    formReset() {
      this.status = "";
      this.demandName = "";
      this.getStandardAuditList();
    },
  },
  
  mounted() {},
};
</script>
<style lang="scss" scoped>
/deep/ .el-dialog__headerbtn {
  position: absolute;
  top: 0px !important;
  right: 5px !important;
}
.formtable-con {
  position: relative;
  .formtab-main {
    background: #fff;
    height: 600px;
  }
  .formtab-main {
    position: relative;
    padding: 28px 22px 22px 22px;
    .rights {
      float: right;
      margin-right: 10px;
      font-size: 14px;
    }
    .lefts {
      float: left;
      font-size: 14px;
      margin: 0 0 10px 5px;
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
        background: url(../../../assets/img/icon/search-bg.png) no-repeat 4px
          40%;
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
  }
}
.el-dialog__header {
  height: 44px;
  line-height: 44px;
  text-align: left;
  padding: 0 0 0 15px !important;
  background: #fff !important;
  border-bottom: 1px dashed #ddd;
}

.el-dialog__title {
  display: inline-block;
  vertical-align: middle;
  font-size: 16px !important;
  font-weight: 500;
  color: #000 !important;
  margin-left: 16px;
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
</style>
