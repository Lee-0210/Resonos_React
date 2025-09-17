import React, { useState } from "react";
import FormInput from "../first/FormInput";
import { createCommunityCategory } from "../../../apis/admin"; // 실제 경로에 맞게 수정

const CommunityIdCreate = () => {
  const [name, setName] = useState("");
  const [isKor, setIsKor] = useState(true); // 기본값을 true로 설정 (한국어)
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("카테고리 이름은 필수 항목입니다.");
      return;
    }

    const categoryData = {
      name: name.trim(),
      isKor: isKor ? 1 : 0 // Controller에서 tinyint(1)로 받으므로 숫자로 변환
    };

    setLoading(true);
    try {
      const res = await createCommunityCategory(categoryData);
      if (res.status === 201 && res.data === "SUCCESS") {
        setMessage("커뮤니티 카테고리 생성 성공!");
        setName("");
        setIsKor(true);
      } else {
        setMessage(`커뮤니티 카테고리 생성 실패: ${res.data || "서버 오류"}`);
      }
    } catch (error) {
      console.error("커뮤니티 카테고리 생성 오류", error);
      setMessage("커뮤니티 카테고리 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setIsKor(true);
    setMessage("");
  };

  return (
    <div className="community-category-create">
      <form onSubmit={handleSubmit} className="community-category-create-form">
        <h3>커뮤니티 카테고리 생성</h3>
        
        <FormInput
          label="카테고리 이름"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="카테고리 이름을 입력하세요"
          required
          maxLength={200}
        />

        <div className="form-group mb-3">
          <label className="form-label">언어 설정</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="language"
              id="korean"
              checked={isKor === true}
              onChange={() => setIsKor(true)}
            />
            <label className="form-check-label" htmlFor="korean">
              한국어
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="language"
              id="english"
              checked={isKor === false}
              onChange={() => setIsKor(false)}
            />
            <label className="form-check-label" htmlFor="english">
              English
            </label>
          </div>
        </div>

        <div className="button-group">
          <button 
            type="submit" 
            className="btn btn-primary me-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                생성 중...
              </>
            ) : (
              "카테고리 생성"
            )}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={loading}
          >
            초기화
          </button>
        </div>

        {message && (
          <div className={`alert mt-3 ${message.includes('성공') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
      </form>

      {/* 미리보기 섹션 */}
      <div className="mt-4 p-3 border rounded">
        <h5>생성될 데이터 미리보기</h5>
        <div className="preview-data">
          <p><strong>카테고리 이름:</strong> {name || "미입력"}</p>
          <p><strong>언어 설정:</strong> {isKor ? "한국어 (1)" : "English (0)"}</p>
          <p><strong>생성 시간:</strong> {new Date().toLocaleString()} (자동 설정)</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityIdCreate;