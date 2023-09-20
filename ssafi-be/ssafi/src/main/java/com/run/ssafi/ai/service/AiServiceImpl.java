package com.run.ssafi.ai.service;

import com.run.ssafi.ai.dto.AiStartRequestDto;
import com.run.ssafi.ai.repository.AiRepository;
import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.AiTrade;
import com.run.ssafi.domain.Member;
import com.run.ssafi.exception.customexception.MemberException;
import com.run.ssafi.exception.message.MemberExceptionMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class AiServiceImpl implements AiService {

    private final AiRepository aiRepository;

    @Transactional
    @Override
    public void startAiTrading(MemberDetail memberDetail, AiStartRequestDto requestDto){
        if (memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);
        AiTrade aiTrade = AiTrade.builder()
                .id(memberDetail.getMember().getId())
                .aiGoal(requestDto.getAiGoal())
                .aiBudget(requestDto.getAiBudget())
                .riskRatio(requestDto.getRiskRatio())
                .neutralRatio(requestDto.getNeutralRatio())
                .safetyRatio(requestDto.getSafetyRatio())
                .build();

        aiRepository.save(aiTrade);
    }

}
