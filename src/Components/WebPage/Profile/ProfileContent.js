import { ErrorMessage, Field, Formik, Form } from 'formik'
import React from 'react'
import { informationIcon, roles } from '../../utils/Constants'

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
									<div className={`forminnerbox ${Style.forminnerbox} ${Style.formnameBox }`} style={{backgroundColor:'#E5E5E5'}}>
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

								<div className="formbox mt-3" >
									<div className={`forminnerbox ${Style.forminnerbox} ${Style.formnameBox }`} style={{backgroundColor:'#E5E5E5'}}>
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
										<div className={`forminnerbox ${Style.forminnerbox} d-flex align-items-center justify-content-space-between pe-2`}>
											<Field
												name="newPassword"
												type="password"
												className={`form-control ${Style.formControl}`}
												required
											/>
											<label>{"New Password"}</label>
											<div className='passfomrmatebox'>
                                                <img src={informationIcon} alt="info" />
                                                <div className='passfomrmateboxTooltip'>
                                                    <h3 class="text-white mb-1" style={{fontSize:'10px'}}>Password Format: </h3>
                                                    <ul>
                                                        <li>Minimum 8 characters (uppercase and lowercase).</li>
                                                        <li>Minimum 1 number.</li>
                                                        <li>Minimum 1 special character or symbol.</li>
                                                    </ul>
                                                </div>
                                            </div>
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