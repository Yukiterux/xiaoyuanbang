package com.xiaoyuanbang.order.dao;

import com.xiaoyuanbang.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 数据访问接口
 *
 * @author Administrator
 */
public interface OrderDao extends JpaRepository<Order, String>, JpaSpecificationExecutor<Order> {
    @Query(value = "SELECT * FROM tb_order ORDER BY RAND() LIMIT 1",nativeQuery = true)
    Order randomOrder();
    
    
    
    @Query(value = "update tb_order set status=? where id=?", nativeQuery = true)
    @Modifying
    void updateOrderStatus(String status, String orderid);

   
    @Query(value = "select count(*) from tb_order WHERE `status`='9' ",nativeQuery = true)
    long getUnauditedCount();

    @Query(value = "select ifnull(sum(reward),0) from tb_order where complete_time>? and complete_time<? ",nativeQuery = true)
    long findLastWeekMoney(Date lastWeekStart, Date lastWeekEnd);
    @Query(value = "select ifnull(count(*),0) from tb_order where complete_time>? and complete_time<? ",nativeQuery = true)
    long findLastWeekOrderNum(Date lastWeekStart, Date lastWeekEnd);

    @Query(value = "SELECT new map(id as id,order_type as order_type,status as status,reward as reward) from Order ORDER BY create_time DESC ")
    List<Map> findRecentOrder(Pageable pageable);
}
