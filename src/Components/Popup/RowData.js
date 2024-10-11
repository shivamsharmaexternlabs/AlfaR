import React, { useEffect, useRef, useState } from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerComponent from '../WebPage/ReusableComponents/DateTimePickerComponent';
// import calendar from "../Astes/calendar.png";
// import TimePicker from 'react-multi-date-picker/plugins/time_picker';
// import CustomTimePicker from '../WebPage/ReusableComponents/CustomTimePicker';
// import DatePicker, { DateObject } from "react-multi-date-picker";

const RowData = ({ rawData, startDate, endDate, rawDataPopup, setRawDataPopup, handleDownload, sheetsXlsxFunctions, selectedDate, handleDateChange, handleClick }) => {
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const datePickerRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the popup, close it
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setRawDataPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setRawDataPopup]);

  // Format the date range and the rawData for display
  // const formattedData = JSON.stringify(rawData);
  // console.log('rawData', rawData)

  // const [value1, setValue1] = useState([]);
  // const [value2, setValue2] = useState([]);
  // const [selectedTime, setSelectedTime] = useState('');
  // const [value, setValue] = useState({
  //   from: "",
  //   to: ""
  // });
  // const [selectedUTCDateTime, setSelectedUTCDateTime] = useState(null);

  // const undefinedData = "undefined undefined undefined";

  // const datePickerRef = useRef();
  // const date1PickerRef = useRef();




  // const [selectedDate, setSelectedDate] = useState(null);
  // const handleDateChange = (newValue) => {
  //   setSelectedDate(newValue);
  // };

  // const DateRangeFun = (date) => {
  //   setSelectedDate(date)
  // setValue({
  //   from: `${date[0]?.day} ${date[0]?.month?.shortName} ${date[0]?.year}`,
  //   to: `${date[1]?.day} ${date[1]?.month?.shortName} ${date[1]?.year}`
  // });
  // }

  // const DateRangeFunNew = (date) => {
  //   setValue1(date)
  //   setValue2(date)
  // }

  // const handleTimeChange = (utcDate) => {
  //   setSelectedUTCDateTime(utcDate);
  // };

  // const applyDates = () => {
  //   // Logic when 'Apply' is clicked
  //   // console.log("Selected dates:", value1);
  //   datePickerRef.current.closeCalendar(); // Close the calendar after applying
  //   date1PickerRef.current.closeCalendar();
  // };

  // const resetDates = () => {
  //   // Reset the date range
  //   setValue1(null);
  //   setValue2(null)
  // };

  // const handleTimeChangeNew = (utcDate) => {
  //   // setSelectedUTCDateTime(utcDate);
  //   setSelectedTime(utcDate);
  // };

  // const handleClick = (event) => {
  //   event.stopPropagation(); // Stop the click from closing the popup when interacting with DateTimePicker
  // };


  return (
    <>
      <PopupDetails PopupToggle={rawDataPopup} classNameProp='rowdatapopup'>
        <div className='popupinner'  >
          <div className='SummeryTitle'>

            <button type='button' className='closebtn'><img src={Closebtn} alt='close btn' onClick={() => setRawDataPopup(false)} /> </button>
            <h2>{"Raw Data"}</h2>
          </div>

          <DateTimePickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} handleClick={handleClick}   datePickerRef={datePickerRef}  />

          <div className='text-end mt-5 mb-3'>
            <button type='button' className='btnWh me-4' onClick={() => setRawDataPopup(false)}>{"Cancel"} </button>
            <button type='button' className='btnBl' onClick={sheetsXlsxFunctions} >{"Download"}</button>
          </div>
        </div>
      </PopupDetails >

    </>
  )
}

export default RowData;


