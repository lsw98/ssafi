from selenium import webdriver
from selenium.webdriver import ActionChains
 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
 
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup
import requests

def news_category_crawler(url):
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")

    driver = webdriver.Chrome('chromedriver', options = options)

    driver.get(url)    
    driver.implicitly_wait(time_to_wait=1000)
    for _ in range (0, 5):
        driver.find_element_by_xpath('//*[@id="container"]/section/div[2]/div/div/div[1]/section/div/div/div/button').click()
        time.sleep(0.5)
        
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    latestNews = soup.select('.latest_news_sec')
    news = latestNews[0].select('.news_node')
    newsUrls = []
    for new in news:
        # 회원용 기사면 크롤링 하지 않음
        selected_elements = new.select('.is_blind') 
        if selected_elements:
            continue
        else:
            if(new.select('.news_item')):
                newsUrls.append(new.select('.news_item')[0].attrs['href'])
        
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

   
        
# 증권정책
# news_category_crawler('https://www.mk.co.kr/news/stock/stock-policy/')

# 시황
# news_category_crawler('https://www.mk.co.kr/news/stock/conditions/')

# 공시
# news_category_crawler('https://www.mk.co.kr/news/stock/public-announcement/')

# 기업정보
# news_category_crawler('https://www.mk.co.kr/news/stock/business-information/')

# 증시지표
news_category_crawler('https://www.mk.co.kr/news/stock/market-index/')