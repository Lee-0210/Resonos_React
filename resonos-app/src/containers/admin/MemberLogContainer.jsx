import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LogTable from '../../components/admin/first/LogTable';
import TableColumnHeader from '../../components/admin/first/TableColumnHeader'; 
import { formatDate as formatDateTime } from '../../utils/format';
import { getMemberLogsByUserId } from '../../apis/admin';
import QuickMenu from '../../components/admin/first/QuickMenu';

const MemberLogContainer = ({ userId }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Column 정의 (TableColumnHeader 스타일에 맞게)
  const columns = [
    { label: '일시', key: 'createdAt', isDate: true, style: { flexBasis: '20%', minWidth: '150px' } },
    { label: '행동', key: 'action', style: { flexBasis: '20%', minWidth: '120px' } },
    { label: '상세 내용', key: 'detail', style: { flexBasis: '30%', minWidth: '180px' } },
    { label: 'IP', key: 'ipAddress', style: { flexBasis: '15%', minWidth: '100px' } },
    { label: '유형', key: 'targetType', style: { flexBasis: '15%', minWidth: '100px' } },
  ];

  useEffect(() => {
    console.log('MemberLogContainer useEffect 실행, userId:', userId);

    if (!userId) {
      setLogs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getMemberLogsByUserId(userId)
      .then((res) => {
        console.log('받은 활동 로그:', res.data);
        setLogs(res.data || []);
      })
      .catch((error) => {
        console.error('활동 로그 조회 실패', error);
        setLogs([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <main className="resonos-bg py-5" style={{ minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <h2 className="mb-4" style={{ color: '#fffbe6' }}>
          회원 활동 로그
        </h2>

        {/* ✅ 테이블 헤더 */}
        <TableColumnHeader columns={columns} />

        {/* ✅ 테이블 내용 */}
        {loading ? (
          <div>로딩중...</div>
        ) : (
          <LogTable
            data={logs}
            columns={columns}
            noDataText="활동 로그가 없습니다."
            dateFormatFunc={formatDateTime}
          />
        )}

        <a href="/admin/members" className="btn btn-outline-gold mt-3">
          회원 목록으로
        </a>
      </div>
      <QuickMenu />
    </main>
  );
};

export default MemberLogContainer;
