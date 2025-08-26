import React from "react"
import {MySwal} from '../../../apis/alert'

const DatePicker = ({ setClosedAt, vote }) => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now - offset).toISOString().slice(0, 16);

  // 데이트 객체 값 시:분 까지 자르는 함수
  const formatForDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  }

  const handleClosedAt = (e) => {
    let selected = e.target.value // YYYY-MM-DDTHH:mm
    console.log("localISOTime:", localISOTime)
    console.log("selected:", selected)

    if (selected < localISOTime) {
      // MySwal.fire({
      //   position: "center",
      //   icon: "warning",
      //   title: '현재시간 이후로 가능합니다.',
      //   showConfirmButton: false,
      //   timer: 800,
      //   customClass: {
      //     popup: 'follow-popup',
      //     icon: 'success-icon',
      //     title: 'alert-title'
      //   }
      // })
      alert("현재시간 이후로 가능합니다.")
      selected = localISOTime
    }

    setClosedAt(selected)
    e.target.value = selected
  }

  return (
    <input
      type="datetime-local"
      min={localISOTime}
      className="border-form"
      id="datePicker"
      onChange={handleClosedAt}
      defaultValue={vote?.closedAt ? formatForDatetimeLocal(vote.closedAt) : localISOTime}
    />
  )
}

export default DatePicker
