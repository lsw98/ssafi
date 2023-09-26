package com.run.ssafi.message.custom_message;

import com.run.ssafi.message.ResponseMessage;
import lombok.Getter;

@Getter
public enum StockResponseMessage implements ResponseMessage {
    INTEREST_STOCK_REGISTER_SUCCESS("관심 종목 등록이 완료되었습니다."),
    INTEREST_STOCK_DELETE_SUCCESS("관심 종목 등록이 성공적으로 삭제되었습니다."),
    INTEREST_STOCK_LOADING_SUCCESS("관심 종목을 성공적으로 불러왔습니다.");
    private final String message;
    StockResponseMessage(String message){
        this.message = message;
    }
    @Override
    public String getMessage(){
        return message;
    }
}
