import React, { useState } from 'react';
import Closebtn from '../Astes/close.svg'

import { Button, DialogActions, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can also use AdapterDateFns or others

const SummaryReportComponent = ({handleClose}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  return (

    <div className='rowdatapopup'>
      <div className='popupinner'  >
        <div className='SummeryTitle'>

          <button type='button' className='closebtn'>
            <img src={Closebtn} alt='close btn'
            onClick={() => handleClose()}
            />
          </button>
          <h2>{"Summery Report"}</h2>
        </div>
        <div className='dateTimeRange'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            slotProps={{ field: { clearable: true } }}

  label="Select From Date & Time"
              timeSteps={{ minutes: 1 }}
              // format=''
              ampm={false}
               value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              maxDate={toDate} // Max date for "From Date" should be
              closeOnSelect={false}
              renderInput={(params) => <TextField {...params} />}

            />

            <DateTimePicker
            slotProps={{ field: { clearable: true } }}

              label="Select To Date & Time"
              timeSteps={{ minutes: 1 }}
              // format=''
              ampm={false}
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              minDate={fromDate} // Min date for "To Date" should be after or on "From Date"
              closeOnSelect={false}
              p={1}
              renderInput={(params) => <TextField {...params}

              />
              }
            />

          </LocalizationProvider>
        </div>
        <div className='text-end mt-5 mb-3'>
          <button type='button' className='btnWh me-4'
            onClick={() => handleClose()}
          >{"Cancel"} </button>
          <button type='button' className='btnBl'
          //    onClick={sheetsXlsxFunctions}
          >{"Download"}</button>
        </div>
      </div>
    </div>
  )
};

export default SummaryReportComponent;
