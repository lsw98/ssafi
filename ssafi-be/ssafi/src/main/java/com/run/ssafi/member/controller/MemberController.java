package com.run.ssafi.member.controller;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.Member;
import com.run.ssafi.member.dto.*;
import com.run.ssafi.member.service.MemberService;
import com.run.ssafi.message.Response;
import com.run.ssafi.message.custom_message.MemberResponseMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity join(@Valid @RequestBody MemberJoinRequestDto requestDto) throws Exception {
        memberService.joinMember(requestDto);
        return new ResponseEntity<>(Response.of(MemberResponseMessage.MEMBER_JOIN_SUCCESS), HttpStatus.OK);
    }

    @PostMapping("/id-check")
    public ResponseEntity idCheck(@RequestBody MemberIdCheckRequestDto memberIdCheckRequestDto) throws Exception {
        log.debug("idCheck email : {}", memberIdCheckRequestDto.getEmail());
        Member member = memberService.emailCheck(memberIdCheckRequestDto.getEmail());
        if (member != null) {
            return new ResponseEntity<>(Response.of(MemberResponseMessage.MEMBER_ID_CHECK_FAILURE), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(Response.of(MemberResponseMessage.MEMBER_ID_CHECK_SUCCESS), HttpStatus.OK);
        }
    }

    @PutMapping("/modify")
    public ResponseEntity modify(@AuthenticationPrincipal MemberDetail memberDetail, @Valid @RequestBody MemberInfoUpdateRequestDto requestDto, BindingResult bindingResult) throws Exception {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        return memberService.updateMemberInfo(memberDetail, requestDto);
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(@AuthenticationPrincipal MemberDetail memberDetail) throws Exception {
        long memberId = memberDetail.getMember().getId();
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(Response.of(MemberResponseMessage.MEMBER_DELETE_SUCCESS), HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<MemberInfoResponseDto> getInfo(@AuthenticationPrincipal MemberDetail memberDetail) throws Exception {
        String memberId = memberDetail.getMember().getEmail();
        MemberInfoResponseDto memberInfoResponseDto = memberService.getMemberInfo(memberId);
        return new ResponseEntity<>(memberInfoResponseDto, HttpStatus.OK);
    }
}

