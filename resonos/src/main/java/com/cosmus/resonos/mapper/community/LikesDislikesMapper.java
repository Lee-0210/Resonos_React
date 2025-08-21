package com.cosmus.resonos.mapper.community;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.LikesDislikes;

@Mapper
public interface LikesDislikesMapper extends BaseMapper<LikesDislikes> {
    public List<Map<String, Object>> countLikesDislikes(@Param("type") String type, @Param("targetId") Long targetId) throws Exception;
    public LikesDislikes selectByUser(@Param("userId") Long userId, @Param("type") String type, @Param("targetId") Long targetId) throws Exception;
    public int completeAll() throws Exception;
    public int deleteAll() throws Exception;
}