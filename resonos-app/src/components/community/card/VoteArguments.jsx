import React from 'react'

const VoteArguments = ({arg, selectedId, onChange}) => {
  return (
    <div className='vote-line'>
      <p>{arg.content}</p>
      <input type="radio" name="vote" id={arg.id} onChange={() => onChange(arg.id)}
      checked={selectedId === arg.id} value={arg.id} />
    </div>
  )
}

export default VoteArguments