package com.cosmus.resonos.controller.community;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.community.LikesDislikes;
import com.cosmus.resonos.service.community.LikesDislikesService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/community/likes-dislikes/boards/{communityId}/posts/{postId}")
public class LikesDislikesController {

    @Autowired
    private LikesDislikesService likesDislikesService;

    // @GetMapping()
    // public ResponseEntity<?> getAll(
    //     @RequestParam(value ="page", defaultValue = "1", required = false) int page,
    //     @RequestParam(value ="size", defaultValue = "10", required = false) int size,
    //     @ModelAttribute Pagination pagination
    // ) {
    //     try {
    //         PageInfo<LikesDislikes> pageInfo = likesDislikesService.list(page, size);
    //         pagination.setPage(page);
    //         pagination.setSize(size);
    //         pagination.setTotal(pageInfo.getTotal());

    //         Map<String, Object> response = new HashMap<>();
    //         List<LikesDislikes> list = pageInfo.getList();
    //         response.put("list", list);
    //         response.put("pagination", pagination);

    //         return new ResponseEntity<>(response, HttpStatus.OK);
    //     } catch (Exception e) {
    //         log.error("Error in getAll", e);
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @GetMapping("/{id}")
    // public ResponseEntity<?> getOne(@PathVariable("id")Long id) {
    //     try {
    //         LikesDislikes entity = likesDislikesService.selectById(String.valueOf(id));
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
    public ResponseEntity<?> togglePostLikesDislikes(
        @PathVariable("postId") Long postId,
        @RequestBody LikesDislikes request,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        try {
            if (loginUser == null) return new ResponseEntity<>("로그인 후 좋아요/싫어요 평가가 가능합니다.", HttpStatus.UNAUTHORIZED);
            likesDislikesService.toggleReaction(loginUser.getId(), "post", postId, request.getIsLikes());
            Map<String, Integer> counts = likesDislikesService.getReactionCounts("post", postId);
            Map<String, Object> response = new HashMap<>();
            response.put("postId", postId);
            response.put("likes", counts.get("likes"));
            response.put("dislikes", counts.get("dislikes"));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("게시글 반응 남기기 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/comments/{commentId}")
    public ResponseEntity<?> toggleCommentLikesDislikes(
        @PathVariable("commentId") Long commentId,
        @RequestBody LikesDislikes request,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        try {
            if (loginUser == null) return new ResponseEntity<>("로그인 후 좋아요/싫어요 평가가 가능합니다.", HttpStatus.UNAUTHORIZED);
            likesDislikesService.toggleReaction(loginUser.getId(), "comment", commentId, request.getIsLikes());
            Map<String, Integer> counts = likesDislikesService.getReactionCounts("comment", commentId);
            Map<String, Object> response = new HashMap<>();
            response.put("commentId", commentId);
            response.put("likes", counts.get("likes"));
            response.put("dislikes", counts.get("dislikes"));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("댓글 반응 남기기 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @PutMapping()
    // public ResponseEntity<?> update(@RequestBody LikesDislikes entity) {
    //     try {
    //         boolean result = likesDislikesService.updateById(entity);
    //         if (result)
    //             return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    //         else
    //             return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
    //     } catch (Exception e) {
    //         log.error("Error in update", e);
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> destroy(@PathVariable("id") Long id) {
    //     try {
    //         boolean result = likesDislikesService.deleteById(String.valueOf(id));
    //         if (result)
    //             return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    //         else
    //             return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
    //     } catch (Exception e) {
    //         log.error("Error in destroy", e);
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // // 전체 삭제
    // @DeleteMapping("/all")
    // public ResponseEntity<?> deleteAll() {
    //     try {
    //         boolean result = likesDislikesService.deleteAll();
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