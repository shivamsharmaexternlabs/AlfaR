import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import ReactPaginate from 'react-paginate';

const EmployeesContent = ({ setAddEmployeePopup, icon7, icon8, employeeData }) => {

	return (
		<div className='content'>
			<div className='adminTitle'>
				<h2> {"Employees"} </h2>
				<button type='button' className='addcusbtn' onClick={() => setAddEmployeePopup(true)}> {"Invite User"} </button>
			</div>
			<div className='customersTitle'>
				<button type='button' className='tcbtn'> {"Total Customers:"} <span>{"0"}</span> </button>

				<div className='searchbox'>
					<input type='search' placeholder='Search...' />
					<img src={icon7} about='icon' className='searchIcon' alt="search-icon" />
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
	)
}

export default EmployeesContent;