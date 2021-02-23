package com.xiaoyuanbang.order.controller;

import com.alibaba.fastjson.JSONObject;
import com.xiaoyuanbang.common.entity.PageResult;
import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import com.xiaoyuanbang.model.Comment;
import com.xiaoyuanbang.model.ErrandsComment;
import com.xiaoyuanbang.model.Order;
import com.xiaoyuanbang.model.UserComment;
import com.xiaoyuanbang.order.service.CommentService;
import com.xiaoyuanbang.order.service.OrderService;
import com.xiaoyuanbang.model.User;
import com.xiaoyuanbang.user.service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 控制器层
 *
 * @author Administrator
 */
@RestController
@CrossOrigin
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;

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
        return new Result(true, StatusCode.OK, "查询成功", commentService.findById(id));
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
        Page<Comment> pageList = commentService.findSearch(searchMap, page, size);
        List<Comment> content = pageList.getContent();
        List<Map<String, String>> Maps = new ArrayList<>();
        Map<String, String> map = null;
        for (Comment comment : content) {
            map = JSONObject.parseObject(JSONObject.toJSONString(comment), Map.class);
            if (map.get("userid") != null) {
                User user = userService.findById((String) map.get("userid"));
                map.put("userNickname", user.getNickname());
                map.put("userGrade", user.getGrade().toString());
                map.put("userAvatar", user.getAvatar());
            }
            if (map.get("errandsid") != null) {
                User user = userService.findById((String) map.get("errandsid"));
                map.put("errandsNickname", user.getNickname());
                map.put("errandsGrade", user.getGrade().toString());
                map.put("errandsAvatar", user.getAvatar());
            }
            
            Maps.add(map);
        }
        return new Result(true, StatusCode.OK, "查询成功", new PageResult<Map<String, String>>(pageList.getTotalElements(), Maps));
    }


    /**
     * 修改
     *
     * @param comment
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Result update(@RequestBody Comment comment, @PathVariable String id) {
        comment.setId(id);
        commentService.update(comment);
        return new Result(true, StatusCode.OK, "修改成功");
    }

    /**
     * 删除
     *
     * @param id
     */

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Result delete(@PathVariable String id) {
        commentService.deleteById(id);
        return new Result(true, StatusCode.OK, "删除成功");
    }


    @GetMapping(value = "/ErrandsComment/{page}/{size}")
    public Result getErrandsComment(@PathVariable int page, @PathVariable int size) {
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;

        if (claims == null) {

            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }
        String userid = claims.getId();
        Page<Comment> comments = commentService.getErrandsComment(userid, page, size);
        List<Comment> content = comments.getContent();
        List<ErrandsComment> errandsComments = new ArrayList<>();
        for (Comment comment : content) {
            ErrandsComment errandsComment = new ErrandsComment();
            errandsComment.setId(comment.getId());
            errandsComment.setErrands_comment(comment.getErrands_comment());
            errandsComment.setErrands_grade(comment.getErrands_grade());
            errandsComment.setErrandsid(comment.getErrandsid());
            errandsComment.setCtime(comment.getCtime());
            User user = userService.findById(comment.getErrandsid());
            errandsComment.setUserNickname(user.getNickname());
            errandsComment.setGrade(user.getGrade());
            errandsComment.setAvatar(user.getAvatar());
            errandsComments.add(errandsComment);

        }
        return new Result(true, StatusCode.OK, "查询成功", new PageResult<ErrandsComment>(comments.getTotalElements(), errandsComments));
    }

    @GetMapping(value = "/userComment/{page}/{size}")
    public Result getUserComment(@PathVariable int page, @PathVariable int size) {
        Object claims_user = request.getAttribute("claims_user");
        Claims claims = (Claims) claims_user;

        if (claims == null) {

            return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
        }

        String userid = claims.getId();
        Page<Comment> comments = commentService.getUserComment(userid, page, size);
        List<Comment> content = comments.getContent();
        List<UserComment> userComments = new ArrayList<>();
        for (Comment comment : content) {
            UserComment userComment = new UserComment();
            userComment.setId(comment.getId());
            userComment.setUser_comment(comment.getUser_comment());
            userComment.setUser_grade(comment.getUser_grade());
            userComment.setUserid(comment.getUserid());
            userComment.setCtime(comment.getCtime());
            User user = userService.findById(comment.getUserid());
            userComment.setUserNickname(user.getNickname());
            userComment.setGrade(user.getGrade());
            userComment.setAvatar(user.getAvatar());
            userComments.add(userComment);
        }
        return new Result(true, StatusCode.OK, "查询成功", new PageResult<UserComment>(comments.getTotalElements(), userComments));
    }
}
