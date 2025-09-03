-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: mintingnft
-- ------------------------------------------------------
-- Server version	5.7.36

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
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `partnerId` int(10) unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `partnersss_id_idx` (`partnerId`),
  CONSTRAINT `partnersss_id` FOREIGN KEY (`partnerId`) REFERENCES `partner` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` VALUES (1,1,'Selected','2021-11-17 10:37:36','2021-11-17 10:37:36',0);
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `address` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `partnerId` int(11) unsigned NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `type` enum('main','core','randomizer') COLLATE utf8mb4_bin DEFAULT 'core',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `partner_fk_idx` (`partnerId`),
  CONSTRAINT `partners_fk` FOREIGN KEY (`partnerId`) REFERENCES `partner` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
INSERT INTO `contract` VALUES (1,'Mintoria Selected','0x96250a3b652a647cde7b26fd5fdd61b4b87dedf8',1,'2021-11-17 10:26:39','2021-11-17 10:26:39',0,'core'),(2,'Mintoria Selected Minter','0x6b839D2a8E18495d8CfDB9f41B2A9487E6ca6c13',1,'2021-11-21 15:04:28','2021-11-21 15:04:28',0,'main'),(3,'Mintoria Selected Randomizer','0x936Ce6b01984815A12570265B8EFeDd728484814',1,'2021-11-21 15:05:31','2021-11-21 15:05:31',0,'randomizer');
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature`
--

