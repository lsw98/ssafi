package com.run.ssafi.stock.service;

import com.google.gson.Gson;
import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.Member;
import com.run.ssafi.message.custom_message.AuthResponseMessage;
import com.run.ssafi.stock.dto.AuthResponseDto;
import com.run.ssafi.stock.dto.KISAccessTokenRequestDto;
import com.run.ssafi.stock.dto.KISAuthResponse;
import com.run.ssafi.stock.feign.KISAuthApi;
import com.run.ssafi.stock.properties.KISAuthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class StockServiceImpl implements StockService {

    private final KISAuthApi kisAuthApi;

    @Override
    public AuthResponseDto getAuth(MemberDetail memberDetail) {
        Member member = memberDetail.getMember();
        AuthResponseDto authResponseDto = new AuthResponseDto();
        extracted(member, authResponseDto);

        return authResponseDto;
    }

    public void extracted(Member member, AuthResponseDto authResponseDto) {
        KISAuthResponse kisAuthResponse;
        KISAccessTokenRequestDto kisAccessTokenRequestDto;

        if (member.getAppKey() != null) {
            authResponseDto.setAppKey(member.getAppKey());
        }
        if (member.getSecretKey() != null) {
            authResponseDto.setSecretKey(member.getSecretKey());
        }
        if (member.getAppKey() != null && member.getSecretKey() != null) {
            kisAccessTokenRequestDto = KISAccessTokenRequestDto.builder()
                    .appKey(member.getAppKey())
                    .appSecret(member.getSecretKey())
                    .grantType(KISAuthProperties.grantType)
                    .build();

            ResponseEntity<String> response = kisAuthApi.getAccessToken(kisAccessTokenRequestDto);
            kisAuthResponse = new Gson()
                    .fromJson(
                            String.valueOf(response.getBody())
                            , KISAuthResponse.class
                    );
            authResponseDto.setAccessToken(kisAuthResponse.getAccessToken());
            authResponseDto.setTokenType(kisAuthResponse.getTokenType());
            authResponseDto.setExpiresIn(kisAuthResponse.getExpiresIn());
            authResponseDto.setMessage(AuthResponseMessage.KIS_ACCESS_TOKEN_ISSUE_SUCCESS.getMessage());
        }
    }
}
