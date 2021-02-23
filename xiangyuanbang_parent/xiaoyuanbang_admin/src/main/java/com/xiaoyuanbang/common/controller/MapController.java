package com.xiaoyuanbang.common.controller;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import com.xiaoyuanbang.common.util.RandomValueUtil;
import com.xiaoyuanbang.model.*;
import com.xiaoyuanbang.order.dao.OrderDao;
import com.xiaoyuanbang.order.service.CommentService;
import com.xiaoyuanbang.order.service.OrderService;
import com.xiaoyuanbang.user.dao.UserDao;
import com.xiaoyuanbang.user.service.UserService;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin

public class MapController {
    @Autowired
    UserService userService;
    @Autowired
    OrderService orderService;
    @Autowired
    UserDao userDao;
    @Autowired
    OrderDao orderDao;
    @Autowired
    CommentService commentService;


    @GetMapping(value = "/getAddress/{address}")
    public Result getAddress(@PathVariable String address) throws IOException {


        CloseableHttpClient closeableHttpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet("https://restapi.amap.com/v3/assistant/inputtips?keywords=" + address + "&key=e60c3cabfc1b30ff68cb60e4dffbd638");
        CloseableHttpResponse closeableHttpResponse = closeableHttpClient.execute(httpGet); //3、执行
        HttpEntity httpEntity = closeableHttpResponse.getEntity();
        String result = EntityUtils.toString(httpEntity, "UTF-8");
        result = result.replace("[]", "\"\"");
        System.out.println(result);

        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        mapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);

        GaodeMap map;
        map = mapper.readValue(result, GaodeMap.class);
        List<Tips> tips = map.getTips();
        List<Address> addressList = new ArrayList<>();
        for (Tips tip : tips) {
            Address address1 = new Address();
            address1.setValue(tip.getDistrict() + "-" + tip.getAddress() + "-" + tip.getName());
            address1.setAddress(tip.getAddress());
            addressList.add(address1);
        }

        return new Result(true, StatusCode.OK, "获取地址成功", addressList);
    }

    @GetMapping(value = "/random")
    public void random() {
        randomUser(3000);
//        randomOrder(3000);
//        randomComment(6000);
    }

    public void randomUser(int sum) {

        User user;
        for (int i = 0; i < sum; i++) {
            user = new User();
            user.setPassword("$2a$10$VILysLLcRI0rAPMGcnMwqe4JmHOCV57xtC.77PSlWapDieIcqnTQe");
            user.setStatus("Y");
            user.setAvatar("http://xiaoyuanbang.oss-cn-beijing.aliyuncs.com/images/83CD87F389C643CA98C71BE03740074F.jpg");
            user.setMobile(RandomValueUtil.getTelephone());
            user.setAccount_balance((double) RandomValueUtil.getNum(0, 9999));
            user.setNickname(RandomValueUtil.getChineseName());
            user.setName(RandomValueUtil.getChineseName());
            user.setSex(RandomValueUtil.getNum(1, 2) + "");
            user.setEmail(RandomValueUtil.getEmail(9, 18));
            user.setQq(RandomValueUtil.getNum(111111, 1111111111) + "");
            user.setIs_errands(RandomValueUtil.getNum(0,3)+"");
            user.setGrade(100);
            user.setCreate_time(new Date());
            user.setBirthday(RandomValueUtil.randomDate("1970-01-01", "2019-01-01"));
            user.setLast_login_time(new Date());
            userService.add(user);
        }
    }

    public void randomOrder(int sum) {
        Order order;
        for (int i = 0; i < sum; i++) {
            randomOrder();
        }
    }

    private void randomOrder() {
        Order order = new Order();
        order.setReceiver_address(RandomValueUtil.getRoad());
        order.setBuy_address(RandomValueUtil.getRoad());
        order.setReceiver_remark_address(RandomValueUtil.getRoad());
        order.setBuy_remark_address(RandomValueUtil.getRoad());
        order.setReceiver_mobile(RandomValueUtil.getTelephone());
        order.setBuy_mobile(RandomValueUtil.getTelephone());
        order.setBuy_weight((double) RandomValueUtil.getNum(1, 10));
        order.setBuy_request(RandomValueUtil.getRoad());
        order.setUserid(userDao.randomUser().getId());
        order.setErrandsid(userDao.randomUser().getId());
        order.setReward((double) RandomValueUtil.getNum(1, 100000));
        order.setCreate_time(new Date());
        order.setPay_time(RandomValueUtil.randomDate("1970-01-01", "2019-01-01"));
        order.setAppointment_time(RandomValueUtil.randomDate("1970-01-01", "2019-01-01"));
        order.setAccept_time(RandomValueUtil.randomDate("1970-01-01", "2019-01-01"));
        order.setComplete_time(RandomValueUtil.randomDate("2019-01-01", "2020-01-01"));
        order.setCancel_time(RandomValueUtil.randomDate("1970-01-01", "2019-01-01"));
        order.setErrands_cancel_time(RandomValueUtil.randomDate("1970-01-01", "2019-01-01"));
        order.setErrands_confirm_time(RandomValueUtil.randomDate("1970-01-01", "2019-01-01"));
        order.setBuy_price((double) RandomValueUtil.getNum(1, 100000));
        order.setSecret(RandomValueUtil.getRoad());
        order.setStatus(RandomValueUtil.getNum(3, 9) + "");
        order.setIs_userdelete("N");
        order.setIs_errandsdelete("N");
        order.setIs_errC("N");
        order.setIs_userC("N");
        order.setOrder_type(RandomValueUtil.getNum(1, 5));
        order.setUser_reason(RandomValueUtil.getRoad());
        order.setUser_disagree_reason(RandomValueUtil.getRoad());
        order.setErrands_reason(RandomValueUtil.getRoad());
        order.setErrands_disagree_reason(RandomValueUtil.getRoad());
        orderService.add(order);
    }

    private void randomComment(int sum) {
        for (int i = 0; i < sum; i++) {
            Comment comment = new Comment();
            Order order = orderDao.randomOrder();

            comment.setId(order.getId());
            comment.setUserid(userDao.randomUser().getId());
            comment.setErrandsid(userDao.randomUser().getId());
            comment.setUser_grade(RandomValueUtil.getNum(1, 5));
            comment.setErrands_grade(RandomValueUtil.getNum(1, 5));
            comment.setUser_comment(RandomValueUtil.getRoad());
            comment.setErrands_comment(RandomValueUtil.getRoad());
            commentService.add(comment);
            order.setIs_errC("Y");
            order.setIs_userC("Y");
            orderService.update(order);
        }
    }
}
