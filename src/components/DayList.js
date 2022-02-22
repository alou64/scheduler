import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const parsedDays = props.days.map(day => <DayListItem key={day.id} {...day} />);

  return (
      <>{ parsedDays }</>
  );
};
