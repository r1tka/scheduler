
function getAppointmentsForDay(state, dayName) {
  const days = state.days
  let appointmentsForDay = [];
  const resultDay = days.filter(day => day.name === dayName)
  const dayAppointments = resultDay[0].appointments
  const appointments = Object.values(dayAppointments);
  resultDay[0].appointments.forEach(element => {
    appointmentsForDay.push(appointments[element - 1]);
  });
  return appointmentsForDay;
}
getAppointmentsForDay()