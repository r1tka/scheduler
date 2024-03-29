import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form({ onCancel, onSave, ...props }) {
  /* creating hooks */
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  /* reset the student name to empty and interviewer to null */

  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  /* cancel button */
  const cancel = () => {
    reset();
    onCancel();
  };
  /* check if student name is not blank */
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select interviewer")
      return
    }

    setError("");
    onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          autoComplete="off"
          onSubmit={event => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          setInterviewer={setInterviewer}
          interviewer={interviewer || ""}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button
            confirm
            onClick={validate}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  )
} 