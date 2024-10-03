import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../../Layout/Header'
import icon7 from '../../Astes/Icon7.svg';
import icon8 from '../../Astes/icon8.svg';
import eye from '../../Astes/eye.svg';
import download from '../../Astes/download.svg';
import Refresh from '../../Astes/refresh.svg';

import employeeData from "../Employees/employeejson/employee.json"
import EmployeeTable from './EmployeeTable';

const Employees = () => {
  return (
    <>
      <Header />
      <div className='dasboardpage'>
        <Sidebar />
        <div className='content'>
          <div className='adminTitle'>
            <h2> Employees </h2>
            <button type='button' className='addcusbtn'> {"Add Customer"} </button>
          </div>
          <div className='customersTitle'>
            <button type='button' className='tcbtn'> {"Total Customers:"} <span>{"0"}</span> </button>

            <div className='searchbox'>
              <input type='search' placeholder='Search...' />
              <img src={icon7} about='icon' className='searchIcon' alt="search-icon"/>
              <button type='button' className='searchbtn'> {"Search"} </button>
            </div>
          </div>

          {employeeData.length === 0
            ? <div className='addcusbox my-3'>
              <img src={icon8} alt='icon8 img' />
              <p>{"No customer added so far"}</p>
              <button type='button' className='addcusbtn'> {"Invite User"} </button>
            </div>
            : <EmployeeTable employeeData={employeeData} />}
        </div>
      </div>
    </>

  )
}

export default Employees