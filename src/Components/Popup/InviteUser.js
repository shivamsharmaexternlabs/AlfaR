import React, { useState } from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CreateEmployees, GetEmployeeDetails } from '../Redux/slices/EmployeeSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DEPARTMENTS, DEPARTMENTS_NAME } from '../utils/Constants';


const InviteUser = ({ addEmployeePopup, setAddEmployeePopup, setSuccessfulPopup, setMessage }) => {

	const dispatch = useDispatch();
	const [selectedDepartment, setSelectedDepartment] = useState('');

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
		department: yup.string().nullable()
			.when('platform', ([department], schema) => {
				if (department === DEPARTMENTS_NAME.ACCOUNTS || department === DEPARTMENTS_NAME.ACCOUNT_MANAGEMENT || department === DEPARTMENTS_NAME.RISK_ANALYST || department === DEPARTMENTS_NAME.CUSTOMER_SUPPORT)
					return yup.string().required('Department is required');
				return schema;
			}),
	});

	const handleSubmit = async (values) => {
		if (values) {
			dispatch(CreateEmployees({ ...values })).then((res) => {
				// console.log("ress", res)
				if (res?.payload?.data?.message === "User created successfully") {
					setSuccessfulPopup(true);
					setAddEmployeePopup(false);
					dispatch(GetEmployeeDetails());
					setMessage(res?.payload?.data?.message)
				}
			});
		}
	};

	const handleClosePopup = () => {
		setAddEmployeePopup(false);
	}


	return (
		<>
			<PopupDetails PopupToggle={addEmployeePopup} classNameProp='addCustomer inviteUser'>
				<div className='popupinner'>
					<button type='button' className='closebtn' onClick={handleClosePopup}><img src={Closebtn} alt='close btn' /> </button>
					<h2>{"Invite User"}</h2>
					<Formik
						initialValues={defaultValue}
						validationSchema={Validate}
						onSubmit={handleSubmit}>
						{({ setFieldValue, errors }) => {
							return <Form>
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
									<p className="text-danger  small mb-0 small">
										<ErrorMessage name="name" />
									</p>
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

									<p className="text-danger  small mb-0 small">
										<ErrorMessage name="email" />
									</p>
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
									<p className="text-danger  small mb-0 small">
										<ErrorMessage name="title" />
									</p>
								</div>
								<div className="formbox mt-3">
									<div className='forminnerbox addselectbox'>
										<label>{"Department"}</label>
										<select
											name="platform"
											value={selectedDepartment}

											onChange={(e) => {
												setFieldValue("department", e.target.value)
												setSelectedDepartment(e.target.value)
											}}
											// onBlur={field.onBlur}
											className="form-control"
										>
											<option value="" label="Select Department" />
											{DEPARTMENTS.map((option) => (
												<option key={option.value} value={option.value}>
													{option.name}
												</option>
											))}
										</select>
										<p className="text-danger  small mb-0 small">
											<ErrorMessage name="platform" />
										</p>
									</div>
								</div>



								<div className='text-end mt-5 mb-3'>
									<button type='button' className='btnWh me-3' onClick={() => handleClosePopup()}>{"Cancel"}</button>
									<button type='submit' className='btnBl' onClick={() => handleSubmit()}>{"Add"}</button>
								</div>
							</Form>
						}}
					</Formik>
				</div>
			</PopupDetails>
		</>
	)
}

export default InviteUser;