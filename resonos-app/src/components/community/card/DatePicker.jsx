import React from "react"
import {MySwal} from '../../../apis/alert'

const DatePicker = ({ setClosedAt, vote }) => {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  const localISOTime = new Date(now - offset).toISOString().slice(0, 16)

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

    setClosedAt(selected.replace("T", " "))
    e.target.value = selected
  }

  return (
    <input
      type="datetime-local"
      min={localISOTime}
      className="border-form"
      id="datePicker"
      onChange={handleClosedAt}
      defaultValue={vote?.closedAt}
    />
  )
}

export default DatePicker
