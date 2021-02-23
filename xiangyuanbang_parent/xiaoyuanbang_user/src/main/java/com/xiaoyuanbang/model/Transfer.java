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
@Table(name="tb_transfer")
public class Transfer implements Serializable{

	@Id
	private String id;//


	
	private java.util.Date time;//时间
	private String remark;//备注
	private String account;//账号
	private String code;//状态码
	private String success;//成功
	private String msg;//原因
	private String amount;//金额 

	
	public String getId() {		
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public java.util.Date getTime() {		
		return time;
	}
	public void setTime(java.util.Date time) {
		this.time = time;
	}

	public String getRemark() {		
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getAccount() {		
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}

	public String getCode() {		
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}

	public String getSuccess() {		
		return success;
	}
	public void setSuccess(String success) {
		this.success = success;
	}

	public String getMsg() {		
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getAmount() {		
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}


	
}
