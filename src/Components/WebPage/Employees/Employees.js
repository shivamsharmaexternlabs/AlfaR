import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../../Layout/Header'
import icon7 from '../../Astes/Icon7.svg';
import icon8 from '../../Astes/icon8.svg';
import eye from '../../Astes/eye.svg';
import download from '../../Astes/download.svg';
import Refresh from '../../Astes/refresh.svg';

const Employees = () => {
  return (
    <>
      <Header />
      <div className='dasboardpage'>
        <Sidebar />
        <div className='content'>
          <div className='adminTitle'>
            <h2> Employees </h2>
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
            <button type='button' className='addcusbtn'> Invite User </button>
          </div>

          <div className='alfartableOuter'>
            <div className='alfartableTitle'>
              <h3>Users List</h3>
              <p>This is a list of all users.</p>
            </div>
            <div className='alfartable'>
              <table>
                <tr>
                  <th>NAME </th>
                  <th>EMAIL</th>
                  <th>TITLE</th>
                  <th>DEPARTMENT</th>
                  <th>STATUS</th> 
                </tr> 
                <tr>
                  <td>  User 1 </td>
                  <td>abhishek.jain@coffeee.io</td>
                  <td>Sr. Accountant</td>
                  <td>Accounts</td>
                  <td> <span className='toggleActive'></span> Inactive </td>
                </tr>
                <tr>
                  <td>  User 2 </td>
                  <td>abhishek.jain@coffeee.io</td>
                  <td>Sr. Accountant</td>
                  <td>Accounts</td>
                  <td> <span className='toggleActive'></span> Active </td>
                </tr>
                <tr>
                  <td>  User 3 </td>
                  <td>abhishek.jain@coffeee.io</td>
                  <td>Sr. Accountant</td>
                  <td>Accounts</td>
                  <td> <span className='toggleActive'></span> Inactive </td>
                </tr>
                <tr>
                  <td>  User 4 </td>
                  <td>abhishek.jain@coffeee.io</td>
                  <td>Sr. Accountant</td>
                  <td>Accounts</td>
                  <td> <span className='toggleActive'></span> Active </td>
                </tr>               
              </table>
            </div>
          </div>


        </div>
      </div>


    </>

  )
}

export default Employees