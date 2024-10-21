import React, { useEffect, useState } from 'react';
import Closebtn from '../Astes/close.svg'
import dayjs from "dayjs"
import { Button, DialogActions, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // You can also use AdapterDateFns or others
import { GetDayEndBalance } from '../Redux/slices/CustomerSlice';
import { useDispatch } from 'react-redux';

const DayEndBalanceComponent = ({ handleClose, customerId, handleDownloadDayEndBalance, downloadCSV, dayEndBalanceData }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const CustomActionBar = ({ onAccept, onClear, onCancel }) => {
    return (
      <DialogActions style={{ justifyContent: 'flex-end' }}>
        {/* <Button onClick={onClear}>{"Reset"}</Button> */}
        <Button className='btnWh' onClick={onCancel}>{"Cancel"}</Button>
        <Button onClick={onAccept}>{"Apply"}</Button>
      </DialogActions>
    );
  };



  useEffect(() => {
    if (selectedDate) {
      const selectedDateUTC = new Date(Date.UTC(selectedDate.$y, selectedDate.$M, selectedDate.$D, selectedDate.$H, selectedDate.$m, 0)).toISOString()
      dispatch(GetDayEndBalance({ selectedDateUTC, customerId }))
    }

  }, [selectedDate, customerId, dispatch])

  const handleDownload = async () => {
    // console.log(selectedDate, dayjs(selectedDate).toISOString(), dayjs().utcOffset())

    const selectedDateUTC = new Date(Date.UTC(selectedDate.$y, selectedDate.$M, selectedDate.$D, selectedDate.$H, selectedDate.$m, 0)).toISOString()

    await dispatch(GetDayEndBalance({ selectedDateUTC, customerId })).then((res) => {
      // console.log("rbhjdvjbkv",res?.payload?.data?.data?.snapshot)
      if (res?.payload?.status === 200) {
        downloadCSV(res?.payload?.data?.data?.snapshot)
      }
    })
    // handleDownloadRawData()
  }

  // console.log("dayEndBalanceData", dayEndBalanceData)

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
              // slotProps={{
              //   field: { clearable: true }, actionBar: {
              //     actions: ['cancel', 'accept'],

              //   },
              // }}

              slots={{
                actionBar: CustomActionBar, // Use the custom ActionBar
              }}
              componentsProps={{
                actionBar: { actions: ['cancel', 'accept'] }, // Use action bar props
              }}

              label="Select Date & Time in UTC"
              timeSteps={{ minutes: 1 }}
              format="DD-MM-YYYY HH:mm"
              ampm={false}
              value={selectedDate}
              onAccept={(newValue) => setSelectedDate(newValue)}
              closeOnSelect={false}
              minDate={dayjs(new Date(today.setMonth(today.getMonth() - 6)))}
              renderInput={(params) => <TextField {...params} />}
              maxDate={dayjs(new Date())}
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

        {dayEndBalanceData?.data?.snapshot?.length > 0 && <div className='dayendTable'>
          <table>
            <tr>
              <th>{"WALLET NAME"}</th>
              <th>{"STATUS"} </th>
              <th>{"BALANCE"} </th>
            </tr>

            {dayEndBalanceData?.data?.snapshot?.map((item) => {
              return <tr>
                <td>{item?.walletName}</td>
                <td>{item?.activate === true ? "Active" : "Inactive"} </td>
                <td>{item?.balance} </td>
              </tr>
            })}
          </table>
        </div>}

        <div className='text-end mt-5 mb-3'>
          <button type='button' className='btnWh me-4'
            onClick={() => handleClose()}
          >{"Cancel"} </button>
          {
            selectedDate ?
              <button type='button' className='btnBl'
                onClick={handleDownload}
              >{"Download"}</button> :
              <></>
          }
        </div>
      </div>
    </div>
  )
};

export default DayEndBalanceComponent;
