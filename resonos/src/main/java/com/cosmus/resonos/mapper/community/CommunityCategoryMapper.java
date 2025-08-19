package com.cosmus.resonos.mapper.community;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.Community;
import com.cosmus.resonos.domain.community.CommunityCategory;
import com.github.pagehelper.PageInfo;

@Mapper
public interface CommunityCategoryMapper extends BaseMapper<CommunityCategory> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;

    // 커뮤 main
    // 게시판 순위 Top5 (게시판 별 게시글 수 or 게시글 댓글 수 로 상위 5개)
    public List<CommunityCategory> getTopCategories(int limit) throws Exception;

    // 신설 게시판 (최근 개설된 게시판 5개)
    public List<CommunityCategory> getNewCategories(int limit) throws Exception;
    // 검색 키워드가 포함된 게시판 검색
    public PageInfo<CommunityCategory> searchCategories(String query, int pageNum, int pageSize) throws Exception;
    // 게시판 순위 Top5 (페이징 적용 가능하게)
    public PageInfo<CommunityCategory> getTopCategories(int pageNum, int pageSize) throws Exception;
    // 신설 게시판
    public PageInfo<CommunityCategory> getNewCategories(int pageNum, int pageSize) throws Exception;
}