import React, { useEffect, useState } from 'react'
import DatePicker from './DatePicker'

const FreeVote = ({voteItems, addVoteRow, deleteVoteRow, setClosedAt, setVoteTitle, vote, onChangeVoteContent}) => {

  return (
    <section className="free-vote">
      <div className="inner">
        <p className="fail-vali">
          {
            !vote?.isCompleted
            ?
            '진행중인 투표는 수정 반영이 되지 않습니다.'
            :
            ''
          }
        </p>
        <div className="top">
          <input
            className='border-form'
            type="text" placeholder='투표 제목을 입력해주세요.'
            onChange={e => setVoteTitle(e.target.value)}
            defaultValue={vote?.title}
          />
          <button className='btn btn-gold' onClick={addVoteRow}>항목 추가</button>
        </div>
        <div className='middle'>
          <label htmlFor="datePicker">종료일</label>
          <DatePicker
            setClosedAt={setClosedAt}
            vote={vote}
          />
        </div>
        <ul>
          {
            voteItems?.map((row, index) => (
              <li key={row.id}>
                <div>
                  <span>{index + 1}</span>
                  <input
                    type="text"
                    className="border-form"
                    defaultValue={row.content}
                    onChange={e => onChangeVoteContent(row.argNo, e)}
                  />
                  <button
                    className="btn btn-red"
                    onClick={() => deleteVoteRow(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default FreeVote