package com.xiaoyuanbang.oss.controller;

import com.xiaoyuanbang.oss.utils.OSSUtil;
import com.xiaoyuanbang.common.entity.Result;
import com.xiaoyuanbang.common.entity.StatusCode;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.xiaoyuanbang.common.util.JwtUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/oss")
public class OssController {
    @Autowired
    private JwtUtil jwtUtil;



    @Autowired
    private OSSUtil ossUtil;



    @Autowired
    private HttpServletRequest request;

    @PostMapping("/uploadArticleImg")
    public Result uploadArticleImg( MultipartFile file) {
        Object claims_user = request.getAttribute("claims_admin");
        Claims claims = (Claims) claims_user;

        if (claims == null) {
            return new Result(false, StatusCode.ACCESSERROR, "请登录后再上传");
        }
        String id = claims.getId();



       if (file == null || file.isEmpty() || file.getSize() == 0) {
            return new Result(false, StatusCode.ERROR,"上传失败");
        }
        if (file.getSize() > 10 * 1024 * 1024) {
            return new Result(false, StatusCode.ERROR,"上传失败，文件大小限制");        }
        Map<String, String> map = new HashMap<>();
        String fileType = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
        //OSS单文件上传,返回上传成功后的oss存储服务器中的url
        File newFile = new File(file.getName());
        FileOutputStream os = null;
        try {
            os = new FileOutputStream(newFile);
            os.write(file.getBytes());
            os.close();
            file.transferTo(newFile);
        } catch (Exception e) {
            e.printStackTrace();
        }

        String fileName = OSSUtil.uploadFile(newFile, fileType);
        fileName=fileName.substring(0,fileName.lastIndexOf("?"));
        return new Result(true,StatusCode.OK,"上传成功",fileName);
    }


    @GetMapping("/upload")
    public Result upload() {
        return new Result(true,StatusCode.OK,"上传成功");
    }



}
