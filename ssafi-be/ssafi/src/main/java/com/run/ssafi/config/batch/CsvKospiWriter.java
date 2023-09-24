package com.run.ssafi.config.batch;

import com.run.ssafi.domain.Kospi;
import com.run.ssafi.stock.dto.KospiDto;
import com.run.ssafi.stock.repository.KospiRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.support.transaction.TransactionAwareProxyFactory;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class CsvKospiWriter implements ItemWriter<KospiDto> {

    List<KospiDto> output = TransactionAwareProxyFactory.createTransactionalList();

    private final KospiRepository kospiRepository;

    @Override
    public void write(Chunk<? extends KospiDto> items) {
        System.out.println(items);
        System.out.println("sadasdasd");
        List<? extends KospiDto> itemList = items.getItems();

        List<Kospi> kospiList = new ArrayList<>();

        System.out.println(itemList);

        items.forEach(getKospiDto -> {
            System.out.println(getKospiDto.toString());
            Kospi kospi = getKospiDto.toEntity();
            kospiList.add(kospi);
        });

        kospiRepository.saveAll(kospiList);
    }
}
