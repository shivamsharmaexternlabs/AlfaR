import React, { useRef, useState } from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import { toast } from 'react-toastify'
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePicker, { DateObject } from "react-multi-date-picker";
import calendar from "../Astes/calendar.png";
import CustomTimePicker from '../WebPage/ReusableComponents/CustomTimePicker';

const DayEndBalance = ({ dayEndBalanceData, dayBalancePopup, setDayBalancePopup, downloadCSV }) => {

	console.log("dayEndBalanceDatasss", dayEndBalanceData);
	const date1PickerRef = useRef();
	const datePickerRef = useRef();
	const undefinedData = "undefined undefined undefined";
	const applyDates = () => {
		// Logic when 'Apply' is clicked
		// console.log("Selected dates:", value1);
		datePickerRef.current.closeCalendar(); // Close the calendar after applying
		// date1PickerRef.current.closeCalendar();
		// setDayBalancePopup(false)
	};

	const [value1, setValue1] = useState([]);
	const [value2, setValue2] = useState([]);
	const [value, setValue] = useState({
		from: "",
		to: ""
	});
	const resetDates = () => {
		// Reset the date range
		setValue1(null);
		setValue2(null)
	};

	const handleTimeChange = (utcDate) => {
		setSelectedUTCDateTime(utcDate);
	};

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedUTCDateTime, setSelectedUTCDateTime] = useState(null);

	const DateRangeFun = (date) => {
		setValue1(date)
		setValue2(date)
		setSelectedDate(date)
		// setValue({
		//   from: `${date[0]?.day} ${date[0]?.month?.shortName} ${date[0]?.year}`,
		//   to: `${date[1]?.day} ${date[1]?.month?.shortName} ${date[1]?.year}`
		// });
	}


	{/* <i className='text-secondary '>{"Last Updated At :"} {} </i> */ }

	// if (dayEndBalanceData?.length > 0) {
	return (
		<>
			<PopupDetails PopupToggle={dayBalancePopup} classNameProp='dayendBlPopup'>
				{/* {dayEndBalanceData?.length > 0
						? dayEndBalanceData?.map((item) => {
							const formattedDate = new Date(item?.updatedAt).toUTCString().replace(' GMT', ' UTC');
							return  */}

				<div className='popupinner'>

					<h2>
						{`Day End Balance`}
					</h2>


					<button type='button' className='closebtn' onClick={() => setDayBalancePopup(false)}>
						<img src={Closebtn} alt='close btn' />
					</button>

					<div className='daterangeboxInner'>

						<div className='daterangebox startDate'>
							<div className='daterangeboxdateday'>
								<span className='datetext'>{"Select Date - Time"}</span>
								{value?.from !== undefinedData && <span className='dateday'>{value?.from}</span>}
								{(value?.from !== "" || value?.to !== "") && (
									<span className='d-inline-block mx-2'>
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M12 5L19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</span>
								)}
								{value?.to !== undefinedData && <span className='dateday'> {value?.to}</span>}
							</div>

							{/* <button type='button' className='datearrow'>
											<img className="date-range-arrow" src={calendar} alt='icon' onClick={() => datePickerRef.current.openCalendar()} />
											<DatePicker
												value={selectedDate}
												onChange={DateRangeFun}
												ref={datePickerRef}
												//  format="YYYY/MM/DD HH:mm"
												// range
												// numberOfMonths={2}

												plugins={[

													// <TimePicker position="right" className='daateeeee' />
												]}
												// plugins={[
												//   <Footer
												//     position="bottom"
												//     format="MMM DD"
												//     names={{
												//       selectedDates: " ",
												//       from: "From :",
												//       to: "To :",
												//       selectDate: "select",
												//       close: "Reset",
												//       separator: "-",
												//     }}
												//   />
												// ]}

												enableTimePicker
												scrollSensitive
												multiple={false}
												children={
													<>
														{selectedUTCDateTime && <div className='utcbox'>{`${selectedUTCDateTime.getUTCHours().toString().padStart(2, '0')} :
                      ${selectedUTCDateTime.getUTCMinutes().toString().padStart(2, '0')} UTC`}</div>}
														<CustomTimePicker onTimeChange={handleTimeChange} selectedDate={selectedDate} />
														<div className='btndateRange'>
															<button onClick={resetDates} className='btnWh me-3'>{"Reset"}</button>
															<button onClick={applyDates} className='btnBl'>{"Apply"}</button>
														</div>
													</>
												}
											/>



										</button> */}

							<button type='button' className='datearrow'>
								<img className="date-range-arrow" src={calendar} alt='icon' onClick={() => datePickerRef.current.openCalendar()} />
								<DatePicker
									value={selectedDate}
									onChange={DateRangeFun}
									ref={datePickerRef}

									plugins={[
										<TimePicker position="right" onChange={handleTimeChange} />
									]}
									multiple={false}
									children={
										<>
											<div className='utcbox'>UTC</div>
											<div className='btndateRange'>
												<button onClick={resetDates} className='btnWh me-3'>{"Reset"}</button>
												<button onClick={applyDates} className='btnBl'>{"Apply"}</button>
											</div>
										</>
									}
								/>
							</button>
						</div>

					</div>

					{/* <div className='dayendTable'>
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
								<div className='text-end mt-5 mb-3'>
									<button type='button' className='btnWh me-3' onClick={() => setDayBalancePopup(false)}>{"Cancel"} </button>
									<button type='button' className='btnBl' onClick={() => downloadCSV(item?.data)}>{"Download"} </button>
								</div> */}
				</div>
				{/* }) :
						<div className='popupinner'>
							<h2 className='d-flex align-items-center justify-content-center'>{"No Day End Balance"}</h2>
							<button type='button' className='closebtn' onClick={() => setDayBalancePopup(false)}>
								<img src={Closebtn} alt='close btn' />
							</button>
						</div>
					} */}
			</PopupDetails>

		</>
		// 		)
		// 	} else if (dayEndBalanceData?.data?.data?.length > 0) {
		// 		return (
		// 			<PopupDetails PopupToggle={dayBalancePopup} classNameProp='dayendBlPopup'>

		// 				{dayEndBalanceData?.data?.data?.length > 0 && <div className='popupinner'>
		// 					<h2>{`Day End Balance (${new Date(dayEndBalanceData?.data?.updatedAt).toUTCString().replace(' GMT', ' UTC')} )`}
		// 						{/* <i className='text-secondary '>{"Last Updated At :"} {formattedDate} </i> */}
		// 					</h2>


		// 					<button type='button' className='closebtn' onClick={() => setDayBalancePopup(false)}>
		// 						<img src={Closebtn} alt='close btn' />
		// 					</button>
		// 					<div className='dayendTable'>
		// 						<table>
		// 							<tr>
		// 								<th>{"WALLET NAME"}</th>
		// 								<th>{"STATUS"} </th>
		// 								<th>{"BALANCE"} </th>
		// 							</tr>

		// 							{dayEndBalanceData?.data?.data?.map((item) => {
		// 								return <tr>
		// 									<td>{item?.walletName}</td>
		// 									<td>{item?.activate === true ? "Active" : "Inactive"} </td>
		// 									<td>{item?.balance} </td>
		// 								</tr>
		// 							})}
		// 						</table>
		// 					</div>
		// 					<div className='text-end'>
		// 						<button type='button' className='btnWh me-3' onClick={() => setDayBalancePopup(false)}>{"Cancel"} </button>
		// 						<button type='button' className='btnBl' onClick={() => downloadCSV(dayEndBalanceData?.data?.data)}>{"Download"} </button>
		// 					</div>
		// 				</div>}

		// 				{dayEndBalanceData?.data?.data?.length === 0 && <div className='popupinner'>
		// 					<h2 className='d-flex align-items-center justify-content-center'>{"No Day End Balance"}</h2>
		// 					<button type='button' className='closebtn' onClick={() => setDayBalancePopup(false)}>
		// 						<img src={Closebtn} alt='close btn' />
		// 					</button>
		// 				</div>}
		// 			</PopupDetails>
		// 		)
		// 	}
	)
}

export default DayEndBalance