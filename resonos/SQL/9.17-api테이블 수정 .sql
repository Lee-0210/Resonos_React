-- Active: 1751337677491@@127.0.0.1@3306@resonos
-- CREATE TABLE `external_api_config` (
--   `id` bigint NOT NULL AUTO_INCREMENT,
--   `provider` varchar(100) NOT NULL,
--   `apiKey` varchar(100) NOT NULL,
--   `secret` varchar(100) NOT NULL,
--   `enabled` tinyint(1) NOT NULL DEFAULT '0',
--   `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



-- external_api_config 테이블 description 컬럼 추가, secret 컬럼 null 허용으로 변경
ALTER TABLE `external_api_config`
ADD COLUMN `description` varchar(255) DEFAULT NULL,
MODIFY COLUMN `secret` varchar(100) DEFAULT NULL;