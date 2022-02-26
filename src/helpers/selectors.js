export default function getAppointmentsForDay(state, day) {
  const getApptIds = () => {
    try {
      return state.days.filter(item => item.name === day)[0].appointments;
    }
    catch {
      return [];
    }
  };

  const ans = getApptIds();

  for (let i = 0; i < ans.length; i++) {
    ans.push(state.appointments[String(ans[0])]);
    ans.shift()
  }

  return ans;
};
