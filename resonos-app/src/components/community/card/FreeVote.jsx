import React, { useEffect, useState } from 'react'
import DatePicker from './DatePicker'

const FreeVote = ({voteItems, addVoteRow, deleteVoteRow, setClosedAt, setVoteTitle}) => {

  return (
    <section className="free-vote">
      <div className="top">
        <input type="text" placeholder='투표 제목을 입력해주세요.' onChange={e => setVoteTitle(e.target.value)}/>
        <button className='btn btn-gold' onClick={addVoteRow}>항목 추가</button>
      </div>
      <div className='middle'>
        <label htmlFor="datePicker">종료일</label>
        <DatePicker
          setClosedAt={setClosedAt}
        />
      </div>
      <ul>
        {
          voteItems?.map((row, index) => (
            <li key={row.itemId}>
              <div>
                <span>{index + 1}</span>
                <input
                  type="text"
                  defaultValue={row.content}
                />
                <button
                  className="btn btn-gold"
                  onClick={() => deleteVoteRow(index)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default FreeVote