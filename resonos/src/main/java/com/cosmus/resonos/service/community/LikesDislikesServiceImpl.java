package com.cosmus.resonos.service.community;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cosmus.resonos.domain.community.LikesDislikes;
import com.cosmus.resonos.mapper.community.LikesDislikesMapper;
import com.github.pagehelper.PageInfo;

@Service
public class LikesDislikesServiceImpl implements LikesDislikesService {

    @Autowired
    private LikesDislikesMapper likesDislikesMapper;

    @Override
    public List<LikesDislikes> list() throws Exception{
        return likesDislikesMapper.list();
    }

    @Override
    public PageInfo<LikesDislikes> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<LikesDislikes> list = likesDislikesMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public LikesDislikes select(Long no) throws Exception{
        return likesDislikesMapper.select(no);
    }

    @Override
    public LikesDislikes selectById(String id) throws Exception{
        return likesDislikesMapper.selectById(id);
    }

    @Override
    public boolean insert(LikesDislikes entity) throws Exception{
        return likesDislikesMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(LikesDislikes entity) throws Exception{
        return likesDislikesMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(LikesDislikes entity) throws Exception{
        return likesDislikesMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return likesDislikesMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return likesDislikesMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return likesDislikesMapper.deleteAll() > 0;
    }

    @Override
    public List<Map<String, Object>> countLikesDislikes(String type, Long targetId) throws Exception {
        return likesDislikesMapper.countLikesDislikes(type, targetId);
    }

    @Override
    public LikesDislikes selectByUser(Long userId, String type, Long targetId) throws Exception {
        return likesDislikesMapper.selectByUser(userId, type, targetId);
    }

    @Override
    @Transactional
    public void toggleReaction(Long userId, String type, Long targetId, Boolean isLike) throws Exception {
        LikesDislikes existing = likesDislikesMapper.selectByUser(userId, type, targetId);
        
        if (existing == null) {
            // 없으면 새로 삽입
            LikesDislikes newReaction = new LikesDislikes();
            newReaction.setUserId(userId);
            newReaction.setType(type);
            newReaction.setTargetId(targetId);
            newReaction.setIsLikes(isLike);
            likesDislikesMapper.insert(newReaction);
        } else if (existing.getIsLikes() == isLike) {
            // 이미 같은 반응 → 취소
            likesDislikesMapper.delete(existing.getId());
        } else {
            // 반대 반응 → 업데이트
            existing.setIsLikes(isLike);
            likesDislikesMapper.update(existing);
        }
    }

    @Override
    public Map<String, Integer> getReactionCounts(String type, Long targetId) throws Exception {
        List<Map<String, Object>> list = likesDislikesMapper.countLikesDislikes(type, targetId);
        Map<String, Integer> result = new HashMap<>();
        result.put("likes", 0);
        result.put("dislikes", 0);

        for (Map<String, Object> row : list) {
            Boolean isLikes = (Boolean) row.get("is_likes");
            Long count = (Long) row.get("count");
            if (isLikes != null && isLikes) {
                result.put("likes", count.intValue());
            } else {
                result.put("dislikes", count.intValue());
            }
        }
        return result;
    }
}