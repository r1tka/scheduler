import React from "react";
import className from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem({
  id, selected, setInterviewer, avatar, name
}) {

  const ItemClass = className("interviewers__item",
    {
      "interviewers__item--selected": selected
    }
  )
  return (
    <li
      key={id}
      className={ItemClass}
      onClick={setInterviewer}
    >
      <img
        className='interviewers__item-image'
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}