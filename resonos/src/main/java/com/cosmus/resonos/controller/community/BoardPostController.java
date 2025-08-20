package com.cosmus.resonos.controller.community;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.community.BoardPost;
import com.cosmus.resonos.domain.community.Comment;
import com.cosmus.resonos.service.badge.BadgeGrantService;
import com.cosmus.resonos.service.community.BoardPostService;
import com.cosmus.resonos.service.community.CommentService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/community")
public class BoardPostController {

    @Autowired
    private BoardPostService boardPostService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private BadgeGrantService badgeGrantService;


    public BoardPostController(BoardPostService boardPostService) {
        this.boardPostService = boardPostService;
    }

    // @GetMapping
    // public ResponseEntity<?> getAllPosts() {
    //     try {
    //         List<BoardPost> posts = boardPostService.list();
    //         return ResponseEntity.ok(posts);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(500).build();
    //     }
    // }

    @GetMapping("/boards/{communityId}/posts/{postId}")
    public ResponseEntity<?> getPost(
        @PathVariable("communityId") Long communityId,
        @PathVariable("postId") Long postId
    ) {
        Map<String, Object> response = new HashMap<>();
        try {
            // 게시글 + 좋아요/싫어요 수
            BoardPost post = boardPostService.selectWithLikesDislikes(communityId, postId);
            if (post == null) {
                return ResponseEntity.notFound().build();
            }
            response.put("post", post);

            // 댓글 + 좋아요/싫어요 수
            // 댓글 리스트 반환 (각 댓글에 작성자, 내용, 작성일, 좋아요/싫어요 수 포함)
            List<Comment> comments = commentService.selectWithLikesDislikes(postId);
            response.put("comments", comments);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
        
    @PostMapping("/create/boards/{communityId}")
    public ResponseEntity<?> create(
        @PathVariable("communityId") Long communityId,
        @RequestBody BoardPost request,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        try {
            BoardPost boardPost = new BoardPost();
            boardPost.setTitle(request.getTitle());
            boardPost.setContent(request.getContent());
            boardPost.setCommunityId(communityId);

            if (loginUser != null) {
                boardPostService.createPost(boardPost, loginUser);
            } else {
                boardPost.setGuestNickname(request.getGuestNickname());
                boardPost.setGuestPassword(request.getGuestPassword());
                boardPostService.createPost(boardPost, null);
            }

            return new ResponseEntity<>(boardPost, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("게시글 작성 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    // @PutMapping("/{id}")
    // public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody BoardPost post) {
    //     try {
    //         post.setId(id);
    //         boolean success = boardPostService.update(post);
    //         if (success) {
    //             return ResponseEntity.ok("Board post updated");
    //         }
    //         return ResponseEntity.status(500).body("Failed to update board post");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(500).body("Failed to update board post: " + e.getMessage());
    //     }
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deletePost(@PathVariable Long id) {
    //     try {
    //         boolean success = boardPostService.delete(id);
    //         if (success) {
    //             return ResponseEntity.ok("Board post deleted");
    //         }
    //         return ResponseEntity.status(500).body("Failed to delete board post");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(500).body("Failed to delete board post: " + e.getMessage());
    //     }
    // }

    // 커뮤니티별 게시글 목록 조회
    // @GetMapping("/community/{communityId}")
    // public ResponseEntity<?> getPostsByCommunity(@PathVariable Long communityId) {
    //     try {
    //         List<BoardPost> posts = boardPostService.findByCommunity(communityId);
    //         return ResponseEntity.ok(posts);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(500).build();
    //     }
    // }
}
