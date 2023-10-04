package com.run.ssafi.portfolio.repository;

import com.run.ssafi.domain.Portfolio;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long>, PortfolioCustomRepository {
    List<Portfolio> findAllByPortType(String portType);
}
