import React from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";


const InviteUser = ({ addEmployeePopup, setAddEmployeePopup, setSuccessfulPopup }) => {

	const defaultValue = {
		name: "",
		email: "",
		title: "",
		department: "",
	};
	
	const Validate = yup.object({
		name: yup.string().required("Name is required"),
		email: yup.string()
			.email('Invalid email format')
			.required('Email is required'),
		title: yup.string().required("Title is required"),
		department: yup.string().required("Department is required")
	});

	const handleSubmit = async (values) => {
		// let responseData = await dispatch(SignInSlice({ ...values }));

		// if (responseData?.payload?.status === 200) {
		//   navigate("/profile#account-details")
		//   window.location.reload()
		// }
	};


	return (
		<>
			<PopupDetails PopupToggle={addEmployeePopup} classNameProp='addCustomer'>
				<div className='popupinner'>
					<button type='button' className='closebtn'><img src={Closebtn} alt='close btn' /> </button>
					<h2>{"Invite User"}</h2>
					<Formik
						initialValues={defaultValue}
						validationSchema={Validate}
						onSubmit={handleSubmit}>
						<Form>
							<div className="formbox mt-3">
								<div className='forminnerbox'>
									<Field
										name="name"
										type="name"
										className={`form-control`}
										required
									/>
									<label >{"Name"}</label>
								</div>
							</div>
							<div className="formbox mt-3">
								<div className='forminnerbox'>
									<Field
										name="email"
										type="email"
										className={`form-control`}
										required
									/>
									<label >{"Email"}</label>
								</div>
							</div>
							<div className="formbox mt-3">
								<div className='forminnerbox'>
									<Field
										name="title"
										type="name"
										className={`form-control`}
										required
									/>
									<label >{"Title"}</label>
								</div>
							</div>
							<div className="formbox mt-3">
								<div className='forminnerbox'>
									<Field
										name="department"
										type="name"
										className={`form-control`}
										required
									/>
									<label >{"Department"}</label>
								</div>
							</div>
							<div className='text-end mt-5 mb-3'>
								<button type='button' className='btnWh me-3' onClick={() => setAddEmployeePopup(false)}>{"Cancel"}</button>
								<button type='button' className='btnBl' onClick={() => setSuccessfulPopup(true)}>{"Add"}</button>
							</div>
						</Form>
					</Formik>
				</div>
			</PopupDetails>
		</>
	)
}

export default InviteUser;