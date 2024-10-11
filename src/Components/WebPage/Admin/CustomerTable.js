import React, { useEffect, useState } from 'react'
import { downloadIcon, editIcon, eyeIcon, greyDownloadIcon, refreshIcon } from '../../utils/Constants'
import SummeryReport from '../../Popup/SummeryReport'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'

const CustomerTable = ({ customerData, setEditCustomerPopup, setEditItemData, handlePageClick, currentPage, handleDayEndBalance, handleRawData, handleDownloadRawData, handlRefreshDay, handleDayEndBalanceCsv, sheetsXlsxFunctions , handleCustomerStatus , searchItem, roleName, closeIcon}) => {
	const [summeryReportToggle, setSummeryReportToggle] = useState(false)
	const [customerId, setCustomerId] = useState(null);
	const summeryReportFun = (e) => {
		setSummeryReportToggle(o => !o)
	}

	return (
		<>
			<div className='alfartableOuter'>
				<div className='alfartableTitle'>

					<h3>{"Customer List"}</h3>
					<p>{closeIcon ?  `Showing search result for ${searchItem}`:`This is a list of all customers`}</p>
				</div>
				<div className='alfartable'>
					<table>
						<thead>
							<tr>
								<th>{"CUSTOMER UID"}</th>
								<th>{"EXCHANGE"}</th>
								<th>{"RAW DATA"}</th>
								<th>{"SUMMERY REPORT"}</th>
								<th>{"DAY END BALANCE"}</th>
								{roleName === "admin" ?<th>{"STATUS"}</th>: <></>}
							</tr>
						</thead>
						<tbody>
							{customerData?.customers?.length > 0
								? customerData?.customers?.map((item) => {

									// console.log("jhsdjbds", item)
									return (<tr key={item._id}>
										<td>  {item.customerUId} </td>
										<td>{item.platform}</td>
										{item?.lastCallStatus === "progress"
											? <td><button type='button' className='clbtn dlNewbtn'> <img src={greyDownloadIcon} alt='img'/> </button></td>
											: <td>
												{/* <button type='button' className='clbtn dlNewbtn'> <img src={greyDownloadIcon} alt='img'/> </button> */}
												{/* <button type='button' className='clbtn me-2 viewbtn' > <img src={eyeIcon} alt='img' onClick={() => handleRawData(item?._id)} /> </button> */}
												<button type='button' className='clbtn dlbtn'> <img src={downloadIcon} alt='img' onClick={() => handleRawData(item?._id)} /> </button>
											</td>}
										{item?.lastCallStatus === "progress"
											?  <td><button type='button' className='clbtn dlNewbtn'> <img src={greyDownloadIcon} alt='img'/> </button></td>
											: <td>
												{/* <button type='button' className='clbtn me-2 viewbtn' > <img src={eyeIcon} alt='img' /> </button> */}
												<button type='button' className='clbtn dlbtn' onClick={(e) => { summeryReportFun(item?._id); setCustomerId((item?._id)) }}> <img src={downloadIcon} alt='img' /> </button>
											</td>}
										<td>
											<button type='button' className='clbtn me-2 vpbtn'> <img src={eyeIcon} alt='img' onClick={() => handleDayEndBalance(item?._id)} /> </button>
											{/* <button type='button' className='clbtn me-2 dpbtn ' ><img src={downloadIcon} alt='img' onClick={() => handleDayEndBalance(item?._id, 'donwload-btn')} /></button> */}
											{/* <button type='button' className='clbtn rebtn'> <img src={refreshIcon} alt='img' onClick={() => handlRefreshDay(item?._id)} /> </button> */}
										</td>
										{roleName == "admin" ?
										<td> <span onClick={() => handleCustomerStatus(item._id, item.status)} className={item.status === 'active' ?  'toggleActive' : 'toggleNotActive'}></span>{" "} {item.status === 'active' ?  "Active" : "Inactive"} </td>
											: <></>}
										{/* <td>
										<button type='button' className='clbtn me-2 editbtn'> <img src={editIcon} alt='img' onClick={() => {
											setEditItemData(item)
											setEditCustomerPopup(true)
										}} /> </button>
									</td> */}
									</tr>)
								})
								:
								<tr>
									<td colSpan={5}>
										<span className='d-flex justify-content-center align-items-center text-bold'><b> {"No Data Found"}</b></span>
									</td>
								</tr>
							}
						</tbody>
					</table>
				</div>
				{customerData?.filteredCustomersCount > 10 ? <div className='alfarpegination'>
					<span>{`Page ${customerData?.currentPage} of ${customerData?.totalPages}`}</span>
					<ReactPaginate
						previousLabel={"Previous"}
						i18nIsDynamicList={true}
						nextLabel={"Next"}
						pageCount={customerData?.totalPages}
						onPageChange={handlePageClick}
						forcePage={currentPage}
						disabledClassName={"disabled"}
						pageClassName="page-item"
						pageLinkClassName="page-link"
						previousClassName="page-item"
						previousLinkClassName="page-link"
						nextClassName="page-item"
						nextLinkClassName="page-link"
						breakLabel="..."
						breakClassName="page-item"
						breakLinkClassName="page-link"
						containerClassName="pagination"
						activeClassName="active"
						renderOnZeroPageCount={null}
					// onPageChange={(event) => setPage(event.selected)}

					/>
				</div> : ""}
			</div>
			<SummeryReport
				summeryReportToggle={summeryReportToggle}
				SummeryReportToggleFun={setSummeryReportToggle}
				CustomerId={customerId}
			// handleDownloadSummaryCsv={handleDayEndBalanceCsv}
			/>
		</>
	)
}

export default CustomerTable
