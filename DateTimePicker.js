import React, { useState } from 'react';
import moment from 'moment';

const DateTimePicker = ({ onDateChange, onTimeChange }) => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState(moment().format('HH:mm'));

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
    onDateChange(newDate);
  };

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <div>
      <label>Date: </label>
      <input type="date" value={date} onChange={handleDateChange} />
      <label>Time: </label>
      <input type="time" value={time} onChange={handleTimeChange} />
    </div>
  );
};

export default DateTimePicker;
