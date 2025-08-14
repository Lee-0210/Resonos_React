package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Community_category;
import com.cosmus.resonos.mapper.community.Community_categoryMapper;
import com.github.pagehelper.PageInfo;

@Service
public class Community_categoryServiceImpl implements Community_categoryService {

    @Autowired
    private Community_categoryMapper community_categoryMapper;

    @Override
    public List<Community_category> list() throws Exception{
        return community_categoryMapper.list();
    }

    @Override
    public PageInfo<Community_category> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Community_category> list = community_categoryMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Community_category select(Long no) throws Exception{
        return community_categoryMapper.select(no);
    }

    @Override
    public Community_category selectById(String id) throws Exception{
        return community_categoryMapper.selectById(id);
    }

    @Override
    public boolean insert(Community_category entity) throws Exception{
        return community_categoryMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Community_category entity) throws Exception{
        return community_categoryMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Community_category entity) throws Exception{
        return community_categoryMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return community_categoryMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return community_categoryMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return community_categoryMapper.deleteAll() > 0;
    }
}