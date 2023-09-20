package com.run.ssafi.message.custom_message;

import com.run.ssafi.message.ResponseMessage;
import lombok.Getter;

@Getter
public enum AiResponseMessage implements ResponseMessage {
    AI_TRADING_START_SUCCESS ("성공적으로 AI 종목 투자가 실행되었습니다.");

    private final String message;

    AiResponseMessage(String message){
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
