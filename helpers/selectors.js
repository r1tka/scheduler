
function getAppointmentsForDay(state, dayName) {
  const days = state.days
  let appointmentsForDay = [];
  const appointments = Object.values(state.appointments);

  if (!days.length || !appointments.length) return appointmentsForDay

  const resultDay = days.filter(day => day.name === dayName)
  const dayAppointments = resultDay[0].appointments

  for (let appointment of appointments) {
    if (dayAppointments[appointment.id]) {
      appointmentsForDay.push(appointment)
    }
  }

  return appointmentsForDay;
}


function getInterview(state, interview) {
  let result = { "student": null, "interviewer": null };
  if (!interview) {
    return null;
  } else {
    const { interviewer, student } = interview;
    console.log('resultqwsqws', interviewer)

    if (interviewer) {
      result["interviewer"] = state.interviewers[interviewer.toString()];
      result["student"] = student;
    }
    console.log('result', result)
    return result;
  }
};
export { getAppointmentsForDay, getInterview }