package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Likes_dislikes;
import com.cosmus.resonos.mapper.community.Likes_dislikesMapper;
import com.github.pagehelper.PageInfo;

@Service
public class Likes_dislikesServiceImpl implements Likes_dislikesService {

    @Autowired
    private Likes_dislikesMapper likes_dislikesMapper;

    @Override
    public List<Likes_dislikes> list() throws Exception{
        return likes_dislikesMapper.list();
    }

    @Override
    public PageInfo<Likes_dislikes> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Likes_dislikes> list = likes_dislikesMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Likes_dislikes select(Long no) throws Exception{
        return likes_dislikesMapper.select(no);
    }

    @Override
    public Likes_dislikes selectById(String id) throws Exception{
        return likes_dislikesMapper.selectById(id);
    }

    @Override
    public boolean insert(Likes_dislikes entity) throws Exception{
        return likes_dislikesMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Likes_dislikes entity) throws Exception{
        return likes_dislikesMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Likes_dislikes entity) throws Exception{
        return likes_dislikesMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return likes_dislikesMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return likes_dislikesMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return likes_dislikesMapper.deleteAll() > 0;
    }
}