package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.ComVote;
import com.cosmus.resonos.mapper.community.ComVoteMapper;
import com.github.pagehelper.PageInfo;

@Service
public class ComVoteServiceImpl implements ComVoteService {

    @Autowired
    private ComVoteMapper comVoteMapper;

    @Override
    public List<ComVote> list() throws Exception{
        return comVoteMapper.list();
    }

    @Override
    public PageInfo<ComVote> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<ComVote> list = comVoteMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public ComVote select(Long no) throws Exception{
        return comVoteMapper.select(no);
    }

    @Override
    public ComVote selectById(String id) throws Exception{
        return comVoteMapper.selectById(id);
    }

    @Override
    public boolean insert(ComVote entity) throws Exception{
        return comVoteMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(ComVote entity) throws Exception{
        return comVoteMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(ComVote entity) throws Exception{
        return comVoteMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return comVoteMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return comVoteMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return comVoteMapper.deleteAll() > 0;
    }
}