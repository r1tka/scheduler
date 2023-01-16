import React, { useState, useEffect } from 'react'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import "./styles.scss";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
    transition(SHOW)
  };


  function handleEditClick() {
    console.log("Edit click")
  }
  function handleDeleteClick() {
    console.log("Delete click")
    transition(DELETING)
  }
  function handleAddClick() {
    transition(CREATE)
  }
  function handleOnCancel() {
    back()
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={handleAddClick} />}
      {mode === SHOW &&
        <Show
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      }

      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={handleOnCancel}
        onSave={(name, interviewer) => {
          save(name, interviewer);
        }}

      />
      }
    </article>
  )
}

