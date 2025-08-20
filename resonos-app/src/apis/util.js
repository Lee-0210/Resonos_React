// 연도/월/일 시:분
export function formatDate(datetime) {
  const date = new Date(datetime);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// 연도/월/일
export function formatDateNotTime(datetime) {
  const date = new Date(datetime);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// 시:분
export function formatDateNotDay(datetime) {
  const date = new Date(datetime);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// 시:분:초 까지
export function formatDateWithSeconds(datetime) {
  const date = new Date(datetime);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}