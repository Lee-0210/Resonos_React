package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.ComVoteArgument;
import com.cosmus.resonos.mapper.community.ComVoteArgumentMapper;
import com.github.pagehelper.PageInfo;

@Service
public class ComVoteArgumentServiceImpl implements ComVoteArgumentService {

    @Autowired
    private ComVoteArgumentMapper comVoteArgumentMapper;

    @Override
    public List<ComVoteArgument> list() throws Exception{
        return comVoteArgumentMapper.list();
    }

    @Override
    public PageInfo<ComVoteArgument> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<ComVoteArgument> list = comVoteArgumentMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public ComVoteArgument select(Long no) throws Exception{
        return comVoteArgumentMapper.select(no);
    }

    @Override
    public ComVoteArgument selectById(String id) throws Exception{
        return comVoteArgumentMapper.selectById(id);
    }

    @Override
    public boolean insert(ComVoteArgument entity) throws Exception{
        return comVoteArgumentMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(ComVoteArgument entity) throws Exception{
        return comVoteArgumentMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(ComVoteArgument entity) throws Exception{
        return comVoteArgumentMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return comVoteArgumentMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return comVoteArgumentMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return comVoteArgumentMapper.deleteAll() > 0;
    }
}