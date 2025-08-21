package com.cosmus.resonos.service.community;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.BoardPost;
import com.cosmus.resonos.domain.community.Community;
import com.cosmus.resonos.mapper.community.BoardPostMapper;
import com.cosmus.resonos.mapper.community.CommunityMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class CommunityServiceImpl implements CommunityService {

    @Autowired
    private CommunityMapper communityMapper;

    @Autowired
    private BoardPostMapper boardPostMapper;

    @Override
    public List<Community> list() throws Exception{
        return communityMapper.list();
    }

    @Override
    public PageInfo<Community> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<Community> list = communityMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public Community select(Long no) throws Exception{
        return communityMapper.select(no);
    }

    @Override
    public Community selectById(String id) throws Exception{
        return communityMapper.selectById(id);
    }

    @Override
    public boolean insert(Community entity) throws Exception{
        return communityMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Community entity) throws Exception{
        return communityMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Community entity) throws Exception{
        return communityMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return communityMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return communityMapper.deleteById(id) > 0;
    }



    @Override
    public boolean deleteAll() throws Exception {
        return communityMapper.deleteAll() > 0;
    }

    @Override
    public boolean setTrack(Long communityId, String trackId) throws Exception {
        // update 결과를 boolean 값으로 반환하게 수정함
        return communityMapper.setTrack(communityId, trackId) > 0;
    }

    @Override
    public boolean setIntro(Long communityId, String intro) throws Exception {
        return communityMapper.setIntro(communityId, intro) > 0;
    }

    @Override
    public List<Community> getTopCommunities(int limit) throws Exception {
        return communityMapper.getTopCommunities(limit);
    }

    @Override
    public List<Community> getNewCommunities(int limit) throws Exception {
        return communityMapper.getNewCommunities(limit);
    }

    @Override
    public List<Community> getAllCommunities() throws Exception {
        return communityMapper.list();
    }

    @Override
    public PageInfo<Community> searchCommunities(String query, int page, int size) throws Exception {
        // 1) community 단독으로 페이징 (중복 없음)
        PageHelper.startPage(page, size);
        List<Community> communities = communityMapper.searchCommunitiesBasic(query);
        PageInfo<Community> pageInfo = new PageInfo<>(communities);

        // 2) 커뮤니티 id 리스트 추출
        List<Long> communityIds = communities.stream()
                                            .map(Community::getId)
                                            .collect(Collectors.toList());

        // 3) 게시글 별도 조회 후 매핑
        if (!communityIds.isEmpty()) {
            List<BoardPost> posts = boardPostMapper.getPostsByCommunityIds(communityIds);
            mapPostsToCommunities(posts, communities);
        }

        return pageInfo;
    }

    private void mapPostsToCommunities(List<BoardPost> posts, List<Community> communities) {
        Map<Long, Community> communityMap = communities.stream()
                                                    .collect(Collectors.toMap(Community::getId, c -> c));
        for (BoardPost post : posts) {
            Community community = communityMap.get(post.getCommunityId());
            if (community != null) {
                community.getBoardPosts().add(post);
            }
        }
    }

    @Override
    public PageInfo<Community> searchCommunities2(String query, int page, int size) {
        // 1) community 단독으로 페이징 (중복 없음)
        PageHelper.startPage(page, size);
        List<Community> communities = communityMapper.searchCommunitiesBasic(query);
        PageInfo<Community> pageInfo = new PageInfo<>(communities);

        // 2) 커뮤니티 id 리스트 추출
        List<Long> communityIds = communities.stream()
                                            .map(Community::getId)
                                            .collect(Collectors.toList());

        // 3) 게시글 수만 조회 (게시글 전체 리스트가 아님)
        if (!communityIds.isEmpty()) {
            // 커뮤니티별 게시글 수 조회 반환 Map<Long, Integer>
            List<Map<String, Object>> resultList = boardPostMapper.countPostsByCommunityIds(communityIds);
            Map<Long, Integer> postCountMap = resultList.stream()
                .collect(Collectors.toMap(
                    m -> ((Number)m.get("community_id")).longValue(),
                    m -> ((Number)m.get("board_post_count")).intValue()
                ));

            // 4) 커뮤니티 객체에 게시글 수 매핑
            communities.forEach(c -> {
                Integer count = postCountMap.get(c.getId());
                c.setBoardPostCount(count != null ? count : 0);
            });
        }

        return pageInfo;
    }
}