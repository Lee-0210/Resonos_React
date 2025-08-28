package com.cosmus.resonos.service.community;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cosmus.resonos.domain.community.ComVote;
import com.cosmus.resonos.domain.community.ComVoteArgument;
import com.cosmus.resonos.mapper.community.ComVoteArgumentMapper;
import com.cosmus.resonos.mapper.community.ComVoteMapper;
import com.cosmus.resonos.mapper.community.VoteStatusMapper;
import com.github.pagehelper.PageInfo;

@Service
public class ComVoteServiceImpl implements ComVoteService {

    @Autowired
    private ComVoteMapper comVoteMapper;

    @Autowired
    private ComVoteArgumentMapper comVoteArgumentMapper;

    @Autowired
    private VoteStatusMapper voteStatusMapper;

    @Override
    public List<ComVote> list() throws Exception{
        return comVoteMapper.list();
    }

    @Override
    public PageInfo<ComVote> list(int page, int size) throws Exception{
        // PageHelper 사용 예시 (필요에 따라 import, 의존 추가 필요)
        com.github.pagehelper.PageHelper.startPage(page, size);
        List<ComVote> list = comVoteMapper.list();
        return new PageInfo<>(list);
    }

    @Override
    public ComVote select(Long no) throws Exception{
        return comVoteMapper.select(no);
    }

    @Override
    public ComVote selectById(String id) throws Exception{
        return comVoteMapper.selectById(id);
    }

    @Override
    public boolean insert(ComVote comVote) throws Exception{
        return comVoteMapper.insert(comVote) > 0;
    }

    @Override
    public boolean update(ComVote comVote) throws Exception{
        return comVoteMapper.update(comVote) > 0;
    }

    @Override
    public boolean updateById(ComVote comVote) throws Exception{
        return comVoteMapper.updateById(comVote) > 0;
    }

    @Override
    public boolean delete(Long no) throws Exception{
        return comVoteMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) throws Exception{
        return comVoteMapper.deleteById(id) > 0;
    }

    @Override
    public boolean deleteAll() throws Exception {
        return comVoteMapper.deleteAll() > 0;
    }

    @Override
    @Transactional
    public void createVoteWithArguments(ComVote comVote, List<ComVoteArgument> arguments) throws Exception {
        // comVoteMapper.insert(comVote);
        Long voteId = comVote.getId();

        for (ComVoteArgument arg : arguments) {
            ComVoteArgument comVoteArgument = new ComVoteArgument();
            comVoteArgument.setVoteId(voteId);
            comVoteArgument.setContent(arg.getContent());
            comVoteArgumentMapper.insert(comVoteArgument);
        }
    }

    @Override
    public ComVote selectByPostId(Long postId) throws Exception {
        return comVoteMapper.selectByPostId(postId);
    }

    @Override
    public boolean deleteByPostId(Long postId) throws Exception {
        return comVoteMapper.deleteByPostId(postId) > 0;
    }
    // 투표 결과 수정 

    @Override
    public void updateVoteAndArguments(Long voteId, ComVote updatedVote) throws Exception {
        // 1. 자식 테이블의 관련 데이터 삭제
        
        List<ComVoteArgument> existingArgs = comVoteArgumentMapper.selectById(voteId);
        for (ComVoteArgument arg : existingArgs) {
            voteStatusMapper.deleteByArgId(arg.getId()); // 자식 데이터 먼저 삭제
        }
        // 2. 기존 선택지 삭제
        comVoteArgumentMapper.deleteByVoteId(voteId);

        // 3. 투표 기본 정보 업데이트
        comVoteMapper.update(updatedVote);

        // 4. 새로운 선택지 추가
        List<ComVoteArgument> newArguments = updatedVote.getArguments();
        if (newArguments != null) {
            for (ComVoteArgument arg : newArguments) {
                arg.setVoteId(voteId);
                comVoteArgumentMapper.insert(arg);
            }
        }
    }

}