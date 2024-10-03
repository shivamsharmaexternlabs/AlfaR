import React from 'react'

const EmployeeTable = ({ employeeData }) => {
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
		</div>
	)
}

export default EmployeeTable