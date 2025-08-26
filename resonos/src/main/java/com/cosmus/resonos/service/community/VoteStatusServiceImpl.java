package com.cosmus.resonos.service.community;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.community.VoteStatus;
import com.cosmus.resonos.mapper.community.VoteStatusMapper;
import com.github.pagehelper.PageInfo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class VoteStatusServiceImpl implements VoteStatusService {

    @Autowired
    private VoteStatusMapper voteStatusMapper;

    @Override
    public List<VoteStatus> list() throws Exception{
        return voteStatusMapper.list();
    }

    @Override
    public PageInfo<VoteStatus> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<VoteStatus> list = voteStatusMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public VoteStatus select(Long no) throws Exception{
        return voteStatusMapper.select(no);
    }

    @Override
    public VoteStatus selectById(String id) throws Exception{
        return voteStatusMapper.selectById(id);
    }

  @Override
public boolean insert(VoteStatus entity) throws Exception {
    log.info("Inserting VoteStatus: {}", entity);

    // 기존의 동일 userId 투표 기록(다른 argument도 포함) 조회
    List<VoteStatus> existingVotes = voteStatusMapper.selectByUserId(entity.getUserId());
    log.info("existingVotes: {}", existingVotes);

    if (existingVotes != null && !existingVotes.isEmpty()) {
        // 기존 모든 투표 기록 삭제
        voteStatusMapper.deleteByUserId(entity.getUserId());
    }

    // 새 투표 inserted
    return voteStatusMapper.insert(entity) > 0;
}


    @Override
    public boolean update(VoteStatus entity) throws Exception{
        return voteStatusMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(VoteStatus entity) throws Exception{
        return voteStatusMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return voteStatusMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return voteStatusMapper.deleteById(id) > 0;
    }

    

    @Override
    public boolean deleteAll() throws Exception {
        return voteStatusMapper.deleteAll() > 0;
    }
}