package com.run.ssafi.member.service;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.Score;
import com.run.ssafi.exception.customexception.MemberException;
import com.run.ssafi.exception.message.MemberExceptionMessage;
import com.run.ssafi.member.dto.*;
import com.run.ssafi.member.repository.MemberRepository;
import com.run.ssafi.member.repository.ScoreRepository;
import com.run.ssafi.message.Response;
import com.run.ssafi.message.custom_message.MemberResponseMessage;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final ScoreRepository scoreRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    @Override
    public void joinMember(MemberJoinRequestDto memberJoinRequestDto) throws Exception {
        memberJoinRequestDto.setPassword(bCryptPasswordEncoder.encode(memberJoinRequestDto.getPassword()));
        Member member = memberJoinRequestDto.toEntity();
        // 이메일 중복 시 HttpStatus를 Conflict 상태로 응답 전달
        if (memberRepository.findByEmail(member.getEmail()) != null)
            throw new MemberException(MemberExceptionMessage.MEMBER_JOIN_FAILURE_EMAIL_DUPLICATED);
        memberRepository.save(member);
    }

    @Override
    public Member emailCheck(String email) throws Exception {
        return memberRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateMemberInfo(MemberDetail memberDetail, MemberInfoUpdateRequestDto memberInfoUpdateRequestDto) {
        Member member = memberRepository.findById(memberDetail.getMember().getId()).orElseThrow(() -> new MemberException(MemberExceptionMessage.DATA_NOT_FOUND));

        member.modifyPassword(bCryptPasswordEncoder.encode(memberInfoUpdateRequestDto.getPassword()));
        member.modifyPersonalAgreement(memberInfoUpdateRequestDto.getPersonalAgreement());
        Map<String, Object> response = new HashMap<>();

        MemberInfoResponseDto memberInfoResponseDto = MemberInfoResponseDto.builder()
                .email(member.getEmail())
                .personalAgreement(member.getPersonalAgreement())
                .build();

        response.put("Member", memberInfoResponseDto);
        response.put("message", Response.of(MemberResponseMessage.MEMBER_UPDATE_SUCCESS));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public MemberInfoResponseDto getMemberInfo(String memberId) throws Exception {
        Member member = memberRepository.findByEmail(memberId);
        Score score = scoreRepository.findById(member.getId()).orElse(null);

        MemberInfoResponseDto memberInfoResponseDto;

        if(score == null) {
            memberInfoResponseDto = MemberInfoResponseDto.builder()
                    .email(member.getEmail())
                    .snsType(member.getSnsType())
                    .type(member.getType())
                    .appKey(member.getAppKey())
                    .secretKey(member.getSecretKey())
                    .personalAgreement(member.getPersonalAgreement())
                    .accountPrefix(member.getAccountPrefix())
                    .accountSuffix(member.getAccountSuffix())
                    .build();
        } else {
            memberInfoResponseDto = MemberInfoResponseDto.builder()
                    .email(member.getEmail())
                    .snsType(member.getSnsType())
                    .type(member.getType())
                    .appKey(member.getAppKey())
                    .secretKey(member.getSecretKey())
                    .personalAgreement(member.getPersonalAgreement())
                    .accountPrefix(member.getAccountPrefix())
                    .accountSuffix(member.getAccountSuffix())
                    .aiScore(score.getAiScore())
                    .pbScore(score.getPbScore())
                    .mwScore(score.getMwScore())
                    .lcScore(score.getLcScore())
                    .build();
        }

        return memberInfoResponseDto;
    }

    @Transactional
    @Override
    public void enrollMBTI(MemberDetail memberDetail, MemberMBTIEnrollRequestDto requestDto) {
        Member member = memberRepository.findById(memberDetail.getMember().getId()).orElseThrow(() -> new MemberException(MemberExceptionMessage.DATA_NOT_FOUND));
        Double aiScore = requestDto.getAiScore();
        Double pbScore = requestDto.getPbScore();
        Double mwScore = requestDto.getMwScore();
        Double lcScore = requestDto.getLcScore();
        String type = requestDto.getType();
        member.modifyType(type);

        Score score;
        score = Score.builder()
                .id(member.getId())
                .aiScore(aiScore)
                .pbScore(pbScore)
                .mwScore(mwScore)
                .lcScore(lcScore)
                .build();
        scoreRepository.save(score);
    }

    @Transactional
    @Override
    public void registerKeyAccount(MemberDetail memberDetail,
            MemberKeyAccountRegisterRequestDto requestDto) {
        Member member = memberRepository.findById(memberDetail.getMember().getId()).orElseThrow(() -> new MemberException(MemberExceptionMessage.DATA_NOT_FOUND));
        member.modifyAppKey(requestDto.getAppKey());
        member.modifySecretKey(requestDto.getSecretKey());
        member.modifyAccountPrefix(requestDto.getAccountPrefix());
        member.modifyAccountSuffix(requestDto.getAccountSuffix());
    }

    @Transactional
    @Override
    public MemberScoreResponseDto updateScore(MemberDetail memberDetail, MemberScoreUpdateRequestDto memberScoreUpdateRequestDto) {
        Member member = memberRepository.findById(memberDetail.getMember().getId()).orElseThrow(() -> new MemberException(MemberExceptionMessage.DATA_NOT_FOUND));
        Double aiScore = memberScoreUpdateRequestDto.getAiScore();
        Double pbScore = memberScoreUpdateRequestDto.getPbScore();
        Double mwScore = memberScoreUpdateRequestDto.getMwScore();
        Double lcScore = memberScoreUpdateRequestDto.getLcScore();

        Optional<Score> optionalScore = scoreRepository.findById(member.getId());
        Score score;
        if (optionalScore.isPresent()) {
            score = optionalScore.get();
            score.modifyAiScore(aiScore);
            score.modifyPbScore(pbScore);
            score.modifyMwScore(mwScore);
            score.modifyLcScore(lcScore);
        } else {
            score = Score.builder()
                    .id(member.getId())
                    .aiScore(aiScore)
                    .pbScore(pbScore)
                    .mwScore(mwScore)
                    .lcScore(lcScore)
                    .build();
            scoreRepository.save(score);
        }

        MemberScoreResponseDto memberScoreResponseDto = MemberScoreResponseDto.builder()
                .aiScore(score.getAiScore())
                .pbScore(score.getPbScore())
                .mwScore(score.getMwScore())
                .lcScore(score.getLcScore())
                .message(MemberResponseMessage.MEMBER_SCORE_UPDATE_SUCCESS.getMessage())
                .build();

        return memberScoreResponseDto;
    }

    @Transactional
    @Override
    public MemberTypeResponseDto updateType(MemberDetail memberDetail, MemberTypeUpdateRequestDto memberTypeUpdateRequestDto) {
        Member member = memberRepository.findById(memberDetail.getMember().getId()).orElseThrow(() -> new MemberException(MemberExceptionMessage.DATA_NOT_FOUND));
        member.modifyType(memberTypeUpdateRequestDto.getType());
        MemberTypeResponseDto memberTypeResponseDto = MemberTypeResponseDto.builder()
                .type(member.getType())
                .message(MemberResponseMessage.MEMBER_TYPE_UPDATE_SUCCESS.getMessage())
                .build();
        return memberTypeResponseDto;
    }

    @Transactional
    @Override
    public MemberKeyResponseDto updateKey(MemberDetail memberDetail, MemberKeyUpdateRequestDto requestDto) {
        Member member = memberRepository.findById(memberDetail.getMember().getId()).orElseThrow(() -> new MemberException(MemberExceptionMessage.DATA_NOT_FOUND));
        member.modifyAppKey(requestDto.getAppKey());
        member.modifySecretKey(requestDto.getSecretKey());
        MemberKeyResponseDto memberKeyResponseDto = MemberKeyResponseDto.builder()
                .appKey(requestDto.getAppKey())
                .secretKey(requestDto.getSecretKey())
                .message(MemberResponseMessage.MEMBER_KEY_UPDATE_SUCCESS.getMessage())
                .build();
        return memberKeyResponseDto;
    }

    @Transactional
    @Override
    public MemberAccountResponseDto updateAccount(MemberDetail memberDetail, MemberAccountUpdateRequestDto requestDto) {
        Member member = memberRepository.findById(memberDetail.getMember().getId()).orElseThrow(() -> new MemberException(MemberExceptionMessage.DATA_NOT_FOUND));
        member.modifyAccountPrefix(requestDto.getAccountPrefix());
        member.modifyAccountSuffix(requestDto.getAccountSuffix());
        MemberAccountResponseDto memberAccountResponseDto = MemberAccountResponseDto.builder()
                .accountPrefix(requestDto.getAccountPrefix())
                .accountSuffix(requestDto.getAccountSuffix())
                .message(MemberResponseMessage.MEMBER_ACCOUNT_UPDATE_SUCCESS.getMessage())
                .build();

        return memberAccountResponseDto;
    }

    @Transactional
    @Override
    public void deleteMember(long memberId) {
        Member member = memberRepository.findById(memberId).orElse(null);
        if (member != null)
            member.modifyExit(true);
//            memberRepository.delete(member);
    }
}
