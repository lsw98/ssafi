package com.run.ssafi.social.controller;

import static com.run.ssafi.filter.JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME;
import static com.run.ssafi.filter.JwtProperties.REFRESH_TOKEN_EXPIRATION_TIME;

import com.google.gson.Gson;
import com.run.ssafi.config.redis.RefreshTokenService;
import com.run.ssafi.domain.Member;
import com.run.ssafi.filter.JwtTokenProvider;
import com.run.ssafi.filter.JwtUtil;
import com.run.ssafi.member.repository.MemberRepository;
import com.run.ssafi.stock.dto.KISAuthResponse;
import com.run.ssafi.social.dto.SocialLoginRequest;
import com.run.ssafi.social.dto.SocialLoginResponse;
import com.run.ssafi.social.service.UserService;
import com.run.ssafi.stock.feign.KISAuthApi;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.sql.SQLException;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor

public class SocialController {

    private final KISAuthApi kisAuthApi;

    private final UserService userService;

    private final MemberRepository memberRepository;

    private final RefreshTokenService refreshTokenService;

    private final JwtTokenProvider jwtTokenProvider;

    private final JwtUtil jwtUtil;

    private final String grantType = "client_credentials";

    @GetMapping
    public void test(@RequestParam("code") String code){
        System.out.println(code);
    }

    @PostMapping("/social-login")
    public ResponseEntity<SocialLoginResponse> doSocialLogin(
            @RequestBody @Valid SocialLoginRequest request, HttpServletResponse response)
            throws SQLException {

        Member member = memberRepository.findById(userService.doSocialLogin(request).getId())
                .orElse(null);

        Map<String, Object> customClaims = jwtUtil.setCustomClaims(new HashMap<>(), "memberId",
                String.valueOf(member.getId()));

        String accessToken = jwtTokenProvider.generateToken(member.getEmail(),
                ACCESS_TOKEN_EXPIRATION_TIME, customClaims);
        String refreshToken = jwtTokenProvider.generateToken(member.getEmail(),
                REFRESH_TOKEN_EXPIRATION_TIME, customClaims);

        jwtTokenProvider.setHeaderAccessToken(response, accessToken);

        // 사용자로부터 헤더 값으로 리프레시 토큰을 받는 것을 테스트하는 용도로, 실제 구현에서는 쿠키 값으로 전달하므로 빼야 함
        jwtTokenProvider.addHeaderRefreshToken(response, refreshToken);

        refreshTokenService.saveRefreshToken(String.valueOf(member.getId()), refreshToken,
                REFRESH_TOKEN_EXPIRATION_TIME);

        SocialLoginResponse socialLoginResponse = new SocialLoginResponse();
        ResponseEntity<?> responseEntity;
        KISAuthResponse kisAuthResponse = null;
        if (member.getAppKey() != null) {
            socialLoginResponse.setAppKey(member.getAppKey());
        }
        if (member.getSecretKey() != null) {
            socialLoginResponse.setSecretKey(member.getSecretKey());
        }
        if (member.getAppKey() != null && member.getSecretKey() != null) {
            responseEntity = kisAuthApi.getAccessToken(
                    grantType,
                    member.getAppKey(),
                    member.getSecretKey()
            );
            kisAuthResponse = new Gson()
                    .fromJson(
                            String.valueOf(responseEntity.getBody())
                            , KISAuthResponse.class
                    );
            socialLoginResponse.setAccessToken(kisAuthResponse.getAccessToken());
            socialLoginResponse.setTokenType(kisAuthResponse.getTokenType());
            socialLoginResponse.setExpiresIn(kisAuthResponse.getExpiresIn());
        }

        socialLoginResponse.setMessage("로그인 성공 AccessToken 및 RefreshToken 발급 완료");

        return new ResponseEntity<>(socialLoginResponse, HttpStatus.OK);
    }
}