package com.run.ssafi.message.custom_message;

import com.run.ssafi.message.ResponseMessage;
import lombok.Getter;

@Getter
public enum StockResponseMessage implements ResponseMessage {
    KOSPI_LIST_LOADING_SUCCESS("코스피 200 종목을 성공적으로 불러왔습니다."),
    INTEREST_STOCK_REGISTER_SUCCESS("관심 종목 등록이 완료되었습니다."),
    INTEREST_STOCK_DELETE_SUCCESS("관심 종목 등록이 성공적으로 해제되었습니다."),
    INTEREST_STOCK_LOADING_SUCCESS("관심 종목을 성공적으로 불러왔습니다."),
    HOLD_STOCK_REGISTER_SUCCESS("홀드 종목 등록이 완료되었습니다."),
    HOLD_STOCK_DELETE_SUCCESS("홀드 종목 등록이 성공적으로 해제되었습니다."),
    HOLD_STOCK_LOADING_SUCCESS("홀드 종목을 성공적으로 불러왔습니다."),
    BALANCE_HISTORY_LOADING_SUCCESS("잔고 내역을 성공적으로 불러왔습니다.");

    private final String message;
    StockResponseMessage(String message){
        this.message = message;
    }
    @Override
    public String getMessage(){
        return message;
    }
}
