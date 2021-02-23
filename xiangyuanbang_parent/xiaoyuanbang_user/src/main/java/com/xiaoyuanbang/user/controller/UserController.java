package com.xiaoyuanbang.user.controller;

import com.xiaoyuanbang.model.User;
import com.xiaoyuanbang.model.UserVo;
import com.xiaoyuanbang.user.service.UserService;
import com.xiaoyuanbang.common.entity.PageResult;
import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import io.jsonwebtoken.Claims;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.xiaoyuanbang.common.util.JwtUtil;

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
	 * 查询全部数据
	 * @return
	 */
	@RequestMapping(method= RequestMethod.GET)
	public Result findAll(){
		return new Result(true,StatusCode.OK,"查询成功",userService.findAll());
	}
	
	/**
	 * 根据ID查询FF
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
		Page<User> pageList = userService.findSearch(searchMap, page, size);
		return  new Result(true,StatusCode.OK,"查询成功",  new PageResult<User>(pageList.getTotalElements(), pageList.getContent()) );
	}

	/**
     * 根据条件查询
     * @param searchMap
     * @return
     */
    @RequestMapping(value="/search",method = RequestMethod.POST)
    public Result findSearch( @RequestBody Map searchMap){
        return new Result(true,StatusCode.OK,"查询成功",userService.findSearch(searchMap));
    }
	
	/**
	 * 增加
	 * @param user
	 */
	@RequestMapping(method=RequestMethod.POST)
	public Result add(@RequestBody User user  ){
		userService.add(user);
		return new Result(true,StatusCode.OK,"增加成功");
	}








	/**
	 * 修改
	 * @param user
	 */
	@RequestMapping(value="/{id}",method= RequestMethod.PUT)
	public Result update(@RequestBody User user, @PathVariable String id ){
		user.setId(id);
		userService.update(user);		
		return new Result(true,StatusCode.OK,"修改成功");
	}

	@PutMapping(value = "/refund/{userid}/{money}")
	public Result refund(@PathVariable String  userid,@PathVariable String money,@RequestBody String token){
		Claims claims = jwtUtil.parseJWT(token);
		String id = claims.getId();
        if (id.equals("user")){
			System.out.println("退还用户钱款");
            userService.updateMoney(userid,money);
			return new Result(true,StatusCode.OK,"退款成功");
        }else {
            return new Result(false,StatusCode.ERROR,"退款出错");
        }
    }


	@PutMapping(value = "/change/Ava")
	public Result changeAva(@RequestBody String img){
		try {
			img= URLDecoder.decode(img,"UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
		}
		Object claims_user = request.getAttribute("claims_user");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
		}
		String id = claims.getId();
		userService.updateAva(img,id);
		return new Result(true,StatusCode.OK,"修改成功");
	}

	@PutMapping(value = "/apply")
	public Result apply(@RequestBody User user){

		Object claims_user = request.getAttribute("claims_user");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
		}
		String id = claims.getId();
		System.out.println(user.getIdcard_address());
		userService.apply(user,id);

		return new Result(true,StatusCode.OK,"申请成功");
	}


	/**
	 * 删除
	 * @param id
	 */
	@RequestMapping(value="/{id}",method= RequestMethod.DELETE)
	public Result delete(@PathVariable String id ){
		userService.deleteById(id);
		return new Result(true,StatusCode.OK,"删除成功");
	}

	@RequestMapping(value="/register/{code}",method=RequestMethod.POST)
	public Result regist(@RequestBody User user, @PathVariable String code){
		String syscode = (String) redisTemplate.opsForValue().get("regist_"+user.getMobile());

		if (syscode==null){
			return new Result(false,StatusCode.ERROR,"注册失败,验证码已过期，请重新获取");
		}

		if (!syscode.equals(code)){
			return new Result(false,StatusCode.ERROR,"注册失败,验证码输入错误");

		}

		if(StringUtils.isBlank(user.getNickname())||StringUtils.isBlank(user.getPassword())||StringUtils.isBlank(user.getMobile())){
			return new Result(false,StatusCode.ERROR,"注册失败,请输入正确的信息");
		}

		User user1 = userService.findByMobile(user.getMobile());
		if (user1!=null){
			return new Result(false,StatusCode.ERROR,"注册失败,此手机号已注册");
		}


		user.setPassword(encode.encode(user.getPassword()));
		user.setStatus("Y");
		user.setAvatar("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1432783301,3307258338&fm=26&gp=0.jpg");
		user.setAccount_balance(0d);
		user.setIs_errands("0");
		user.setGrade(100);
		user.setCreate_time(new Date());
		user.setLast_login_time(new Date());
		userService.add(user);
		return new Result(true,StatusCode.OK,"注册成功");
	}


	@RequestMapping(value="/changeNum1/{code}",method=RequestMethod.POST)
	public Result changeNum(@RequestBody User user, @PathVariable String code){
		String syscode = (String) redisTemplate.opsForValue().get("change1_"+user.getMobile());
		System.out.println(code+syscode);
		if (syscode==null){
			return new Result(false,StatusCode.ERROR,"验证码已过期，请重新获取");
		}

		if (!syscode.equals(code)){
			return new Result(false,StatusCode.ERROR,"验证码输入错误");

		}
		return new Result(true,StatusCode.OK,"验证码输入正确");
	}


	@RequestMapping(value="/changeNum2/{code}",method=RequestMethod.POST)
	public Result changeNum2(@RequestBody User user, @PathVariable String code){
		String syscode = (String) redisTemplate.opsForValue().get("change2_"+user.getMobile());

		if (syscode==null){
			return new Result(false,StatusCode.ERROR,"验证码已过期，请重新获取");
		}

		if (!syscode.equals(code)){
			return new Result(false,StatusCode.ERROR,"验证码输入错误");

		}
		User user1 = userService.findByMobile(user.getMobile());
		if (user1!=null){
			return new Result(false,StatusCode.ERROR,"修改失败,此手机号已绑定其他账号");
		}
		userService.updateMobile(user.getMobile(),user.getId());
		return new Result(true,StatusCode.OK,"修改成功");
	}


	@PostMapping(value = "login")
	public Result login(@RequestBody User user){
		Map map = userService.login(user);
		if(map==null){
			return 	new Result(false,StatusCode.ERROR,"登录失败");
		}else if (map.get("status")!=null){
			return 	new Result(false,StatusCode.ERROR,"用户账号已禁用");
		}
		return new Result(true,StatusCode.OK,"登陆成功",map);
	}



	@PostMapping(value = "/sendsms/{mobile}")
	public Result sendsms(@PathVariable String mobile){
		userService.sendsms(mobile);
		return new Result(true,StatusCode.OK,"发送短信验证码成功");
	}

	@PostMapping(value = "/sendChange1Sms/{mobile}")
	public Result sendChange1Sms(@PathVariable String mobile){
		userService.sendChange1Sms(mobile);
		return new Result(true,StatusCode.OK,"发送短信验证码成功");
	}
	@PostMapping(value = "/sendChange2Sms/{mobile}")
	public Result sendChange2Sms(@PathVariable String mobile){
		userService.sendChange2Sms(mobile);
		return new Result(true,StatusCode.OK,"发送短信验证码成功");
	}
	
	@PutMapping(value = "/updateInfo/{changePwd}")
	public Result updateInfo(@RequestBody User user,@PathVariable String changePwd){
		Object claims_user = request.getAttribute("claims_user");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
		}
		String id = claims.getId();

		user.setId(id);

		userService.updateInfo(user,changePwd);
		return new Result(true,StatusCode.OK,"修改成功");
	}
}
