package com.task4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class RecommendationEngineApplication {
    public static void main(String[] args) {
        SpringApplication.run(RecommendationEngineApplication.class, args);
    }
}