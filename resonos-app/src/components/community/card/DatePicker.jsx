import React, { useEffect } from "react"
import {MySwal} from '../../../apis/alert'

const DatePicker = ({ setClosedAt, vote }) => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  // 로컬(KST) 기준 현재 시간에 +3시간
  const threeHoursLater = new Date(now.getTime() - offset + 3 * 60 * 60 * 1000);
  // input[type=datetime-local]에 맞는 포맷 (YYYY-MM-DDTHH:mm)
  const minTime = threeHoursLater.toISOString().slice(0, 16);

  // const localISOTime = new Date(now - offset).toISOString().slice(0, 16);
  // console.log(now.getTimezoneOffset())
  // console.log(localISOTime)

  // 데이트 객체 값 시:분 까지 자르는 함수
  const formatForDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  }

  const handleClosedAt = (e) => {
    let selected = e.target.value // YYYY-MM-DDTHH:mm
    console.log("ISOString() :", new Date().toISOString())
    console.log("minTime :", minTime)
    console.log("selected :", selected)

    if (selected < minTime) {
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
      alert("현재시간 기준 3시간 이후로 가능합니다.")
      selected = minTime
    }

    setClosedAt(selected)
    e.target.value = selected
  }

  useEffect(() => {
    setClosedAt(minTime)
  }, [minTime])

  return (
    <input
      type="datetime-local"
      min={minTime}
      className="border-form"
      id="datePicker"
      onChange={handleClosedAt}
      defaultValue={vote?.closedAt ? formatForDatetimeLocal(vote.closedAt) : minTime}
    />
  )
}

export default DatePicker
