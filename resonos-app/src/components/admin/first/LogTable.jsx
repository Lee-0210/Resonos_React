import React, { useState } from 'react';

const LogTable = ({
  data = [],
  columns = [],
  noDataText = '데이터가 없습니다.',
  dateFormatFunc = (val) => val,
  initialVisible = 10, // 초기에 표시할 개수
  increment = 10, // "더보기" 클릭할 때마다 늘릴 개수
}) => {
  const [visibleCount, setVisibleCount] = useState(initialVisible);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + increment);
  };

  const visibleData = data.slice(0, visibleCount);

  return (
    <div className="admin resonos-card p-4">
      {/* 테이블 헤더 */}
      <div className="list-group-item bg-secondary text-dark fw-bold d-flex flex-nowrap align-items-center text-center justify-content-center width-100">
        {columns.map((col, idx) => (
          <div
            key={idx}
            style={{
              flexBasis: col.style?.flexBasis || col.style?.width,
              minWidth: col.style?.minWidth || 80,
            }}
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* 테이블 본문 */}
      <div className="list-group width-100">
        {visibleData.length > 0 ? (
          visibleData.map((item, rowIndex) => (
            <div
              key={item.id || rowIndex}
              className="list-group-item d-flex flex-nowrap align-items-center text-center"
            >
{columns.map(({ key, isDate, style }, colIndex) => {
  let value = item[key];
  if (isDate && value) {
    try {
      value = dateFormatFunc(value);
    } catch (e) {
      console.error("dateFormatFunc error:", e);
      value = "-";
    }
  }

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      key={colIndex}
      style={{
        flexBasis: style?.flexBasis || style?.width,
        minWidth: style?.minWidth || 80,
        overflow: expanded ? "visible" : "hidden",
        whiteSpace: expanded ? "normal" : "nowrap",
        textOverflow: expanded ? "clip" : "ellipsis",
        cursor: "pointer",
      }}
      onClick={() => setExpanded(!expanded)} // 클릭으로 토글
      title={!expanded ? value : undefined}
    >
      {value ?? "-"}
    </div>
  );
})}
            </div>
          ))
        ) : (
          <div className="list-group-item text-center text-secondary py-3">
            {noDataText}
          </div>
        )}
      </div>

      {/* 더보기 버튼 */}
      {visibleCount < data.length && (
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-gold btn-sm"
            onClick={handleShowMore}
          >
            더보기 ({visibleCount}/{data.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default LogTable;
