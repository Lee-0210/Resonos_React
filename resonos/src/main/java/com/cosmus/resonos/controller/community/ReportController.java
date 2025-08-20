package com.cosmus.resonos.controller.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.community.BoardPost;
import com.cosmus.resonos.domain.community.Report;
import com.cosmus.resonos.service.admin.ReportService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/community/boards/{communityId}/posts/{postId}")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // 목록
    // @GetMapping
    // public String list(Model model) throws Exception {
    //     log.info("[ReportController] 신고 목록 요청");
    //     List<Report> reports = reportService.list();
    //     log.info("[ReportController] 신고 수: {}", reports.size());
    //     model.addAttribute("reports", reports);
    //     return "report/list"; // report/list.html
    // }

    // 상세
    // @GetMapping("/{id}")
    // public String detail(@PathVariable Long id, Model model) throws Exception {
    //     log.info("[ReportController] 신고 상세 요청 - id: {}", id);
    //     Report report = reportService.select(id);
    //     if (report == null) {
    //         log.warn("[ReportController] 신고 없음 - id: {}", id);
    //         return "redirect:/reports?error=notfound";
    //     }
    //     log.info("[ReportController] 신고 상세: {}", report);
    //     model.addAttribute("report", report);
    //     return "report/detail"; // report/detail.html
    // }

    // 등록 폼
    // @GetMapping("/new")
    // public String create(Model model) {
    //     log.info("[ReportController] 신고 등록 폼 요청");
    //     model.addAttribute("report", new Report());
    //     return "report/form"; // report/form.html
    // }

    // 등록 처리
    @PostMapping()
    public ResponseEntity<?> createPost(
        @PathVariable("postId") Long postId,
        @RequestBody Report request,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        try {
            if (loginUser == null) return new ResponseEntity<>("로그인 후 게시글 신고가 가능합니다.", HttpStatus.UNAUTHORIZED);
            Report report = new Report();
            report.setReason(request.getReason());
            report.setReporterId(loginUser.getId());
            report.setBoardPostId(postId);
            boolean result = reportService.insert(report);
            return result ? new ResponseEntity<>("SUCCESS", HttpStatus.CREATED)
                          : new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("게시글 신고 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // // 수정 폼
    // @GetMapping("/{id}/edit")
    // public String update(@PathVariable Long id, Model model) throws Exception {
    //     log.info("[ReportController] 신고 수정 폼 요청 - id: {}", id);
    //     Report report = reportService.select(id);
    //     if (report == null) {
    //         log.warn("[ReportController] 수정할 신고 없음 - id: {}", id);
    //         return "redirect:/reports?error=notfound";
    //     }
    //     model.addAttribute("report", report);
    //     return "report/form";
    // }

    // // 수정 처리
    // @PostMapping("/{id}/edit")
    // public String updatePost(@PathVariable Long id, @ModelAttribute Report report, Model model) throws Exception {
    //     log.info("[ReportController] 신고 수정 시도 - id: {}, report: {}", id, report);
    //     report.setId(id);
    //     boolean success = reportService.update(report);
    //     if (success) {
    //         log.info("[ReportController] 신고 수정 성공 - id: {}", id);
    //         return "redirect:/reports/" + id;
    //     }
    //     log.warn("[ReportController] 신고 수정 실패 - id: {}", id);
    //     model.addAttribute("error", "수정 실패");
    //     return "report/form";
    // }

    // // 삭제 처리
    // @PostMapping("/{id}/delete")
    // public String delete(@PathVariable Long id) throws Exception {
    //     log.info("[ReportController] 신고 삭제 시도 - id: {}", id);
    //     reportService.delete(id);
    //     log.info("[ReportController] 신고 삭제 완료 - id: {}", id);
    //     return "redirect:/reports";
    // }
}
