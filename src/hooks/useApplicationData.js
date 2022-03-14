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

  const setDay = day => {
    setState({ ...state, day });
  };

  const updateSpots = (id, action) => {
    let days = [...state.days];
    for (const day of days) {
      if (day.appointments.includes(id)) {
        // action === "book" ? (day.spots -= 1) : (day.spots += 1);
        if (action === "book") {
          day.spots -= 1;
        } else if (action === "cancel") {
          day.spots += 1;
        }
        break;
      }
    }
    return days;
  };

  const bookInterview = (id, interview, action) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(id, action);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({ ...state, days, appointments });
    });
  };

  const cancelInterview = id => {
    return axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then(() => {
        const days = updateSpots(id, "cancel");
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({ ...state, days, appointments });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
