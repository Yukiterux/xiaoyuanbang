<template>
  <div class="list-apadd">
    <div class="formtable-con">
      <div class="formtab-main">
        <div>
          <el-tabs @tab-click="cutoverForm" default-value="1" v-model="defaultValue">
            <el-tab-pane
              name="first"
              label="申请"
            >
              <div class="lefts">
                <input type="text" placeholder="按名称搜索" v-model="productReqName" />
                <span class="serachBtn" @click="handleSearch()">搜索</span>
                <Button type="warning" @click="formReset()">重置</Button>
              </div>
              <div class="list-apadd">
                <DataTable
                  :tableData="gridDataTabFir"
                  :columnData="columnDataTabF"
                  :noSelects="true"
                  :pages="pages"
                  @currentChange="currentChangeF"
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
                        <DropdownItem name="ReviewClickF" align="center">审核</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </template>
                </el-table-column>
                </DataTable>
              </div>
            </el-tab-pane>
            <el-tab-pane name="second" label="已完成需求申请">
              <div class="lefts">
                <input type="text" placeholder="按名称搜索" v-model="productReqNameHave" />
                <span class="serachBtn" @click="handleSearchHave()">搜索</span>
                <Button type="warning" @click="formResetHave()">重置</Button>
              </div>
              <div class="list-apadd">
                <DataTable
                  :tableData="gridDataTabSec"
                  :columnData="columnDataTabS"
                  :noSelects="true"
                  :pages="pagesHave"
                  @currentChange="currentChangeS"
                >
                  <el-table-column show-overflow-tooltip label="操作" align="center">
                  <template slot-scope="scope">
                    <Dropdown transfer trigger="click" @on-click="moreOption(scope.$index,scope.row, $event)">
                      <Button>
                        更多操作
                        <Icon type="md-arrow-dropdown" />
                      </Button>
                      <DropdownMenu slot="list">
                        <DropdownItem name="lookClickS" align="center">查看</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </template>
                </el-table-column>
                </DataTable>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <el-dialog title="产品需求审核" :close-on-click-modal="false" :visible.sync="ObtainVisable" width="60%" height="550px">
        <div class="bigBox">
          <el-form ref="form" :model="form" label-width="120px">
            <div>
              <el-form-item label-width="120px" label="申请人" oninput="if(value.length>10)value=value.slice(0,10)" :required="true" :visible.sync="ReviewVisable">
                <el-input v-model="form.applicantName" placeholder="请输入" :disabled="isdisabledFn"></el-input>
              </el-form-item>
              <el-form-item label-width="120px" label="产品需求名称" :required="true" :visible.sync="ReviewVisable">
                <el-input v-model="form.productReqName" placeholder="请输入" :disabled="isdisabledFn"></el-input>
              </el-form-item>
              <el-form-item label-width="120px" label="产品需求类型" :required="true">
                <el-checkbox-group v-model="form.productReqType" @change="checkChange">
                  <el-checkbox
                    v-for="item in citiesLook"
                    :label="item.code"
                    :key="item.code"
                    :disabled="isdisabledFn"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label-width="120px" label="产品需求描述" :required="true">
                <el-input
                  type="textarea"
                  oninput="if(value.length>120)value=value.slice(0,120)"
                  v-model="form.productDescription"
                  :disabled="isdisabledFn"
                  :autosize="{ minRows: 4, maxRows: 4}"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="120px" label="附件材料" :required="true">
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
              <el-form-item label-width="120px" label="联系人电话" :required="true">
                <el-input
                  v-model="form.applicantPhone"
                  placeholder="请输入11位手机号"
                  :maxlength="11"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  :disabled="isdisabledFn"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="120px" label="期望完成时间" :required="true">
                <el-col :span="11">
                  <el-date-picker
                    :disabled="isdisabledFn"
                    v-model="form.expectedEndTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="12:00:00"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label-width="120px" label="申请时间" :visible.sync="ReviewVisable">
                <el-col :span="11">
                  <el-date-picker
                    :disabled="isdisabledFn"
                    v-model="form.applicationTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="12:00:00"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
            </div>
            <div class="boxBox" v-if="lookShow">
              <div>
                <div class="bomTop">审批意见信息</div>
                <div style="margin-left:13%">
                  <el-radio-group v-model="approvalStatus" @change="radioClick">
                    <el-radio :label="1">通过</el-radio>
                    <el-radio :label="0">不通过</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="bomCenter">
                <div class="ReviewDesc">
                  <div>审核意见</div>
                  <div style="width:600px">
                    <el-input
                      type="textarea"
                      v-model="checkOpinion"
                      :autosize="{ minRows: 4, maxRows: 4}"
                    ></el-input>
                  </div>
                </div>
              </div>
              <div class="bomBom">
                <div v-if="lookShow">
                  <el-button type="primary" @click="SaveSubmit">提交</el-button>
                  <el-button @click="closeDialong">取消</el-button>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { deleteStateByFileId } from "@/api/dataServices/index";
