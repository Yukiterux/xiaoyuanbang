package com.xiaoyuanbang.order.controller;

import com.xiaoyuanbang.model.*;
import com.xiaoyuanbang.order.service.CommentService;
import com.xiaoyuanbang.order.service.OrderService;
import com.xiaoyuanbang.common.entity.PageResult;
import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
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
 * @author Administrator
 *
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
//private RestTemplate restTemplate
	private UserService userService;
	@Autowired
	private OrderService orderService;
	@PutMapping(value = "/userComment/{id}")
	public Result userComment(@PathVariable String id,@RequestBody Comment userCom){
		Object claims_user = request.getAttribute("claims_user");

		Claims claims = (Claims) claims_user;

		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
		}

		Order order = orderService.findById(id);

		String userid = claims.getId();

		System.out.println(order.getUserid()+"fucker"+userid);

		if (!order.getUserid().equals(userid)){
			return new Result(false,StatusCode.ERROR,"评论出错");
		}

		Comment comment = commentService.findById(id);

		if (comment==null) {
			comment = new Comment();
			comment.setId(id);
			comment.setUserid(userid);
			comment.setUser_grade(userCom.getUser_grade());
			comment.setUser_comment(userCom.getUser_comment());
			comment.setCtime(new Date());
			commentService.add(comment);
			orderService.userC("Y",id);
			orderService.updateGrade(order.getErrandsid(),userCom.getUser_grade());
			return new Result(true, StatusCode.OK, "评论成功");
		}else{
			if(comment.getUserid()!=null){
				return new Result(false,StatusCode.ERROR,"此订单已评论");
			}else {
				comment.setUserid(userid);
				comment.setUser_grade(userCom.getUser_grade());
				comment.setUser_comment(userCom.getUser_comment());
				commentService.userCom(comment);
				orderService.userC("Y",id);
				orderService.updateGrade(order.getErrandsid(),userCom.getUser_grade());
				return new Result(true, StatusCode.OK, "评论成功");
			}
		}
	}


	//配送员评价
	@PutMapping(value = "/errComment/{id}")
	public Result errComment(@PathVariable String id,@RequestBody Comment errCom){
		Object claims_user = request.getAttribute("claims_user");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
		}
		Order order = orderService.findById(id);
		String errid = claims.getId();

		if (!order.getErrandsid().equals(errid)){
			return new Result(false,StatusCode.ERROR,"评论出错");
		}
		Comment comment = commentService.findById(id);
		if (comment==null) {
			comment = new Comment();

			comment.setId(id);
			comment.setErrandsid(errid);
			comment.setErrands_grade(errCom.getErrands_grade());
			comment.setErrands_comment(errCom.getErrands_comment());
			comment.setCtime(new Date());
			commentService.add(comment);
			orderService.errC("Y",id);
			orderService.updateGrade(order.getUserid(),errCom.getErrands_grade());
			return new Result(true, StatusCode.OK, "评论成功");
		}else{
			if(comment.getErrandsid()!=null){
				return new Result(false,StatusCode.ERROR,"此订单已评论");
			}else {
				comment.setErrandsid(errid);
				comment.setErrands_grade(errCom.getErrands_grade());
				comment.setErrands_comment(errCom.getErrands_comment());
				commentService.errCom(comment);
				orderService.errC("Y",id);
				orderService.updateGrade(order.getUserid(),errCom.getErrands_grade());
				return new Result(true, StatusCode.OK, "评论成功");
			}
		}
	}


	/**
	 * 查询全部数据
	 * @return
	 */
	@RequestMapping(method= RequestMethod.GET)
	public Result findAll(){
		return new Result(true,StatusCode.OK,"查询成功",commentService.findAll());
	}
	
	/**
	 * 根据ID查询
	 * @param id ID
	 * @return
	 */
	@RequestMapping(value="/{id}",method= RequestMethod.GET)
	public Result findById(@PathVariable String id){
		return new Result(true,StatusCode.OK,"查询成功",commentService.findById(id));
	}


	/**
	 * 分页+多条件查询
	 * @param searchMap 查询条件封装
	 * @param page 页码
	 * @param size 页大小
	 * @return 分页结果
	 */
	@RequestMapping(value="/search/{page}/{size}",method=RequestMethod.POST)
	public Result findSearch(@RequestBody Map searchMap , @PathVariable int page, @PathVariable int size){
		Page<Comment> pageList = commentService.findSearch(searchMap, page, size);
		return  new Result(true,StatusCode.OK,"查询成功",  new PageResult<Comment>(pageList.getTotalElements(), pageList.getContent()) );
	}

	/**
     * 根据条件查询
     * @param searchMap
     * @return
     */
    @RequestMapping(value="/search",method = RequestMethod.POST)
    public Result findSearch( @RequestBody Map searchMap){
        return new Result(true,StatusCode.OK,"查询成功",commentService.findSearch(searchMap));
    }
	
	/**
	 * 增加
	 * @param comment
	 */
	@RequestMapping(method=RequestMethod.POST)
	public Result add(@RequestBody Comment comment  ){
		commentService.add(comment);
		return new Result(true,StatusCode.OK,"增加成功");
	}
	
	/**
	 * 修改
	 * @param comment
	 */
	@RequestMapping(value="/{id}",method= RequestMethod.PUT)
	public Result update(@RequestBody Comment comment, @PathVariable String id ){
		comment.setId(id);
		commentService.update(comment);		
		return new Result(true,StatusCode.OK,"修改成功");
	}
	
	/**
	 * 删除
	 * @param id
	 */

	@RequestMapping(value="/{id}",method= RequestMethod.DELETE)
	public Result delete(@PathVariable String id ){
		commentService.deleteById(id);
		return new Result(true,StatusCode.OK,"删除成功");
	}


	@GetMapping(value = "/ErrandsComment/{page}/{size}")
	public Result getErrandsComment(@PathVariable int page, @PathVariable int size){
		Object claims_user = request.getAttribute("claims_user");
		Claims claims = (Claims) claims_user;
		
		if (claims == null) {

			return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
		}

		String userid = claims.getId();

		Page<Comment> comments=commentService.getErrandsComment(userid,page,size);
		List<Comment> content = comments.getContent();
		List<ErrandsComment> errandsComments=new ArrayList<>();
		for(Comment comment:content){
			ErrandsComment errandsComment= new ErrandsComment();
			errandsComment.setId(comment.getId());
			errandsComment.setErrands_comment(comment.getErrands_comment());
			errandsComment.setErrands_grade(comment.getErrands_grade());
			errandsComment.setErrandsid(comment.getErrandsid());
			errandsComment.setCtime(comment.getCtime());
			
//			ResponseEntity<Result> responseEntity = restTemplate.getForEntity("http://xiaoyuanbang-user/user/{id}", Result.class, comment.getErrandsid());
//			Result result = responseEntity.getBody();
//			Map userMap = (Map) result.getData();
//			User user = new User();
//			ConvertUtils.register(new DateConverter(null), Date.class);
//			try {
//				BeanUtils.populate(user, userMap);
//			} catch (IllegalAccessException e) {
//				e.printStackTrace();
//			} catch (InvocationTargetException e) {
//				e.printStackTrace();
//			}
			User user=userService.findById(comment.getErrandsid());
			errandsComment.setUserNickname(user.getNickname());
			errandsComment.setGrade(user.getGrade());
			errandsComment.setAvatar(user.getAvatar());
			errandsComments.add(errandsComment);

		}
		return new Result(true,StatusCode.OK,"查询成功",new PageResult<ErrandsComment>(comments.getTotalElements(),errandsComments));
	}

	@GetMapping(value = "/userComment/{page}/{size}")
	public Result getUserComment(@PathVariable int page, @PathVariable int size){
		Object claims_user = request.getAttribute("claims_user");
		Claims claims = (Claims) claims_user;

		if (claims == null) {

			return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
		}

		String userid = claims.getId();

		Page<Comment> comments=commentService.getUserComment(userid,page,size);
		List<Comment> content = comments.getContent();
		List<UserComment> userComments=new ArrayList<>();
		for(Comment comment:content){
			UserComment userComment= new UserComment();
			userComment.setId(comment.getId());
			userComment.setUser_comment(comment.getUser_comment());
			userComment.setUser_grade(comment.getUser_grade());
			userComment.setUserid(comment.getUserid());
			userComment.setCtime(comment.getCtime());
//				ResponseEntity<Result> responseEntity = restTemplate.getForEntity("http://xiaoyuanbang-user/user/{id}", Result.class, comment.getUserid());
//				Result result = responseEntity.getBody();
//				Map userMap = (Map) result.getData();
//				User user = new User();
//				ConvertUtils.register(new DateConverter(null), Date.class);
//				try {
//					BeanUtils.populate(user, userMap);
//				} catch (IllegalAccessException e) {
//					e.printStackTrace();
//				} catch (InvocationTargetException e) {
//					e.printStackTrace();
//				}
			User user = userService.findById(comment.getUserid());
			userComment.setUserNickname(user.getNickname());
			userComment.setGrade(user.getGrade());
			userComment.setAvatar(user.getAvatar());
			userComments.add(userComment);

		}

		return new Result(true,StatusCode.OK,"查询成功",new PageResult<UserComment>(comments.getTotalElements(),userComments));
	}
}
