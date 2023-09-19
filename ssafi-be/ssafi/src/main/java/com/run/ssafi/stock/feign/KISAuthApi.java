package com.run.ssafi.stock.feign;

import com.run.ssafi.social.config.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "KISAuth", url="https://openapivts.koreainvestment.com:29443", configuration = {
        FeignConfiguration.class})
public interface KISAuthApi {
    @PostMapping("/oauth2/tokenP")
    ResponseEntity<String> getAccessToken(
            @RequestParam("grant_type") String grantType,
            @RequestParam("appKey") String appKey,
            @RequestParam("appsecret") String appSecret
    );
}
