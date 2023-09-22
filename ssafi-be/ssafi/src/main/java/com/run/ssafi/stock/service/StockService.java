package com.run.ssafi.stock.service;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.stock.dto.AuthResponseDto;
import org.springframework.http.ResponseEntity;

public interface StockService {

    AuthResponseDto getAuth(MemberDetail memberDetail);
}
