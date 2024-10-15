import React from 'react'
import { employeesBlack, noEmployeeIcon } from '../../utils/Constants'

const EmployeeNoResults = ({closeIcon,searchItem}) => {
	return (
		<div className='alfartableOuter '>
			<div className='alfartableTitle'>

				<h3>{"User List"}</h3>
				<p>{closeIcon && `Showing search result for ${searchItem}`}</p>
			</div>
			<div className='alfartable'>
				<table>
					<thead>
						<tr>
							<th>{"NAME"} </th>
							<th>{"EMAIL"}</th>
							<th>{"TITLE"}</th>
							<th>{"DEPARTMENT"}</th>
							<th>{"STATUS"}</th>
						</tr>
					</thead>
					<tbody>

						<tr >
							<td colspan="5">
								<div className='d-flex align-items-center justify-content-center flex-column' style={{ height: '500px', textAlign: 'center' }}>
									<img src={noEmployeeIcon} alt='icon8 img' />
									<p>{"No search results found"}</p>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default EmployeeNoResults