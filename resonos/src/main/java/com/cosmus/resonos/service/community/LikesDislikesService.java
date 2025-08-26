package com.cosmus.resonos.service.community;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.LikesDislikes;

public interface LikesDislikesService extends BaseService<LikesDislikes> {

    public List<Map<String, Object>> countLikesDislikes(@Param("type") String type, @Param("targetId") Long targetId) throws Exception;
    public LikesDislikes selectByUser(@Param("userId") Long userId, @Param("type") String type, @Param("targetId") Long targetId) throws Exception;
    public void toggleReaction(Long userId, String type, Long targetId, Boolean isLike) throws Exception;
    public Map<String, Integer> getReactionCounts(String type, Long targetId) throws Exception;
    
    boolean deleteAll() throws Exception;
}