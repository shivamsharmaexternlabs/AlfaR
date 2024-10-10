import { ErrorMessage, Field, Formik, Form } from 'formik'
import React from 'react'
import { roles } from '../../utils/Constants'

const ProfileContent = ({ defaultValue, Validate, handleSubmit, Style, userName, userEmail, roleName }) => {
	return (
		<div className='content'>
			<div className='adminTitle'>
				<h2> {"Profile"} </h2>
			</div>

			<div className={`${Style.profileForm}`}>

				<Formik
					initialValues={defaultValue}
					validationSchema={Validate}
					onSubmit={handleSubmit}>
					{({ setFieldValue, errors, resetForm }) => {
						return <Form>
							<div className={`${Style.profileForminner}`}>
								<h3>{"Your Details"}</h3>
								<div className="formbox mt-3">
									<div className={`forminnerbox ${Style.forminnerbox} ${Style.formnameBox }`}>
										<Field
											name="name"
											type="text"
											className={`form-control`}
											// autocomplete="off"
											value={userName}
											disabled
										/>
										<label>{"Name"}</label>
										{/* <label></label> */}
									</div>
									{/* <span className="text-danger  small  mb-0">
									<ErrorMessage name="email" />
								</span> */}
								</div>

								<div className="formbox mt-3">
									<div className={`forminnerbox ${Style.forminnerbox} ${Style.formnameBox }`}>
										<Field
											name="email"
											type="text"
											className={`form-control ${Style.formControl}`}
											autocomplete="off"
											disabled
											value={userEmail}
										/>
										<label>{"Email"}</label>
										{/* <label ></label> */}
									</div>
									{/* <span className="text-danger  small  mb-0">
									<ErrorMessage name="email" />
								</span> */}
								</div>

								<>
									<h3 className='mt-5'>{"Change Password"}</h3>

									<div className="formbox mt-3">
										<div className={`forminnerbox ${Style.forminnerbox}`}>
											<Field
												name="password"
												type="password"
												className={`form-control ${Style.formControl}`}
												required
											/>
										<label>{"Current Password"}</label>
										</div>
										<span className="text-danger  small  mb-0">
											<ErrorMessage name="password" />
										</span>
									</div>

									<div className="formbox mt-3">
										<div className={`forminnerbox ${Style.forminnerbox}`}>
											<Field
												name="newPassword"
												type="password"
												className={`form-control ${Style.formControl}`}
												required
											/>
											<label>{"New Password"}</label>
										</div>
										<span className="text-danger  small  mb-0">
											<ErrorMessage name="newPassword" />
										</span>
									</div>

									<div className="formbox mt-3">
										<div className={`forminnerbox ${Style.forminnerbox}`}>
											<Field
												name="confirmPassword"
												type="password"
												className={`form-control ${Style.formControl}`}
												required
											/>
											<label>{"Confirm Password"}</label>
										</div>
										<span className="text-danger  small  mb-0">
											<ErrorMessage name="confirmPassword" />
										</span>
									</div>
								</>
							</div>


							<div className={`${Style.formBtn}`}>
								<button type="button" className={`${Style.canbtn}`} onClick={() => resetForm()} >
									{"Cancel"}
								</button>
								<button type="submit" className={`${Style.scbtn}`}>
									{"Save Changes"}
								</button>
							</div>
						</Form>
					}}
				</Formik>

			</div>
		</div>
	)
}

export default ProfileContent;