import React from 'react'
import Header from '../../Layout/Header';
import Sidebar from '../Sidebar/Sidebar';
import icon7 from '../../Astes/Icon7.svg';
import icon8 from '../../Astes/icon8.svg';
import eye from '../../Astes/eye.svg';
import download from '../../Astes/download.svg';
import Refresh from '../../Astes/refresh.svg';
import AddCustomer from '../../Popup/AddCustomer';
import Success from '../../Popup/Success';
import SummeryReport from '../../Popup/SummeryReport';
import RowData from '../../Popup/RowData';

const Admin = () => {
  return (
    <>
      <Header />
      <div className='dasboardpage'>
        <Sidebar />
        <div className='content'>
          <div className='adminTitle'>
            <h2> Customers </h2>
            <button type='button' className='addcusbtn'> Add Customer </button>
          </div>
          <div className='customersTitle'>
            <button type='button' className='tcbtn'> Total Customers: <span>0</span> </button>
            <div className='searchbox'>
              <input type='search' placeholder='Search...' />
              <img src={icon7} about='icon' className='searchIcon' />
              <button type='button' className='searchbtn'> Search </button>
            </div>
          </div>
          <div className='addcusbox my-3'>
            <img src={icon8} alt='icon8 img' />
            <p>No customer added so far</p>
            <button type='button' className='addcusbtn'> Add Customer </button>
          </div>
          <div className='alfartableOuter'>
            <div className='alfartableTitle'>
              <h3>Customer List</h3>
              <p>This is a list of all customers.</p>
            </div>
            <div className='alfartable'>
              <table>
                <tr>
                  <th>CUSTOMER NAME</th>
                  <th>EXCHANGE</th>
                  <th>RAW DATA</th>
                  <th>SUMMERY REPORT </th>
                  <th>DAY END BALANCE</th>
                </tr>
                <tr>
                  <td>  Customer 1 </td>
                  <td>Binance</td>
                  <td>
                    <button type='button' className='clbtn me-2 viewbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn dlbtn'> <img src={download} alt='img' /> </button>
                  </td>
                  <td>
                    <button type='button' className='clbtn me-2 viewbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn dlbtn'> <img src={download} alt='img' /> </button>
                  </td>
                  <td>
                    <button type='button' className='clbtn me-2 vpbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn me-2 dpbtn '> <img src={download} alt='img' /> </button>
                    <button type='button' className='clbtn rebtn'> <img src={Refresh} alt='img' /> </button>
                  </td>
                </tr>
                <tr>
                  <td>  Customer 1 </td>
                  <td>Binance</td>
                  <td>
                    <button type='button' className='clbtn me-2 viewbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn dlbtn'> <img src={download} alt='img' /> </button>
                  </td>
                  <td>
                    <button type='button' className='clbtn me-2 viewbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn dlbtn'> <img src={download} alt='img' /> </button>
                  </td>
                  <td>
                    <button type='button' className='clbtn me-2 vpbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn me-2 dpbtn '> <img src={download} alt='img' /> </button>
                    <button type='button' className='clbtn rebtn'> <img src={Refresh} alt='img' /> </button>
                  </td>
                </tr>
                <tr>
                  <td>  Customer 1 </td>
                  <td>Binance</td>
                  <td>
                    <button type='button' className='clbtn me-2 viewbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn dlbtn'> <img src={download} alt='img' /> </button>
                  </td>
                  <td>
                    <button type='button' className='clbtn me-2 viewbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn dlbtn'> <img src={download} alt='img' /> </button>
                  </td>
                  <td>
                    <button type='button' className='clbtn me-2 vpbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn me-2 dpbtn '> <img src={download} alt='img' /> </button>
                    <button type='button' className='clbtn rebtn'> <img src={Refresh} alt='img' /> </button>
                  </td>
                </tr>
                <tr>
                  <td>  Customer 1 </td>
                  <td>Binance</td>
                  <td>
                    <button type='button' className='clbtn me-2 viewbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn dlbtn'> <img src={download} alt='img' /> </button>
                  </td>
                  <td>
                    <button type='button' className='clbtn me-2 viewbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn dlbtn'> <img src={download} alt='img' /> </button>
                  </td>
                  <td>
                    <button type='button' className='clbtn me-2 vpbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn me-2 dpbtn '> <img src={download} alt='img' /> </button>
                    <button type='button' className='clbtn rebtn'> <img src={Refresh} alt='img' /> </button>
                  </td>
                </tr>
                <tr>
                  <td>  Customer 1 </td>
                  <td>Binance</td>
                  <td>
                    <button type='button' className='clbtn me-2 viewbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn dlbtn'> <img src={download} alt='img' /> </button>
                  </td>
                  <td>
                    <button type='button' className='clbtn me-2 viewbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn dlbtn'> <img src={download} alt='img' /> </button>
                  </td>
                  <td>
                    <button type='button' className='clbtn me-2 vpbtn'> <img src={eye} alt='img' /> </button>
                    <button type='button' className='clbtn me-2 dpbtn '> <img src={download} alt='img' /> </button>
                    <button type='button' className='clbtn rebtn'> <img src={Refresh} alt='img' /> </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <AddCustomer />
      <Success/>
      <SummeryReport />
      <RowData />
      
      
      
    </>
  )
}

export default Admin