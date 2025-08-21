package com.cosmus.resonos.controller.admin;

import com.cosmus.resonos.domain.admin.Notice;
import com.cosmus.resonos.service.admin.NoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST 기반 공지 관리 컨트롤러
 */
@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/admin/notices")
public class AdminNoticeController {

    @Autowired
    private NoticeService noticeService;

    /**
     * 공지 목록 조회
     * GET /admin/notices
     */
    @GetMapping
    public Map<String, Object> list(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "id", required = false) Long id
    ) {
        Map<String, Object> result = new HashMap<>();
        try {
            // TODO: 서비스에 page, size, keyword로 목록 조회 구현
            List<Notice> notices = noticeService.list(/* page,size,keyword */);
            result.put("success", true);
            result.put("notices", notices);

            if (id != null) {
                Notice notice = noticeService.select(id);
                result.put("notice", notice != null ? notice : new Notice());
            }

            // 페이지네이션 정보 예시
            Map<String, Object> pagination = new HashMap<>();
            pagination.put("page", page);
            pagination.put("size", size);
            pagination.put("total", notices.size());
            pagination.put("totalPages", 1);
            result.put("pagination", pagination);

        } catch (Exception e) {
            log.error("공지 목록 조회 실패", e);
            result.put("success", false);
            result.put("message", "공지 목록 조회 중 오류");
        }
        return result;
    }

    /**
     * 공지 저장 (등록 / 수정)
     * POST /admin/notices/save
     */
    @PostMapping("/save")
    public Map<String, Object> save(@RequestBody Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            // Long 변환 (빈 문자열이면 null)
            Long id = null;
            if (params.get("id") != null && !params.get("id").toString().trim().isEmpty()) {
                id = Long.valueOf(params.get("id").toString().trim());
            }

            String title = (String) params.get("title");
            Boolean isActive = params.get("isActive") != null && Boolean.parseBoolean(params.get("isActive").toString());
            String content = (String) params.get("content");

            // ISO 8601 형식 안전한 날짜 파싱 메소드 호출
            Date createdAt = parseIsoDate(params.get("createdAt"));
            if (createdAt == null) {
                createdAt = new Date(); // 기본값 또는 필요시 null 허용
            }

            Date startAt = parseIsoDate(params.get("startAt"));
            if (startAt == null) {
                // startAt 필수 아니면 그대로 null, 필수면 기본값 지정
            }

            Date endAt = parseIsoDate(params.get("endAt"));
            if (endAt == null) {
                // endAt 필수 아니면 그대로 null, 필수면 기본값 지정
            }

            log.debug("Received save params: {}", params);
            // Notice 객체 생성
            Notice notice = new Notice();
            notice.setId(id);
            notice.setTitle(title);
            notice.setIsActive(isActive);
            notice.setContent(content);
            notice.setCreatedAt(createdAt);
            notice.setStartAt(startAt);
            notice.setEndAt(endAt);

            // 저장/수정
            boolean success = (id == null)
                    ? noticeService.insert(notice)
                    : noticeService.update(notice);

            result.put("success", success);
            result.put("notice", notice);

        } catch (Exception e) {
            log.error("공지 저장 실패", e);
            result.put("success", false);
            result.put("message", "공지 저장 중 오류 발생");
        }

        return result;
    }

    /**
     * ISO 8601 형식 문자열을 Date로 변환하는 안전한 메소드
     */
private Date parseIsoDate(Object dateObj) {
    if (dateObj == null) return null;
    String dateStr = dateObj.toString().trim();
    if (dateStr.isEmpty() || "null".equalsIgnoreCase(dateStr)) return null;
    try {
        OffsetDateTime odt = OffsetDateTime.parse(dateStr);
        return Date.from(odt.toInstant());
    } catch (DateTimeParseException e) {
        log.error("Invalid ISO date format: {}", dateStr, e);
        return null;
    }
}


    /**
     * 공지 삭제
     * DELETE /admin/notices/{id}
     */
    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable("id") Long id) throws Exception {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean success = noticeService.delete(id);
            result.put("success", success);
        } catch (Exception e) {
            log.error("공지 삭제 실패", e);
            result.put("success", false);
            result.put("message", "공지 삭제 중 오류 발생");
        }
        return result;
    }
}
