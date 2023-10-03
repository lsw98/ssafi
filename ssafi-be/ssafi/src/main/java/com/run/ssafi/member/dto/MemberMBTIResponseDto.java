package com.run.ssafi.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MemberMBTIResponseDto {
    private Double aiScore;
    private Double pbScore;
    private Double mwScore;
    private Double lcScore;
    private String type;
    private String message;
}
