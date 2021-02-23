<template>
  <div class="copy-move">
    <div class="copy-move-tree">
        <folder-tree id="folderTree" ref="folderTree" @clickNode="reviceFolder" />
    </div>
    <div slot="footer" class="copy-move-footer">
      <btn type="add" name="新建文件夹" @childClick="addFolder"></btn>

      <div>
        <Button @click="closeVisiableCopy()">取消</Button>
        <Button type="primary" @click="comfirm()">确定</Button>
      </div>
    </div>
  </div>
</template>

<script>
import FolderTree from './FolderTree';
import btn from '@/components/custBtn';
export default {
  components: {
    FolderTree,
    btn
  },
  data() {
    return {
      fileFolder: {}
    }
  },
  methods: {
    addFolder() {
      this.$refs.folderTree.addFolder();
    },
    reviceFolder(treeNode) {
      this.fileFolder = treeNode;
    },
    closeVisiableCopy() {
      this.$emit("cancel");
    },
    comfirm() {
      this.$emit("confirm", this.fileFolder);
    }
  }
}
</script>

<style lang="scss" scoped>
.copy-move-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>