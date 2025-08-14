package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Com_vote_argument;
import com.cosmus.resonos.mapper.community.Com_vote_argumentMapper;
import com.github.pagehelper.PageInfo;

@Service
public class Com_vote_argumentServiceImpl implements Com_vote_argumentService {

    @Autowired
    private Com_vote_argumentMapper com_vote_argumentMapper;

    @Override
    public List<Com_vote_argument> list() throws Exception{
        return com_vote_argumentMapper.list();
    }

    @Override
    public PageInfo<Com_vote_argument> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Com_vote_argument> list = com_vote_argumentMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Com_vote_argument select(Long no) throws Exception{
        return com_vote_argumentMapper.select(no);
    }

    @Override
    public Com_vote_argument selectById(String id) throws Exception{
        return com_vote_argumentMapper.selectById(id);
    }

    @Override
    public boolean insert(Com_vote_argument entity) throws Exception{
        return com_vote_argumentMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Com_vote_argument entity) throws Exception{
        return com_vote_argumentMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Com_vote_argument entity) throws Exception{
        return com_vote_argumentMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return com_vote_argumentMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return com_vote_argumentMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return com_vote_argumentMapper.deleteAll() > 0;
    }
}