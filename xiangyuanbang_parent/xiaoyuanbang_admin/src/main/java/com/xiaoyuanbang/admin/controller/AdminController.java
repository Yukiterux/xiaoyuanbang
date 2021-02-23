package com.xiaoyuanbang.admin.controller;

import com.xiaoyuanbang.model.Admin;
import com.xiaoyuanbang.admin.service.AdminService;
import com.xiaoyuanbang.common.entity.PageResult;
import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import com.xiaoyuanbang.model.User;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * 控制器层
 * @author Administrator
 *
 */
@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	@Autowired
	private HttpServletRequest request;
	
	
	/**
	 * 查询全部数据
	 * @return
	 */
	@RequestMapping(method= RequestMethod.GET)
	public Result findAll(){
		return new Result(true,StatusCode.OK,"查询成功",adminService.findAll());
	}
	
	/**
	 * 根据ID查询
	 * @param id ID
	 * @return
	 */
	@RequestMapping(value="/{id}",method= RequestMethod.GET)
	public Result findById(@PathVariable String id){
		Object claims_user = request.getAttribute("claims_admin");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
		}
		return new Result(true,StatusCode.OK,"查询成功",adminService.findById(id));
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
		Page<Admin> pageList = adminService.findSearch(searchMap, page, size);
		return  new Result(true,StatusCode.OK,"查询成功",  new PageResult<Admin>(pageList.getTotalElements(), pageList.getContent()) );
	}

	/**
     * 根据条件查询
     * @param searchMap
     * @return
     */
    @RequestMapping(value="/search",method = RequestMethod.POST)
    public Result findSearch( @RequestBody Map searchMap){
        return new Result(true,StatusCode.OK,"查询成功",adminService.findSearch(searchMap));
    }
	
	/**
	 * 增加
	 * @param admin
	 */
	@RequestMapping(method=RequestMethod.POST)
	public Result add(@RequestBody Admin admin  ){
		adminService.add(admin);
		return new Result(true,StatusCode.OK,"增加成功");
	}
	
	/**
	 * 修改
	 * @param admin
	 */
	@RequestMapping(value="/{id}",method= RequestMethod.PUT)
	public Result update(@RequestBody Admin admin, @PathVariable String id ){
		admin.setId(id);
		adminService.update(admin);		
		return new Result(true,StatusCode.OK,"修改成功");
	}
	
	/**
	 * 删除
	 * @param id
	 */
	@RequestMapping(value="/{id}",method= RequestMethod.DELETE)
	public Result delete(@PathVariable String id ){
		adminService.deleteById(id);
		return new Result(true,StatusCode.OK,"删除成功");
	}


	@PostMapping(value = "login")
	public Result login(@RequestBody Admin admin){
		System.out.println(admin);
		Map map = adminService.login(admin);
		if(map==null){
			return 	new Result(false,StatusCode.ERROR,"登录失败");
		}
		return new Result(true,StatusCode.OK,"登陆成功",map);
	}
	
	@GetMapping(value = "/count")
	public Result getCount(){
		Object claims_user = request.getAttribute("claims_admin");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
		}
		Map<String, Long> count = adminService.getCount();
		return new Result(true,StatusCode.OK,"登陆成功",count);
	}

	@GetMapping(value = "/info")
	public Result getInfo(){
		Object claims_user = request.getAttribute("claims_admin");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
		}
		Admin admin = adminService.findById(claims.getId());
		return new Result(true,StatusCode.OK,"获取成功",admin);
	}

	@PutMapping(value = "/updateInfo")
	public Result updateInfo(@RequestBody Admin admin){
		Object claims_user = request.getAttribute("claims_admin");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再查询");
		}
		String id = claims.getId();

		admin.setId(id);

		adminService.updateInfo(admin);
		return new Result(true,StatusCode.OK,"修改成功");
	}


	@PutMapping(value = "/change/Ava")
	public Result changeAva(@RequestBody String img){
		try {
			img= URLDecoder.decode(img,"UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
		}
		Object claims_user = request.getAttribute("claims_admin");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
		}
		String id = claims.getId();
		adminService.updateAva(img,id);
		return new Result(true,StatusCode.OK,"修改成功");
	}


	@PutMapping(value = "/change/password")
	public Result changePassword(@RequestBody HashMap<String,String> map) {
		Object claims_user = request.getAttribute("claims_admin");
		Claims claims = (Claims) claims_user;
		if (claims == null) {
			return new Result(false, StatusCode.ACCESSERROR, "请登录后再操作");
		}
		String id = claims.getId();
		boolean b = adminService.updatePassword(id, map);
		if(!b){
			return new Result(false,StatusCode.ERROR,"修改失败");

		}else {
			return new Result(true,StatusCode.OK,"修改成功");
		}

	}
}
