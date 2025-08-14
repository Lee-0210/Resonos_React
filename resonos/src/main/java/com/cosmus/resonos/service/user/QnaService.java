package com.cosmus.resonos.service.user;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.user.Qna;

public interface QnaService {
    // 전체 조회
    public List<Qna> list() throws Exception;
    // 조회
    public Qna select(Long id) throws Exception;
    // 삽입
    public boolean insert(Qna qna) throws Exception;
    // 수정
    public boolean update(Qna qna) throws Exception;
    // 삭제
    public boolean delete(Long id) throws Exception;

    List<Qna> listAnswered() throws Exception;  // 답변이 있는 QnA 목록
    List<Qna> listNoAnswer() throws Exception;  // 답변이 없는 QnA 목록
    // react - admin 
    // 키워드 검색 
    public long count(@Param("keyword") String keyword);
    // 전체 조회
    public List<Qna> getAll(@Param("keyword") String keyword, @Param("index") long index, @Param("size") long size);
    // 답변이 없는 QnA 조회
    public List<Qna> getNoAnswer(@Param("keyword") String keyword, @Param("index") long index, @Param("size") long size);
    // 답변이 있는 QnA 조회
    public List<Qna> getAnswered(@Param("keyword") String keyword, @Param("index") long index, @Param("size") long size);
}
