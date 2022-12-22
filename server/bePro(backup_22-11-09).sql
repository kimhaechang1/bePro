-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.9.3-MariaDB - mariadb.org binary distribution
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
CREATE DATABASE IF NOT EXISTS `bemajor` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bemajor.member 구조 내보내기
CREATE TABLE IF NOT EXISTS `member` (
  `member_idnum` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `member_id` varchar(16) NOT NULL,
  `member_password` varchar(64) NOT NULL,
  `member_email` varchar(128) NOT NULL,
  `member_nickname` varchar(16) NOT NULL,
  `member_major` varchar(32) DEFAULT NULL,
  `member_token` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`member_idnum`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bemajor.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_title` varchar(32) DEFAULT NULL,
  `post_uploader` int(10) unsigned DEFAULT NULL,
  `post_uploadtime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `post_detail` text DEFAULT NULL,
  `post_view` int(10) unsigned DEFAULT NULL,
  `post_like` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 bemajor.tag 구조 내보내기
CREATE TABLE IF NOT EXISTS `tag` (
  `tag_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag_post_id` int(10) unsigned NOT NULL,
  `tag_detail` varchar(32) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
