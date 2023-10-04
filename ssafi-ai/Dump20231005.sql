-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: ssafi
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kospi`
--

DROP TABLE IF EXISTS `kospi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kospi` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `kospi_code` varchar(255) NOT NULL,
  `kospi_name` varchar(255) NOT NULL,
  `kospi_rank` bigint DEFAULT NULL,
  `kospi_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Unique_kospi_name` (`kospi_name`),
  UNIQUE KEY `kospi_code` (`kospi_code`)
) ENGINE=InnoDB AUTO_INCREMENT=1601 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kospi`
--

LOCK TABLES `kospi` WRITE;
/*!40000 ALTER TABLE `kospi` DISABLE KEYS */;
INSERT INTO `kospi` VALUES (1,'005930','삼성전자',NULL,'safe'),(2,'373220','LG에너지솔루션',NULL,'safe'),(3,'000660','SK하이닉스',NULL,'risk'),(4,'207940','삼성바이오로직스',NULL,'safe'),(5,'005490','POSCO홀딩스',NULL,'risk'),(6,'005380','현대차',4,'safe'),(7,'006400','삼성SDI',NULL,'neutral'),(8,'051910','LG화학',NULL,'neutral'),(9,'035420','NAVER',NULL,'safe'),(10,'000270','기아',NULL,'neutral'),(11,'003670','포스코퓨처엠',NULL,'risk'),(12,'105560','KB금융',NULL,'safe'),(13,'012330','현대모비스',NULL,'safe'),(14,'068270','셀트리온',NULL,'safe'),(15,'028260','삼성물산',NULL,'safe'),(16,'035720','카카오',NULL,'neutral'),(17,'055550','신한지주',NULL,'neutral'),(18,'066570','LG전자',NULL,'neutral'),(19,'032830','삼성생명',NULL,'safe'),(20,'096770','SK이노베이션',NULL,'neutral'),(21,'047050','포스코인터내셔널',NULL,'risk'),(22,'003550','LG',NULL,'safe'),(23,'086790','하나금융지주',NULL,'neutral'),(24,'000810','삼성화재',NULL,'neutral'),(25,'033780','KT&G',NULL,'safe'),(26,'015760','한국전력',NULL,'safe'),(27,'323410','카카오뱅크',NULL,'safe'),(28,'138040','메리츠금융지주',NULL,'neutral'),(29,'329180','HD현대중공업',NULL,'risk'),(30,'034730','SK',NULL,'neutral'),(31,'017670','SK텔레콤',NULL,'safe'),(32,'034020','두산에너빌리티',NULL,'safe'),(33,'010130','고려아연',NULL,'safe'),(34,'018260','삼성에스디에스',NULL,'safe'),(35,'009150','삼성전기',NULL,'safe'),(36,'316140','우리금융지주',NULL,'safe'),(37,'352820','하이브',NULL,'risk'),(38,'024110','기업은행',NULL,'safe'),(39,'010950','S-Oil',NULL,'neutral'),(40,'030200','KT',NULL,'safe'),(41,'011200','HMM',NULL,'neutral'),(42,'009540','HD한국조선해양',NULL,'risk'),(43,'003490','대한항공',NULL,'safe'),(44,'001570','금양',NULL,'risk'),(45,'010140','삼성중공업',NULL,'risk'),(46,'259960','크래프톤',NULL,'neutral'),(47,'090430','아모레퍼시픽',NULL,'risk'),(48,'051900','LG생활건강',NULL,'risk'),(49,'086280','현대글로비스',NULL,'safe'),(50,'326030','SK바이오팜',NULL,'risk'),(51,'005830','DB손해보험',NULL,'neutral'),(52,'042660','한화오션',NULL,'risk'),(53,'028050','삼성엔지니어링',NULL,'risk'),(54,'011170','롯데케미칼',NULL,'neutral'),(55,'402340','SK스퀘어',NULL,'neutral'),(56,'011070','LG이노텍',NULL,'safe'),(57,'377300','카카오페이',NULL,'risk'),(58,'000100','유한양행',NULL,'risk'),(59,'241560','두산밥캣',NULL,'risk'),(60,'012450','한화에어로스페이스',NULL,'risk'),(61,'361610','SK아이이테크놀로지',NULL,'risk'),(62,'004020','현대제철',NULL,'safe'),(63,'302440','SK바이오사이언스',NULL,'safe'),(64,'009830','한화솔루션',NULL,'risk'),(65,'267250','HD현대',NULL,'safe'),(66,'036570','엔씨소프트',NULL,'risk'),(67,'161390','한국타이어앤테크놀로지',3,'safe'),(68,'271560','오리온',NULL,'safe'),(69,'018880','한온시스템',1,'safe'),(70,'034220','LG디스플레이',NULL,'neutral'),(71,'047810','한국항공우주',NULL,'neutral'),(72,'032640','LG유플러스',NULL,'safe'),(73,'097950','CJ제일제당',NULL,'safe'),(74,'383220','F&F',NULL,'risk'),(75,'006800','미래에셋증권',NULL,'safe'),(76,'000720','현대건설',NULL,'safe'),(77,'011780','금호석유',NULL,'neutral'),(78,'251270','넷마블',NULL,'risk'),(79,'128940','한미약품',NULL,'neutral'),(80,'078930','GS',NULL,'safe'),(81,'029780','삼성카드',NULL,'safe'),(82,'005940','NH투자증권',NULL,'safe'),(83,'010620','현대미포조선',NULL,'neutral'),(84,'008770','호텔신라',NULL,'safe'),(85,'006260','LS',NULL,'risk'),(86,'035250','강원랜드',NULL,'risk'),(87,'016360','삼성증권',NULL,'safe'),(88,'071050','한국금융지주',NULL,'neutral'),(89,'021240','코웨이',NULL,'neutral'),(90,'064350','현대로템',NULL,'risk'),(91,'001450','현대해상',NULL,'neutral'),(92,'010120','LS ELECTRIC',NULL,'risk'),(93,'011790','SKC',NULL,'neutral'),(94,'003410','쌍용C&E',NULL,'safe'),(95,'004990','롯데지주',NULL,'neutral'),(96,'001040','CJ',NULL,'risk'),(97,'004370','농심',NULL,'neutral'),(98,'028670','팬오션',1,'risk'),(99,'088350','한화생명',NULL,'neutral'),(100,'180640','한진칼',NULL,'safe'),(101,'002790','아모레G',NULL,'risk'),(102,'007070','GS리테일',NULL,'neutral'),(103,'282330','BGF리테일',NULL,'neutral'),(104,'052690','한전기술',NULL,'neutral'),(105,'081660','휠라홀딩스',NULL,'safe'),(106,'039490','키움증권',NULL,'safe'),(107,'000990','DB하이텍',NULL,'risk'),(108,'002380','KCC',NULL,'neutral'),(109,'008930','한미사이언스',NULL,'risk'),(110,'012750','에스원',NULL,'safe'),(111,'030000','제일기획',2,'safe'),(112,'272210','한화시스템',NULL,'neutral'),(113,'042670','HD현대인프라코어',NULL,'risk'),(114,'111770','영원무역',NULL,'risk'),(115,'112610','씨에스윈드',NULL,'risk'),(116,'138930','BNK금융지주',NULL,'safe'),(117,'036460','한국가스공사',NULL,'neutral'),(118,'004170','신세계',NULL,'safe'),(119,'175330','JB금융지주',NULL,'neutral'),(120,'023530','롯데쇼핑',NULL,'neutral'),(121,'000120','CJ대한통운',NULL,'safe'),(122,'000150','두산',NULL,'risk'),(123,'000880','한화',NULL,'neutral'),(124,'014680','한솔케미칼',NULL,'neutral'),(125,'298050','효성첨단소재',NULL,'neutral'),(126,'079550','LIG넥스원',0,'safe'),(127,'139480','이마트',NULL,'risk'),(128,'204320','HL만도',NULL,'neutral'),(129,'020150','롯데에너지머티리얼즈',NULL,'risk'),(130,'017800','현대엘리베이',3,'risk'),(131,'047040','대우건설',NULL,'safe'),(132,'026960','동서',NULL,'safe'),(133,'001440','대한전선',NULL,'neutral'),(134,'001740','SK네트웍스',NULL,'risk'),(135,'004000','롯데정밀화학',NULL,'safe'),(136,'005850','에스엘',NULL,'risk'),(137,'298020','효성티앤씨',NULL,'neutral'),(138,'011210','현대위아',NULL,'neutral'),(139,'051600','한전KPS',NULL,'safe'),(140,'069960','현대백화점',NULL,'neutral'),(141,'010060','OCI홀딩스',2,'risk'),(142,'000080','하이트진로',NULL,'neutral'),(143,'003230','삼양식품',NULL,'risk'),(144,'004800','효성',NULL,'safe'),(145,'005420','코스모화학',NULL,'risk'),(146,'007310','오뚜기',NULL,'neutral'),(147,'336260','두산퓨얼셀',NULL,'risk'),(148,'009420','한올바이오파마',0,'risk'),(149,'137310','에스디바이오센서',NULL,'risk'),(150,'139130','DGB금융지주',NULL,'safe'),(151,'192820','코스맥스',NULL,'risk'),(152,'009240','한샘',NULL,'neutral'),(153,'001120','LX인터내셔널',NULL,'neutral'),(154,'005300','롯데칠성',NULL,'risk'),(155,'006280','녹십자',NULL,'safe'),(156,'006360','GS건설',NULL,'risk'),(157,'375500','DL이앤씨',NULL,'safe'),(158,'073240','금호타이어',5,'risk'),(159,'120110','코오롱인더',NULL,'neutral'),(160,'161890','한국콜마',NULL,'risk'),(161,'185750','종근당',NULL,'safe'),(162,'069620','대웅제약',4,'risk'),(163,'000240','한국앤컴퍼니',NULL,'neutral'),(164,'000670','영풍',NULL,'safe'),(165,'009900','명신산업',NULL,'risk'),(166,'010780','아이에스동서',NULL,'risk'),(167,'285130','SK케미칼',NULL,'neutral'),(168,'093370','후성',NULL,'neutral'),(169,'103140','풍산',NULL,'neutral'),(170,'114090','GKL',NULL,'risk'),(171,'280360','롯데웰푸드',NULL,'safe'),(172,'032350','롯데관광개발',NULL,'risk'),(173,'000210','DL',NULL,'risk'),(174,'001800','오리온홀딩스',NULL,'safe'),(175,'003090','대웅',NULL,'risk'),(176,'004490','세방전지',NULL,'neutral'),(177,'006650','대한유화',NULL,'risk'),(178,'014820','동원시스템즈',NULL,'neutral'),(179,'300720','한일시멘트',NULL,'safe'),(180,'019170','신풍제약',NULL,'neutral'),(181,'020560','아시아나항공',NULL,'neutral'),(182,'069260','TKG휴켐스',NULL,'safe'),(183,'105630','한세실업',NULL,'neutral'),(184,'271940','일진하이솔루스',NULL,'neutral'),(185,'016380','KG스틸',NULL,'risk'),(186,'001680','대상',NULL,'safe'),(187,'003240','태광산업',NULL,'neutral'),(188,'003850','보령',NULL,'safe'),(189,'005250','녹십자홀딩스',NULL,'neutral'),(190,'294870','HDC현대산업개발',NULL,'neutral'),(191,'031430','신세계인터내셔날',NULL,'risk'),(192,'039130','하나투어',NULL,'neutral'),(193,'178920','PI첨단소재',NULL,'neutral'),(194,'192080','더블유게임즈',NULL,'safe'),(195,'008730','율촌화학',NULL,'risk'),(196,'013890','지누스',NULL,'risk'),(197,'020000','한섬',NULL,'risk'),(198,'381970','케이카',NULL,'neutral'),(199,'284740','쿠쿠홈시스',NULL,'risk'),(200,'057050','현대홈쇼핑',NULL,'neutral');
/*!40000 ALTER TABLE `kospi` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-05  2:16:33
