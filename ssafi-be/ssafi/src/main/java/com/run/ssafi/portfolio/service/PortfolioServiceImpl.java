package com.run.ssafi.portfolio.service;

import com.run.ssafi.ai.repository.AiRepository;
import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.AiTrade;
import com.run.ssafi.domain.Kospi;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.Portfolio;
import com.run.ssafi.domain.Score;
import com.run.ssafi.domain.Type;
import com.run.ssafi.member.repository.ScoreRepository;
import com.run.ssafi.message.custom_message.PortfolioMessage;
import com.run.ssafi.portfolio.dto.PortfolioResponseDto;
import com.run.ssafi.portfolio.repository.PortfolioRepository;
import com.run.ssafi.portfolio.vo.PortfolioVo;
import com.run.ssafi.stock.repository.KospiRepository;
import java.util.List;
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
    private final KospiRepository kospiRepository;

    @Override
    public PortfolioResponseDto getPortfolio(MemberDetail memberDetail) {
        Member member = memberDetail.getMember();
        Score score = scoreRepository.findById(member.getId()).orElse(null);
        AiTrade aiTrade = aiRepository.findById(member.getId()).orElse(null);

        Double riskRatio;
        Double neutralRatio;
        Double safetyRatio;

        Type type = member.getType();
        String investmentType = null;


        if(aiTrade != null){
            riskRatio = aiTrade.getRiskRatio();
            neutralRatio = aiTrade.getNeutralRatio();
            safetyRatio = aiTrade.getSafetyRatio();

            if(riskRatio>neutralRatio && riskRatio>safetyRatio){
                investmentType = "risk";
            } else if (neutralRatio > safetyRatio) {
                investmentType = "neutral";
            } else {
                investmentType = "safe";
            }
        } else if (type != null){
            investmentType = switch (type) {
                case APML -> "risk";
                case APMC -> "risk";
                case APWL -> "neutral";
                case APWC -> "safe";
                case ABML -> "risk";
                case ABMC -> "risk";
                case ABWL -> "risk";
                case ABWC -> "neutral";
                case IPML -> "risk";
                case IPMC -> "risk";
                case IPWL -> "neutral";
                case IPWC -> "safe";
                case IBML -> "risk";
                case IBMC -> "risk";
                case IBWL -> "neutral";
                case IBWC -> "safe";
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

    @Override
    public void createPortfolio(){

        List<Kospi> kospiList = kospiRepository.findTop3Kospi();
        System.out.println(kospiList.toString());

        portfolioRepository.deletePortfolio();

        for (Kospi kospi : kospiList) {
            portfolioRepository.save(
                    Portfolio.builder()
                            .portType(kospi.getKospiType())
                            .kospi(kospi)
                            .build()
            );
        }
    }
}
