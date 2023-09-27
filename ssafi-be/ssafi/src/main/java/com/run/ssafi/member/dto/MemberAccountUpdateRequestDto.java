package com.run.ssafi.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MemberAccountUpdateRequestDto {
    private String accountPrefix;
    private String accountSuffix;
}
