# 크롤링 한 뉴스 정보 객체 (DB와 일치)
class News():
    def __init__(self, category, title, midtitle, date, writer, content, image):
        self.category = category
        self.title = title
        self.midtitle = midtitle
        self.date = date
        self.writer = writer
        self.content = content
        self.image = image
