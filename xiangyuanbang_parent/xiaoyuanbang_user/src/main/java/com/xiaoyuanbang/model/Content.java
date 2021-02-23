package com.xiaoyuanbang.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * 实体类
 * @author Administrator
 *
 */
@Entity
@Table(name="tb_content")
public class Content implements Serializable{

	@Id
	private String id;//


	

	private String title;//内容标题
	private String url;//链接
	private String pic;//图片绝对路径

	private Integer sort_order;//排序

	
	public String getId() {		
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {		
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}

	public String getUrl() {		
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}

	public String getPic() {		
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}



	public Integer getSort_order() {		
		return sort_order;
	}
	public void setSort_order(Integer sort_order) {
		this.sort_order = sort_order;
	}


	
}
