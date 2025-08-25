package com.cosmus.resonos.controller.community;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.Pagination;
import com.cosmus.resonos.domain.community.BoardPost;
import com.cosmus.resonos.domain.community.Comment;
import com.cosmus.resonos.service.community.BoardPostService;
import com.cosmus.resonos.service.community.CommentService;
import com.github.pagehelper.PageInfo;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/community")
public class BoardPostController {

    @Autowired
    private BoardPostService boardPostService;

    @Autowired
    private CommentService commentService;

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
        @PathVariable("postId") Long postId,
        @AuthenticationPrincipal CustomUser loginUser,
        HttpServletRequest request,
        HttpServletResponse response,
        HttpSession session,
        @RequestParam(value = "page", defaultValue = "1") int page,
        @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Map<String, Object> postWithComments = new HashMap<>();
        try {
            Long userId = (loginUser != null) ? loginUser.getId() : null;

            // 게시글 + 좋아요/싫어요 수
            BoardPost post = boardPostService.selectWithLikesDislikes(communityId, postId, userId);
            if (post == null) {
                return ResponseEntity.notFound().build();
            }

            // 조회수 증가
            if (loginUser != null) {
                // 로그인 유저 → 세션 활용
                Set<Long> viewedPost = (Set<Long>) session.getAttribute("viewedPost");
                if (viewedPost == null) {
                    viewedPost = new HashSet<>();
                    session.setAttribute("viewedPost", viewedPost);
                }

                if (!viewedPost.contains(postId)) {
                    boardPostService.incrementViewCount(postId);
                    viewedPost.add(postId);
                }
            } else {
                // 비로그인 유저 → 쿠키 활용
                Cookie[] cookies = request.getCookies();
                String viewed = null;
                if (cookies != null) {
                    for (Cookie cookie : cookies) {
                        if ("viewedPost".equals(cookie.getName())) {
                            try {
                                viewed = URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);
                            } catch (Exception e) {
                                viewed = "";
                            }
                            break;
                        }
                    }
                }

                // 이미 조회했는지 확인
                boolean alreadyViewed = viewed != null && Arrays.asList(viewed.split("\\|")).contains(postId.toString());

                if (!alreadyViewed) {
                    boardPostService.incrementViewCount(postId);
                    String newValue = (viewed == null || viewed.isEmpty() ? "" : viewed + "|") + postId;
                    Cookie newCookie = new Cookie("viewedPost", URLEncoder.encode(newValue, StandardCharsets.UTF_8));
                    newCookie.setPath("/");
                    newCookie.setMaxAge(60 * 60); // 1시간동안 조회수 중복 카운팅 방지
                    response.addCookie(newCookie);
                }

            }
            postWithComments.put("post", post);

            // 댓글 + 좋아요/싫어요 수
            // 댓글 리스트 반환 (각 댓글에 작성자, 내용, 작성일, 좋아요/싫어요 수 포함)
            // List<Comment> comments = commentService.selectWithLikesDislikes(postId);
            // List<Comment> pagedComments = commentsWithPageInfo.getList();
            // log.info("" + commentsWithPageInfo);
            // commentsPagination.setTotal(boardPostService.getCommentCount(postId));
            // postWithComments.put("pagedComments", pagedComments);
            PageInfo<Comment> comments = commentService.selectWithLikesDislikes(postId, userId, page, size);
            Pagination commentsPagination = new Pagination(comments);
            postWithComments.put("comments", comments.getList());
            postWithComments.put("commentsPagination", commentsPagination);

            return new ResponseEntity<>(postWithComments, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create/boards/{communityId}")
    public ResponseEntity<?> createPost(
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



    @PutMapping("/edit/boards/{communityId}/posts/{postId}")
    public ResponseEntity<?> updatePost(
        @PathVariable("communityId") Long communityId,
        @PathVariable("postId") Long postId,
        @RequestBody BoardPost request,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        try {
            BoardPost boardPost = boardPostService.select(postId);

            if (boardPost == null) return new ResponseEntity<>("게시글이 없습니다.", HttpStatus.NOT_FOUND);

            if (loginUser != null) {
                if (boardPost.getUserId() != null && !loginUser.getId().equals(boardPost.getUserId())) {
                    return new ResponseEntity<>("수정 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
                }
                else if (boardPost.getUserId() == null && (request.getGuestPassword() == null ||
                    !boardPostService.checkGuestPassword(boardPost, request.getGuestPassword()))) {
                    return new ResponseEntity<>("비밀번호가 다릅니다.", HttpStatus.UNAUTHORIZED);
                }
            } else {
                if (boardPost.getUserId() != null) {
                    return new ResponseEntity<>("수정 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
                }
                if (request.getGuestPassword() == null ||
                    !boardPostService.checkGuestPassword(boardPost, request.getGuestPassword())) {
                    return new ResponseEntity<>("비밀번호가 다릅니다.", HttpStatus.UNAUTHORIZED);
                }
            }

            boardPost.setTitle(request.getTitle());
            boardPost.setContent(request.getContent());
            boolean result = boardPostService.update(boardPost);
            return result ? new ResponseEntity<>(boardPost, HttpStatus.OK)
                          : new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("게시글 수정 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/edit/boards/{communityId}/posts/{postId}")
    public ResponseEntity<?> deletePost(
        @PathVariable("communityId") Long communityId,
        @PathVariable("postId") Long postId,
        @RequestBody(required = false) BoardPost request,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        try {
            BoardPost boardPost = boardPostService.select(postId);
            
            if (boardPost == null) return new ResponseEntity<>("게시글이 없습니다.", HttpStatus.NOT_FOUND);

            if (loginUser != null) {
                if (boardPost.getUserId() != null && !loginUser.getId().equals(boardPost.getUserId())) {
                    return new ResponseEntity<>("삭제 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
                }
                else if (boardPost.getUserId() == null && (request.getGuestPassword() == null ||
                    !boardPostService.checkGuestPassword(boardPost, request.getGuestPassword()))) {
                    return new ResponseEntity<>("비밀번호가 다릅니다.", HttpStatus.UNAUTHORIZED);
                }
            } else {
                if (boardPost.getUserId() != null) {
                    return new ResponseEntity<>("삭제 권한이 없습니다.", HttpStatus.UNAUTHORIZED);
                }
                if (request.getGuestPassword() == null ||
                    !boardPostService.checkGuestPassword(boardPost, request.getGuestPassword())) {
                    return new ResponseEntity<>("비밀번호가 다릅니다.", HttpStatus.UNAUTHORIZED);
                }
            }

            boolean result = boardPostService.delete(postId);
            return result ? new ResponseEntity<>(boardPost, HttpStatus.OK)
                          : new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("게시글 삭제 실패", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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
