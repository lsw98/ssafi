package com.run.ssafi.portfolio.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.run.ssafi.domain.QKospi;
import com.run.ssafi.portfolio.vo.PortfolioVo;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

@Repository
public class PortfolioRepositoryImpl implements PortfolioCustomRepository{

    private final JPAQueryFactory queryFactory;

    public PortfolioRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public PortfolioVo findByType(String type) {
        PortfolioVo portfolioVo;

        if (type != null) {

            portfolioVo = queryFactory
                    .select(Projections.constructor(PortfolioVo.class,
                            QKospi.kospi.kospiName.as("recommendedStock")
                    ))
                    .from(QKospi.kospi)
                    .where(kospiTypeEq(type))
                    .orderBy(QKospi.kospi.kospiRank.asc())
                    .limit(1)
                    .fetchOne();


            return portfolioVo;
        }
        portfolioVo = queryFactory
                .select(Projections.constructor(PortfolioVo.class,
                        QKospi.kospi.kospiName.as("recommendedStock")
                ))
                .from(QKospi.kospi)
                .limit(1)
                .fetchOne();

        return portfolioVo;

    }

    private BooleanExpression kospiTypeEq(String type) {
        return QKospi.kospi.kospiType.eq(type);
    }
}
