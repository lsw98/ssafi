package com.run.ssafi.member.controller;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.Member;
import com.run.ssafi.exception.customexception.MemberException;
import com.run.ssafi.exception.message.MemberExceptionMessage;
import com.run.ssafi.member.dto.*;
import com.run.ssafi.member.service.MemberService;
import com.run.ssafi.message.Response;
import com.run.ssafi.message.custom_message.MemberResponseMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Response> join(@Valid @RequestBody MemberJoinRequestDto requestDto) throws Exception {
        memberService.joinMember(requestDto);
        return new ResponseEntity<>(Response.of(MemberResponseMessage.MEMBER_JOIN_SUCCESS), HttpStatus.OK);
    }

    @PostMapping("/id-check")
    public ResponseEntity<Response> idCheck(@Valid @RequestBody MemberIdCheckRequestDto memberIdCheckRequestDto) throws Exception {
        log.debug("idCheck email : {}", memberIdCheckRequestDto.getEmail());
        Member member = memberService.emailCheck(memberIdCheckRequestDto.getEmail());
        if (member != null) {
            return new ResponseEntity<>(Response.of(MemberResponseMessage.MEMBER_ID_CHECK_FAILURE), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(Response.of(MemberResponseMessage.MEMBER_ID_CHECK_SUCCESS), HttpStatus.OK);
        }
    }

    @PutMapping("/score")
    public ResponseEntity<MemberScoreResponseDto> modifyScore(@AuthenticationPrincipal MemberDetail memberDetail, @Valid @RequestBody MemberScoreUpdateRequestDto requestDto) throws Exception {

        if (memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);
        MemberScoreResponseDto memberScoreResponseDto = memberService.updateScore(memberDetail, requestDto);
        return new ResponseEntity<>(memberScoreResponseDto, HttpStatus.OK);
    }

    @PatchMapping("/type")
    public ResponseEntity<MemberTypeResponseDto> modifyType(@AuthenticationPrincipal MemberDetail memberDetail, @Valid @RequestBody MemberTypeUpdateRequestDto requestDto) throws Exception {

        if (memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);
        MemberTypeResponseDto memberTypeResponseDto = memberService.updateType(memberDetail, requestDto);
        return new ResponseEntity<>(memberTypeResponseDto, HttpStatus.OK);
    }

    @PatchMapping("/key")
    public ResponseEntity<MemberKeyResponseDto> modifyKey(@AuthenticationPrincipal MemberDetail memberDetail, @Valid @RequestBody MemberKeyUpdateRequestDto requestDto) throws Exception {

        if (memberDetail == null) throw new MemberException(MemberExceptionMessage.DATA_NOT_FOUND);
        MemberKeyResponseDto memberKeyResponseDto = memberService.updateKey(memberDetail, requestDto);
        return new ResponseEntity<>(memberKeyResponseDto, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Response> delete(@AuthenticationPrincipal MemberDetail memberDetail) throws Exception {
        long memberId = memberDetail.getMember().getId();
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(Response.of(MemberResponseMessage.MEMBER_DELETE_SUCCESS), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<MemberInfoResponseDto> getInfo(@AuthenticationPrincipal MemberDetail memberDetail) throws Exception {
        String memberId = memberDetail.getMember().getEmail();
        MemberInfoResponseDto memberInfoResponseDto = memberService.getMemberInfo(memberId);
        return new ResponseEntity<>(memberInfoResponseDto, HttpStatus.OK);
    }
}

