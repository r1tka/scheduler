import React from "react";
import DayListItem from "components/DayListItem"

export default function DayList({ days, setDay, ...props }) {
  //render dayListItem
  const dayList = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={setDay}
      />
    );
  })
  return (
    <ul>
      {dayList}
    </ul>
  )
}