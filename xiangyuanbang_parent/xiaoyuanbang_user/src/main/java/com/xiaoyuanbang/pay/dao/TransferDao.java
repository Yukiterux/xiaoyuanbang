package com.xiaoyuanbang.pay.dao;

import com.xiaoyuanbang.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * 数据访问接口
 * @author Administrator
 *
 */
public interface TransferDao extends JpaRepository<Transfer,String>,JpaSpecificationExecutor<Transfer>{
	
}
