<template>
  <div>
    {{contents}}
    <div v-for="(item, index) in contents" :key="index" style="padding-left:20%;padding-right:20%;">
      <el-card>
        <img :src="item.pic" class="image" />
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <el-button type="danger" class="button2" @click="deleteContent(item)">删除按钮</el-button>
            <el-button
              type="primary"
              class="button"
              @click="dialogFormVisible = true;currentContent=item"
            >操作按钮</el-button>
            <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
              <el-form>
                <el-form-item label="图片标题" :label-width="formLabelWidth">
                  <el-input auto-complete="off" v-model="currentContent.title"></el-input>
                </el-form-item>
                <el-form-item label="图片链接指向" :label-width="formLabelWidth">
                  <el-input auto-complete="off" v-model="currentContent.url"></el-input>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth">
                  <el-input auto-complete="off" v-model="currentContent.pic"></el-input>
                </el-form-item>
                <el-form-item label="图片排序" :label-width="formLabelWidth">
                  <el-input auto-complete="off" v-model="currentContent.sort_order"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateContent">确 定 修 改</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-card>
    </div>
    <div style="padding:20%;">
      <h1>添加图片</h1>
      <el-card>
        <el-form label-width="80px">
          <el-form-item label="图片标题" :label-width="formLabelWidth">
            <el-input auto-complete="off" v-model="newContent.title"></el-input>
          </el-form-item>
          <el-form-item label="图片链接指向" :label-width="formLabelWidth">
            <el-input auto-complete="off" v-model="newContent.url"></el-input>
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-input auto-complete="off" v-model="newContent.pic"></el-input>
          </el-form-item>
          <el-form-item label="图片排序" :label-width="formLabelWidth">
            <el-input auto-complete="off" v-model="newContent.sort_order"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-button type="primary" @click="save">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import contentApi from "~/api/content.js";

export default {
  created() {
    contentApi.getList().then(res => {
      if (res.data.flag) {
        this.contents = res.data.data;
      }
    });
  },
  data() {
    return {
      contents: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
      currentContent: {},
      newContent: {}
    };
  },
  methods: {
    save() {
      contentApi.save(this.newContent).then(res => {
        if (res.data.flag) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          window.reload();
        } else {
          this.$message({
            message: "添加失败",
            type: "error"
          });
        }
      });
    },
    deleteContent(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          contentApi.deleteById(item.id).then(res => {
            if (res.data.flag) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              contentApi.getList().then(res => {
                if (res.data.flag) {
                  this.contents = res.data.data;
                }
              });
            } else {
              this.$message({
                message: "删除失败",
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    updateContent() {
      contentApi
        .update(this.currentContent.id, this.currentContent)
        .then(res => {
          if (res.data.flag) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialogFormVisible = false;
          } else {
            this.$message({
              message: "修改失败",
              type: "error"
            });
          }
        });
    },
    jump(url) {
      let routeUrl = this.$router.resolve({
        path: url
      });
      window.open(routeUrl.href, "_blank");
    }
  }
};
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
</style>