DROP TABLE IF EXISTS `feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feature` (
  `id` int(11) NOT NULL,
  `projectId` int(11) unsigned NOT NULL,
  `feature` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projectss_id_idx` (`projectId`),
  CONSTRAINT `projectss_id` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature`
--

LOCK TABLES `feature` WRITE;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner`
--

DROP TABLE IF EXISTS `partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partner` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner`
--

LOCK TABLES `partner` WRITE;
/*!40000 ALTER TABLE `partner` DISABLE KEYS */;
INSERT INTO `partner` VALUES (1,'MintingNFTArt','2021-11-17 10:26:34','2021-11-17 10:26:34',0);
/*!40000 ALTER TABLE `partner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contractId` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `collectionId` int(10) unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `website` varchar(150) COLLATE utf8mb4_bin DEFAULT NULL,
  `license` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL,
  `featuredToken` int(5) DEFAULT '0',
  `scriptType` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL,
  `aspectRatio` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL,
  `startingAt` datetime DEFAULT NULL,
  `completedAt` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `description` varchar(500) COLLATE utf8mb4_bin DEFAULT NULL,
  `artist` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `script` blob,
  `pricePerTokenInWei` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `iterations` int(6) DEFAULT '0',
  `maxIterations` int(6) DEFAULT NULL,
  `maxTokensPerAddress` int(6) DEFAULT NULL,
  `collaboratorAddress` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `collaboratorPercentage` tinyint(3) DEFAULT NULL,
  `secondaryMarketPercentage` tinyint(3) DEFAULT NULL,
  `useStorage` tinyint(3) DEFAULT '0',
  `paused` tinyint(1) DEFAULT '1',
  `locked` tinyint(1) DEFAULT '0',
  `deployed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `contract_fk_idx` (`contractId`),
  KEY `users_fk_idx` (`userId`),
  CONSTRAINT `contract_fk` FOREIGN KEY (`contractId`) REFERENCES `contract` (`partnerId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `users_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,1,3,1,'test','','nft',0,'p5js','','2021-11-17 14:24:03','2021-11-19 09:34:03',1,'2021-11-16 13:25:46','2021-11-17 13:25:46',0,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','Artist','','100000000000000000',10,10,50,'0x0000000000000000000000000000000000000000',0,5,1,0,0,0),(2,1,4,1,'test 2','http://web.site','nft',0,NULL,NULL,NULL,NULL,1,'2021-11-16 18:25:46',NULL,0,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','',NULL,'100000000000000000',13,100,10,'0xe0D7Bfd6e615Ae4b4c2FD1824e397de922700322',10,5,1,0,0,0);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` int(10) unsigned NOT NULL,
  `hash` varchar(70) COLLATE utf8mb4_bin NOT NULL,
  `owner` varchar(70) COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(1) DEFAULT '0',
  `token` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_fk_idx` (`projectId`),
  CONSTRAINT `projects_fk` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (4,1,'0xb1af094b87d9ff74c20224eef44d1aa04fa7c743b928f163463caaf2bdfbbfc0','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-17 12:32:10','2021-11-17 12:32:10',0,100001),(5,1,'0xcc010e60185273ee04e8b850accab1be32c9f4d4391a31f362d5084a099165d5','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-17 12:32:10','2021-11-17 12:32:10',0,100002),(6,1,'0x65f2b8b01bc46a571b64c735f2f2b9a710a7754f2ef36288c73965db9c86c542','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-17 12:32:22','2021-11-17 12:32:22',0,100003),(7,1,'0x56b99b646ce7588964e4dadc9d7cd046fa730413ba8a797c4c4a35f03b8ccd92','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-17 12:35:11','2021-11-17 12:35:11',0,100004),(8,1,'0xdc917d232d7be7fe53a08efb21f3e0d5c6b6c1390b38a614e0e2576f18214c00','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-17 12:36:41','2021-11-17 12:36:41',0,100005),(9,1,'0xe8fa9782b9c578669b23e2923192e62687cababb96fabc7e18ab3abbd3e4b3ba','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-17 13:11:26','2021-11-17 13:11:26',0,100006),(10,1,'0x478cede9973473a9c12e2c8e0bb11d3b37650d4b151fca1052420c838c8acd00','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-17 13:11:49','2021-11-17 13:11:49',0,100007),(11,1,'0x738a575916d4651b046db1d8cd9b3d8c5e13129f632840bbeb523967aa9d09b5','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-17 13:12:12','2021-11-17 13:12:12',0,100008),(21,2,'0x72816e8588e2fe50bbaea408624d144596610020368535d5b2eca54ed862d413','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 18:08:33','2021-11-18 18:08:33',0,200003),(22,2,'0xbaf2d5cf5ccad8415fa85d3f1638eab5db4dcb96137c375aa20ef579851fb25f','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 18:08:33','2021-11-18 18:08:33',0,200000),(23,2,'0x774e591334604a2eed6f5111d25a165a032638c0f0189a08a4cba788b1fd8b8b','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 18:08:33','2021-11-18 18:08:33',0,200002),(24,2,'0xeffb98c5279100750d89818b2a818b25f55c35018008ca6d36a6b9de5db2d95a','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 18:08:33','2021-11-18 18:08:33',0,200001),(25,2,'0x2f5c2210c8c77149c908f5e4b94be2f9882d735fb76e2b1a989b7690cc0e1d5a','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 18:12:20','2021-11-18 18:12:20',0,200004),(28,1,'0x2d6da8a2744966eeba6f117e598451feecb5ee4827601f90afd345d1fe7dfb06','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 18:29:41','2021-11-18 18:29:41',0,100009),(29,2,'0x3628d45d652d5a77dfcce2e1a925199cc72506d733bb71f8d38511a3fcb92070','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 18:30:55','2021-11-18 18:30:55',0,200005),(30,1,'0x11f7adafb8195afb02cfdf74df8ec6940383fadfe793fd3d4bba3799218c25c7','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 18:32:19','2021-11-18 18:32:19',0,100000),(31,2,'0xeb7a617b9f0a36fd322b3d9027f5277c8a979e2f82e0e550263b6e3935e21471','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 20:18:44','2021-11-18 20:18:44',0,200006),(32,2,'0xf089437294ee8cc943bb61987a7694fa38e92783d3632b321f6fc1a891b52034','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 20:19:20','2021-11-18 20:19:20',0,200007),(33,2,'0xc114c67a6e61ff47b7aadb87e380ee14a9e3ad1391900f475fe5cc9364e68487','0x006D4a089c646d6baBf0050FF069774e778df3b8','2021-11-18 20:20:08','2021-11-18 20:20:08',0,200008),(34,2,'0x59d8371b0766f5022a6c94833c88fac82ce977bcc32cff875c25455b099e6f13','0xD15ACFcf9b0512595AaBeEF379d715a5108B33c4','2021-11-18 20:22:32','2021-11-18 20:22:32',0,200009),(35,2,'0xeac74a06c9d942ede91ab1b0f1a8f2ede3fa47974de7c303dc4f3dd05838ccd3','0xD15ACFcf9b0512595AaBeEF379d715a5108B33c4','2021-11-18 20:22:56','2021-11-18 20:22:56',0,200010),(36,2,'0xe997afd588556e964479c55b285b3bb09f62a44e6e161cb3b3eba193ba64f8d3','0xD15ACFcf9b0512595AaBeEF379d715a5108B33c4','2021-11-18 20:30:54','2021-11-18 20:30:54',0,200011),(37,2,'0x8f512368fb14653c2c988adb4e373bfd5e3b2edd1c20523079f33a0b04143ac6','0xD15ACFcf9b0512595AaBeEF379d715a5108B33c4','2021-11-19 14:06:56','2021-11-19 14:06:56',0,200012);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trait`
--

DROP TABLE IF EXISTS `trait`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trait` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  `value` varchar(200) COLLATE utf8mb4_bin DEFAULT NULL,
  `tokenId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` varchar(45) COLLATE utf8mb4_bin DEFAULT 'CURRENT_TIMESTAMP',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `token_FK_idx` (`tokenId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trait`
--

LOCK TABLES `trait` WRITE;
/*!40000 ALTER TABLE `trait` DISABLE KEYS */;
/*!40000 ALTER TABLE `trait` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `lastName` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `partnerId` int(11) unsigned NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `email` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `staff` tinyint(1) DEFAULT '0',
  `address` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `partner_FK` (`partnerId`),
  CONSTRAINT `partner_FK` FOREIGN KEY (`partnerId`) REFERENCES `partner` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'Artist','.',1,'2021-11-17 10:30:00','2021-11-17 10:30:00',0,'.','.',1,'0x006d4a089c646d6babf0050ff069774e778df3b8',0),(4,'','',1,'2021-11-18 17:28:50','2021-11-18 17:28:50',0,'','',0,'0xe46f689abdf1e538e436ac54daae03809b8eb5e9',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-21 18:02:39
