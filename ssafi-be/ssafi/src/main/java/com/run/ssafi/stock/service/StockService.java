package com.run.ssafi.stock.service;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.stock.dto.AuthResponseDto;
import com.run.ssafi.stock.dto.InterestStockListResponseDto;
import org.springframework.http.ResponseEntity;

public interface StockService {

    AuthResponseDto getAuth(MemberDetail memberDetail);

    void registerInterestStock(MemberDetail memberDetail, String kospiCode);
    InterestStockListResponseDto getInterestStockList(MemberDetail memberDetail);

    void deleteInterestStock(MemberDetail memberDetail, String kospiCode);
}
