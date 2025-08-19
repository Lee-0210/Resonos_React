package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Community;
import com.cosmus.resonos.mapper.community.CommunityMapper;
import com.github.pagehelper.PageInfo;

@Service
public class CommunityServiceImpl implements CommunityService {

    @Autowired
    private CommunityMapper communityMapper;

    @Override
    public List<Community> list() throws Exception{
        return communityMapper.list();
    }

    @Override
    public PageInfo<Community> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Community> list = communityMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Community select(Long no) throws Exception{
        return communityMapper.select(no);
    }

    @Override
    public Community selectById(String id) throws Exception{
        return communityMapper.selectById(id);
    }

    @Override
    public boolean insert(Community entity) throws Exception{
        return communityMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Community entity) throws Exception{
        return communityMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Community entity) throws Exception{
        return communityMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return communityMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return communityMapper.deleteById(id) > 0;
    }



    @Override
    public boolean deleteAll() throws Exception {
        return communityMapper.deleteAll() > 0;
    }

    @Override
    public boolean setTrack(Long communityId, String trackId) throws Exception {
        // update 결과를 boolean 값으로 반환하게 수정함
        return communityMapper.setTrack(communityId, trackId) > 0;
    }

    @Override
    public boolean setIntro(Long communityId, String intro) throws Exception {
        return communityMapper.setIntro(communityId, intro) > 0;
    }

    @Override
    public List<Community> getTopCommunities(int limit) throws Exception {
        return communityMapper.getTopCommunities(limit);
    }

    @Override
    public List<Community> getNewCommunities(int limit) throws Exception {
        return communityMapper.getNewCommunities(limit);
    }

    @Override
    public List<Community> getAllCommunities() throws Exception {
        return communityMapper.list();
    }

    @Override
    public PageInfo<Community> searchCommunities(String query, int pageNum, int pageSize) throws Exception {
        com.github.pagehelper.PageHelper.startPage(pageNum, pageSize);
        List<Community> communities = communityMapper.searchCommunities(query);
        System.out.println("query param = " + query);
        System.out.println("community list size = " + communities.size());

        return new PageInfo<>(communities);
    }

}