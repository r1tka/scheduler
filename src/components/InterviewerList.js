import React from "react";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  InterviewerList.propTypes = {
    value: PropTypes.number,
    setInterviewer: PropTypes.func.isRequired
  };
//render InterviewerListItem
  const list = props.interviewers.map((interviewer) => {
    const { id, name, avatar } = interviewer;
    console.log('id', id)

    
    return (
       <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}    
/>
    )
  })
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {list}
      </ul>
    </section>
  )
}