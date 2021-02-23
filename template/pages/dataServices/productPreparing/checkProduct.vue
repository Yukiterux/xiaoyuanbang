<template>
  <div class="formInfo">
    <slot name="header"></slot>
    <div v-show="active==0">
      <el-form ref="form" :model="form" label-width="100px" :rules="!disabled ? rules : {}">
        <el-form-item label="产品名称" class="item1" prop="productName">
          <el-input v-model="form.productName" :disabled="disabled" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="产品需求类型">
          <el-checkbox-group v-model="form.productTypeName">
            <el-checkbox label="API" name="type" :disabled="disabled"></el-checkbox>
            <el-checkbox label="文档" name="type" :disabled="disabled"></el-checkbox>
            <el-checkbox label="缓存" name="type" :disabled="disabled"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="产品描述" prop="productDescription">
          <el-input
            type="textarea"
            v-model="form.productDescription"
            :disabled="disabled"
            maxlength="120"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品文档" class="taskfile" prop="fileName">
          <div class="item3">
            <el-link type="primary" @click="downloads(form.fileId)">{{form.fileName}}</el-link>
            <el-button
              type="danger"
              size="mini"
              @click="detailFile(form)"
              v-if="del && !disabled && form.fileName"
            >删除</el-button>
            <el-upload
              v-if="!disabled"
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
        <div class="itemWarp">
          <el-form-item label="联系人" v-if="!disabled" prop="productOwner">
            <el-input v-model="form.productOwner" :disabled="disabled" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" v-if="!disabled" prop="productOwnerPhone">
            <el-input v-model.number="form.productOwnerPhone" maxlength="11" :disabled="disabled"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="未通过意见" v-if="this.checkActive == 5">
          <el-input
            type="textarea"
            v-model="form.acceptOpinion"
            maxlength="120"
            :disabled="!disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="发布者" v-if="disabled" v-show="form.releaseUserName">
          <el-input v-model="form.releaseUserName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" v-if="disabled" v-show="form.releaseUserName">
          <!-- <el-col :span="11"> -->
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.releaseTime"
            style="width: 100%;"
            :disabled="disabled"
          ></el-date-picker>
          <!-- </el-col> -->
          <!-- <el-col class="line" :span="2">-</el-col> -->
          <!-- <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.releaseTime"
              style="width: 100%;"
              :disabled="disabled"
            ></el-time-picker>
          </el-col>-->
        </el-form-item>
        <el-form-item label="承诺完成时间" v-if="disabled" class="endTime">
          <!-- <el-col :span="10"> -->
          <el-date-picker
            type="date"
            placeholder
            v-model="form.committedEndTime"
            style="width: 100%;"
            :disabled="disabled"
          ></el-date-picker>
          <!-- </el-col> -->
          <!-- <el-col class="line" :span="2">-</el-col> -->
          <!-- <el-col :span="10">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.releaseTime"
              style="width: 100%;"
              :disabled="disabled"
            ></el-time-picker>
          </el-col>-->
        </el-form-item>
        <div v-if="disabled && this.flowImgView.length>0">
          <p>流程图</p>
          <img style="width:100%" :src="this.flowImgView" />
        </div>
        <el-form-item v-if="actives==5" label="已办流程列表"></el-form-item>
        <div v-if="actives==5">
          <DataTable
            :tableData="transactionDetail"
            :columnData="columnData"
            :noSelects="true"
            :nopages="true"
          />
        </div>
      </el-form>
    </div>
    <div v-show="active==1">
      <span>选择业务流程：</span>
      <el-select v-model="value" placeholder="请选择业务流程" @change="getFlowimg">
        <el-option v-for="item in form.defId" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <div v-if="this.flowImg.length>0">
        <img style="width:100%" :src="this.flowImg" />
      </div>
    </div>
    <div v-show="active==2">
      <el-form ref="form2" :model="form" :rules="rules" label-width="120px">
        <div class="itemWarp">
          <el-form-item label="期望完成日期">
            <el-input v-model="form.plannedEndTime" :disabled="!disabled"></el-input>
          </el-form-item>
          <el-form-item label="承诺完成日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.committedEndTime"
              style="width: 100%;"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :disabled="disabled"
            ></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="业务流程">
          <el-input v-model="this.value2" :disabled="!disabled"></el-input>
        </el-form-item>
        <el-table :data="this.form.orderConfigRequests" stripe style="width: 90%" class="tableFlow">
          <el-table-column prop="name" label="环节名称" width="150"></el-table-column>
          <el-table-column fixed="right" label="交付时间" align="center">
            <template slot-scope="scope">
              <el-date-picker
                type="date"
                placeholder="选择交付日期"
                v-model="scope.row.documentation"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="disabled"
              ></el-date-picker>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <div v-show="active==3">
      <span>选择任务完成人：</span>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <slot name="transaction"></slot>
    <slot></slot>
  </div>
