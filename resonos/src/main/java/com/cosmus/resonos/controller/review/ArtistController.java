package com.cosmus.resonos.controller.review;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.review.Artist;
import com.cosmus.resonos.domain.review.ArtistFollow;
import com.cosmus.resonos.domain.review.ArtistMoodVote;
import com.cosmus.resonos.service.review.ArtistService;
import com.cosmus.resonos.service.review.combinedServ.CombinedArtistService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/artists")
public class ArtistController {


    private final ArtistService artistService;
    private final CombinedArtistService combinedArtistService;


    // 아티스트 초기 화면
    @GetMapping
    public ResponseEntity<?> artistInfo(@RequestParam("id") String artistId, @AuthenticationPrincipal CustomUser user) {
        return combinedArtistService.artistPageGet(artistId, user);
    }

    // 아티스트 좋아요시 좋아요여부와 좋아요 수 리턴
    @PostMapping("/toggle-like")
    public ResponseEntity<?> toggleArtistLike(@RequestBody ArtistFollow dto) throws Exception {
        
        return combinedArtistService.toggleArtistLike(dto.getUserId(), dto.getArtistId());
    }

    // 분위기 투표 유저 투표태그아이디 값과 분위기들 리턴
    @PostMapping("/vote-mood")
    public ResponseEntity<?> voteMood(@RequestBody ArtistMoodVote request) throws Exception {
        
        return combinedArtistService.voteMood(request);
    }
    

    /**
     * 비동기 팔로우 아티스트 검색
     * @param data
     * @return
     * @throws Exception
     */
    @PostMapping("/search")
    public ResponseEntity<?> searchMyAlbums(
        @RequestBody Map<String, Object> data
    ) throws Exception {
        Long userId = Long.valueOf(data.get("userId").toString());
        String keyword = data.get("keyword").toString();
        int offset = Integer.parseInt(data.get("offset").toString());
        int limit = Integer.parseInt(data.get("limit").toString());

        List<Artist> artistList = artistService.followingArtists(userId, keyword, offset, limit);
        if(artistList != null)
            return new ResponseEntity<>(artistList, HttpStatus.OK);

        return new ResponseEntity<>("서버 오류.", HttpStatus.INTERNAL_SERVER_ERROR);

    }

}
