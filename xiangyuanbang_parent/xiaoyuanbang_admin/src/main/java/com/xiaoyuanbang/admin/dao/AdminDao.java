package com.xiaoyuanbang.admin.dao;

import com.xiaoyuanbang.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

/**
 * 数据访问接口
 * @author Administrator
 *
 */
public interface AdminDao extends JpaRepository<Admin,String>,JpaSpecificationExecutor<Admin>{
	
   Admin findByLoginname(String loginname);

   @Query(value = "update tb_admin set id=?,loginname=? where id=?",nativeQuery = true)
   @Modifying
   void updateInfo(String id1,String loginname, String id2);

   @Query(value = "update tb_admin  set avatar=? where id=?",nativeQuery = true)
   @Modifying
   void updateAva(String img, String id);
   @Query(value = "update tb_admin  set password=? where id=?",nativeQuery = true)
   @Modifying
   void updatePassword(String newPassword, String id);
}
