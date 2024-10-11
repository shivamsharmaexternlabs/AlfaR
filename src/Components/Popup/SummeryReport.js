import React, { useEffect, useRef, useState } from 'react';
import PopupDetails from './PopupDetails';
import Closebtn from '../Astes/close.svg';
import arrow2 from '../Astes/arrow2.svg';
import DatePicker, { DateObject } from "react-multi-date-picker";
import calendar from "../Astes/calendar.png";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import Spot from './Spot';
import Perpetual from './Perpetual';
import Margin from './Margin';
import Earn from './Earn';
import Option from './Option';
import { GetSummaryReport } from '../Redux/slices/CustomerSlice';
import { useDispatch, useSelector } from 'react-redux';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import CustomTimePicker from '../WebPage/ReusableComponents/CustomTimePicker';
const SummeryReport = ({ summeryReportToggle, SummeryReportToggleFun, CustomerId, handleDownloadSummaryCsv }) => {
  const [activeTab, setActiveTab] = useState('Spot'); // Track active tab
  const [activeTabComponent, setActiveTabComponent] = useState(null)
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  const [value, setValue] = useState({
    from: "",
    to: ""
  });

  const datePickerRef = useRef();
  const date1PickerRef = useRef();
  const dispatch = useDispatch();

  const DateRangeFun = (date) => {
    setValue1(date)
    setValue2(date)
    setSelectedDate(date)
    // setValue({
    //   from: `${date[0]?.day} ${date[0]?.month?.shortName} ${date[0]?.year}`,
    //   to: `${date[1]?.day} ${date[1]?.month?.shortName} ${date[1]?.year}`
    // });
  }

  const undefinedData = "undefined undefined undefined";

  const { summaryReportData } = useSelector((state) => state.CustomerApiData);

  // console.log("summaryReportData", summaryReportData);

  useEffect(() => {
    if (CustomerId) {
      let payload = {
        customerId: CustomerId
      }
      dispatch(GetSummaryReport(payload));
    }
  }, [dispatch, CustomerId])

  const clearDate = () => {
    setValue1([]);
    setValue2([])
    setValue({
      from: "",
      to: ""
    });
  }

  useEffect(() => {
    // console.log('ActiveTab', activeTab)
    switch (activeTab) {
      case 'Spot':
        setActiveTabComponent(<Spot summaryReportData={summaryReportData} />)
        break;
      case 'Perpetual':
        setActiveTabComponent(<Perpetual summaryReportData={summaryReportData} />)
        break;
      case 'Margin':
        setActiveTabComponent(<Margin summaryReportData={summaryReportData} />)
        break;
      case 'Earn':
        setActiveTabComponent(<Earn summaryReportData={summaryReportData} />)
        break;
      case 'Option':
        setActiveTabComponent(<Option summaryReportData={summaryReportData} />)
        break;
      default:
        break;
    }
  }, [activeTab, CustomerId, summaryReportData])

  const srTab = [
    { name: 'Spot' },
    // { name: 'Perpetual' },
    // { name: 'Margin' },
    // { name: 'Earn' },
    // { name: 'Option' },
  ];

  const closePopupFun = () => {
    SummeryReportToggleFun(false);
  }

  const CloseAndDownload = () => {
    return (
      <div className='text-end mt-5 mb-3'>
        <button type='button' className='btnWh me-3' onClick={closePopupFun}>{"Cancel"}</button>
        <button type='button' className='btnBl'
        // onClick={() => {
        //   if (summaryReportData?.trades?.length > 0)
        //     // handleDownloadSummaryCsv(summaryReportData?.trades,'summary-report')
        // }
        // }
        >{"Download"}</button>
      </div>
    )
  }

  const applyDates = () => {
    // Logic when 'Apply' is clicked
    // console.log("Selected dates:", value1);
    datePickerRef.current.closeCalendar(); // Close the calendar after applying
    date1PickerRef.current.closeCalendar();
  };

  const resetDates = () => {
    // Reset the date range
    setValue1(null);
    setValue2(null)
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUTCDateTime, setSelectedUTCDateTime] = useState(null);

  const handleTimeChange = (utcDate) => {
    setSelectedUTCDateTime(utcDate);
  };

  return (
    <>
      <PopupDetails PopupToggle={summeryReportToggle} classNameProp='summurypopup'>
        <div className='popupinner'>
          <button type='button' className='closebtn' onClick={closePopupFun}>
            <img src={Closebtn} alt='close btn' />
          </button>
          <div className='SummeryTitle'>
            <h2>Summary Report</h2>

          </div>
          <div className='daterangeboxInner'>
            <div className='daterangebox startDate'>
              <div className='daterangeboxdateday'>
                <span className='datetext'>Date Range : </span>
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
            </div>


            <div className='daterangebox endDate'>
              <div className='daterangeboxdateday'>
                <span className='datetext'>Date Range : </span>
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
                  onChange={DateRangeFun}
                  ref={date1PickerRef}

                  plugins={[
                    <TimePicker position="right" />
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
          </div>

          <div className='summeryTabs'>
            {/* <ul className="nav" id="pills-tab" role="tablist">
              {srTab.map((item, i) => (
                <li className="nav-item" role="presentation" key={i}>
                  <button
                    className={`nav-link ${activeTab === item.name ? 'active' : ''}`}
                    id={`pills-${item.name}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#pills-${item.name}`}
                    type="button"
                    role="tab"
                    aria-controls={`pills-${item.name}`}
                    aria-selected={activeTab === item.name}
                    onClick={() => setActiveTab(item.name)}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul> */}

            {/* <div className="tab-content" id="pills-tabContent">
              <div className={`tab-pane fade ${activeTab === 'Spot' ? 'show active' : ''}`} id="pills-spot" role="tabpanel" aria-labelledby="pills-spot-tab">
                {activeTabComponent}
               
              </div>
            </div>
            <div className={`tab-pane fade ${activeTab === 'Perpetual' ? 'show active' : ''}`} id="pills-perpetual" role="tabpanel" aria-labelledby="pills-perpetual-tab">

            </div>
            <div className={`tab-pane fade ${activeTab === 'Margin' ? 'show active' : ''}`} id="pills-margin" role="tabpanel" aria-labelledby="pills-margin-tab">
            </div>
            <div className={`tab-pane fade ${activeTab === 'Earn' ? 'show active' : ''}`} id="pills-earn" role="tabpanel" aria-labelledby="pills-earn-tab">

            </div>
            <div className={`tab-pane fade ${activeTab === 'Option' ? 'show active' : ''}`} id="pills-option" role="tabpanel" aria-labelledby="pills-option-tab">

            </div> */}
            <CloseAndDownload />
          </div>
        </div>
      </PopupDetails>
    </>
  );
}

export default SummeryReport;