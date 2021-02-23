package com.xiaoyuanbang.search.controller;

import com.xiaoyuanbang.model.EsOrderVo;
import com.xiaoyuanbang.search.service.OrderVoService;
import com.xiaoyuanbang.common.entity.PageResult;
import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private OrderVoService orderVoService;

    @RequestMapping(value="/{page}/{size}",method= RequestMethod.POST)
    public Result findAll(@PathVariable int page, @PathVariable int size){
        Page<EsOrderVo> pageList = orderVoService.findAll(page, size);
        return  new Result(true, StatusCode.OK,"查询成功",  new PageResult<EsOrderVo>(pageList.getTotalElements(), pageList.getContent()) );
    }

    @RequestMapping(value="/findAndDelete",method= RequestMethod.GET)
    public Result findAndDelete(){
        Iterable<EsOrderVo> all = orderVoService.findAndDelete();
        return  new Result(true, StatusCode.OK,"查询成功", all);
    }


    @RequestMapping(value="/{id}",method= RequestMethod.DELETE)
    public Result delete(@PathVariable String id ){
        System.out.println("调用delete"+id);

        orderVoService.deleteById(id);
        return new Result(true,StatusCode.OK,"删除成功");
    }
}
