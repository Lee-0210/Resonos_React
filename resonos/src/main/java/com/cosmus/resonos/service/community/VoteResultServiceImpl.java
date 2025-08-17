package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.VoteResult;
import com.cosmus.resonos.mapper.community.VoteResultMapper;
import com.github.pagehelper.PageInfo;

@Service
public class VoteResultServiceImpl implements VoteResultService {

    @Autowired
    private VoteResultMapper voteResultMapper;

    @Override
    public List<VoteResult> list() throws Exception{
        return voteResultMapper.list();
    }

    @Override
    public PageInfo<VoteResult> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<VoteResult> list = voteResultMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public VoteResult select(Long no) throws Exception{
        return voteResultMapper.select(no);
    }

    @Override
    public VoteResult selectById(String id) throws Exception{
        return voteResultMapper.selectById(id);
    }

    @Override
    public boolean insert(VoteResult entity) throws Exception{
        return voteResultMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(VoteResult entity) throws Exception{
        return voteResultMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(VoteResult entity) throws Exception{
        return voteResultMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return voteResultMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return voteResultMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return voteResultMapper.deleteAll() > 0;
    }
}