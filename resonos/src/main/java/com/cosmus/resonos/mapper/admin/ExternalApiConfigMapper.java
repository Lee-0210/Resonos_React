package com.cosmus.resonos.mapper.admin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.admin.ExternalApiConfig;

@Mapper
public interface ExternalApiConfigMapper {
    // 전체 조회
    public List<ExternalApiConfig> list() throws Exception;
    // 조회
    public ExternalApiConfig select(Long id) throws Exception;
    // 삽입
    public int insert(ExternalApiConfig config) throws Exception;
    // 수정
    public int update(ExternalApiConfig config) throws Exception;
    // 삭제
    public int delete(Long id) throws Exception;
    // API 키 설정 업데이트
    public int updateApiKey(Long id, String apiKey) throws Exception;
    // 검색 
    ExternalApiConfig selectByProvider(String provider) throws Exception;

}
