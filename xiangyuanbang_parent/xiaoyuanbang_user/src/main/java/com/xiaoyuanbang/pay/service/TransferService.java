package com.xiaoyuanbang.pay.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;

import com.xiaoyuanbang.common.util.IdWorker;
import com.xiaoyuanbang.model.Transfer;
import com.xiaoyuanbang.pay.dao.TransferDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;



/**
 * 服务层
 * 
 * @author Administrator
 *
 */
@Service
public class TransferService {

	@Autowired
	private TransferDao transferDao;
	
	@Autowired
	private IdWorker idWorker;

	/**
	 * 查询全部列表
	 * @return
	 */
	public List<Transfer> findAll() {
		return transferDao.findAll();
	}

	
	/**
	 * 条件查询+分页
	 * @param whereMap
	 * @param page
	 * @param size
	 * @return
	 */
	public Page<Transfer> findSearch(Map whereMap, int page, int size) {
		Specification<Transfer> specification = createSpecification(whereMap);
		PageRequest pageRequest =  PageRequest.of(page-1, size);
		return transferDao.findAll(specification, pageRequest);
	}

	
	/**
	 * 条件查询
	 * @param whereMap
	 * @return
	 */
	public List<Transfer> findSearch(Map whereMap) {
		Specification<Transfer> specification = createSpecification(whereMap);
		return transferDao.findAll(specification);
	}

	/**
	 * 根据ID查询实体
	 * @param id
	 * @return
	 */
	public Transfer findById(String id) {
		return transferDao.findById(id).get();
	}

	/**
	 * 增加
	 * @param transfer
	 */
	public void add(Transfer transfer) {
		transfer.setId( idWorker.nextId()+"" );
		transferDao.save(transfer);
	}

	/**
	 * 修改
	 * @param transfer
	 */
	public void update(Transfer transfer) {
		transferDao.save(transfer);
	}

	/**
	 * 删除
	 * @param id
	 */
	public void deleteById(String id) {
		transferDao.deleteById(id);
	}

	/**
	 * 动态条件构建
	 * @param searchMap
	 * @return
	 */
	private Specification<Transfer> createSpecification(Map searchMap) {

		return new Specification<Transfer>() {

			@Override
			public Predicate toPredicate(Root<Transfer> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicateList = new ArrayList<Predicate>();
                // 
                if (searchMap.get("id")!=null && !"".equals(searchMap.get("id"))) {
                	predicateList.add(cb.like(root.get("id").as(String.class), "%"+(String)searchMap.get("id")+"%"));
                }
                // 备注
                if (searchMap.get("remark")!=null && !"".equals(searchMap.get("remark"))) {
                	predicateList.add(cb.like(root.get("remark").as(String.class), "%"+(String)searchMap.get("remark")+"%"));
                }
                // 
                if (searchMap.get("userid")!=null && !"".equals(searchMap.get("userid"))) {
                	predicateList.add(cb.like(root.get("userid").as(String.class), "%"+(String)searchMap.get("userid")+"%"));
                }
				
				return cb.and( predicateList.toArray(new Predicate[predicateList.size()]));

			}
		};

	}

}
