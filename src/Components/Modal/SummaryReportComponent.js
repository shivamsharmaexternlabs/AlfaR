import React, { useState } from 'react';
import Closebtn from '../Astes/close.svg';
import dayjs from "dayjs";
import { Button, DialogActions, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GetSummaryReport } from '../Redux/slices/CustomerSlice';
import { useDispatch } from 'react-redux';

const SummaryReportComponent = ({ handleClose,customerId, handleDownloadSummaryCsv, loadingValue ,customerAddedAt }) => {
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const insertedAt = new Date(customerAddedAt)
  const now = new Date();
  const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const maxUTCDate = dayjs(utcNow)

  const CustomActionBar = ({ onAccept, onClear, onCancel }) => {
    return (
      <DialogActions style={{ justifyContent: 'flex-end' }}>
        {/* <Button onClick={onClear}>{"Reset"}</Button> */}
        <Button className='btnWh' onClick={onCancel}>{"Cancel"}</Button>
        <Button onClick={onAccept}>{"Apply"}</Button>
      </DialogActions>
    );
  };

  const handleDownload = async () => {
    // console.log(fromDate, dayjs(fromDate).toISOString(), dayjs().utcOffset())

    const fromDateUTC = new Date(Date.UTC(fromDate.$y, fromDate.$M, fromDate.$D, fromDate.$H, fromDate.$m, 0)).toISOString()
    const toDateUTC = new Date(Date.UTC(toDate.$y, toDate.$M, toDate.$D, toDate.$H, toDate.$m, 0)).toISOString()
    // console.log(fromDateUTC, toDateUTC)
    await dispatch(GetSummaryReport({ fromDateUTC, toDateUTC, customerId })).then((res) => {

      if (res?.payload?.status === 200) {
        handleDownloadSummaryCsv(res?.payload?.data,'summaryReport')
      }
    })
    // handleDownloadRawData()
  }

  return (
    <div className='rowdatapopup'>
      <div className='popupinner'>
        <div className='SummeryTitle'>
          <button type='button' className='closebtn'>
            <img src={Closebtn} alt='close btn' onClick={() => handleClose()} />
          </button>
          <h2>{"Summary Report"}</h2>
        </div>
        <div className='dateTimeRange'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* From DateTime Picker */}
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

              label="Select From Date & Time in UTC"
              timeSteps={{ minutes: 1, seconds: 1 }}  // Show seconds
              format="DD-MM-YYYY HH:mm"  // Show seconds in format
              ampm={false}
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              minDateTime={dayjs(insertedAt)}  // Allow dates up to 6 months ago
              maxDateTime={toDate || maxUTCDate}// Max date for "From Date"
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
              minDateTime={fromDate ? dayjs(fromDate).add(1, 'minute') : dayjs(insertedAt)}  // Disable times before or equal to From date time
              maxDateTime={maxUTCDate}  // Max date is today
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
  );
};

export default SummaryReportComponent;
