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
@RequestMapping("/community/boards/{communityId}/posts")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping()
    public ResponseEntity<?> getAll(
        @RequestParam(value ="page", defaultValue = "1", required = false) int page,
        @RequestParam(value ="size", defaultValue = "10", required = false) int size,
        @ModelAttribute Pagination pagination
    ) {
        try {
            PageInfo<Comment> pageInfo = commentService.list(page, size);
            pagination.setPage(page);
            pagination.setSize(size);
            pagination.setTotal(pageInfo.getTotal());

            Map<String, Object> response = new HashMap<>();
            List<Comment> list = pageInfo.getList();
            response.put("list", list);
            response.put("pagination", pagination);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error in getAll", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Long  id) {
        try {
            Comment entity = commentService.selectById(String.valueOf(id));
            if (entity == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(entity, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error in getOne", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{postId}")
    public ResponseEntity<?> create(
        @PathVariable("communityId") Long communityId,
        @PathVariable("postId") Long postId,
        @RequestBody Comment request,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        try {
            Comment comment = new Comment();
            comment.setContent(request.getContent());
            comment.setType("posts");
            comment.setTargetId(postId);

            if (loginUser != null) {
                // 로그인 상태
                commentService.writeComment(comment, loginUser);
            } else {
                // 비로그인 상태
                comment.setGuestNickname(request.getGuestNickname());
                comment.setGuestPassword(request.getGuestPassword()); // 암호화는 service에서 처리
                commentService.writeComment(comment, null);
            }

            return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("댓글 작성 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Comment entity) {
        try {
            boolean result = commentService.updateById(entity);
            if (result)
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Error in update", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable("id")  Long id) {
        try {
            boolean result = commentService.deleteById(String.valueOf(id));
            if (result)
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Error in destroy", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 전체 삭제
    @DeleteMapping("/all")
    public ResponseEntity<?> deleteAll() {
        try {
            boolean result = commentService.deleteAll();
            if (result)
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Error in deleteAll", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}