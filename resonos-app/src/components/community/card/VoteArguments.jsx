import React from 'react'

const VoteArguments = ({arg}) => {
  return (
    <div className='vote-line'>
      <p>{arg.content}</p>
      <input type="radio" name="vote" id={arg.id} value={arg.id} />
    </div>
  )
}

export default VoteArguments