import React, { useState, useEffect } from 'react'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import "./styles.scss";
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_DELETE = "ERROR_DELETE";
const EDIT = "EDIT";


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
    transition(EDIT)
  }
  function handleDeleteClick(id) {
    console.log("Delete click")
    transition(CONFIRM, true)

    // Promise.resolve(props.cancelInterview(id))
    //   .then(() => transition(EMPTY))
    //   .catch((error) => { transition(ERROR_DELETE, true); console.log(error) });
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
      {mode === EDIT &&
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
          onCancel={() => transition(SHOW)}
        />
      }
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => {
            transition(SHOW);
          }}
          onConfirm={() => {
            transition(DELETING)
          }}
        />
      )}
    </article>

  )
}
