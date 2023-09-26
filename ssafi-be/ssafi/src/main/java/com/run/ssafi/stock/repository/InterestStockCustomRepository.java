package com.run.ssafi.stock.repository;

import com.run.ssafi.domain.Member;
import com.run.ssafi.stock.vo.InterestStockVo;
import java.util.List;

public interface InterestStockCustomRepository {

    List<InterestStockVo> findByMember(Member member);

}
