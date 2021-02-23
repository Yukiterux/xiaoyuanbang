package com.xiaoyuanbang.user.controller;

import com.xiaoyuanbang.common.entity.PageResult;
import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import com.xiaoyuanbang.common.util.JwtUtil;
import com.xiaoyuanbang.model.User;
import com.xiaoyuanbang.model.UserVo;
import com.xiaoyuanbang.user.service.UserService;
import io.jsonwebtoken.Claims;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.util.Date;
import java.util.Map;

/**
 * 控制器层
 * @author Administrator
 *
 */
@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private UserService userService;
	@Autowired
	private  BCryptPasswordEncoder encode;

	@Autowired
	private RedisTemplate redisTemplate;
	@Autowired
	private JwtUtil jwtUtil;
	/**
	 * 根据ID查询
	 * @param id ID
	 * @return
	 */
	@RequestMapping(value="/{id}",method= RequestMethod.GET)
	public Result findById(@PathVariable String id){
		return new Result(true,StatusCode.OK,"查询成功",userService.findById(id));
	}

	@RequestMapping(value="/info/{id}",method= RequestMethod.GET)
	public Result findInfoById(@PathVariable String id){
		User user = userService.findById(id);
		UserVo userVo=new UserVo();
		userVo.setAvatar(user.getAvatar());
		userVo.setBirthday(user.getBirthday());
		userVo.setEmail(user.getEmail());
		userVo.setGrade(user.getGrade());
		userVo.setId(user.getId());
		userVo.setNickname(user.getNickname());
		userVo.setQq(user.getQq());
		userVo.setSex(user.getSex());
		return new Result(true,StatusCode.OK,"查询成功",userVo);
	}


	@RequestMapping(value="/mobile/{mobile}",method= RequestMethod.GET)
	public Result findByMoblie(@PathVariable String mobile){
		User user = userService.findByMobile(mobile);
		return new Result(true,StatusCode.OK,"查询成功",user==null?0:1);
	}



	@RequestMapping(value="/checkName/{name}",method= RequestMethod.GET)
	public Result checkName(@PathVariable String name){
		try {
			name= URLDecoder.decode(name,"UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("查询昵称"+name);
		Object claims_user = request.getAttribute("claims_user");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
		}
		String id = claims.getId();

		return new Result(true,StatusCode.OK,"查询成功",userService.checkName(name,id));
	}



	@RequestMapping(value="/info",method= RequestMethod.GET)
	public Result info(){
		Object claims_user = request.getAttribute("claims_user");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
		}
		String id = claims.getId();
		return new Result(true,StatusCode.OK,"查询成功",userService.userfindById(id));
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
		Object claims_user = request.getAttribute("claims_admin");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
		}
		Page<User> pageList = userService.findSearch(searchMap, page, size);
		return  new Result(true,StatusCode.OK,"查询成功",  new PageResult<User>(pageList.getTotalElements(), pageList.getContent()) );
	}
	

	/**
	 * 修改
	 * @param user
	 */
	@RequestMapping(value="/{id}",method= RequestMethod.PUT)
	public Result update(@RequestBody User user, @PathVariable String id ){
		Object claims_user = request.getAttribute("claims_admin");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
		}
		user.setId(id);
		userService.update(user);		
		return new Result(true,StatusCode.OK,"修改成功");
	}
	

	/**
	 * 删除
	 * @param id
	 */
	@RequestMapping(value="/{id}",method= RequestMethod.DELETE)
	public Result delete(@PathVariable String id ){
		Object claims_user = request.getAttribute("claims_admin");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
		}
		userService.deleteById(id);
		return new Result(true,StatusCode.OK,"删除成功");
	}
}
