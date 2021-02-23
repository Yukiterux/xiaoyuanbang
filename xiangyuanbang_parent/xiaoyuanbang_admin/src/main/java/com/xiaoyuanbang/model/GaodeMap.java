package com.xiaoyuanbang.model;

/**
 * Copyright 2019 bejson.com
 */
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * Auto-generated: 2019-02-28 16:9:24
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class GaodeMap {
    @JsonIgnore
    private String status;
    @JsonIgnore
    private String count;
    @JsonIgnore
    private String info;
    @JsonIgnore
    private String infocode;
    private List<Tips> tips;
    public void setStatus(String status) {
        this.status = status;
    }
    public String getStatus() {
        return status;
    }

    public void setCount(String count) {
        this.count = count;
    }
    public String getCount() {
        return count;
    }

    public void setInfo(String info) {
        this.info = info;
    }
    public String getInfo() {
        return info;
    }

    public void setInfocode(String infocode) {
        this.infocode = infocode;
    }
    public String getInfocode() {
        return infocode;
    }

    public void setTips(List<Tips> tips) {
        this.tips = tips;
    }
    public List<Tips> getTips() {
        return tips;
    }

}
