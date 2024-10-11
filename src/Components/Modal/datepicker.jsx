import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can also use AdapterDateFns or others

const DateComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (

   <div className='rowdatapopup'>
    <div className='popupinner'  >
    <div className='SummeryTitle'>

      <button type='button' className='closebtn'>
        {/* <img src={Closebtn} alt='close btn' onClick={() => setRawDataPopup(false)} /> */}
         </button>
      <h2>{"Raw Data"}</h2>
    </div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
   <DateTimePicker
					label="Select Date & Time"
					value={selectedDate}
					closeOnSelect = {true}
					renderInput={(params) => <TextField {...params} />}
				/>
    </LocalizationProvider>
    <div className='text-end mt-5 mb-3'>
      <button type='button' className='btnWh me-4'
    //   onClick={() => setRawDataPopup(false)}
      >{"Cancel"} </button>
      <button type='button' className='btnBl'
    //    onClick={sheetsXlsxFunctions}
        >{"Download"}</button>
    </div>
  </div>
  </div>
  )
};

export default DateComponent;
