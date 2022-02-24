import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const parsedDays = props.days.map(day => (
    <DayListItem key={props.id}
      name={props.name}
      spots={props.spots}
      selected={props.name === props.value}
      setDay={props.onChange}
    />
    )
  );

  return (
      <ul>{ parsedDays }</ul>
  );
};







// const parsedDays = props.days.map(day => <DayListItem key={day.id} {...day} />);
