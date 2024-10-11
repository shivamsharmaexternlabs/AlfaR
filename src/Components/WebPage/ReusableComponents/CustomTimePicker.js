import React, { useState } from 'react';
import './CustomTimePicker.css';

const CustomTimePicker = ({ onTimeChange, selectedDate }) => {
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(30);

  const hours = Array.from({ length: 24 }, (_, i) => i);  // 24-hour format for UTC
  const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i));

  const convertToUTC = (hour, minute) => {
    // Set the selected time in UTC
    const utcDate = new Date(selectedDate);
    utcDate.setUTCHours(hour, minute);

    // Return the UTC time
    return utcDate;
  };

  const handleHourScroll = (e) => {
    const hour = parseInt(e.target.value, 10);
    setSelectedHour(hour);
    handleTimeChange(hour, selectedMinute);
  };

  const handleMinuteScroll = (e) => {
    const minute = parseInt(e.target.value, 10);
    setSelectedMinute(minute);
    handleTimeChange(selectedHour, minute);
  };

  const handleTimeChange = (hour, minute) => {
    const utcTime = convertToUTC(hour, minute);
    onTimeChange(utcTime);
  };

  return (
    <div className="custom-time-picker">
      <div className="time-section">
        <div className="time-scroller">
          <select className="custom-select" size={'2'} value={selectedHour} onChange={handleHourScroll}>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour < 10 ? `0${hour}` : hour}
              </option>
            ))}
          </select>
        </div>
        <span>:</span>
        <div className="time-scroller">
          <select onfocus='this.size=2;' size={'2'} className="custom-select" value={selectedMinute} onChange={handleMinuteScroll}>
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="time-utc-label">
        <span>UTC</span>  {/* Static UTC label */}
      </div>
    </div>
  );
};

export default CustomTimePicker;