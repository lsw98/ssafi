package com.run.ssafi.config.batch;

import com.run.ssafi.domain.Kospi;
import com.run.ssafi.stock.repository.KospiRepository;
import com.run.ssafi.stock.service.KospiProcessor;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.support.DefaultBatchConfiguration;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.RepositoryItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.step.builder.StepBuilder;

@Configuration
@RequiredArgsConstructor
public class FileReaderJobConfig {
    private final PlatformTransactionManager transactionManager;
    private final CsvReader csvReader; //추가
    private final KospiRepository kospiRepository;

    private static final int chunkSize = 200; //데이터 처리할 row size


    /**
     * 코스피 정보 저장 Job
     * Job은 여러 Step을 가질 수 있음
     */
    @Bean
    public Job csvKospiJob(JobRepository jobRepository) throws Exception {
        return new JobBuilder("Kospi", jobRepository)
                .start(csvKospiReaderStep(jobRepository))
                .build();
    }

    /**
     * csv 파일 읽고 DB에 쓰는 Step
     */
    @Bean
    public Step csvKospiReaderStep(JobRepository jobRepository) throws Exception {
        return new StepBuilder("csvKospiReaderStep", jobRepository)
                //<reader에 넘겨줄 타입, writer에 넙겨줄 타입>
                .<Kospi, Kospi>chunk(chunkSize, transactionManager)
                .reader(csvReader.csvKospiReader()) // csv 파일 읽고 넘겨줌
                .processor(itemProcessor())
                .writer(itemWriter()) // 받은 데이터 DB에 저장
                .taskExecutor(taskExecutor()) // 멀티 스레딩 용
//                .allowStartIfComplete(true)
                .build();
    }

    @Bean
    public KospiProcessor itemProcessor() {
        return new KospiProcessor();
    }

//    @Bean
//    public FlatFileItemReader<Kospi> itemReader() throws Exception {
//
//        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer(",");
////tokenizer된 순서대로 필드명을 지정한다.
//        lineTokenizer.setDelimiter(",");
//        lineTokenizer.setNames("id", "kospiCode", "kospiName");
//
//        BeanWrapperFieldSetMapper fieldSetMapper = new BeanWrapperFieldSetMapper();
//        fieldSetMapper.setTargetType(Kospi.class);//맵핑할 클래스
//        fieldSetMapper.setStrict(true);//필드 맵핑할 수 없는 필드가 존재할 경우 fail 처리
//
//        DefaultLineMapper defaultLineMapper = new DefaultLineMapper();
//        defaultLineMapper.setLineTokenizer(lineTokenizer);
//        defaultLineMapper.setFieldSetMapper(fieldSetMapper);
//
//        FlatFileItemReader<Kospi> flatFileItemReader = new FlatFileItemReaderBuilder()
//                .name("fileItemReader")
//                .resource(new ClassPathResource("csv/data.csv"))
//                .lineMapper(defaultLineMapper)
//                .linesToSkip(1)    //첫번째 라인은 header 이기 때문에 skip
//                .build();
//
//        flatFileItemReader.open(new ExecutionContext());
////
//        int cnt = 0;
////        while(cnt++<200)
//        List<Kospi> items = new ArrayList<>();
//        while(cnt++<chunkSize)
//            items.add(flatFileItemReader.read());
//
//        for (Kospi kospi : items) {
//            kospiRepository.save(kospi);
//        }
//        return flatFileItemReader;
//
//        return flatFileItemReader;

//        return new FlatFileItemReaderBuilder()
//                .name("fileItemReader")
//                .resource(new ClassPathResource("csv/data.csv"))
//                .lineMapper(defaultLineMapper)
//                .linesToSkip(1)    //첫번째 라인은 header 이기 때문에 skip
//                .build();

//        return new FlatFileItemReaderBuilder<Kospi>()
//                .name("CustomerItemReader")
//                .resource(new FileSystemResource("resources/csv/data.csv"))
//                .linesToSkip(1)
//                .delimited()
//                .names("id", "kospiCode", "kospiName")
//                .lineMapper(defaultLineMapper)
//                .fieldSetMapper(
//                        new BeanWrapperFieldSetMapper<Kospi>() {
//                            {
//                                setTargetType(Kospi.class);
//                            }
//                        })
//                .build();
//    }

//    @Bean
//    public ItemWriter<Kospi> itemWriter() {
//
//        return items -> {
//            for (Kospi item : items) {
//                System.out.println(item);
//            }
//        };
//    }

    @Bean
    public RepositoryItemWriter<Kospi> itemWriter() {

        RepositoryItemWriter<Kospi> writer = new RepositoryItemWriter<>();
        writer.setRepository(kospiRepository);
        writer.setMethodName("save");
        System.out.println(kospiRepository.findAll());
        return writer;
    }

    // For Multithreading
    @Bean
    public TaskExecutor taskExecutor() {
        SimpleAsyncTaskExecutor executor = new SimpleAsyncTaskExecutor();
        executor.setConcurrencyLimit(10);
        return executor;
    }
}