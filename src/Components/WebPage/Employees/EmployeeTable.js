import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom';
import arrow from '../../Astes/arrow.svg'
const EmployeeTable = ({ employeeData, handlePageClick, currentPage, handleStatusUpdate }) => {

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
								<tr key={item._id} >
									<td>  {item.name} </td>
									<td>{item.email}</td>
									<td>{item.title}</td>
									<td>{item.department}</td>
									<td> <span onClick={() => handleStatusUpdate(item._id, item.isActive)} className={item.isActive === false ? 'toggleNotActive' : 'toggleActive'}></span>{" "} {item.isActive === false ? "Inactive" : "Active"} </td>
								</tr>
							)
						})
						: <tr>
							<td colSpan={5}>

								<span className='d-flex justify-content-center align-items-center text-bold'><b> {"No Data Found"}</b></span>
							</td>

						</tr>}
				</table>


			</div>

			{employeeData?.filteredUsersCount > 10
				? <div className='alfarpegination'>
					<span>{`Page ${employeeData?.currentPage} of ${employeeData?.totalPages}`}</span>
					<ReactPaginate
						previousLabel={`Previous`}
						i18nIsDynamicList={true}
						nextLabel={"Next"}
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