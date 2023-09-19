package com.run.ssafi.stock.service;

import com.google.gson.Gson;
import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.Member;
import com.run.ssafi.member.repository.MemberRepository;
import com.run.ssafi.stock.dto.AuthResponseDto;
import com.run.ssafi.stock.dto.KISAuthResponse;
import com.run.ssafi.stock.feign.KISAuthApi;
import com.run.ssafi.stock.properties.KISAuthProperties;
import com.run.ssafi.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class StockServiceImpl implements StockService {

    private final KISAuthApi kisAuthApi;

    private final MemberRepository memberRepository;

    private final StockRepository stockRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public AuthResponseDto getAuth(MemberDetail memberDetail) {
        Member member = memberDetail.getMember();
        ResponseEntity response;
        KISAuthResponse kisAuthResponse;
        AuthResponseDto authResponseDto = new AuthResponseDto();

        if (member.getAppKey() != null) {
            authResponseDto.setAppKey(member.getAppKey());
        }
        if (member.getSecretKey() != null) {
            authResponseDto.setSecretKey(member.getSecretKey());
        }
        if (member.getAppKey() != null && member.getSecretKey() != null) {
            response = kisAuthApi.getAccessToken(
                    KISAuthProperties.grantType,
                    member.getAppKey(),
                    member.getSecretKey()
            );
            kisAuthResponse = new Gson()
                    .fromJson(
                            String.valueOf(response.getBody())
                            , KISAuthResponse.class
                    );
            authResponseDto.setAccessToken(kisAuthResponse.getAccessToken());
            authResponseDto.setTokenType(kisAuthResponse.getTokenType());
            authResponseDto.setExpiresIn(kisAuthResponse.getExpiresIn());
        }

        return authResponseDto;
    }
}