import { appServer } from "@/api/appServer";
import { updateStateByFileId } from "@/api/standard/stdFile/stdFile";
import {
  findDemandProcessPage,
  findDemandProcessDonePage,
  LookDemand,
  approvalDemand,
} from "@/api/produceManagement/index";
export default {
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
      tabName: "",
      ObtainVisable: false,
      ReviewVisable: true,
      isdisabledFn: true,
      lookShow: false,
      approvalStatus: 1,
      productRequirementsId: "",
      productid: "",
      checkOpinion: "",
      productReqName: "",
      productReqNameHave:"",
      defaultValue: "first",
      ReviewLookId: "",
      processTaskId:"",
      saveParams: {},
      ReviewLookIdList: [],
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
      form: {
        applicantName: "",
        applicantPhone: "",
        productReqType: [],
        productDescription: "",
        fileName: "",
        productReqName: "",
        expectedEndTime: "",
        applicationTime: "",
      },
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
      gridDataTabFir: [],
      gridDataTabSec: [],
      columnDataTabS: [
        {
          dataKey: "productReqName",
          name: "产品名称",
        },
        {
          dataKey: "productReqCode",
          name: "产品需求编号",
        },
        {
          dataKey: "productReqType",
          name: "产品分类",
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
          dataKey: "checkTime",
          name: "审批日期",
        },
        {
          dataKey: "checkUserName",
          name: "审批人",
        },
        {
          dataKey: "checkStatus",
          name: "审批状态",
        },
      ],
      columnDataTabF: [
        {
          dataKey: "productReqName",
          name: "需求产品名称",
        },
        {
          dataKey: "productReqCode",
          name: "产品需求编号",
        },
        {
          dataKey: "productReqType",
          name: "产品分类",
        },
        {
          dataKey: "productDescription",
          name: "产品描述",
        },
        {
          dataKey: "applicantName",
          name: "申请人",
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
          dataKey: "warnStatus",
          name: "预警状态",
        },
      ],
    };
  },
  created() {
    this.findDemandProcessPage();
  },
  mounted() {},
  methods: {
    moreOption(index, obj, name) {
      console.log(name)
      if (name == "LookDemand") {
        this.LookDemand(obj);
      }
      if (name == "ReviewClickF") {
        this.ReviewClickF(obj);
      }
      if (name == "lookClickS") {
        this.LookDemand(obj);
      }
    },
    // 列表请求
    findDemandProcessPage() {
      let params = {
        productName: this.productReqName,
        queryConditionBean: {
          pageNum: this.pages.currentPage,
          pageSize: this.pages.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        findDemandProcessPage(params)
          .then((res) => {
            this.gridDataTabFir = res.data.resultData.list;
            this.pages.total = res.data.resultData.totalCount;
            this.pages.currentPage = res.data.resultData.pageNum;
            this.pages.pageSize = res.data.resultData.pageSize;
            this.ReviewLookIdList = res.data.resultData.list;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    findDemandProcessDonePage() {
      let params = {
        productName: this.productReqNameHave,
        queryConditionBean: {
          pageNum: this.pagesHave.currentPage,
          pageSize: this.pagesHave.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        findDemandProcessDonePage(params)
          .then((res) => {
            this.gridDataTabSec = res.data.resultData.list;
            this.pagesHave.total = res.data.resultData.totalCount;
            this.pagesHave.currentPage = res.data.resultData.pageNum;
            this.pagesHave.pageSize = res.data.resultData.pageSize;
            this.ReviewLookIdList = res.data.resultData.list;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //TAB页切换
    cutoverForm(tab, event) {
      console.log(tab, event);
      this.tabName = tab.name;
      if (this.tabName == "first") {
        this.first();
      } else {
        this.second();
      }
    },
    first() {
      this.findDemandProcessPage();
      console.log("我是first");
    },
    second() {
      this.findDemandProcessDonePage();
      console.log("我是second");
    },
    //复选框
    checkChange(val) {
      console.log(val);
    },
    // 查看
    LookDemand(row) {
      this.ObtainVisable = true;
      this.ReviewVisable = true;
      this.lookShow = false;
      const obj = this.ReviewLookIdList.find((item) => {
        return item.id === row.id;
      });
      this.ReviewLookId = row.productRequirementsId;
      new Promise((resolve, reject) => {
        LookDemand({ id: this.ReviewLookId })
          .then((res) => {
            const str = res.data.resultData.productReqType;
            this.form.productReqType = str.split(",", 3);
            this.form.applicantName = res.data.resultData.applicantName;
            this.form.applicantPhone = res.data.resultData.applicantPhone;
            this.form.productDescription = res.data.resultData.productDescription;
            this.form.fileName = res.data.resultData.fileName;
            this.form.productReqName = res.data.resultData.productReqName;
            this.form.expectedEndTime = res.data.resultData.expectedEndTime;
            this.form.applicationTime = res.data.resultData.applicationTime;
            resolve();
            console.log("查看详情");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //审核
    ReviewClickF(row) {
      this.LookDemand(row);
      this.approvalStatus = "";
      this.checkOpinion = "";
      this.ReviewVisable = false;
      this.lookShow = true;
      this.productRequirementsId = row.productRequirementsId;
      this.productid = row.id;
      this.processTaskId = row.processTaskId;
    },
    // 单选
    radioClick(val) {
      console.log(val);
      this.approvalStatus = val;
    },
    closeDialong() {
      this.ObtainVisable = false;
      this.approvalStatus = "";
      this.checkOpinion = "";
    },
    //审核提交
    SaveSubmit() {
      this.saveParams = {
        approvalStatus: this.approvalStatus,
        checkOpinion: this.checkOpinion,
        productRequirementsId: this.productRequirementsId,
        id: this.productid,
        taskId:this.processTaskId,
      };
      new Promise((resolve, reject) => {
        approvalDemand(this.saveParams)
          .then((res) => {
            if (res.data.resultCode === 0) {
              this.$message.success("提交成功");
              this.findDemandProcessPage();
              this.ObtainVisable = false;
              this.approvalStatus = "";
              this.checkOpinion = "";
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
              this.$message.error(res.data.resultMsg)
            }
          });
          deleteStateByFileId(params2).then((res) => {
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
    //分页
    currentChangeF(e) {
      this.pages.currentPage = e;
      this.findDemandProcessPage();
    },
    //分页
    currentChangeS(e) {
      this.pagesHave.currentPage = e;
      this.findDemandProcessDonePage();
    },
    // 搜索
    handleSearch() {
        this.first();
    },
    handleSearchHave(){
      this.second()
    },
    // 重置
    formReset() {
      this.productReqName = "";
      this.handleSearch();
    },
    formResetHave() {
      this.productReqNameHave = "";
      this.handleSearchHave();
    },
  },
  watch: {
    activeName: function (val) {
      let urlStr = "/index/test?tabid=" + val;
      this.$router.push(urlStr);
    },
  },
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
    height: 800px;
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
.boxBox {
  width: 100%;
  height: 200px;
  border-top: 2xp solid black;
}
.bomTop {
  font-size: 20px;
  color: black;
  margin-bottom: 10px;
}
.bomCenter {
  margin-left:13%;
  margin-top: 10px;
  .ReviewDesc {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
}
.bomBom {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
