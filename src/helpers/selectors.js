export default function getAppointmentsForDay(state, day) {
  let ans = []
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
// export default function getAppointmentsForDay(state, day) {
//   console.log(state.days);
//
//   const getApptIds = () => {
//     try {
//       return state.days.filter(item => item.name === day)[0].appointments;
//     }
//     catch {
//       return [];
//     }
//   };
//
//   console.log(state.days);
//   const ans = getApptIds();
//
//   for (let i = 0; i < ans.length; i++) {
//     ans.push(state.appointments[String(ans[0])]);
//     ans.shift()
//   }
//   return ans;
// };
