package com.run.ssafi.stock.service;

import com.google.gson.Gson;
import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.HoldStock;
import com.run.ssafi.domain.InterestStock;
import com.run.ssafi.domain.Kospi;
import com.run.ssafi.domain.Member;
import com.run.ssafi.exception.customexception.StockException;
import com.run.ssafi.exception.message.StockExceptionMessage;
import com.run.ssafi.member.dto.MemberKeyUpdateRequestDto;
import com.run.ssafi.message.custom_message.AuthResponseMessage;
import com.run.ssafi.message.custom_message.StockResponseMessage;
import com.run.ssafi.stock.dto.AuthResponseDto;
import com.run.ssafi.stock.dto.HoldStockListResponseDto;
import com.run.ssafi.stock.dto.InterestStockListResponseDto;
import com.run.ssafi.stock.dto.KISAccessTokenRequestDto;
import com.run.ssafi.stock.dto.KISAuthResponse;
import com.run.ssafi.stock.feign.KISAuthApi;
import com.run.ssafi.stock.properties.KISAuthProperties;
import com.run.ssafi.stock.repository.HoldStockRepository;
import com.run.ssafi.stock.repository.InterestStockRepository;
import com.run.ssafi.stock.repository.KospiRepository;
import com.run.ssafi.stock.vo.HoldStockVo;
import com.run.ssafi.stock.vo.InterestStockVo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class StockServiceImpl implements StockService {

    private final KISAuthApi kisAuthApi;
    private final KospiRepository kospiRepository;
    private final InterestStockRepository interestStockRepository;
    private final HoldStockRepository holdStockRepository;

    @Override
    public AuthResponseDto getAuth(MemberKeyUpdateRequestDto requestDto) {
        AuthResponseDto authResponseDto = new AuthResponseDto();
        extracted(authResponseDto, requestDto);

        return authResponseDto;
    }

    @Override
    public AuthResponseDto getAuth(MemberDetail memberDetail) {
        Member member = memberDetail.getMember();
        AuthResponseDto authResponseDto = new AuthResponseDto();
        extracted(member, authResponseDto);

        return authResponseDto;
    }

    @Transactional
    @Override
    public void registerInterestStock(MemberDetail memberDetail, String kospiCode){
        Member member = memberDetail.getMember();
        Kospi kospi = kospiRepository.findByKospiCode(kospiCode);
        if(kospi == null) throw new StockException(StockExceptionMessage.DATA_NOT_FOUND);
        InterestStock interestStock = InterestStock.builder()
                .kospi(kospi)
                .member(member)
                .build();
        if (interestStockRepository.findByKospi(kospi) == null)
            interestStockRepository.save(interestStock);
    }

    @Override
    public InterestStockListResponseDto getInterestStockList(MemberDetail memberDetail){
        Member member = memberDetail.getMember();
        List<InterestStockVo> interestStockVoList = interestStockRepository.findByMember(member);
        InterestStockListResponseDto interestStockListResponseDto = InterestStockListResponseDto.builder()
                .interestStockVoList(interestStockVoList)
                .message(StockResponseMessage.INTEREST_STOCK_LOADING_SUCCESS.getMessage())
                .build();
        return interestStockListResponseDto;
    }

    @Transactional
    @Override
    public void deleteInterestStock(MemberDetail memberDetail, String kospiCode) {
        Member member = memberDetail.getMember();
        Kospi kospi = kospiRepository.findByKospiCode(kospiCode);
        if(kospi == null) throw new StockException(StockExceptionMessage.DATA_NOT_FOUND);
        InterestStock interestStock = interestStockRepository.findByKospiAndMember(kospi, member);
        if (interestStock != null)
            interestStockRepository.delete(interestStock);
    }

    @Transactional
    @Override
    public void registerHoldStock(MemberDetail memberDetail, String kospiCode){
        Member member = memberDetail.getMember();
        Kospi kospi = kospiRepository.findByKospiCode(kospiCode);
        if(kospi == null) throw new StockException(StockExceptionMessage.DATA_NOT_FOUND);
        HoldStock holdStock = HoldStock.builder()
                .kospi(kospi)
                .member(member)
                .build();
        if (holdStockRepository.findByKospi(kospi) == null)
            holdStockRepository.save(holdStock);
    }

    @Override
    public HoldStockListResponseDto getHoldStockList(MemberDetail memberDetail){
        Member member = memberDetail.getMember();
        List<HoldStockVo> holdStockVoList = holdStockRepository.findByMember(member);
        HoldStockListResponseDto holdStockListResponseDto = HoldStockListResponseDto.builder()
                .holdStockVoList(holdStockVoList)
                .message(StockResponseMessage.HOLD_STOCK_LOADING_SUCCESS.getMessage())
                .build();
        return holdStockListResponseDto;
    }

    @Transactional
    @Override
    public void deleteHoldStock(MemberDetail memberDetail, String kospiCode) {
        Member member = memberDetail.getMember();
        Kospi kospi = kospiRepository.findByKospiCode(kospiCode);
        if(kospi == null) throw new StockException(StockExceptionMessage.DATA_NOT_FOUND);
        HoldStock holdStock = holdStockRepository.findByKospiAndMember(kospi, member);
        if (holdStock != null)
            holdStockRepository.delete(holdStock);
    }

    public void extracted(Member member, AuthResponseDto authResponseDto) {
        getAccessToken(authResponseDto, member.getAppKey(), member.getSecretKey());
    }

    public void extracted(AuthResponseDto authResponseDto, MemberKeyUpdateRequestDto requestDto) {
        getAccessToken(authResponseDto, requestDto.getAppKey(), requestDto.getSecretKey());
    }

    private void getAccessToken(AuthResponseDto authResponseDto, String appKey, String secretKey) {
        KISAuthResponse kisAuthResponse;
        KISAccessTokenRequestDto kisAccessTokenRequestDto;

        if (appKey != null) {
            authResponseDto.setAppKey(appKey);
        }
        if (secretKey != null) {
            authResponseDto.setSecretKey(secretKey);
        }
        if (appKey != null && secretKey != null) {
            kisAccessTokenRequestDto = KISAccessTokenRequestDto.builder()
                    .appKey(appKey)
                    .appSecret(secretKey)
                    .grantType(KISAuthProperties.grantType)
                    .build();

            ResponseEntity<String> response = kisAuthApi.getAccessToken(kisAccessTokenRequestDto);
            kisAuthResponse = new Gson()
                    .fromJson(
                            String.valueOf(response.getBody())
                            , KISAuthResponse.class
                    );
            authResponseDto.setAccessToken(kisAuthResponse.getAccessToken());
            authResponseDto.setTokenType(kisAuthResponse.getTokenType());
            authResponseDto.setExpiresIn(kisAuthResponse.getExpiresIn());
            authResponseDto.setMessage(AuthResponseMessage.KIS_ACCESS_TOKEN_ISSUE_SUCCESS.getMessage());
        }
    }
}
