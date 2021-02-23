package com.xiaoyuanbang.order.dao;

import com.xiaoyuanbang.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


/**
 * 数据访问接口
 * @author Administrator
 *
 */
public interface CommentDao extends JpaRepository<Comment,String>,JpaSpecificationExecutor<Comment>{
    @Query(value = "update tb_comment set userid=?,user_comment=?,user_grade=? where id=?",nativeQuery = true)
    @Modifying
    void userCom(String userid, String user_comment, Integer user_grade, String id);

    @Query(value = "select * from  tb_comment where errands_comment is not null and userid=?   order by ctime desc",nativeQuery = true)
    Page<Comment> findErrandsComment(String userid, Pageable pageable);

    @Query(value = "select * from  tb_comment where  user_comment is not null and  errandsid=?  order by ctime desc",nativeQuery = true)
    Page<Comment> findUserComment(String userid, Pageable pageable);


    @Query(value = "update tb_comment set errandsid=?,errands_comment=?,errands_grade=? where id=?",nativeQuery = true)
    @Modifying
    void errCom(String errandsid, String errands_comment, Integer errands_grade, String id);

}
