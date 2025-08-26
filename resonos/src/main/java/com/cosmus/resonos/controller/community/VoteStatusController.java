package com.cosmus.resonos.controller.community;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.Pagination;
import com.cosmus.resonos.domain.community.ComVote;
import com.cosmus.resonos.domain.community.VoteStatus;
import com.cosmus.resonos.service.community.BoardPostService;
import com.cosmus.resonos.service.community.VoteStatusService;
import com.github.pagehelper.PageInfo;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/vote_status")
public class VoteStatusController {

    @Autowired
    private VoteStatusService voteStatusService;

    @GetMapping()
    public ResponseEntity<?> getAll(
        @RequestParam(value ="page", defaultValue = "1", required = false) int page,
        @RequestParam(value ="size", defaultValue = "10", required = false) int size,
        @ModelAttribute Pagination pagination
    ) {
        try {
            PageInfo<VoteStatus> pageInfo = voteStatusService.list(page, size);
            pagination.setPage(page);
            pagination.setSize(size);
            pagination.setTotal(pageInfo.getTotal());

            Map<String, Object> response = new HashMap<>();
            List<VoteStatus> list = pageInfo.getList();
            response.put("list", list);
            response.put("pagination", pagination);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error in getAll", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Long id) {
        try {
            VoteStatus entity = voteStatusService.selectById(String.valueOf(id));
            if (entity == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(entity, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error in getOne", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Autowired
    private BoardPostService boardPostService;

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody VoteStatus entity) {
        try {
            boolean result = voteStatusService.insert(entity);
            Map<String, Object> response = new HashMap<>();

            Long postId = voteStatusService.getPostIdByArgId(entity.getArgId());

            List<ComVote> votes = boardPostService.getVotesByPostId(postId);
            for (ComVote vote : votes) {
                vote.setPostId(postId);
            }
            // response.put("votes", entity);
            response.put("vote", votes);

            if (result) {
                response.put("status", "SUCCESS");
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            } else {
                response.put("status", "FAIL");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("Error in create", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping()
    public ResponseEntity<?> update(@RequestBody VoteStatus entity) {
        try {
            boolean result = voteStatusService.updateById(entity);
            if (result)
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Error in update", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable("id") Long id) {
        try {
            boolean result = voteStatusService.deleteById(String.valueOf(id));
            if (result)
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Error in destroy", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 전체 삭제
    @DeleteMapping("/all")
    public ResponseEntity<?> deleteAll() {
        try {
            boolean result = voteStatusService.deleteAll();
            if (result)
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Error in deleteAll", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}