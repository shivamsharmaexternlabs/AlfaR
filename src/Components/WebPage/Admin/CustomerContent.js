import React from 'react';
import CustomerTable from './CustomerTable';
import { customerBlack, roles } from '../../utils/Constants';
import close from '../../Astes/close.svg';
import CustomerNoResults from './CustomerNoResults';
import SearchTab from '../ReusableComponents/SearchTab';

const CustomerContent = ({ setAddCustomerPopup, customerData, icon7, icon8, setEditCustomerPopup, setEditItemData, searchItem, hanldeSearch, handleSearchApiCall, handlePageClick, currentPage, roleName, handleDayEndBalance, handleRawData, rawData, handleDownloadRawData, setSearchItem, setCloseIcon, closeIcon, handlRefreshDay, handleDayEndBalanceCsv, sheetsXlsxFunctions , handleCustomerStatus}) => {
	return (
		<div className='content customerPage'>
			<div className='adminTitle'>
				<h2> {"Customers"} </h2>
				{roleName === roles.ADMIN && <button type='button' className='addcusbtn' onClick={() => setAddCustomerPopup(true)}> {"Add Customer"} </button>}
			</div>
			<div className='customersTitle'>
				<button type='button' className='tcbtn'> {"Total Customers:"} <span>{customerData?.filteredCustomersCount === undefined ? 0 : customerData?.filteredCustomersCount}</span> </button>
				<SearchTab hanldeSearch={hanldeSearch} searchItem={searchItem} setSearchItem={setSearchItem} setCloseIcon={setCloseIcon} closeIcon={closeIcon} handleSearchApiCall={handleSearchApiCall} icon7={icon7} />
			</div>
			{(customerData?.customers?.length === 0 && searchItem === "")
				? <div className='addcusbox my-3'>
					<img src={customerBlack} alt='icon8 img' />
					<p>{"No customer added so far"}</p>
					{roleName === roles.ADMIN && <button type='button' className='addcusbtn' onClick={() => setAddCustomerPopup(true)}> {"Add Customer"} </button>}
				</div> : (searchItem && customerData?.customers?.length === 0)
					? <CustomerNoResults searchItem={searchItem}/>
					: <CustomerTable customerData={customerData} setEditCustomerPopup={setEditCustomerPopup} setEditItemData={setEditItemData} handlePageClick={handlePageClick} currentPage={currentPage} handleDayEndBalance={handleDayEndBalance} handleRawData={handleRawData} rawData={rawData} handleDownloadRawData={handleDownloadRawData} handlRefreshDay={handlRefreshDay} handleDayEndBalanceCsv={handleDayEndBalanceCsv} sheetsXlsxFunctions={sheetsXlsxFunctions} handleCustomerStatus={handleCustomerStatus} searchItem={searchItem} roleName={roleName}/>}
		</div>
	)
}

export default CustomerContent;
