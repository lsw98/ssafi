package com.run.ssafi.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberKeyResponseDto {

    private String appKey;
    private String secretKey;
}
