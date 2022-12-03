import React, { useState } from 'react'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "./styles.scss";


export default function Appointment(props) {
  function handleEditClick() {
    console.log("Edit click")
  }
  function handleDeleteClick() {
    console.log("Delete click")
  }
  function handleAddClick() {
    console.log("Add click")
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ?
        <Show
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
        :
        <Empty onAdd={handleAddClick} />
      }
    </article>
  )
}

