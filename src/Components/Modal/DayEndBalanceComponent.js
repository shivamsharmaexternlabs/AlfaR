import React, { useState } from 'react';
import Closebtn from '../Astes/close.svg'

import { Button, DialogActions, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can also use AdapterDateFns or others

const DayEndBalanceComponent = ({ handleClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (

    <div className='rowdatapopup rowdatadayendpopup'>
      <div className='popupinner'  >
        <div className='SummeryTitle'>

          <button type='button' className='closebtn'>
            <img src={Closebtn} alt='close btn'
              onClick={() => handleClose()}
            />
          </button>
          <h2>{"Day End Balance"}</h2>
        </div>
        <div className='dateTimeRange'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              slotProps={{
                field: { clearable: true }, actionBar: {
                  actions: ['cancel', 'accept'],
                },
              }}

              label="Select Date & Time"
              timeSteps={{ minutes: 1 }}
              // format=''
              ampm={false}
              value={selectedDate}
              closeOnSelect={false}
              renderInput={(params) => <TextField {...params} />}

            />

            {/* <DateTimePicker
              label="Select Date & Time"
              timeSteps={{ minutes: 1 }}
              // format=''
              ampm={false}
              value={selectedDate}
              closeOnSelect={true}
              p={1}
              renderInput={(params) => <TextField {...params}

              />
              }
            /> */}

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

export default DayEndBalanceComponent;
