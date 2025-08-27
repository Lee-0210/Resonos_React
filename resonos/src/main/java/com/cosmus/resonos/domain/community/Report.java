package com.cosmus.resonos.domain.community;

import lombok.Data;
import java.util.Date;

@Data
public class Report {
    private Long id;
    private String reason;
    private String status;          // ENUM('PENDING', 'DONE', 'REJECTED')
    private Date createdAt;
    private Long reporterId;
    private Long boardPostId;
    private Long adminId;

    // 이동용
    private Long communityId;
}
