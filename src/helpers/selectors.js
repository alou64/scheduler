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
      interviewersForDay = [...item.interviewers];
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
