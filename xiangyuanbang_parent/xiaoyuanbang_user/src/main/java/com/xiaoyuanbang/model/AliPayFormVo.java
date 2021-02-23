package com.xiaoyuanbang.model;

import java.io.Serializable;


public class AliPayFormVo implements Serializable {
    private String money;
    private String orderid;

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }
}
