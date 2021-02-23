package com.xiaoyuanbang.order.controller;

import com.alibaba.fastjson.JSONObject;
import com.xiaoyuanbang.common.entity.PageResult;
import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import com.xiaoyuanbang.common.util.JwtUtil;
import com.xiaoyuanbang.model.Order;
import com.xiaoyuanbang.order.service.OrderService;
import com.xiaoyuanbang.model.User;
import com.xiaoyuanbang.user.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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
    private UserService userService;

    /**
     * 修改
     *
     * @param order
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Result update(@RequestBody Order order, @PathVariable String id) {
        Object claims_user = request.getAttribute("claims_admin");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
        }
        order.setId(id);
        orderService.update(order);
        return new Result(true, StatusCode.OK, "修改成功");
    }

    @RequestMapping(value = "/cancel/{id}", method = RequestMethod.PUT)
    public Result cancel(@PathVariable String id) {
        Object claims_user = request.getAttribute("claims_admin");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
        }
        orderService.cancel(id);
        return new Result(true, StatusCode.OK, "取消成功");
    }

    @RequestMapping(value = "/continue/{id}", method = RequestMethod.PUT)
    public Result continueOrder(@PathVariable String id) {
        Object claims_user = request.getAttribute("claims_admin");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
        }
        orderService.continueOrder(id);
        return new Result(true, StatusCode.OK, "取消成功");
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
        Object claims_user = request.getAttribute("claims_admin");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
        }
        String id = claims.getId();
        Page<Order> pageList = orderService.findSearch(searchMap, page, size);
        List<Order> content = pageList.getContent();
        List<Map<String,String>> Maps=new ArrayList<> ();
        Map<String,String> map =null;
        for (Order order : content) {
            map= JSONObject.parseObject(JSONObject.toJSONString(order), Map.class);
            if (map.get("userid") != null) {
                User user = userService.findById((String) map.get("userid"));
                map.put("userNickname", user.getNickname());
                map.put("userGrade", user.getGrade().toString());
                map.put("userAvatar", user.getAvatar());
            }
            Maps.add(map);
        }
        return new Result(true, StatusCode.OK, "查询成功", new PageResult<Map<String,String>>(pageList.getTotalElements(), Maps));
    }
    
    /**
     * 根据ID查询
     *
     * @param id ID
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Result findById(@PathVariable String id) {
        Object claims_user = request.getAttribute("claims_admin");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
        }
        return new Result(true, StatusCode.OK, "查询成功", orderService.findById(id));
    }

    /**
     * 删除
     *
     * @param id
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Result delete(@PathVariable String id) {
        Object claims_user = request.getAttribute("claims_admin");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
        }
        orderService.deleteById(id);
        return new Result(true, StatusCode.OK, "删除成功");
    }
    
    @RequestMapping(value = "/recentOrder", method = RequestMethod.GET)
    public Result findById(){
        Object claims_user = request.getAttribute("claims_admin");
        Claims claims = (Claims) claims_user;
        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
        }
        return new Result(true, StatusCode.OK, "查询成功", orderService.findRecentOrder());
    }
}
