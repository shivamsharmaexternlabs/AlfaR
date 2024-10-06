import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom';

const EmployeeTable = ({ employeeData, handlePageClick, currentPage }) => {

	return (
		<div className='alfartableOuter'>
			<div className='alfartableTitle'>
				<h3>{"Users List"}</h3>
				<p>{"This is a list of all users."}</p>
			</div>
			<div className='alfartable'>
				<table>
					<tr>
						<th>{"NAME"} </th>
						<th>{"EMAIL"}</th>
						<th>{"TITLE"}</th>
						<th>{"DEPARTMENT"}</th>
						<th>{"STATUS"}</th>
					</tr>
					{employeeData?.users?.length > 0
						? employeeData?.users?.map((item) => {
							return (
								<tr>
									<td>  {item.name} </td>
									<td>{item.email}</td>
									<td>{item.title}</td>
									<td>{item.department}</td>
									<td> <span className={item.isActive === false ? 'toggleNotActive' : 'toggleActive'}></span>{item.isActive}</td>
								</tr>
							)
						})
						: <span className='d-flex justify-content-center align-items-center'>{"No Data Found"}</span>}
				</table>


			</div>

			{employeeData?.users?.length > 0
				? <div className='alfarpegination'>
					<span>{`Page ${employeeData?.currentPage} of ${employeeData?.totalPages}`}</span>
					<ReactPaginate
						previousLabel={"< Previous"}
						i18nIsDynamicList={true}
						nextLabel={"Next >"}
						pageCount={employeeData?.totalPages}
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
				</div>
				: ""}
		</div>
	)
}

export default EmployeeTable