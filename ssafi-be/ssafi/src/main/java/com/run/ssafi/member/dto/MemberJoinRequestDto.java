package com.run.ssafi.member.dto;

import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.Role;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class MemberJoinRequestDto {

    @Email(regexp = "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$", message ="이메일 양식이 맞지 않습니다")
    @NotBlank(message = "이메일을 입력해주세요")
    private String email;
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])(?=.*\\d).{8,}$",
            message = "비밀번호를 영문자, 특수문자, 숫자를 포함한 8자 이상으로 입력해주세요.")
    private String password;
    private String name;

    @Builder
    public MemberJoinRequestDto(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .password(password)
                .role(Role.MEMBER)
                .name(name)
                .exit(false)
                .personalAgreement('T')
                .build();
    }
}
