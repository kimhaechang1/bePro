-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.9.4-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- bemajor 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `bemajor` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `bemajor`;

-- 테이블 bemajor.comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comment_member_idnum` int(11) unsigned NOT NULL,
  `comment_post_id` int(11) unsigned NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `comment_contents` text NOT NULL,
  `comment_isanonymous` int(11) unsigned DEFAULT NULL COMMENT '익명이 아닐때 null 익명일경우 익명번호',
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 bemajor.comment:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- 테이블 bemajor.member 구조 내보내기
CREATE TABLE IF NOT EXISTS `member` (
  `member_idnum` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `member_id` varchar(16) NOT NULL,
  `member_password` varchar(64) NOT NULL,
  `member_email` varchar(128) NOT NULL,
  `member_nickname` varchar(16) NOT NULL,
  `member_major` varchar(32) DEFAULT NULL,
  `member_token` varchar(256) DEFAULT NULL,
  `member_admin` int(11) DEFAULT NULL,
  PRIMARY KEY (`member_idnum`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 bemajor.member:~5 rows (대략적) 내보내기
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT IGNORE INTO `member` (`member_idnum`, `member_id`, `member_password`, `member_email`, `member_nickname`, `member_major`, `member_token`, `member_admin`) VALUES
	(1, 'asd123', '1234', 'asds@gmail.com', 'aaaa', 'com', NULL, 0),
	(2, 'asdf', '7595637a39a5dbfe435fe8110d7c2fd65625929c24ea5f9b02aa06e259bb7a86', 'asd@naver.com', 'jam', 'com', NULL, 0),
	(3, 'asdf4', '5976e642c62c10ecce90205c43eabf9c0414fbb57cb6f6eb7452f0b10a97eec4', 'asd@naver.com', 'jam', NULL, NULL, 0),
	(4, 'asdf7', 'd96a859feebee69738bf4c6abf6bd4b3a795f8794884b4d0a840684e8f31277c', 'asd@naver.com', 'jam', 'com', NULL, 0),
	(5, 'ksm', '7bdcd1d416479fc8766b42ca3d4a11eb178862576f3540ee5c3a5c5bde8a0719', 'ksm@naver.com', 'jam', 'com', NULL, 0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;

-- 테이블 bemajor.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_title` varchar(32) DEFAULT NULL,
  `post_uploader` int(10) unsigned DEFAULT NULL,
  `post_uploadtime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `post_detail` text DEFAULT NULL,
  `post_view` int(10) unsigned DEFAULT NULL,
  `post_like` int(10) unsigned DEFAULT NULL,
  `post_category` enum('post','qna','notice') DEFAULT 'post',
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 bemajor.post:~8 rows (대략적) 내보내기
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT IGNORE INTO `post` (`post_id`, `post_title`, `post_uploader`, `post_uploadtime`, `post_detail`, `post_view`, `post_like`, `post_category`) VALUES
	(1, 'title', 5, '2022-12-18 18:54:30', 'asdf', 12, 4, 'qna'),
	(2, 'title2', 5, '2022-12-18 18:54:32', 'asdf2', 12, 4, 'qna'),
	(3, 'title3', 5, '2022-12-18 18:54:33', 'asdf3', 12, 4, 'qna'),
	(4, 'title4', 5, '2022-12-18 18:54:35', 'asdf4', 12, 4, 'qna'),
	(5, 'Qna', 5, '2022-12-04 16:42:42', 'sad', 1, 4, 'qna'),
	(6, 'Qna2', 5, '2022-12-05 16:44:51', 'asd', 5, 3, 'qna'),
	(7, 'Noti', 5, '2022-12-02 16:43:38', 'SADS', 15, 2, 'notice'),
	(8, 'Noti2', 5, '2022-12-05 16:43:58', 'ads', 24, 15, 'notice');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;

-- 테이블 bemajor.tag 구조 내보내기
CREATE TABLE IF NOT EXISTS `tag` (
  `tag_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag_post_id` int(10) unsigned NOT NULL,
  `tag_detail` varchar(32) NOT NULL,
  `tag_search_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 bemajor.tag:~3 rows (대략적) 내보내기
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT IGNORE INTO `tag` (`tag_id`, `tag_post_id`, `tag_detail`, `tag_search_count`) VALUES
	(1, 1, '알파', 0),
	(2, 3, '알파', 0),
	(3, 2, '베타', 0);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
