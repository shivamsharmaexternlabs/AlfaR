import React, { useState } from 'react';
import Closebtn from '../Astes/close.svg'
import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can also use AdapterDateFns or others
import dayjs from 'dayjs';

const RawDataComponent = ({ handleClose }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const today = new Date();

  return (

    <div className='rowdatapopup'>
      <div className='popupinner'>
        <div className='SummeryTitle'>
          <button type='button' className='closebtn'>
            <img src={Closebtn} alt='close btn' onClick={() => handleClose()} />
          </button>
          <h2>{"Summery Report"}</h2>
        </div>
        <div className='dateTimeRange'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* From DateTime Picker */}
            <DateTimePicker
              slotProps={{
                field: { clearable: true },
                actionBar: { actions: ['cancel', 'accept'] },
              }}
              label="Select From Date & Time in UTC"
              timeSteps={{ minutes: 1, seconds: 1 }}  // Show seconds
              format="DD-MM-YYYY HH:mm:ss"  // Show seconds in format
              ampm={false}
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              disableFuture
              minDate={dayjs(today).subtract(6, 'months')}  // Allow dates up to 6 months ago
              maxDate={toDate || dayjs(today)}  // Max date for "From Date"
              closeOnSelect={false}
              renderInput={(params) => <TextField {...params} />}
            />

            {/* To DateTime Picker */}
            <DateTimePicker
              slotProps={{
                field: { clearable: true },
                actionBar: { actions: ['cancel', 'accept'] },
              }}
              label="Select To Date & Time in UTC"
              timeSteps={{ minutes: 1, seconds: 1 }}  // Show seconds
              format="DD-MM-YYYY HH:mm:ss"  // Show seconds in format
              ampm={false}
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              disableFuture
              minDateTime={fromDate ? dayjs(fromDate).add(1, 'minute') : dayjs(today).subtract(6, 'months')}  // Disable times before or equal to From date time
              maxDate={dayjs(today)}  // Max date is today
              closeOnSelect={false}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className='text-end mt-5 mb-3'>
          <button type='button' className='btnWh me-4' onClick={() => handleClose()}>
            {"Cancel"}
          </button>
          {fromDate && toDate ? (
            <button type='button' className='btnBl'>
              {"Download"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
};

export default RawDataComponent;
