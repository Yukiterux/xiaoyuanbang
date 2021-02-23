package com.xiaoyuanbang.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.io.Serializable;
import java.util.Date;

@Document(indexName = "orderindex",type = "ordervo")
public class EsOrderVo implements Serializable {
    @Id
    private String id;
    @JsonProperty("orderid")
    private String Orderid;//
    @JsonProperty("create_time")
    private Date create_time;//订单创建时间

    public Date getCancel_time() {
        return cancel_time;
    }

    public void setCancel_time(Date cancel_time) {
        this.cancel_time = cancel_time;
    }

    @JsonProperty("cancel_time")
    private Date cancel_time;//订单取消时间
    @JsonProperty("user_id")
    private String userid;//客户Id

    @JsonProperty("order_type")

    private String order_type;//订单类型，1帮买，2帮送，3帮取，4排队，5其他

    @JsonProperty("appointment_time")

    private Date appointment_time;//预约跑腿时间
    @JsonProperty("userNickname")
    private String userNickname;//用户昵称
    @JsonProperty("avatar")
    private String avatar;//头像
    @JsonProperty("grade")
    private Integer grade;//信誉分

    public Double getReward() {
        return reward;
    }

    public void setReward(Double reward) {
        this.reward = reward;
    }

    @JsonProperty("reward")
    private Double reward;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderid() {
        return Orderid;
    }

    public void setOrderid(String orderid) {
        Orderid = orderid;
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

    @Override
    public String toString() {
        return "OrderVo{" +
                "id='" + id + '\'' +
                ", Orderid='" + Orderid + '\'' +
                ", create_time=" + create_time +
                ", cancel_time=" + cancel_time +
                ", userid='" + userid + '\'' +
                ", order_type='" + order_type + '\'' +
                ", appointment_time=" + appointment_time +
                ", userNickname='" + userNickname + '\'' +
                ", avatar='" + avatar + '\'' +
                ", grade=" + grade +
                ", reward=" + reward +
                '}';
    }
}
