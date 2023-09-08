from bs4 import BeautifulSoup
import requests

def ranking_news_crawler(url):  
    response = requests.get(url)
    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        popular_news = soup.select('.popular_top_list')[0].select('.popular_top_node')
        newsUrls = []
        for news in popular_news:
            # 회원용 기사면 크롤링 하지 않음
            selected_elements = news.select('.is_blind') 
            if selected_elements:
                continue
            else:
                if(news.select('.news_item')):
                    newsUrls.append(news.select('.news_item')[0].attrs['href'])
    else:
        print(response.status_code)
    
    for newsUrl in newsUrls:
        print('\n')
        print('기사 주소 : ', newsUrl)
        response = requests.get(newsUrl)
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        
        title = soup.select('.news_detail_head_group')[0].select('.news_ttl')[0].text
        print('제목 : ', title)
        
        name = soup.select('.author')[0].select('.name')[0].text
        print(name)

        email = soup.select('.author')[0].select('.email')[0].text
        print(email)            
                    
        time = soup.select('.time_area')[0].select('.registration')[0].get_text()
        print(time)
        
        # 소제목 있으면 가져오기
        if(soup.select('.midtitle_text')):                
            midtitle = soup.select('.midtitle_text')[0].text
            print('부제 : ', midtitle, '\n')
            
        type = soup.select('.news_cnt_detail_wrap')[0].select('p')
        if(len(type)):
            # 기사 내용이 p태그로 구분된 형식일 때
            content = soup.select('.news_cnt_detail_wrap')[0].find_all()
            for con in content: 
                if(con.name == 'p'):
                    print(con.text)
                else:
                    if(con.get('class') and con.get('class')[0] == 'thumb_area'):
                        image = con.find('img').get('data-src')
                        print(image)
                # elif (len(con.select('.thumb_area'))):
                #     print(con.select('.thumb_area')[0].select('img')[0].attrs['data-src'])
            # # 기사 내용 추출
            # for con in content:
            #     print(con.text)
                
            # # 이미지 추출
            # images = soup.select('.news_cnt_detail_wrap')[0].select('img')
            # for image in images:
            #     print(image.attrs['data-src'])
        else:
            # 기사 내용이 p태그로 구분되지 않은 형식일 때 -> 이미지 1개 밖에 없는듯
            content = soup.select('.news_cnt_detail_wrap')[0]
            
            # 이미지 추출
            images = content.select('img')
        
            # 기사 내용 추출    
            for ele in content.find_all():
                ele.extract()
            content_text = content.get_text()
            print(content_text)
            
            for image in images:
                print(image.attrs['data-src'])
                
ranking_news_crawler('https://www.mk.co.kr/news/ranking/stock/')