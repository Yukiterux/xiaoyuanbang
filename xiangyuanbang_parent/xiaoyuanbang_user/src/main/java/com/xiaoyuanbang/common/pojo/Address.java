package com.xiaoyuanbang.common.pojo;

import java.io.Serializable;

public class Address implements Serializable {
    private String value;
    private String address;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
