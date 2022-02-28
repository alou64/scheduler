import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from './DayList';
import InterviewerList from './InterviewerList';
import Appointment from './Appointment/index';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'

//
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];


// const [day, setDay] = useState('Monday');

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});

    return axios
      .put(`/api/appointments/${id}`, {interview})
      .then(() => setState({...state, appointments}))
  };

  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    console.log(dailyAppointments);
    console.log(`INTERVIEW: ${interview}`);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
      />
    )
  });

  schedule.push(<Appointment key="last" time="5pm" />);

  const setDay = day => {
    setState({ ...state, day });
  };


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then(([days, appointments, interviewers]) => {
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
    });
  }, []);

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
            <DayList
              days={state.days}
              value={state.day}
              onChange={setDay}
            />
          </nav>
          <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { schedule }
      </section>
    </main>
  );
}



// <DayList
//   days={state.days}
//   value={state.day}
//   onChange={setDay}
// />
