package com.cosmus.resonos.service.community;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.community.BoardPost;
import com.cosmus.resonos.domain.community.ComVote;
import com.cosmus.resonos.domain.community.ComVoteArgument;
import com.cosmus.resonos.domain.community.VoteResult;
import com.cosmus.resonos.mapper.community.BoardPostMapper;
import com.cosmus.resonos.mapper.community.ComVoteMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardPostServiceImpl implements BoardPostService {

    @Autowired
    private BoardPostMapper boardPostMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ComVoteService comVoteService;

    @Autowired
    private ComVoteMapper comVoteMapper;

    public BoardPostServiceImpl(BoardPostMapper boardPostMapper) {
        this.boardPostMapper = boardPostMapper;
    }

    @Override
    public List<BoardPost> list() throws Exception {
        return boardPostMapper.list();
    }

    @Override
    public BoardPost select(Long id) throws Exception {
        return boardPostMapper.select(id);
    }

    @Override
    public boolean insert(BoardPost post) throws Exception {
        return boardPostMapper.insert(post) > 0;
    }

    @Override
    public boolean update(BoardPost post) throws Exception {
        return boardPostMapper.update(post) > 0;
    }

    @Override
    public boolean delete(Long id) throws Exception {
        return boardPostMapper.delete(id) > 0;
    }

    @Override
    public List<BoardPost> findByCommunity(Long communityId) throws Exception {
        return boardPostMapper.findByCommunity(communityId);
    }
    @Override
    public int countAll() throws Exception {
        return boardPostMapper.countAll();
    }

    @Override
    public BoardPost selectWithLikesDislikes(Long communityId, Long postId, Long userId) throws Exception {
        return boardPostMapper.selectWithLikesDislikes(communityId, postId, userId);
    }

    // 커뮤 main
    @Override
    public List<BoardPost> getHotPosts(int limit) {
        return boardPostMapper.selectHotPosts(limit);
    }

    @Override
    public PageInfo<BoardPost> list(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        return new PageInfo<>(boardPostMapper.selectAll());
    }

    @Override
    public PageInfo<BoardPost> getPopularPosts(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        return new PageInfo<>(boardPostMapper.selectPopularPosts());
    }

    @Override
    public PageInfo<BoardPost> getRealTimePopularPosts(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<BoardPost> list = boardPostMapper.selectRealTimePopularPosts(); // null 체크
        return new PageInfo<>(list);
    }

    @Override
    public PageInfo<BoardPost> searchPosts(String query, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        return new PageInfo<>(boardPostMapper.searchPosts(query));
    }

    @Override
    public PageInfo<BoardPost> listByCategoryId(Long categoryId, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        return new PageInfo<>(boardPostMapper.selectByCategoryId(categoryId));
    }

    @Override
    public List<BoardPost> getNoticesByCategoryId(Long categoryId, int limit) {
        return boardPostMapper.selectNoticesByCategoryId(categoryId, limit);
    }

    @Override
    public boolean setTrack(Long postId, Long trackId) throws Exception {
        return boardPostMapper.setTrack(postId, trackId);
    }

    @Override
    public boolean setThumbnailUrl(Long postId, String thumbnailUrl) throws Exception {
        return boardPostMapper.setThumbnailUrl(postId, thumbnailUrl);
    }

    @Override
    public int getCommentCount(Long postId) throws Exception {
        return boardPostMapper.getCommentCount(postId);
    }

    @Override
    public PageInfo<BoardPost> listByCommunityId(Long communityId, int page, int size) throws Exception {
        PageHelper.startPage(page, size); // PageHelper 적용
        List<BoardPost> posts = boardPostMapper.listByCommunityId(communityId);
        return new PageInfo<>(posts);
    }

    @Override
    public PageInfo<BoardPost> getNoticesByCommunityId(Long communityId, int page, int size) throws Exception {
        PageHelper.startPage(page, size); // PageHelper 적용
        List<BoardPost> posts = boardPostMapper.getNoticesByCommunityId(communityId);
        return new PageInfo<>(posts);
    }

    @Override
    public List<BoardPost> getAllPosts() throws Exception {
        return boardPostMapper.getAllPosts();
    }

    // vote 
    @Override
    public List<ComVote> getVotesByPostId(Long postId) throws Exception {
        return boardPostMapper.findVotesByPostId(postId);
    }

    @Override
    public List<ComVoteArgument> getArgumentsByVoteId(Long voteId) throws Exception {
        return boardPostMapper.findArgumentsByVoteId(voteId);
    }

    @Override
    public int getVoteCountByArgumentId(Long argId) throws Exception {
        return boardPostMapper.countVoteResults(argId);
    }


    @Override
    public Map<String, Object> getVotesWithResultsByPostId(Long postId) throws Exception {
        Map<String, Object> result = new HashMap<>();

        // 1. 해당 게시글 투표 리스트 조회
        List<ComVote> votes = boardPostMapper.findVotesByPostId(postId);
        List<Map<String, Object>> voteList = new ArrayList<>();

        for (ComVote vote : votes) {
            Map<String, Object> voteMap = new HashMap<>();
            voteMap.put("id", vote.getId());
            voteMap.put("title", vote.getTitle());
            // voteMap.put("isCompleted", vote.isCompleted());

            // 2. 각 투표별 선택지 조회
            List<ComVoteArgument> arguments = boardPostMapper.findArgumentsByVoteId(vote.getId());
            List<Map<String, Object>> argList = new ArrayList<>();

            for (ComVoteArgument arg : arguments) {
                Map<String, Object> argMap = new HashMap<>();
                argMap.put("id", arg.getId());
                argMap.put("content", arg.getContent());

                // 3. 선택지별 투표 수 조회
                int count = boardPostMapper.countVoteResults(arg.getId());
                argMap.put("voteCount", count);

                argList.add(argMap);
            }

            voteMap.put("arguments", argList);
            voteList.add(voteMap);
        }

        result.put("postId", postId);
        result.put("votes", voteList);

        return result;
    }

    @Override
    public BoardPost selectById(String id) throws Exception {
        return boardPostMapper.selectById(id);
    }

    @Override
    public boolean updateById(BoardPost boardPost) throws Exception {
        return boardPostMapper.updateById(boardPost) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception {
        return boardPostMapper.deleteById(id) > 0;
    }

    @Override
    @Transactional
    public void createPost(BoardPost boardPost, CustomUser loginUser, ComVote vote, List<ComVoteArgument> arguments, Boolean voteActive) throws Exception {
        if (loginUser != null) {
            if (boardPost.getTitle() == null || boardPost.getTitle().isBlank()) {
                throw new IllegalArgumentException("제목을 입력하세요.");
            }
            if (boardPost.getContent() == null || boardPost.getContent().isBlank()) {
                throw new IllegalArgumentException("내용을 입력하세요.");
            }
            boardPost.setUserId(loginUser.getId());
            boardPost.setGuestNickname(null);
            boardPost.setGuestPassword(null);
            boardPost.setUserNickname(loginUser.getUser().getNickname());
        } else {
            if (boardPost.getGuestNickname() == null || boardPost.getGuestNickname().isBlank()) {
                throw new IllegalArgumentException("닉네임을 입력하세요.");
            }
            if (boardPost.getGuestPassword() == null || boardPost.getGuestPassword().isBlank()) {
                throw new IllegalArgumentException("비밀번호를 입력하세요.");
            }
            if (boardPost.getTitle() == null || boardPost.getTitle().isBlank()) {
                throw new IllegalArgumentException("제목을 입력하세요.");
            }
            if (boardPost.getContent() == null || boardPost.getContent().isBlank()) {
                throw new IllegalArgumentException("내용을 입력하세요.");
            }
            boardPost.setUserId(null);
            boardPost.setGuestPassword(passwordEncoder.encode(boardPost.getGuestPassword()));
        }
        boardPostMapper.insert(boardPost);
        boardPost.setCreatedAt(new Date());
        if (Boolean.TRUE.equals(voteActive)) {
            if (vote == null) {
                throw new IllegalArgumentException("투표 정보를 입력하세요.");
            }
            if (vote.getTitle() == null || vote.getTitle().isBlank()) {
                throw new IllegalArgumentException("투표 제목을 입력하세요.");
            }
            if (vote.getClosedAt() == null) {
                throw new IllegalArgumentException("투표 종료일을 입력하세요.");
            }
            if (arguments == null || arguments.isEmpty()) {
                throw new IllegalArgumentException("투표 항목을 모두 입력하세요.");
            }
            for (ComVoteArgument arg : arguments) {
                if (arg.getContent() == null || arg.getContent().isBlank()) {
                    throw new IllegalArgumentException("투표 항목의 내용을 모두 입력하세요.");
                }
            }
            vote.setPostId(boardPost.getId()); // 게시글 id 연결
            comVoteMapper.insert(vote);
            comVoteService.createVoteWithArguments(vote, arguments);
        }
    }

    @Override
    public boolean checkGuestPassword(BoardPost boardPost, String rawPassword) throws Exception {
        if (boardPost.getGuestPassword() == null) return false;
        return passwordEncoder.matches(rawPassword, boardPost.getGuestPassword());
    }

    @Override
    public boolean incrementViewCount(Long id) throws Exception {
        return boardPostMapper.incrementViewCount(id) > 0;
    }

    // vote 
    @Override
    @Transactional
    public boolean submitVote(Long argId, Long userId, String guestId) throws Exception {
        try {
            // 1. 중복 투표 확인
            if (hasUserVoted(argId, userId, guestId)) {
                throw new Exception("이미 투표하셨습니다.");
            }
            
            // 2. 투표 선택지 존재 여부 확인
            List<ComVoteArgument> arguments = boardPostMapper.findArgumentsByVoteId(argId);
            if (arguments == null || arguments.isEmpty()) {
                throw new Exception("존재하지 않는 투표 선택지입니다.");
            }
            
            // 3. 투표 기록 저장
            VoteResult voteResult = new VoteResult();
            voteResult.setArgId(argId);
            voteResult.setVoteId(userId);
            voteResult.setCount(1);
            voteResult.setCreatedAt(new Date());
            
            int result = boardPostMapper.insertVoteResult(voteResult);
            return result > 0;
            
        } catch (Exception e) {
            log.error("투표 처리 실패: argId={}, userId={}, guestId={}", argId, userId, guestId, e);
            throw e;
        }
    }

    @Override
    public boolean hasUserVoted(Long argId, Long userId, String guestId) throws Exception {
        try {
            int count = boardPostMapper.checkUserVoteExists(argId, userId, guestId);
            return count > 0;
            
        } catch (Exception e) {
            log.error("투표 이력 확인 실패: argId={}, userId={}, guestId={}", argId, userId, guestId, e);
            throw e;
        }
    }

    @Override
    @Transactional
    public boolean cancelVote(Long argId, Long userId, String guestId) throws Exception {
        try {
            int result = boardPostMapper.deleteVoteResult(argId, userId, guestId);
            return result > 0;
            
        } catch (Exception e) {
            log.error("투표 취소 실패: argId={}, userId={}, guestId={}", argId, userId, guestId, e);
            throw e;
        }
    }



}
