<template>
  <div class="file-table">
    <el-table :data="fileFolders" border size="small" @selection-change="selected" v-loading="tableLoading" @row-dblclick="openFile">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column property="folderName" align="center" class-name="folder-name" label="文件名称" width="320">
         <div slot-scope="scope" class="img-name">
           <img :src="iconMap[scope.row.icon]" width="20"/><span>{{scope.row.folderName}}</span>
         </div>
      </el-table-column>
      <el-table-column property="folderType" label="文件类型" align="center" width="120"></el-table-column>
      <el-table-column property="size" label="文件大小" align="center" width="120"></el-table-column>
      <el-table-column property="createUserName" label="上传人" align="center" width="120"></el-table-column>
      <el-table-column property="createTime" align="center" label="上传时间" width="220"></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" align="center">
        <template slot-scope="scope">
          <Dropdown transfer trigger="click" @on-click="moreOption(scope.$index,scope.row, $event)">
            <Button>
              更多操作
              <Icon type="md-arrow-dropdown" />
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="download" align="center">下载</DropdownItem>
              <DropdownItem name="copy" align="center">复制</DropdownItem>
              <DropdownItem name="move" align="center">移动</DropdownItem>
              <DropdownItem name="rename" align="center">重名名</DropdownItem>
              <DropdownItem name="delete" align="center">删除</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </el-table-column>
    </el-table>
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
import FileFolderCopyMove from "./FileFolderCopyMove";
import {appServer} from '@/api/appServer';
import {
  getFolderTree,
  saveFolder,
  renameFileFolder,
  deletedFileFolder,
  download,
  moveFile,
  copyFile
} from "@/api/dataModel/fileManagement";
export default {
  components: {
    FileFolderCopyMove
  },
  props: {
    fileFolders:{
      type: Array,
      required: true
    },
    tableLoading: {
      type: Boolean,
      required: true,
    }

  },
  data() {
    return {
      select: false,
      visiable: false,
      dialogCopyAndMove: false,
      dialogCopyAndMoveTitle: "",
      copyAndMove: "",
      fname: "",
      path: 'http://' + window.location.host + appServer.file,
      fileFolder: null,
      iconMap: {
        folder: require("../../assets/img/fileManagement/folder.png"),
        ".docx": require("../../assets/img/fileManagement/docx.png"),
        ".xlsx": require("../../assets/img/fileManagement/xlsx.png"),
        ".pdf": require("../../assets/img/fileManagement/pdf.png"),
        ".pptx": require("../../assets/img/fileManagement/ppt.png"),
        ".zip": require("../../assets/img/fileManagement/zip.png"),
        ".rar": require("../../assets/img/fileManagement/rar.png"),
        ".txt": require("../../assets/img/fileManagement/txt.png"),
        ".picture": require("../../assets/img/fileManagement/photo.png"),
        other: require("../../assets/img/fileManagement/other.png")
      }
    };
  },
  methods: {
    selected(selection, row) {
      this.$emit('selected', selection)
    },
    download() {
      if (this.fileFolder.type !== "folder") {
        window.open(
          `${this.path}fileFolder/fileDownload/${sessionStorage.getItem(
            "token"
          )}?fileId=${this.fileFolder.folderId}`
        );
      }
    },
    rename(obj) {
      this.fname = obj.folderName;
      this.visiable = true;
    },
    deleteFolder(obj) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            folderId: obj.folderId,
            deleteUser: sessionStorage.getItem("userId")
          };
          deletedFileFolder(params).then(res => {
            if (res.data.resultCode === "0000" && res.data.resultData > 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.$emit("deleted");
            } else {
              this.$message({
                type: "success",
                message: "删除失败!"
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
        updateUser: sessionStorage.getItem("userId")
      };
      if (this.copyAndMove == "move") {
        moveFile(data).then(res => {
          if (res.data.resultCode == "0000") {
            if (res.data.resultData > 0) {
              this.$message.success("移动成功!");
              this.closeCopyAndMove();
              this.$emit("operationSuccess");
            } else if (res.data.resultData == -2) {
              this.$message.error("该路径下已经存在你要操作的文件！");
            }
          }
        });
      } else {
        data.createUser = data.updateUser;
        copyFile(data).then(res => {
          if (res.data.resultCode == "0000") {
            if (res.data.resultData > 0) {
              this.$message.success("复制成功!");
              this.closeCopyAndMove();
              this.$emit("operationSuccess");
            } else if (res.data.resultData == -2) {
              this.$message.error("该路径下已经存在你要操作的文件！");
            }
          }
        });
      }
    },
    closeRname() {
      this.visiable = false;
      this.fname = "";
    },
    saveRename() {
      this.fileFolder.folderName = this.fname;
      this.fileFolder.updateUser = sessionStorage.getItem("userId");
      renameFileFolder(this.fileFolder).then(response => {
        console.log(response);
        if (
          response.data.resultCode === "0000" &&
          response.data.resultData == 1
        ) {
          this.visiable = false;
          this.$Message.info("修改成功！");
        }
      });
    },
    closeCopyAndMove() {
      this.dialogCopyAndMove = false;
    },
    download(fileFolder) {
      if (fileFolder.type !== 'folder') {
        window.open(`dgms-data/fileFolder/fileDownload/${sessionStorage.getItem('token')}?fileId=${fileFolder.folderId}`)
      }
    },
    openFile(row, column, event) {
      this.$emit("dblclick", row);
    },
    moreOption(index, obj, name) {
      console.log(name)
      this.fileFolder = obj;
      if (name == "copy" || name == "move") {
        this.openCopyAndMove(name);
      }
      if (name == "download") {
        this.download(obj);
      }
      if (name == "rename") {
       this.rename(obj);
      }
      if (name == "delete") {
        this.deleteFolder(obj);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.file-table{
  .img-name {
    display: flex;
    justify-content: center;
  }
  /deep/ .folder-name {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  /deep/ .folder-name:hover {
    color:steelblue;
  }
}

</style>