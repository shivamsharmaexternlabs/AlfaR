import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import ReactPaginate from 'react-paginate';
import { roles } from '../../utils/Constants';

const EmployeesContent = ({ setAddEmployeePopup, icon7, employeesBlack, employeeData, handleSearchApiCall, hanldeSearch, searchItem, handlePageClick, currentPage, roleName }) => {
	return (
		<div className='content employePage'>
			<div className='adminTitle'>
				<h2> {"Employees"} </h2>
				{roleName === roles.ADMIN && <button type='button' className='addcusbtn' onClick={() => setAddEmployeePopup(true)}> {"Invite User"} </button>}
			</div>
			<div className='customersTitle'>
				<button type='button' className='tcbtn'> {"Total Users:"} <span>{employeeData?.totalUsers} 555</span> </button> 

				<div className='searchbox'>
					<input type='search' placeholder='Search...' value={searchItem} onChange={(e) => hanldeSearch(e)} />
					<img src={icon7} about='icon' className='searchIcon' alt="search-icon" />
					<button type='button' className='searchbtn' onClick={() => handleSearchApiCall()}> {"Search"} </button>
				</div>
			</div>

			{employeeData?.users?.length === 0
				?
				 <div className='addcusbox my-3'>
					<img src={employeesBlack} alt='icon8 img' />
					<p>{"No employees added so far"}</p>
					{roleName === roles.ADMIN && <button type='button' className='addcusbtn' onClick={() => setAddEmployeePopup(true)}> {"Invite User"} </button>}
				</div>
				: <EmployeeTable employeeData={employeeData} handlePageClick={handlePageClick} currentPage={currentPage} />}
		</div>
	)
}

export default EmployeesContent;