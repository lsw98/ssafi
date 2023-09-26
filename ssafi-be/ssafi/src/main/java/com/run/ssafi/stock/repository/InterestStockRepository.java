package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.InterestStock;
import com.run.ssafi.domain.Kospi;
import com.run.ssafi.domain.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterestStockRepository extends JpaRepository<InterestStock, Long>, InterestStockCustomRepository {
    InterestStock findByKospi(Kospi kospi);
}
