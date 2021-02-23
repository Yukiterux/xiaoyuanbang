package com.xiaoyuanbang.search.service;

import com.xiaoyuanbang.order.service.OrderService;
import com.xiaoyuanbang.search.dao.OrderVoDao;
import com.xiaoyuanbang.model.EsOrderVo;
import com.xiaoyuanbang.user.dao.UserDao;
import com.xiaoyuanbang.model.User;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;
import com.xiaoyuanbang.common.util.JwtUtil;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class OrderVoService {
    @Autowired
    private OrderVoDao orderVoDao;
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserDao userDao;
    
    @Autowired
    private JwtUtil jwtUtil;

    public void add(EsOrderVo esOrderVo){
        orderVoDao.save(esOrderVo);
    }

    public Page<EsOrderVo> findAll(int page, int size){
        PageRequest pageRequest = PageRequest.of(page - 1, size);

        FieldSortBuilder fieldSortBuilder = SortBuilders.fieldSort("create_time").order(SortOrder.DESC);
        SearchQuery query = new NativeSearchQueryBuilder()
                .withSort(fieldSortBuilder)
                .withPageable(pageRequest)
                .build();
        Page<EsOrderVo> all = this.orderVoDao.search(query);
        List<EsOrderVo> content = all.getContent();
        HashMap<String,User> map=new HashMap();
        User user;
        for(EsOrderVo vo:content){
            String userid = vo.getUserid();
            if(!map.containsKey(userid)){
                Optional<User> optionalUser = userDao.findById(userid);
                user= optionalUser.get();
                map.put(userid,user);
            }else {
                user = map.get(userid);
            }
            vo.setAvatar(user.getAvatar());
            vo.setGrade(user.getGrade());
            vo.setUserNickname(user.getNickname());
        }
        return all;
    }

    public void deleteById(String id) {
        orderVoDao.deleteById(id);
    }


    public Iterable findAndDelete(){
        Iterable<EsOrderVo> all = orderVoDao.findAll();
        String token = jwtUtil.createJWT("user", "user", "user");


        for (EsOrderVo esOrderVo :all){
            Date cancel_time = esOrderVo.getCancel_time();

            if (cancel_time!=null){
                Duration duration = Duration.between(cancel_time.toInstant().atZone( ZoneId.systemDefault() ).toLocalDateTime(),LocalDateTime.now());
                if (duration.toMillis()>=0){
                    System.out.println(esOrderVo);
                    System.out.println("删除订单"+ esOrderVo.getId());
                    orderVoDao.deleteById(esOrderVo.getId());
                    orderService.updateCancelOrder(esOrderVo.getId());
                    //修改数据库订单状态
//                    restTemplate.put("http://xiaoyuanbang-order/order/updateCancelOrder/{orderid}",token,orderVo.getId());
                }
            }
        }
        return orderVoDao.findAll();
    }
}
