package com.xiaoyuanbang.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * 实体类
 * @author Administrator
 *
 */
@Entity
@Table(name="tb_user")
public class User implements Serializable{

	@Id
	private String id;//


	
	private String password;//密码
	private String status;//使用状态（Y正常 N非正常）
	private String mobile;//手机号
	private String nickname;//用户昵称
	private String sex;//性别，1男，2女
	private java.util.Date birthday;//生日
	private String avatar;//头像
	private String id_card;//身份证号
	private String is_errands;//0表示不能接单,1表示能接单
	private String name;//真实姓名
	private Double account_balance;//账户余额
	private Integer grade;//信誉分
	private String email;//邮箱地址
	private java.util.Date create_time;//注册时间
	private String qq;//qq账号
	private java.util.Date last_login_time;//最后登录时间
	private String idcard_address;

	public String getIdcard_address() {
		return idcard_address;
	}

	public void setIdcard_address(String idcard_address) {
		this.idcard_address = idcard_address;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getPassword() {		
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getStatus() {		
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	public String getMobile() {		
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
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

	public java.util.Date getBirthday() {		
		return birthday;
	}
	public void setBirthday(java.util.Date birthday) {
		this.birthday = birthday;
	}

	public String getAvatar() {		
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getId_card() {		
		return id_card;
	}
	public void setId_card(String id_card) {
		this.id_card = id_card;
	}

	public String getIs_errands() {		
		return is_errands;
	}
	public void setIs_errands(String is_errands) {
		this.is_errands = is_errands;
	}

	public String getName() {		
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Double getAccount_balance() {		
		return account_balance;
	}
	public void setAccount_balance(Double account_balance) {
		this.account_balance = account_balance;
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

	public java.util.Date getCreate_time() {		
		return create_time;
	}
	public void setCreate_time(java.util.Date create_time) {
		this.create_time = create_time;
	}

	public String getQq() {		
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}

	public java.util.Date getLast_login_time() {		
		return last_login_time;
	}
	public void setLast_login_time(java.util.Date last_login_time) {
		this.last_login_time = last_login_time;
	}


	
}
