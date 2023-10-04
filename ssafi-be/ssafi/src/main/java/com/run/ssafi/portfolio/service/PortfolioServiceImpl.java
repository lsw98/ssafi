package com.run.ssafi.portfolio.service;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.Portfolio;
import com.run.ssafi.portfolio.dto.PortfolioResponseDto;
import com.run.ssafi.portfolio.repository.PortfolioRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService{
    private final PortfolioRepository portfolioRepository;

    @Override
    public PortfolioResponseDto getPortfolio(MemberDetail memberDetail) {
        Member member = memberDetail.getMember();
        portfolioRepository.findByMemberAndPortType(member, member.getType());
        List<Portfolio> portfolioList = portfolioRepository.findAllByPortType(member.getType());



        return null;
    }
}
