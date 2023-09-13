package com.run.ssafi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableFeignClients
@ImportAutoConfiguration({FeignAutoConfiguration.class})
@EnableJpaAuditing // JPA Auditing 활성화
@EnableAsync
@SpringBootApplication
public class SsafiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsafiApplication.class, args);
	}

}
