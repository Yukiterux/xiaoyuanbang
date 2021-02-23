package com.xiaoyuanbang.user.dao;

import com.xiaoyuanbang.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.Map;

/**
 * 数据访问接口
 * @author Administrator
 *
 */
public interface UserDao extends JpaRepository<User,String>,JpaSpecificationExecutor<User>{
	User findByMobile(String mobile);

	@Query(value = "update tb_user set account_balance=? where id=?",nativeQuery = true)
	@Modifying
	void updateUserMoney(Double money, String userid);

	@Query(value = "update tb_user set grade=? where id=?",nativeQuery = true)
	@Modifying
    void updateUserGrade(Integer grade1, String userid);

	@Query(value = "update tb_user set nickname=?,sex=?,birthday=?,qq=?,email=?,password=? where id=?",nativeQuery = true)
	@Modifying
	void updateInfo(String name, String sex, Date birthday, String qq, String email,String password, String id);



	@Query(value = "select Count(*) FROM tb_user  where nickname=? and id!=? ",nativeQuery = true)
    Integer checkName(String name, String id);

	@Query(value = "update tb_user set mobile=? where id=?",nativeQuery = true)
	@Modifying
	void updateMobile(String userMobile, String id);

	@Query(value = "update tb_user set avatar=? where id=?",nativeQuery = true)
	@Modifying
    void updateAva(String img, String id);

	@Query(value = "update tb_user set name=?,id_card=?,idcard_address=?,is_errands=? where id=?",nativeQuery = true)
	@Modifying
    void apply(String name, String id_card, String idcard_address, String is_errands, String id);

	@Query("select new map(id as id,mobile as mobile,nickname as nickname,sex as sex,birthday as birthday,avatar as avatar,is_errands as is_errands,account_balance as account_balance,grade as grade,qq as qq,email as email,password as password) from User where id=?1")
    Map<String,Object> userfindById(String id);
}
