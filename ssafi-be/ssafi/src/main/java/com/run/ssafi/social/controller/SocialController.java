package com.run.ssafi.social.controller;

import static com.run.ssafi.filter.JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME;
import static com.run.ssafi.filter.JwtProperties.REFRESH_TOKEN_EXPIRATION_TIME;

import com.run.ssafi.config.redis.RefreshTokenService;
import com.run.ssafi.domain.Member;
import com.run.ssafi.filter.JwtTokenProvider;
import com.run.ssafi.filter.JwtUtil;
import com.run.ssafi.member.repository.MemberRepository;
import com.run.ssafi.message.Response;
import com.run.ssafi.message.custom_message.MemberResponseMessage;
import com.run.ssafi.social.dto.SocialLoginRequest;
import com.run.ssafi.social.dto.UserResponse;
import com.run.ssafi.social.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.net.URI;
import java.sql.SQLException;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class SocialController {
    private final UserService userService;

    private final MemberRepository memberRepository;

    private final RefreshTokenService refreshTokenService;

    private final JwtTokenProvider jwtTokenProvider;

    private final JwtUtil jwtUtil;

    @PostMapping("/social-login")
    public ResponseEntity<Response> doSocialLogin(@RequestBody @Valid SocialLoginRequest request, HttpServletResponse response) throws SQLException {

        Member member =  memberRepository.findById(userService.doSocialLogin(request).getId()).orElse(null);

        Map<String, Object> customClaims = jwtUtil.setCustomClaims(new HashMap<>(), "memberId", String.valueOf(member.getId()));

        String accessToken = jwtTokenProvider.generateToken(member.getEmail(), ACCESS_TOKEN_EXPIRATION_TIME, customClaims);
        String refreshToken = jwtTokenProvider.generateToken(member.getEmail(), REFRESH_TOKEN_EXPIRATION_TIME, customClaims);

        jwtTokenProvider.setHeaderAccessToken(response, accessToken);

        // 사용자로부터 헤더 값으로 리프레시 토큰을 받는 것을 테스트하는 용도로, 실제 구현에서는 쿠키 값으로 전달하므로 빼야 함
        jwtTokenProvider.addHeaderRefreshToken(response, refreshToken);

        refreshTokenService.saveRefreshToken(String.valueOf(member.getId()), refreshToken, REFRESH_TOKEN_EXPIRATION_TIME);

        return new ResponseEntity<>(Response.of(MemberResponseMessage.MEMBER_LOGIN_SUCCESS), HttpStatus.OK);
    }
}