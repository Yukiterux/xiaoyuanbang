package com.xiaoyuanbang.common.controller;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import com.xiaoyuanbang.common.pojo.Address;
import com.xiaoyuanbang.common.pojo.GaodeMap;
import com.xiaoyuanbang.common.pojo.Tips;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin

public class MapController {






    @GetMapping(value = "/getAddress/{address}")
    public Result getAddress(@PathVariable String address) throws IOException {


        CloseableHttpClient closeableHttpClient= HttpClients.createDefault();
        HttpGet httpGet=new HttpGet("https://restapi.amap.com/v3/assistant/inputtips?keywords="+address+"&key=e60c3cabfc1b30ff68cb60e4dffbd638");
        CloseableHttpResponse closeableHttpResponse=closeableHttpClient.execute(httpGet); //3、执行
        HttpEntity httpEntity=closeableHttpResponse.getEntity();
        String result = EntityUtils.toString(httpEntity, "UTF-8");
        result = result.replace("[]", "\"\"");
        System.out.println(result);

        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        mapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);

        GaodeMap map;
        map = mapper.readValue(result, GaodeMap.class);
        List<Tips> tips = map.getTips();
        List<Address> addressList = new ArrayList<>();
        for (Tips tip: tips){
            Address address1 = new Address();
            address1.setValue(tip.getDistrict()+"-"+tip.getAddress()+"-"+tip.getName());
            address1.setAddress(tip.getAddress());
            addressList.add(address1);
        }

        return new Result(true, StatusCode.OK,"获取地址成功",addressList);

    }
}
