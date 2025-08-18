package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Comment;
import com.cosmus.resonos.mapper.community.CommentMapper;
import com.github.pagehelper.PageInfo;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

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
    public List<Comment> selectWithLikesDislikes(Long communityId, Long postId) throws Exception {
        return commentMapper.selectWithLikesDislikes(communityId, postId);
    }
}