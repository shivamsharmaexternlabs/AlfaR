import React, { useState } from 'react';
import Closebtn from '../Astes/close.svg'
import dayjs from "dayjs"
import { Button, DialogActions, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can also use AdapterDateFns or others

const RawDataComponent = ({handleClose}) => {
  //min refereced to Caledndar 1
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const today = new Date()
  return (

    <div className='rowdatapopup '>
      <div className='popupinner'  >
        <div className='SummeryTitle'>

          <button type='button' className='closebtn'>
            <img src={Closebtn} alt='close btn'
              onClick={() => handleClose()}
            />
          </button>
          <h2>{"Raw Data"}</h2>
        </div>
        <div className='dateTimeRange'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            slotProps={{ field: { clearable: true },
            actionBar: {
            actions: ['cancel','accept'],
            },

           }}
              label="Select From Date & Time in UTC"
              timeSteps={{ minutes: 1 }}
              format="DD-MM-YYYY HH:mm"
              ampm={false}
              value={fromDate}
              onChange={(newvval) => {
                if(!newvval){setFromDate(null)}
              }}
              onAccept={(newValue) => {
                console.log(newValue)
                setFromDate(newValue)
              }}
              maxDate={toDate || dayjs(new Date())} // Max date for "From Date" should be before or on "To Date"
              // value={selectedDate}

              disableFuture
              minDate={dayjs(new Date(today.setMonth(today.getMonth() - 6)))}
              closeOnSelect={false}
              renderInput={(params) => <TextField {...params} />}

            />

            <DateTimePicker
              slotProps={{
                field: { clearable: true },
                actionBar: {
                  actions: ['cancel', 'accept'],
                  okLabel: 'Apply',
                },
              }}
              label="Select To Date & Time in UTC"
              timeSteps={{ minutes: 1 }}
              format="DD-MM-YYYY HH:mm"
              ampm={false}
              value={toDate}
              disableFuture
              onChange={(newvval) => {
                if(!newvval){setToDate(null)}
              }}
              onAccept={(newValue) => setToDate(newValue)}
              minDate={fromDate || dayjs(new Date(today.setMonth(today.getMonth() - 6)))} // Min date for "To Date" should be after or on "From Date"
              maxDate={dayjs(new Date())}
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
         {fromDate && toDate ? <button type='button' className='btnBl'
          //    onClick={sheetsXlsxFunctions}
          >{"Download"}</button> : <></>}
        </div>
      </div>
    </div>
  )
};

export default RawDataComponent;
