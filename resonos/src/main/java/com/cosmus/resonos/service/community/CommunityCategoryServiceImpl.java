package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Community;
import com.cosmus.resonos.domain.community.CommunityCategory;
import com.cosmus.resonos.mapper.community.CommunityCategoryMapper;
import com.github.pagehelper.PageInfo;

@Service
public class CommunityCategoryServiceImpl implements CommunityCategoryService {

    @Autowired
    private CommunityCategoryMapper communityCategoryMapper;

    @Override
    public List<CommunityCategory> list() throws Exception{
        return communityCategoryMapper.list();
    }

    @Override
    public PageInfo<CommunityCategory> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<CommunityCategory> list = communityCategoryMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public CommunityCategory select(Long no) throws Exception{
        return communityCategoryMapper.select(no);
    }

    @Override
    public CommunityCategory selectById(String id) throws Exception{
        return communityCategoryMapper.selectById(id);
    }

    @Override
    public boolean insert(CommunityCategory entity) throws Exception{
        return communityCategoryMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(CommunityCategory entity) throws Exception{
        return communityCategoryMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(CommunityCategory entity) throws Exception{
        return communityCategoryMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return communityCategoryMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return communityCategoryMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return communityCategoryMapper.deleteAll() > 0;
    }

    @Override
    public List<CommunityCategory> getTopCategories(int limit) throws Exception {
        return communityCategoryMapper.getTopCategories(limit);
    }

    @Override
    public List<CommunityCategory> getNewCategories(int limit) throws Exception {
        return communityCategoryMapper.getNewCategories(limit);
    }

    @Override
    public PageInfo<CommunityCategory> searchCategories(String query, int pageNum, int pageSize) throws Exception {
        com.github.pagehelper.PageHelper.startPage(pageNum, pageSize);
        List<CommunityCategory> list = communityCategoryMapper.searchCategories(query, pageNum, pageSize).getList();
        return new PageInfo<>(list);
    }

    @Override
    public PageInfo<CommunityCategory> getTopCategories(int pageNum, int pageSize) throws Exception {
        com.github.pagehelper.PageHelper.startPage(pageNum, pageSize);
        List<CommunityCategory> list = communityCategoryMapper.getTopCategories(pageNum, pageSize).getList();
        return new PageInfo<>(list);
    }

    @Override
    public PageInfo<CommunityCategory> getNewCategories(int pageNum, int pageSize) throws Exception {
        com.github.pagehelper.PageHelper.startPage(pageNum, pageSize);
        List<CommunityCategory> list = communityCategoryMapper.getNewCategories(pageNum, pageSize).getList();
        return new PageInfo<>(list);
    }


}