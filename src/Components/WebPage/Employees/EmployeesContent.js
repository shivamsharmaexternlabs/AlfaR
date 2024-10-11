import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import ReactPaginate from 'react-paginate';
import { roles, statusOptions } from '../../utils/Constants';
import close from '../../Astes/close.svg';
import DropDownStatus from '../ReusableComponents/DropDownStatus';
import EmployeeNoResults from './EmployeeNoResults';
import SearchTab from '../ReusableComponents/SearchTab';

const EmployeesContent = ({ setAddEmployeePopup, icon7, employeesBlack, employeeData, handleSearchApiCall, hanldeSearch, searchItem, handlePageClick, currentPage, roleName, handleStatusUpdate, setSearchItem, closeIcon, setCloseIcon, status, handleStatusChange }) => {
	return (
		<div className='content employePage'>
			<div className='adminTitle'>
				<h2> {"Employees"} </h2>
				{roleName === roles.ADMIN && <button type='button' className='addcusbtn' onClick={() => setAddEmployeePopup(true)}> {"Invite User"} </button>}
			</div>
			<div className='customersTitle'>
				<button type='button' className='tcbtn'> {"Total Users:"} <span>{employeeData?.filteredUsersCount === undefined ? 0 : employeeData?.filteredUsersCount} </span> </button>

				{/* <DropDownStatus status={status} handleStatusChange={handleStatusChange} statusOptions={statusOptions} /> */}

				<SearchTab hanldeSearch={hanldeSearch} searchItem={searchItem} setCloseIcon={setCloseIcon} closeIcon={closeIcon} handleSearchApiCall={handleSearchApiCall} icon7={icon7} setSearchItem={setSearchItem} />
			</div>

			{(employeeData?.users?.length === 0 && searchItem === "" && status !== "")
				? <div className='addcusbox my-3'>
					<img src={employeesBlack} alt='icon8 img' />
					<p>{"No employee added so far"}</p>
					{roleName === roles.ADMIN && <button type='button' className='addcusbtn' onClick={() => setAddEmployeePopup(true)}> {"Invite User"} </button>}
				</div> : (employeeData?.users?.length === 0 && searchItem)
					? <EmployeeNoResults />
					: <EmployeeTable employeeData={employeeData} handlePageClick={handlePageClick} currentPage={currentPage} handleStatusUpdate={handleStatusUpdate} />}
		</div>
	)
}

export default EmployeesContent;