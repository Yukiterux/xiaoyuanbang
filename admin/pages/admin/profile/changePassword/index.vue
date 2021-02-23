<template>
  <div>
    <el-form label-width="180px">

      <el-form-item label="修改密码">

      </el-form-item>
      <el-form-item label="原密码">
        <el-input
          placeholder="密码"
          v-model="pojo.password"
          type="password"
          class="mymargin"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          placeholder="密码"
          v-model="pojo.newPassword"
          type="password"
          class="mymargin"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input
          placeholder="密码"
          v-model="repassword"
          type="password"
          class="mymargin"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="float:left;"
          @click.prevent="changePassword()"
        >确认修改</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>


<script>
import adminApi from "~/api/admin.js";
import ossApi from "~/api/oss.js";
import Auth from "@/utils/auth";
export default {
  data() {
    return {
      pojo: {},
      repassword: ""
    };
  },
  methods: {
    changePassword() {
      if (this.pojo.newPassword != this.repassword) {
        this.$message({
          message: "两次密码输入不一致",
          type: "error"
        });
      }else{
        adminApi.updatePassword(this.pojo).then(res => {
              if(res.data.flag){  
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    })
                    location.href='/admin/profile'
                    
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            })
      }
    }
  }
};
</script>




