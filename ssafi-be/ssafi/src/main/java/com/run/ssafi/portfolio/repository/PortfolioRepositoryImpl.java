package com.run.ssafi.portfolio.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.run.ssafi.domain.QPortfolio;
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
                            QPortfolio.portfolio.kospi.kospiName.as("recommendedStock")
                    ))
                    .from(QPortfolio.portfolio)
                    .where(portfolioPortTypeEq(type))
                    .limit(1)
                    .fetchOne();

            return portfolioVo;
        }
        portfolioVo = queryFactory
                .select(Projections.constructor(PortfolioVo.class,
                        QPortfolio.portfolio.kospi.kospiName.as("recommendedStock")
                ))
                .from(QPortfolio.portfolio)
                .limit(1)
                .fetchOne();

        return portfolioVo;

    }

    private BooleanExpression portfolioPortTypeEq(String portType) {
        return QPortfolio.portfolio.portType.eq(portType);
    }
}
