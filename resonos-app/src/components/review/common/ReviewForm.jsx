import React, { useState } from 'react'

const ReviewForm = ({ styles, albumId, trackId, reviewType, handleSubmitReview}) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    handleSubmitReview({content, rating});
    setContent(''); // Clear content after submission
    setRating(''); // Clear rating after submission
  };

  return (
    <div className={styles.reply}>
      <form id="reviewForm" onSubmit={handleFormSubmit}>
        
        <textarea
          id="content"
          placeholder="리뷰를 입력해주세요"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className={styles.scoreAndSubmit}>
          <input
            type="number"
            id="rating"
            min="0"
            max="100"
            placeholder="0~100점"
            required
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button type="submit" className={`btn ${styles['btn-gold']}`}>
            리뷰작성
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm