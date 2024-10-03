import React, { useState } from 'react'
import logo from "../Astes/logowh.svg"

import appleIcon from "../Astes/appleIcon.svg"
import googleIcon from "../Astes/googleIcon.svg"
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { forgetPasswordSlice, SignInSlice } from '../Redux/slices/Authorisation';

import AuthHeader from '../Layout/AuthHeader'


const Signin = () => {
  const [forgetPopupToggle, setForgetPopupToggle] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultValue = {
    email: "",
    password: "",
  };

  const Validate = yup.object({
    email: yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup.string().required("Password is required").matches(/^\S*$/, 'Password must not contain spaces'),
  });

  const handleSubmit = async (values) => {
    let responseData = await dispatch(SignInSlice({ ...values }));

    if (responseData?.payload?.status === 200) {
      navigate("/profile#account-details")
      window.location.reload()
    }
  };

  const forgetPasswordFun = () => {
    navigate("/forgot")
  }

  return (
    <>
    <AuthHeader />
      <div className='accountbox'>
        <div className='leftpart'>
          <img src={logo} alt='img' />
        </div>
        <div className='rightpart'>
          <div className='accountinfo'>
            <h2>Sign in</h2>
            <h3>Welcome Back</h3>
            <p>Elevate your fashion journey with Stofee – Your AI-powered style companion.</p>
            <Formik
              initialValues={defaultValue}
              validationSchema={Validate}
              onSubmit={handleSubmit}>
              <Form>
                <div className="formbox mt-3">
                  <div className='forminnerbox'>
                    <Field
                      name="email"
                      type="text"
                      className={`form-control`}
                      required
                    />
                    <label >Email</label>
                  </div>
                  <span className="text-danger text-small mb-0">
                    <ErrorMessage name="email" />
                  </span>
                </div>
                <div className="formbox mt-3">
                  <div className='forminnerbox'>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control`}
                      required
                    />
                    <label>Password</label>
                  </div>
                  <span className="text-danger text-small mb-0">
                    <ErrorMessage name="password" />
                  </span>
                </div>

                <div className="text-center">
                  <button type="submit" className="signbtn">
                    {"Sign in"}
                  </button>
                </div>
              </Form>
            </Formik>
            <div className='text-center'>
              <button type='button' onClick={() => forgetPasswordFun()} className='forgotbtn'>
                forget password
              </button>
            </div>

            <button type='button' className='applebtn'> <img src={appleIcon} alt='appleIcon' /> Sign in with Apple </button>
            <button type='button' className='googlebtn'> <img src={googleIcon} alt='googleIcon' /> Sign in with Google </button>
            <div className='newadd'>New here? <button type='button' onClick={() => { navigate("/signup") }}>Create an account</button></div>
          </div>
        </div>

      </div>

     
    </>
  )
}

export default Signin