import React, { useState } from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CreateEmployees, GetEmployeeDetails } from '../Redux/slices/EmployeeSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DEPARTMENTS, DEPARTMENTS_NAME } from '../utils/Constants';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const InviteUser = ({ addEmployeePopup, setAddEmployeePopup, setSuccessfulPopup, setMessage }) => {

	const dispatch = useDispatch();
	const [selectedDepartment, setSelectedDepartment] = useState('');
	const [serverErrorMessage, setServerErrorMessage] = useState('');

	const defaultValue = {
		name: "",
		email: "",
		title: "",
		department: "",
	};

	const Validate = yup.object({
		name: yup.string().required("Name is required"),
		email: yup.string()
			// .email('Invalid email format')
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
		if (!values.email) {
			console.error("Email is missing");
			return; // Early return or handle error
		}

		const modifiedValues = {
			...values,
			name: values.name.trim(),
			title: values.title.trim(),
			email: values.email + '@alfar-group.com',
		};

		if (modifiedValues) {
			dispatch(CreateEmployees({ ...modifiedValues })).then((res) => {
				// console.log("ress", res)
				if (res?.payload?.data?.message === "User created successfully") {
					setSuccessfulPopup(true);
					setAddEmployeePopup(false);
					dispatch(GetEmployeeDetails());
					setMessage("User has been successfully invited.")
				} else {
					if (res?.payload?.response?.data?.message) {
						setServerErrorMessage(res?.payload?.response?.data?.message)
					}

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
						{({ setFieldValue, errors, values, touched, handleChange }) => {
							return <Form>
								<div className="formbox mt-3">
									<div className={`forminnerbox  ${errors.name && touched.name ? 'border-danger' : ""}`}>
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
									<div className={`forminnerbox input-group  ${errors.email && touched.email ? 'border-danger' : ""}`}>
										<Field
											name="email"
											type="text"
											className={`form-control`}
											required
											value={values.email}
											onChange={handleChange}
										/>
										<label >{"Email"}</label>
										<div className="input-group-append">
											<span className="input-group-text">{"@alfar-group.com"}</span>
										</div>
									</div>

									<p className="text-danger  small mb-0 small">
										<ErrorMessage name="email" />
									</p>
								</div>
								<div className="formbox mt-3">
									<div className={`forminnerbox ${errors.title && touched.title ? 'border-danger' : ""}`}>
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
								{/* <div className="formbox mt-3">
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
											{[{ name: "Operations", value: "Operations" },].map((option) => (
												<option key={option.value} value={option.value}>
													{option.name}
												</option>
											))}
										</select>
										<p className="text-danger  small mb-0 small">
											<ErrorMessage name="department" />
										</p>
									</div>

									{serverErrorMessage ? <p className='text-danger small mt-2'>{serverErrorMessage}</p> : <></>}
								</div> */}


								<div className='mt-3'>
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">{"Department"}</InputLabel>
										<Select
											sx={{ borderRadius: "100px", borderColor: "#E5E6F3", }}
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={selectedDepartment}
											label="Department"

											onChange={(e) => {
												setFieldValue("department", e.target.value)
												setSelectedDepartment(e.target.value)
											}}
											onMouseDown={(e) => e.stopPropagation()}
										>
											{[{ name: "Operations", value: "Operations" },].map((option) => (<MenuItem value={option.value}>{option.name}</MenuItem>
											))}

										</Select>
									</FormControl>
								</div>



								{(Object.keys(errors).length === 0) ? (serverErrorMessage ? <p className='text-danger small mt-2'>{serverErrorMessage}</p> : <></>) : ""}



								<div className='text-end mt-5 mb-3'>
									<button type='button' className='btnWh me-3' onClick={() => handleClosePopup()}>{"Cancel"}</button>
									<button type='submit' className='btnBl'>{"Invite Now"}</button>
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
