import React, { useState, useEffect } from 'react';
import { 
  getCommunityCategoryList, 
  deleteCommunityCategory, 
  updateCommunityCategory 
} from '../../../apis/admin';

const CommunityCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", isKor: true });

  // 목록 조회
  const fetchCategories = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const response = await getCommunityCategoryList(page, size);
      if (response.status === 200) {
        setCategories(response.data.list || []);
        setPagination({
          page,
          size,
          total: response.data.pagination?.total || 0
        });
      }
    } catch (error) {
      console.error('카테고리 목록 조회 오류:', error);
      setMessage('카테고리 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경
  const handlePageChange = (newPage) => {
    fetchCategories(newPage, pagination.size);
  };

  // 단일 삭제
  const handleDelete = async (id) => {
    if (!window.confirm('정말로 이 카테고리를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await deleteCommunityCategory(id);
      if (response.status === 200 && response.data === "SUCCESS") {
        setMessage('카테고리가 성공적으로 삭제되었습니다.');
        fetchCategories(pagination.page, pagination.size);
      } else {
        setMessage('카테고리 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('카테고리 삭제 오류:', error);
      setMessage('카테고리 삭제 중 오류가 발생했습니다.');
    }
  };

  // 전체 삭제
  const handleDeleteAll = async () => {
    if (!window.confirm('정말로 모든 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    try {
      const response = await deleteAllCommunityCategories();
      if (response.status === 200 && response.data === "SUCCESS") {
        setMessage('모든 카테고리가 성공적으로 삭제되었습니다.');
        setCategories([]);
        setPagination({ page: 1, size: 10, total: 0 });
      } else {
        setMessage('전체 카테고리 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('전체 카테고리 삭제 오류:', error);
      setMessage('전체 카테고리 삭제 중 오류가 발생했습니다.');
    }
  };

  // 수정 시작
  const handleEditStart = (category) => {
    setEditingId(category.id);
    setEditData({
      id: category.id,
      name: category.name,
      isKor: category.isKor === 1 || category.isKor === true
    });
  };

  // 수정 저장
  const handleEditSave = async () => {
    try {
      const updateData = {
        id: editData.id,
        name: editData.name.trim(),
        isKor: editData.isKor ? 1 : 0
      };

      const response = await updateCommunityCategory(updateData);
      if (response.status === 200 && response.data === "SUCCESS") {
        setMessage('카테고리가 성공적으로 수정되었습니다.');
        setEditingId(null);
        fetchCategories(pagination.page, pagination.size);
      } else {
        setMessage('카테고리 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('카테고리 수정 오류:', error);
      setMessage('카테고리 수정 중 오류가 발생했습니다.');
    }
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({ name: "", isKor: true });
  };

  // 컴포넌트 마운트시 데이터 로드
  useEffect(() => {
    fetchCategories();
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(pagination.total / pagination.size);
  const startPage = Math.max(1, pagination.page - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  return (
    <div className="community-category-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>커뮤니티 카테고리 관리</h3>
        <div>
          <button 
            className="btn btn-info me-2" 
            onClick={() => fetchCategories(pagination.page, pagination.size)}
            disabled={loading}
          >
            새로고침
          </button>
          <button 
            className="btn btn-danger" 
            onClick={handleDeleteAll}
            disabled={loading || categories.length === 0}
          >
            전체 삭제
          </button>
        </div>
      </div>

      {message && (
        <div className={`alert ${message.includes('성공') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}>
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">로딩중...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>카테고리 이름</th>
                  <th>언어</th>
                  <th>생성일시</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">등록된 카테고리가 없습니다.</td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>
                        {editingId === category.id ? (
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={editData.name}
                            onChange={(e) => setEditData({...editData, name: e.target.value})}
                            maxLength={200}
                          />
                        ) : (
                          category.name
                        )}
                      </td>
                      <td>
                        {editingId === category.id ? (
                          <select
                            className="form-select form-select-sm"
                            value={editData.isKor}
                            onChange={(e) => setEditData({...editData, isKor: e.target.value === 'true'})}
                          >
                            <option value={true}>한국어</option>
                            <option value={false}>English</option>
                          </select>
                        ) : (
                          <span className={`badge ${(category.isKor === 1 || category.isKor === true) ? 'bg-primary' : 'bg-success'}`}>
                            {(category.isKor === 1 || category.isKor === true) ? '한국어' : 'English'}
                          </span>
                        )}
                      </td>
                      <td>{new Date(category.createdAt).toLocaleString()}</td>
                      <td>
                        {editingId === category.id ? (
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-success"
                              onClick={handleEditSave}
                            >
                              저장
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={handleEditCancel}
                            >
                              취소
                            </button>
                          </div>
                        ) : (
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleEditStart(category)}
                            >
                              수정
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(category.id)}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    이전
                  </button>
                </li>
                
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(pageNum => (
                  <li key={pageNum} className={`page-item ${pagination.page === pageNum ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${pagination.page === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === totalPages}
                  >
                    다음
                  </button>
                </li>
              </ul>
            </nav>
          )}

          {/* 통계 정보 */}
          <div className="mt-3 text-muted small">
            총 {pagination.total}개 항목 중 {((pagination.page - 1) * pagination.size) + 1}-{Math.min(pagination.page * pagination.size, pagination.total)}개 표시
          </div>
        </>
      )}
    </div>
  );
};

export default CommunityCategoryList;