import React from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'

function DayEndBalance({ dayEndBalanceData, dayBalancePopup, setDayBalancePopup }) {
	return (
		<PopupDetails PopupToggle={dayBalancePopup} classNameProp='successpopup'>
			<div className='popupinner'>
				<button type='button' className='closebtn' onClick={() => setDayBalancePopup(false)}><img src={Closebtn} alt='close btn' /> </button>
				<div className='text-center'>
					<h3>Day End Balance : <p>{dayEndBalanceData}</p></h3>
				</div>
			</div>
		</PopupDetails>
	)
}

export default DayEndBalance