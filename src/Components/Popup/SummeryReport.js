import React from 'react'
import PopupDetails from './PopupDetails';
import Closebtn from '../Astes/close.svg';
import arrow2 from '../Astes/arrow2.svg';

const SummeryReport = () => {
  return (
    <>
      <PopupDetails PopupToggle={false} classNameProp='summurypopup'>
        <div className='popupinner'>
            <button type='button' className='closebtn'><img src={Closebtn} alt='close btn' /> </button>
          <div className='SummeryTitle'>
            <h2>Summary Report</h2>
            <div className='daterangebox'>
              <span className='datetext'>Date Range:</span> <span className='dateday'>8 Aug 2024 - 11 Sep 2024</span>
              <button type='button' className='datearrow'> <img src={arrow2} alt='icon' /> </button>
            </div>
          </div>
          <div className=' summerytable '>
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
              <button type='button' className='btnWh me-3'>Cancel</button>
              <button type='button' className='btnBl'>Download</button>
            </div>
          </div>
        </div>
      </PopupDetails>
    </>
  )
}

export default SummeryReport