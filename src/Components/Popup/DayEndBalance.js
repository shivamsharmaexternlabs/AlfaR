import React from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'

function DayEndBalance({ dayEndBalanceData, dayBalancePopup, setDayBalancePopup }) {
	return (
		<PopupDetails PopupToggle={dayBalancePopup} classNameProp='successpopup'>
			{dayEndBalanceData?.map((item, index) => {
				return (
					<div className='popupinner' key={index}>
						<h3>{"Total Asset Of Btc:"} {item?.data?.totalAssetOfBtc}</h3>
						<button type='button' className='closebtn' onClick={() => setDayBalancePopup(false)}>
							<img src={Closebtn} alt='close btn' />
						</button>
						{item?.data?.balances?.map((balanceItem, balanceIndex) => {
							return (
								<div className='text-center' key={balanceIndex}>
									<p>{"Asset :"} {balanceItem?.asset}  {"Free :"} {balanceItem?.free}</p>
								</div>
							);
						})}
					</div>
				);
			})}
		</PopupDetails>
	);
}

export default DayEndBalance;
