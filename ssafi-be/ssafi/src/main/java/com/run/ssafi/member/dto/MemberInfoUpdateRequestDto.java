package com.run.ssafi.member.dto;

import com.run.ssafi.domain.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberInfoUpdateRequestDto {

    private String password;
    private String name;
    private String snsId;
    private String snsType;
    private Character personalAgreement;

    @Builder
    public MemberInfoUpdateRequestDto(String password, String name, String snsId, String snsType) {
        this.password = password;
        this.name = name;
        this.snsId = snsId;
        this.snsType = snsType;
        this.personalAgreement = 'T';
    }
}
