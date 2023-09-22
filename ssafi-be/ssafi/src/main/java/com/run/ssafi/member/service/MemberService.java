package com.run.ssafi.member.service;

import com.run.ssafi.config.auth.MemberDetail;
import com.run.ssafi.domain.Member;
import com.run.ssafi.member.dto.*;
import java.sql.SQLException;
import org.springframework.http.ResponseEntity;

public interface MemberService {

    void joinMember(MemberJoinRequestDto memberJoinRequestDto) throws Exception;
    Member emailCheck(String email) throws Exception;
    MemberInfoResponseDto getMemberInfo(String memberId) throws Exception;
    ResponseEntity<?> updateMemberInfo(MemberDetail memberDetail, MemberInfoUpdateRequestDto memberInfoUpdateRequestDto) throws  Exception;
    MemberScoreResponseDto updateScore(MemberDetail memberDetail, MemberScoreUpdateRequestDto memberScoreUpdateRequestDto)
            throws SQLException;
    MemberTypeResponseDto updateType(MemberDetail memberDetail, MemberTypeUpdateRequestDto memberTypeUpdateRequestDto)
            throws SQLException;
    MemberKeyResponseDto updateKey(MemberDetail memberDetail, MemberKeyUpdateRequestDto memberKeyUpdateRequestDto)
            throws SQLException;
    void deleteMember(long memberId) throws Exception;
}
