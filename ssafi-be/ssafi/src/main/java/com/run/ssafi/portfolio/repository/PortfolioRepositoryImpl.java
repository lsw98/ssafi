package com.run.ssafi.portfolio.repository;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.Portfolio;
import com.run.ssafi.domain.QInterestStock;
import com.run.ssafi.domain.QKospi;
import com.run.ssafi.domain.QMember;
import com.run.ssafi.domain.QPortfolio;
import com.run.ssafi.domain.QScore;
import com.run.ssafi.portfolio.vo.PortfolioVo;
import com.run.ssafi.stock.vo.InterestStockVo;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class PortfolioRepositoryImpl implements PortfolioCustomRepository{

    private final JPAQueryFactory queryFactory;

    public PortfolioRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public PortfolioVo findByMemberAndPortType(Member member, String portType) {
//        PortfolioVo portfolioVo = queryFactory
//                .select(Projections.constructor(PortfolioVo.class,
//                        QPortfolio.portfolio.portType.as("type"),
//                        QPortfolio.portfolio.kospi.kospiName.as("recommendedStock"),
//                        QScore.score.aiScore,
//                        QScore.score.pbScore,
//                        QScore.score.mwScore,
//                        QScore.score.lcScore
//                ))
//                .from(QPortfolio.portfolio)
//                .innerJoin(QMember.member)
//                .on(QMember.member.type.eq(QPortfolio.portfolio.portType))
//                .where(portfolioPortTypeEq(portType))
//                .orderBy(QKospi.kospi.kospiRank);
//
//        return portfolioVo;
        return null;
    }

    private BooleanExpression portfolioPortTypeEq(String portType) {
        return QPortfolio.portfolio.portType.eq(portType);
    }
}