{/* <div className='daterangeboxInner'>
            <div className='daterangebox startDate'>
              <div className='daterangeboxdateday'>
                <span className='datetext'>{"Select From Date - From Time"}</span>
                {value?.from !== undefinedData && <span className='dateday'>{value?.from}</span>}
                {(value?.from !== "" || value?.to !== "") && (
                  <span className='d-inline-block mx-2'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 5L19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
                {value?.to !== undefinedData && <span className='dateday'> {value?.to}</span>}
              </div>

              <button type='button' className='datearrow'>
                <img className="date-range-arrow" src={calendar} alt='icon' onClick={() => datePickerRef.current.openCalendar()} />
                <DatePicker
                  value={selectedDate}
                  onChange={DateRangeFun}
                  ref={datePickerRef}
                  //  format="YYYY/MM/DD HH:mm"
                  // range
                  // numberOfMonths={2}

                  plugins={[

                    // <TimePicker position="right" className='daateeeee' />
                  ]}
                  // plugins={[
                  //   <Footer
                  //     position="bottom"
                  //     format="MMM DD"
                  //     names={{
                  //       selectedDates: " ",
                  //       from: "From :",
                  //       to: "To :",
                  //       selectDate: "select",
                  //       close: "Reset",
                  //       separator: "-",
                  //     }}
                  //   />
                  // ]}

                  enableTimePicker
                  scrollSensitive
                  multiple={false}
                  children={
                    <>
                      {selectedUTCDateTime && <div className='utcbox'>{`${selectedUTCDateTime.getUTCHours().toString().padStart(2, '0')} :
                      ${selectedUTCDateTime.getUTCMinutes().toString().padStart(2, '0')} UTC`}</div>}
                      <CustomTimePicker onTimeChange={handleTimeChange} selectedDate={selectedDate} />
                      <div className='btndateRange'>
                        <button onClick={resetDates} className='btnWh me-3'>{"Reset"}</button>
                        <button onClick={applyDates} className='btnBl'>{"Apply"}</button>
                      </div>
                    </>
                  }
                />



              </button>
                <button type='button' className='datearrow'>
                <img className="date-range-arrow" src={calendar} alt='icon' onClick={() => datePickerRef.current.openCalendar()} />
                <DatePicker
                  value={selectedDate}
                  onChange={DateRangeFun}
                  ref={datePickerRef}

                  plugins={[
                    <TimePicker position="right" onTimeChange={handleTimeChange} />
                  ]}
                  multiple={false}
                  children={
                    <> 
                    <div className='utcbox'>UTC</div>
                      <div className='btndateRange'>
                        <button onClick={resetDates} className='btnWh me-3'>{"Reset"}</button>
                        <button onClick={applyDates} className='btnBl'>{"Apply"}</button>
                      </div>
                    </>
                  }
                />
              </button>
            </div>


            <div className='daterangebox endDate'>
              <div className='daterangeboxdateday'>
                <span className='datetext'>Select To Date - To Time </span>
                {value?.from !== undefinedData && <span className='dateday'>{value?.from}</span>}
                {(value?.from !== "" || value?.to !== "") && (
                  <span className='d-inline-block mx-2'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 5L19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
                {value?.to !== undefinedData && <span className='dateday'> {value?.to}</span>}
              </div>
              <button type='button' className='datearrow'>
                <img className="date-range-arrow" src={calendar} alt='icon' onClick={() => date1PickerRef.current.openCalendar()} />
                <DatePicker
                  value={value2}
                  onChange={DateRangeFunNew}
                  ref={date1PickerRef}

                  plugins={[
                    <TimePicker position="right" onChange={handleTimeChangeNew} />
                  ]}
                  multiple={false}
                  children={
                    <> 
                    <div className='utcbox'>UTC</div>
                      <div className='btndateRange'>
                        <button onClick={resetDates} className='btnWh me-3'>{"Reset"}</button>
                        <button onClick={applyDates} className='btnBl'>{"Apply"}</button>
                      </div>
                    </>
                  }
                />
              </button>
            </div>
          </div> */}

{/* <p>{rawData} </p> */ }

{/* Display the JSON data in a preformatted block */ }
{/* <div style={{ maxHeight: 300, height: '90%', overflow: 'auto' }}>
          {
            rawData?.rawData?.map((item) => {
              return <p>
                <span style={{ color: '#249EE2' }}>{new Date(item.startDate).toUTCString()} - {new Date(item.endDate).toUTCString()}  - </span>
                {item.rawData} - 
                <span style={{color: 'yellowgreen'}}>{item.apiEndpoint}</span>
            </p>
  
            })
          }
          </div> */}