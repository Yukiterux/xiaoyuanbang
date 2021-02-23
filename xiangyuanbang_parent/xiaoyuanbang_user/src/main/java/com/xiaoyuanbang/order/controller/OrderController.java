package com.xiaoyuanbang.order.controller;

import com.xiaoyuanbang.model.Order;
import com.xiaoyuanbang.order.service.OrderService;
import com.xiaoyuanbang.common.entity.PageResult;
import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import com.xiaoyuanbang.model.User;
import com.xiaoyuanbang.user.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import com.xiaoyuanbang.common.util.JwtUtil;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.util.*;

/**
 * 控制器层
 *
 * @author Administrator
 */
@RestController
@CrossOrigin
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private HttpServletRequest request;

    @Autowired
//    private RestTemplate restTemplate;
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 查询全部数据
     *
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public Result findAll() {
        return new Result(true, StatusCode.OK, "查询成功", orderService.findAll());
    }

    /**
     * 根据ID查询
     *
     * @param id ID
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Result findById(@PathVariable String id) {
        return new Result(true, StatusCode.OK, "查询成功", orderService.findById(id));
    }

    @RequestMapping(value = "/some/{id}", method = RequestMethod.GET)
    public Result findSomeById(@PathVariable String id) {
        Order order = orderService.findById(id);
        Order newOrder = new Order();
        newOrder.setCreate_time(order.getCreate_time());
        newOrder.setReward(order.getReward());
        newOrder.setOrder_type(order.getOrder_type());
        newOrder.setBuy_request(order.getBuy_request());
        newOrder.setId(order.getId());
        newOrder.setUserid(order.getUserid());
        newOrder.setBuy_price(order.getBuy_price());
        newOrder.setBuy_weight(order.getBuy_weight());
        newOrder.setId(order.getId());
        return new Result(true, StatusCode.OK, "查询成功", newOrder);
    }


    @PutMapping(value = "/updateCancelOrder/{orderid}")
    public Result updateCancelOrder(@PathVariable String orderid, @RequestBody String token) {
        Claims claims = jwtUtil.parseJWT(token);
        String id = claims.getId();
        if (id.equals("user")) {
            orderService.updateCancelOrder(orderid);

            return new Result(true, StatusCode.OK, "修改成功");
        } else {
            return new Result(false, StatusCode.ERROR, "修改出错");
        }
    }


    /**
     * 分页+多条件查询
     *
     * @param searchMap 查询条件封装
     * @param page      页码
     * @param size      页大小
     * @return 分页结果
     */
    @RequestMapping(value = "/search/{page}/{size}", method = RequestMethod.POST)
    public Result findSearch(@RequestBody Map searchMap, @PathVariable int page, @PathVariable int size) {
        Page<Order> pageList = orderService.findSearch(searchMap, page, size);
        return new Result(true, StatusCode.OK, "查询成功", new PageResult<Order>(pageList.getTotalElements(), pageList.getContent()));
    }

    @RequestMapping(value = "/publicsearch/{page}/{size}", method = RequestMethod.POST)
    public Result publicfindSearch(@RequestBody Map searchMap, @PathVariable int page, @PathVariable int size) {
        Page<Order> pageList = orderService.findSearch(searchMap, page, size);

        return new Result(true, StatusCode.OK, "查询成功", new PageResult<Order>(pageList.getTotalElements(), pageList.getContent()));
    }


    /**
     * 根据条件查询
     *
     * @param searchMap
     * @return
     */
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public Result findSearch(@RequestBody Map searchMap) {
        return new Result(true, StatusCode.OK, "查询成功", orderService.findSearch(searchMap));
    }

    /**
     * 增加
     *
     * @param order
     */
    @RequestMapping(method = RequestMethod.POST)
    public Result add(@RequestBody Order order) {
        orderService.add(order);
        return new Result(true, StatusCode.OK, "增加成功");
    }

    /**
     * 修改
     *
     * @param order
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Result update(@RequestBody Order order, @PathVariable String id) {
        order.setId(id);
        orderService.update(order);
        return new Result(true, StatusCode.OK, "修改成功");
    }

    @RequestMapping(value = "/orderStatus/{id}", method = RequestMethod.PUT)
    public Result updateOrderStatus(@RequestBody Order order, @PathVariable String id) {
        order.setId(id);
        orderService.updateOrderStatusAndPaytime(order);
        return new Result(true, StatusCode.OK, "修改成功");
    }


    /**
     * 删除
     *
     * @param id
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Result delete(@PathVariable String id) {
        orderService.deleteById(id);
        return new Result(true, StatusCode.OK, "删除成功");
    }

    @PostMapping(value = "/sendOrder")
    public Result saveSendOrder(@RequestBody Order order) {
        Object claims_user = request.getAttribute("claims_user");
        System.out.println(claims_user);
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再下单");
        }
        order.setUserid(claims.getId());
        order.setCreate_time(new Date());
        order.setStatus("1");
        order.setIs_userdelete("N");
        order.setIs_errandsdelete("N");
        order.setIs_errC("N");
        order.setIs_userC("N");
        order.setOrder_type(2);
        orderService.add(order);
        Map map = new HashMap();
        map.put("orderid", order.getId());
        map.put("money", order.getReward());
        return new Result(true, StatusCode.OK, "下单成功", map);
    }

    @PostMapping(value = "/takeOrder")
    public Result saveTakeOrder(@RequestBody Order order) {
        Object claims_user = request.getAttribute("claims_user");
        System.out.println(claims_user);
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再下单");
        }
        order.setUserid(claims.getId());
        order.setCreate_time(new Date());
        order.setStatus("1");
        order.setIs_userdelete("N");
        order.setIs_errandsdelete("N");
        order.setIs_errC("N");
        order.setIs_userC("N");
        order.setOrder_type(3);
        orderService.add(order);
        Map map = new HashMap();
        map.put("orderid", order.getId());
        map.put("money", order.getReward());
        return new Result(true, StatusCode.OK, "下单成功", map);
    }

    @PostMapping(value = "/queueOrder")
    public Result saveQueueOrder(@RequestBody Order order) {
        Object claims_user = request.getAttribute("claims_user");
        System.out.println(claims_user);
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再下单");
        }
        order.setUserid(claims.getId());
        order.setCreate_time(new Date());
        order.setStatus("1");
        order.setIs_userdelete("N");
        order.setIs_errandsdelete("N");
        order.setIs_errC("N");
        order.setIs_userC("N");
        order.setOrder_type(4);
        orderService.add(order);
        Map map = new HashMap();
        map.put("orderid", order.getId());
        map.put("money", order.getReward());
        return new Result(true, StatusCode.OK, "下单成功", map);
    }

    @PostMapping(value = "/otherOrder")
    public Result saveOtherOrder(@RequestBody Order order) {
        Object claims_user = request.getAttribute("claims_user");
        System.out.println(claims_user);
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再下单");
        }
        order.setUserid(claims.getId());
        order.setCreate_time(new Date());
        order.setStatus("1");
        order.setIs_userdelete("N");
        order.setIs_errandsdelete("N");
        order.setIs_errC("N");
        order.setIs_userC("N");
        order.setOrder_type(5);
        orderService.add(order);
        Map map = new HashMap();
        map.put("orderid", order.getId());
        map.put("money", order.getReward());
        return new Result(true, StatusCode.OK, "下单成功", map);
    }


    @PostMapping(value = "/buyOrder")
    public Result saveBuyOrder(@RequestBody Order order) {
        Object claims_user = request.getAttribute("claims_user");
        System.out.println(claims_user);
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再下单");
        }
        order.setUserid(claims.getId());
        order.setCreate_time(new Date());
        order.setStatus("1");
        order.setIs_userdelete("N");
        order.setIs_errandsdelete("N");
        order.setIs_errC("N");
        order.setIs_userC("N");
        order.setOrder_type(1);
        orderService.add(order);
        Map map = new HashMap();
        map.put("orderid", order.getId());
        map.put("money", order.getReward());
        return new Result(true, StatusCode.OK, "下单成功", map);
    }

    //接单
    @PutMapping(value = "/makeOrder/{id}")
    public Result startOrder(@PathVariable String id) {
        Object claims_user = request.getAttribute("claims_user");
        System.out.println(claims_user + "接单");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再接单");
        }
        String errandsid = claims.getId();
        Order order = orderService.findById(id);


        System.out.println("接单者:" + errandsid);
        if (order.getErrandsid() != null) {
            return new Result(false, StatusCode.ERROR, "此订单已被他人接取");
        }
        if (order.getUserid().equals(errandsid)) {
            return new Result(false, StatusCode.ERROR, "不能接自己发布的订单");
        } else {
            orderService.startOrder(id, errandsid);

            return new Result(true, StatusCode.OK, "接单成功");
        }

    }

    //配送员同意取消订单
    @PutMapping(value = "/errandsAgreeCancelOrder/{id}")
    public Result errandsAgreeCancelOrder(@PathVariable String id) {
        System.out.println("用户取消订单");
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();
        Order order = orderService.findById(id);
        String status = order.getStatus();
        if (status.equals("6")) {
            System.out.println("取消订单并退款");
            orderService.cancelOrderAndRefund("8", id, order);
            return new Result(true, StatusCode.OK, "同意取消订单");
        } else {
            return new Result(false, StatusCode.ACCESSERROR, "取消订单失败");
        }
    }

    //用户完成订单
    @PutMapping(value = "/completeOrder/{id}")
    public Result completeOrder(@PathVariable String id) {
        System.out.println("用户完成订单");
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();
        Order order = orderService.findById(id);
        String status = order.getStatus();

        if (order.getUserid().equals(userid) && status.equals("4")) {
            orderService.completeOrder(id, order);
            return new Result(true, StatusCode.OK, "订单已完成");
        }
        return new Result(false, StatusCode.ACCESSERROR, "完成订单失败");
    }

    //用户完成订单
    @PutMapping(value = "/errCompleteOrder/{id}")
    public Result errCompleteOrder(@PathVariable String id) {
        System.out.println("配送员完成订单");
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();
        Order order = orderService.findById(id);
        String status = order.getStatus();

        if (order.getErrandsid().equals(userid) && status.equals("3")) {
            orderService.errCompleteOrder(id, order);
            return new Result(true, StatusCode.OK, "等待用户确认订单");
        }
        return new Result(false, StatusCode.ACCESSERROR, "完成订单失败");
    }

    //用户同意取消订单
    @PutMapping(value = "/userAgreeCancelOrder/{id}")
    public Result userAgreeCancelOrder(@PathVariable String id) {
        System.out.println("用户取消订单");
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();
        Order order = orderService.findById(id);
        String status = order.getStatus();
        if (status.equals("7")) {
            System.out.println("取消订单并退款");
            orderService.cancelOrderAndRefundAndUpdateGrade("8", id, order);
            return new Result(true, StatusCode.OK, "同意取消订单");
        } else {
            return new Result(false, StatusCode.ACCESSERROR, "取消订单失败");
        }
    }

    //用户拒绝取消订单
    @PutMapping(value = "/userDisagreeCancelOrder/{id}")
    public Result userDisagreeCancelOrder(@PathVariable String id, @RequestBody String reason) {
        try {
            reason = URLDecoder.decode(reason, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("用户拒绝取消订单" + reason);
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();
        Order order = orderService.findById(id);
        String status = order.getStatus();
        if (status.equals("7")) {
            System.out.println("配送员拒绝取消订单");
            orderService.userDisAgreeCancelOrder("9", id, order, reason);
            return new Result(true, StatusCode.OK, "配送员拒绝取消订单");
        } else {
            return new Result(false, StatusCode.ACCESSERROR, "取消订单失败");
        }
    }

    //配送员拒绝取消订单
    @PutMapping(value = "/errandsDisagreeCancelOrder/{id}")
    public Result errandsDisagreeCancelOrder(@PathVariable String id, @RequestBody String reason) {
        try {
            reason = URLDecoder.decode(reason, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("用户取消订单" + reason);
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();
        Order order = orderService.findById(id);
        String status = order.getStatus();
        if (status.equals("6")) {
            System.out.println("配送员拒绝取消订单");
            orderService.errandsDisAgreeCancelOrder("9", id, order, reason);
            return new Result(true, StatusCode.OK, "配送员拒绝取消订单");
        } else {
            return new Result(false, StatusCode.ACCESSERROR, "取消订单失败");
        }
    }

    //配送员申请取消订单
    @PutMapping(value = "/errandsCancelOrder/{id}")
    public Result errandsCancelOrder(@RequestBody String cancelReason, @PathVariable String id) {
        if (cancelReason != null) {
            try {
                cancelReason = URLDecoder.decode(cancelReason, "UTF-8");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        System.out.println(cancelReason);
        System.out.println("配送员申请取消订单");
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();
        Order order = orderService.findById(id);
        String status = order.getStatus();
        if (status.equals("3") || status.equals("4")) {
            orderService.errandsCancelOrder("7", id, cancelReason);
            return new Result(true, StatusCode.OK, "取消订单成功");
        } else {
            return new Result(false, StatusCode.ACCESSERROR, "取消订单失败");
        }

    }


    //取消订单
    @PutMapping(value = "/userCancelOrder/{id}")
    public Result userCancelOrder(@RequestBody String cancelReason, @PathVariable String id) {
        try {
            cancelReason = URLDecoder.decode(cancelReason, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(cancelReason);
        System.out.println("用户取消订单");
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();
        Order order = orderService.findById(id);
        String status = order.getStatus();
        System.out.println("订单原状态" + status);
        System.out.println(order);
        //如果订单未支付直接取消订单
        if (status.equals("1")) {
            System.out.println("直接取消订单" + status);
            orderService.updateStatus("8", id);
            return new Result(true, StatusCode.OK, "取消订单成功");
        } else if (status.equals("2")) {
            //如果订单已支付尚无人接单返还支付费用
            System.out.println("取消订单并退款");
            orderService.cancelOrderAndRefund("8", id, order);
            return new Result(true, StatusCode.OK, "取消订单成功");
        } else if (status.equals("3") || status.equals("4")) {
            System.out.println("进行中订单取消");
            orderService.cancelOrder("6", id, cancelReason);
            return new Result(true, StatusCode.OK, "等待对方确认取消");
        } else {
            return new Result(false, StatusCode.ACCESSERROR, "取消订单失败");
        }
    }

    @PostMapping(value = "orderPlaced/{page}/{size}")
    public Result getOrderPlaced(@PathVariable int page, @PathVariable int size, @RequestBody Map<String, String> orderBy) {
        System.out.println(orderBy.get("columnName"));
        System.out.println(orderBy.get("order"));
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();

        Page<Map> pageList = orderService.getOrderPlaced(userid, page, size, orderBy);
        List<Map> content = pageList.getContent();

        for (Map map : content) {
            if (map.get("errandsid") != null) {
                User user = userService.findById((String) map.get("errandsid"));
                map.put("userNickname", user.getNickname());
                map.put("userGrade", user.getGrade());
                map.put("userAvatar", user.getAvatar());
            }
        }
        return new Result(true, StatusCode.OK, "查询成功", new PageResult<Map>(pageList.getTotalElements(), pageList.getContent()));
    }


    //接单查询
    @PostMapping(value = "/acceptOrder/{page}/{size}")
    public Result getAcceptOrder(@PathVariable int page, @PathVariable int size, @RequestBody Map<String, String> orderBy) {
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();
        Page<Map> pageList = orderService.getAcceptOrder(userid, page, size,orderBy);
        List<Map> content = pageList.getContent();
        for (Map map : content) {
            if (map.get("userid") != null) {
                User user = userService.findById((String) map.get("userid"));
                map.put("userNickname", user.getNickname());
                map.put("userGrade", user.getGrade());
                map.put("userAvatar", user.getAvatar());
            }
        }

//        for (Order order : content) {
//            AcceptOrder acceptOrder = new AcceptOrder();
//            System.out.println(order.getId());
//            acceptOrder.setAccept_time(order.getAccept_time());
//            acceptOrder.setAppointment_time(order.getAppointment_time());
//            acceptOrder.setStatus(order.getStatus());
//            acceptOrder.setReward(order.getReward());
//
//            acceptOrder.setOrderid(order.getId());
//            acceptOrder.setOrder_type(order.getOrder_type() + "");
//            if (order.getIs_userC() != null)
//                acceptOrder.setUserC(order.getIs_userC());
//            if (order.getIs_errC() != null)
//                acceptOrder.setErrC(order.getIs_errC());
//
//            User user = userService.findById(order.getErrandsid());
//            acceptOrder.setUserNickname(user.getNickname());
//            acceptOrder.setUserid(user.getId());
//            acceptOrder.setUserGrade(user.getGrade());
//            acceptOrder.setUserAvatar(user.getAvatar());
//            acceptOrder.setId(order.getId());
//            System.out.println(acceptOrder);
//            acceptOrders.add(acceptOrder);
//        }
        return new Result(true, StatusCode.OK, "查询成功", new PageResult<Map>(pageList.getTotalElements(), pageList.getContent()));
    }

    @DeleteMapping("/orderPlaced/{id}")
    public Result deleteOrderPlaced(@PathVariable String id) {
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
        }
        boolean deleteOrderPlaced = orderService.deleteOrderPlaced(claims.getId(), id);
        if (deleteOrderPlaced) {
            return new Result(true, StatusCode.OK, "删除成功");
        } else {
            return new Result(false, StatusCode.ERROR, "删除失败");
        }

    }

    @DeleteMapping("/acceptOrder/{id}")
    public Result deleteAcceptOrder(@PathVariable String id) {
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
        }
        boolean deleteAcceptOrder = orderService.deleteAcceptOrder(claims.getId(), id);
        if (deleteAcceptOrder) {
            return new Result(true, StatusCode.OK, "删除成功");
        } else {
            return new Result(false, StatusCode.ERROR, "删除失败");
        }
    }
}
