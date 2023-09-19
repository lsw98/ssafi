package com.run.ssafi.stock.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class KISAuthResponse {

    private String accessToken;
    private String tokenType;
    private String expiresIn;

}
