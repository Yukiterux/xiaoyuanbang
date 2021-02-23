<template>
  <div>

    <el-form label-width="180px">
      <el-form-item label="请输入身份证号">
        <el-input
          placeholder="身份证号"
          v-model="user.id_card"
          class="mymargin"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="请输入姓名">
        <el-input
          placeholder="姓名"
          v-model="user.name"
          class="mymargin"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="上传本人手持身份证照片">
        
<el-upload
ref="upload"
  class="avatar-uploader"

  action="fakeaction"
  
  :show-file-list="false"
  :http-request="uploadSectionFile"
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
      </el-form-item>

      <el-form-item label="点击进行下一步">
        <el-button
          type="primary"
          style="float:left;"
          @click.prevent="apply()"
        >确认申请</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>


<script>
import userApi from "~/api/user.js";
import ossApi from "~/api/oss.js";
export default {
  created() {},
  data() {
    return {
      user: {},
      imageUrl: ""
    };
  },
  methods: {
    apply(){
        userApi
        .apply(this.user)
        .then(res => {
          //自行处理各种情况
          if (res.data.flag) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            location.href='/user/info'
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
       })
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    uploadSectionFile(params) {
      const file = params.file,
        fileType = file.type,
        isImage = fileType.indexOf("image") != -1,
        isLt2M = file.size / 1024 / 1024 < 2;
      // 这里常规检验，看项目需求而定
      if (!isImage) {
        this.$message.error("只能上传图片格式png、jpg、gif!");
        return;
      }
      if (!isLt2M) {
        this.$message.error("只能上传图片大小小于2M");
        return;
      }
      // 根据后台需求数据格式
      const form = new FormData();
      // 文件对象
      form.append("file", file);
      // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
      form.append("clientType", "xxx");
      // 项目封装的请求方法，下面做简单介绍
      ossApi
        .upload(form)
        .then(res => {
          //自行处理各种情况
          if (res.data.flag) {
            this.imageUrl = res.data.data;
            this.user.idcard_address=res.data.data
            this.$message({
              message: res.data.message,
              type: "success"
            });
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(() => {
          // xxx
        });
    }
  }
};
</script>

<style>
</style>



