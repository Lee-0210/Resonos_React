// package com.cosmus.resonos.service.community;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.cosmus.resonos.domain.community.Board_post;
// import com.cosmus.resonos.mapper.community.Board_postMapper;
// import com.github.pagehelper.PageInfo;

// @Service
// public class Board_postServiceImpl implements Board_postService {

//     @Autowired
//     private Board_postMapper board_postMapper;

//     @Override
//     public List<Board_post> list()throws Exception {
//         return board_postMapper.list();
//     }

//     @Override
//     public PageInfo<Board_post> list(int page, int size) throws Exception{
//         // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
//         com.github.pagehelper.PageHelper.startPage(page, size);
//         List<Board_post> list = board_postMapper.list();
//         return new PageInfo<>(list);
//     }

//     @Override
//     public Board_post select(Long no) throws Exception{
//         return board_postMapper.select(no);
//     }

//     @Override
//     public Board_post selectById(String id) throws Exception{
//         return board_postMapper.selectById(id);
//     }

//     @Override
//     public boolean insert(Board_post entity) throws Exception{
//         return board_postMapper.insert(entity) > 0;
//     }

//     @Override
//     public boolean update(Board_post entity) throws Exception{
//         return board_postMapper.update(entity) > 0;
//     }

//     @Override
//     public boolean updateById(Board_post entity) throws Exception{
//         return board_postMapper.updateById(entity) > 0;
//     }

//     @Override
//     public boolean delete(Long no) throws Exception{
//         return board_postMapper.delete(no) > 0;
//     }

//     @Override
//     public boolean deleteById(String id) throws Exception{
//         return board_postMapper.deleteById(id) > 0;
//     }

    

//     @Override
//     public boolean deleteAll() throws Exception {
//         return board_postMapper.deleteAll() > 0;
//     }
// }