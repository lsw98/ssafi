package com.run.ssafi.portfolio.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PortfolioVo {
    private String type;
    private String recommendedStock;
    private Double aiScore;
    private Double pbScore;
    private Double mwScore;
    private Double lcScore;
}
