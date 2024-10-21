import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Closebtn from '../Astes/close.svg'
import { Button, DialogActions, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can also use AdapterDateFns or others
import { GetRawData } from '../Redux/slices/CustomerSlice';

import dayjs from 'dayjs';
import LoadingSpinner from '../WebPage/ReusableComponents/LoadingSpinner';
import PopupDetails from '../Popup/PopupDetails';

const RawDataComponent = ({ handleClose, customerId, handleDownloadRawData, loadingValue }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const dispatch = useDispatch()
  const today = new Date();
  const handleDownload = async () => {
    // console.log(fromDate, dayjs(fromDate).toISOString(), dayjs().utcOffset())

    const fromDateUTC = new Date(Date.UTC(fromDate.$y, fromDate.$M, fromDate.$D, fromDate.$H, fromDate.$m, 0)).toISOString()
    const toDateUTC = new Date(Date.UTC(toDate.$y, toDate.$M, toDate.$D, toDate.$H, toDate.$m, 0)).toISOString()
    // console.log(fromDateUTC, toDateUTC)
    await dispatch(GetRawData({ fromDateUTC, toDateUTC, customerId })).then((res) => {
      // console.log("resPosne", res)
      if (res?.payload?.status === 200) {
        handleDownloadRawData(res?.payload?.data,'rawData')
      }
    })
    // handleDownloadRawData()
  }
  const CustomActionBar = ({ onAccept, onClear, onCancel }) => {
    return (
      <DialogActions style={{ justifyContent: 'flex-end' }}>
        {/* <Button onClick={onClear}>{"Reset"}</Button> */}
        <Button className='btnWh' onClick={onCancel}>{"Cancel"}</Button>
        <Button onClick={onAccept}>{"Apply"}</Button>
      </DialogActions>
    );
  };

  return (
      <div className='rowdatapopup'>
        <div className='popupinner'>
          <div className='SummeryTitle'>
            <button type='button' className='closebtn'>
              <img src={Closebtn} alt='close btn' onClick={() => handleClose()} />
            </button>
            <h2>{"Raw Data"}</h2>
          </div>
          <div className='dateTimeRange'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* From DateTime Picker */}
              <DateTimePicker
                // slotProps={{

                //   field: { clearable: true, },
                //   actionBar: { actions: ['cancel', 'accept'] },

                // }}
                slots={{
                  actionBar: CustomActionBar, // Use the custom ActionBar
                }}
                componentsProps={{
                  actionBar: { actions: ['cancel', 'accept'] }, // Use action bar props
                }}

                label="Select From Date & Time in UTC"
                timeSteps={{ minutes: 1, seconds: 1 }}  // Show seconds
                format="DD-MM-YYYY HH:mm"  // Show seconds in format
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
                // slotProps={{
                //   field: { clearable: true },
                //   actionBar: { actions: ['cancel', 'accept'] },
                // }}
                slots={{
                  actionBar: CustomActionBar, // Use the custom ActionBar
                }}
                componentsProps={{
                  actionBar: { actions: ['cancel', 'accept'] }, // Use action bar props
                }}

                label="Select To Date & Time in UTC"
                timeSteps={{ minutes: 1, seconds: 1 }}  // Show seconds
                format="DD-MM-YYYY HH:mm"  // Show seconds in format
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
              <button type='button' className='btnBl' onClick={() => handleDownload()}>
                {"Download"}
              </button>
            ) : null}
          </div>
        </div>

      </div>
  )
};

export default RawDataComponent;
