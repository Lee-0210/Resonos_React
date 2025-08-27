import React from 'react';

const ReportDetailPanel = ({ report, onStatusChange, onDelete }) => {
  if (!report) return null;


return (
  <div className="admin resonos-card mb-3">
    <h5 className="text-light-gold mb-3">신고 상세 정보</h5>
    <div className="row width-100">
      <div className="col-md-6 text-start">
        <p><strong>신고 ID:</strong> {report.id}</p>
        <p>
          <strong>게시글 이동:</strong>
         {(
            <a href={`http://localhost:5173/community/boards/${report.communityId}/posts/${report.boardPostId}`} target="_blank" rel="noreferrer" className="btn btn-outline-gold btn-xs ms-2">
              게시글 바로가기
            </a>
          )}
        </p>
        <p><strong>대상 ID:</strong> {report.boardPostId}</p>
        <p><strong>사유:</strong> {report.reason}</p>
      </div>
      <div className="col-md-6 text-start">
        <p><strong>신고자:</strong> {report.reporterId}</p>
        <p><strong>신고일시:</strong> {report.createdAt}</p>
        <p><strong>상태:</strong> {report.status}</p>
        <p><strong>처리자:</strong> {report.adminId || '-'}</p>
        {report.processedAt && <p><strong>처리일시:</strong> {report.processedAt}</p>}
        {report.processMemo && <p><strong>처리메모:</strong> {report.processMemo}</p>}
      </div>
    </div>
    <div className="mt-3 text-end">
      <select
        className="form-select form-select-sm d-inline-block w-auto me-2"
        value={report.status}
        onChange={(e) => onStatusChange(report.id, e.target.value)}
      >
        <option value="PENDING">대기</option>
        <option value="PROCESSED">처리</option>
        <option value="REJECTED">기각</option>
      </select>
      <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(report.id)}>삭제</button>
    </div>
  </div>
);

};

export default ReportDetailPanel;
