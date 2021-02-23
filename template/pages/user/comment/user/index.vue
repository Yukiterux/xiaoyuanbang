
<template>
  <div>
   
    <div>
      <el-table
     
        :data="items.rows"
        style="width: 100%"
      >
       <el-table-column label="评价者" width="300">

          <template slot-scope="scope">
           
              <img
                :src="scope.row.avatar"
                width="50px"
                height="50px"
              />
              <nuxt-link   
              :to="'/info/'+scope.row.userid"
            >{{scope.row.userNickname}}</nuxt-link>
              <el-tag>信誉分：{{scope.row.grade}}</el-tag>
         
             
          </template>

        </el-table-column>
       
      <el-table-column
          prop="user_comment"
          label="评价内容"
          width="180"
        >
        </el-table-column>

        <el-table-column
          
          label="评分"
          width="180"
        >
        <template slot-scope="scope">
<el-rate
  v-model="scope.row.user_grade"
  disabled
  show-score
  text-color="#ff9900"
  >
</el-rate>
        </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-right:180px;float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="items.total"
      >
      </el-pagination>
    </div>
  </div>

</template>
<script>
import orderApi from "~/api/order.js";
export default {
  created() {
    orderApi.getUserComment(1, 5).then(res => {
      this.items = res.data.data;
    });
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      items: {},
      formLabelWidth: "120px",
     
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      orderApi.getUserComment(this.currentPage, this.pageSize).then(res => {
        this.items = res.data.data;
      });
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      orderApi.getUserComment(this.currentPage, this.pageSize).then(res => {
        this.items = res.data.data;
      });
    }
  }
};
</script>

