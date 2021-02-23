<template>
  <div class="list-apadd">
    <div class="formtable-con">
      <div class="formtab-main">
        <div>
          <el-tabs @tab-click="cutoverForm" default-value="1" v-model="defaultValue">
            <el-tab-pane name="first" label="待审核产品申请">
              <div class="lefts">
                <input type="text" placeholder="按名称搜索" v-model="productName" />
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
                        <DropdownItem name="lookClick" align="center">查看</DropdownItem>
                        <DropdownItem name="ReviewClickF" align="center">审核</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </template>
                </el-table-column>
                </DataTable>
              </div>
            </el-tab-pane>
            <el-tab-pane name="second" label="已完成产品申请">
              <div class="lefts">
                <input type="text" placeholder="按名称搜索" v-model="productNameHave" />
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
                        <DropdownItem name="lookClickY" align="center">查看</DropdownItem>
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
      <el-dialog title="产品获取申请" :close-on-click-modal="false" :visible.sync="ObtainVisable" width="80%" height="800px">
        <div class="bigBox">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="期望完成时间">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  v-model="form.plannedEndTime"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="产品类型">
              <el-checkbox-group v-model="form.productTypeArray">
                <el-checkbox
                  v-for="item in checkboxList"
                  :label="item"
                  :key="item.id"
                  :disabled="true"
                >{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="产品描述">
              <el-input type="textarea" v-model="form.productDescription" oninput="if(value.length>120)value=value.slice(0,120)" :disabled="true"></el-input>
            </el-form-item>
            <div style="display:flex">
              <div style="width:45%">
                <el-form-item label="附件材料">
                <div class="item3">
                  <el-link type="primary" @click="downloads(form.fileId)">{{form.fileName}}</el-link>
                </div>
              </el-form-item>
                <el-form-item label="发布者">
                  <el-input v-model="form.releaseUserName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="发布时间">
                  <el-input v-model="form.releaseTime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="申请电话">
                  <el-input
                    v-model="form.applicantPhone"
                    placeholder="请输入11位手机号"
                    :disabled="disabledLook"
                    :maxlength="11"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  ></el-input>
                </el-form-item>
                <el-form-item label="审批意见" v-if="checkUser">
                  <el-input v-model="form.checkOpinion" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="审批时间" v-if="checkUser">
                  <el-input v-model="form.checkTime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="产品获取编号" v-if="checkSH">
                  <el-input v-model="form.productCode" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="申请状态" v-if="checkSH">
                  <el-input v-model="form.applicationStatus" :disabled="true"></el-input>
                </el-form-item>
              </div>
              <div style="width:45%">
                <el-form-item label="申请名称">
                  <el-input v-model="form.applicationName" :disabled="disabledLook"></el-input>
                </el-form-item>
                <el-form-item label="申请原因">
                  <el-input v-model="form.applicationReason" :disabled="disabledLook"></el-input>
                </el-form-item>
                <el-form-item label="申请时间">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="form.applicationTime"
                      type="datetime"
                      placeholder="选择日期时间"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      default-time="12:00:00"
                      :disabled="disabledLook"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="申请人">
                  <el-input v-model="form.applicantName" oninput="if(value.length>10)value=value.slice(0,10)" :disabled="disabledLook"></el-input>
                </el-form-item>
                <el-form-item label="审批人名称" v-if="checkUser">
                  <el-input v-model="form.checkUserName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="预警状态" v-if="checkSH">
                  <el-input v-model="form.warnStatus" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="boxBox" v-if="lookShow">
              <div>
                <div class="bomTop">审批意见信息</div>
                <div style="margin-left:5%">
                  <el-radio-group v-model="approvalStatus" @change="radioClick">
                    <el-radio :label="1">通过</el-radio>
                    <el-radio :label="0">不通过</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="bomCenter">
                <div class="ReviewDesc">
                  <div style="margin-right:10px">审核意见</div>
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
                  <el-button type="primary" @click="onSubmit">确定</el-button>
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
import { appServer } from "@/api/appServer";
import { updateStateByFileId } from "@/api/standard/stdFile/stdFile";
import {
  ProductObtain,
  ProductApplication,
  approvalObtain,
  listWaitCheck,
  listCheckedProduct,
  selectProductObtainById,
} from "@/api/dataServices/index";
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
      isdisabledFn: false,
      checkUser:false,
      checkSH:false,
      disabledLook: false,
      ObtainVisable: false,
      lookShow: false,
      productName: "",
      productNameHave:"",
      defaultValue: "first",
      tabName: "",
      checkOpinion: "", //意见描述
      approvalStatus: 1, //意见状态
      processListId: "",
      processTaskId:"",
      productObtainId: "",
      checkboxList: ["API", "文档", "缓存"],
      form: {
        fileId:"",
        applicantPhone: "",
        productTypeArray: [], //
        productDescription: "", //
        fileName: "", //
        releaseTime: "", //
        releaseUserName: "", //
        plannedEndTime: "",
        name: "",
        applicationTime: "",
        applicationReason: "",
        applicationName: "",
        applicantName: "",
        checkUserName:"",
        checkOpinion:"",
        checkTime:"",
        applicationStatus:"",
        productCode:"",
        warnStatus:"",
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
      columnDataTabF: [
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
          dataKey: "applicationTime",
          name: "申请时间",
        },
        {
          dataKey: "applicantName",
          name: "申请人",
        },
        {
          dataKey: "warnStatus",
          name: "预警状态",
        },
        {
          dataKey: "productDescription",
          name: "产品描述",
        },
      ],
      columnDataTabS: [
        {
          dataKey: "productName",
          name: "产品名称",
        },
        {
          dataKey: "productObtainCode",
          name: "产品获取编号",
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
          dataKey: "applicationTime",
          name: "申请时间",
        },
        {
          dataKey: "checkTime",
          name: "审批日期",
        },
        {
          dataKey: "checkStatus",
          name: "审批状态",
        },
        {
          dataKey: "checkUserName",
          name: "审批人",
        },
      ],
    };
  },
  created() {
    this.listWaitCheck();
  },
  mounted() {},
  methods: {
    moreOption(index, obj, name) {
      console.log(name)
      if (name == "lookClick") {
        this.lookClick(obj);
      }
      if (name == "ReviewClickF") {
        this.ReviewClickF(obj);
      }
      if (name == "lookClickY") {
        this.lookClick(obj);
      }
    },
    //待审核列表
    listWaitCheck() {
      let processPageRequest = {
        productName: this.productName,
        queryConditionBean: {
          pageNum: this.pages.currentPage,
          pageSize: this.pages.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        listWaitCheck(processPageRequest)
          .then((res) => {
            this.gridDataTabFir = res.data.resultData.list;
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
    //已审核列表
    listCheckedProduct() {
      let queryReq = {
        productName: this.productNameHave,
        queryConditionBean: {
          pageNum: this.pagesHave.currentPage,
          pageSize: this.pagesHave.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        listCheckedProduct(queryReq)
          .then((res) => {
            this.gridDataTabSec = res.data.resultData.list;
            this.pagesHave.total = res.data.resultData.totalCount;
            this.pagesHave.currentPage = res.data.resultData.pageNum;
            this.pagesHave.pageSize = res.data.resultData.pageSize;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //TAB页切换
    cutoverForm(tab, event) {
      this.tabName = tab.name;
      console.log(tab, event);
      if (this.tabName == "first") {
        this.first();
      } else {
        this.second();
      }
    },
    first() {
      this.productName = "";
      this.listWaitCheck();
      console.log("我是first");
    },
    second() {
      this.productNameHave = "";
      this.listCheckedProduct();
      console.log("我是second");
    },

    // 查看
    lookClick(row) {
      (this.ObtainVisable = true),
        (this.disabledLook = true),
        (this.lookShow = false);
        if (this.tabName == "second"){
          console.log(this.tabName)
          this.checkUser = true
          this.checkSH = false
        }else{
          this.checkUser = false
          this.checkSH = true
        }
      console.log(row);
      new Promise((resolve, reject) => {
        selectProductObtainById({ id: row.productObtainId })
          .then((res) => {
            this.form.applicantPhone = res.data.resultData.applicantPhone;
            this.form.productTypeArray = res.data.resultData.productTypeArray;
            this.form.productDescription = res.data.resultData.productDescription;
            this.form.fileName = res.data.resultData.fileName;
            this.form.releaseTime = res.data.resultData.releaseTime;
            this.form.releaseUserName = res.data.resultData.releaseUserName;
            this.form.plannedEndTime = res.data.resultData.plannedEndTime;
            this.form.applicationTime = res.data.resultData.applicationTime;
            this.form.applicationReason = res.data.resultData.applicationReason;
            this.form.applicationName = res.data.resultData.applicationName;
            this.form.applicantName = res.data.resultData.applicantName;
            this.form.checkUserName = res.data.resultData.processList[0].checkUserName;
            this.form.checkOpinion = res.data.resultData.processList[0].checkOpinion;
            this.form.checkTime = res.data.resultData.processList[0].checkTime;
            this.form.applicationStatus = res.data.resultData.applicationStatus;
            this.form.fileId = res.data.resultData.fileId;
            this.form.productCode = res.data.resultData.productCode;
            this.form.warnStatus = res.data.resultData.warnStatus;
            resolve();
            console.log("查看详情");
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 意见选择
    radioClick(val) {
      console.log(val);
      this.approvalStatus = val;
    },
    //审核
    ReviewClickF(row) {
      (this.ObtainVisable = true), (this.disabledLook = true);
      this.lookShow = true;
      this.checkUser = false
      this.checkSH = false
      this.productObtainId = row.productObtainId;
      this.processListId = row.id;
      this.processTaskId = row.processTaskId;
      new Promise((resolve, reject) => {
        selectProductObtainById({ id: row.productObtainId })
          .then((res) => {
            this.form.applicantPhone = res.data.resultData.applicantPhone;
            this.form.productTypeArray = res.data.resultData.productTypeArray;
            this.form.productDescription = res.data.resultData.productDescription;
            this.form.fileName = res.data.resultData.fileName;
            this.form.releaseTime = res.data.resultData.releaseTime;
            this.form.releaseUserName = res.data.resultData.releaseUserName;
            this.form.plannedEndTime = res.data.resultData.plannedEndTime;
            this.form.applicationTime = res.data.resultData.applicationTime;
            this.form.applicationReason = res.data.resultData.applicationReason;
            this.form.applicationName = res.data.resultData.applicationName;
            this.form.applicantName = res.data.resultData.applicantName;
            this.form.fileId = res.data.resultData.fileId;
            resolve();
            console.log("查看详情");
          })
    })
    },
    closeDialong() {
      this.ObtainVisable = false,
      this.approvalStatus = "",
      this.checkOpinion = ""
    },
    // 产品审核确定
    onSubmit() {
      this.$confirm("此操作将提交该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(this.approvalStatus)
        const params = {
          applicationStatus: this.approvalStatus,
          checkOpinion: this.checkOpinion,
          productObtainId: this.productObtainId,
          id: this.processListId,
          taskId:this.processTaskId,
        };
        approvalObtain(params).then((res) => {
          if (res.data.resultData) {
            this.$message({
              type: "success",
              message: "审核成功!",
            });
            this.ObtainVisable = false;
            this.listWaitCheck();
          } else {
            this.$message({
              type: "error",
              message: "审核失败!",
            });
          }
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
          deleteStateByFileIdReq(params2).then((res) => {
            console.log(res);
          });
        })
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
      this.listWaitCheck();
    },
    //分页
    currentChangeS(e) {
      this.pagesHave.currentPage = e;
      this.listCheckedProduct();
    },
    // 搜索
    handleSearch() {
      this.listWaitCheck();
    },
    handleSearchHave(){
      this.listCheckedProduct();
    },
    // 重置
    formReset() {
      this.productName = "";
      this.handleSearch();
    },
    formResetHave() {
      this.productNameHave = "";
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
.boxBox{
  width: 100%;
  height: 200px;
  border-top: 2xp solid black;
}
.bomTop{
  font-size: 20px;
  color: black;
  margin-bottom: 10px;
}
.bomCenter{
  margin-left:5%;
  margin-top: 10px;
  .ReviewDesc{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
}
.bomBom{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
