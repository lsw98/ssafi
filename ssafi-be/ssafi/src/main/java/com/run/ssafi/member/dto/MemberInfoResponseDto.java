package com.run.ssafi.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemberInfoResponseDto {

    private String email;
    private String name;
    private String snsId;
    private String snsType;
    private Character personalAgreement;

    @Builder
    public MemberInfoResponseDto(String email, String name, String snsId, String snsType, Character personalAgreement) {
        this.email = email;
        this.name = name;
        this.snsId = snsId;
        this.snsType = snsType;
        this.personalAgreement = personalAgreement;
    }
}
