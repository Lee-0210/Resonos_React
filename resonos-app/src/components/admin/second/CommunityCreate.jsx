import React, { useState } from "react";
import FormInput from "../first/FormInput";
import { communityCreate } from "../../../apis/admin"; // 실제 경로에 맞게 수정

const CommunityCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !categoryId || !creatorId) {
      alert("커뮤니티 이름, 카테고리, 생성자는 필수 항목입니다.");
      return;
    }

    const communityData = {
      name,
      description,
      categoryId: Number(categoryId),
      creatorId: Number(creatorId),
    };

    try {
      const res = await communityCreate(communityData);
      if (res.status === 201) {
        setMessage("커뮤니티 생성 성공!");
        setName("");
        setDescription("");
        setCategoryId("");
        setCreatorId("");
      } else {
        setMessage("커뮤니티 생성 실패: 서버 오류");
      }
    } catch (error) {
      console.error("커뮤니티 생성 오류", error);
      setMessage("커뮤니티 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="community-create-form">
      <h3>커뮤니티 새 글 작성</h3>
      <FormInput
        label="커뮤니티 이름"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <FormInput
        label="커뮤니티 설명"
        name="description"
        type="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      <FormInput
        label="카테고리 ID"
        name="categoryId"
        type="number"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      />
      <FormInput
        label="생성자 ID"
        name="creatorId"
        type="number"
        value={creatorId}
        onChange={(e) => setCreatorId(e.target.value)}
        required
      />

      <button type="submit" className="btn btn-primary mt-3">
        커뮤니티 생성
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CommunityCreate;
