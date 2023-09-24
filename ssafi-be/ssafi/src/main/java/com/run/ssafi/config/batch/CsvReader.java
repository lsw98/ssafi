package com.run.ssafi.config.batch;

import com.run.ssafi.stock.dto.KospiDto;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
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

    protected static class KospiDtoFieldSetMapper implements FieldSetMapper<KospiDto> {
        public KospiDto mapFieldSet(FieldSet fieldSet) {
            KospiDto kospiDto = new KospiDto();

            kospiDto.setKospiCode(fieldSet.readString(0));
            kospiDto.setKospiCode(fieldSet.readString(1));

            return kospiDto;
        }
    }
    /**
     * 코스피 정보 파일 읽기
     */
    @Bean
    public FlatFileItemReader<KospiDto> csvKospiReader() throws IOException {
        /* 파일읽기 */
        FlatFileItemReader<KospiDto> flatFileItemReader = new FlatFileItemReader<>();


        ClassPathResource resource = new ClassPathResource("/csv/test.csv");
        System.out.println(resource.getFile());
        System.out.println(resource.getFilename().toString());
        System.out.println(resource.getPath());

        BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));
        while (br.ready()) System.out.println(br.readLine());

        flatFileItemReader.setEncoding("UTF-8"); //인코딩 설정

        flatFileItemReader.setResource(new ClassPathResource("/csv/test.csv")); //읽을 파일 경로 지정

        flatFileItemReader.setLinesToSkip(1); // header line skip


        /* defaultLineMapper: 읽으려는 데이터 LineMapper을 통해 Dto로 매핑 */
        DefaultLineMapper<KospiDto> defaultLineMapper = new DefaultLineMapper<>();

        defaultLineMapper.setLineTokenizer(new DelimitedLineTokenizer());
        defaultLineMapper.setFieldSetMapper(new KospiDtoFieldSetMapper());
        /* delimitedLineTokenizer : csv 파일에서 구분자 지정하고 구분한 데이터 setNames를 통해 각 이름 설정 */
//        DelimitedLineTokenizer delimitedLineTokenizer = new DelimitedLineTokenizer(); //csv 파일에서 구분자
//        delimitedLineTokenizer.setFieldSetMapper(new KospiDtoFieldSetMapper()); //행으로 읽은 데이터 매칭할 데이터 각 이름
//        defaultLineMapper.setLineTokenizer(delimitedLineTokenizer); //lineTokenizer 설정
//
//        /* beanWrapperFieldSetMapper: 매칭할 class 타입 지정 */
//        BeanWrapperFieldSetMapper<KospiDto> beanWrapperFieldSetMapper = new BeanWrapperFieldSetMapper<KospiDto>();
//        beanWrapperFieldSetMapper.setTargetType(KospiDto.class);
//
//        defaultLineMapper.setFieldSetMapper(beanWrapperFieldSetMapper); //fieldSetMapper 지정

        flatFileItemReader.setLineMapper(defaultLineMapper); //lineMapper 지정
        flatFileItemReader.open(new ExecutionContext());
        try {
            KospiDto kospiDto = flatFileItemReader.read();
            System.out.println(kospiDto.toString());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        try {
            System.out.println(flatFileItemReader.read());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return flatFileItemReader;

    }
}