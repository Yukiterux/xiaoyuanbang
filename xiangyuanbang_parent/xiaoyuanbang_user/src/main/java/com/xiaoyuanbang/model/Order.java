package com.xiaoyuanbang.model;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * 实体类
 * @author Administrator
 *
 */
@Entity
@Table(name="tb_order")
public class Order implements Serializable{
	@Id
	private String id;//
	private String receiver_address;//订单类型为(1收货，2发货、3收货、4排队)地址
	private String receiver_mobile;//收货手机号
	private String receiver_remark_address;//收货备注地址
	private String buy_address;//订单类型为(1购买、2收货、3取货、)地址
	private String buy_remark_address;//购买备注地址
	private String buy_mobile;//手机号
	private Double buy_weight;//商品重量
	private String buy_request;//购买要求
	private Double reward;//配送费用
	private String status;//状态，1.待支付，2.待接单，3进行中，4，已完成，5，已取消
	private String is_userdelete;//是否删除，Y删除，N未删除
    private String is_errandsdelete;//是否删除，Y删除，N未删除
	private Date create_time;//订单创建时间
	private String userid;//客户Id
	private Double buy_price;//商品价格
	private String errandsid;//配送员ID
	private String secret;//私密内容，仅配送员接单后可见
	private Integer order_type;//订单类型，1帮买，2帮送，3帮取，4排队，5其他
	private Date pay_time;//订单支付时间
	private Date appointment_time;//预约跑腿时间
	private Date cancel_time;//订单自动取消时间
	private Date errands_cancel_time;//配送员订单取消时间
	private Date user_cancel_time;//用户取消订单时间
	private Date errands_confirm_time;//用户取消订单时间
	private String user_reason;
	private String is_userC;
	private String is_errC;
	private String errands_reason;
	private String user_disagree_reason;
	private String errands_disagree_reason;
	private Date accept_time;
	private Date complete_time;

	public Date getComplete_time() {
		return complete_time;
	}

	public void setComplete_time(Date complete_time) {
		this.complete_time = complete_time;
	}

	public Date getErrands_confirm_time() {
		return errands_confirm_time;
	}

	public void setErrands_confirm_time(Date errands_confirm_time) {
		this.errands_confirm_time = errands_confirm_time;
	}

	public String getIs_userC() {
		return is_userC;
	}

	public void setIs_userC(String is_userC) {
		this.is_userC = is_userC;
	}

	public String getIs_errC() {
		return is_errC;
	}

	public void setIs_errC(String is_errC) {
		this.is_errC = is_errC;
	}

	public String getUser_disagree_reason() {
		return user_disagree_reason;
	}

	public void setUser_disagree_reason(String user_disagree_reason) {
		this.user_disagree_reason = user_disagree_reason;
	}

	public String getErrands_disagree_reason() {
		return errands_disagree_reason;
	}

	public void setErrands_disagree_reason(String errands_disagree_reason) {
		this.errands_disagree_reason = errands_disagree_reason;
	}

	public Date getErrands_cancel_time() {
		return errands_cancel_time;
	}

	public void setErrands_cancel_time(Date errands_cancel_time) {
		this.errands_cancel_time = errands_cancel_time;
	}

	public Date getUser_cancel_time() {
		return user_cancel_time;
	}

	public void setUser_cancel_time(Date user_cancel_time) {
		this.user_cancel_time = user_cancel_time;
	}

	public String getUser_reason() {
		return user_reason;
	}

	public void setUser_reason(String user_reason) {
		this.user_reason = user_reason;
	}

	public String getErrands_reason() {
		return errands_reason;
	}

	public void setErrands_reason(String errands_reason) {
		this.errands_reason = errands_reason;
	}

	public Date getAccept_time() {
		return accept_time;
	}

