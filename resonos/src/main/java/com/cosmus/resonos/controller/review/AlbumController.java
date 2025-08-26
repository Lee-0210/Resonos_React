package com.cosmus.resonos.controller.review;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.cosmus.resonos.domain.review.Album;
import com.cosmus.resonos.domain.review.ChartElement;
import com.cosmus.resonos.domain.review.LikedAlbum;
import com.cosmus.resonos.service.review.AlbumService;
import com.cosmus.resonos.service.review.combinedServ.CombinedAlbumService;
import com.cosmus.resonos.validation.ReviewForm;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/albums")
@AllArgsConstructor
public class AlbumController {

    private final AlbumService albumService;
    private final CombinedAlbumService combinedAlbumService;

    // 앨범 초기페이지 로딩
    @GetMapping
    public ResponseEntity<?> albumInfo(@RequestParam("id") String albumId,
                                @AuthenticationPrincipal CustomUser user) {
                                    
        return combinedAlbumService.albumInfo(albumId, user);
    }

    // 앨범 좋아요시 좋아요 여부와 좋아요 수 리턴
    @PostMapping("/like")
    public ResponseEntity<?> toggleAlbumLike(@RequestBody LikedAlbum dto) throws Exception {

        return combinedAlbumService.toggleAlbumLike(dto);
    }

    // 앨범 리뷰 작성 작성후에 리뷰와 갱신된 점수 리턴
    @PostMapping("/reviews")
    public ResponseEntity<?> albumReviewPost(@RequestParam("id") String albumId, @RequestBody ReviewForm form,
            @AuthenticationPrincipal CustomUser user) {

        return combinedAlbumService.albumReviewPost(albumId, form, user);
    }

    // 리뷰 더보기 hasNext boolean 값, 리뷰 리스트 리턴
    @GetMapping("/reviews/more")
    public ResponseEntity<?> loadMoreReviews(@RequestParam("id") String albumId,
            @RequestParam(name = "page", defaultValue = "1") int page,
            // @RequestParam(name = "size", defaultValue = "10") int size,
            @AuthenticationPrincipal CustomUser user) throws Exception {

        return combinedAlbumService.loadMoreReviews(albumId, page, 10, user);
    }

    // 리뷰 수정
    // 폼에 리뷰아이디넣어야함
    @PutMapping("/reviews")
    // @PreAuthorize("@reviewAuth.isAuthorOrAdmin(#p1, 'ALBUM', authentication)")
    public ResponseEntity<?> update(@RequestParam("id") String albumId, @RequestBody ReviewForm form) {

        return combinedAlbumService.update(albumId, form.getId(), form);
    }

    // 리뷰 삭제 삭제 후 변경된 점수 리턴
    @DeleteMapping("/reviews/{reviewId}")
    // @PreAuthorize("@reviewAuth.isAuthorOrAdmin(#p1, 'ALBUM', authentication)")
    public ResponseEntity<?> delete(@RequestParam("id") String albumId,
                                @PathVariable("reviewId") Long reviewId) {

        return combinedAlbumService.delete(albumId, reviewId);
    }

    // 리뷰 좋아요 좋아요 시 변경된 값 리턴
    @PostMapping("/reviews/{reviewId}")
    public ResponseEntity<?> toggleReviewLike(@PathVariable("reviewId") Long reviewId,
            @AuthenticationPrincipal CustomUser user) {

        return combinedAlbumService.toggleReviewLike(reviewId, user);
    }

    // 리뷰 신고 신고후 신고 누적수 리턴
    @PostMapping("/report/{reviewId}")
    public ResponseEntity<?> reportReview(@PathVariable("reviewId") Long reviewId
                                , @AuthenticationPrincipal CustomUser user) {
        return combinedAlbumService.reportReview(reviewId, user);
    }

    // 6요소 투표, 6요소의 평균값, 유저의 투표 값 리턴
    @PostMapping("/vote")
    public ResponseEntity<?> saveOrUpdateVote(@RequestParam("id") String albumId ,@RequestBody ChartElement element,
                                    @AuthenticationPrincipal CustomUser user) {
        return combinedAlbumService.saveOrUpdateVote(albumId, element, user);
    }


    /**
     * 비동기 좋아요 한 앨범(키워드 검색)
     *
     * @param data
     * @return
     * @throws Exception
     */
    @PostMapping("/search")
    public ResponseEntity<?> searchMyAlbums(
            @RequestBody Map<String, Object> data) throws Exception {
        Long userId = Long.valueOf(data.get("userId").toString());
        String keyword = data.get("keyword").toString();
        int offset = Integer.parseInt(data.get("offset").toString());
        int limit = Integer.parseInt(data.get("limit").toString());

        List<Album> albumList = albumService.likedAlbums(userId, keyword, offset, limit);
        if (albumList != null)
            return new ResponseEntity<>(albumList, HttpStatus.OK);

        return new ResponseEntity<>("서버 오류.", HttpStatus.INTERNAL_SERVER_ERROR);

    }
}
