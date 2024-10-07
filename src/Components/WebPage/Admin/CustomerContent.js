import React from 'react';
import CustomerTable from './CustomerTable';
import { customerBlack, roles } from '../../utils/Constants';
import close from '../../Astes/close.svg';

const CustomerContent = ({ setAddCustomerPopup, customerData, icon7, icon8, setEditCustomerPopup, setEditItemData, searchItem, hanldeSearch, handleSearchApiCall, handlePageClick, currentPage, roleName }) => {
	return (
		<div className='content customerPage'>
			<div className='adminTitle'>
				<h2> {"Customers"} </h2>
				{roleName === roles.ADMIN && <button type='button' className='addcusbtn' onClick={() => setAddCustomerPopup(true)}> {"Add Customer"} </button>}
			</div>
			<div className='customersTitle'>
				<button type='button' className='tcbtn'> {"Total Customers:"} <span>{customerData?.totalCustomers}555</span> </button>
				<div className='searchbox'>
					<input
						type='search'
						placeholder='Search...'
						value={searchItem}
						onChange={(e) => hanldeSearch(e)}
					/> 
					<img src={icon7} about='icon' className='searchIcon' alt="search-icon" />
					<button type='button' className='closeBtn' ><img src={close} alt='icon' /> </button>
					<button type='button' className='searchbtn' onClick={() => handleSearchApiCall()} > {"Search"} </button>
				</div>
			</div>
			{customerData?.customers?.length === 0
				? <div className='addcusbox my-3'>
					<img src={customerBlack} alt='icon8 img' />
					<p>{"No customer added so far"}</p>
					{roleName === roles.ADMIN && <button type='button' className='addcusbtn' onClick={() => setAddCustomerPopup(true)}> {"Add Customer"} </button>}
				</div>
				: <CustomerTable customerData={customerData} setEditCustomerPopup={setEditCustomerPopup} setEditItemData={setEditItemData} handlePageClick={handlePageClick} currentPage={currentPage} />}
		</div>
	)
}

export default CustomerContent;