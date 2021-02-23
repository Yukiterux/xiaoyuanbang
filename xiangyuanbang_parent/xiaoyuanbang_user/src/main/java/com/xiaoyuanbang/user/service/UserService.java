package com.xiaoyuanbang.user.service;

import com.xiaoyuanbang.common.util.JwtUtil;
import com.xiaoyuanbang.user.dao.UserDao;
import com.xiaoyuanbang.model.User;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.xiaoyuanbang.common.util.IdWorker;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * 服务层
 *
 * @author Administrator
 */
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private IdWorker idWorker;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    /**
     * 查询全部列表
     *
     * @return
     */
    public List<User> findAll() {
        return userDao.findAll();
    }


    /**
     * 条件查询+分页
     *
     * @param whereMap
     * @param page
     * @param size
     * @return
     */
    public Page<User> findSearch(Map whereMap, int page, int size) {
        Specification<User> specification = createSpecification(whereMap);
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        return userDao.findAll(specification, pageRequest);
    }


    /**
     * 条件查询
     *
     * @param whereMap
     * @return
     */
    public List<User> findSearch(Map whereMap) {
        Specification<User> specification = createSpecification(whereMap);
        return userDao.findAll(specification);
    }

    public User findByMobile(String mobile) {
        return userDao.findByMobile(mobile);

    }

    /**
     * 根据ID查询实体
     *
     * @param id
     * @return
     */
    public User findById(String id) {
        return userDao.findById(id).get();
    }

    /**
     * 增加
     *
     * @param user
     */
    public void add(User user) {
        user.setId(idWorker.nextId() + "");
        userDao.save(user);
    }

    /**
     * 修改
     *
     * @param user
     */
    public void update(User user) {
        userDao.save(user);
    }

    /**
     * 删除
     *
     * @param id
     */
    public void deleteById(String id) {
        userDao.deleteById(id);
    }

    /**
     * 动态条件构建
     *
     * @param searchMap
     * @return
     */
    private Specification<User> createSpecification(Map searchMap) {

        return new Specification<User>() {

            @Override
            public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
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
                // 
                if (searchMap.get("mobile") != null && !"".equals(searchMap.get("mobile"))) {
                    predicateList.add(cb.like(root.get("mobile").as(String.class), "%" + (String) searchMap.get("mobile") + "%"));
                }
                // 
                if (searchMap.get("nickname") != null && !"".equals(searchMap.get("nickname"))) {
                    predicateList.add(cb.like(root.get("nickname").as(String.class), "%" + (String) searchMap.get("nickname") + "%"));
                }
                // 
                if (searchMap.get("sex") != null && !"".equals(searchMap.get("sex"))) {
                    predicateList.add(cb.like(root.get("sex").as(String.class), "%" + (String) searchMap.get("sex") + "%"));
                }
                // 
                if (searchMap.get("avatar") != null && !"".equals(searchMap.get("avatar"))) {
                    predicateList.add(cb.like(root.get("avatar").as(String.class), "%" + (String) searchMap.get("avatar") + "%"));
                }
                // 
                if (searchMap.get("id_card") != null && !"".equals(searchMap.get("id_card"))) {
                    predicateList.add(cb.like(root.get("id_card").as(String.class), "%" + (String) searchMap.get("id_card") + "%"));
                }
                // 
                if (searchMap.get("runner") != null && !"".equals(searchMap.get("runner"))) {
                    predicateList.add(cb.like(root.get("runner").as(String.class), "%" + (String) searchMap.get("runner") + "%"));
                }
                // 
                if (searchMap.get("name") != null && !"".equals(searchMap.get("name"))) {
                    predicateList.add(cb.like(root.get("name").as(String.class), "%" + (String) searchMap.get("name") + "%"));
                }
                // 
                if (searchMap.get("email") != null && !"".equals(searchMap.get("email"))) {
                    predicateList.add(cb.like(root.get("email").as(String.class), "%" + (String) searchMap.get("email") + "%"));
                }

                return cb.and(predicateList.toArray(new Predicate[predicateList.size()]));

            }
        };

    }

    public Map login(User user) {
        String password = user.getPassword();
        user = userDao.findByMobile(user.getMobile());
        Map<String, String> map = new HashMap<>();
        if (user != null) {
            if ("N".equals(user.getStatus())){
                map.put("status","用户账号已禁用");
                return map;
            }
            if (bCryptPasswordEncoder.matches(password, user.getPassword())) {
                user.setLast_login_time(new Date());
                update(user);
                String token = jwtUtil.createJWT(user.getId(), user.getMobile(), "user");
                map.put("nickname", user.getNickname());
                map.put("avatar", user.getAvatar());
                map.put("token", token);
                return map;
            }
        }

        return null;
    }

    public void sendsms(String mobile) {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            sb.append(random.nextInt(10));
        }
        redisTemplate.opsForValue().set("regist_" + mobile, sb.toString(), 30, TimeUnit.MINUTES);
        Map<String, String> map = new HashMap<>();
        map.put("mobile", mobile);
        map.put("code", sb.toString());
        rabbitTemplate.convertAndSend("regist", map);
    }

    @Transactional
    public void updateMoney(String userid, String money) {
        User user = userDao.findById(userid).get();
        Double account_balance = user.getAccount_balance();
        account_balance = account_balance + Double.valueOf(money);
        userDao.updateUserMoney(account_balance, userid);
    }
    @Transactional
    public void updateEmptyMoney(String userid) {
        userDao.updateUserMoney(Double.valueOf(0), userid);
    }
    @Transactional
    public void updateGrade(String userid, String grade) {
        User user = userDao.findById(userid).get();
        Integer grade1 = user.getGrade();
        //用户信誉分最高为150
        if (grade1 >= 150 && Integer.valueOf(grade) < 0)
            return;
        grade1 = grade1 - Integer.valueOf(grade);
        userDao.updateUserGrade(grade1, userid);
    }

    public Integer checkName(String name, String id) {
        return userDao.checkName(name, id);
    }

    @Transactional
    public void updateInfo(User user,String changePwd) {
        if ("Y".equals(changePwd)){
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }
        userDao.updateInfo(user.getNickname(), user.getSex(), user.getBirthday(), user.getQq(), user.getEmail(),user.getPassword(), user.getId());
    }

    public void sendChange1Sms(String mobile) {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            sb.append(random.nextInt(10));
        }
        redisTemplate.opsForValue().set("change1_" + mobile, sb.toString(), 30, TimeUnit.MINUTES);
        Map<String, String> map = new HashMap<>();
        map.put("mobile", mobile);
        map.put("code", sb.toString());
        rabbitTemplate.convertAndSend("change1", map);
    }

    public void sendChange2Sms(String mobile) {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            sb.append(random.nextInt(10));
        }
        redisTemplate.opsForValue().set("change2_" + mobile, sb.toString(), 30, TimeUnit.MINUTES);
        Map<String, String> map = new HashMap<>();
        map.put("mobile", mobile);
        map.put("code", sb.toString());
        rabbitTemplate.convertAndSend("change2", map);
    }

    @Transactional
    public void updateMobile(String userMobile, String id) {
        userDao.updateMobile(userMobile, id);
    }

    @Transactional
    public void updateAva(String img, String id) {
        userDao.updateAva(img, id);
    }

    @Transactional
    public void apply(User user, String id) {
        userDao.apply(user.getName(), user.getId_card(), user.getIdcard_address(), "2", id);
    }

    public Map<String, Object> userfindById(String id) {
        return userDao.userfindById(id);
    }
}
