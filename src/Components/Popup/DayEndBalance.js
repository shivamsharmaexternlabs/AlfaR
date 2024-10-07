import React from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'

//--------------------------------------------------------------------------------------------------

// function DayEndBalance({ dayEndBalanceData, dayBalancePopup, setDayBalancePopup }) {
// 	return (
// 		<PopupDetails PopupToggle={dayBalancePopup} classNameProp='successpopup'>
// 			{dayEndBalanceData?.map((item, index) => {
// 				return (
// 					<div className='popupinner' key={index}>
// 						<h3>{"Total Asset Of Btc:"} {item?.data?.totalAssetOfBtc}</h3>
// 						<button type='button' className='closebtn' onClick={() => setDayBalancePopup(false)}>
// 							<img src={Closebtn} alt='close btn' />
// 						</button>
// 						{item?.data?.balances?.map((balanceItem, balanceIndex) => {
// 							return (
// 								<div className='text-center' key={balanceIndex}>
// 									<p>{"Asset :"} {balanceItem?.asset}  {"Free :"} {balanceItem?.free}</p>
// 								</div>
// 							);
// 						})}
// 					</div>
// 				);
// 			})}
// 		</PopupDetails>
// 	);
// }

//--------------------------------------------------------------------------------------------------  

const DayEndBalance = () => {
	return (
		<>
			<PopupDetails PopupToggle={false} classNameProp='dayendBlPopup'>
				<div className='popupinner'>
					<h2>Day End Balance</h2>
					<button type='button' className='closebtn'>
						<img src={Closebtn} alt='close btn' />
					</button>
					<div className='dayendTable'>
						<table>
							<tr>
								<th>WALLET NAME</th>
								<th>STATUS </th>
								<th>BALANCE </th>
							</tr>
							<tr>
								<td>Spot</td>
								<td>Active</td>
								<td>0</td>
							</tr>
							<tr>
								<td>Spot</td>
								<td>Active</td>
								<td>0</td>
							</tr>
							<tr>
								<td>Spot</td>
								<td>Active</td>
								<td>0</td>
							</tr>
							<tr>
								<td>Spot</td>
								<td>Active</td>
								<td>0</td>
							</tr>
							<tr>
								<td>Spot</td>
								<td>Active</td>
								<td>0</td>
							</tr>
							<tr>
								<td>Spot</td>
								<td>Active</td>
								<td>0</td>
							</tr>
							<tr>
								<td>Spot</td>
								<td>Active</td>
								<td>0</td>
							</tr>
							<tr>
								<td>Spot</td>
								<td>Active</td>
								<td>0</td>
							</tr>
						</table>
					</div>
					<div className='text-end'>
						<button type='button' className='btnWh me-3'>Cancel </button>
						<button type='button' className='btnBl'>Download </button>
									{/* <p>{"Asset :"} {balanceItem?.asset}  {"Free :"} {balanceItem?.free}</p> */}
								</div>
				</div>
			</PopupDetails>
		</>
	)
}

export default DayEndBalance