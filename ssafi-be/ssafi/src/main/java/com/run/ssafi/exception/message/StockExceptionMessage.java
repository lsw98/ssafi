package com.run.ssafi.exception.message;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum StockExceptionMessage {
    DATA_NOT_FOUND("해당 종목을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);

    private final String message;
    private final HttpStatus httpStatus;
    StockExceptionMessage(String message, HttpStatus httpStatus){
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
