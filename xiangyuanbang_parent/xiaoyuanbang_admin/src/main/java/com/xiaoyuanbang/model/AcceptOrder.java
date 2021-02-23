package com.xiaoyuanbang.model;

import java.util.Date;

public class AcceptOrder {
    private String id;
    private String orderid;//
    private String status;//状态，1.待支付，2.待接单，3进行中，4，已完成，5，已取消
    private Double reward;//配送费用
    private String userid;//客户Id
    private Date accept_time;
    private String order_type;//订单类型，1帮买，2帮送，3帮取，4排队，5其他
    private Date appointment_time;//预约跑腿时间
    private String userNickname;//用户昵称
    private String userAvatar;//头像
    private Integer userGrade;//信誉分
    private String userC;
    private String errC;

    public String getUserC() {
        return userC;
    }

    public void setUserC(String userC) {
        this.userC = userC;
    }

    public String getErrC() {
        return errC;
    }

    public void setErrC(String errC) {
        this.errC = errC;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        orderid = orderid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getReward() {
        return reward;
    }

    public void setReward(Double reward) {
        this.reward = reward;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public Date getAccept_time() {
        return accept_time;
    }

    public void setAccept_time(Date accept_time) {
        this.accept_time = accept_time;
    }

    public String getOrder_type() {
        return order_type;
    }

    public void setOrder_type(String order_type) {
        this.order_type = order_type;
    }

    public Date getAppointment_time() {
        return appointment_time;
    }

    public void setAppointment_time(Date appointment_time) {
        this.appointment_time = appointment_time;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    public Integer getUserGrade() {
        return userGrade;
    }

    public void setUserGrade(Integer userGrade) {
        this.userGrade = userGrade;
    }


    @Override
    public String toString() {
        return "AcceptOrder{" +
                "id='" + id + '\'' +
                ", orderid='" + orderid + '\'' +
                ", status='" + status + '\'' +
                ", reward=" + reward +
                ", userid='" + userid + '\'' +
                ", accept_time=" + accept_time +
                ", order_type='" + order_type + '\'' +
                ", appointment_time=" + appointment_time +
                ", userNickname='" + userNickname + '\'' +
                ", userAvatar='" + userAvatar + '\'' +
                ", userGrade=" + userGrade +
                '}';
    }
}
