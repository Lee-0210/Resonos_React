package com.cosmus.resonos.service.community;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.community.Comment;
import com.cosmus.resonos.mapper.community.CommentMapper;
import com.github.pagehelper.PageInfo;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Comment> list() throws Exception{
        return commentMapper.list();
    }

    @Override
    public PageInfo<Comment> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Comment> list = commentMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Comment select(Long no) throws Exception{
        return commentMapper.select(no);
    }

    @Override
    public Comment selectById(String id) throws Exception{
        return commentMapper.selectById(id);
    }

    @Override
    public boolean insert(Comment entity) throws Exception{
        return commentMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Comment entity) throws Exception{
        return commentMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Comment entity) throws Exception{
        return commentMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return commentMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return commentMapper.deleteById(id) > 0;
    }

    @Override
    public boolean deleteAll() throws Exception {
        return commentMapper.deleteAll() > 0;
    }

    @Override
    public List<Comment> findByTarget(String type, Long targetId) throws Exception {
        return commentMapper.findByTarget(type, targetId);
    }

    @Override
    public List<Comment> selectWithLikesDislikes(Long postId) throws Exception {
        List<Comment> comments = commentMapper.selectWithLikesDislikes(postId);

        List<Comment> rootComments = new ArrayList<>();
        Map<Long, List<Comment>> repliesMap = new HashMap<>();

        for (Comment c : comments) {
            if (c.getParentCommentId() == null) {
                rootComments.add(c); // 최상위 댓글
            } else {
                repliesMap.computeIfAbsent(c.getParentCommentId(), k -> new ArrayList<>()).add(c); // 대댓글 모음
            }
        }

        for (Comment root : rootComments) {
            List<Comment> replies = repliesMap.getOrDefault(root.getId(), new ArrayList<>());
            replies.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt())); // 최신순 정렬
            root.setReplies(replies);
        }

        return rootComments;
    }

    @Override
    public void writeComment(Comment comment, CustomUser loginUser) throws Exception {
        if (loginUser != null) {
            // 로그인 상태 → userId 설정
            comment.setUserId(loginUser.getId());
            comment.setGuestNickname(null);
            comment.setGuestPassword(null);
        } else {
            // 비로그인 상태 → guest 정보 입력됨
            comment.setUserId(null);
            // guestPassword는 반드시 암호화해서 저장!
            comment.setGuestPassword(passwordEncoder.encode(comment.getGuestPassword()));
        }

        commentMapper.insert(comment);
    }
}