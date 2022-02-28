import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    setState({ ...state, day });
  };

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

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    setState({...state, appointments});
    return axios
      .delete(`/api/appointments/${id}`, {interview: null})
      .then(() => setState({...state, appointments}));
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

  return { state, setDay, bookInterview, cancelInterview};
};
