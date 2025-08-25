import React from "react"

const DatePicker = ({ setClosedAt }) => {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  const localISOTime = new Date(now - offset).toISOString().slice(0, 16)

  const handleClosedAt = (e) => {
    let selected = e.target.value // YYYY-MM-DDTHH:mm
    console.log("localISOTime:", localISOTime)
    console.log("selected:", selected)

    if (selected < localISOTime) {
      alert("현재 시간 이후로만 가능합니다.")
      selected = localISOTime
    }

    setClosedAt(selected.replace("T", " "))
    e.target.value = selected
  }

  return (
    <input
      type="datetime-local"
      min={localISOTime}
      id="datePicker"
      onChange={handleClosedAt}
    />
  )
}

export default DatePicker
