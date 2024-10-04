import React, { useState } from 'react'
import logoWh from "../Astes/logowh.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SignUpSlice } from '../Redux/slices/Authorisation';
import { useDispatch } from 'react-redux';
import AuthHeader from '../Layout/AuthHeader';

const Signup = () => {


  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(false)
  const dispatch = useDispatch()


  // Initial values for the Formik form
  const defaultValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""

  };

  const Validate = yup.object({
    name: yup.string().required('name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required("Password is required").matches(/^\S*$/, 'Password must not contain spaces'),
    confirmPassword: yup.string().required("confirm password is required").matches(/^\S*$/, 'confirm password must not contain spaces'),
  });


  const handleOnChange = (value, country) => {


    // Extract country code and phone number
    const countryCode = country?.dialCode;
    const phoneNumberWithoutCountryCode = value?.slice(countryCode?.length);

    setPhoneNumber({ countryCode, phoneNumberWithoutCountryCode })


  };


  const handleSubmit = async (values) => {
    let countryCode = `+${phoneNumber?.countryCode}`
    let newValue = {
      ...values, "phoneNumber": phoneNumber?.phoneNumberWithoutCountryCode,
      "countryCode": countryCode
    }

    let responseData = await dispatch(SignUpSlice({ ...newValue }));

    if (responseData?.payload?.status === 201) {
      navigate("/verification")
    }
  };








  return (
    <>
    <AuthHeader />
      <div className='accountbox'>
        <div className='leftpart'>
          <img src={logoWh} alt='img' />
        </div>
        <div className='rightpart'>
          <div className='accountinfo'>
            <h2>Sign Up</h2>
            <h3>Join the Fashion Revolution</h3>
            <p>Unlock your style potential and sign up for exclusive access to AI-driven fashion innovation.</p>

            <div>

              <Formik
                initialValues={defaultValue}
                validationSchema={Validate}
                onSubmit={handleSubmit}
              >
                <div className="login-box">
                  <Form>
                    <div className="formbox"  >
                      <div className='forminnerbox'>
                        <Field
                          name="name"
                          type="text"
                          className={`form-control `}
                          required
                        />
                        <label>Full Name</label>
                      </div>
                      <span className="text-danger mb-0">
                        <ErrorMessage name="name" />
                      </span>
                    </div>
                    <div className="formbox mt-3"  >
                      <div className='forminnerbox'>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control `}
                          autoComplete="off"
                          required
                        />
                        <label >Email</label>
                      </div>
                      <span className="text-danger mb-0">
                        <ErrorMessage name="email" />
                      </span>
                    </div>
                    <div className="formbox mt-3"  >
                      <div className={`${phoneNumber !== false && phoneNumber !== "" ? "phone-number" : "input-edit"} forminnerbox`}>
                        <PhoneInput

                          placeholder="Phone Number"
                          onChange={handleOnChange}
                          onFocus={setPhoneNumber}
                          required

                        />
                        {phoneNumber && <label>Contact Person Phone</label>}
                      </div>
                    </div>

                    <div className="formbox mt-3"  >
                      <div className='forminnerbox'>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control `}
                          autoComplete="off"
                          required
                        />
                        <label>Password</label>
                      </div>
                      <span className="text-danger mb-0">
                        <ErrorMessage name="password" />
                      </span>
                    </div>
                    <div className="formbox mt-3">
                      <div className='forminnerbox'>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className={`form-control `}
                          autoComplete="off"
                          required
                        />
                        <label>Confirmation Password</label>
                      </div>
                      <span className="text-danger mb-0">
                        <ErrorMessage name="confirmPassword" />
                      </span>
                    </div>


                    <div className="text-center">
                      <button type="submit" className="signbtn">
                        {"Sign Up"}
                      </button>
                    </div>
                  </Form>
                </div>
              </Formik>

            </div>

            <div className='newadd'>Already have an account? <button type='button' onClick={() => { navigate("/") }}>Sign in</button></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup