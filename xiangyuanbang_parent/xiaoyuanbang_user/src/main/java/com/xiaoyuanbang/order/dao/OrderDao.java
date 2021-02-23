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
import java.util.Map;

/**
 * 数据访问接口
 *
 * @author Administrator
 */
public interface OrderDao extends JpaRepository<Order, String>, JpaSpecificationExecutor<Order> {
//    @Query(value = "select id from tb_order where status=? and create_time<?",nativeQuery = true)
//    public List<Order> findOrderByStatusAndCreate_timeLessThan(String status,Date create_time);

    @Query(value = "update tb_order set status=?,pay_time=? where id=?", nativeQuery = true)
    @Modifying
    public void updateOrderStatusAndPaytime(String status, Date pay_time, String id);

    @Query(value = "update tb_order set status=3,errandsid=?,accept_time=? where id=?", nativeQuery = true)
    @Modifying
    void startOrder(String errandsid, Date date, String id);

    @Query(value = "update tb_order set status=? where id=?", nativeQuery = true)
    @Modifying
    void updateOrderStatus(String status, String orderid);

    @Query(value = "update tb_order set status=? and complete_time=? where id=?", nativeQuery = true)
    @Modifying
    void updateOrderStatusAndComplete_time(String status,Date complete_time,String orderid);
    
    
    @Query(value = "update  tb_order as a set a.status=? where a.id in (select  c.orderid from(select id as orderid from tb_order as b where b.status=? and b.create_time<?) c)", nativeQuery = true)
    @Modifying
        //取消未支付订单
    void updateUnPaidOrderStatus(String status, String nowstatus, Date create_time);


    @Query(value = "update tb_order set status=?,errands_confirm_time=? where id=?", nativeQuery = true)
    @Modifying
    void updateOrderStatusAndErrands_confirm_time(String status, Date time, String orderid);

    @Query(value = "update tb_order set status=?,user_cancel_time=?,user_reason=? where id=?", nativeQuery = true)
    @Modifying
    void updateCancelOrder(String status, Date date, String reason, String orderid);


    @Query(value = "update tb_order set status=?,user_cancel_time=?,user_reason=? where id=?", nativeQuery = true)
    @Modifying
    void updateOrderStatusUserReasonCanceltime(String status, Date date, String reason, String orderid);


