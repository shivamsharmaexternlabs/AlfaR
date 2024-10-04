import React, { useState } from 'react'
import { downloadIcon, eyeIcon, refreshIcon } from '../../utils/Constants'
import SummeryReport from '../../Popup/SummeryReport'

const CustomerTable = ({ customerData }) => {

	const [summeryReportToggle,setSummeryReportToggle]=useState(false)


	const summeryReportFun=(e)=>{
		setSummeryReportToggle(o=>!o)
	}

	return (
		<> 
		<div className='alfartableOuter'>
			<div className='alfartableTitle'>
				<h3>{"Customer List"}</h3>
				<p>{"This is a list of all customers."}</p>
			</div>
			<div className='alfartable'>
				<table>
					<tr>
						<th>{"CUSTOMER NAME"}</th>
						<th>{"EXCHANGE"}</th>
						<th>{"RAW DATA"}</th>
						<th>{"SUMMERY REPORT"}</th>
						<th>{"DAY END BALANCE"}</th>
					</tr>
					{customerData.length > 0
						? customerData.map((item) => {
							return (<tr>
								<td>  {item.customer_name} </td>
								<td>{item.exchange}</td>
								<td>
									<button type='button' className='clbtn me-2 viewbtn' > <img src={eyeIcon} alt='img' /> </button>
									<button type='button' className='clbtn dlbtn'> <img src={downloadIcon} alt='img' /> </button>
								</td>
								<td>
									<button type='button' className='clbtn me-2 viewbtn'  onClick={(e)=>summeryReportFun(e)}> <img src={eyeIcon} alt='img' /> </button>
									<button type='button' className='clbtn dlbtn'> <img src={downloadIcon} alt='img' /> </button>
								</td>
								<td>
									<button type='button' className='clbtn me-2 vpbtn'> <img src={eyeIcon} alt='img' /> </button>
									<button type='button' className='clbtn me-2 dpbtn '> <img src={downloadIcon} alt='img' /> </button>
									<button type='button' className='clbtn rebtn'> <img src={refreshIcon} alt='img' /> </button>
								</td>
							</tr>)
						})
						: ""}
				</table>
			</div>
		</div>
			<SummeryReport  
			summeryReportToggle={summeryReportToggle}
			SummeryReportToggleFun={setSummeryReportToggle}
			/>
		</>
	)
}

export default CustomerTable