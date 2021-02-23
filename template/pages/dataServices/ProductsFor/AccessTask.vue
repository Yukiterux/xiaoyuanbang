<template>
  <div class="list-apadd">
    <div class="formtable-con">
      <div class="formtab-main">
        <div class="tab-lista fn-clear">
          <div class="lefts">
            <input type="text" placeholder="按名称搜索" v-model="demandName" />
            <span class="serachBtn" @click="handleSearch()">搜索</span>
            <Button type="warning" @click="formReset()">重置</Button>
          </div>
          <div class="rights">
            <el-button @click="ProductApply()" type="primary" size="mini">产品获取申请</el-button>
          </div>
        </div>
        <div class="list-apadd">
          <DataTable
            :tableData="gridData"
            :columnData="columnData"
            :noSelects="true"
            :pages="pages"
            @currentChange="currentChange"
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
                      </DropdownMenu>
                    </Dropdown>
                  </template>
                </el-table-column>
          </DataTable>
        </div>
      </div>
    </div>
    <el-dialog title="产品获取申请" :close-on-click-modal="false" :visible.sync="ObtainVisable" width="80%" height="800px">
      <div class="bigBox">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="产品名称">
            <el-select
              v-model="form.productName"
              @change="TechnicalChange"
              placeholder="请选择项目"
              oninput="if(value.length>50)value=value.slice(0,50)"
              :disabled="disabledLook"
            >
              <el-option
                v-for="item in productNameList"
                :key="item.id"
                :label="item.productName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期望完成时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="form.plannedEndTime"
                style="width: 100%;"
                :disabled="disabledLook"
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
            <el-input type="textarea" v-model="form.productDescription" :disabled="true"></el-input>
          </el-form-item>
          <div style="display:flex">
            <div style="width:45%">
              <el-form-item label="发布人">
                <el-input v-model="form.releaseUserName" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="附件材料">
                <div class="item3">
                  <el-link type="primary" @click="downloads(form.fileId)">{{form.fileName}}</el-link>
                </div>
              </el-form-item>
              <el-form-item label="申请人">
                <el-input v-model="form.applicantName" oninput="if(value.length>10)value=value.slice(0,10)" :disabled="disabledLook"></el-input>
              </el-form-item>
              <el-form-item label="申请时间" :disabled="disabledLook">
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
            </div>
            <div style="width:45%">
              <el-form-item label="发布时间">
                <el-input v-model="form.releaseTime" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="申请名称">
                <el-input v-model="form.applicationName" :disabled="disabledLook"></el-input>
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
            </div>
          </div>
          <div>
            <el-form-item label="申请原因">
              <el-input type="textarea" oninput="if(value.length>120)value=value.slice(0,120)" v-model="form.applicationReason" :disabled="disabledLook" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
            </el-form-item>
          </div>
          <el-form-item style="margin-left:25%;margin-top:20px" v-if="SureVisable">
            <el-button type="primary" @click="onSubmit">申请</el-button>
            <el-button @click="closeDialong">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { appServer } from "@/api/appServer";
