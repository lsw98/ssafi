package com.run.ssafi.domain;

import com.run.ssafi.BaseTimeEntity;
import com.run.ssafi.social.type.SnsType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity(name = "Member")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name="MEMBER", uniqueConstraints = {@UniqueConstraint(name="Unique_email",columnNames = {"email"})})
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="email", nullable = false)
    private String email;
    @Column(name="password")
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(name="role", nullable = false)
    private Role role;
    @Column(name="exit")
    private Boolean exit;
    @Enumerated(EnumType.STRING)
    @Column(name="sns_type")
    private SnsType snsType;
    @Column(name="personal_agreement_yn")
    private Character personalAgreement;
    @Column(name="app_key")
    private String appKey;
    @Column(name="secret_key")
    private String secretKey;
    @Column(name="score")
    private String score;
    @Column(name="type")
    private String type;

    @Builder
    public Member(String email, String password, Role role, Boolean exit, SnsType snsType, Character personalAgreement) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.exit = exit;
        this.snsType = snsType;
        this.personalAgreement = personalAgreement;
    }


    public void modifyPassword(String password) {
        this.password=password;
    }
    public void modifyExit(Boolean exit) {
        this.exit=exit;
    }
    public void modifyPersonalAgreement(Character personalAgreement) {
        this.personalAgreement=personalAgreement;
    }
}
