package com.run.ssafi.social.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.run.ssafi.social.dto.KaKaoLoginResponse;
import com.run.ssafi.social.dto.SocialAuthResponse;
import com.run.ssafi.social.dto.SocialUserResponse;
import com.run.ssafi.social.feign.kakao.KakaoAuthApi;
import com.run.ssafi.social.feign.kakao.KakaoUserApi;
import com.run.ssafi.social.type.SnsType;
import com.run.ssafi.social.utils.GsonLocalDateTimeAdapter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Profile("prod")
@Qualifier("kakaoLogin")
public class KakaoLoginServiceImpl implements SocialLoginService {
    private final KakaoAuthApi kakaoAuthApi;
    private final KakaoUserApi kakaoUserApi;

    @Value("${social.client.kakao.rest-api-key}")
    private String kakaoAppKey;
    @Value("${social.client.kakao.secret-key}")
    private String kakaoAppSecret;
    @Value("${social.client.kakao.redirect-uri}")
    private String kakaoRedirectUri;
    @Value("${social.client.kakao.grant_type}")
    private String kakaoGrantType;



    @Override
    public SnsType getServiceName() {
        return SnsType.KAKAO;
    }

    @Override
    public SocialAuthResponse getAccessToken(String authorizationCode) {
        ResponseEntity<?> response = kakaoAuthApi.getAccessToken(
                kakaoAppKey,
                kakaoAppSecret,
                kakaoGrantType,
                kakaoRedirectUri,
                authorizationCode
        );

        log.info("kaka auth response {}", response.toString());

        return new Gson()
                .fromJson(
                        String.valueOf(response.getBody())
                        , SocialAuthResponse.class
                );
    }

    @Override
    public SocialUserResponse getUserInfo(String accessToken) {
        Map<String ,String> headerMap = new HashMap<>();
        headerMap.put("authorization", "Bearer " + accessToken);

        ResponseEntity<?> response = kakaoUserApi.getUserInfo(headerMap);

        log.info("kakao user response");
        log.info(response.toString());

        String jsonString = response.getBody().toString();

        Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .registerTypeAdapter(LocalDateTime.class, new GsonLocalDateTimeAdapter())
                .create();

        KaKaoLoginResponse kaKaoLoginResponse = gson.fromJson(jsonString, KaKaoLoginResponse.class);
        KaKaoLoginResponse.KakaoLoginData kakaoLoginData = Optional.ofNullable(kaKaoLoginResponse.getKakao_account())
                .orElse(KaKaoLoginResponse.KakaoLoginData.builder().build());

        String name = Optional.ofNullable(kakaoLoginData.getProfile())
                .orElse(KaKaoLoginResponse.KakaoLoginData.KakaoProfile.builder().build())
                .getNickname();

        return SocialUserResponse.builder()
                .id(kaKaoLoginResponse.getId())
                .gender(kakaoLoginData.getGender())
                .name(name)
                .email(kakaoLoginData.getEmail())
                .build();
    }
}
