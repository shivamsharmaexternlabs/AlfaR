import React, { useState } from 'react'
import logo from "../Astes/logowh.svg"
import appleIcon from "../Astes/appleIcon.svg"
import googleIcon from "../Astes/googleIcon.svg"
import passShow from "../Astes/eye.svg"
import passHide from "../Astes/eye-disable.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { ChangePassword, forgetPasswordSlice, SignInSlice } from '../Redux/slices/Authorisation';
import { GoogleLogin } from '@react-oauth/google';
import AuthHeader from '../Layout/AuthHeader'
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { closeIcon, eyeIcon, roles, routes } from '../utils/Constants';



const Signin = () => {
  const [forgetPopupToggle, setForgetPopupToggle] = useState(false)
  const [changePasswordScreen, setChangePasswordScreen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (values) {

      dispatch(SignInSlice({ ...values })).then((res) => {
        console.log("res", res)
        if (res.payload !== undefined) {
          if (res.payload.data.user.role === roles.USER) {
            if (res.payload.data.user.isPasswordValid === false) {
              setChangePasswordScreen(true)
            } else {
              navigate(routes.ADMIN)
              window.location.reload()
            }
          }

          // else if(res?.payload?.status === 202){
          //   localStorage.setItem("verify-email", values.email)
          //   navigate("/verification")
          // }


          else {
            navigate(routes.ADMIN)
            window.location.reload()
          }

        }
      });
    }


    // // if (responseData?.payload?.status === 200) {
    // navigate("/profile#account-details")
    // window.location.reload()
    // }
  };

  const defaultPasswordValue = {
    password: "",
    newPassword: "",
    confirmPassword: ""
  };

  const defaultPasswordValidate = yup.object({
    password: yup.string().required("Password is required").matches(/^\S*$/, 'Password must not contain spaces'),
    newPassword: yup.string().required("New Password is required").matches(/^\S*$/, 'New Password must not contain spaces'),
    confirmPassword: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Confirm Password must not contain spaces'),
  });

  const handlePasswordSubmit = (values) => {
    if (values) {
      dispatch(ChangePassword({ ...values })).then((res) => {
        if (res.payload.data.message === "Password changed successfully") {
          setChangePasswordScreen(false);
          toast.warn("Please Login Again");
        }
      });
    }

    // if (responseData?.payload?.status === 200) {
    //   navigate("/profile#account-details")
    //   window.location.reload()
    // }
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
            <p className='mb-md-4 mb-3'>{"Please sign in to manage client accounts and company operations."}</p>
            {!changePasswordScreen ?
              <div>
                <Formik
                  initialValues={defaultValue}
                  validationSchema={Validate}
                  onSubmit={handleSubmit}>
                  <Form >
                    <div className="formbox mt-3">
                      <div className='forminnerbox'>
                        <Field
                          name="email"
                          type="text"
                          className={` form-control`}
                          required
                        />
                        <label >{"Email"}</label>
                      </div>
                      <span className="text-danger  small  mb-0">
                        <ErrorMessage name="email" />
                      </span>
                    </div>
                    <div className="formbox mt-3">
                      <div className='forminnerbox passwordBox'>
                        <Field
                          name="password"
                          // type="password"
                          type={showPassword ? "text" : "password"}
                          className={`form-control`}
                          required
                        />
                        <label>{"Password"}</label>
                        <div className='passEye'>
                          {showPassword
                            ? <img src={passShow} alt='passShow img' className='passShow' onClick={() => setShowPassword(false)} />
                            : <img src={passHide} alt='passHide img' className='passHide' onClick={() => setShowPassword(true)} />}

                        </div>
                      </div>
                      <span className="text-danger  small  mb-0">
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
                    {"forget password?"}
                  </button>
                </div>
              </div>
              :
              <Formik
                initialValues={defaultPasswordValue}
                validationSchema={defaultPasswordValidate}
                onSubmit={handlePasswordSubmit}>
                {({ setFieldValue, errors }) => {

                  console.log("errors", errors)
                  return <Form>

                    <div className="formbox mt-3">
                      <div className='forminnerbox passwordBox'>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control`}
                          required
                        />
                        <label>{"Old Password"}</label>

                        <div className='passEye'>
                          {showPassword
                            ? <img src={passShow} alt='passShow img' className='passShow' onClick={() => setShowPassword(false)} />
                            : <img src={passHide} alt='passHide img' className='passHide' onClick={() => setShowPassword(true)} />}

                        </div>
                      </div>
                      <span className="text-danger  small  mb-0">
                        <ErrorMessage name="password" />
                      </span>
                    </div>
                    <div className="formbox mt-3">
                      <div className='forminnerbox passwordBox'>
                        <Field
                          name="newPassword"
                          type="password"
                          className={`form-control`}
                          required
                        />
                        <label>{"New Password"}</label>
                        <div className='passEye'>
                          {showNewPassword
                            ? <img src={passShow} alt='passShow img' className='passShow' onClick={() => setShowNewPassword(false)} />
                            : <img src={passHide} alt='passHide img' className='passHide' onClick={() => setShowNewPassword(true)} />}

                        </div>
                      </div>
                      <span className="text-danger  small  mb-0">
                        <ErrorMessage name="newPassword" />
                      </span>
                    </div>
                    <div className="formbox mt-3">
                      <div className='forminnerbox passwordBox'>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className={`form-control`}
                          required
                        />
                        <label>{"Confirm Passowrd"}</label>
                        <div className='passEye'>
                          {showConfirmPassword
                            ? <img src={passShow} alt='passShow img' className='passShow' onClick={() => setShowConfirmPassword(false)} />
                            : <img src={passHide} alt='passHide img' className='passHide' onClick={() => setShowConfirmPassword(true)} />}

                        </div>
                      </div>
                      <span className="text-danger  small  mb-0">
                        <ErrorMessage name="confirmPassword" />
                      </span>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="signbtn">
                        {"Change Password"}
                      </button>
                    </div>
                  </Form>
                }}
              </Formik>

            }
            {/* 
            <button type='button' className='applebtn'> <img src={appleIcon} alt='appleIcon' /> Sign in with Apple </button>
            <button type='button' className='googlebtn'>
               <img src={googleIcon} alt='googleIcon' /> 
              Sign in with Google  </button> */}

            {/* <div className='newadd'>New here? <button type='button' onClick={() => { navigate("/signup") }}>Create an account</button></div> */}
          </div>
        </div>

      </div>


    </>
  )
}

export default Signin