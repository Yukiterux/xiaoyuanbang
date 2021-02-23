package com.xiaoyuanbang.order.service;

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
import com.xiaoyuanbang.common.util.IdWorker;
import com.xiaoyuanbang.common.util.JwtUtil;

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
    private JwtUtil jwtUtil;
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


    public Page<Order> acceptOrder(String erransid, int page, int size) {
        String[] status = {"1", "2"};

        PageRequest pageRequest = PageRequest.of(page - 1, size);

        return orderDao.findAllByErrandsidAndStatusNotIn(erransid, status, pageRequest);
    }

    @Transactional
    public void updateStatus(String status, String id) {
        orderDao.updateOrderStatus(status, id);
    }


    /**
     * 条件查询
     *
     * @param whereMap
     * @return
     */
    public List<Order> findSearch(Map whereMap) {
        Specification<Order> specification = createSpecification(whereMap);
        return orderDao.findAll(specification);
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
        orderDao.save(order);
    }

    /**
     * 删除
     *
     * @param id
     */
    public void deleteById(String id) {
        orderDao.deleteById(id);
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
                if (searchMap.get("id") != null && !"".equals(searchMap.get("id"))) {
                    predicateList.add(cb.like(root.get("id").as(String.class), "%" + (String) searchMap.get("id") + "%"));
                }
                // 订单类型为(1收货，2发货、3收货、4排队)地址
                if (searchMap.get("receiver_address") != null && !"".equals(searchMap.get("receiver_address"))) {
                    predicateList.add(cb.like(root.get("receiver_address").as(String.class), "%" + (String) searchMap.get("receiver_address") + "%"));
                }
                // 收货手机号
                if (searchMap.get("receiver_mobile") != null && !"".equals(searchMap.get("receiver_mobile"))) {
                    predicateList.add(cb.like(root.get("receiver_mobile").as(String.class), "%" + (String) searchMap.get("receiver_mobile") + "%"));
                }
                // 收货备注地址
                if (searchMap.get("receiver_remark_address") != null && !"".equals(searchMap.get("receiver_remark_address"))) {
                    predicateList.add(cb.like(root.get("receiver_remark_address").as(String.class), "%" + (String) searchMap.get("receiver_remark_address") + "%"));
                }
                // 订单类型为(1购买、2收货、3取货、)地址
                if (searchMap.get("buy_address") != null && !"".equals(searchMap.get("buy_address"))) {
                    predicateList.add(cb.like(root.get("buy_address").as(String.class), "%" + (String) searchMap.get("buy_address") + "%"));
                }
                // 购买备注地址
                if (searchMap.get("buy_remark_address") != null && !"".equals(searchMap.get("buy_remark_address"))) {
                    predicateList.add(cb.like(root.get("buy_remark_address").as(String.class), "%" + (String) searchMap.get("buy_remark_address") + "%"));
                }
                // 手机号
                if (searchMap.get("buy_mobile") != null && !"".equals(searchMap.get("buy_mobile"))) {
                    predicateList.add(cb.like(root.get("buy_mobile").as(String.class), "%" + (String) searchMap.get("buy_mobile") + "%"));
                }
                // 购买要求
                if (searchMap.get("buy_request") != null && !"".equals(searchMap.get("buy_request"))) {
                    predicateList.add(cb.like(root.get("buy_request").as(String.class), "%" + (String) searchMap.get("buy_request") + "%"));
                }
                // 状态，1.待支付，2.待接单，3进行中，4，已完成，5，已取消
                if (searchMap.get("status") != null && !"".equals(searchMap.get("status"))) {
                    predicateList.add(cb.like(root.get("status").as(String.class), "%" + (String) searchMap.get("status") + "%"));
                }
                // 是否删除，Y删除，N未删除
                if (searchMap.get("is_delete") != null && !"".equals(searchMap.get("is_delete"))) {
                    predicateList.add(cb.like(root.get("is_delete").as(String.class), "%" + (String) searchMap.get("is_delete") + "%"));
                }
                // 客户Id
                if (searchMap.get("userid") != null && !"".equals(searchMap.get("userid"))) {
                    predicateList.add(cb.like(root.get("userid").as(String.class), "%" + (String) searchMap.get("userid") + "%"));
                }
                // 配送员ID
                if (searchMap.get("errandsid") != null && !"".equals(searchMap.get("errandsid"))) {
                    predicateList.add(cb.like(root.get("errandsid").as(String.class), "%" + (String) searchMap.get("errandsid") + "%"));
                }
                // 私密内容，仅配送员接单后可见
                if (searchMap.get("secret") != null && !"".equals(searchMap.get("secret"))) {
                    predicateList.add(cb.like(root.get("secret").as(String.class), "%" + (String) searchMap.get("secret") + "%"));
                }

                return cb.and(predicateList.toArray(new Predicate[predicateList.size()]));

            }
        };

    }

    @Transactional
    public void updateOrderStatusAndPaytime(Order order) {
        orderDao.updateOrderStatusAndPaytime(order.getStatus(), order.getPay_time(), order.getId());


    }

    @Transactional
    public void startOrder(String id, String errandsid) {

        orderDao.startOrder(errandsid, new Date(), id);

//		restTemplate.delete("http://xiaoyuanbang-search/search/{id}",id);
        orderVoDao.deleteById(id);
    }

    @Transactional
    public void cancelOrderAndRefund(String status, String id, Order order) {
        orderDao.updateOrderStatus(status, id);
//		String token = jwtUtil.createJWT("user", "user", "user");
//		restTemplate.put("http://xiaoyuanbang-user/user/refund/{userid}/{money}",token,order.getUserid(),order.getReward());
        userService.updateMoney(order.getUserid(), order.getReward().toString());
    }

    @Transactional
    public void cancelOrder(String status, String id, String reason) {
        orderDao.updateOrderStatusUserReasonCanceltime(status, new Date(), reason, id);
    }

    @Transactional
    public void errandsDisAgreeCancelOrder(String status, String id, Order order, String reason) {
        orderDao.errandsDisAgreeCancelOrder(status, reason, id);
    }

    @Transactional
    public void errandsCancelOrder(String status, String id, String reason) {

        orderDao.errandsCancelOrder(status, new Date(), reason, id);
    }

    @Transactional
    public void cancelOrderAndRefundAndUpdateGrade(String status, String id, Order order) {
        cancelOrderAndRefund(status, id, order);
        //	String token = jwtUtil.createJWT("user", "user", "user");
        userService.updateGrade(order.getErrandsid(), "2");
//		restTemplate.put("http://xiaoyuanbang-user/user/updateGrade/{userid}/{grade}",token,order.getErrandsid(),"2");
    }

    @Transactional
    public void updateGrade(String userid, Integer integer) {

        String token = jwtUtil.createJWT("user", "user", "user");
        if (integer == 3) {
            return;
        } else if (integer == 2) {
            userService.updateGrade(userid, "1");
//			restTemplate.put("http://xiaoyuanbang-user/user/updateGrade/{userid}/{grade}",token,userid,"1");
        } else if (integer == 1) {
//			restTemplate.put("http://xiaoyuanbang-user/user/updateGrade/{userid}/{grade}",token,userid,"2");
            userService.updateGrade(userid, "2");
        } else if (integer == 4) {
            userService.updateGrade(userid, "-1");
//			restTemplate.put("http://xiaoyuanbang-user/user/updateGrade/{userid}/{grade}",token,userid,"-1");
        } else if (integer == 5) {
            userService.updateGrade(userid, "-2");
//			restTemplate.put("http://xiaoyuanbang-user/user/updateGrade/{userid}/{grade}",token,userid,"-2");
        }


    }

    @Transactional
    public void userDisAgreeCancelOrder(String status, String id, Order order, String reason) {
        orderDao.userDisAgreeCancelOrder(status, reason, id);
    }

    //完成订单
    @Transactional
    public void completeOrder(String id, Order order) {
        String errandsid = order.getErrandsid();
        orderDao.updateOrderStatusAndComplete_time("5",new Date(), order.getId());
        Map<String, String> map = new HashMap<>();
        userService.updateMoney(errandsid, order.getReward().toString());
    }

    @Transactional
    public void userC(String status, String id) {
        orderDao.userC(status, id);
    }

    public void errC(String status, String id) {
        orderDao.errC(status, id);
    }

    @Transactional
    public void errCompleteOrder(String id, Order order) {
        orderDao.updateOrderStatusAndErrands_confirm_time("4", new Date(), order.getId());
    }

    @Transactional
    public void updateCancelOrder(String orderid) {
        orderDao.updateOrderStatus("8", orderid);
    }

    public Page<Map> getOrderPlaced(String userid, int page, int size, Map<String, String> map) {
        String columnName = map.get("columnName");
        String order = map.get("order");

        PageRequest pageRequest = PageRequest.of(page - 1, size);
        if (columnName == null) {
            return orderDao.findOrderPlacedOrderByCreate_timeDesc("N", userid, pageRequest);
        }
        if (columnName.equals("create_time")) {
            if (order.equals("ascending")) {
                return orderDao.findOrderPlacedOrderByCreate_timeAsc("N", userid, pageRequest);
            } else {
                return orderDao.findOrderPlacedOrderByCreate_timeDesc("N", userid, pageRequest);
            }
        } else if (columnName.equals("appointment_time")) {
            if (order.equals("ascending")) {
                return orderDao.findOrderPlacedOrderByAppointment_timeAsc("N", userid, pageRequest);
            } else {
                return orderDao.findOrderPlacedOrderByAppointment_timeDesc("N", userid, pageRequest);
            }
        } else if (columnName.equals("status")) {
            if (order.equals("ascending")) {
                return orderDao.findOrderPlacedOrderByStatusAsc("N", userid, pageRequest);
            } else {
                return orderDao.findOrderPlacedOrderByStatusDesc("N", userid, pageRequest);
            }
        } else if (columnName.equals("order_type")) {
            if (order.equals("ascending")) {
                return orderDao.findOrderPlacedOrderByOrder_typeAsc("N", userid, pageRequest);
            } else {
                return orderDao.findOrderPlacedOrderByOrder_typeDesc("N", userid, pageRequest);
            }
        } else if (columnName.equals("accept_time")) {
            if (order.equals("ascending")) {
                return orderDao.findOrderPlacedOrderByAccept_timeAsc("N", userid, pageRequest);
            } else {
                return orderDao.findOrderPlacedOrderByAccept_timeDesc("N", userid, pageRequest);
            }
        } else if (columnName.equals("appointment_time")) {
            if (order.equals("ascending")) {
                return orderDao.findOrderPlacedOrderByAppointment_timeAsc("N", userid, pageRequest);
            } else {
                return orderDao.findOrderPlacedOrderByAppointment_timeDesc("N", userid, pageRequest);
            }
        } else if (columnName.equals("reward")) {
            if (order.equals("ascending")) {
                return orderDao.findOrderPlacedOrderByRewardAsc("N", userid, pageRequest);
            } else {
                return orderDao.findOrderPlacedOrderByRewardDesc("N", userid, pageRequest);
            }
        } else if (columnName.equals("cancel_time")) {
            if (order.equals("ascending")) {
                return orderDao.findOrderPlacedOrderByCancel_timeAsc("N", userid, pageRequest);
            } else {
                return orderDao.findOrderPlacedOrderByCancel_timeDesc("N", userid, pageRequest);
            }
        }
        return orderDao.findOrderPlacedOrderByCreate_timeDesc("N", userid, pageRequest);
    }

    @Transactional
    public void deleteOverdueUnpaidOrders() {
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.DAY_OF_MONTH, -3);
        Date date = c.getTime();
        orderDao.updateUnPaidOrderStatus("8", "1", date);
    }

    @Transactional
    public boolean deleteOrderPlaced(String userid, String orderid) {
        try {
            Optional<Order> orderOptional = orderDao.findById(orderid);
            Order order = orderOptional.isPresent() ? orderOptional.get() : null;
            if (order == null || !order.getUserid().equals(userid)) {
                return false;
            } else {
                orderDao.updateUserDelete("Y", order.getId());
                return true;
            }
        } catch (Exception e) {
            System.out.println("删除失败" + e.getMessage());
            e.printStackTrace();
            return false;
        }

    }

    @Transactional
    public boolean deleteAcceptOrder(String userid, String orderid) {
        try {
            Optional<Order> orderOptional = orderDao.findById(orderid);
            Order order = orderOptional.isPresent() ? orderOptional.get() : null;
            if (order == null || !order.getErrandsid().equals(userid)) {
                return false;
            } else {
                orderDao.updateErrandsDelete("Y", order.getId());
                return true;
            }
        } catch (Exception e) {
            System.out.println("删除失败" + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    public Page<Map> getAcceptOrder(String errandsid, int page, int size, Map<String, String> map) {
        String columnName = map.get("columnName");
        String order = map.get("order");
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        if (columnName == null) {
            return  orderDao.findAcceptOrderOrderByAccept_timeDesc("N", errandsid, pageRequest);
        }
        if (columnName.equals("accept_time")) {
            if (order.equals("ascending")) {
                return orderDao.findAcceptOrderOrderByAccept_timeAsc("N", errandsid, pageRequest);
            } else {
                return orderDao.findAcceptOrderOrderByAccept_timeDesc("N", errandsid, pageRequest);
            }
        } else if (columnName.equals("appointment_time")) {
            if (order.equals("ascending")) {
                return orderDao.findAcceptOrderOrderByAppointment_timeAsc("N", errandsid, pageRequest);
            } else {
                return orderDao.findAcceptOrderOrderByAppointment_timeDesc("N", errandsid, pageRequest);
            }
        } else if (columnName.equals("status")) {
            if (order.equals("ascending")) {
                return orderDao.findAcceptOrderOrderByStatusAsc("N", errandsid, pageRequest);
            } else {
                return orderDao.findAcceptOrderOrderByStatusDesc("N",errandsid, pageRequest);
            }
        } else if (columnName.equals("order_type")) {
            if (order.equals("ascending")) {
                return orderDao.findAcceptOrderOrderByOrder_typeAsc("N", errandsid, pageRequest);
            } else {
                return orderDao.findAcceptOrderOrderByOrder_typeDesc("N", errandsid, pageRequest);
            }
        } else if (columnName.equals("reward")) {
            if (order.equals("ascending")) {
                return orderDao.findAcceptOrderOrderByRewardAsc("N", errandsid, pageRequest);
            } else {
                return orderDao.findAcceptOrderOrderByRewardDesc("N", errandsid, pageRequest);
            }
        }
        return  orderDao.findAcceptOrderOrderByAccept_timeDesc("N", errandsid, pageRequest);
    }
}
