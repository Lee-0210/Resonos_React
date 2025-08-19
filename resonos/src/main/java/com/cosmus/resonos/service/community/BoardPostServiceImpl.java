package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.BoardPost;
import com.cosmus.resonos.mapper.community.BoardPostMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class BoardPostServiceImpl implements BoardPostService {

    @Autowired
    private BoardPostMapper boardPostMapper;

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
    public BoardPost selectWithLikesDislikes(Long communityId, Long postId) throws Exception {
        return boardPostMapper.selectWithLikesDislikes(communityId, postId);
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

}
