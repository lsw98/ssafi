package com.run.ssafi.stock.service;

import com.run.ssafi.domain.Kospi;
import org.springframework.batch.item.ItemProcessor;

public class KospiProcessor implements ItemProcessor<Kospi, Kospi> {

    @Override
    public Kospi process(Kospi kospi) {
        System.out.println(kospi.toString());

        return kospi;
    }
}