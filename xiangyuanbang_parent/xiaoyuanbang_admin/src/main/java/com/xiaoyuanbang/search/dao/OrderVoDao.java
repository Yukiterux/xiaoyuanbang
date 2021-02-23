package com.xiaoyuanbang.search.dao;

import com.xiaoyuanbang.model.EsOrderVo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface OrderVoDao extends ElasticsearchRepository<EsOrderVo,String> {

}
