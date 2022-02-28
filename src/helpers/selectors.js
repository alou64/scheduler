// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };


function getAppointmentsForDay(state, day) {
  let ans = [];
  let appts = [];

  for (const item of state.days) {
    if (item.name === day) {
      appts = item.appointments;
    }
  }

  for (const num of appts) {
    ans.push(state.appointments[String(num)]);
  }

  return ans;
};


function getInterviewersForDay(state, day) {
  let ans = [];
  let interviewersForDay = [];

  for (const item of state.days) {
    if (item.name === day) {
      interviewersForDay = item.interviewers;
    }
  }

  for (const id of interviewersForDay) {
    try {
      ans.push(state.interviewers[id]);
    } catch {
      continue;
    }
  }

  return ans;
};


function getInterview(state, interview) {
  try {
    return {
      'student': interview.student,
      'interviewer': {
        'id': interview.interviewer,
        'name': state.interviewers[String(interview.interviewer)].name,
        'avatar': state.interviewers[String(interview.interviewer)].avatar
      }
    };
  } catch {
    return null;
  }
};


module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
