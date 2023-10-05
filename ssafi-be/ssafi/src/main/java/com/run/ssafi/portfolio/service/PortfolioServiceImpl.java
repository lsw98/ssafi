package com.run.ssafi.portfolio.service;

import com.run.ssafi.ai.repository.AiRepository;
import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.AiTrade;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.Score;
import com.run.ssafi.member.repository.ScoreRepository;
import com.run.ssafi.message.custom_message.PortfolioMessage;
import com.run.ssafi.portfolio.dto.PortfolioResponseDto;
import com.run.ssafi.portfolio.repository.PortfolioRepository;
import com.run.ssafi.portfolio.vo.PortfolioVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService{
    private final AiRepository aiRepository;
    private final ScoreRepository scoreRepository;
    private final PortfolioRepository portfolioRepository;

    @Override
    public PortfolioResponseDto getPortfolio(MemberDetail memberDetail) {
        Member member = memberDetail.getMember();
        Score score = scoreRepository.findById(member.getId()).orElse(null);
        AiTrade aiTrade = aiRepository.findById(member.getId()).orElse(null);

        Double riskRatio;
        Double neutralRatio;
        Double safetyRatio;

        String type = member.getType();
        String investmentType = null;


        if(aiTrade != null){
            riskRatio = aiTrade.getRiskRatio();
            neutralRatio = aiTrade.getNeutralRatio();
            safetyRatio = aiTrade.getSafetyRatio();

            if(riskRatio>neutralRatio && riskRatio>safetyRatio){
                investmentType = "Risky";
            } else if (neutralRatio > safetyRatio) {
                investmentType = "Neutral";
            } else {
                investmentType = "Safety";
            }
        } else if (type != null){
            investmentType = switch (type) {
                case "APML" -> "Risky";
                case "APMC" -> "Risky";
                case "APWL" -> "Neutral";
                case "APWC" -> "Safety";
                case "ABML" -> "Risky";
                case "ABMC" -> "Risky";
                case "ABWL" -> "Risky";
                case "ABWC" -> "Neutral";
                case "IPML" -> "Risky";
                case "IPMC" -> "Risky";
                case "IPWL" -> "Neutral";
                case "IPWC" -> "Safety";
                case "IBML" -> "Risky";
                case "IBMC" -> "Risky";
                case "IBWL" -> "Neutral";
                case "IBWC" -> "Safety";
                default -> investmentType;
            };
        }

        PortfolioVo portfolioVo = portfolioRepository.findByType(investmentType);

        PortfolioResponseDto portfolioResponseDto = new PortfolioResponseDto();

        if(member.getType() != null){
            portfolioResponseDto.setType(member.getType());
        }

        if(portfolioVo != null){
            portfolioResponseDto.setRecommendedStock(portfolioVo.getRecommendedStock());
        }

        if (score != null) {
            portfolioResponseDto.setAiScore(score.getAiScore());
            portfolioResponseDto.setPbScore(score.getPbScore());
            portfolioResponseDto.setMwScore(score.getMwScore());
            portfolioResponseDto.setLcScore(score.getLcScore());
        }

        portfolioResponseDto.setMessage(PortfolioMessage.PORTFOLIO_LOADING_SUCCESS.getMessage());

        return portfolioResponseDto;
    }
}
