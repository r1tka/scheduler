
/*
getAppontmentsForDay is a function used to get all appointments for
a specific day. This is achieved by getting selected day from 
days endpoint, and appointments for this day from appointments endpoint.
 */

function getAppointmentsForDay(state, dayName) {
  const days = state.days
  let appointmentsForDay = [];
  if (!days.length || !state.appointments) return appointmentsForDay
  const appointments = Object.values(state.appointments);


  const resultDay = days.filter(day => day.name === dayName)
  if (!resultDay.length) return appointmentsForDay

  const dayAppointments = resultDay[0].appointments

  for (let appointment of appointments) {
    if (dayAppointments.includes(appointment.id)) {
      appointmentsForDay.push(appointment)
    }
  }

  return appointmentsForDay;
}

/*
getInterviewersForDay is a function used to get all interviewers for
a specific day. This is achieved by getting selected day from 
days endpoint, and interviewers for selected day from
interviewers endpoint.
 */

function getInterviewersForDay(state, day) {
  let interviewersForDay = [];
  if (!state.interviewers) {
    return interviewersForDay
  }
  const resultDay = state.days.filter(d => d.name === day);
  if (resultDay[0] !== undefined) {
    const interviewers = Object.values(state.interviewers);

    resultDay[0].interviewers.forEach(element => {
      interviewersForDay.push(interviewers[element - 1]);
    });
  }
  return interviewersForDay;
}

/*
getInterview is a function used to return interview object.
With interviewer and student information.
 */

function getInterview(state, interview) {
  let result = { "student": null, "interviewer": null };
  if (!interview) {
    return null;
  } else {
    const { interviewer, student } = interview;

    if (interviewer) {
      const interviewerString = interviewer.toString()
      result["interviewer"] = state.interviewers[interviewerString];
      result["student"] = student;
      return result;
    }
    return null
  }
};

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }