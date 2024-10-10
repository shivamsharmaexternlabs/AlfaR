import React from 'react'
import { customerBlack } from '../../utils/Constants'

const CustomerNoResults = () => {
	return (
		<div className='alfartableOuter '>
			<div className='alfartableTitle'>

				<h3>{"Customer List"}</h3>
				<p>{"This is a list of all customers."}</p>
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
							{/* <th>{"ACTION"}</th> */}
						</tr>
					</thead>
					<tbody>

						<tr >
							<td colspan="5">
								<div className='d-flex align-items-center justify-content-center flex-column' style={{ height: '500px', textAlign: 'center' }}>
									<img src={customerBlack} alt='icon8 img' />
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