	public void setAccept_time(Date accept_time) {
		this.accept_time = accept_time;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getReceiver_address() {
		return receiver_address;
	}
	public void setReceiver_address(String receiver_address) {
		this.receiver_address = receiver_address;
	}

	public String getReceiver_mobile() {
		return receiver_mobile;
	}
	public void setReceiver_mobile(String receiver_mobile) {
		this.receiver_mobile = receiver_mobile;
	}

	public String getReceiver_remark_address() {
		return receiver_remark_address;
	}
	public void setReceiver_remark_address(String receiver_remark_address) {
		this.receiver_remark_address = receiver_remark_address;
	}

	public String getBuy_address() {
		return buy_address;
	}
	public void setBuy_address(String buy_address) {
		this.buy_address = buy_address;
	}

	public String getBuy_remark_address() {
		return buy_remark_address;
	}
	public void setBuy_remark_address(String buy_remark_address) {
		this.buy_remark_address = buy_remark_address;
	}

	public String getBuy_mobile() {
		return buy_mobile;
	}
	public void setBuy_mobile(String buy_mobile) {
		this.buy_mobile = buy_mobile;
	}

	public Double getBuy_weight() {
		return buy_weight;
	}
	public void setBuy_weight(Double buy_weight) {
		this.buy_weight = buy_weight;
	}

	public String getBuy_request() {
		return buy_request;
	}
	public void setBuy_request(String buy_request) {
		this.buy_request = buy_request;
	}

	public Double getReward() {
		return reward;
	}
	public void setReward(Double reward) {
		this.reward = reward;
	}

	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

    public String getIs_userdelete() {
        return is_userdelete;
    }

    public void setIs_userdelete(String is_userdelete) {
        this.is_userdelete = is_userdelete;
    }

    public String getIs_errandsdelete() {
        return is_errandsdelete;
    }

    public void setIs_errandsdelete(String is_errandsdelete) {
        this.is_errandsdelete = is_errandsdelete;
    }

    public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}

	public Double getBuy_price() {
		return buy_price;
	}
	public void setBuy_price(Double buy_price) {
		this.buy_price = buy_price;
	}

	public String getErrandsid() {
		return errandsid;
	}
	public void setErrandsid(String errandsid) {
		this.errandsid = errandsid;
	}

	public String getSecret() {
		return secret;
	}
	public void setSecret(String secret) {
		this.secret = secret;
	}

	public Integer getOrder_type() {
		return order_type;
	}
	public void setOrder_type(Integer order_type) {
		this.order_type = order_type;
	}

	public Date getPay_time() {
		return pay_time;
	}
	public void setPay_time(Date pay_time) {
		this.pay_time = pay_time;
	}

	public Date getAppointment_time() {
		return appointment_time;
	}
	public void setAppointment_time(Date appointment_time) {
		this.appointment_time = appointment_time;
	}

	public Date getCancel_time() {
		return cancel_time;
	}
	public void setCancel_time(Date cancel_time) {
		this.cancel_time = cancel_time;
	}


	@Override
	public String toString() {
		return "Order{" +
				"id='" + id + '\'' +
				", receiver_address='" + receiver_address + '\'' +
				", receiver_mobile='" + receiver_mobile + '\'' +
				", receiver_remark_address='" + receiver_remark_address + '\'' +
				", buy_address='" + buy_address + '\'' +
				", buy_remark_address='" + buy_remark_address + '\'' +
				", buy_mobile='" + buy_mobile + '\'' +
				", buy_weight=" + buy_weight +
				", buy_request='" + buy_request + '\'' +
				", reward=" + reward +
				", status='" + status + '\'' +
				", is_userdelete='" + is_userdelete + '\'' +
				", is_errandsdelete='" + is_errandsdelete + '\'' +
				", create_time=" + create_time +
				", userid='" + userid + '\'' +
				", buy_price=" + buy_price +
				", errandsid='" + errandsid + '\'' +
				", secret='" + secret + '\'' +
				", order_type=" + order_type +
				", pay_time=" + pay_time +
				", appointment_time=" + appointment_time +
				", cancel_time=" + cancel_time +
				", errands_cancel_time=" + errands_cancel_time +
				", user_cancel_time=" + user_cancel_time +
				", user_reason='" + user_reason + '\'' +
				", is_userC='" + is_userC + '\'' +
				", is_errC='" + is_errC + '\'' +
				", errands_reason='" + errands_reason + '\'' +
				", user_disagree_reason='" + user_disagree_reason + '\'' +
				", errands_disagree_reason='" + errands_disagree_reason + '\'' +
				", accept_time=" + accept_time +
				'}';
	}
}
