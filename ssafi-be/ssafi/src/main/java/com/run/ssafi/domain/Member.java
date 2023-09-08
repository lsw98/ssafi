package com.run.ssafi.domain;

import com.run.ssafi.BaseTimeEntity;
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
    @Column(name="name")
    private String name;
    @Column(name="exit")
    private Boolean exit;
    @Column(name="sns_id")
    private String snsId;
    @Column(name="sns_type")
    private String snsType;
    @Column(name="personal_agreement_yn")
    private Character personalAgreement;

    @Builder
    public Member(String email, String password, Role role, String name, Boolean exit ,String snsId, String snsType, Character personalAgreement) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.name = name;
        this.exit = exit;
        this.snsId = snsId;
        this.snsType = snsType;
        this.personalAgreement = personalAgreement;
    }


    public void modifyPassword(String password) {
        this.password=password;
    }
    public void modifyName(String name) {
        this.name=name;
    }
    public void modifyExit(Boolean exit) {
        this.exit=exit;
    }
    public void modifySnsId(String snsId) {
        this.snsId=snsId;
    }
    public void modifySnsType(String snsType) {
        this.snsType=snsType;
    }
    public void modifyPersonalAgreement(Character personalAgreement) {
        this.personalAgreement=personalAgreement;
    }
}