import { updateStateByFileId } from "@/api/standard/stdFile/stdFile";
import {
  ProductObtain,
  ProductApplication,
  selectApplicable,
  saveProductObtain,
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
      productNameList: [], //产品申请弹窗下拉数组
      checkboxList: ["API", "文档", "缓存"],
      productObtainId: "", //详情ID
      productOrderId: "", //产品申请弹窗下拉数据id
      ObtainVisable: false,
      disabledLook: false,
      SureVisable: true,
      demandName: "",
      productId: "",
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
        productName: "",
        applicationTime: "",
        applicationReason: "",
        applicationName: "",
        applicantName: "",
      },
      pages: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
      gridData: [],
      columnData: [
        {
          dataKey: "productObtainCode",
          name: "获取编号",
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
          dataKey: "productTypeName",
          name: "产品分类",
        },
        {
          dataKey: "productDescription",
          name: "产品描述",
        },
        {
          dataKey: "releaseTime",
          name: "发布日期",
        },
        {
          dataKey: "applicationTime",
          name: "申请日期",
        },
        {
          dataKey: "applicationStatus",
          name: "申请状态",
        },
        {
          dataKey: "applicantName",
          name: "申请人",
        },
      ],
    };
  },
  created() {
    this.ProductObtain();
  },
  mounted() {},
  methods: {
    moreOption(index, obj, name) {
      console.log(name)
      if (name == "lookClick") {
        this.lookClick(obj);
      }
    },
    // 列表请求
    ProductObtain() {
      let params = {
        productName: this.demandName,
        queryConditionBean: {
          pageNum: this.pages.currentPage,
          pageSize: this.pages.pageSize,
        },
      };
      new Promise((resolve, reject) => {
        ProductObtain(params)
          .then((res) => {
            this.gridData = res.data.resultData.list;
            this.pages.total = res.data.resultData.totalCount;
            this.pages.currentPage = res.data.resultData.pageNum;
            this.pages.pageSize = res.data.resultData.pageSize;
            this.productId = res.data.resultData.id;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 产品获取申请
    ProductApply() {
      (this.ObtainVisable = true),
        (this.SureVisable = true),
        (this.disabledLook = false),
        (this.form.applicantPhone = ""),
        (this.form.productTypeArray = ""),
        (this.form.productDescription = ""),
        (this.form.fileName = ""),
        (this.form.releaseTime = ""),
        (this.form.releaseUserName = ""),
        (this.form.plannedEndTime = ""),
        (this.form.productName = ""),
        (this.form.applicationTime = ""),
        (this.form.applicationReason = ""),
        (this.form.applicationName = ""),
        (this.form.applicantName = "");
      new Promise((resolve, reject) => {
        selectApplicable()
          .then((res) => {
            this.productNameList = res.data.resultData;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 弹窗下拉列表数据
    TechnicalChange(val) {
      this.productOrderId = val;
      console.log(val);
      const obj = this.productNameList.find((item) => {
        //这里的productNameList就是上面遍历的数据源
        return item.id === val; //筛选出匹配数据
      });
      this.form.releaseUserName = obj.releaseUserName;
      this.form.fileName = obj.fileName;
      this.form.productTypeArray = obj.productTypeArray;
      this.form.productDescription = obj.productDescription;
      this.form.releaseTime = obj.releaseTime
    },
    // 产品创建
    onSubmit() {
      const params = {
        productOrderId: this.productOrderId,
        applicationName: this.form.applicationName,
        applicantName: this.form.applicantName,
        applicationTime: this.form.applicationTime,
        applicationReason: this.form.applicationReason,
        plannedEndTime: this.form.plannedEndTime,
        applicantPhone: this.form.applicantPhone,
      };
      new Promise((resolve, reject) => {
        saveProductObtain(params)
          .then((res) => {
            if (res.data.resultCode == 0) {
              this.ProductObtain();
              this.ObtainVisable = false;
              this.$message.success("创建成功");
            } else {
              this.$message.error(res.data.resultMsg);
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
      console.log("submit!");
    },
    closeDialong() {
      this.ObtainVisable = false;
    },
    lookClick(row) {
      (this.ObtainVisable = true),
        (this.SureVisable = false),
        (this.disabledLook = true),
        console.log(row);
      new Promise((resolve, reject) => {
        selectProductObtainById({ id: row.id })
          .then((res) => {
            this.form.applicantPhone = res.data.resultData.applicantPhone;
            this.form.productName = res.data.resultData.productName;
            this.form.productTypeArray = res.data.resultData.productTypeArray;
            this.form.productDescription =
              res.data.resultData.productDescription;
              this.form.fileId = res.data.resultData.fileId;
            this.form.fileName = res.data.resultData.fileName;
            this.form.releaseTime = res.data.resultData.releaseTime;
            this.form.releaseUserName = res.data.resultData.releaseUserName;
            this.form.plannedEndTime = res.data.resultData.plannedEndTime;
            this.form.applicationTime = res.data.resultData.applicationTime;
            this.form.applicationReason = res.data.resultData.applicationReason;
            this.form.applicationName = res.data.resultData.applicationName;
            this.form.applicantName = res.data.resultData.applicantName;
            resolve();
            console.log("查看详情");
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
    // 搜索
    handleSearch() {
      this.ProductObtain();
    },
    // 重置
    formReset() {
      this.demandName = "";
      this.handleSearch();
    },
    //分页
    currentChange(e) {
      this.pages.currentPage = e;
      this.ProductObtain();
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
</style>
