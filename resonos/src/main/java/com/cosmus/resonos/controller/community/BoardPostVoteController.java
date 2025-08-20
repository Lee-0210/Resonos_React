package com.cosmus.resonos.controller.community;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cosmus.resonos.service.community.BoardPostService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/community/posts")
public class BoardPostVoteController {

    @Autowired
    private BoardPostService boardPostService;

    // 투표 기능 임시
    @GetMapping("/{postId}/votes")
    public ResponseEntity<Map<String, Object>> getVotesByPost(@PathVariable Long postId) {
        try {
            Map<String, Object> response = boardPostService.getVotesWithResultsByPostId(postId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
