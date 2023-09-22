package com.run.ssafi.stock.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

@Repository
public class StockRepositoryImpl implements StockCustomRepository {

    private final JPAQueryFactory queryFactory;

    public StockRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }
}
