package com.cosmus.resonos.controller.community;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.Pagination;
import com.cosmus.resonos.domain.community.Comment;
import com.cosmus.resonos.service.community.CommentService;
import com.github.pagehelper.PageInfo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/community/boards/{communityId}/posts/{postId}/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // @GetMapping()
    // public ResponseEntity<?> getAll(
    //     @RequestParam(value ="page", defaultValue = "1", required = false) int page,
    //     @RequestParam(value ="size", defaultValue = "10", required = false) int size,
    //     @ModelAttribute Pagination pagination
    // ) {
    //     try {
    //         PageInfo<Comment> pageInfo = commentService.list(page, size);
    //         pagination.setPage(page);
    //         pagination.setSize(size);
    //         pagination.setTotal(pageInfo.getTotal());

    //         Map<String, Object> response = new HashMap<>();
    //         List<Comment> list = pageInfo.getList();
    //         response.put("list", list);
    //         response.put("pagination", pagination);

    //         return new ResponseEntity<>(response, HttpStatus.OK);
    //     } catch (Exception e) {
    //         log.error("Error in getAll", e);
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @GetMapping("/{id}")
    // public ResponseEntity<?> getOne(@PathVariable("id") Long  id) {
    //     try {
    //         Comment entity = commentService.selectById(String.valueOf(id));
    //         if (entity == null) {
    //             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //         }
    //         return new ResponseEntity<>(entity, HttpStatus.OK);
    //     } catch (Exception e) {
    //         log.error("Error in getOne", e);
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    @PostMapping()
    public ResponseEntity<?> create(
        @PathVariable("postId") Long postId,
        @RequestBody Comment request,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        System.out.println("loginUser : " + loginUser);
        try {
            Comment comment = new Comment();
            comment.setContent(request.getContent());
            if (request.getParentCommentId() == null) {
                comment.setType("posts");
                comment.setTargetId(postId);

            } else {
                // 🔹 대댓글 처리
                // parentCommentId가 있으면 대댓글, 없으면 최상단 댓글
                comment.setParentCommentId(request.getParentCommentId());
                comment.setType("comment");
                comment.setTargetId(request.getParentCommentId());
            }
            comment.setBoardPostId(postId);

            if (loginUser != null) {
                // 로그인 상태
                commentService.writeComment(comment, loginUser);
            } else {
                // 비로그인 상태
                comment.setGuestNickname(request.getGuestNickname());
                comment.setGuestPassword(request.getGuestPassword());
                commentService.writeComment(comment, null);
            }

            return new ResponseEntity<>(comment, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("댓글 작성 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> update(
        @PathVariable("postId") Long postId,
        @PathVariable("commentId") Long commentId,
        @RequestBody Comment request,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        try {
            Comment comment = commentService.select(commentId);
            if (comment == null) return new ResponseEntity<>("댓글이 없습니다.", HttpStatus.NOT_FOUND);

            // if (request.getGuestPassword() == null ||
            //     !commentService.checkGuestPassword(comment, request.getGuestPassword())) {
            //     return new ResponseEntity<>("비밀번호가 다릅니다.", HttpStatus.UNAUTHORIZED);
            // }

            // if (loginUser != null && !loginUser.getId().equals(comment.getUserId())) {
            //     return new ResponseEntity<>("수정 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
            // }

            if (loginUser != null) {
                if (comment.getUserId() != null && !loginUser.getId().equals(comment.getUserId())) {
                    return new ResponseEntity<>("수정 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
                }
                else if (comment.getUserId() == null && (request.getGuestPassword() == null ||
                    !commentService.checkGuestPassword(comment, request.getGuestPassword()))) {
                    return new ResponseEntity<>("비밀번호가 다릅니다.", HttpStatus.UNAUTHORIZED);
                }
            } else {
                if (comment.getUserId() != null) {
                    return new ResponseEntity<>("수정 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
                }
                if (request.getGuestPassword() == null ||
                    !commentService.checkGuestPassword(comment, request.getGuestPassword())) {
                    return new ResponseEntity<>("비밀번호가 다릅니다.", HttpStatus.UNAUTHORIZED);
                }
            }

            comment.setContent(request.getContent());
            boolean result = commentService.update(comment);
            return result ? new ResponseEntity<>(comment, HttpStatus.OK)
                          : new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("댓글 수정 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> destroy(
        @PathVariable("postId") Long postId,
        @PathVariable("commentId") Long commentId,
        @RequestBody(required = false) Comment request,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        try {
            Comment comment = commentService.select(commentId);
            if (comment == null) return new ResponseEntity<>("댓글이 없습니다.", HttpStatus.NOT_FOUND);

            // if (request == null || request.getGuestPassword() == null ||
            //     !commentService.checkGuestPassword(comment, request.getGuestPassword())) {
            //     return new ResponseEntity<>("비밀번호가 다릅니다.", HttpStatus.UNAUTHORIZED);
            // }

            // if (loginUser != null && !loginUser.getId().equals(comment.getUserId())) {
            //     return new ResponseEntity<>("삭제 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
            // }

            if (loginUser != null) {
                if (comment.getUserId() != null && !loginUser.getId().equals(comment.getUserId())) {
                    return new ResponseEntity<>("삭제 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
                }
                else if (comment.getUserId() == null && (request == null || request.getGuestPassword() == null ||
                    !commentService.checkGuestPassword(comment, request.getGuestPassword()))) {
                    return new ResponseEntity<>("비밀번호가 다릅니다.", HttpStatus.UNAUTHORIZED);
                }
            } else {
                if (comment.getUserId() != null) {
                    return new ResponseEntity<>("삭제 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
                }
                if (request == null || request.getGuestPassword() == null ||
                    !commentService.checkGuestPassword(comment, request.getGuestPassword())) {
                    return new ResponseEntity<>("비밀번호가 다릅니다.", HttpStatus.UNAUTHORIZED);
                }
            }

            boolean result = commentService.delete(commentId);
            return result ? new ResponseEntity<>(comment, HttpStatus.OK)
                          : new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("댓글 삭제 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // // 전체 삭제
    // @DeleteMapping("/all")
    // public ResponseEntity<?> deleteAll() {
    //     try {
    //         boolean result = commentService.deleteAll();
    //         if (result)
    //             return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    //         else
    //             return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
    //     } catch (Exception e) {
    //         log.error("Error in deleteAll", e);
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

}