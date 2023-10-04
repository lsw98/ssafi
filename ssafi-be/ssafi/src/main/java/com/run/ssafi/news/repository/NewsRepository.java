package com.run.ssafi.news.repository;

import com.run.ssafi.domain.News;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findAllByNewsCategory(String category);
}
