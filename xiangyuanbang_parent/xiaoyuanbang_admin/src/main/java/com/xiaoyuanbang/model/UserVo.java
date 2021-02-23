package com.xiaoyuanbang.model;


import java.io.Serializable;
import java.util.Date;

/**
 * 实体类
 * @author Administrator
 *
 */

public class UserVo implements Serializable{
	private String id;//
	private String nickname;//用户昵称
	private String sex;//性别，1男，2女
	private Date birthday;//生日
	private String avatar;//头像
	private String is_errands;//0表示不能接单,1表示能接单
	private Integer grade;//信誉分
	private String email;//邮箱地址
	private String qq;//qq账号


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getIs_errands() {
		return is_errands;
	}

	public void setIs_errands(String is_errands) {
		this.is_errands = is_errands;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}



	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}


}
