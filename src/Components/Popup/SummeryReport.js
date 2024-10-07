import React, { useRef, useState } from 'react'
import PopupDetails from './PopupDetails';
import Closebtn from '../Astes/close.svg';
import arrow2 from '../Astes/arrow2.svg';
import DatePicker, { DateObject } from "react-multi-date-picker"; 
import Footer from "react-multi-date-picker/plugins/range_picker_footer";

const SummeryReport = ({summeryReportToggle,SummeryReportToggleFun}) => {


  const [value1, setValue1] = useState([]);
  const [value, setValue] = useState({
    from: "",
    to: ""
  });
  const datePickerRef = useRef();

  const DateRangeFun = (date) => {
    setValue1(date)
    setValue({
      from: `${date[0]?.day} ${date[0]?.month?.shortName} ${date[0]?.year}`,
      to: `${date[1]?.day} ${date[1]?.month?.shortName} ${date[1]?.year}`
    })
    // console.log("mnbdcsdfsd", date[1])
  }

  let undefinedData = "undefined undefined undefined"

 
  const clearDate = () => {
    setValue1([])
    setValue({
      from: "",
      to: ""
    })
  }


  const closePopupFun=()=>{
    SummeryReportToggleFun(false)
  }
  return (
    <>
      <PopupDetails PopupToggle={summeryReportToggle} classNameProp='summurypopup'>
        <div className='popupinner'>
          <button type='button' className='closebtn' onClick={closePopupFun}><img src={Closebtn} alt='close btn' /> </button>
          <div className='SummeryTitle'>
            <h2>Summary Report</h2>
            <div className='daterangebox'>
              <span className='datetext'>Date Range : </span>

              {value?.from != undefinedData && <span className='dateday'>
                {value?.from}
              </span>}
              {value?.from != "" || value?.to != "" ? <span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 5L19 12L12 19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>:""}

              {value?.to != undefinedData && <span> {value?.to}</span>}

              <button type='button' className='datearrow'>
                  <img className="date-range-arrow" src={arrow2} alt='icon' onClick={() => datePickerRef.current.openCalendar()} />

                <DatePicker //https://npm.runkit.com/react-multi-date-picker
                  value={value1}
                  // onChange={setValue}
                  onChange={DateRangeFun}
                  ref={datePickerRef}
                  range
                  numberOfMonths={2}
                  plugins={[
                    <Footer
                      position="bottom"
                      format="MMM DD"
                      names={{
                        selectedDates: " ",
                        from: "From :",
                        to: "To :",
                        selectDate: "select",
                        close: "close",
                        separator: "-",
                      }}
                    />
                  ]}
                />

              </button>

              {/* <button  onClick={clearDate}>
                clear
              </button>*/}
              {/* <button onClick={() => datePickerRef.current.closeCalendar()}>
                Close
              </button>   */}
            </div>
          </div>
          <div className='summerytable '>
            <table>
              <tr>
                <th> </th>
                <th>Opening Equity Balance</th>
                <th>Less Unrealised from prior valuation</th>
                <th>Opening Wallet Balance </th>
                <th>Deposit</th>
                <th>Withdrawal</th>
                <th>Transfer</th>
                <th>Spot trade</th>
                <th>Spot Fee</th>
                <th>Realised from PERP</th>
                <th>PERP fee</th>
                <th>Closing Wallet Balance </th>
                <th>Unrealised</th>
                <th>Closing Equity Balance</th>
              </tr>
              <tr>
                <td>USDT</td>
                <td>1,00,000.00</td>
                <td>(20,000.00)</td>
                <td>80,000.00</td>
                <td>20,000.00</td>
                <td>(10,000.00)</td>
                <td>(30,000.00)</td>
                <td>25,000.00</td>
                <td>(400.00)</td>
                <td>5000.00</td>
                <td>(200.00)</td>
                <td>1,49,400.00</td>
                <td>25,000.00</td>
                <td>1,74,400.00</td>
              </tr>
            </table>
            <div className='text-end mt-5 mb-3'>
              <button type='button' className='btnWh me-3' onClick={closePopupFun}>Cancel</button>
              <button type='button' className='btnBl'>Download</button>
            </div>
          </div>
        </div>
      </PopupDetails>
    </>
  )
}

export default SummeryReport