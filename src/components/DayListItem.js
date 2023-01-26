import React from "react";
import className from "classnames";
import "components/DayListItem.scss"

export default function DayListItem({ selected, spots, name, setDay }) {

  /* different viws of days depending on spots left */
  let dayClass = className("day-list__item",
    {
      "day-list__item--selected": selected,
      "day-list__item--full": spots === 0
    })

  /* specific text based on spots left */
  const formatSpots = () =>
    spots === 0
      ? 'no spots remaining'
      : spots === 1
        ? `${spots} spot remaining`
        : `${spots} spots remaining`;

  return (
    <li
      data-testid="day"
      onClick={() => setDay(name)}
      className={dayClass}
    >
      <h2>{name}</h2>
      <h3>{formatSpots()}</h3>
    </li>
  );
}