import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

const EmployeeTable = ({ employeeData }) => {
	const [page, setPage] = useState(0);
	const [filterData, setFilterData] = useState();
	const n = 3
	const paginateData = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","V", "W", "X", "Y", "Z"];


	useEffect(() => {
		setFilterData(
			paginateData.filter((item, index) => {
				return (index >= page * n) & (index < (page + 1) * n);
			})
		);
	}, [page]);

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
					{employeeData?.length > 0
						? employeeData?.map((item) => {
							return (
								<tr>
									<td>  {item.name} </td>
									<td>{item.email}</td>
									<td>{item.title}</td>
									<td>{item.department}</td>
									<td> <span className='toggleActive'></span>{item.status}</td>
								</tr>
							)
						})
						: ""}
				</table>

				
			</div>

			<div className='alfarpegination'>
				<span>{"Page 1 of 30"}</span>
					<ReactPaginate
						previousLabel={"< Previous"}
						i18nIsDynamicList={true}
						// nextLabel={"Next"}
						nextLabel={"Next >"}
						pageCount={Math.ceil(paginateData.length / n)}
						// onPageChange={handlePageClick}
						// forcePage={page}
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
						onPageChange={(event) => setPage(event.selected)}

					/>
				</div>
		</div>
	)
}

export default EmployeeTable