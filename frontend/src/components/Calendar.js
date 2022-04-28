import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarFunc = (props)=> {
  const [value, setDate] = useState(new Date());
  const num_weeks = 2

  const insideChildHandler = (e)=>{
    setDate(e)
    props.onChange(e)
  }
  const today = new Date();
  today.setDate(today.getDate()+1)

  return (
    <div>
      <Calendar
        id='cal'
        onChange={insideChildHandler}
        value={value}
        defaultView='month'
        minDate={today}
        maxDate={new Date(Date.now()+num_weeks*6.048e+8)}
        tileDisabled={({date})=>{
          let temp = date.getDate().toString().concat('/', (date.getMonth()+1).toString(),'/', (date.getFullYear()).toString())
          return ((props.disableTiles.includes(temp)))
        }}
      />
      
    </div>
  );
}

export default CalendarFunc;