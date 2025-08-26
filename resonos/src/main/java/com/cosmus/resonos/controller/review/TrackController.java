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
import com.cosmus.resonos.domain.review.LikedTrack;
import com.cosmus.resonos.domain.review.Track;
import com.cosmus.resonos.domain.review.TrackMoodVote;
import com.cosmus.resonos.service.review.TrackService;
import com.cosmus.resonos.service.review.combinedServ.CombinedTrackService;
import com.cosmus.resonos.validation.ReviewForm;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/tracks")
public class TrackController {

    private final TrackService trackService;
    private final CombinedTrackService combinedTrackService;

    // 트랙 화면
    @GetMapping
    public ResponseEntity<?> trackInfo(@RequestParam("id") String trackId, @AuthenticationPrincipal CustomUser user) {

        return combinedTrackService.trackPage(trackId, user);
    }

    // 트랙 리뷰 작성 후 리뷰와 점수 리턴
    @PostMapping("/reviews")
    public ResponseEntity<?> trackReviewPost(@RequestParam("id") String trackId,@RequestBody ReviewForm f,
                        @AuthenticationPrincipal CustomUser user) {

        return combinedTrackService.reviewPost(trackId, f, user);
    }

    // 리뷰 더보기
    @GetMapping("/more")
    public ResponseEntity<?> loadMoreReviews(@RequestParam("id") String trackId,
            @RequestParam(name = "page", defaultValue = "1") int page,
            // @RequestParam(name = "size", defaultValue = "10") int size,
            @AuthenticationPrincipal CustomUser principal) {

        return combinedTrackService.loadMoreReviews(trackId, page, 10, principal);
    }

    // 리뷰 수정시 업데이트된 리뷰와 점수리턴
    @PutMapping("/reviews")
    public ResponseEntity<?> reviewUpdate(@RequestParam("id") String trackId, @RequestBody ReviewForm form) {
        // 폼의 아이디는 리뷰아이디
        return combinedTrackService.reviewUpdate(form.getId(), form, trackId);
    }

    // 리뷰 삭제시 트랙 점수 새로 리턴
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<?> deleteAndRefresh(@RequestParam("id") String trackId, @PathVariable("reviewId") Long reviewId ) {

        return combinedTrackService.reviewDelete(reviewId, trackId);
    }

    // 트랙 리뷰 좋아요시 좋아요 여부와 좋아요 수 리턴
    @PostMapping("/reviews/{reviewId}")
    public ResponseEntity<?> toggleReviewLike(@PathVariable("reviewId") Long reviewId
                                , @AuthenticationPrincipal CustomUser user) {
        return combinedTrackService.reviewLike(reviewId, user);
    }

    // 트랙 리뷰 신고시 신고수 리턴
    @PostMapping("/report/{reviewId}")
    public ResponseEntity<?> reportReview(@PathVariable("reviewId") Long reviewId
                                , @AuthenticationPrincipal CustomUser user) {

        return combinedTrackService.reportReview(reviewId, user);
    }

    // 트랙 분위기 투표
    @PostMapping("/vote")
    public ResponseEntity<?> voteMood(@RequestBody TrackMoodVote request) {

        return combinedTrackService.voteMood(request);
    }

    // 트랙 좋아요시 좋아요 여부와 좋아요 수 리턴
    @PostMapping("/like")
    public ResponseEntity<?> toggleTrackLike(@RequestBody LikedTrack dto) {
        return combinedTrackService.toggleTrackLike(dto);
    }

    // 플레이리스트에 해당 트랙 추가
    @PostMapping("/playlists/{playlistId}")
    public ResponseEntity<?> addTrackToPlaylist(@PathVariable("playlistId") Long playlistId, @RequestParam("id") String id
                                , @AuthenticationPrincipal CustomUser user) {

        return combinedTrackService.addTrackToPlaylist(playlistId, id, user);
    }




    /**
     * 비동기 좋아요 한 트랙 검색
     *
     * @param data
     * @return
     * @throws Exception
     */
    @PostMapping("/search")
    public ResponseEntity<?> searchMyTracks(
            @RequestBody Map<String, Object> data) throws Exception {
        Long userId = Long.valueOf(data.get("userId").toString());
        String keyword = data.get("keyword").toString();
        int offset = Integer.parseInt(data.get("offset").toString());
        int limit = Integer.parseInt(data.get("limit").toString());

        List<Track> trackList = trackService.likedTracks(userId, keyword, offset, limit);
        if (trackList != null)
            return new ResponseEntity<>(trackList, HttpStatus.OK);

        return new ResponseEntity<>("서버 오류.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
