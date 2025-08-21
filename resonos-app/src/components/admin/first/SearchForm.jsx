import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';

const SearchForm = ({
  initialKeyword = '',
  placeholder = '검색어를 입력하세요',
  buttonLabel = '검색',
  onSearch,
}) => {
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(keyword.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline-consistent">
      <FormInput
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        required
        containerClassName=""
        className="form-control"
      />
      <button className="btn btn-gold" type="submit">
        {buttonLabel}
      </button>
    </form>
  );
};

export default SearchForm;
