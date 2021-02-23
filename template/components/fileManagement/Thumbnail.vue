<template>
  <div class="thumbnail" @dblclick="openFile" @click="selectFile">
    <el-card class="thumbnail-card" shadow="hover" >
      <div class="thumbnail-card__content" >
        <Checkbox v-model="select"></Checkbox>
        <img class="thumbnail-card__content-image" :src="iconMap[fileFolder.icon]" />
        <span class="thumbnail-card__content-text" :title="fileFolder.folderName">{{fileFolder.folderName}}</span>
        <div class="thumbnail-card__content-info">
          <label>{{fileFolder.createTime}}</label>
          <div class="thumbnail-card__operation"> 
            <el-button type="text" class="button" @click="download()"><img src="../../assets/img/standard/download-btn-bef.png">下载</el-button>
            <Poptip placement="bottom-end" trigger="hover" width="90px">
              <label class="button" style="cursor: pointer"><i class="el-icon-more" style="margin-right: 5px"></i>操作</label>
              <div class="poptip-file-operation" slot="content">
                <el-button type="text" class="file-operation" @click="rename()" icon="el-icon-document">重命名</el-button>
                <el-button type="text" class="file-operation" @click="openCopyAndMove('copy')" icon="el-icon-document-copy">复制</el-button>
                <el-button type="text" class="file-operation" @click="openCopyAndMove('move')" icon="el-icon-folder-remove">移动</el-button>
                <el-button type="text" class="file-operation" @click="deleteFolder()" icon="el-icon-delete">删除</el-button>
              </div>
            </Poptip>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="visiable"
      title="重命名"
      :destroy-on-close="true"
      width="35%"
      :show-close="true">
      <div class="model-rname">
        <Input v-model="fname" placeholder="请输入文件名称"  />
      </div>
      <div slot="footer">
          <Button @click="closeRname()">取消</Button>
          <Button type="primary" @click="saveRename()">确定</Button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogCopyAndMove" width="500px" :title="dialogCopyAndMoveTitle" :destroy-on-close="true" :show-close="false">
      <div class="copy-move-dailog">
          <FileFolderCopyMove @confirm="submitCopyAndMove" @cancel="closeCopyAndMove" />
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import FileFolderCopyMove from './FileFolderCopyMove';
import {appServer} from '@/api/appServer';
import {getFolderTree, saveFolder, renameFileFolder, deletedFileFolder, download, moveFile, copyFile} from "@/api/dataModel/fileManagement";
export default {
  components: {
    FileFolderCopyMove,
  },
  props: {
    fileFolder:{
      type: Object,
      required: true
    },
    selectProp: {
      type: Boolean,
    }
  },
  data() {
    return {
      visiable: false,
      select: false,
      dialogCopyAndMove: false,
      dialogCopyAndMoveTitle: "",
      copyAndMove: "",
      path: 'http://' + window.location.host + appServer.file,
      fname: "",
      timer:"",
      iconMap: {
        folder: require('../../assets/img/fileManagement/folder.png'),
        ".docx": require('../../assets/img/fileManagement/docx.png'),
        ".xlsx": require('../../assets/img/fileManagement/xlsx.png'),
        ".pdf": require('../../assets/img/fileManagement/pdf.png'),
        ".pptx": require('../../assets/img/fileManagement/ppt.png'),
        ".zip": require('../../assets/img/fileManagement/zip.png'),
        ".rar": require('../../assets/img/fileManagement/rar.png'),
        ".txt": require('../../assets/img/fileManagement/txt.png'),
        ".picture": require('../../assets/img/fileManagement/photo.png'),
        "other":require('../../assets/img/fileManagement/other.png'),
      }
    };
  },
  methods: {
    download() {
      window.open(`${this.path}fileFolder/fileDownload/${sessionStorage.getItem('token')}?fileId=${this.fileFolder.folderId}`)
    },
    rename() {
      this.fname = this.fileFolder.folderName;
      this.visiable = true;
    },
    deleteFolder() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            folderId: this.fileFolder.folderId,
            deleteUser: sessionStorage.getItem("userId")
          }
          deletedFileFolder(params).then(res => {
            if (res.data.resultCode === '0000' && res.data.resultData > 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$emit('deleted');
            } else {
              this.$message({
                type: 'success',
                message: '删除失败!'
              });
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    openCopyAndMove(type) {
       if (type == "copy") {
        this.dialogCopyAndMoveTitle = "复制到";
      } else {
        this.dialogCopyAndMoveTitle = "移动到";
      }
      this.copyAndMove = type;
      this.dialogCopyAndMove = true;
    },
    submitCopyAndMove(targetFileFolder) {
      let data = {
        fileFolderId: this.fileFolder.folderId,
        targetId: targetFileFolder.folderId,
        updateUser: sessionStorage.getItem('userId')
      }
      if (this.copyAndMove == 'move') {
        moveFile(data).then(res => {
          if (res.data.resultCode == '0000' ) {
            if (res.data.resultData > 0) {
              this.$message.success('移动成功!');
              this.closeCopyAndMove();
              this.$emit("operationSuccess");
            } else if (res.data.resultData == -2) {
              this.$message.error("该路径下已经存在你要操作的文件！")
            }
          } 
        });
      } else {
        data.createUser = data.updateUser;
        copyFile(data).then(res => {
          if (res.data.resultCode == '0000' ) {
            if (res.data.resultData > 0) {
              this.$message.success('复制成功!');
              this.closeCopyAndMove();
              this.$emit("operationSuccess");
            } else if (res.data.resultData == -2) {
              this.$message.error("该路径下已经存在你要操作的文件！")
            }
          }
        });
      }
      
    },
    closeRname() {
      this.visiable = false;
      this.fname = '';
    },
    saveRename() {
      this.fileFolder.folderName = this.fname;
      this.fileFolder.updateUser = sessionStorage.getItem("userId")
      renameFileFolder(this.fileFolder).then(response =>{
        console.log(response);
        if (response.data.resultCode === '0000' && response.data.resultData == 1) {
          this.visiable = false;
          this.$Message.info('修改成功！');
        }

      })
    },
    closeCopyAndMove() {
      this.dialogCopyAndMove = false;
    },
    openFile() {
      if (this.select) {
        this.select = !this.select;
        this.$emit('selected', {id: this.fileFolder.folderId, select: this.select})
      }
      this.$emit('dblclick', this.fileFolder)
    },
    selectFile() { 
      this.select = !this.select;

      this.$emit('selected', {id: this.fileFolder.folderId, select: this.select})
    }
  },
  mounted() {
    this.select = this.selectProp;
  }
}
</script>

<style lang="scss" scoped>
  
  .thumbnail {
    background: white;
    width:20%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    .thumbnail-card {
      margin: 10px 15px 0px 15px;
      /deep/ .el-card__body {
        padding-bottom: 10px;
      }
    }
    .thumbnail-card:hover {
      background: #f1f5fa;
    }
    .thumbnail-card__content {
      display: flex;
      flex-direction: column;
      .thumbnail-card__content-image {
        width: 50%;
        align-self: center;
      }
      .thumbnail-card__content-text {
        font-size: 16px;
        color: #303133;
        margin-bottom: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .thumbnail-card__content-info {
        display: flex;
        flex-direction: column;
        label {
          font-size: 13px;
          color: #999;
        }
        .thumbnail-card__operation {
          align-self: flex-end
        }
        .button {
          color: rgba(0, 121, 254, 0.8);
          font-size: 14px;
          padding-right: 10px;
          padding-left: 0px;
        }
        /deep/ .ivu-poptip-popper {
          min-width: 90px;
        }
        /deep/ .ivu-poptip-body {
        padding: 0px;
      }
      }
    }
    .poptip-file-operation {
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 15%;

      .file-operation {
        margin-left: 0px;
      }
    }
  }
  .model-rname {
    padding: 15px 10px;
  }
  .copy-move-footer {
    display: flex;
    justify-content: space-between;
  }
</style>