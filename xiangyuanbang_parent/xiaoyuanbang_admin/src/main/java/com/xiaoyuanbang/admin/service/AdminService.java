package com.xiaoyuanbang.admin.service;

import com.xiaoyuanbang.admin.dao.AdminDao;
import com.xiaoyuanbang.model.Admin;
import com.xiaoyuanbang.common.util.DateUtil;
import com.xiaoyuanbang.common.util.IdWorker;
import com.xiaoyuanbang.common.util.JwtUtil;
import com.xiaoyuanbang.order.dao.OrderDao;
import com.xiaoyuanbang.user.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;

/**
 * 服务层
 *
 * @author Administrator
 */
@Service
public class AdminService {

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private IdWorker idWorker;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private UserDao userDao;

    /**
     * 查询全部列表
     *
     * @return
     */
    public List<Admin> findAll() {
        return adminDao.findAll();
    }


    /**
     * 条件查询+分页
     *
     * @param whereMap
     * @param page
     * @param size
     * @return
     */
    public Page<Admin> findSearch(Map whereMap, int page, int size) {
        Specification<Admin> specification = createSpecification(whereMap);
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        return adminDao.findAll(specification, pageRequest);
    }


    /**
     * 条件查询
     *
     * @param whereMap
     * @return
     */
    public List<Admin> findSearch(Map whereMap) {
        Specification<Admin> specification = createSpecification(whereMap);
        return adminDao.findAll(specification);
    }

    /**
     * 根据ID查询实体
     *
     * @param id
     * @return
     */
    public Admin findById(String id) {
        return adminDao.findById(id).get();
    }

    /**
     * 增加
     *
     * @param admin
     */
    public void add(Admin admin) {
        admin.setId(idWorker.nextId() + "");
        adminDao.save(admin);
    }

    /**
     * 修改
     *
     * @param admin
     */
    public void update(Admin admin) {
        adminDao.save(admin);
    }

    /**
     * 删除
     *
     * @param id
     */
    public void deleteById(String id) {
        adminDao.deleteById(id);
    }

    /**
     * 动态条件构建
     *
     * @param searchMap
     * @return
     */
    private Specification<Admin> createSpecification(Map searchMap) {

        return new Specification<Admin>() {

            @Override
            public Predicate toPredicate(Root<Admin> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicateList = new ArrayList<Predicate>();
                // 
                if (searchMap.get("id") != null && !"".equals(searchMap.get("id"))) {
                    predicateList.add(cb.like(root.get("id").as(String.class), "%" + (String) searchMap.get("id") + "%"));
                }
                // 
                if (searchMap.get("loginname") != null && !"".equals(searchMap.get("loginname"))) {
                    predicateList.add(cb.like(root.get("loginname").as(String.class), "%" + (String) searchMap.get("loginname") + "%"));
                }
                // 
                if (searchMap.get("password") != null && !"".equals(searchMap.get("password"))) {
                    predicateList.add(cb.like(root.get("password").as(String.class), "%" + (String) searchMap.get("password") + "%"));
                }
                // 
                if (searchMap.get("state") != null && !"".equals(searchMap.get("state"))) {
                    predicateList.add(cb.like(root.get("state").as(String.class), "%" + (String) searchMap.get("state") + "%"));
                }

                return cb.and(predicateList.toArray(new Predicate[predicateList.size()]));

            }
        };

    }

    public Map login(Admin a) {
        if (a == null) {
            return null;
        }
        String password = a.getPassword();
        Admin admin = adminDao.findByLoginname(a.getLoginname());
        String password1 = admin.getPassword();
        boolean matches = bCryptPasswordEncoder.matches(password, password1);
        if (admin != null && matches) {
            admin.setLast_login_time(new Date());
            update(admin);
            String token = jwtUtil.createJWT(admin.getId(), admin.getLoginname(), "admin");
            Map<String, String> map = new HashMap<>();
            map.put("name", admin.getLoginname());
            map.put("avatar", admin.getAvatar());
            map.put("token", token);
            return map;
        }
        return null;
    }

    public Map<String, Long> getCount() {
        HashMap<String, Long> map = new HashMap<String, Long>();
        long count = userDao.getUnauditedcount();
        map.put("userCount", count);
        long unauditedCount = orderDao.getUnauditedCount();
        map.put("unauditedCount", unauditedCount);
        Date lastWeekStart = DateUtil.getMondayOfLastWeek();
        Date lastWeekEnd = DateUtil.getSundayOfLastWeek();
        long lastWeekMoney = orderDao.findLastWeekMoney(lastWeekStart, lastWeekEnd);
        map.put("lastWeekMoney", lastWeekMoney);
        long lastWeekNum = orderDao.findLastWeekOrderNum(lastWeekStart, lastWeekEnd);
        map.put("lastWeekNum", lastWeekNum);
        return map;
    }

    @Transactional
    public void updateInfo(Admin admin) {
        adminDao.updateInfo(admin.getId(), admin.getLoginname(), admin.getId());
    }

    @Transactional
    public void updateAva(String img, String id) {
        adminDao.updateAva(img, id);
    }

    @Transactional
    public boolean updatePassword(String id, HashMap<String, String> map) {
        Admin admin = findById(id);
        String password = map.get("password");
        String newPassword = map.get("newPassword");
        boolean matches = bCryptPasswordEncoder.matches(password, admin.getPassword());
        if (admin == null ||password==null ||  newPassword== null||!matches)
        {
            return false;
        }
        adminDao.updatePassword(bCryptPasswordEncoder.encode(newPassword), id);
        return true;
    }
}
