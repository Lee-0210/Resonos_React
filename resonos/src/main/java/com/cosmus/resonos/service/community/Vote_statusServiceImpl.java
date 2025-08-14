package com.cosmus.resonos.service.community;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Vote_status;
import com.cosmus.resonos.mapper.community.Vote_statusMapper;
import com.github.pagehelper.PageInfo;

@Service
public class Vote_statusServiceImpl implements Vote_statusService {

    @Autowired
    private Vote_statusMapper vote_statusMapper;

    @Override
    public List<Vote_status> list() throws Exception{
        return vote_statusMapper.list();
    }

    @Override
    public PageInfo<Vote_status> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Vote_status> list = vote_statusMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Vote_status select(Long no) throws Exception{
        return vote_statusMapper.select(no);
    }

    @Override
    public Vote_status selectById(String id) throws Exception{
        return vote_statusMapper.selectById(id);
    }

    @Override
    public boolean insert(Vote_status entity) throws Exception{
        return vote_statusMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Vote_status entity) throws Exception{
        return vote_statusMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Vote_status entity) throws Exception{
        return vote_statusMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return vote_statusMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return vote_statusMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return vote_statusMapper.deleteAll() > 0;
    }
}