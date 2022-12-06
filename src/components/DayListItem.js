import React from "react";
import className from "classnames";
import "components/DayListItem.scss"


export default function DayListItem(props) {

  let dayClass = className("day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    })

  const formatSpots = (spots) =>
    spots === 0
      ? 'no spots remaining'
      : spots === 1
        ? `${spots} spot remaining`
        : `${spots} spots remaining`;


  return (

    <li
      data-testid="day"
      onClick={() => props.setDay(props.name)}
      className={dayClass}
    >
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}