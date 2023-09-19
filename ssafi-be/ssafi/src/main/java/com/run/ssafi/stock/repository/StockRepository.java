package com.run.ssafi.stock.repository;


import com.run.ssafi.domain.Member;
import java.sql.SQLException;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Member, Long>, StockCustomRepository {

    Optional<Member> findById(Long id);

}
