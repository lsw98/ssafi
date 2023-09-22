package com.run.ssafi.member;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.run.ssafi.config.TestSecurityConfiguration;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.Role;
import com.run.ssafi.member.repository.MemberRepository;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@DataJpaTest
@Slf4j
@Import(TestSecurityConfiguration.class)
public class MemberJpaTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Test
    @DisplayName("멤버저장_블러오기")
    public void testMemberSave() {
        //given
        String email = "b088081@gmail.com";
        String password = "1234";

        memberRepository.save(Member.builder()
                .email(email)
                .password(bCryptPasswordEncoder.encode(password))
                .role(Role.MEMBER)
                .build());

        //when
        List<Member> membersList = memberRepository.findAll();

        //then
        Member member = membersList.get(0);
        assertThat(member.getEmail()).isEqualTo(email);
        assertThat(bCryptPasswordEncoder.matches(password, member.getPassword())).isTrue();
    }
}
