package com.run.ssafi.config.batch;

import com.run.ssafi.domain.Kospi;
import com.run.ssafi.stock.repository.KospiRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.batch.item.file.transform.FieldSet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

/**
 * class.csv 파일 읽기
 */
@Configuration
@RequiredArgsConstructor
public class CsvReader {

    private final KospiRepository kospiRepository;

    protected class KospiDtoFieldSetMapper implements FieldSetMapper<Kospi> {
        public Kospi mapFieldSet(FieldSet fieldSet) {
            Kospi kospi = new Kospi();
            kospi.setId(Long.valueOf(fieldSet.readString(0)));
            kospi.setKospiCode(fieldSet.readString(1));
            kospi.setKospiName(fieldSet.readString(2));

            return kospi;
        }
    }
    /**
     * 코스피 정보 파일 읽기
     */
    @Bean
    public FlatFileItemReader<Kospi> csvKospiReader() throws IOException {
        /* 파일읽기 */
        FlatFileItemReader<Kospi> flatFileItemReader = new FlatFileItemReader<>();

//        ClassPathResource resource = new ClassPathResource("/csv/data.csv");
//        System.out.println(resource.getFile());
//        System.out.println(resource.getFilename().toString());
//        System.out.println(resource.getPath());
//
//        BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));
//        while (br.ready()) System.out.println(br.readLine());

        flatFileItemReader.setResource(new ClassPathResource("/csv/data.csv")); //읽을 파일 경로 지정

        flatFileItemReader.setEncoding("UTF-8"); //인코딩 설정
//
        flatFileItemReader.setLinesToSkip(1); // header line skip


        /* defaultLineMapper: 읽으려는 데이터 LineMapper을 통해 Dto로 매핑 */
        DefaultLineMapper<Kospi> defaultLineMapper = new DefaultLineMapper<>();

        /* delimitedLineTokenizer : csv 파일에서 구분자 지정하고 구분한 데이터 setNames를 통해 각 이름 설정 */
        defaultLineMapper.setLineTokenizer(new DelimitedLineTokenizer()); //csv 파일에서 구분자
        defaultLineMapper.setFieldSetMapper(new KospiDtoFieldSetMapper()); //행으로 읽은 데이터 매칭할 데이터 각 이름
//        DelimitedLineTokenizer delimitedLineTokenizer = new DelimitedLineTokenizer();
//        delimitedLineTokenizer.setFieldSetMapper(new KospiDtoFieldSetMapper());
//        defaultLineMapper.setLineTokenizer(delimitedLineTokenizer); //lineTokenizer 설정
//
//        /* beanWrapperFieldSetMapper: 매칭할 class 타입 지정 */
//        BeanWrapperFieldSetMapper<Kospi> beanWrapperFieldSetMapper = new BeanWrapperFieldSetMapper<Kospi>();
//        beanWrapperFieldSetMapper.setTargetType(Kospi.class);
//
//        defaultLineMapper.setFieldSetMapper(beanWrapperFieldSetMapper); //fieldSetMapper 지정

        flatFileItemReader.setLineMapper(defaultLineMapper); //lineMapper 지정
        flatFileItemReader.open(new ExecutionContext());

        int cnt = 0;
        while(cnt++<BatchProperties.chunkSize) {
            try {
                Kospi kospi = flatFileItemReader.read();
                kospiRepository.save(kospi);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return flatFileItemReader;


//        try {
//            Kospi kospi = flatFileItemReader.read();
//            System.out.println(kospi.toString());
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//
//        try {
//            System.out.println(flatFileItemReader.read());
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//        return flatFileItemReader;

    }
}