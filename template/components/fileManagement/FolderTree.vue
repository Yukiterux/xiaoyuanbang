<template>
  <div class="tree-box">
    <ul id="folderTree" class="ztree"></ul>
  </div>
</template>

<script>
import {getFolderTree, saveFolder} from "@/api/dataModel/fileManagement";
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      filterText: "", // 筛选字段
      hiddenNodes: [], // 需要隐藏的集合
      authorityType: "",
      treeObj: {},
      folderTreeList: []
    };
  },
  methods: {
    findFolderTree() {
      getFolderTree({})
        .then(res => {
          console.log(res)
          if (res.data.resultCode === '0000' && res.data.resultData != null) {
            this.folderTreeList = res.data.resultData.map((item) => {
              return {...item, isParent: true}
            });
            console.log(this.folderTreeList)
            this.ztreeBindData();
          }
        })
        .catch(err => {
          console.log(err)
          this.$Message.error(err);
        });
    },
    // ztree绑定
    ztreeBindData() {
      var self = this;
      // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      var setting = {
        data: {
          key: {
            title: "folderName",
            name: "folderName"
          },
          simpleData: {
            enable: true,
            idKey: "folderId",
            pIdKey: "folderParentId"
          }
        },
        edit: {
          showRemoveBtn: false
        },
        callback: {
          onClick: self.zTreeOnClick,
          beforeRename: self.commitSaveFolder
        }
      };
      setTimeout(() => {
        $.fn.zTree.init($(`#${this.id}`), setting, self.folderTreeList);
        this.treeObj = $.fn.zTree.getZTreeObj(this.id);
      }, 300);
    },
    // ztree点击
    zTreeOnClick(event, treeId, treeNode, clickFlag) {
      this.$emit("clickNode", treeNode);
    },
    addFolder() {
      let nodes = this.treeObj.getSelectedNodes();
      let selectedNode = null;
      if (nodes.length > 0) {
        selectedNode = nodes[0];
      } 
      let newNode = this.treeObj.addNodes(selectedNode,
          {
          folderName: "新建文件夹",
          isParent: true
      })
      this.treeObj.setEditable(true);
      this.treeObj.editName(newNode[0]);
      
    },
    commitSaveFolder(treeId, treeNode, newName) {
      if (newName || !newName.length > 250) {
        this.treeObj.setEditable(false);
        let params = {
          folderName: newName,
          folderType: "folder"
        }
        if (treeNode.folderParentId) {
          params.folderParentId = treeNode.folderParentId;
        }
        saveFolder(params).then(res =>{
          if (res.data.resultCode === '0000')
            if (res.data.resultData == 1) {
              this.$Message.info("创建成功！")
            }
            if (res.data.resultData == -3) {
              this.$Message.warning("文件名不能为空或不能大于250个字符！")
            }
            if (res.data.resultData == -2) {
              this.$Message.warning("已经存在相同名称的文件或文件夹!")
            }
            if (res.data.resultData == -1) {
              this.$Message.warning("文件名中不能含有特殊符号！")
            }
        });
      } else {
        this.$Message.error("文件名不能为空或不能大于250个字符！")
        this.treeObj.editName(treeNode);
      }
    }
  },
  created() {
    this.findFolderTree();
  }
};
</script>


<style lang="scss" scoped>
</style>