    Page<Order> findAllByErrandsidAndStatusNotIn(String errandsid, String[] status, Pageable pageable);


    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by create_time desc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByCreate_timeDesc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by create_time asc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByCreate_timeAsc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by appointment_time desc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByAppointment_timeDesc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by appointment_time asc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByAppointment_timeAsc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by cancel_time desc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByCancel_timeDesc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by cancel_time asc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByCancel_timeAsc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by status desc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByStatusDesc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by status asc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByStatusAsc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by order_type desc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByOrder_typeDesc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by order_type asc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByOrder_typeAsc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by accept_time desc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByAccept_timeDesc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by accept_time asc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByAccept_timeAsc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by reward desc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByRewardDesc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);

    @Query(value = "select new map(id as id,errandsid as errandsid,create_time as create_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_userdelete=:deleted and userid=:userid order by reward asc", countQuery = "select count(id) from Order where is_userdelete=:deleted and userid=:userid")
    Page<Map> findOrderPlacedOrderByRewardAsc(@Param("deleted") String deleted, @Param("userid") String userid, Pageable pageable);


    @Query(value = "update tb_order set status=?,errands_disagree_reason=? where id=?", nativeQuery = true)
    @Modifying
    void errandsDisAgreeCancelOrder(String status, String reason, String id);


    @Query(value = "update tb_order set status=?,errands_cancel_time=?,errands_reason=? where id=?", nativeQuery = true)
    @Modifying
    void errandsCancelOrder(String status, Date date, String reason, String orderid);

    @Query(value = "update tb_order set status=?,user_disagree_reason=? where id=?", nativeQuery = true)
    @Modifying
    void userDisAgreeCancelOrder(String status, String reason, String id);

    @Query(value = "update tb_order set is_userC=? where id=?", nativeQuery = true)
    @Modifying
    void userC(String status, String id);

    @Query(value = "update tb_order set is_errC=? where id=?", nativeQuery = true)
    @Modifying
    void errC(String status, String id);

    @Query(value = "update tb_order set is_userdelete=? where id=?", nativeQuery = true)
    @Modifying
    void updateUserDelete(String isDelete, String id);

    @Query(value = "update tb_order set is_errandsdelete=? where id=?", nativeQuery = true)
    @Modifying
    void updateErrandsDelete(String isDelete, String id);


    @Query(value = "select new map(id as id,userid as userid,appointment_time as appointment_time,accept_time as accept_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_errandsdelete=:deleted and errandsid=:errandsid order by accept_time desc", countQuery = "select count(id) from Order where is_errandsdelete=:deleted and errandsid=:errandsid")
    Page<Map> findAcceptOrderOrderByAccept_timeDesc(@Param("deleted") String deleted, @Param("errandsid") String errandsid, Pageable pageable);

    @Query(value = "select new map(id as id,userid as userid,appointment_time as appointment_time,accept_time as accept_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_errandsdelete=:deleted and errandsid=:errandsid order by accept_time asc", countQuery = "select count(id) from Order where is_errandsdelete=:deleted and errandsid=:errandsid")
    Page<Map> findAcceptOrderOrderByAccept_timeAsc(@Param("deleted") String deleted, @Param("errandsid") String errandsid, Pageable pageable);

    @Query(value = "select new map(id as id,userid as userid,appointment_time as appointment_time,accept_time as accept_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_errandsdelete=:deleted and errandsid=:errandsid order by appointment_time desc", countQuery = "select count(id) from Order where is_errandsdelete=:deleted and errandsid=:errandsid")
    Page<Map> findAcceptOrderOrderByAppointment_timeDesc(@Param("deleted") String deleted, @Param("errandsid") String errandsid, Pageable pageable);

    @Query(value = "select new map(id as id,userid as userid,appointment_time as appointment_time,accept_time as accept_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_errandsdelete=:deleted and errandsid=:errandsid order by appointment_time asc", countQuery = "select count(id) from Order where is_errandsdelete=:deleted and errandsid=:errandsid")
    Page<Map> findAcceptOrderOrderByAppointment_timeAsc(@Param("deleted") String deleted, @Param("errandsid") String errandsid, Pageable pageable);

    @Query(value = "select new map(id as id,userid as userid,appointment_time as appointment_time,accept_time as accept_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_errandsdelete=:deleted and errandsid=:errandsid order by status desc", countQuery = "select count(id) from Order where is_errandsdelete=:deleted and errandsid=:errandsid")
    Page<Map> findAcceptOrderOrderByStatusDesc(@Param("deleted") String deleted, @Param("errandsid") String errandsid, Pageable pageable);

    @Query(value = "select new map(id as id,userid as userid,appointment_time as appointment_time,accept_time as accept_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_errandsdelete=:deleted and errandsid=:errandsid order by status asc", countQuery = "select count(id) from Order where is_errandsdelete=:deleted and errandsid=:errandsid")
    Page<Map> findAcceptOrderOrderByStatusAsc(@Param("deleted") String deleted, @Param("errandsid") String errandsid, Pageable pageable);

    @Query(value = "select new map(id as id,userid as userid,appointment_time as appointment_time,accept_time as accept_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_errandsdelete=:deleted and errandsid=:errandsid order by order_type desc", countQuery = "select count(id) from Order where is_errandsdelete=:deleted and errandsid=:errandsid")
    Page<Map> findAcceptOrderOrderByOrder_typeDesc(@Param("deleted") String deleted, @Param("errandsid") String errandsid, Pageable pageable);

    @Query(value = "select new map(id as id,userid as userid,appointment_time as appointment_time,accept_time as accept_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_errandsdelete=:deleted and errandsid=:errandsid order by order_type asc", countQuery = "select count(id) from Order where is_errandsdelete=:deleted and errandsid=:errandsid")
    Page<Map> findAcceptOrderOrderByOrder_typeAsc(@Param("deleted") String deleted, @Param("errandsid") String errandsid, Pageable pageable);

    @Query(value = "select new map(id as id,userid as userid,appointment_time as appointment_time,accept_time as accept_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_errandsdelete=:deleted and errandsid=:errandsid order by reward desc", countQuery = "select count(id) from Order where is_errandsdelete=:deleted and errandsid=:errandsid")
    Page<Map> findAcceptOrderOrderByRewardDesc(@Param("deleted") String deleted, @Param("errandsid") String errandsid, Pageable pageable);

    @Query(value = "select new map(id as id,userid as userid,appointment_time as appointment_time,accept_time as accept_time,order_type as order_type,status as status,reward as reward,is_userC as userC,is_errC as errC) from  Order where is_errandsdelete=:deleted and errandsid=:errandsid order by reward asc", countQuery = "select count(id) from Order where is_errandsdelete=:deleted and errandsid=:errandsid")
    Page<Map> findAcceptOrderOrderByRewardAsc(@Param("deleted") String deleted, @Param("errandsid") String errandsid, Pageable pageable);
}
