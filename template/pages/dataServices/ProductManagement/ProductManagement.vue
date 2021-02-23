<template>
  <div class="list-apadd">
    <div class="formtable-con">
      <div class="formtab-ri1">
        <div class="tab-lista fn-clear">
          <div class="lefts">
            <input type="text" placeholder="需求名称" v-model.trim="searchPage.productName" />
            <span class="serachBtn" @click="getStandardAuditList('reset')">搜索</span>
            <Button type="warning" @click="formReset">重置</Button>
          </div>
          <div class="rights fn-clear">
            <Button icon="md-person" type="primary" @click="AddDemand" ghost>产品需求申请</Button>
          </div>
        </div>
        <div class="morelist">
          <div class="btn-group btn-grus">
            <el-button
              id="btn-task-state-0"
              type="text"
              size="small"
              class="font-size-10 btn-task-state tips-active"
              @click="btn_task_state('1')"
            >
              待办
              （
              <span style="font-weight: bold;">{{head.todoss}}</span> 条）
            </el-button>
            <el-button
              id="btn-task-state-2"
              type="text"
              size="small"
              class="font-size-10 btn-task-state tips-un-active"
              @click="btn_task_state('2')"
            >
              办理中
              （
              <span style="font-weight: bold;">{{head.doing}}</span> 条）
            </el-button>
            <el-button
              id="btn-task-state-"
              type="text"
              size="small"
              class="font-size-10 btn-task-state tips-un-active"
              @click="btn_task_state('3')"
            >
              已办结
              （
              <span style="font-weight: bold;">{{head.done}}</span> 条）
            </el-button>
          </div>
          <el-table :data="rangeStandard" border size="small" v-loading="tableLoding">
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column
              prop="productReqName"
              label="产品需求名称"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="productReqCode"
              label="产品需求编号"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="productReqType"
              label="产品需求分类"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="productDescription"
              label="产品需求描述"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="applicationTime"
              label="申请时间"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="expectedEndTime"
              label="期望完成日期"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="applicantName" label="申请人" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="checkStatus" label="状态" align="center" show-overflow-tooltip></el-table-column>
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
                    <template v-if="searchPage.status == '1'">
                      <DropdownItem v-if="btnList['查看']" name="check" align="center">查看</DropdownItem>
                      <DropdownItem v-if="btnList['修改']" name="change" align="center">修改</DropdownItem>
                      <DropdownItem v-if="btnList['删除']" name="delete" align="center">删除</DropdownItem>
                      <DropdownItem v-if="btnList['申请']" name="apply" align="center">申请</DropdownItem>
                    </template>
                    <template v-if="searchPage.status == '2'">
                      <DropdownItem name="check" align="center">查看</DropdownItem>
                    </template>
                    <template v-if="searchPage.status == '3'">
                      <DropdownItem name="check" align="center">查看</DropdownItem>
                    </template>
                  </DropdownMenu>
                </Dropdown>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            style="width:450px;margin:15px auto;"
            class="page r-nw-c-c"
            layout="total,prev,pager, next,jumper"
            :total="pages.totalCount"
            :current-page="pages.pageNum"
            :page-size="pages.pageSize"
            @current-change="pageQuery"
            >
          </el-pagination>
        </div>
      </div>
      <el-dialog title="产品需求" :close-on-click-modal="false" :visible.sync="ObtainVisable" width="50%" height="500px">
        <div class="bigBox">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="产品需求名称" :required="true">
              <el-input v-model="form.productReqName" placeholder="请输入" oninput="if(value.length>50)value=value.slice(0,50)" :disabled="isdisabledFn"></el-input>
            </el-form-item>
            <div>
              <el-form-item label="产品编码" v-if="ReqCodeShow" :required="true">
                <el-input v-model="form.productReqCode" placeholder="请输入" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="产品需求类型" :required="true">
                <el-checkbox-group v-model="form.productReqType" @change="checkChange">
                  <el-checkbox
                    v-for="item in citiesLook"
                    :label="item.code"
                    :key="item.code"
                    :disabled="isdisabledFn"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="产品需求描述" :required="true">
                <el-input
                  type="textarea"
                  oninput="if(value.length>120)value=value.slice(0,120)"
                  v-model="form.productDescription"
                  :disabled="isdisabledFn"
                ></el-input>
              </el-form-item>
              <el-form-item label="附件材料" :required="true">
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
              <el-form-item label="申请人姓名" :required="true">
                <el-input v-model="form.applicantName" oninput="if(value.length>10)value=value.slice(0,10)" :disabled="isdisabledFn"></el-input>
              </el-form-item>
              <el-form-item label="申请人电话" :required="true">
                <el-input
                  v-model="form.applicantPhone"
                  placeholder="请输入11位手机号"
                  :disabled="isdisabledFn"
                  :maxlength="11"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  :required="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="期望完成时间" :required="true">
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
              <el-form-item label="申请时间" :required="true">
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
            <el-form-item style="margin-left:25%;margin-top:20px" v-if="lookShow">
              <el-button type="primary" @click="SaveSubmit">确认</el-button>
              <el-button @click="closeDialong(form)">取消</el-button>
            </el-form-item>
            <el-form-item style="margin-left:25%;margin-top:20px" v-if="SaveShow">
              <el-button type="primary" @click="SaveSubmitClick">保存</el-button>
              <el-button @click="closeDialong(form)">取消</el-button>
            </el-form-item>
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
  findDemandPage,
  deleteDemand,
  applyDemand,
  reviseDemand,
  LookDemand,
  AddDemand,
  deleteStateByFileIdReq,
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
      lookShow: true,
      SaveShow: false,
      isdisabledFn: false,
      ReqCodeShow: true,
      ObtainVisable: false,
      tableLoding: true,
      auditVisible: false,
      auditTrigger: 0,
      releaseDialogVisible: false,
      releaseUpdateTrigger: 0,
      reviseId: "",
      applyId: "",
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
      saveParams: {},
      form: {
        applicantName: "",
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
      searchPage: {
        productName: null,
        stdCategoryCode: "",
        status: "1",
      },
      pages: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
      },
      searchForm: {
        standardNameEn: "",
      },
      rangeStandard: [],
      standardId: "",
      standardType: "",
      head: {
        todoss: null, // 待办
        doing: null, // 办理中
        done: null, // 已办结
      },
      btnList: {},
      searchFlag: "0",
      standardInfo: {},
    };
  },
  created() {
    this.getBtnList();
    this.getTabTotalNumber();
    this.getStandardAuditList();
  },
  mounted() {},
  methods: {
    async getBtnList() {
      this.btnList = await this.$util.getAuthBtn();
      console.log(this.btnList)
    },
    btn_task_state(type) {
      $(".btn-task-state").each(function () {
        $(this).removeClass("tips-active");
        $(this).addClass("tips-un-active");
      });
      $("#btn-task-state-" + type).removeClass("tips-un-active");
      $("#btn-task-state-" + type).addClass("tips-active");
      switch (type) {
        case "1": // 待办
          this.searchPage.status = "1";
          this.searchPage.productName=""
          break;
        case "2": // 办理中
          this.searchPage.status = "2";
          this.searchPage.productName=""
          break;
        case "3": // 已办结
          this.searchPage.status = "3";
          this.searchPage.productName=""
          break;
      }
      this.pages.pageNum = 1;
      this.pages.totalCount = 0;
      this.getStandardAuditList();
    },
    // 获取待审核tab列表
    getStandardAuditList(state) {
      if (state === "reset") {
        this.pages.pageNum = 1;
      }
      let params = {
        userId: sessionStorage.getItem("userId"),
        queryConditionBean: this.pages,
        productName: this.searchPage.productName,
        standardNameEn: this.searchForm.standardNameEn,
        status: this.searchPage.status,
        stdCategoryCode: this.searchPage.stdCategoryCode,
      };
      new Promise((resolve, reject) => {
        findDemandPage(params)
          .then((response) => {
            this.tableLoding = false;
            this.rangeStandard = response.data.resultData.list;
            this.pages.pageSize =
              response.data.resultData.pageSize;
            this.pages.pageNum = response.data.resultData.pageNum;
            this.pages.totalCount =
              response.data.resultData.totalCount;
            console.log(response);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    moreOption(index, row, name) {
      switch (name) {
        case "check":
          //查看
          this.LookDemand(row);
          break;
        case "apply":
          //申请
          this.ShowReview(row);
          break;
        case "delete":
          //删除
          this.deleteOption(row);
          break;
        case "change":
          this.reviseDemandLook(row);
          //修改
          break;
      }
    },
    deleteOption(row) {
      const id = row.id;
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteDemand({ id: id }).then((response) => {
          if (response.data.resultCode === 0) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败!",
            });
          }
          this.getTabTotalNumber();
          this.getStandardAuditList();
        });
      });
    },
    // 查看
    LookDemand(row) {
      this.lookShow = false;
      this.SaveShow = false;
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
            this.form.productDescription =
              res.data.resultData.productDescription;
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
    //申请
    ShowReview(row) {
      const id = row.id;
      this.$confirm("此操作将发起申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
      new Promise((resolve, reject) => {
        applyDemand({ id: id })
          .then((res) => {
            this.getStandardAuditList();
            if (res.data.resultCode === 0) {
              this.$message({
              type: "success",
              message: "申请成功!",
            });
            } else {
                this.$message.error(res.data.resultMsg)
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
      });
    },
    // 修改
    reviseDemandLook(row) {
      this.ObtainVisable = true;
      this.lookShow = false;
      this.SaveShow = true;
      this.isdisabledFn = false;
      this.reviseId = row.id;
      new Promise((resolve, reject) => {
        LookDemand({ id: this.reviseId })
          .then((res) => {
            const str = res.data.resultData.productReqType;
            this.form.productReqType = str.split(",", 3);
            this.form.applicantPhone = res.data.resultData.applicantPhone;
            this.form.applicantName = res.data.resultData.applicantName;
            this.form.productDescription =
              res.data.resultData.productDescription;
            this.form.fileName = res.data.resultData.fileName;
            this.form.productReqName = res.data.resultData.productReqName;
            this.form.expectedEndTime = res.data.resultData.expectedEndTime;
            this.form.applicationTime = res.data.resultData.applicationTime;
            this.form.productReqCode = res.data.resultData.productReqCode;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //修改保存
    SaveSubmitClick() {
      this.$confirm("此操作将修改该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const Check = this.form.productReqType;
        const joinCheck = Check.join(",");
        this.saveParams = {
          id: this.reviseId,
          applicantPhone: this.form.applicantPhone,
          applicantName: this.form.applicantName,
          productReqType: joinCheck,
          productDescription: this.form.productDescription,
          fileName: this.form.fileName,
          productReqName: this.form.productReqName,
          expectedEndTime: this.form.expectedEndTime,
          applicationTime: this.form.applicationTime,
          productReqCode: this.form.productReqCode,
        };
        if (this.form.expectedEndTime == "" || this.form.expectedEndTime == null) {
        this.$message({
          message: "请填写期望时间，再提交",
          type: "warning",
        });
      } else if (
        this.form.applicationTime == "" ||
        this.form.applicationTime == null
      ) {
        this.$message({
          message: "请填写申请时间，再提交",
          type: "warning",
        });
      } else {
        reviseDemand(this.saveParams).then((res) => {
          if (res.data.resultCode == 0 ) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.getStandardAuditList();
            this.ObtainVisable = false;
            this.form.fileName = "";
            this.del = false;
          } else {
            this.$message.error(res.data.resultMsg)
          }
        });
      }
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
    },//文件下载
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
    //产品需求申请
    AddDemand() {
      this.SaveShow = false;
      this.ObtainVisable = true;
      this.ReqCodeShow = false;
      this.isdisabledFn = false;
      this.lookShow = true;
      (this.form.applicantPhone = ""),
      (this.form.applicantName = ""),
        (this.form.productReqType = []), //
        (this.form.productDescription = ""), //
        (this.form.fileName = ""), //
        (this.form.fileId = ""),
        (this.form.productReqName = ""), //
        (this.form.productReqCode = ""),
        (this.form.expectedEndTime = ""),
        (this.form.applicationTime = "");
    },
    //新增保存
    SaveSubmit() {
      const Check = this.form.productReqType;
      const joinCheck = Check.join(",");
      const params = {
        applicantPhone: this.form.applicantPhone,
        applicantName: this.form.applicantName,
        productReqType: joinCheck,
        productDescription: this.form.productDescription,
        fileName: this.form.fileName,
        productReqName: this.form.productReqName,
        expectedEndTime: this.form.expectedEndTime,
        applicationTime: this.form.applicationTime,
        fileId: this.form.fileId,
      };
      if (this.form.fileId == "" || this.form.fileId == null) {
        this.$message({
          message: "请上传附件，再提交",
          type: "warning",
        });
      } else if (
        this.form.applicationTime == "" ||
        this.form.applicationTime == null
      ) {
        this.$message({
          message: "请填写申请时间，再提交",
          type: "warning",
        });
      } 
      else if (
        this.form.expectedEndTime == "" ||
        this.form.expectedEndTime == null
      ) {
        this.$message({
          message: "请填写期望时间，再提交",
          type: "warning",
        });
      }else {
        AddDemand(params).then((res) => {
          if (res.data.resultCode === 0) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.ObtainVisable = false;
            this.getStandardAuditList();
          } else {
            this.$message.error(res.data.resultMsg)
          }
        });
      }
    },
    closeDialong(form) {
      this.ObtainVisable = false;
    },
    pageQuery(count) {
      console.log(count)
      this.pages.pageNum = count;
      this.getStandardAuditList();
    },
    // 高级搜索弹出框
    showSearch() {
      $("#Advancedsearch").slideToggle(500);
      this.searchFlag = "0";
    },
    formReset() {
      this.searchPage.productName = "";
      this.searchForm = {};
      this.getStandardAuditList();
    },
    getTotalNumber(statusNumber) {
      let params = {
        userId: sessionStorage.getItem("userId"),
        queryConditionBean: this.pages,
        status: statusNumber,
      };
      return new Promise((resolve, reject) => {
        findDemandPage(params)
          .then((response) => {
            resolve(response.data.resultData.totalCount);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async getTabTotalNumber() {
      [this.head.todoss, this.head.doing, this.head.done] = await Promise.all([
        this.getTotalNumber("1"),
        this.getTotalNumber("2"),
        this.getTotalNumber("3"),
      ]);
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
.tips-active {
  color: #2d8cf0;
  border-bottom: 2px solid #2d8cf0;
}
.tips-un-active {
  color: #606266;
}
.btn-grus {
  margin-bottom: 8px;
  width: 100%;
  border-bottom: 2px solid #dfe4ed;
}

.activeClass {
  color: #19be6b;
}
.errorClass {
  color: #ed3f14;
}
.warningClass {
  color: #ff9900;
}
.btnClass {
  color: #2178d4;
}

.formtable-con {
  position: relative;
  .formtab-ri1 {
    // margin-left: 266px;
    background: #fff;
    height: 800px;
  }
  .tab-tit {
    overflow: hidden;
    border-bottom: 1px solid rgba(221, 226, 233, 1);
    li {
      float: left;
      width: 67px;
      margin-right: 6px;
    }

    .text-col {
      cursor: pointer;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border: 1px solid rgba(221, 226, 233, 1);
      border-bottom: none;
      border-radius: 4px 4px 0 0;
      color: rgba(44, 140, 240, 1);
      font-size: 16px;
    }
    .text-col:hover {
      background: rgba(44, 140, 240, 1);
      color: #fff;
      border: 1px solid #2c8cf0;
    }
    .active {
      background: rgba(44, 140, 240, 1);
      color: #fff;
      border: 1px solid #2c8cf0;
    }
    li:last-child {
      margin-right: 0px;
    }
  }

  .formtab-ri1 {
    position: relative;
    padding: 28px 22px 22px 22px;

    .lefts {
      float: left;
      font-size: 14px;

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

    .rights {
      float: right;

      li {
        float: left;
        padding: 4px 8px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(174, 174, 174, 1);
        font-size: 0;
        margin-left: 6px;
      }

      i,
      span {
        display: inline-block;
        vertical-align: middle;
      }

      span {
        font-size: 14px;
      }

      i {
        margin-top: -2px;
      }

      .icon0 {
        width: 12px;
        height: 12px;
        background: url(../../../../static/img/add-btn-bef.png) no-repeat;
      }

      .icon1 {
        width: 13px;
        height: 13px;
        background: url(../../../../static/img/uop-bens.png) no-repeat;
      }

      .icon2 {
        width: 13px;
        height: 13px;
        background: url(../../../../static/img/uop-bens.png) no-repeat;
      }

      .icon3 {
        width: 13px;
        height: 9px;
        background: url(../../../../static/img/submit-btn.png) no-repeat;
      }

      .icon4 {
        width: 12px;
        height: 12px;
        background: url(../../../../static/img/delete-btn.png) no-repeat;
      }

      .text1 {
        color: #0072ff;
        font-size: 14px;
      }

      .listIcon0 {
        cursor: pointer;
        border: 1px solid rgba(0, 114, 255, 1);

        .icon0 {
          background: url(../../../../static/img/add-btn.png) no-repeat;
        }

        span {
          color: #0072ff;
        }
      }

      .listIcon0:hover {
        background: #0072ff;

        .icon0 {
          background: url(../../../../static/img/add-btn-wh.png) no-repeat;
        }

        span {
          color: #fff;
        }
      }

      .listIcon1 {
        cursor: pointer;
        border: 1px solid rgba(3, 183, 181, 1);

        .icon1 {
          background: url(../../../../static/img/enters-btn.png) no-repeat;
        }

        span {
          color: #03b7b5;
        }
      }

      .listIcon1:hover {
        background: #03b7b5;

        .icon1 {
          background: url(../../../../static/img/uop-bens-wh.png) no-repeat;
        }

        span {
          color: #fff;
        }
      }

      .listIcon2 {
        cursor: pointer;
        border: 1px solid rgba(245, 160, 35, 1);

        .icon2 {
          background: url(../../../../static/img/uop-bens-san.png) no-repeat;
        }

        span {
          color: #f5a023;
        }
      }

      .listIcon2:hover {
        background: #f5a023;

        .icon2 {
          background: url(../../../../static/img/uop-bens-wh.png) no-repeat;
        }

        span {
          color: #fff;
        }
      }

      .listIcon3 {
        cursor: pointer;
        border: 1px solid rgba(0, 114, 255, 1);

        .icon3 {
          background: url(../../../../static/img/submit-btn-sub.png) no-repeat;
        }

        span {
          color: #0072ff;
        }
      }

      .listIcon3:hover {
        background: #0072ff;

        .icon3 {
          background: url(../../../../static/img/submit-btn-wh.png) no-repeat;
        }

        span {
          color: #fff;
        }
      }

      .listIcon4 {
        cursor: pointer;
        border: 1px solid rgba(224, 55, 27, 1);

        .icon4 {
          background: url(../../../../static/img/delete-btn-des.png) no-repeat;
        }

        span {
          color: #e0371b;
        }
      }

      .listIcon4:hover {
        background: #e0371b;

        .icon4 {
          background: url(../../../../static/img/delete-btn-wh.png) no-repeat;
        }

        span {
          color: #fff;
        }
      }
    }

    .ivu-tabs-bar {
      border-bottom: 1px solid #2c8cf0;
      margin-bottom: 10px;
      margin-top: 22px;
    }

    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
      border: 1px solid #2c8cf0;
      border-bottom: none;
      width: 82px;
      margin-right: 10px;
      text-align: center;
      background: #fff;
      font-size: 16px;
      padding: 4px 0;
      color: rgba(44, 140, 240, 1);
    }

    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab.ivu-tabs-tab-active {
      border: 1px solid #2c8cf0;
      border-bottom: 1px solid #2c8cf0;
      background: #2c8cf0;
      color: #fff;
    }

    .ivu-badge-count {
      box-shadow: 0 0 0;
      right: -33px;
    }

    .ivu-badge-count-alone {
      top: -31px;
      position: absolute;
    }

    .ivu-tabs-nav-scroll {
      overflow: visible;
    }

    .ivu-tabs-nav-wrap {
      overflow: visible;
    }

    .ivu-tabs-nav-container {
      overflow: visible;
    }
  }
  .morelist {
    .ivu-table-cell {
      padding: 0px;
    }

    .ivu-table td,
    .ivu-table th {
      height: 38px;
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
    }
    .ivu-table th {
      font-size: 14px;
      font-weight: bold;
      color: #000;
      background: rgba(245, 250, 255, 1);
    }
    .ivu-table td:nth-child(3) {
      .ivu-table-cell {
        padding-left: 10px;
        text-align: left;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .ivu-table td:last-child {
      .ivu-table-cell {
        span {
          cursor: pointer;
          color: #007bec;
          text-decoration: underline;
        }
      }
    }
    .ivu-page {
      margin-top: 27px;
      text-align: center;
    }
    .ivu-page-item-active {
      background: rgba(44, 140, 240, 1);
      color: #fff;
    }
    .ivu-page-item-active a,
    .ivu-page-item-active:hover a {
      background: rgba(44, 140, 240, 1);
      color: #fff;
    }
    .ivu-page-item:hover {
      background: rgba(44, 140, 240, 1);
    }
    .ivu-page-item:hover a {
      color: #fff;
    }
    .ivu-btn-primary {
      background: transparent;
      border: none;
      span:focus {
        outline: none;
        border: none;
      }
    }
    .ivu-btn-primary:focus {
      box-shadow: none;
    }
  }
  .tex-passs {
    padding-top: 10px;
    position: absolute;
    top: 56px;
    left: 22px;
    right: 22px;
    z-index: 999;
  }
  .dialog-text {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 2px 0px rgba(152, 150, 150, 0.29);
    border-radius: 4px;
    border: 1px solid rgba(223, 230, 240, 1);
    padding: 0 15px 20px 0;
    .heights {
      height: 10px;
      background: #fff;
      margin-bottom: 20px;
    }
    .ivu-form .ivu-form-item-label {
      padding: 10px 0 10px 0;
      font-size: 14px;
      color: #333;
    }
    .ivu-input {
      font-size: 14px;
    }
    .ivu-form-item {
      margin-bottom: 0px;
    }
    .querys {
      margin-top: 32px;
      text-align: center;
      span {
        display: inline-block;
        border-radius: 4px;
        cursor: pointer;
        width: 70px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #fff;
        background: #007bec;
      }
    }
  }
  .dia-hei {
    height: 150px;
    overflow: visible;
    transition: height 500ms;
  }
  .text-jiao {
    position: absolute;
    top: 2px;
    left: 23%;
    margin-left: -4px;
    height: 0px;
    width: 0px;
    border-left: 9px solid transparent;
    border-bottom: 9px solid rgba(223, 230, 240, 1);
    border-right: 9px solid transparent;
  }
  .jiao {
    position: absolute;
    top: 2px;
    left: 23%;
    margin-left: -8px;
    height: 0px;
    width: 0px;
    border-left: 8px solid transparent;
    border-bottom: 8px solid #fff;
    border-right: 8px solid transparent;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
  .resetBtn {
    z-index: 100;
    margin-left: 12px;
    height: 30px;
    line-height: 32px;
    width: 64px;
    text-align: center;
    background: rgba(3, 183, 181, 1);
    border-radius: 4px 4px 4px 4px;
    color: #fff;
    cursor: pointer;
  }
}
/deep/ .ivu-tabs-bar {
  margin-top: 0 !important;
}
</style>
