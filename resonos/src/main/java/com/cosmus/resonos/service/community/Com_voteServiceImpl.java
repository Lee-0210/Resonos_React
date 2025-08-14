package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Com_vote;
import com.cosmus.resonos.mapper.community.Com_voteMapper;
import com.github.pagehelper.PageInfo;

@Service
public class Com_voteServiceImpl implements Com_voteService {

    @Autowired
    private Com_voteMapper com_voteMapper;

    @Override
    public List<Com_vote> list() throws Exception{
        return com_voteMapper.list();
    }

    @Override
    public PageInfo<Com_vote> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Com_vote> list = com_voteMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Com_vote select(Long no) throws Exception{
        return com_voteMapper.select(no);
    }

    @Override
    public Com_vote selectById(String id) throws Exception{
        return com_voteMapper.selectById(id);
    }

    @Override
    public boolean insert(Com_vote entity) throws Exception{
        return com_voteMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Com_vote entity) throws Exception{
        return com_voteMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Com_vote entity) throws Exception{
        return com_voteMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return com_voteMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return com_voteMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return com_voteMapper.deleteAll() > 0;
    }
}