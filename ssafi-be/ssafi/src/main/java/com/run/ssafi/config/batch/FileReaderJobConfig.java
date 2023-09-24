package com.run.ssafi.config.batch;

import com.run.ssafi.domain.Kospi;
import com.run.ssafi.stock.dto.KospiDto;
import com.run.ssafi.stock.repository.KospiRepository;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.step.builder.StepBuilder;

@Configuration
@RequiredArgsConstructor
public class FileReaderJobConfig extends DefaultBatchConfiguration {
    private final PlatformTransactionManager transactionManager;
    private final CsvReader csvReader; //추가
    private final CsvKospiWriter csvKospiWriter; //추가
    private final KospiRepository kospiRepository;

    private static final int chunkSize = 200; //데이터 처리할 row size


    /**
     * 코스피 정보 저장 Job
     * Job은 여러 Step을 가질 수 있음
     */
    @Bean
    public Job csvKospiJob(JobRepository jobRepository) throws IOException {
        return new JobBuilder("Kospi", jobRepository)
                .start(csvKospiReaderStep(jobRepository))
                .build();
    }

    /**
     * csv 파일 읽고 DB에 쓰는 Step
     */
    @Bean
    public Step csvKospiReaderStep(JobRepository jobRepository) throws IOException {
        return new StepBuilder("csvKospiReaderStep", jobRepository)
                //<reader에 넘겨줄 타입, writer에 넙겨줄 타입>
                .<KospiDto, KospiDto>chunk(chunkSize, transactionManager)
                .reader(csvReader.csvKospiReader()) // csv 파일 읽고 넘겨줌
                .writer(csvKospiWriter) // 받은 데이터 DB에 저장
//                .taskExecutor(taskExecutor())
                .allowStartIfComplete(true)
                .build();
    }
    @Bean
    public ItemWriter<KospiDto> itemWriter() {
        System.out.println("asdasdasd");

        return kospiList -> {
            for (KospiDto kospiDto : kospiList) {
                Kospi kospi = kospiDto.toEntity();
                kospiRepository.save(kospi);
            }
        };
    }
//
//    @Override
//    protected Charset getCharset() {
//        return StandardCharsets.ISO_8859_1;
//    }
//    @Bean
//    public TaskExecutor taskExecutor() {
//        return new SimpleAsyncTaskExecutor(); // 병렬 실행을 위한 TaskExecutor 구현 선택
//    }


//    @Bean
//    public FlatFileItemReader<String> reader(@Value("${inputFile}") Resource resource) {
//        System.out.println(resource.toString());
//
//        return new FlatFileItemReaderBuilder<String>()
//                .name("csvItemReader")
//                .resource(resource)
//                .lineMapper((line, lineNumber) -> {
//                    System.out.println(line);
//                    String[] fields = line.split(","); // CSV 파일의 구분자에 따라 변경
//                    System.out.println(fields.toString());
//                    // CSV 파일의 각 필드를 String으로 읽어옵니다.
//                    return Arrays.toString(fields);
//                })
//                .build();
//    }
}