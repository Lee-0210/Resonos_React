package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Vote_result;
import com.cosmus.resonos.mapper.community.Vote_resultMapper;
import com.github.pagehelper.PageInfo;

@Service
public class Vote_resultServiceImpl implements Vote_resultService {

    @Autowired
    private Vote_resultMapper vote_resultMapper;

    @Override
    public List<Vote_result> list() throws Exception{
        return vote_resultMapper.list();
    }

    @Override
    public PageInfo<Vote_result> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Vote_result> list = vote_resultMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Vote_result select(Long no) throws Exception{
        return vote_resultMapper.select(no);
    }

    @Override
    public Vote_result selectById(String id) throws Exception{
        return vote_resultMapper.selectById(id);
    }

    @Override
    public boolean insert(Vote_result entity) throws Exception{
        return vote_resultMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Vote_result entity) throws Exception{
        return vote_resultMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Vote_result entity) throws Exception{
        return vote_resultMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return vote_resultMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return vote_resultMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return vote_resultMapper.deleteAll() > 0;
    }
}