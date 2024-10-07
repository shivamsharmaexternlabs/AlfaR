import React, { useState } from 'react'
import { downloadIcon, editIcon, eyeIcon, refreshIcon } from '../../utils/Constants'
import SummeryReport from '../../Popup/SummeryReport'
import ReactPaginate from 'react-paginate'

const CustomerTable = ({ customerData, setEditCustomerPopup, setEditItemData, handlePageClick, currentPage, handleDayEndBalance, handleRawData,handleDownloadRawData }) => {

	const [summeryReportToggle, setSummeryReportToggle] = useState(false)


	const summeryReportFun = (e) => {
		setSummeryReportToggle(o => !o)
	}

	return (
		<>
			<div className='alfartableOuter'>
				<div className='alfartableTitle'>
					<h3>{"Customer List"}</h3>
					<p>{"This is a list of all customers."}</p>
				</div>
				<div className='alfartable'>
					<table>
						<tr>
							<th>{"CUSTOMER NAME"}</th>
							<th>{"EXCHANGE"}</th>
							<th>{"RAW DATA"}</th>
							<th>{"SUMMERY REPORT"}</th>
							<th>{"DAY END BALANCE"}</th>
							<th>{"ACTION"}</th>
						</tr>
						{customerData?.customers?.length > 0
							? customerData?.customers?.map((item) => {

								console.log("jhsdjbds", item)
								return (<tr>
									<td>  {item.name} </td>
									<td>{item.platform}</td>
									<td>
										<button type='button' className='clbtn me-2 viewbtn' > <img src={eyeIcon} alt='img' onClick={() => handleRawData(item?._id)} /> </button>
										<button type='button' className='clbtn dlbtn'> <img src={downloadIcon} alt='img' onClick={()=>handleDownloadRawData()} /> </button>
									</td>
									<td>
										<button type='button' className='clbtn me-2 viewbtn' onClick={(e) => summeryReportFun(e)}> <img src={eyeIcon} alt='img' /> </button>
										<button type='button' className='clbtn dlbtn'> <img src={downloadIcon} alt='img' /> </button>
									</td>
									<td>
										<button type='button' className='clbtn me-2 vpbtn'> <img src={eyeIcon} alt='img' onClick={() => handleDayEndBalance(item?._id)} /> </button>
										<button type='button' className='clbtn me-2 dpbtn '> <img src={downloadIcon} alt='img' /> </button>
										<button type='button' className='clbtn rebtn'> <img src={refreshIcon} alt='img' /> </button>
									</td>
									<td>
										<button type='button' className='clbtn me-2 editbtn'> <img src={editIcon} alt='img' onClick={() => {
											setEditItemData(item)
											setEditCustomerPopup(true)
										}} /> </button>
									</td>
								</tr>)
							})
							:
							<tr>
								<td colSpan={5}>
									<span className='d-flex justify-content-center align-items-center text-bold'><b> {"No Data Found"}</b></span>
								</td>
							</tr>
						}
					</table>
				</div>

				{customerData?.customers?.length > 10 ? <div className='alfarpegination'>
					<span>{`Page ${customerData?.currentPage} of ${customerData?.totalPages}`}</span>
					<ReactPaginate
						previousLabel={"< Previous"}
						i18nIsDynamicList={true}
						nextLabel={"Next >"}
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
			/>
		</>
	)
}

export default CustomerTable