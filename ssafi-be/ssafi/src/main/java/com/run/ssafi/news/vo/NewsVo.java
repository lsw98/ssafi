package com.run.ssafi.news.vo;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NewsVo {
    private String newsCategory;
    private String newsTitle;
    private String newsMidTitle;
    private LocalDateTime newsDate;
    private String newsWriter;
    private String newsContent;
}
