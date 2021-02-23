package com.xiaoyuanbang.search.listener;

import com.xiaoyuanbang.model.Order;
import com.xiaoyuanbang.order.service.OrderService;
import com.xiaoyuanbang.model.EsOrderVo;
import com.xiaoyuanbang.search.service.OrderVoService;

import com.xiaoyuanbang.model.User;
import com.xiaoyuanbang.user.service.UserService;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;

@Component
@RabbitListener(queues = "addOrderVo")
public class OrderVoListener {
    @Autowired
    private OrderVoService orderVoService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
//    @Autowired
//    private RestTemplate restTemplate;




    @RabbitHandler
    public void addOrderVo(Map map) throws InvocationTargetException, IllegalAccessException {
        System.out.println(map.get("orderid"));
        String orderid = (String) map.get("orderid");
        Order order=orderService.findById(orderid);
//        String object = restTemplate.getForObject("http://localhost:9007/order/{id}", String.class, orderid);
//        
//        ConvertUtils.register(new DateConverter(null), java.util.Date.class);
//
//
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
//        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
//        mapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);
//        Result result = null;
//        try {
//            result = mapper.readValue(object, Result.class);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        Map orderMap = (Map) result.getData();
//
//        Order order = new Order();
//
//        BeanUtils.populate(order,orderMap);


        EsOrderVo esOrderVo =new EsOrderVo();
        if (order.getAppointment_time()!=null){
            esOrderVo.setAppointment_time(order.getAppointment_time());
        }
        esOrderVo.setCreate_time(order.getCreate_time());

        if (order.getCancel_time()!=null){
            esOrderVo.setCancel_time(order.getCancel_time());
        }
        esOrderVo.setId(order.getId());

        esOrderVo.setReward(order.getReward());
        esOrderVo.setOrder_type(order.getOrder_type()+"");

        esOrderVo.setOrderid(order.getId());
        User user = userService.findById(order.getUserid());
//        String userString = restTemplate.getForObject("http://localhost:9098/user/{id}", String.class, order.getUserid());
//        Result result2 = null;
//
//        try {
//            result2 = mapper.readValue(userString , Result.class);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        Map userMap = (Map) result2.getData();
//        User user = new User();
//
//        BeanUtils.populate(user,userMap);

        esOrderVo.setAvatar(user.getAvatar());
        esOrderVo.setUserNickname(user.getNickname());
        esOrderVo.setUserid(user.getId());
        esOrderVo.setGrade(user.getGrade());
        
        try{
            orderVoService.add(esOrderVo);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
