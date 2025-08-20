package com.cosmus.resonos.controller.community;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cosmus.resonos.domain.Pagination;
import com.cosmus.resonos.domain.community.BoardPost;
import com.cosmus.resonos.domain.community.Community;
import com.cosmus.resonos.domain.community.CommunityCategory;
import com.cosmus.resonos.service.community.BoardPostService;
import com.cosmus.resonos.service.community.CommunityCategoryService;
import com.cosmus.resonos.service.community.CommunityService;
import com.cosmus.resonos.service.user.UserService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/community")
public class MainPageController {

    @Autowired
    private BoardPostService boardPostService;

    @Autowired
    private CommunityCategoryService communityCategoryService;

    @Autowired
    private CommunityService communityService;

    @Autowired
    private UserService userService;

    // 메인 페이지 데이터
    @GetMapping("/")
    public ResponseEntity<?> getMainPageData(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

                log.info("요청 들어옴.");
        try {
            Map<String, Object> response = new HashMap<>();

            // 1. 주요뉴스
            response.put("hotPosts", boardPostService.getHotPosts(3));

            // 2. 최신글
            PageInfo<BoardPost> latestPage = boardPostService.list(page, size);
            response.put("latestPosts", latestPage.getList());
            response.put("latestPagination", new Pagination(latestPage));

            // 3. 인기글
            PageInfo<BoardPost> popularPage = boardPostService.getPopularPosts(page, size);
            response.put("popularPosts", popularPage.getList());
            response.put("popularPagination", new Pagination(popularPage));

            // 4. 실시간 인기글
            PageInfo<BoardPost> realTimePage = boardPostService.getRealTimePopularPosts(page, size);
            List<BoardPost> realTimePosts = realTimePage.getList() != null ? realTimePage.getList() : new ArrayList<>();
            response.put("realTimePopularPosts", realTimePosts);
            response.put("realTimePopularPagination", new Pagination(realTimePage));

            // 5. 카테고리 순위 Top5
            List<CommunityCategory> topCategories = communityCategoryService.getTopCategories(5);
            response.put("topCategories", topCategories);

            // 6. 카테고리 신설
            List<CommunityCategory> newCategories = communityCategoryService.getNewCategories(5);
            response.put("newCategories", newCategories);
            log.info("데이터 문제 없음");

            // 7. 게시판 순위 Top5 - communityService
            List<Community> topCommunities = communityService.getTopCommunities(5);
            response.put("topCommunities", topCommunities);

            // 8. 신설 게시판 - communityService
            List<Community> newCommunities = communityService.getNewCommunities(5);
            response.put("newCommunities", newCommunities);



            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            log.error("getMainPageData Error: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 검색
    @GetMapping("/search")
    public ResponseEntity<?> search(
            @RequestParam(value="query", required = false) String query,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "type", required = false) String type) {

        log.info("query: {}, type: {}", query, type);

        try {
            Map<String, Object> response = new HashMap<>();

            if ("board".equalsIgnoreCase(type)) {
                // 커뮤니티/카테고리 검색
                // PageInfo<CommunityCategory> catPage = communityCategoryService.searchCategories(query, page, size);
                // response.put("searchedCategories", catPage.getList());
                // response.put("categoryPagination", new Pagination(catPage));

                // 모든 커뮤니티 + 키워드 포함
                PageInfo<Community> commPage = communityService.searchCommunities(query, page, 9);
                response.put("searchedCommunities", commPage.getList());
                response.put("communityPagination", new Pagination(commPage));

                // 키워드 포함된 커뮤니티 개수 
                response.put("communityCount", commPage.getTotal());


            } else if ("post".equalsIgnoreCase(type)) {
                // 게시글 검색 + 키워드 포함
                PageInfo<BoardPost> postPage = boardPostService.searchPosts(query, page, size);
                response.put("searchedPosts", postPage.getList());
                response.put("postPagination", new Pagination(postPage));

            } else {
                // type 이 없는 경우는 더보기 전 페이지

                // 모든 커뮤니티 + pageinfo사용 + 키워드 포함 + 커뮤니티별 작성된 boardPost count 
                PageInfo<Community> commPage = communityService.searchCommunities2(query, page, size);
                response.put("searchedCommunities", commPage.getList());
                response.put("communityPagination", new Pagination(commPage));

                // 게시글 검색 + 키워드 포함
                PageInfo<BoardPost> postPage = boardPostService.searchPosts(query, page, size);
                response.put("searchedPosts", postPage.getList());
                response.put("postPagination", new Pagination(postPage));
            }

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            log.error("search Error: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 게시판 상세
    @GetMapping("/boards/{communityId}")
    public ResponseEntity<?> getBoardDetail(
            @PathVariable("communityId") Long communityId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        try {
            Community community = communityService.select(communityId);
            if (community == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            PageInfo<BoardPost> postPage = boardPostService.listByCommunityId(communityId, page, size);
            // List<BoardPost> notices = boardPostService.getNoticesByCommunityId(communityId, 5); // 페이지네이션 적용 
            PageInfo<BoardPost> noticePage = boardPostService.getNoticesByCommunityId(communityId, page, 5);

            Map<String, Object> response = new HashMap<>();
            response.put("posts", postPage.getList());
            response.put("notices", noticePage.getList());

            response.put("postPagination", new Pagination(postPage));
            response.put("noticePagination", new Pagination(noticePage));

            // 게시판 대표 음악 설정
            // 게시판 테이블 thumbnail_url 컬럼 추가
            // response.put("trackId", communityService.setTrack(categoryId, trackId));
            // response.put("thumbnailUrl", boardPostService.setThumbnailUrl(categoryId, thumbnailUrl));

            // 커뮤니티 정보 전달
            response.put("community", community);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            log.error("getBoardDetail Error: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
