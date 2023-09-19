package com.run.ssafi.social.dto;

import com.run.ssafi.message.Response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SocialLoginResponse {

    private String appKey;
    private String secretKey;
    private String accessToken;
    private String tokenType;
    private String expiresIn;
    private String message;
}
