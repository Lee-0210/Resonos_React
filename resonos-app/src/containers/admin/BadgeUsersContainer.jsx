import React, { useEffect, useState } from "react";
import { getBadgeUsers } from "../../apis/admin"; 
import { useParams, Link } from "react-router-dom";
import TableColumnHeader from "../../components/admin/first/TableColumnHeader";
import TableContentGeneric from "../../components/admin/first/TableContentGeneric";
import QuickMenu from "../../components/admin/first/QuickMenu";
import { formatDate } from "../../utils/format";

const BadgeUsersContainer = () => {
  const { badgeId } = useParams();
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getBadgeUsers(badgeId);
      setUsers(res.data.users || []);
      setLogs(res.data.logs || []);
      // console.log("배지 지급자 목록 조회 성공", res.data);
    } catch (err) {
      // console.error("배지 지급자 목록 조회 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [badgeId]);

  // 컬럼 정의 (기존과 동일)
  const userColumns = [
    { label: "#", style: { flexBasis: "5%", minWidth: "30px" }, render: (item, idx) => idx + 1 },
    { label: "유저ID", style: { flexBasis: "15%", minWidth: "60px" }, render: item => item.userId },
    { label: "유저명", style: { flexBasis: "30%", minWidth: "100px" }, render: item => item.userName },
    { label: "지급일시", style: { flexBasis: "30%", minWidth: "140px" },  render: item => item.createdAt ? formatDate(item.createdAt) : "-" },
    { label: "액션", style: { flexBasis: "20%", minWidth: "100px" }, render: item => (
      <Link to={`/admin/badge/user/${item.userId}`} className="btn btn-info btn-xs">유저 배지 이력</Link>
    )},
  ];

  const logColumns = [
    { label: "#", style: { flexBasis: "5%", minWidth: "30px" }, render: (item, idx) => idx + 1 },
    { label: "유저ID", style: { flexBasis: "15%", minWidth: "60px" }, render: item => item.userId },
    { label: "액션", style: { flexBasis: "15%", minWidth: "60px" }, render: item => {
      if (item.action === "GRANT") return <span className="badge bg-success">지급</span>;
      if (item.action === "REVOKE") return <span className="badge bg-danger">회수</span>;
      return <span className="badge bg-secondary">기타</span>;
    }},
    { label: "담당자", style: { flexBasis: "15%", minWidth: "60px" }, render: item => item.actorId || "-자동-" },
    { label: "사유", style: { flexBasis: "30%", minWidth: "100px" }, render: item => item.reason || "-" },
    { label: "일시", style: { flexBasis: "20%", minWidth: "140px" }, render: item => item.createdAt ? formatDate(item.createdAt) : "-" },
  ];

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        배지 지급자 목록 <span className="text-info">(Badge ID: {badgeId})</span>
      </h2>

      <div className="mb-3">
        <Link to="/admin/badge" className="btn btn-outline-primary btn-sm">
          &laquo; 배지 관리로
        </Link>
      </div>

      {/* 지급자(보유자) */}
      <div className="admin resonos-card mb-4">
        <div className="fw-semibold bg-resonos-dark text-light p-2">
          지급/보유자 현황
        </div>
        {loading ? (
          <div className="p-3">로딩중...</div>
        ) : users.length > 0 ? (
          <>
            <TableColumnHeader columns={userColumns} />
            <TableContentGeneric items={users} columns={userColumns} />
          </>
        ) : (
          <div className="text-secondary text-center py-3">
            아직 해당 배지를 보유한 사용자가 없습니다.
          </div>
        )}
      </div>

      {/* 지급/회수 이력 */}
      <div className="admin resonos-card mb-4">
        <div className="fw-semibold bg-resonos-dark text-light p-2">
          이 배지의 지급/회수 이력
        </div>
        {loading ? (
          <div className="p-3">로딩중...</div>
        ) : logs.length > 0 ? (
          <>
            <TableColumnHeader columns={logColumns} />
            <TableContentGeneric items={logs} columns={logColumns} />
          </>
        ) : (
          <div className="text-secondary text-center py-3">
            이 배지 지급/회수 이력이 없습니다.
          </div>
        )}
      </div>

      <QuickMenu />
    </div>
  );
};

export default BadgeUsersContainer;
