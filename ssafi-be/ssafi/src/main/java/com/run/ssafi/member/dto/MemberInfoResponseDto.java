package com.run.ssafi.member.dto;

import com.run.ssafi.social.type.SnsType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemberInfoResponseDto {

    private String email;
    private SnsType snsType;
    private String score;
    private String type;
    private Character personalAgreement;
    private String appKey;
    private String secretKey;

    @Builder
    public MemberInfoResponseDto(String email, SnsType snsType, String score, String type, String appKey, String secretKey, Character personalAgreement) {
        this.email = email;
        this.snsType = snsType;
        this.score = score;
        this.type = type;
        this.appKey = appKey;
        this.secretKey = secretKey;
        this.personalAgreement = personalAgreement;
    }
}
