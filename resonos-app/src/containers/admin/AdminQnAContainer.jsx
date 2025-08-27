import React, { useEffect, useState, useRef } from "react";
import { getQnaList, getQnaDetail, createQnaAnswer, updateQnaAnswer, deleteQnaAnswer, deleteQna } from "../../apis/admin";
import TabsGeneric from "../../components/admin/first/TabsGeneric";
import TableColumnHeader from "../../components/admin/first/TableColumnHeader";
import TableContentGeneric from "../../components/admin/first/TableContentGeneric";
import Pagination from "../../components/admin/Pagination";
import SearchForm from "../../components/admin/first/SearchForm";
import FormInput from "../../components/admin/first/FormInput";
import QuickMenu from "../../components/admin/first/QuickMenu";
import LoginContextProvider from "../../contexts/LoginContextProvider";

const AdminQnAContainer = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [allQnaList, setAllQnaList] = useState([]);
  const [noAnswerQnaList, setNoAnswerQnaList] = useState([]);
  const [answeredQnaList, setAnsweredQnaList] = useState([]);
  const [currentQna, setCurrentQna] = useState(null);
  const [answers, setAnswers] = useState([]);

  const [pagination, setPagination] = useState({ page: 1, size: 10, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const [newAnswer, setNewAnswer] = useState("");
  const [editAnswerId, setEditAnswerId] = useState(null);
  const [editAnswerContent, setEditAnswerContent] = useState("");
  const editTextareaRef = useRef(null);

  const tabs = [
    { key: "all", label: "전체 목록" },
    { key: "noanswer", label: "답변 없는 문의" },
    { key: "answered", label: "답변 있는 문의" }
  ];

  const qnaColumns = [
    { label: "제목", style: { flexBasis: "60%", minWidth: "180px" }, render: q => q.title },
    { label: "작성일", style: { flexBasis: "40%", minWidth: "120px" }, render: q => new Date(q.createdAt).toLocaleDateString() }
  ];

  /** 목록 조회 */
  const fetchQnaList = async () => {
    try {
      const res = await getQnaList(page, pagination.size, keyword);
      if (res.data.success) {
        setAllQnaList(res.data.allQnaList || []);
        setNoAnswerQnaList(res.data.noAnswerQnaList || []);
        setAnsweredQnaList(res.data.answeredQnaList || []);
        if (res.data.pagination) {
          setPagination(res.data.pagination);
        }
      }
      console.log("QnA 목록 조회 성공", res.data);
    } catch (err) {
      console.error("QnA 목록 조회 실패", err);
    }
  };

  // 상세 조회
  const fetchQnaDetail = async (id) => {
    try {
      const res = await getQnaDetail(id);
      if (res.data.success) {
        setCurrentQna(res.data.qna);
        setAnswers(res.data.answers || []);

        console.log("QnA 상세 조회 성공-fetchQnaDetail", res.data);
      }
    } catch (err) {
      console.error("QnA 상세 조회 실패", err);
    }
  };
  // 목록 클릭 기능 및 토글 
  const handleRowClick = (row) => {
  if (currentQna?.id === row.id) {
    setCurrentQna(null);
    setAnswers([]);
  } else {
    fetchQnaDetail(row.id);
  }
};

  useEffect(() => {
    fetchQnaList();
  }, [page, keyword]);

  const dataForTab =
    activeTab === "all"
      ? allQnaList
      : activeTab === "noanswer"
      ? noAnswerQnaList
      : answeredQnaList;

  /** 답변 CRUD */
  // 답변 등록 
  const handleCreateAnswer = async (e) => {
    const adminId = getAdminIdSomehow();
    e.preventDefault();
    if (!newAnswer.trim()) return;
    await createQnaAnswer(currentQna.id, newAnswer, adminId);
    setNewAnswer("");
    fetchQnaDetail(currentQna.id);
  };

  const handleEditAnswer = (ans) => {
    setEditAnswerId(ans.id);
    setEditAnswerContent(ans.content);
    setTimeout(() => {
      editTextareaRef.current?.focus();
    }, 0);
  };

    const getAdminIdSomehow = () => {
    // 실제 어드민 ID를 가져오는 로직 (예: localStorage, context API 등)
    // 이 예시에서는 하드코딩된 값을 사용합니다.
    return 1; 
  };
  
  // 답변 수정
const saveEditAnswer = async (e) => {
  e.preventDefault();
  try {
    const adminId = getAdminIdSomehow();
    console.log("adminId",adminId )
    await updateQnaAnswer(editAnswerId, currentQna.id, editAnswerContent, adminId);
    setEditAnswerId(null);
    setEditAnswerContent("");
    fetchQnaDetail(currentQna.id);
  } catch (error) {
    console.error("답변 수정 실패", error);
  }
};


  // 답변 삭제
  const removeAnswer = async (id) => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    try {
      await deleteQnaAnswer(id);
      fetchQnaDetail(currentQna.id);
    } catch (error) {
      console.error("답변 삭제 실패", error);
    }
  };


  const removeQnaItem = async (id) => {
    if (!window.confirm("질문을 삭제하시겠습니까?")) return;
    await deleteQna(id);
    fetchQnaList();
    setCurrentQna(null);
    setAnswers([]);
  };

  return (
    <main className="admin py-5 bg-resonos-dark min-vh-80">
      <div className="container admin-container max-w-1200">
        <h2 className="mb-4 text-light-gold fw-bold">Q&A 관리</h2>

        <SearchForm
          initialKeyword={keyword}
          onSearch={setKeyword}
          placeholder="제목 검색"
        />

        <div className="row gx-4">
          {/* 좌측 목록 */}
          <div className="col-md-4">
            <TabsGeneric
              tabs={tabs}
              activeKey={activeTab}
              onChange={setActiveTab}
            />
            <TableColumnHeader columns={qnaColumns} />
            <TableContentGeneric
              items={dataForTab}
              columns={qnaColumns}
              onRowClick={handleRowClick}   
            />
            {pagination.totalPages > 1 && (
            <Pagination
              page={page}
              first={1}
              last={pagination.totalPages}
              prev={page > 1 ? page - 1 : 1}
              next={page < pagination.totalPages ? page + 1 : pagination.totalPages}
              start={Math.max(1, page - 4)}
              end={Math.min(pagination.totalPages, page + 5)}
              pageUri={`/admin/qna?keyword=${encodeURIComponent(keyword)}`}
              onPageChange={setPage}   // ✅
            />

            )}
          </div>

          {/* 우측 상세 */}
          <div className="col-md-8">
            <section className="resonos-card p-4 bg-resonos-dark rounded-3 mt-4 overflow-auto qna-detail">
              {console.log("currentQna : {}", currentQna )}
              {!currentQna ? (
                <p className="text-center text-muted fs-5">
                  문의글을 선택하세요.
                </p>
              ) : (
                <>
                  <h4>{currentQna.title}</h4>
                  <p className="pre-wrap">{currentQna.content}</p>
                  <small className="text-muted">
                    작성일: {new Date(currentQna.createdAt).toLocaleString()}
                  </small>
                  <hr />
                  <h5>답변 목록</h5>
                  {answers.length === 0 && (
                    <div className="text-muted fst-italic mb-3">
                      등록된 답변이 없습니다.
                    </div>
                  )}
                  <ul className="list-group mb-3">
                    {answers.map((ans) => (
                      <li key={ans.id} className="list-group-item bg-dark text-light">
                        {editAnswerId === ans.id ? (
                          <form onSubmit={saveEditAnswer}>
                            <textarea
                              ref={editTextareaRef}
                              className="form-control mb-2"
                              rows="5"
                              value={editAnswerContent}
                              onChange={(e) => setEditAnswerContent(e.target.value)}
                              required
                            />
                            <button className="btn btn-warning btn-sm me-2">수정완료</button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => setEditAnswerId(null)}
                            >
                              취소
                            </button>
                          </form>
                        ) : (
                          <>
                            <p className="pre-wrap">{ans.content}</p>
                            <small>{new Date(ans.answeredAt).toLocaleString()}</small>
                            <div>
                              <button
                                className="btn btn-outline-warning btn-sm me-2"
                                onClick={() => handleEditAnswer(ans)}
                              >
                                수정
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => removeAnswer(ans.id)}
                              >
                                삭제
                              </button>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* 답변 등록 */}
                  <form onSubmit={handleCreateAnswer}>
                    <FormInput
                      label="답변 내용"
                      type="textarea"
                      name="content"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      required
                      containerClassName="mb-3"
                    />
                    <button type="submit" className="btn btn-gold px-4">
                      등록
                    </button>
                  </form>

                  <div className="mt-3">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeQnaItem(currentQna.id)}
                    >
                      질문 삭제
                    </button>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
      <QuickMenu />
    </main>
  );
};

export default AdminQnAContainer;
