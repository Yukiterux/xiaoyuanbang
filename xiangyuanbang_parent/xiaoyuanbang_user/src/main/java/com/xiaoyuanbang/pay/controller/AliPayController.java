package com.xiaoyuanbang.pay.controller;

import com.alipay.api.*;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.internal.util.StringUtils;
import com.alipay.api.request.AlipayFundTransToaccountTransferRequest;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.alipay.api.response.AlipayFundTransToaccountTransferResponse;
import com.xiaoyuanbang.common.util.IdWorker;
import com.xiaoyuanbang.model.*;
import com.xiaoyuanbang.order.service.OrderService;
import com.xiaoyuanbang.pay.config.AliPayConfig;
import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import com.xiaoyuanbang.pay.service.TransferService;
import com.xiaoyuanbang.user.service.UserService;
import io.jsonwebtoken.Claims;
import net.sf.json.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/alipay")
public class AliPayController {
    @Autowired
    private AliPayConfig aliPayConfig;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private OrderService orderService;
    @Autowired
    private IdWorker idWorker;
    @Autowired
    private UserService userService;
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private TransferService transferService;
    public Result getPayList(){
        return  new Result(true, StatusCode.OK,"生成url成功","?????????????");

    }
    @PostMapping("/alipay")
    public Result pay(@RequestBody AliPayFormVo aliPayFormVo){

        AlipayClient alipayClient = new DefaultAlipayClient(aliPayConfig.getGatewayUrl(),
                aliPayConfig.getAppID(),
                aliPayConfig.getMerchantPrivateKey(),
                aliPayConfig.getFormat(),
                aliPayConfig.getCharset(),
                aliPayConfig.getAlipayPublicKey(),
                aliPayConfig.getSignType());

        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();//创建API对应的request

        alipayRequest.setReturnUrl(aliPayConfig.getReturnUrl());
        alipayRequest.setNotifyUrl(aliPayConfig.getNotifyUrl());
        alipayRequest.setBizContent("{" +
                "    \"out_trade_no\":\""+aliPayFormVo.getOrderid()+"\"," +
                "    \"product_code\":\"FAST_INSTANT_TRADE_PAY\"," +
                "    \"total_amount\":"+aliPayFormVo.getMoney()+"," +
                "    \"subject\":\""+"充值"+"\"," +
                "    \"body\":\""+"用户充值余额"+"\"," +
                "    \"extend_params\":{" +
                "    \"sys_service_provider_id\":\""+aliPayConfig.getSysServiceProviderId()+"\"" +
                "    }"+
                "  }");//填充业务参数

        String payUrl = "";
        try {
                    payUrl = alipayClient.pageExecute(alipayRequest, "GET").getBody(); //调用SDK生成表单

        } catch (AlipayApiException e) {
            e.printStackTrace();
        }
        System.out.println(payUrl);
        Map<String,String> map=new HashMap<>();
        map.put("payUrl",payUrl);
        return  new Result(true, StatusCode.OK,"生成url成功",map);
    }


    @PostMapping("/notify")
    public Result notifyUrl(HttpServletRequest request, HttpServletResponse response){
        System.out.println("支付宝异步通知");
        Map<String, String> params = new HashMap<String, String>();
        Map requestParams = request.getParameterMap();
        for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext(); ) {
            String name = (String) iter.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0; i < values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
            }

            params.put(name, valueStr);
        }
        boolean signVerified = false; //调用SDK验证签名
        try {
            signVerified = AlipaySignature.rsaCheckV1(params, aliPayConfig.getAlipayPublicKey(), aliPayConfig.getCharset(), aliPayConfig.getSignType());
        } catch (AlipayApiException e) {
            e.printStackTrace();
            System.out.println("【支付宝异步通知】支付宝回调通知失败");
            return  new Result(true, StatusCode.ERROR,"【支付宝异步通知】支付宝回调通知失败",params);
            //e.printStackTrace();
        }
        if (!signVerified) {
            System.out.println("【支付宝异步通知】验证签名错误");
            return  new Result(true, StatusCode.ERROR,"【支付宝异步通知】验证签名错误",params);

        }

        BigDecimal trade_price = new BigDecimal(request.getParameter("total_amount"));
        //商户订单号
        String out_trade_no = params.get("out_trade_no");
        //支付宝交易号
        String trade_no = params.get("trade_no");
        //交易状态
        String trade_status = params.get("trade_status");



        // 支付成功修改订单状态
        if (trade_status.equals("TRADE_FINISHED") || trade_status.equals("TRADE_SUCCESS")) {
            Order order=new Order();
            order.setStatus("2");
            order.setPay_time(new Date());
            order.setId(out_trade_no);
//            restTemplate.put("http://xiaoyuanbang-order/order/orderStatus/{id}",order,out_trade_no);
            //业务处理，主要是更新订单状态
            orderService.updateOrderStatusAndPaytime(order);
            Map<String,String> map = new HashMap<>();
            map.put("orderid",out_trade_no);
            rabbitTemplate.convertAndSend("addOrderVo",map);
            System.out.println("发送rabbitmq成功");
            return  new Result(true, StatusCode.OK,"支付成功");
        }
        return  new Result(true, StatusCode.ERROR,"【支付宝异步通知】状态错误");
    }

    @PostMapping("/transfer")
    public Result transfer(){
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String id = claims.getId();
        User user = userService.findById(id);
        if (user==null|| StringUtils.isEmpty(user.getName())||StringUtils.isEmpty(user.getId_card())||user.getAccount_balance()<=0){
            return new Result(false, StatusCode.ACCESSERROR, "用户信息不完整");

        }
        AlipayClient alipayClient = new DefaultAlipayClient(aliPayConfig.getGatewayUrl(),
                aliPayConfig.getAppID(),
                aliPayConfig.getMerchantPrivateKey(),
                aliPayConfig.getFormat(),
                aliPayConfig.getCharset(),
                aliPayConfig.getAlipayPublicKey(),
                aliPayConfig.getSignType());
        AlipayFundTransToaccountTransferRequest request = new AlipayFundTransToaccountTransferRequest();
        Alipay alipay = new Alipay();
        long l = idWorker.nextId();
        alipay.setAmount(user.getAccount_balance()+"");
        alipay.setOut_biz_no(l+"");
        alipay.setPayee_type("ALIPAY_LOGONID");
        alipay.setPayee_account("hmvaux5883@sandbox.com");
        alipay.setPayee_real_name("沙箱环境");
        JSONObject object = JSONObject.fromObject(alipay);
        request.setBizContent(object.toString());
        AlipayFundTransToaccountTransferResponse response=null;
        Transfer transfer=new Transfer();
        transfer.setId(l+"");
        transfer.setAmount(alipay.getAmount());
        transfer.setAccount(user.getMobile());
        transfer.setTime(new Date());
        try{
            response = alipayClient.execute(request);
            if("10000".equals(response.getCode())){
                transfer.setCode(response.getCode());
                transfer.setSuccess(1+"");
                transferService.add(transfer);
                userService.updateEmptyMoney(user.getId());

                return  new Result(true, StatusCode.OK,"提现成功");
            }else{
                transfer.setCode(response.getCode());
                transfer.setMsg(response.getSubCode()+response.getSubMsg());
                transfer.setSuccess(0+"");
                transferService.add(transfer);
                return  new Result(false, StatusCode.ERROR,"提现失败");

            }
        }catch(AlipayApiException e){
            return  new Result(false, StatusCode.ERROR,"提现失败");

        }

    }
}
