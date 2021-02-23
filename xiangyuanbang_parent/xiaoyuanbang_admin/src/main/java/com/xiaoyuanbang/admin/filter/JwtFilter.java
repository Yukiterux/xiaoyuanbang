package com.xiaoyuanbang.admin.filter;

import com.xiaoyuanbang.common.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends HandlerInterceptorAdapter {
    @Autowired
    private JwtUtil jwtUtil;
    private Logger logger = LogManager.getLogger(JwtFilter.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("经过了拦截器");
        final String header = request.getHeader("Authorization");
        System.out.println("header"+header);
        if(StringUtils.isNotEmpty(header)&&header.length()>20){
            if (header.startsWith("Bearer ")){
                String token = header.substring(7);
                try {
                    Claims claims = jwtUtil.parseJWT(token);
                    String role = (String) claims.get("roles");
                    if (role!=null||role.equals("admin")){
                        request.setAttribute("claims_admin",claims);
                    }
                }catch (Exception e){
                    response.sendError(999);
                  logger.error("令牌不正确");
                  return false;
                }

            }
        }
        return true;
    }
}



