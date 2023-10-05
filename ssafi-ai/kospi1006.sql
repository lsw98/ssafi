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
) ENGINE=InnoDB AUTO_INCREMENT=4927 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kospi`
--

LOCK TABLES `kospi` WRITE;
/*!40000 ALTER TABLE `kospi` DISABLE KEYS */;
INSERT INTO `kospi` VALUES (4527,'047050','포스코인터내셔널',NULL,'risk'),(4528,'001570','금양',NULL,'risk'),(4529,'137310','에스디바이오센서',NULL,'risk'),(4530,'005420','코스모화학',NULL,'risk'),(4531,'003670','포스코퓨처엠',NULL,'risk'),(4532,'042660','한화오션',11,'risk'),(4533,'010120','LS ELECTRIC',NULL,'risk'),(4534,'005490','POSCO홀딩스',NULL,'risk'),(4535,'192820','코스맥스',NULL,'risk'),(4536,'036570','엔씨소프트',NULL,'risk'),(4537,'003230','삼양식품',4,'risk'),(4538,'010140','삼성중공업',NULL,'risk'),(4539,'009540','HD한국조선해양',NULL,'risk'),(4540,'001740','SK네트웍스',NULL,'risk'),(4541,'241560','두산밥캣',NULL,'risk'),(4542,'006360','GS건설',NULL,'risk'),(4543,'051900','LG생활건강',NULL,'risk'),(4544,'017800','현대엘리베이',5,'risk'),(4545,'006260','LS',7,'risk'),(4546,'073240','금호타이어',9,'risk'),(4547,'009830','한화솔루션',NULL,'risk'),(4548,'352820','하이브',NULL,'risk'),(4549,'009420','한올바이오파마',0,'risk'),(4550,'042670','HD현대인프라코어',NULL,'risk'),(4551,'000210','DL',10,'risk'),(4552,'139480','이마트',NULL,'risk'),(4553,'012450','한화에어로스페이스',NULL,'risk'),(4554,'361610','SK아이이테크놀로지',NULL,'risk'),(4555,'010060','OCI홀딩스',2,'risk'),(4556,'000990','DB하이텍',NULL,'risk'),(4557,'003090','대웅',3,'risk'),(4558,'002790','아모레G',NULL,'risk'),(4559,'001040','CJ',NULL,'risk'),(4560,'251270','넷마블',NULL,'risk'),(4561,'005850','에스엘',NULL,'risk'),(4562,'000660','SK하이닉스',NULL,'risk'),(4563,'013890','지누스',NULL,'risk'),(4564,'032350','롯데관광개발',NULL,'risk'),(4565,'069620','대웅제약',8,'risk'),(4566,'000100','유한양행',6,'risk'),(4567,'008730','율촌화학',NULL,'risk'),(4568,'031430','신세계인터내셔날',NULL,'risk'),(4569,'336260','두산퓨얼셀',NULL,'risk'),(4570,'035250','강원랜드',NULL,'risk'),(4571,'377300','카카오페이',NULL,'risk'),(4572,'111770','영원무역',12,'risk'),(4573,'020150','롯데에너지머티리얼즈',NULL,'risk'),(4574,'090430','아모레퍼시픽',NULL,'risk'),(4575,'064350','현대로템',NULL,'risk'),(4576,'010780','아이에스동서',NULL,'risk'),(4577,'326030','SK바이오팜',NULL,'risk'),(4578,'383220','F&F',NULL,'risk'),(4579,'006650','대한유화',NULL,'risk'),(4580,'161890','한국콜마',NULL,'risk'),(4581,'020000','한섬',NULL,'risk'),(4582,'114090','GKL',NULL,'risk'),(4583,'008930','한미사이언스',NULL,'risk'),(4584,'284740','쿠쿠홈시스',NULL,'risk'),(4585,'112610','씨에스윈드',NULL,'risk'),(4586,'016380','KG스틸',NULL,'risk'),(4587,'329180','HD현대중공업',NULL,'risk'),(4588,'000150','두산',NULL,'risk'),(4589,'028050','삼성엔지니어링',NULL,'risk'),(4590,'028670','팬오션',1,'risk'),(4591,'005300','롯데칠성',NULL,'risk'),(4592,'009900','명신산업',NULL,'risk'),(4593,'271940','일진하이솔루스',NULL,'neutral'),(4594,'014820','동원시스템즈',NULL,'neutral'),(4595,'023530','롯데쇼핑',NULL,'neutral'),(4596,'011170','롯데케미칼',NULL,'neutral'),(4597,'014680','한솔케미칼',NULL,'neutral'),(4598,'035720','카카오',NULL,'neutral'),(4599,'036460','한국가스공사',NULL,'neutral'),(4600,'069960','현대백화점',NULL,'neutral'),(4601,'021240','코웨이',NULL,'neutral'),(4602,'020560','아시아나항공',NULL,'neutral'),(4603,'010620','현대미포조선',NULL,'neutral'),(4604,'298020','효성티앤씨',NULL,'neutral'),(4605,'034730','SK',NULL,'neutral'),(4606,'105630','한세실업',NULL,'neutral'),(4607,'007070','GS리테일',13,'neutral'),(4608,'093370','후성',NULL,'neutral'),(4609,'039130','하나투어',16,'neutral'),(4610,'009240','한샘',15,'neutral'),(4611,'051910','LG화학',NULL,'neutral'),(4612,'004370','농심',1,'neutral'),(4613,'019170','신풍제약',NULL,'neutral'),(4614,'285130','SK케미칼',2,'neutral'),(4615,'138040','메리츠금융지주',8,'neutral'),(4616,'178920','PI첨단소재',NULL,'neutral'),(4617,'007310','오뚜기',NULL,'neutral'),(4618,'003240','태광산업',NULL,'neutral'),(4619,'011200','HMM',14,'neutral'),(4620,'004490','세방전지',NULL,'neutral'),(4621,'006400','삼성SDI',NULL,'neutral'),(4622,'402340','SK스퀘어',5,'neutral'),(4623,'272210','한화시스템',NULL,'neutral'),(4624,'381970','케이카',NULL,'neutral'),(4625,'000080','하이트진로',NULL,'neutral'),(4626,'005830','DB손해보험',10,'neutral'),(4627,'103140','풍산',NULL,'neutral'),(4628,'004990','롯데지주',NULL,'neutral'),(4629,'066570','LG전자',NULL,'neutral'),(4630,'259960','크래프톤',NULL,'neutral'),(4631,'011790','SKC',NULL,'neutral'),(4632,'000810','삼성화재',7,'neutral'),(4633,'000270','기아',3,'neutral'),(4634,'096770','SK이노베이션',NULL,'neutral'),(4635,'057050','현대홈쇼핑',NULL,'neutral'),(4636,'086790','하나금융지주',6,'neutral'),(4637,'001120','LX인터내셔널',NULL,'neutral'),(4638,'000880','한화',NULL,'neutral'),(4639,'001440','대한전선',NULL,'neutral'),(4640,'128940','한미약품',NULL,'neutral'),(4641,'034220','LG디스플레이',NULL,'neutral'),(4642,'120110','코오롱인더',17,'neutral'),(4643,'011780','금호석유',9,'neutral'),(4644,'298050','효성첨단소재',NULL,'neutral'),(4645,'282330','BGF리테일',NULL,'neutral'),(4646,'294870','HDC현대산업개발',NULL,'neutral'),(4647,'005250','녹십자홀딩스',NULL,'neutral'),(4648,'001450','현대해상',11,'neutral'),(4649,'088350','한화생명',NULL,'neutral'),(4650,'052690','한전기술',NULL,'neutral'),(4651,'000240','한국앤컴퍼니',NULL,'neutral'),(4652,'175330','JB금융지주',NULL,'neutral'),(4653,'002380','KCC',12,'neutral'),(4654,'010950','S-Oil',NULL,'neutral'),(4655,'011210','현대위아',0,'neutral'),(4656,'047810','한국항공우주',NULL,'neutral'),(4657,'204320','HL만도',4,'neutral'),(4658,'071050','한국금융지주',NULL,'neutral'),(4659,'373220','LG에너지솔루션',NULL,'neutral'),(4660,'055550','신한지주',NULL,'safe'),(4661,'005380','현대차',11,'safe'),(4662,'375500','DL이앤씨',NULL,'safe'),(4663,'097950','CJ제일제당',12,'safe'),(4664,'011070','LG이노텍',25,'safe'),(4665,'086280','현대글로비스',3,'safe'),(4666,'180640','한진칼',NULL,'safe'),(4667,'004170','신세계',NULL,'safe'),(4668,'105560','KB금융',22,'safe'),(4669,'001680','대상',8,'safe'),(4670,'003850','보령',NULL,'safe'),(4671,'069260','TKG휴켐스',NULL,'safe'),(4672,'010130','고려아연',NULL,'safe'),(4673,'323410','카카오뱅크',NULL,'safe'),(4674,'280360','롯데웰푸드',NULL,'safe'),(4675,'161390','한국타이어앤테크놀로지',26,'safe'),(4676,'068270','셀트리온',NULL,'safe'),(4677,'004000','롯데정밀화학',24,'safe'),(4678,'005930','삼성전자',NULL,'safe'),(4679,'008770','호텔신라',NULL,'safe'),(4680,'000670','영풍',NULL,'safe'),(4681,'192080','더블유게임즈',NULL,'safe'),(4682,'018260','삼성에스디에스',16,'safe'),(4683,'006280','녹십자',30,'safe'),(4684,'000120','CJ대한통운',14,'safe'),(4685,'030000','제일기획',5,'safe'),(4686,'271560','오리온',1,'safe'),(4687,'079550','LIG넥스원',4,'safe'),(4688,'035420','NAVER',NULL,'safe'),(4689,'302440','SK바이오사이언스',NULL,'safe'),(4690,'016360','삼성증권',NULL,'safe'),(4691,'039490','키움증권',NULL,'safe'),(4692,'026960','동서',NULL,'safe'),(4693,'034020','두산에너빌리티',NULL,'safe'),(4694,'078930','GS',27,'safe'),(4695,'005940','NH투자증권',21,'safe'),(4696,'030200','KT',2,'safe'),(4697,'185750','종근당',28,'safe'),(4698,'004020','현대제철',NULL,'safe'),(4699,'003410','쌍용C&E',NULL,'safe'),(4700,'267250','HD현대',NULL,'safe'),(4701,'004800','효성',NULL,'safe'),(4702,'300720','한일시멘트',NULL,'safe'),(4703,'001800','오리온홀딩스',9,'safe'),(4704,'139130','DGB금융지주',NULL,'safe'),(4705,'047040','대우건설',NULL,'safe'),(4706,'081660','휠라홀딩스',NULL,'safe'),(4707,'000720','현대건설',NULL,'safe'),(4708,'012330','현대모비스',6,'safe'),(4709,'006800','미래에셋증권',NULL,'safe'),(4710,'051600','한전KPS',29,'safe'),(4711,'015760','한국전력',23,'safe'),(4712,'003490','대한항공',NULL,'safe'),(4713,'316140','우리금융지주',18,'safe'),(4714,'003550','LG',NULL,'safe'),(4715,'018880','한온시스템',0,'safe'),(4716,'028260','삼성물산',20,'safe'),(4717,'207940','삼성바이오로직스',NULL,'safe'),(4718,'033780','KT&G',NULL,'safe'),(4719,'032830','삼성생명',15,'safe'),(4720,'024110','기업은행',13,'safe'),(4721,'012750','에스원',17,'safe'),(4722,'009150','삼성전기',NULL,'safe'),(4723,'032640','LG유플러스',10,'safe'),(4724,'017670','SK텔레콤',7,'safe'),(4725,'138930','BNK금융지주',NULL,'safe'),(4726,'029780','삼성카드',19,'safe');
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

-- Dump completed on 2023-10-06  2:55:20
