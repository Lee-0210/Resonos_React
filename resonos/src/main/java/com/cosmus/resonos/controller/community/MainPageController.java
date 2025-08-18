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
import com.cosmus.resonos.domain.community.CommunityCategory;
import com.cosmus.resonos.service.community.BoardPostService;
import com.cosmus.resonos.service.community.CommunityCategoryService;
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


            // 5. 게시판 순위 Top5
            List<CommunityCategory> topCategories = communityCategoryService.getTopCategories(5);
            response.put("topCategories", topCategories);

            // 6. 신설 게시판
            List<CommunityCategory> newCategories = communityCategoryService.getNewCategories(5);
            response.put("newCategories", newCategories);
            log.info("데이터 문제 없음");
          
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            log.error("getMainPageData Error: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 검색
    @GetMapping("/search")
    public ResponseEntity<?> search(
            @RequestParam("q") String query,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        try {
            Map<String, Object> response = new HashMap<>();

            PageInfo<CommunityCategory> catPage = communityCategoryService.searchCategories(query, page, size);
            response.put("searchedCategories", catPage.getList());
            response.put("categoryPagination", new Pagination(catPage));

            PageInfo<BoardPost> postPage = boardPostService.searchPosts(query, page, size);
            response.put("searchedPosts", postPage.getList());
            response.put("postPagination", new Pagination(postPage));

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            log.error("search Error: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 게시판 상세
    @GetMapping("/boards/{categoryId}")
    public ResponseEntity<?> getBoardDetail(
            @PathVariable Long categoryId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        try {
            CommunityCategory category = communityCategoryService.select(categoryId);
            if (category == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            PageInfo<BoardPost> postPage = boardPostService.listByCategoryId(categoryId, page, size);
            List<BoardPost> notices = boardPostService.getNoticesByCategoryId(categoryId, 5);

            Map<String, Object> response = new HashMap<>();
            response.put("categoryInfo", category);
            response.put("posts", postPage.getList());
            response.put("notices", notices);
            response.put("pagination", new Pagination(postPage));

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            log.error("getBoardDetail Error: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
