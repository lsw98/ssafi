package com.run.ssafi.news.service;

import com.run.ssafi.domain.News;
import com.run.ssafi.message.custom_message.NewsResponseMessage;
import com.run.ssafi.news.dto.NewsListResponseDto;
import com.run.ssafi.news.repository.NewsRepository;
import com.run.ssafi.news.vo.NewsVo;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class NewsServiceImpl implements NewsService{

    private final NewsRepository newsRepository;

    @Override
    public NewsListResponseDto getNewsList(String category) {

        List<News> list = newsRepository.findAllByNewsCategory(category);
        List<NewsVo> newsVoList = new ArrayList<>();
        for (News news: list) {
            NewsVo newsVo = new NewsVo(
                    news.getNewsCategory(),
                    news.getNewsTitle(),
                    news.getNewsMidTitle(),
                    news.getNewsDate(),
                    news.getNewsWriter(),
                    news.getNewsContent());
            newsVoList.add(newsVo);
        }

        NewsListResponseDto newsListResponseDto = NewsListResponseDto.builder()
                .newsVoList(newsVoList)
                .message(NewsResponseMessage.NEWS_LIST_LOADING_SUCCESS.getMessage())
                .build();
        return newsListResponseDto;
    }
}
