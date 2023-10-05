package com.run.ssafi.portfolio.repository;

import com.run.ssafi.portfolio.vo.PortfolioVo;


public interface PortfolioCustomRepository {
    PortfolioVo findByType(String type);
}
