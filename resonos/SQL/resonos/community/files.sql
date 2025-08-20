DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
  `no` BIGINT NOT NULL AUTO_INCREMENT,       -- 파일 번호 (자동증가)
  `id` VARCHAR(64) NOT NULL,                 -- 파일 고유 ID
  `p_table` varchar(45) NOT NULL,         -- 부모 테이블명 (예: 'board')
  `p_no` BIGINT NOT NULL,                     -- 부모 테이블에서의 번호
  `file_name` text NOT NULL,                   -- 저장된 파일명
  `origin_name` text,                          -- 원본 파일명
  `file_path` text NOT NULL,                   -- 파일 경로
  `file_size` BIGINT NOT NULL DEFAULT '0',        -- 파일 크기 (기본값 0)
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 등록일시
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 수정일시
  `type` ENUM('MAIN', 'SUB') NOT NULL DEFAULT 'SUB',        -- 파일 코드 (기본값 0)
  `seq` BIGINT NULL DEFAULT 0,
  PRIMARY KEY (`no`)                      -- 주키 설정
) COMMENT='파일';