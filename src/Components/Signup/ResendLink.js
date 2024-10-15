import React, { useState } from 'react'
import logoWh from "../Astes/logowh.svg"
import AuthHeader from '../Layout/AuthHeader'
import { useLocation } from 'react-router-dom'
import { forgetPasswordSlice, ResenPasswordApiFunc } from '../Redux/slices/Authorisation'
import { useDispatch } from 'react-redux'
import SuccessMessageComponent from '../WebPage/ReusableComponents/SuccessMessageComponent'
import { roles } from '../utils/Constants'

const ResendLink = () => {
	const routeData = useLocation();
	const dispatch = useDispatch();

	const [successMessagePopup, setSuccessMessagePopup] = useState(false);

	// console.log("routeDasdbjksdjbta", routeData?.state?.currentMessage?.isPasswordChanged)

	const handleSubmitResendLink = async () => {
		if (routeData) {
			let payload = {
				email: routeData?.state?.currentMessage?.email,
			}

			  if(routeData?.state?.currentMessage?.role === roles.USER && !routeData?.state?.currentMessage?.isPasswordChanged){
				dispatch(ResenPasswordApiFunc(payload)).then((res) => {
					if (res?.payload?.status === 200) {
						// console.log("Hone YAYAYAY")
						setSuccessMessagePopup(true);
					}
				});
			} 
			else  {
				dispatch(forgetPasswordSlice(payload)).then((res) => {
					if (res?.payload?.status === 200) {
						setSuccessMessagePopup(true);
					}
				});
			}
		}
	}
	return (
		<>
			<AuthHeader />
			< div className='accountbox'>
				< div className='leftpart' >
					<img src={logoWh} alt='img' />
				</ div>
				<div className='rightpart'>
					{successMessagePopup === false ? <div className='accountinfo'>
						<h2>{"Ooops!"}</h2>
						<h5>{`Hi, ${routeData?.state?.currentMessage?.name}`}</h5>
						<p className='fw-400' style={{ color: "#737B88" }}>{`${routeData?.state?.currentMessage?.email}`}</p>
						<div>
							<p className='fs-14' style={{ color: "#FC3D3D" }}>	{"This password reset link has expired. Please request a new link."}</p>
							<div className="d-flex mt-0" >
								<button type="submit" className="signbtn mb-0 me-2" onClick={() => handleSubmitResendLink()}>
									{"Request Link"}
								</button>
							</div>
						</div>
					</div> : <SuccessMessageComponent message={"Forgot"} handleSubmitResendLink={handleSubmitResendLink} />}
				</div>
			</div >
		</>
	)
}

export default ResendLink