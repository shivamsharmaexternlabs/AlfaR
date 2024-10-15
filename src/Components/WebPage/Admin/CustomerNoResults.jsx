import React from 'react'
import {  noCustomerIcon  } from '../../utils/Constants'

const CustomerNoResults = ({ searchItem, closeIcon }) => {
	console.log("closeIcon",closeIcon)
	return (
		<div className='alfartableOuter '>
			<div className='alfartableTitle'>

				<h3>{"Customer List"}</h3>
				<p>{closeIcon && `Showing search result for ${searchItem}`}</p>
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
							<th>{"STATUS"}</th>

						</tr>
					</thead>
					<tbody>

						<tr >
							<td colspan="6">
								<div className='d-flex align-items-center justify-content-center flex-column' style={{ height: '500px', textAlign: 'center' }}>
									<img src={noCustomerIcon} alt='icon8 img' />
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

export default CustomerNoResults
