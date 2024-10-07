import React from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import { toast } from 'react-toastify'

const DayEndBalance = ({ dayEndBalanceData, dayBalancePopup, setDayBalancePopup, downloadCSV }) => {
	return (
		<>
			<PopupDetails PopupToggle={dayBalancePopup} classNameProp='dayendBlPopup'>
				{dayEndBalanceData?.length > 0
					? dayEndBalanceData?.map((item) => {
						const formattedDate = new Date(item?.updatedAt).toUTCString();
						return <div className='popupinner'>
							<h2>{"Day End Balance"} <i className='text-secondary '>{"Last Updated At :"} {formattedDate} </i></h2>


							<button type='button' className='closebtn' onClick={() => setDayBalancePopup(false)}>
								<img src={Closebtn} alt='close btn' />
							</button>
							<div className='dayendTable'>
								<table>
									<tr>
										<th>{"WALLET NAME"}</th>
										<th>{"STATUS"} </th>
										<th>{"BALANCE"} </th>
									</tr>

									{item?.data?.map((item) => {
										return <tr>
											<td>{item?.walletName}</td>
											<td>{item?.activate === true ? "Active" : "Inactive"} </td>
											<td>{item?.balance} </td>
										</tr>
									})}
								</table>
							</div>
							<div className='text-end'>
								<button type='button' className='btnWh me-3' onClick={() => setDayBalancePopup(false)}>{"Cancel"} </button>
								<button type='button' className='btnBl' onClick={() => downloadCSV(item?.data)}>{"Download"} </button>
							</div>
						</div>
					}) :
					<div className='popupinner'>
						<h2 className='d-flex align-items-center justify-content-center'>{"No Day End Balance"}</h2>
						<button type='button' className='closebtn' onClick={() => setDayBalancePopup(false)}>
							<img src={Closebtn} alt='close btn' />
						</button>
					</div>
				}
			</PopupDetails>

		</>
	)
}

export default DayEndBalance