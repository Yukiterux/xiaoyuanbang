package com.xiaoyuanbang.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * 实体类
 *
 * @author Administrator
 */
@Entity
@Table(name = "tb_comment")
public class Comment implements Serializable {

    @Id
    private String id;//
    private String userid;//用户id
    private String user_comment;//用户评论
    private Integer user_grade;//用户评分
    private String errandsid;//配送员id
    private String errands_comment;//配送员评论
    private Integer errands_grade;//配送员评分

    private java.util.Date ctime;//创建时间


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getUser_comment() {
        return user_comment;
    }

    public void setUser_comment(String user_comment) {
        this.user_comment = user_comment;
    }

    public Integer getUser_grade() {
        return user_grade;
    }

    public void setUser_grade(Integer user_grade) {
        this.user_grade = user_grade;
    }

    public String getErrandsid() {
        return errandsid;
    }

    public void setErrandsid(String errandsid) {
        this.errandsid = errandsid;
    }

    public String getErrands_comment() {
        return errands_comment;
    }

    public void setErrands_comment(String errands_comment) {
        this.errands_comment = errands_comment;
    }

    public Integer getErrands_grade() {
        return errands_grade;
    }

    public void setErrands_grade(Integer errands_grade) {
        this.errands_grade = errands_grade;
    }


    public java.util.Date getCtime() {
        return ctime;
    }

    public void setCtime(java.util.Date ctime) {
        this.ctime = ctime;
    }


}
