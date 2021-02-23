package com.xiaoyuanbang.content.service;

import com.xiaoyuanbang.common.util.IdWorker;
import com.xiaoyuanbang.content.dao.ContentDao;
import com.xiaoyuanbang.model.Content;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * 服务层
 * 
 * @author Administrator
 *
 */
@Service
public class ContentService {

	@Autowired
	private ContentDao contentDao;
	
	@Autowired
	private IdWorker idWorker;

	/**
	 * 查询全部列表
	 * @return
	 */
	public List<Content> findAll() {
		return contentDao.findAll();
	}

	
	/**
	 * 条件查询+分页
	 * @param whereMap
	 * @param page
	 * @param size
	 * @return
	 */
	public Page<Content> findSearch(Map whereMap, int page, int size) {
		Specification<Content> specification = createSpecification(whereMap);
		PageRequest pageRequest =  PageRequest.of(page-1, size);
		return contentDao.findAll(specification, pageRequest);
	}

	
	/**
	 * 条件查询
	 * @param whereMap
	 * @return
	 */
	public List<Content> findSearch(Map whereMap) {
		Specification<Content> specification = createSpecification(whereMap);
		return contentDao.findAll(specification);
	}

	/**
	 * 根据ID查询实体
	 * @param id
	 * @return
	 */
	public Content findById(String id) {
		return contentDao.findById(id).get();
	}

	/**
	 * 增加
	 * @param content
	 */
	public void add(Content content) {
		content.setId( idWorker.nextId()+"" );
		contentDao.save(content);
	}

	/**
	 * 修改
	 * @param content
	 */
	public void update(Content content) {
		contentDao.save(content);
	}

	/**
	 * 删除
	 * @param id
	 */
	public void deleteById(String id) {
		contentDao.deleteById(id);
	}

	/**
	 * 动态条件构建
	 * @param searchMap
	 * @return
	 */
	private Specification<Content> createSpecification(Map searchMap) {

		return new Specification<Content>() {

			@Override
			public Predicate toPredicate(Root<Content> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicateList = new ArrayList<Predicate>();
                // 
                if (searchMap.get("id")!=null && !"".equals(searchMap.get("id"))) {
                	predicateList.add(cb.like(root.get("id").as(String.class), "%"+(String)searchMap.get("id")+"%"));
                }
                
                // 内容标题
                if (searchMap.get("title")!=null && !"".equals(searchMap.get("title"))) {
                	predicateList.add(cb.like(root.get("title").as(String.class), "%"+(String)searchMap.get("title")+"%"));
                }
                // 链接
                if (searchMap.get("url")!=null && !"".equals(searchMap.get("url"))) {
                	predicateList.add(cb.like(root.get("url").as(String.class), "%"+(String)searchMap.get("url")+"%"));
                }
                // 图片绝对路径
                if (searchMap.get("pic")!=null && !"".equals(searchMap.get("pic"))) {
                	predicateList.add(cb.like(root.get("pic").as(String.class), "%"+(String)searchMap.get("pic")+"%"));
                }
                
				
				return cb.and( predicateList.toArray(new Predicate[predicateList.size()]));

			}
		};

	}

}
