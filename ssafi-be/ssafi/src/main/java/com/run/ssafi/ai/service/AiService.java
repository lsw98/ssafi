package com.run.ssafi.ai.service;

import com.run.ssafi.ai.dto.AiStartRequestDto;
import com.run.ssafi.config.auth.MemberDetail;

public interface AiService {

    void startAiTrading(MemberDetail memberDetail, AiStartRequestDto requestDto);
}
