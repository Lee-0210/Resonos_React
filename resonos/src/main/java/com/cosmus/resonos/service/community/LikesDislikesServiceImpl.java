package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.LikesDislikes;
import com.cosmus.resonos.mapper.community.LikesDislikesMapper;
import com.github.pagehelper.PageInfo;

@Service
public class LikesDislikesServiceImpl implements LikesDislikesService {

    @Autowired
    private LikesDislikesMapper likesDislikesMapper;

    @Override
    public List<LikesDislikes> list() throws Exception{
        return likesDislikesMapper.list();
    }

    @Override
    public PageInfo<LikesDislikes> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<LikesDislikes> list = likesDislikesMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public LikesDislikes select(Long no) throws Exception{
        return likesDislikesMapper.select(no);
    }

    @Override
    public LikesDislikes selectById(String id) throws Exception{
        return likesDislikesMapper.selectById(id);
    }

    @Override
    public boolean insert(LikesDislikes entity) throws Exception{
        return likesDislikesMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(LikesDislikes entity) throws Exception{
        return likesDislikesMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(LikesDislikes entity) throws Exception{
        return likesDislikesMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return likesDislikesMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return likesDislikesMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return likesDislikesMapper.deleteAll() > 0;
    }
}