package com.xiaoyuanbang.oss.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "oss")
public class OssConfig {
    private String ossaddress="oss-cn-beijing.aliyuncs.com";
    private String accessKeyId="LTAI4NrGW4DIk7l8";
    private String accessKeySecret="almTNbWvH0GNyThOBQGS3Grhd5ofco";
    private String bucketName="xiaoyuanbang";
    private String filePath="images/";

    public String getOssaddress() {
        return ossaddress;
    }

    public void setOssaddress(String ossaddress) {
        this.ossaddress = ossaddress;
    }

    public String getAccessKeyId() {
        return accessKeyId;
    }

    public void setAccessKeyId(String accessKeyId) {
        this.accessKeyId = accessKeyId;
    }

    public String getAccessKeySecret() {
        return accessKeySecret;
    }

    public void setAccessKeySecret(String accessKeySecret) {
        this.accessKeySecret = accessKeySecret;
    }

    public String getBucketName() {
        return bucketName;
    }

    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
