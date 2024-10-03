import { ErrorMessage, Field, Formik, Form } from 'formik'
import React from 'react'

const ProfileContent = ({ defaultValue, Validate, handleSubmit, Style }) => {
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

					<Form>
						<div className={`${Style.profileForminner}`}>
							<h3>{"Your Details"}</h3>
							<div className="formbox mt-3">
								<div className={`forminnerbox ${Style.forminnerbox}`}>
									<Field
										name="name"
										type="text"
										className={`form-control`}
										required
										autocomplete="off"
									/>
									<label>{"Name"}</label>
								</div>
								<span className="text-danger text-small mb-0">
									<ErrorMessage name="email" />
								</span>
							</div>

							<div className="formbox mt-3">
								<div className={`forminnerbox ${Style.forminnerbox}`}>
									<Field
										name="email"
										type="text"
										className={`form-control ${Style.formControl}`}
										required
										autocomplete="off"
									/>
									<label >{"Email Address"}</label>
								</div>
								<span className="text-danger text-small mb-0">
									<ErrorMessage name="email" />
								</span>
							</div>

							<h3 className='mt-5'>{"Change Password"}</h3>

							<div className="formbox mt-3">
								<div className={`forminnerbox ${Style.forminnerbox}`}>
									<Field
										name="password"
										type="password"
										className={`form-control ${Style.formControl}`}
										required
									/>
									<label>Password</label>
								</div>
								<span className="text-danger text-small mb-0">
									<ErrorMessage name="password" />
								</span>
							</div>
							<div className="formbox mt-3">
								<div className={`forminnerbox ${Style.forminnerbox}`}>
									<Field
										name="password"
										type="password"
										className={`form-control ${Style.formControl}`}
										required
									/>
									<label>{"Password"}</label>
								</div>
								<span className="text-danger text-small mb-0">
									<ErrorMessage name="password" />
								</span>
							</div>
							<div className="formbox mt-3">
								<div className={`forminnerbox ${Style.forminnerbox}`}>
									<Field
										name="password"
										type="password"
										className={`form-control ${Style.formControl}`}
										required
									/>
									<label>{"Password"}</label>
								</div>
								<span className="text-danger text-small mb-0">
									<ErrorMessage name="password" />
								</span>
							</div>
						</div>

						<div className={`${Style.formBtn}`}>
							<button type="button" className={`${Style.canbtn}`}>
								{"Cancel"}
							</button>
							<button type="submit" className={`${Style.scbtn}`}>
								{"Save Changes"}
							</button>
						</div>
					</Form>
				</Formik>

			</div>
		</div>
	)
}

export default ProfileContent;