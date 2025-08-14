package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Com_manager;
import com.cosmus.resonos.mapper.community.Com_managerMapper;
import com.github.pagehelper.PageInfo;

@Service
public class Com_managerServiceImpl implements Com_managerService {

    @Autowired
    private Com_managerMapper com_managerMapper;

    @Override
    public List<Com_manager> list() throws Exception{
        return com_managerMapper.list();
    }

    @Override
    public PageInfo<Com_manager> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Com_manager> list = com_managerMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Com_manager select(Long no) throws Exception{
        return com_managerMapper.select(no);
    }

    @Override
    public Com_manager selectById(String id) throws Exception{
        return com_managerMapper.selectById(id);
    }

    @Override
    public boolean insert(Com_manager entity) throws Exception{
        return com_managerMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Com_manager entity) throws Exception{
        return com_managerMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Com_manager entity) throws Exception{
        return com_managerMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return com_managerMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return com_managerMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return com_managerMapper.deleteAll() > 0;
    }
}