</template>

<script>
// import { downLoad } from "@/api/dataServices/index"
import {
  deleteStateByFileId,
  getFlowImg,
  getFlowInfo,
} from "@/api/dataServices/index";
import { appServer } from "@/api/appServer";
import { updateStateByFileId } from "@/api/standard/stdFile/stdFile";
  const cityOptions = ["张三", "李四", "王五", "刘六"];
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
      value: "",
      value2: "",
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,
      del: true,
      flowImg: "",
      //   flowinfo: [], //流程节点信息
      plannedEndTime: {},
      columnData: [
        {
          dataKey: "flowNodeName",
          name: "环节名称",
        },
        {
          dataKey: "plannedEndTime",
          name: "预计交付时间",
        },
        {
          dataKey: "checkUserName",
          name: "审核人",
        },
        {
          dataKey: "checkTime",
          name: "审核时间",
        },
        {
          dataKey: "checkStatus",
          name: "审批状态",
        },
        {
          dataKey: "checkOpinion",
          name: "审批意见",
        },
      ],
      orderProcessList: [],
      rules: {
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
        ],
        productDescription: [
          { required: true, message: "请输入产品描述", trigger: "blur" },
        ],
        fileName: [
          { required: true, message: "请上传产品文档", trigger: "blur" },
        ],
        productOwner: [
          { required: true, message: "请填写联系人", trigger: "blur" },
        ],
        productOwnerPhone: [
          { required: true, message: "请填写联系电话", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Number,
      default: 0,
    },
    actives: {
      type: Number,
      default: 0,
    },
    typefile: {
      type: String,
      default: "",
    },
    flowImgView: {
      type: String,
      default: "",
    },
    transactionDetail: {
      type: Array,
      default: () => [],
    },
    checkActive: {
      type: Number,
      default: 0,
    },
  },
  created() {
  },
  mounted() {},
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
      console.log("val",val)
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
        console.log("value",value)
    },
    //文件下载
    downloads(fileId) {
      if (fileId == null || fileId == "") {
        this.$message.error("附件不存在，无法下载");
      } else {
        window.location.href = `${this.path}fileDownload/${this.token}/${this.deptCode}?fileId=${fileId}`;
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
              this.form.fileName = "";
              this.form.fileId = "";
              this.del = false;
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
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
    //获取产品维护流程图
    getFlowimg() {
      //   console.log("value", this.value);
      new Promise((resolve, reject) => {
        getFlowImg({ defId: this.value })
          .then((res) => {
            this.flowImg = res.request.responseURL;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
      new Promise((resolve, reject) => {
        getFlowInfo({ defId: this.value, sourceFlag: true })
          .then((res) => {
            this.form.orderConfigRequests = res.data.data;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
      this.form.defId.forEach((element) => {
        if (element.id == this.value) {
          this.value2 = element.name;
          this.valueId = element.key;
        }
      });
      const flowList = {
        processDefinitionId: this.valueId,
        // flowinfo: this.flowinfo,
      };
      this.$emit("value", flowList);
    },
  },
};
</script>

<style lang="scss">
.formInfo {
  width: 100%;
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
  .el-form-item__content {
    // display: flex;
    // justify-content: space-around;
  }
  .endTime .el-form-item__content .el-col-10 {
    width: 45.66667%;
  }
  .itemWarp {
    display: flex;
    justify-content: space-between;
  }
  .tableFlow {
    margin-left: 5%;
  }
}
</style>