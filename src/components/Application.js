import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);

  const handleSetDay = (day) => {
    console.log('daye', day)
    setState(prev => ({ ...prev, day: day }))
  }

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log('interview', interview)

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/interviewers'),
      axios.get('api/appointments')
    ]).then((response) => {
      console.log(response);
      setState(prev => ({ ...prev, days: response[0].data }))
      setState(prev => ({ ...prev, interviewers: response[1].data }))
      setState(prev => ({ ...prev, appointments: response[2].data }))
      console.log('interviewers', response[2].data)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('interviewers', state.appointments.interviewers)
  }, [state, state.interviewers])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={handleSetDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
