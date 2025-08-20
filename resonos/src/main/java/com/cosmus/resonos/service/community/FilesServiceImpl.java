package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.Files;
import com.cosmus.resonos.mapper.community.FilesMapper;
import com.github.pagehelper.PageInfo;

@Service
public class FilesServiceImpl implements FilesService {

    @Autowired
    private FilesMapper filesMapper;

    @Override
    public List<Files> list() throws Exception{
        return filesMapper.list();
    }

    @Override
    public PageInfo<Files> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Files> list = filesMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Files select(Long no) throws Exception{
        return filesMapper.select(no);
    }

    @Override
    public Files selectById(String id) throws Exception{
        return filesMapper.selectById(id);
    }

    @Override
    public boolean insert(Files entity) throws Exception{
        return filesMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Files entity) throws Exception{
        return filesMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Files entity) throws Exception{
        return filesMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return filesMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return filesMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return filesMapper.deleteAll() > 0;
    }
}