import axios from "axios";
import { useState, useEffect } from "react";

// custom hook to load initial API data and handle state actions
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    setState({ ...state, day });
  };

  const updateSpots = (id, action) => {
    let days = [...state.days];
    for (const day of days) {
      if (day.appointments.includes(id)) {
        action === "book" ? (day.spots -= 1) : (day.spots += 1);
        break;
      }
    }
    return days;
  };

  const bookInterview = (id, interview) => {
    const days = updateSpots(id, "book");
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, days, appointments }));
  };

  const cancelInterview = id => {
    const days = updateSpots(id, "cancel");
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then(() => setState({ ...state, days, appointments }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
