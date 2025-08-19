-- Active: 1751337677491@@127.0.0.1@3306@resonos
DROP TABLE IF EXISTS `community_category`;

CREATE TABLE `community_category` (
    `id` BIGINT NOT NULL,
    `is_kor` BOOLEAN NOT NULL DEFAULT 1,
    `name` VARCHAR(200) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `com_manager`;

CREATE TABLE `com_manager` (
    `id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `com_id` BIGINT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `vote_result`;

CREATE TABLE `vote_result` (
    `id` BIGINT NOT NULL,
    `vote_id` BIGINT NOT NULL,
    `arg_id` BIGINT NOT NULL,
    `count` INT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `vote_status`;

CREATE TABLE `vote_status` (
    `id` BIGINT NOT NULL,
    `arg_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `com_vote_argument`;

CREATE TABLE `com_vote_argument` (
    `id` BIGINT NOT NULL,
    `vote_id` BIGINT NOT NULL,
    `content` VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS `com_vote`;

CREATE TABLE `com_vote` (
    `id` BIGINT NOT NULL,
    `post_id` BIGINT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `closed_at` TIMESTAMP NULL,
    `is_completed` BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
    `id` BIGINT NOT NULL,
    `content` TEXT NULL,
    `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` BIGINT NULL,
    `type` ENUM(
        'posts',
        'playlist',
        'comment'
    ) NOT NULL,
    `target_id` BIGINT NOT NULL,
    `board_post_id` BIGINT NOT NULL,
    `parent_comment_id` BIGINT NULL,
    `guest_nickname` VARCHAR(100) NULL,
    `guest_password` VARCHAR(100) NULL
);

DROP TABLE IF EXISTS `board_post`;

-- board_post 대표 음악 설정
-- board_post 테이블 thumbnail_url 컬럼 추가
CREATE TABLE `board_post` (
    `id` BIGINT NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `content` TEXT NOT NULL,
    `type` VARCHAR(50) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `community_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `views` BIGINT NOT NULL DEFAULT 0,
    `track_id` VARCHAR(200) NULL,
    `thumbnail_url` VARCHAR(200) NULL DEFAULT '/img/profileImg.png'
);

select * from board_post;

DROP TABLE IF EXISTS `likes_dislikes`;

CREATE TABLE `likes_dislikes` (
    `id` BIGINT,
    `type` ENUM('post', 'comment') NOT NULL,
    `user_id` BIGINT NOT NULL,
    `is_likes` BOOLEAN NOT NULL,
    `target_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `community`;

CREATE TABLE `community` (
    `id` BIGINT NOT NULL,
    `category_id` BIGINT NOT NULL,
    `creator_id` BIGINT NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `track_id` VARCHAR(200) NULL,
    `intro` VARCHAR(200) NULL
);


ALTER TABLE `community_category` MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);

ALTER TABLE `community` MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);

ALTER TABLE `com_manager` MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);

ALTER TABLE `vote_result` MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);

ALTER TABLE `vote_status` MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);

ALTER TABLE `com_vote_argument` MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);

ALTER TABLE `com_vote` MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);

ALTER TABLE `comment` MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);

ALTER TABLE `board_post` MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);

ALTER TABLE `likes_dislikes` MODIFY COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);

ALTER TABLE `community`
ADD CONSTRAINT `FK_community_category_TO_community_1` FOREIGN KEY (`category_id`) REFERENCES `community_category` (`id`);

ALTER TABLE `community`
ADD CONSTRAINT `FK_user_TO_community_1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);

ALTER TABLE `com_manager`
ADD CONSTRAINT `FK_user_TO_com_manager_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `com_manager`
ADD CONSTRAINT `FK_community_TO_com_manager_1` FOREIGN KEY (`com_id`) REFERENCES `community` (`id`);

ALTER TABLE `vote_result`
ADD CONSTRAINT `FK_com_vote_TO_vote_result_1` FOREIGN KEY (`vote_id`) REFERENCES `com_vote` (`id`);

ALTER TABLE `vote_result`
ADD CONSTRAINT `FK_com_vote_argument_TO_vote_result_1` FOREIGN KEY (`arg_id`) REFERENCES `com_vote_argument` (`id`);

ALTER TABLE `vote_status`
ADD CONSTRAINT `FK_com_vote_argument_TO_vote_status_1` FOREIGN KEY (`arg_id`) REFERENCES `com_vote_argument` (`id`);

ALTER TABLE `vote_status`
ADD CONSTRAINT `FK_user_TO_vote_status_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `com_vote_argument`
ADD CONSTRAINT `FK_com_vote_TO_com_vote_argument_1` FOREIGN KEY (`vote_id`) REFERENCES `com_vote` (`id`);

ALTER TABLE `com_vote`
ADD CONSTRAINT `FK_board_post_TO_com_vote_1` FOREIGN KEY (`post_id`) REFERENCES `board_post` (`id`);

ALTER TABLE `comment`
ADD CONSTRAINT `FK_user_TO_comment_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `comment`
ADD CONSTRAINT `FK_board_post_TO_comment_1` FOREIGN KEY (`board_post_id`) REFERENCES `board_post` (`id`);

ALTER TABLE `comment`
ADD CONSTRAINT `FK_comment_TO_comment_1` FOREIGN KEY (`parent_comment_id`) REFERENCES `comment` (`id`);

ALTER TABLE `board_post`
ADD CONSTRAINT `FK_community_TO_board_post_1` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`);

ALTER TABLE `board_post`
ADD CONSTRAINT `FK_user_TO_board_post_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `likes_dislikes`
ADD CONSTRAINT `FK_user_TO_likes_dislikes_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `board_post`
ADD CONSTRAINT `FK_track_TO_board_post_1` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`);

ALTER TABLE `community` ADD CONSTRAINT `FK_track_TO_community_1` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`);



-- SET FOREIGN_KEY_CHECKS = 0;

-- TRUNCATE TABLE likes_dislikes;
-- TRUNCATE TABLE comment;
-- TRUNCATE TABLE vote_status;
-- TRUNCATE TABLE vote_result;
-- TRUNCATE TABLE com_vote_argument;
-- TRUNCATE TABLE com_vote;
-- TRUNCATE TABLE board_post;
-- TRUNCATE TABLE com_manager;
-- TRUNCATE TABLE community;
-- TRUNCATE TABLE community_category;

-- SET FOREIGN_KEY_CHECKS = 1;



-- drop table `likes_dislikes`;
-- drop table `comment`;
-- drop table `vote_status`;
-- drop table `vote_result`;
-- drop table `com_vote_argument`;
-- drop table `com_vote`;
-- drop table `board_post`;
-- drop table `com_manager`;
-- drop table `community`;
-- drop table `community_category`;