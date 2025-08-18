package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.ComManager;
import com.cosmus.resonos.mapper.community.ComManagerMapper;
import com.github.pagehelper.PageInfo;

@Service
public class ComManagerServiceImpl implements ComManagerService {

    @Autowired
    private ComManagerMapper comManagerMapper;

    @Override
    public List<ComManager> list() throws Exception{
        return comManagerMapper.list();
    }

    @Override
    public PageInfo<ComManager> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<ComManager> list = comManagerMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public ComManager select(Long no) throws Exception{
        return comManagerMapper.select(no);
    }

    @Override
    public ComManager selectById(String id) throws Exception{
        return comManagerMapper.selectById(id);
    }

    @Override
    public boolean insert(ComManager entity) throws Exception{
        return comManagerMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(ComManager entity) throws Exception{
        return comManagerMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(ComManager entity) throws Exception{
        return comManagerMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return comManagerMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return comManagerMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return comManagerMapper.deleteAll() > 0;
    }
}