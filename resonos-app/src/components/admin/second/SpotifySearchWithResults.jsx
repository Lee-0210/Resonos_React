import React, { useState } from "react";
import SearchForm from "../first/SearchForm";

const SpotifySearchWithResults = ({ searchFn, type, onSync }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [syncingItems, setSyncingItems] = useState(new Set());
  const [syncedItems, setSyncedItems] = useState(new Set());

  const handleSearch = async (kw) => {
    if (!kw.trim()) return;
    setLoading(true);
    setSyncingItems(new Set());
    setSyncedItems(new Set());

    try {
      const res = await searchFn(kw);
      const data = res.data || {};
      console.log(`Spotify ${type} search response:`, data);

      let items = [];
      if (type === "artist") {
        items = data.artists || [];
      } else if (type === "album") {
        items = data.albums || [];
      } else if (type === "track") {
        items = data.tracks || [];
      }

      setResults(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error(`${type} 검색 오류:`, err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSync = async (id) => {
    if (!window.confirm("정말 이 항목을 동기화하시겠습니까?")) return;
    setSyncingItems((prev) => new Set([...prev, id]));

    try {
      if (onSync) await onSync(id);

      setSyncingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setSyncedItems((prev) => new Set([...prev, id]));

      setTimeout(() => {
        setSyncedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 3000);
    } catch (error) {
      console.error("동기화 오류:", error);
      setSyncingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      alert("동기화에 실패했습니다.");
    }
  };

  const renderSyncButton = (item) => {
    const isSyncing = syncingItems.has(item.id);
    const isSynced = syncedItems.has(item.id);

    if (isSyncing) {
      return (
        <button className="btn btn-warning btn-sm" disabled>
          <span className="spinner-border spinner-border-sm me-1"></span>
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

  // type별 정보 표시
  const renderItemInfo = (item) => {
    if (type === "artist") {
      return (
        <>
          <b>{item.name}</b>
          <span className="text-muted small ms-2">{item.genres}</span>
        </>
      );
    }

    if (type === "album") {
      return (
        <>
          <b>{item.title}</b>
          <span className="text-muted small ms-2">{item.releaseDate}</span>
        </>
      );
    }

    if (type === "track") {
      return (
        <>
          <b>{item.title}</b>
          <span className="text-muted small ms-2">
            #{item.trackNo} • {(item.duration / 1000).toFixed(0)}s
          </span>
        </>
      );
    }

    return <b>{item.title || item.name}</b>;
  };

  const renderItemImage = (item) => {
    if (type === "artist") {
      return item.image ? (
        <img
          src={item.image}
          alt=""
          style={{
            width: 32,
            height: 32,
            objectFit: "cover",
            borderRadius: "50%",
            marginRight: 8,
          }}
        />
      ) : null;
    }

    if (type === "album") {
      return item.coverImage ? (
        <img
          src={item.coverImage}
          alt=""
          style={{
            width: 32,
            height: 32,
            objectFit: "cover",
            borderRadius: "4px",
            marginRight: 8,
          }}
        />
      ) : null;
    }

    if (type === "track") {
      return null; 
    }

    return null;
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
                opacity: syncedItems.has(item.id) ? 0.7 : 1,
              }}
            >
              {renderItemImage(item)}
              <div style={{ flex: 1 }}>
                {renderItemInfo(item)}
                <span className="text-muted small ms-2">{item.id}</span>
              </div>
              {onSync && renderSyncButton(item)}
            </div>
          ))}
        </div>
      )}

      {syncingItems.size > 0 && (
        <div className="alert alert-info mt-2">
          {syncingItems.size}개 항목을 동기화하고 있습니다...
        </div>
      )}
    </div>
  );
};

export default SpotifySearchWithResults;
