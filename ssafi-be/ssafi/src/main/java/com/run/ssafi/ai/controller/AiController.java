package com.run.ssafi.ai.controller;

import com.run.ssafi.ai.dto.AiStartRequestDto;
import com.run.ssafi.ai.service.AiService;
import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.message.Response;
import com.run.ssafi.message.custom_message.AiResponseMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
@Slf4j
public class AiController {

    private final AiService aiService;

    @PostMapping
    public ResponseEntity<Response> aiTradingStart(@AuthenticationPrincipal MemberDetail memberDetail, @RequestBody AiStartRequestDto requestDto){

        aiService.startAiTrading(memberDetail, requestDto);

        return new ResponseEntity<>(Response.of(AiResponseMessage.AI_TRADING_START_SUCCESS),
                HttpStatus.OK);
    }
}
