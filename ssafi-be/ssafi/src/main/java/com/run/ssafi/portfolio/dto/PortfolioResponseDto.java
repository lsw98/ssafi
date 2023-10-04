package com.run.ssafi.portfolio.dto;

import com.run.ssafi.portfolio.vo.PortfolioVo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class PortfolioResponseDto {
    private PortfolioVo portfolioVo;
    private String message;
}
