/**
 * Copyright 2019 bejson.com
 */
package com.xiaoyuanbang.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * Auto-generated: 2019-02-28 16:9:24
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class Tips {

    @JsonIgnore
    private String id;
    private String name;
    private String district;
    @JsonIgnore
    private String adcode;
    @JsonIgnore
    private String location;
    private String address;
    @JsonIgnore
    private String typecode;
    @JsonIgnore
    private List<String> city;

    public List<String> getCity() {
        return city;
    }

    public void setCity(List<String> city) {
        this.city = city;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getAdcode() {
        return adcode;
    }

    public void setAdcode(String adcode) {
        this.adcode = adcode;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTypecode() {
        return typecode;
    }

    public void setTypecode(String typecode) {
        this.typecode = typecode;
    }


}
