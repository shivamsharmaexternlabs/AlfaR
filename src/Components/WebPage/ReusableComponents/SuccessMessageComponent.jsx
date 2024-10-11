import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils/Constants';

const SuccessMessageComponent = ({ message, handleSubmitResendLink,handleRemovePopup }) => {
	console.log("message",message)
	const navigate = useNavigate();
	return (
		<div className='accountinfo'>
			<h2>{"Success!"}</h2>
			{message === "Forgot"
				? <div>
					<p className='text-black fs-14'>{"A password reset link has been sent to your registered email address."}</p>

					<p className='text-black fs-14'>	{"If you do not receive an email, please check your spam folder or click on resend button."}</p>
					<div className="d-flex mt-0" >
						<button type="submit" className="signbtn mb-0 me-2" onClick={() => handleSubmitResendLink()}>
							{"Resend"}
						</button>
					</div>
				</div> : message === "Reset"
					? <div>
						<p className='text-black fs-14'>{"Your account password has been reset successfully!"}</p>
						<div className="d-flex mt-0" >
							<button type="submit" className="signbtn mb-0 me-2" onClick={() => navigate(routes.ROOT)}>
								{"Sign In"}
							</button>
						</div>
					</div> : message === "created"
						? <div>
							<p className='text-black fs-14'>{`Your account has been ${message} successfully!`}</p>
							<div className="d-flex mt-0" >
								<button type="submit" className="signbtn mb-0 me-2" onClick={() => handleRemovePopup()}>
									{"Sign In"}
								</button>
							</div>
						</div> : ""}

			{(message !== "Reset" && message !== "created") && <div className='newadd'>{"Back to"}  <button type='button' onClick={() => navigate(routes.ROOT)}>{"Sign In"}</button></div>}
		</div>
	)
}

export default SuccessMessageComponent
