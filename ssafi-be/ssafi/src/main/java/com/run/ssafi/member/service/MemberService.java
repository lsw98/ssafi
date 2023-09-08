package com.run.ssafi.member.service;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.Member;
import com.run.ssafi.member.dto.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MemberService {

    void joinMember(MemberJoinRequestDto memberJoinRequestDto) throws Exception;
    Member emailCheck(String email) throws Exception;
    MemberInfoResponseDto getMemberInfo(String memberId) throws Exception;
    ResponseEntity updateMemberInfo(MemberDetail memberDetail, MemberInfoUpdateRequestDto memberInfoUpdateRequestDto) throws  Exception;

    void deleteMember(long memberId) throws Exception;
}
