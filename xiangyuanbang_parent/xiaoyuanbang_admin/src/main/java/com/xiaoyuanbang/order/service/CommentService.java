package com.xiaoyuanbang.order.service;


import com.xiaoyuanbang.common.util.IdWorker;
import com.xiaoyuanbang.order.dao.CommentDao;
import com.xiaoyuanbang.model.Comment;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * 服务层
 * 
 * @author Administrator
 *
 */
@Service
public class CommentService {

	@Autowired
	private CommentDao commentDao;
	
	@Autowired
	private IdWorker idWorker;

	/**
	 * 查询全部列表
	 * @return
	 */
	public List<Comment> findAll() {
		return commentDao.findAll();
	}

	public Long count(){
		return commentDao.count();
	}
	/**
	 * 条件查询+分页
	 * @param whereMap
	 * @param page
	 * @param size
	 * @return
	 */
	public Page<Comment> findSearch(Map whereMap, int page, int size) {
		Specification<Comment> specification = createSpecification(whereMap);
		PageRequest pageRequest =  PageRequest.of(page-1, size);
		return commentDao.findAll(specification, pageRequest);
	}

	
	/**
	 * 条件查询
	 * @param whereMap
	 * @return
	 */
	public List<Comment> findSearch(Map whereMap) {
		Specification<Comment> specification = createSpecification(whereMap);
		return commentDao.findAll(specification);
	}

	/**
	 * 根据ID查询实体
	 * @param id
	 * @return
	 */
	public Comment findById(String id) {
		Optional<Comment> optional = commentDao.findById(id);
		return optional.isPresent()?optional.get():null;
	}

	/**
	 * 增加
	 * @param comment
	 */
	public void add(Comment comment) {

		commentDao.save(comment);
	}

	/**
	 * 修改
	 * @param comment
	 */
	public void update(Comment comment) {
		commentDao.save(comment);
	}

	/**
	 * 删除
	 * @param id
	 */
	public void deleteById(String id) {
		commentDao.deleteById(id);
	}

	/**
	 * 动态条件构建
	 * @param searchMap
	 * @return
	 */
	private Specification<Comment> createSpecification(Map searchMap) {

		return new Specification<Comment>() {

			@Override
			public Predicate toPredicate(Root<Comment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicateList = new ArrayList<Predicate>();
                // 
                if (searchMap.get("id")!=null && !"".equals(searchMap.get("id"))) {
                	predicateList.add(cb.like(root.get("id").as(String.class), "%"+(String)searchMap.get("id")+"%"));
                }
                // 用户id
                if (searchMap.get("userid")!=null && !"".equals(searchMap.get("userid"))) {
                	predicateList.add(cb.like(root.get("userid").as(String.class), "%"+(String)searchMap.get("userid")+"%"));
                }
                // 用户评论
                if (searchMap.get("user_comment")!=null && !"".equals(searchMap.get("user_comment"))) {
                	predicateList.add(cb.like(root.get("user_comment").as(String.class), "%"+(String)searchMap.get("user_comment")+"%"));
                }
                // 配送员id
                if (searchMap.get("errandsid")!=null && !"".equals(searchMap.get("errandsid"))) {
                	predicateList.add(cb.like(root.get("errandsid").as(String.class), "%"+(String)searchMap.get("errandsid")+"%"));
                }
                // 配送员评论
                if (searchMap.get("errands_comment")!=null && !"".equals(searchMap.get("errands_comment"))) {
                	predicateList.add(cb.like(root.get("errands_comment").as(String.class), "%"+(String)searchMap.get("errands_comment")+"%"));
                }
				if (searchMap.get("user_grade")!=null && !"".equals(searchMap.get("user_grade"))) {
					predicateList.add(cb.equal(root.get("user_grade").as(Integer.class), Integer.valueOf((String)searchMap.get("user_grade"))));
				}
				if (searchMap.get("errands_grade")!=null && !"".equals(searchMap.get("errands_grade"))) {
					predicateList.add(cb.equal(root.get("errands_grade").as(Integer.class), Integer.valueOf((String)searchMap.get("errands_grade"))));
				}
				return cb.and( predicateList.toArray(new Predicate[predicateList.size()]));

			}
		};

	}

	@Transactional
	public void userCom(Comment comment) {
		commentDao.userCom(comment.getUserid(),comment.getUser_comment(),comment.getUser_grade(),comment.getId());
	}

	@Transactional
	public void errCom(Comment comment) {
		commentDao.errCom(comment.getErrandsid(),comment.getErrands_comment(),comment.getErrands_grade(),comment.getId());
	}

	@Transactional
	public Page<Comment> getErrandsComment(String userid, int page, int size) {
		PageRequest pageRequest =  PageRequest.of(page-1, size);
		return commentDao.findErrandsComment(userid,pageRequest);
	}

	@Transactional
	public Page<Comment> getUserComment(String userid, int page, int size) {
		PageRequest pageRequest =  PageRequest.of(page-1, size);
		return commentDao.findUserComment(userid,pageRequest);
	}

}
