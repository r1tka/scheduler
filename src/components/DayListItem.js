import React from "react";
import className from "classnames";
import "components/DayListItem.scss"


export default function DayListItem(props) {

  console.log('selected', props.selected, props.name)
  let dayClass = className("day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    })
  const formatSpots = (props) =>
    props.spots === 0
      ? 'no spots remaining'
      : props.spots === 1
        ? `${props.spots} spot remaining`
        : `${props.spots} spots remaining`;

  return (

    <li
      data-testid="day"
      onClick={props.setDay}
      className={dayClass}
    >
      <h2>{props.name}</h2>
      <h3>{formatSpots(props)}</h3>
    </li>
  );
}