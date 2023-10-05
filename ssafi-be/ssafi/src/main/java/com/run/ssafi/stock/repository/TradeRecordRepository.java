package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.Member;
import com.run.ssafi.domain.TradeRecord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeRecordRepository extends JpaRepository<TradeRecord, Long>, TradeRecordCustomRepository {

    List<TradeRecord> findAllByMember(Member member);
}
