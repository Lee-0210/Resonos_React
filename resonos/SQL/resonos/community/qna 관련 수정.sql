



CREATE TABLE `community` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint NOT NULL,
  `creator_id` bigint NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `track_id` varchar(200) DEFAULT NULL,
  `intro` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_community_category_TO_community_1` (`category_id`),
  KEY `FK_user_TO_community_1` (`creator_id`),
  KEY `FK_track_TO_community_1` (`track_id`),
  CONSTRAINT `FK_community_category_TO_community_1` FOREIGN KEY (`category_id`) REFERENCES `community_category` (`id`),
  CONSTRAINT `FK_track_TO_community_1` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`),
  CONSTRAINT `FK_user_TO_community_1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci




-- community 테이블에서 category_id null 허용으로 수정 
ALTER TABLE `community` MODIFY COLUMN `category_id` bigint NULL;