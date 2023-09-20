package com.run.ssafi.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "AiTrade")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table(name = "AITRADE")
public class AiTrade {

    @Id
    @Column(name = "user_id")
    private Long id;
    @Column(name = "ai_budget")
    private Long aiBudget;
    @Column(name = "ai_goal")
    private Long aiGoal;
    @Column(name = "risk_ratio")
    private Double riskRatio;
    @Column(name = "neutral_ratio")
    private Double neutralRatio;
    @Column(name = "safety_ratio")
    private Double safetyRatio;

    @OneToOne
    @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id")
    private Member member;

    public void modifyAiBudget(Long aiBudget){
        this.aiBudget = aiBudget;
    }
    public void modifyAiGoal(Long aiGoal){
        this.aiGoal = aiGoal;
    }
    public void modifyRiskRatio(Double riskRatio){
        this.riskRatio = riskRatio;
    }
    public void modifyNeutralRatio(Double neutralRatio){
        this.neutralRatio = neutralRatio;
    }
    public void modifySafetyRatio(Double safetyRatio){
        this.safetyRatio = safetyRatio;
    }
}
