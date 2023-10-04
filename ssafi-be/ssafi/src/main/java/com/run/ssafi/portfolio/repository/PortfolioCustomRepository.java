package com.run.ssafi.portfolio.repository;

import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.Portfolio;
import com.run.ssafi.portfolio.vo.PortfolioVo;
import java.util.List;

public interface PortfolioCustomRepository {
    PortfolioVo findByMemberAndPortType(Member member, String portType);
}
