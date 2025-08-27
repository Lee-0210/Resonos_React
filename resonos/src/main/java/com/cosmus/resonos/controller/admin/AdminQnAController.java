package com.cosmus.resonos.controller.admin;

import com.cosmus.resonos.domain.admin.QnaAnswer;
import com.cosmus.resonos.domain.user.Qna;
import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.Pagination;
import com.cosmus.resonos.service.admin.QnaAnswerService;
import com.cosmus.resonos.service.user.QnaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/admin/qna")
public class AdminQnAController {

    @Autowired
    private QnaService qnaService;

    @Autowired
    private QnaAnswerService qnaAnswerService;

    // 목록 조회 
    @GetMapping
    public ResponseEntity<?> getQnaList(
            @RequestParam(value="page", defaultValue = "1") int page,
            @RequestParam(value="size", defaultValue = "10") int size,
            @RequestParam(value="keyword", defaultValue = "") String keyword) throws Exception {


        long total = keyword.isBlank()
        ? qnaService.list().size()
        : qnaService.count(keyword);

        Pagination pagination = new Pagination(page, size, 10, total); // 10은 노출 페이지 수
        List<Qna> allQnaList = qnaService.getAll(keyword, pagination.getIndex(), pagination.getSize());
        List<Qna> noAnswerQnaList = qnaService.getNoAnswer(keyword, pagination.getIndex(), pagination.getSize());
        List<Qna> answeredQnaList = qnaService.getAnswered(keyword, pagination.getIndex(), pagination.getSize());


        Map<String,Object> res = new HashMap<>();
        res.put("success", true);
        res.put("allQnaList", allQnaList);
        res.put("noAnswerQnaList", noAnswerQnaList);
        res.put("answeredQnaList", answeredQnaList);
        res.put("pagination", pagination);

        return ResponseEntity.ok(res);
    }

    // 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getQnaDetail(@PathVariable("id") Long id) throws Exception{
        Qna qna = qnaService.select(id);
        List<QnaAnswer> answers = qnaAnswerService.findByQnaId(id);

        if (qna == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(Map.of("success", false, "message", "QnA not found"));
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "qna", qna,
                "answers", answers
        ));
    }

    // 답변 crud
    @PostMapping("/{id}/answers")
    public ResponseEntity<?> createAnswer(@PathVariable("id") Long id, @RequestBody QnaAnswer answer)throws Exception {
        answer.setQnaId(id);
        qnaAnswerService.insert(answer);
        return ResponseEntity.ok(Map.of("success", true));
    }
    // 답변 수정 
    @PutMapping("/{id}/answers/{answerId}")
    public ResponseEntity<?> updateAnswer(@PathVariable("id") Long id, @PathVariable("answerId") Long answerId, @RequestBody QnaAnswer answer) throws Exception {
        answer.setId(answerId);
        answer.setQnaId(id);
        // answeredAt 값이 없으면 현재 시각 세팅
    if (answer.getAnsweredAt() == null) {
        answer.setAnsweredAt(new Date());
    }
        qnaAnswerService.update(answer);
        return ResponseEntity.ok(Map.of("success", true));
    }
    // 답변 삭제 
    @DeleteMapping("/answers/{answerId}")
    public ResponseEntity<?> deleteAnswer(@PathVariable("answerId") Long answerId) throws Exception {
        qnaAnswerService.delete(answerId);
        return ResponseEntity.ok(Map.of("success", true));
    }

    // 질문 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQna(@PathVariable("id") Long id) throws Exception {
        qnaAnswerService.deleteByQnaId(id);
        qnaService.delete(id);
        return ResponseEntity.ok(Map.of("success", true));
    }

    




}
