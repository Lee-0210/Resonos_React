
-- user
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `profile_image` varchar(200) NOT NULL DEFAULT '/img/profileImg.png',
  `bio` text,
  `is_pro` tinyint(1) NOT NULL DEFAULT '0',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `ban` tinyint(1) NOT NULL DEFAULT '0' COMMENT '회원 제재 여부',
  `ban_reason` varchar(255) DEFAULT NULL COMMENT '제재 사유',
  `ban_at` timestamp NULL DEFAULT NULL COMMENT '제재 일시',
  `provider` varchar(200) DEFAULT NULL,
  `provider_id` varchar(200) DEFAULT NULL,
  `current_badge` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_username` (`username`),
  UNIQUE KEY `UK_email` (`email`),
  KEY `FK_use_badge_TO_user` (`current_badge`),
  CONSTRAINT `FK_use_badge_TO_user` FOREIGN KEY (`current_badge`) REFERENCES `user_badge` (`badge_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- chat_message 
CREATE TABLE chat_messages (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  room_id BIGINT NULL,               -- 단일 채팅이면 NULL
  sender_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL,
  CONSTRAINT fk_chat_sender FOREIGN KEY (sender_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- message_mentions
CREATE TABLE message_mentions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  message_id BIGINT NOT NULL,
  mentioned_user_id BIGINT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_read TINYINT(1) NOT NULL DEFAULT 0,  -- 멘션 읽음 처리
  CONSTRAINT fk_mention_message FOREIGN KEY (message_id) REFERENCES chat_messages(id) ON DELETE CASCADE,
  CONSTRAINT fk_mention_user FOREIGN KEY (mentioned_user_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


drop table notification

-- notifitcation 
CREATE TABLE notification (
  id BIGINT NOT NULL AUTO_INCREMENT,
  type VARCHAR(32) NOT NULL,         -- 'MENTION', 'LIKE', 'DM', 'ADMIN' 등
  message TEXT NOT NULL,             -- 알림 내용
  content TEXT,                      -- 상세 정보 (JSON 등)
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  target_id BIGINT DEFAULT NULL,     -- 원본 메시지 ID 등 참조
  user_id BIGINT NOT NULL,           -- 알람 받을 유저
  PRIMARY KEY (id),
  KEY FK_user_TO_notification (user_id),
  CONSTRAINT FK_user_TO_notification FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

drop table notice;

-- notice 
CREATE TABLE notice (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id BIGINT NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  start_at DATETIME DEFAULT NULL,
  end_at DATETIME DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_notice_author FOREIGN KEY (author_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
