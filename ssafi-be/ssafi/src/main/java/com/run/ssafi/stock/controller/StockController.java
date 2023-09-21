package com.run.ssafi.stock.controller;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.Member;
import com.run.ssafi.exception.customexception.MemberException;
import com.run.ssafi.exception.message.MemberExceptionMessage;
import com.run.ssafi.stock.dto.AuthResponseDto;
import com.run.ssafi.stock.service.StockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock")
@Slf4j
public class StockController {

    private final StockService stockService;

    @GetMapping("/token")
    public ResponseEntity<AuthResponseDto> getAccessToken(@AuthenticationPrincipal MemberDetail memberDetail){

        if(memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);

        return new ResponseEntity<>(stockService.getAuth(memberDetail), HttpStatus.OK);
    }

}

