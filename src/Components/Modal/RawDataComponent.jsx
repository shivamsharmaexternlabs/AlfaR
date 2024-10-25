import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Closebtn from '../Astes/close.svg'
import { Button, DialogActions, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can also use AdapterDateFns or others
import { GetRawData } from '../Redux/slices/CustomerSlice';
import dayjs from 'dayjs';

const RawDataComponent = ({ handleClose, customerId, handleDownloadRawData, customerAddedAt }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const dispatch = useDispatch()
  const insertedAt = new Date(customerAddedAt)

  let fixedDate = dayjs(insertedAt).add(0, 'minute');

  const now = new Date();
  const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const maxUTCDate = dayjs(utcNow)
  const handleDownload = async () => {

    const fromDateUTC = new Date(Date.UTC(fromDate.$y, fromDate.$M, fromDate.$D, fromDate.$H, fromDate.$m, 0)).toISOString()
    const toDateUTC = new Date(Date.UTC(toDate.$y, toDate.$M, toDate.$D, toDate.$H, toDate.$m, 0)).toISOString()
    // console.log(fromDateUTC, toDateUTC)
    await dispatch(GetRawData({ fromDateUTC, toDateUTC, customerId })).then((res) => {
      if (res?.payload?.status === 200) {
        handleDownloadRawData(res?.payload?.data, 'rawData')
      }
    })
  }

  // console.log("insertedAtnmdm", insertedAt);
  // console.log("fixedDate", fixedDate);
  // console.log("fromDate", fromDate);


  const CustomActionBar = ({ onAccept, onClear, onCancel, selectDate }) => {
    const shouldHideApply = fromDate && dayjs(fromDate).isSame(dayjs(insertedAt), 'minute'); // Condition to hide "Apply" button
    const shouldHideToApply = toDate && dayjs(toDate).isSame(dayjs(fromDate || insertedAt), 'minute'); // Condition to hide "Apply" button

    console.log("shouldHideToApply", shouldHideToApply)
    return (
      <DialogActions style={{ justifyContent: 'flex-end' }}>
        {/* <Button onClick={onClear}>{"Reset"}</Button> */}
        <Button className='btnWh' onClick={onCancel}>{"Cancel"}</Button>
        {(shouldHideApply || shouldHideToApply) ?
          <Button onClick={onAccept} disabled={shouldHideApply || shouldHideToApply} style={{ backgroundColor: 'lightgrey' }}>{"Apply"}</Button>
          : <Button onClick={onAccept} >{"Apply"}</Button>}
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
            {/* <DateTimePicker
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
                // disableFuture
                closeOnSelect={false}
                minDateTime={dayjs(insertedAt)}  // Allow dates up to 6 months ago
                maxDateTime={toDate || maxUTCDate}

                renderInput={(params) => <TextField {...params} />}

              /> */}

            <DateTimePicker
              slots={{
                actionBar: CustomActionBar,
              }}
              componentsProps={{
                actionBar: { actions: ['cancel', 'accept'] },
              }}
              label="Select From Date & Time in UTC"
              timeSteps={{ minutes: 1, seconds: 1 }}
              format="DD-MM-YYYY HH:mm"
              ampm={false}
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              closeOnSelect={false}
              minDateTime={
                // Check if fromDate equals insertedAt, if so start from 10:27, otherwise allow from insertedAt
                fromDate && dayjs(fromDate).isSame(dayjs(insertedAt), 'minute')
                  ? dayjs(insertedAt).add(1, 'minute')
                  : dayjs(insertedAt)
              }  // Restrict selection strictly after insertedAt
              maxDateTime={toDate || maxUTCDate}
              renderInput={(params) => <TextField {...params} />}
            />

            {/* To DateTime Picker */}
            <DateTimePicker
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
              minDateTime={
                // Check if fromDate equals insertedAt, if so start from 10:27, otherwise allow from insertedAt
                fromDate && dayjs(fromDate).isSame(dayjs(fromDate || insertedAt), 'minute')
                  ? dayjs(insertedAt).add(1, 'minute')
                  : dayjs(insertedAt)
              } // Disable times before or equal to From date time
              maxDateTime={maxUTCDate}  // Max date is today
              closeOnSelect={false}
              renderInput={(params) => <TextField {...params} />}
              disabled={fromDate === null ? true : false}
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
