import React from 'react';

/**
 * 범용 TableContent
 * 
 * @param {Array} items - 목록 데이터 배열
 * @param {Array} columns - [{ label, style, render: (item, index, pagination) => JSX }]
 * @param {Object} pagination - { page, size, total, totalPages, index }
 * @param {Function} renderDetail - (item) => JSX | null  (상세 행, optional)
 * @param {Function} renderExtraRow - (item) => JSX | null (확장 UI 예: 제재폼, optional)
 * @param {Function} onRowClick - (item) => void  (행 클릭 이벤트 핸들러, optional)
 */
const TableContentGeneric = ({
  items = [],
  columns = [],
  pagination = {},
  renderDetail,
  renderExtraRow,
  onRowClick,
}) => {
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={item.id || index}>
          <div
            id={`row-${item.id || index}`}
            className="admin list-group-item width-100"
            onClick={onRowClick ? () => onRowClick(item) : undefined}
            style={{ cursor: onRowClick ? 'pointer' : 'default' }}
          >
            {columns.map(({ style, render }, colIndex) => (
              <div
                key={colIndex}
                style={{ flexBasis: style?.flexBasis, minWidth: style?.minWidth }}
              >
                {typeof render === 'function'
                  ? render(item, index, pagination)
                  : item[render] ?? '-'}
              </div>
            ))}
          </div>

          {typeof renderExtraRow === 'function' && renderExtraRow(item)}
          {typeof renderDetail === 'function' && renderDetail(item)}
        </React.Fragment>
      ))}
    </>
  );
};

export default TableContentGeneric;
