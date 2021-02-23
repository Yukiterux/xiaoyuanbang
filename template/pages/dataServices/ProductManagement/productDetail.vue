<template>
  <div class="formInfo">
    <slot name="header"></slot>
    <el-form ref="form" :model="form" label-width="120px">
      <div class="itemWarp">
        <el-form-item label="产品名称" class="item1">
          <el-input v-model="form.productName" :disabled="disabled" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="产品编号" class="item1">
          <el-input v-model="form.productCode" :disabled="disabled"></el-input>
        </el-form-item>
      </div>

      <el-form-item label="产品需求类型">
        <el-checkbox-group v-model="form.productType">
          <el-checkbox label="API" name="type" :disabled="disabled"></el-checkbox>
          <el-checkbox label="文档" name="type" :disabled="disabled"></el-checkbox>
          <el-checkbox label="缓存" name="type" :disabled="disabled"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="产品描述">
        <el-input type="textarea" v-model="form.productDescription" :disabled="disabled" maxlength="120"></el-input>
      </el-form-item>
      <el-form-item label="产品文档" class="item2">
        <el-link type="primary" @click="downloads(form.fileId)">{{form.fileName}}</el-link>
      </el-form-item>
      <el-form-item label="需求申请时间">
        <!-- <el-col :span="11"> -->
          <el-date-picker
            type="date"
            placeholder=""
            v-model="form.requirementsApplicationTime"
            style="width: 100%;"
            :disabled="disabled"
          ></el-date-picker>
        <!-- </el-col> -->
        <!-- <el-col class="line" :span="2">-</el-col> -->
        <!-- <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.requirementsApplicationTime"
            style="width: 100%;"
            :disabled="disabled"
          ></el-time-picker>
        </el-col> -->
      </el-form-item>
      <el-form-item label="期望完成时间" class="endTime">
        <!-- <el-col :span="10"> -->
          <el-date-picker
            type="date"
            placeholder=""
            v-model="form.expectedEndTime"
            style="width: 100%;"
            :disabled="disabled"
          ></el-date-picker>
        <!-- </el-col> -->
        <!-- <el-col class="line" :span="2">-</el-col> -->
        <!-- <el-col :span="10">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.expectedEndTime"
            style="width: 100%;"
            :disabled="disabled"
          ></el-time-picker>
        </el-col> -->
      </el-form-item>
      <el-form-item label="验收状态" v-show="this.checkNum == 4">
        <span class="checktype">{{form.acceptStatus}}</span>
      </el-form-item>
      <el-form-item label="验收时间" class="endTime" v-show="this.checkNum == 4">
        <!-- <el-col :span="10"> -->
          <el-date-picker
            type="date"
            placeholder=""
            v-model="form.acceptTime"
            style="width: 100%;"
            :disabled="disabled"
          ></el-date-picker>
        <!-- </el-col> -->
        <!-- <el-col class="line" :span="2">-</el-col> -->
        <!-- <el-col :span="10">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.acceptTime"
            style="width: 100%;"
            :disabled="disabled"
          ></el-time-picker>
        </el-col> -->
      </el-form-item>
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
import { appServer } from "@/api/appServer";
export default {
  data() {
    return {
      path: `http://${window.location.host}${appServer.system}`,
      token: sessionStorage.getItem("token"),
      deptCode: sessionStorage.getItem("userDeptCode"),
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    opinion: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => {},
    },
    checkNum: {
      type: Number,
      default: 0,
    },
  },
  created() {},
  methods: {
    //文件下载
    downloads(fileId) {
      window.location.href = `${this.path}fileDownload/${this.token}/${this.deptCode}?fileId=${fileId}`;
    },
  },
};
</script>

<style lang="scss">
.formInfo {
  width: 100%;
  .endTime .el-form-item__content .el-col-10 {
    width: 45.66667%;
  }
  .itemWarp {
    display: flex;
    justify-content: space-between;
  }
  .checktype {
    margin-left: -80%;
  }
}
</style>