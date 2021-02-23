<template>
<div>
     <el-form ref="form"  label-width="180px">
        <el-form-item label="排队地址"  type="textarea" autosize>
          <el-autocomplete
          class="inline-input"
          v-model="order.receiver_address"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
        >
        </el-autocomplete>
        </el-form-item>

      <el-form-item label="备注地址"  type="textarea" autosize>
          <el-autocomplete
          class="inline-input"
          v-model="order.receiver_remark_address"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
        >
        </el-autocomplete>
        </el-form-item>

      <el-form-item label="联系电话" autosize>
            <el-input v-model="order.receiver_mobile"></el-input>
        </el-form-item>

  <hr>
  

      <el-form-item label="备注留言-所有人可见">
            <el-input type="textarea" v-model="order.buy_request"></el-input>
        </el-form-item>

          <el-form-item label="备注留言-接单者可见">
            <el-input type="textarea" v-model="order.secret"></el-input>
        </el-form-item>


      <hr>
        



     

   <hr>





        
      
        <el-form-item label="立即排队">
            <el-switch v-model="liji" active-value="Y" inactive-value="N"></el-switch>
        </el-form-item>


        <el-form-item v-if="liji=='N'"  label="预约时间排队">
          <div class="block">
          <el-date-picker
            v-model="order.appointment_time"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions1">
          </el-date-picker>
         </div>
        </el-form-item>
      <hr>
        <el-form-item label="跑腿费用">
             <el-input placeholder="请输入内容" v-model="order.reward">
               <template slot="append">元</template>
              </el-input>
        </el-form-item>

      <hr>
        <el-form-item label="订单到期无人接单自动取消">
            <el-switch v-model="cancel" active-value="Y" inactive-value="N"></el-switch>
        </el-form-item>


        <el-form-item v-if="cancel=='Y'"  label="选择到期取消时间">
          <div class="block">
          <el-date-picker
            v-model="order.cancel_time"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions1">
          </el-date-picker>
         </div>
        </el-form-item>
      <hr>


        <el-form-item>
            <el-button type="primary" @click="addOrder">立即下单</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>

</div>


</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import orderApi from '~/api/order.js'
import baseApi from '~/api/base.js'
import payApi from '~/api/pay.js'
  export default {
    data() {
      return {
        order:{},
        liji:'Y',
        cancel:'N',
        map:[],
        item:{}
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
       querySearch(queryString,cb) {
         return baseApi.getAddress(queryString).then(res=>{
          cb(res.data.data)     
         })
          
        },


    addOrder(){
      return orderApi.saveQueueOrder(this.order).then(res=>{
        if(res.data.flag){
                    this.$message({
                        message: '下单成功',
                        type: 'success'
                    })

                    console.log(res.data.data)
                    this.item.orderid=res.data.data.orderid
                    this.item.money=res.data.data.money
                    payApi.getPayUrl(this.item).then(res2=>{
                      console.log(res2)
                      window.location.href=res2.data.data.payUrl
                    })
                   
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
         }
         if(res.data.message=='请登录后再下单'){
           setTimeout(function () {
              location.href='/login'
           },1000)
  
         }
      })
    }
    }
  }
</script>
<style>
.el-autocomplete{
  width: 730px;
}
.mymargin{margin:10px 10px 10px 10px;}
</style>