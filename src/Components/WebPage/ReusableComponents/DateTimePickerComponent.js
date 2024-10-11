import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can also use AdapterDateFns or others

const DateTimePickerComponent = ({ selectedDate, handleDateChange, datePickerRef }) => {

	const handleClick = (event) => {
		event.stopPropagation(); // Stop the click from closing the popup when interacting with DateTimePicker
	};

	return (
		<div ref={datePickerRef}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateTimePicker
					label="Select Date & Time"
					value={selectedDate}
					onChange={handleDateChange}
					closeOnSelect = {true}
					onClick={(event) => handleClick(event)} // Stops the event propagation
					onMouseDown={(event) => handleClick(event)}
					disableclo
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</div>

	);
};

export default DateTimePickerComponent;
