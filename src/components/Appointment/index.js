import React from "react";
import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const EDIT = "EDIT";

export default function Appointment({
  id, interview, interviewers, bookInterview, cancelInterview, ...props
}) {
  // use custom hook for changing modes
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  //saving student name and interviewer
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    Promise.resolve(bookInterview(id, interview))
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function confirm() {
    transition(CONFIRM)
  }
  function deleteAppointment(id) {
    transition(DELETING, true)
    Promise.resolve(cancelInterview(id))
      .then(() => transition(EMPTY))
      .catch((error) => {
        transition(ERROR_DELETE, true);
        console.log(error)
      });
  }

  function editAppointment() {
    transition(EDIT);
  }

  return (
    <article className="appointment"
      data-testid="appointment"
    >
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === EDIT &&
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
          onCancel={() => transition(SHOW)}
        />
      }
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onCancel={confirm}
          onEdit={editAppointment}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
          onCancel={back}
        />
      }
      {mode === SAVING &&
        <Status
          message={"Saving"}
        />
      }
      {mode === DELETING &&
        <Status
          message={"Deleting"}
        />
      }
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => {
            transition(SHOW);
          }}
          onConfirm={() => {
            deleteAppointment(id)
          }}
        />
      )}
      {mode === ERROR_SAVE &&
        <Error
          message={"Could not save appointment."}
          onClose={back}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message={"Could not cancel appointment."}
          onClose={back}
        />
      }
    </article>
  )
}