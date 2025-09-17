import React, { useState } from "react";
import SearchForm from "../first/SearchForm";

const SpotifySearchWithResults = ({ searchFn, type, onSync }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  // 동기화 상태 관리
  const [syncingItems, setSyncingItems] = useState(new Set()); // 현재 동기화 중인 항목들
  const [syncedItems, setSyncedItems] = useState(new Set()); // 동기화 완료된 항목들

  const handleSearch = async (kw) => {
    if (!kw.trim()) return;
    setLoading(true);
    // 새로운 검색시 동기화 상태 초기화
    setSyncingItems(new Set());
    setSyncedItems(new Set());
    
    try {
      const res = await searchFn(kw);
      const data = res.data || {};
      console.log('Spotify artist search response:', data);
      
      const items = data.artists || [];
      setResults(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error(`${type} 검색 오류:`, err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 동기화 처리 함수
  const handleConfirmSync = async (id) => {
    if (!window.confirm("정말 이 항목을 동기화하시겠습니까?")) {
      return;
    }

    // 동기화 시작
    setSyncingItems(prev => new Set([...prev, id]));

    try {
      // onSync가 Promise를 반환한다면 await 사용
      if (onSync) {
        await onSync(id);
      }
      
      // 동기화 완료
      setSyncingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setSyncedItems(prev => new Set([...prev, id]));

      // 선택사항: 완료 메시지 표시 후 일정 시간 후 상태 제거
      setTimeout(() => {
        setSyncedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 3000); // 3초 후 완료 상태 제거

    } catch (error) {
      console.error('동기화 오류:', error);
      // 동기화 실패시 진행 상태 제거
      setSyncingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      alert('동기화에 실패했습니다.');
    }
  };

  // 버튼 렌더링 함수
  const renderSyncButton = (item) => {
    const isSyncing = syncingItems.has(item.id);
    const isSynced = syncedItems.has(item.id);

    if (isSyncing) {
      return (
        <button className="btn btn-warning btn-sm" disabled>
          <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          동기화 중...
        </button>
      );
    }

    if (isSynced) {
      return (
        <button className="btn btn-success btn-sm" disabled>
          ✓ 완료
        </button>
      );
    }

    return (
      <button
        className="btn btn-gold btn-sm"
        onClick={() => handleConfirmSync(item.id)}
      >
        동기화
      </button>
    );
  };

  return (
    <div className="mb-3 admin">
      <SearchForm
        placeholder={`Spotify ${type} 검색`}
        buttonLabel="검색"
        onSearch={handleSearch}
      />
      {loading && <div>검색중...</div>}

      {!loading && results.length > 0 && (
        <div
          className="list-group mb-2"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid var(--main-color)",
            borderRadius: "4px",
          }}
        >
          {results.map((item) => (
            <div
              key={item.id}
              className="list-group-item d-flex align-items-center"
              style={{ 
                backgroundColor: "var(--background-color)", 
                color: "#fff",
                // 동기화된 항목에 대한 시각적 피드백
                opacity: syncedItems.has(item.id) ? 0.7 : 1
              }}
            >
              {(item.image || item.coverImage || item.images?.[0]?.url) && (
                <img
                  src={item.image || item.coverImage || item.images?.[0]?.url}
                  alt=""
                  style={{
                    width: 32,
                    height: 32,
                    objectFit: "cover",
                    borderRadius: type === "artist" ? "50%" : "4px",
                    marginRight: 8,
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <b>{item.title || item.name}</b>
                <span className="text-muted small ms-2">{item.id}</span>
                {type === "artist" && (
                  <span className="text-muted small ms-2">{item.genres || ""}</span>
                )}
              </div>
              {onSync && renderSyncButton(item)}
            </div>
          ))}
        </div>
      )}

      {/* 전체 동기화 진행 상황 표시 (선택사항) */}
      {syncingItems.size > 0 && (
        <div className="alert alert-info mt-2">
          {syncingItems.size}개 항목을 동기화하고 있습니다...
        </div>
      )}
    </div>
  );
};

export default SpotifySearchWithResults;