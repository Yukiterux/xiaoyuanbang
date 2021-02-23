package com.xiaoyuanbang.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 实体类
 * @author Administrator
 *
 */

public class ErrandsComment implements Serializable{

	private String id;//

	private String userNickname;//用户昵称
	private String avatar;//头像
	private Integer grade;//信誉分

	private String errandsid;//配送员id
	private String errands_comment;//配送员评论
	private Integer errands_grade;//配送员评分

	private Date ctime;//创建时间

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserNickname() {
		return userNickname;
	}

	public void setUserNickname(String userNickname) {
		this.userNickname = userNickname;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public String getErrandsid() {
		return errandsid;
	}

	public void setErrandsid(String errandsid) {
		this.errandsid = errandsid;
	}

	public String getErrands_comment() {
		return errands_comment;
	}

	public void setErrands_comment(String errands_comment) {
		this.errands_comment = errands_comment;
	}

	public Integer getErrands_grade() {
		return errands_grade;
	}

	public void setErrands_grade(Integer errands_grade) {
		this.errands_grade = errands_grade;
	}

	public Date getCtime() {
		return ctime;
	}

	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}
}
