package com.cosmus.resonos.controller.community;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
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
import com.cosmus.resonos.domain.community.ComVote;
import com.cosmus.resonos.domain.community.ComVoteArgument;
import com.cosmus.resonos.domain.community.Comment;
import com.cosmus.resonos.service.community.BoardPostService;
import com.cosmus.resonos.service.community.ComVoteService;
import com.cosmus.resonos.service.community.CommentService;
import com.cosmus.resonos.validation.GuestCheck;
import com.github.pagehelper.PageInfo;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
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
    private ComVoteService comVoteService;

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
        log.info("communityId: {}, postId: {}", communityId, postId);
        Map<String, Object> postWithComments = new HashMap<>();
        try {
            List<ComVoteArgument> arguments = boardPostService.getArgumentsByVoteId(44L);
            log.info("arguments : {}", arguments);


            Long userId = (loginUser != null) ? loginUser.getId() : null;

            // 게시글 + 좋아요/싫어요 수 + 투표 정보 
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

            // 투표 정보 추가
            ComVote vote = post.getVote();
            if (vote != null) {
                vote.setArguments(arguments);
            }

            postWithComments.put("vote", post.getVote());


            return new ResponseEntity<>(postWithComments, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create/boards/{communityId}")
    public ResponseEntity<?> createPost(
        @PathVariable("communityId") Long communityId,
        @Validated @RequestBody BoardPost request,
        BindingResult bindingResult,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        log.info("request : {}", request);

        if (loginUser == null) {
            // 비회원 검증 시 GuestCheck 그룹 적용
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();

            validator.validate(request, GuestCheck.class)
                    .forEach(v -> bindingResult.addError(new FieldError(
                    "boardPost", v.getPropertyPath().toString(), v.getMessage())));
        }

        // voteActive true일 경우, 투표 객체 존재 여부 추가 검사
        if (Boolean.TRUE.equals(request.getVoteActive()) && request.getVote() == null) {
            bindingResult.addError(new FieldError("boardPost", "vote", "투표 정보를 입력하세요."));
        }

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        try {
            BoardPost boardPost = new BoardPost();
            boardPost.setTitle(request.getTitle());
            boardPost.setContent(request.getContent());
            boardPost.setCommunityId(communityId);
            boardPost.setVoteActive(request.getVoteActive());

            ComVote vote = request.getVote();
            List<ComVoteArgument> arguments = (vote != null) ? vote.getArguments() : null;

            // if (Boolean.TRUE.equals(request.getVoteActive()) && request.getVote() != null) {
            //     vote = request.getVote();
            //     arguments = vote.getArguments();
            // }

            if (loginUser != null) {
                boardPostService.createPost(boardPost, loginUser, vote, arguments, request.getVoteActive());
            } else {
                boardPost.setGuestNickname(request.getGuestNickname());
                boardPost.setGuestPassword(request.getGuestPassword());
                boardPostService.createPost(boardPost, null, vote, arguments, request.getVoteActive());
            }
            boardPost.setVote(vote);

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
        @Validated @RequestBody BoardPost request,
        BindingResult bindingResult,
        @RequestParam(value="voteId", required = false) Long voteId,
        @AuthenticationPrincipal CustomUser loginUser
    ) {
        try {
            BoardPost boardPost = boardPostService.select(postId);
            Boolean beforeVoteActive = boardPost.getVote() != null;
            Boolean afterVoteActive = request.getVoteActive();
            log.info("beforeVoteActive : " + beforeVoteActive);
            log.info("afterVoteActive : " + afterVoteActive);

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

            if (loginUser == null) {
                Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
                validator.validate(request, GuestCheck.class)
                        .forEach(v -> bindingResult.addError(new FieldError(
                        "boardPost", v.getPropertyPath().toString(), v.getMessage())));
            }

            if (Boolean.TRUE.equals(request.getVoteActive()) && request.getVote() == null) {
                bindingResult.addError(new FieldError("boardPost", "vote", "투표 정보를 입력하세요."));
            }

            if (bindingResult.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                bindingResult.getFieldErrors().forEach(error ->
                        errors.put(error.getField(), error.getDefaultMessage())
                );
                return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
            }

            boardPost.setTitle(request.getTitle());
            boardPost.setContent(request.getContent());
            boardPost.setVoteActive(request.getVoteActive());

            if (Boolean.FALSE.equals(beforeVoteActive) && Boolean.TRUE.equals(afterVoteActive)) {
                if (request.getVote() != null) {
                    request.getVote().setPostId(postId);
                    comVoteService.createVoteWithArguments(request.getVote(), request.getVote().getArguments());
                    boardPost.setVote(request.getVote());
                }
            }
            if (Boolean.TRUE.equals(beforeVoteActive) && Boolean.FALSE.equals(afterVoteActive)) {
                log.info("boardPost.getVote() : " + boardPost.getVote());
                log.info("request.getVote() : " + request.getVote());
                // 투표 비활성화 → 기존 투표 삭제
                if (boardPost.getVote() != null) {
                    comVoteService.deleteByPostId(postId);
                    boardPost.setVote(null);
                }
            }

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


// ===== 투표 관련 API 추가 =====

    // 게시글별 투표 목록 조회
    @GetMapping("/boards/{communityId}/posts/{postId}/votes")
    public ResponseEntity<?> getVotesByPost(@PathVariable Long postId) {
        try {
            List<ComVote> votes = boardPostService.getVotesByPostId(postId);
            return ResponseEntity.ok(votes);
        } catch (Exception e) {
            log.error("투표 목록 조회 실패", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "투표 목록 조회 중 오류가 발생했습니다."));
        }
    }

    // 투표 상세 정보 조회 (선택지 + 투표수 포함)
    @GetMapping("/votes/{voteId}/detail")
    public ResponseEntity<?> getVoteDetail(@PathVariable("voteId") Long voteId) {
        log.info("##############################################");
        log.info("voteId : {}", voteId);
        try {
            // 투표 선택지 목록
            List<ComVoteArgument> arguments = boardPostService.getArgumentsByVoteId(voteId);
            
            // 각 선택지별 투표수 조회
            Map<String, Object> response = new HashMap<>();
            response.put("voteId", voteId);
            
            for (ComVoteArgument arg : arguments) {
                int count = boardPostService.getVoteCountByArgumentId(arg.getId());
                // ComVoteArgument에 voteCount 필드가 있다고 가정하거나, Map으로 처리
            }
            
            response.put("arguments", arguments);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("투표 상세 조회 실패", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "투표 상세 조회 중 오류가 발생했습니다."));
        }
    }

    // 투표 결과 조회 (게시글 단위)
    @GetMapping("/boards/{communityId}/posts/{postId}/vote-results")
    public ResponseEntity<?> getVoteResults(@PathVariable Long postId) {
        try {
            Map<String, Object> results = boardPostService.getVotesWithResultsByPostId(postId);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            log.error("투표 결과 조회 실패", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "투표 결과 조회 중 오류가 발생했습니다."));
        }
    }

    // 특정 선택지의 투표수 조회
    @GetMapping("/vote-arguments/{argId}/count")
    public ResponseEntity<?> getVoteCount(@PathVariable Long argId) {
        try {
            int count = boardPostService.getVoteCountByArgumentId(argId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("argumentId", argId);
            response.put("voteCount", count);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("투표수 조회 실패", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "투표수 조회 중 오류가 발생했습니다."));
        }
    }

  
    // 투표 참여 (POST) - 실제 투표 기능
   @PostMapping("/vote-arguments/{argId}/vote")
    public ResponseEntity<?> submitVote(
        @PathVariable Long argId, 
        @RequestBody(required = false) Map<String, Object> voteData,
        @AuthenticationPrincipal CustomUser loginUser,
        HttpServletRequest request,
        HttpSession session
    ) {
        try {
            Long userId = (loginUser != null) ? loginUser.getId() : null;
            String sessionId = session.getId();
            
            // Service에서 중복 투표 확인 및 처리
            boolean voteSuccess = boardPostService.submitVote(argId, userId, sessionId);
            
            if (!voteSuccess) {
                return ResponseEntity.internalServerError()
                    .body(Map.of(
                        "success", false,
                        "error", "투표 처리에 실패했습니다."
                    ));
            }
            
            // 투표 후 최신 결과 반환
            int newCount = boardPostService.getVoteCountByArgumentId(argId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "투표가 완료되었습니다.");
            response.put("newCount", newCount);
            response.put("argumentId", argId);
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("투표 처리 실패: argId={}, userId={}", argId, 
                    (loginUser != null) ? loginUser.getId() : "guest", e);
            
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "error", "투표 처리 중 오류가 발생했습니다."));
        }
    }
    // 투표 취소
    @DeleteMapping("/vote-arguments/{argId}/vote")
    public ResponseEntity<?> cancelVote(
        @PathVariable Long argId,
        @AuthenticationPrincipal CustomUser loginUser,
        HttpSession session
    ) {
        try {
            Long userId = (loginUser != null) ? loginUser.getId() : null;
            String sessionId = session.getId();
            
            // Service에서 투표 이력 확인 및 취소 처리
            boolean cancelSuccess = boardPostService.cancelVote(argId, userId, sessionId);
            
            if (!cancelSuccess) {
                return ResponseEntity.internalServerError()
                    .body(Map.of(
                        "success", false,
                        "error", "투표 취소에 실패했습니다."
                    ));
            }
            
            // 취소 후 최신 투표수 반환
            int newCount = boardPostService.getVoteCountByArgumentId(argId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "투표가 취소되었습니다.");
            response.put("newCount", newCount);
            response.put("argumentId", argId);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("투표 취소 실패: argId={}, userId={}", argId, 
                    (loginUser != null) ? loginUser.getId() : "guest", e);

            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "error", "투표 취소 중 오류가 발생했습니다."));
        }
    }

    // 투표 수정 - 아직 미완성 
    @PutMapping("/vote-arguments/{argId}") 
    public ResponseEntity<?> updateVoteArgument( 
        @PathVariable Long argId,
        @RequestBody ComVoteArgument request
    ) {
        try {
            // 선택지 내용 업데이트
            ComVoteArgument argument = new ComVoteArgument();
            argument.setId(argId);
            argument.setContent(request.getContent());
            // 필요한 다른 필드들도 설정
            
            // 수정 로직 미작성 

            // 수정된 선택지 반환 (또는 성공 메시지)
            return ResponseEntity.ok(argument);
            
        } catch (Exception e) {
            log.error("투표 선택지 수정 실패: argId={}", argId, e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "투표 선택지 수정 중 오류가 발생했습니다."));
        }
    }





    // 실시간 투표 결과 조회 (WebSocket에서도 사용 가능) - 아직 구현 안됨
    // @GetMapping("/boards/{communityId}/posts/{postId}/live-vote-results")
    // public ResponseEntity<?> getLiveVoteResults(
    //     @PathVariable Long communityId,
    //     @PathVariable Long postId
    // ) {
    //     try {
    //         Map<String, Object> results = boardPostService.getVotesWithResultsByPostId(postId);
            
    //         // 실시간 업데이트를 위한 타임스탬프 추가
    //         results.put("timestamp", System.currentTimeMillis());
            
    //         return ResponseEntity.ok(results);
    //     } catch (Exception e) {
    //         log.error("실시간 투표 결과 조회 실패", e);
    //         return ResponseEntity.internalServerError()
    //             .body(Map.of("error", "실시간 투표 결과 조회 중 오류가 발생했습니다."));
    //     }
    // }





}
