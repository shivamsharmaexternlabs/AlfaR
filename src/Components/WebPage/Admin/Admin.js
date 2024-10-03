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
import customerData from "./customerJson/customer.json";
import CustomerTable from './CustomerTable';

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
              <img src={icon7} about='icon' className='searchIcon' alt="search-icon" />
              <button type='button' className='searchbtn'> Search </button>
            </div>
          </div>
          {customerData.length === 0
            ? <div className='addcusbox my-3'>
              <img src={icon8} alt='icon8 img' />
              <p>{"No customer added so far"}</p>
              <button type='button' className='addcusbtn'> {"Add Customer"} </button>
            </div>
            : <CustomerTable customerData={customerData} />}
        </div>
      </div>
      
      {/* <AddCustomer /> */}
      {/* <Success/> */}
      <SummeryReport />
      {/* <RowData /> */}
      
      
      

    </>
  )
}

export default Admin