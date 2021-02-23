package com.xiaoyuanbang.order.service;

import com.xiaoyuanbang.common.util.IdWorker;
import com.xiaoyuanbang.common.util.JwtUtil;
import com.xiaoyuanbang.order.dao.OrderDao;
import com.xiaoyuanbang.model.Order;
import com.xiaoyuanbang.search.dao.OrderVoDao;
import com.xiaoyuanbang.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;

/**
 * 服务层
 *
 * @author Administrator
 */
@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderDao orderDao;
   
    @Autowired
    private IdWorker idWorker;
    @Autowired
    private OrderVoDao orderVoDao;

    @Autowired
    private UserService userService;

    /**
     * 查询全部列表
     *
     * @return
     */
    public List<Order> findAll() {
        return orderDao.findAll();
    }


    /**
     * 条件查询+分页
     *
     * @param whereMap
     * @param page
     * @param size
     * @return
     */
    public Page<Order> findSearch(Map whereMap, int page, int size) {
        Specification<Order> specification = createSpecification(whereMap);
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        return orderDao.findAll(specification, pageRequest);
    }
    

    /**
     * 根据ID查询实体
     *
     * @param id
     * @return
     */
    public Order findById(String id) {
        Optional<Order> orderOptional = orderDao.findById(id);
        return orderOptional.isPresent() ? orderOptional.get() : null;
    }

    /**
     * 增加
     *
     * @param order
     */
    public void add(Order order) {
        order.setId(idWorker.nextId() + "");
        orderDao.save(order);
    }

    /**
     * 修改
     *
     * @param order
     */
    public void update(Order order) {
        Optional<Order> orderOptional = orderDao.findById(order.getId());
        Order order2=orderOptional.isPresent() ? orderOptional.get() : null;
        if (order2!=null){
            orderDao.save(order);
            if ("2".equals(order2.getStatus())) {
                orderVoDao.deleteById(order2.getId());
            }
        }
    
    }

    /**
     * 删除
     *
     * @param id
     */
    public void deleteById(String id) {
        Optional<Order> orderOptional = orderDao.findById(id);
        Order order=orderOptional.isPresent() ? orderOptional.get() : null;
        if (order!=null){
            orderDao.deleteById(id);
            if ("2".equals(order.getStatus())) {
                orderVoDao.deleteById(id);
            }
        }
    }

    /**
     * 动态条件构建
     *
     * @param searchMap
     * @return
     */
    private Specification<Order> createSpecification(Map searchMap) {

        return new Specification<Order>() {

            @Override
            public Predicate toPredicate(Root<Order> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicateList = new ArrayList<Predicate>();
                //
                if (searchMap.get("id")!=null && !"".equals(searchMap.get("id"))) {
                    predicateList.add(cb.like(root.get("id").as(String.class), "%"+(String)searchMap.get("id")+"%"));
                }
                if (searchMap.get("order_type")!=null && !"".equals(searchMap.get("order_type"))&& !"0".equals(searchMap.get("order_type"))&& !"全部".equals(searchMap.get("order_type"))) {
                    predicateList.add(cb.like(root.get("order_type").as(String.class), "%"+(String)searchMap.get("order_type")+"%"));
                }
                // 订单类型为(1收货，2发货、3收货、4排队)地址
                if (searchMap.get("receiver_address")!=null && !"".equals(searchMap.get("receiver_address"))) {
                    predicateList.add(cb.like(root.get("receiver_address").as(String.class), "%"+(String)searchMap.get("receiver_address")+"%"));
                }
                // 收货手机号
                if (searchMap.get("receiver_mobile")!=null && !"".equals(searchMap.get("receiver_mobile"))) {
                    predicateList.add(cb.like(root.get("receiver_mobile").as(String.class), "%"+(String)searchMap.get("receiver_mobile")+"%"));
                }
                // 收货备注地址
                if (searchMap.get("receiver_remark_address")!=null && !"".equals(searchMap.get("receiver_remark_address"))) {
                    predicateList.add(cb.like(root.get("receiver_remark_address").as(String.class), "%"+(String)searchMap.get("receiver_remark_address")+"%"));
                }
                // 订单类型为(1购买、2收货、3取货、)地址
                if (searchMap.get("buy_address")!=null && !"".equals(searchMap.get("buy_address"))) {
                    predicateList.add(cb.like(root.get("buy_address").as(String.class), "%"+(String)searchMap.get("buy_address")+"%"));
                }
                // 购买备注地址
                if (searchMap.get("buy_remark_address")!=null && !"".equals(searchMap.get("buy_remark_address"))) {
                    predicateList.add(cb.like(root.get("buy_remark_address").as(String.class), "%"+(String)searchMap.get("buy_remark_address")+"%"));
                }
                // 手机号
                if (searchMap.get("buy_mobile")!=null && !"".equals(searchMap.get("buy_mobile"))) {
                    predicateList.add(cb.like(root.get("buy_mobile").as(String.class), "%"+(String)searchMap.get("buy_mobile")+"%"));
                }
                // 购买要求
                if (searchMap.get("buy_request")!=null && !"".equals(searchMap.get("buy_request"))) {
                    predicateList.add(cb.like(root.get("buy_request").as(String.class), "%"+(String)searchMap.get("buy_request")+"%"));
                }
                if (searchMap.get("reward")!=null && !"".equals(searchMap.get("reward"))) {
                    predicateList.add(cb.equal(root.get("reward").as(Double.class), Double.valueOf((String) searchMap.get("reward"))));
                }
                // 状态，1.待支付，2.待接单，3进行中，4.跑腿完成待用户确认，5，已完成，6.用户申请取消订单7.接单员申请取消订单8..已取消9.管理员仲裁
                if (searchMap.get("status")!=null && !"".equals(searchMap.get("status"))&& !"0".equals(searchMap.get("status"))&& !"全部".equals(searchMap.get("status"))) {
                    predicateList.add(cb.like(root.get("status").as(String.class), "%"+(String)searchMap.get("status")+"%"));
                }
                // 用户是否删除，Y删除，N未删除
                if (searchMap.get("is_userdelete")!=null && !"".equals(searchMap.get("is_userdelete"))) {
                    predicateList.add(cb.like(root.get("is_userdelete").as(String.class), "%"+(String)searchMap.get("is_userdelete")+"%"));
                }
                // 配送员是否删除，Y删除，N未删除
                if (searchMap.get("is_errandsdelete")!=null && !"".equals(searchMap.get("is_errandsdelete"))) {
                    predicateList.add(cb.like(root.get("is_errandsdelete").as(String.class), "%"+(String)searchMap.get("is_errandsdelete")+"%"));
                }
                // 客户Id
                if (searchMap.get("userid")!=null && !"".equals(searchMap.get("userid"))) {
                    predicateList.add(cb.like(root.get("userid").as(String.class), "%"+(String)searchMap.get("userid")+"%"));
                }
                // 配送员ID
                if (searchMap.get("errandsid")!=null && !"".equals(searchMap.get("errandsid"))) {
                    predicateList.add(cb.like(root.get("errandsid").as(String.class), "%"+(String)searchMap.get("errandsid")+"%"));
                }
                // 私密内容，仅配送员接单后可见
                if (searchMap.get("secret")!=null && !"".equals(searchMap.get("secret"))) {
                    predicateList.add(cb.like(root.get("secret").as(String.class), "%"+(String)searchMap.get("secret")+"%"));
                }
                // 用户取消订单理由
                if (searchMap.get("user_reason")!=null && !"".equals(searchMap.get("user_reason"))) {
                    predicateList.add(cb.like(root.get("user_reason").as(String.class), "%"+(String)searchMap.get("user_reason")+"%"));
                }
                // 配送员取消订单理由
                if (searchMap.get("errands_reason")!=null && !"".equals(searchMap.get("errands_reason"))) {
                    predicateList.add(cb.like(root.get("errands_reason").as(String.class), "%"+(String)searchMap.get("errands_reason")+"%"));
                }
                // 用户拒绝取消订单理由
                if (searchMap.get("user_disagree_reason")!=null && !"".equals(searchMap.get("user_disagree_reason"))) {
                    predicateList.add(cb.like(root.get("user_disagree_reason").as(String.class), "%"+(String)searchMap.get("user_disagree_reason")+"%"));
                }
                // 配送员拒绝取消订单理由
                if (searchMap.get("errands_disagree_reason")!=null && !"".equals(searchMap.get("errands_disagree_reason"))) {
                    predicateList.add(cb.like(root.get("errands_disagree_reason").as(String.class), "%"+(String)searchMap.get("errands_disagree_reason")+"%"));
                }
                // 用户是否评价
                if (searchMap.get("is_userC")!=null && !"".equals(searchMap.get("is_userC"))) {
                    predicateList.add(cb.like(root.get("is_userC").as(String.class), "%"+(String)searchMap.get("is_userC")+"%"));
                }
                // 配送员是否评价，Y已评价，N未评价
                if (searchMap.get("is_errC")!=null && !"".equals(searchMap.get("is_errC"))) {
                    predicateList.add(cb.like(root.get("is_errC").as(String.class), "%"+(String)searchMap.get("is_errC")+"%"));
                }

                return cb.and( predicateList.toArray(new Predicate[predicateList.size()]));

            }
        };

    }

   

    @Transactional
    public void cancelOrderAndRefund(String status, String id, Order order) {
        orderDao.updateOrderStatus(status, id);
        userService.updateMoney(order.getUserid(), order.getReward().toString());
    }
    
    @Transactional
    public void updateCancelOrder(String orderid) {
        orderDao.updateOrderStatus("8", orderid);
    }
    

    public List<Map> findRecentOrder() {
        PageRequest pageRequest = PageRequest.of(0, 10);
          return orderDao.findRecentOrder(pageRequest);
    }
    @Transactional
    public void cancel(String id) {
        Order order = findById(id);
        cancelOrderAndRefund("8", id, order);
    }
    @Transactional
    public void continueOrder(String id) {
        orderDao.updateOrderStatus("3", id);
    }
}
