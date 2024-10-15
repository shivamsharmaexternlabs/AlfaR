import React, { useEffect, useState } from 'react'
import logo from "../Astes/logowh.svg"
import appleIcon from "../Astes/appleIcon.svg"
import googleIcon from "../Astes/googleIcon.svg"
import passShow from "../Astes/eye.svg"
import passHide from "../Astes/eye-disable.svg"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { ChangePassword, forgetPasswordSlice, SignInSlice } from '../Redux/slices/Authorisation';
import { GoogleLogin } from '@react-oauth/google';
import AuthHeader from '../Layout/AuthHeader'
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { closeIcon, eyeIcon, informationIcon, roles, routes } from '../utils/Constants';
import SuccessMessageComponent from '../WebPage/ReusableComponents/SuccessMessageComponent'



const Signin = () => {
  const [forgetPopupToggle, setForgetPopupToggle] = useState(false)
  const [changePasswordScreen, setChangePasswordScreen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routeData = useLocation();

  // console.log("routeDatajhdsjhds", routeData)

  const [showPassword, setShowPassword] = useState(changePasswordScreen ? true : false);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const [showSuccessMessagePopup, setShowSucessMessagePopup] = useState(false);

  const defaultValue = {
    email: "",
    password: "",
  };


  useEffect(() => {
    // Check if the user is already signed in by checking for the token
    const accessToken = localStorage.getItem("Token");
    const Role = localStorage.getItem("Role");
    if (accessToken) {
      try {
        if (Role === roles.ADMIN) {
          navigate(routes.ADMIN);
        } else if (Role === roles.USER) {
          navigate(routes.USER);
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [navigate]);

  const Validate = yup.object({
    email: yup.string()
      // .email("Invalid Email")
      .required('Email is required'), // No need for domain validation now
    // .matches(/^[a-zA-Z0-9._%+-]+$/, 'Invalid email format before @alfar-group.com'), // Validate only the part before @
    password: yup.string()
      .required("Password is required")
      .matches(/^\S*$/, 'Password must not contain spaces'),
  });
  const handleSubmit = async (values) => {

    const modifiedValues = {
      ...values,
      email: values.email + '@alfar-group.com',
    };

    if (modifiedValues) {

      dispatch(SignInSlice({ ...modifiedValues })).then((res) => {
        // console.log("res", res)
        if (res?.payload !== undefined) {
          if (res?.payload?.data?.user?.role === roles.USER) {
            navigate(routes.ADMIN)
          } else if (res?.payload?.data?.user?.role === roles.ADMIN) {
            navigate(routes.ADMIN)
          }
          else {
            if (res?.payload?.response?.data?.message) {
              setServerErrorMessage(res?.payload?.response?.data?.message)
            }
          }

        }
      })
    }




    // // if (responseData?.payload?.status === 200) {
    // navigate("/profile#account-details")
    // window.location.reload()
    // }
  };

  useEffect(() => {
    if (routeData?.state?.changePasswordScreen) {
      setChangePasswordScreen(true)
      if (routeData?.state?.token) {
        localStorage.setItem("Token", routeData?.state?.token)
      }
    }
  }, [routeData?.state?.changePasswordScreen])

  const defaultPasswordValue = {
    password: "",
    newPassword: "",
    confirmPassword: ""
  };

  const defaultPasswordValidate = yup.object({
    password: yup.string().required("Temporary Password is required").matches(/^\S*$/, 'Temporary Password must not contain spaces'),
    newPassword: yup.string().required("New Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        "New Password must be at least 8 characters long and include uppercase and lowercase letters, numbers, and symbols."
      )
      .matches(/^\S*$/, 'New Password must not contain spaces'),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref('newPassword'), null], "Passwords do not match"),
  });

  const handlePasswordSubmit = (values, { setSubmitting, setErrors }) => {


    if (values) {
      dispatch(ChangePassword({ ...values })).then((res) => {
        if (res.payload !== undefined) {
          if (res?.payload?.data?.message === "Password changed successfully") {
            setShowSucessMessagePopup(true);
            // setChangePasswordScreen(false);
            toast.warn("Please Login Again");
          } else {
            if (res?.payload?.response?.data?.message) {
              setServerErrorMessage("Temporary password incorrect")
            }
          }

        }
      })
    } else {
      setErrors({
        form: "Password must meet the format requirements and match the confirm password."
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

  const handleRemovePopup = () => {
    setShowSucessMessagePopup(false);
    setChangePasswordScreen(false);
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
            <h2>{!showSuccessMessagePopup ? (!changePasswordScreen ? "Sign in" : "Create Password") : ""}</h2>
            <h3>{!showSuccessMessagePopup ? (!changePasswordScreen ? "Welcome Back" : "") : ""}</h3>
            {(changePasswordScreen && !showSuccessMessagePopup) && <h3>{`Hi, ${routeData?.state?.userData?.name}`}</h3>}
            {!showSuccessMessagePopup && <p className='mb-md-4 mb-3'>{!changePasswordScreen ? "Please sign in to manage client accounts and company operations." : `${routeData?.state?.userData?.email}`}</p>}
            {!changePasswordScreen ?
              <div>
                <Formik
                  initialValues={defaultValue}
                  validationSchema={Validate}
                  onSubmit={handleSubmit}>

                  {({ values, handleChange, errors, touched }) => {
                    // console.log("errorsjkj", errors)
                    return <Form >
                      <div className="formbox mt-3">
                        {/* <div className='forminnerbox'>
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
                        </span> */}
                        <div className={`forminnerbox input-group ${((errors.email && touched.email) || serverErrorMessage === "User not found") ? 'border-danger' : ""}`}>
                          <Field
                            name="email"
                            type="text"
                            value={values.email}
                            className={` form-control`}
                            onChange={handleChange}


                            required
                          // placeholder="Enter your email"
                          />
                          <label >{"Email"}</label>
                          <div className="input-group-append">
                            <span className="input-group-text">{"@alfar-group.com"}</span>
                          </div>
                        </div>

                        <span className="text-danger  small  mb-0">
                          <ErrorMessage name="email" component="div" />
                        </span>
                      </div>
                      <div className="formbox mt-3">
                        <div className={`forminnerbox passwordBox ${((errors.password && touched.password) || serverErrorMessage === "Invalid password") ? 'border-danger' : ""}`}>
                          <Field
                            name="password"
                            // type="password"
                            type={showPassword ? "text" : "password"}
                            className={`form-control`}

                            required
                          />
                          <label>{"Password"}</label>
                          <div className='passEye'>
                            {!showPassword
                              ? <img src={passShow} alt='passShow img' className='passShow' onClick={() => setShowPassword(true)} />
                              : <img src={passHide} alt='passHide img' className='passHide' onClick={() => setShowPassword(false)} />}

                          </div>
                        </div>
                        <span className="text-danger  small  mb-0">
                          <ErrorMessage name="password" />
                        </span>
                      </div>
                      {(Object.keys(errors).length === 0) ? (serverErrorMessage ? <p className='text-danger small'>{serverErrorMessage}</p> : <></>) : ""}

                      <div className="text-center">
                        <button type="submit" className="signbtn">
                          {"Sign in"}
                        </button>
                      </div>
                    </Form>
                  }}
                </Formik>

                <div className='text-center'>
                  <button type='button' onClick={() => forgetPasswordFun()} className='forgotbtn'>
                    {"Forgot Password?"}
                  </button>
                </div>
              </div>
              : (!showSuccessMessagePopup && changePasswordScreen) ? <Formik
                initialValues={defaultPasswordValue}
                validationSchema={defaultPasswordValidate}
                onSubmit={handlePasswordSubmit}>
                {({ setFieldValue, errors, touched }) => {
                  return <Form>

                    <div className="formbox mt-3">
                      <div className={`forminnerbox passwordBox ${errors.password && touched.password ? 'border-danger' : ""}`}>
                        <Field
                          name="password"
                          type={"text"}
                          className={`form-control ${errors.password && touched.password ? 'border-danger' : ""}`}
                          required
                        />
                        <label>{"Temporary Password"}</label>



                        {/* <div className='passEye'>
                          {showPassword
                            ? <img src={passShow} alt='passShow img' className='passShow' onClick={() => setShowPassword(false)} />
                            : <img src={passHide} alt='passHide img' className='passHide' onClick={() => setShowPassword(true)} />}

                        </div> */}
                      </div>
                      {/* <span className="text-danger  small  mb-0">
                        <ErrorMessage name="password" />
                      </span> */}
                    </div>
                    <div className="formbox mt-3">
                      <div className={`forminnerbox passwordBox d-flex align-items-center justify-content-space-between pe-2 ${errors.newPassword && touched.newPassword ? 'border-danger' : ""}`}>
                        <Field
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          className={`form-control ${errors.newPassword && touched.newPassword ? 'is-invalid ' : ''}`}
                          required
                        />
                        <label>{"New Password"}</label>
                        {/* <div className='passEye'>
                          {showNewPassword
                            ? <img src={passShow} alt='passShow img' className='passShow' onClick={() => setShowNewPassword(false)} />
                            : <img src={passHide} alt='passHide img' className='passHide' onClick={() => setShowNewPassword(true)} />}

                        </div> */}

                        <div className='passfomrmatebox'>
                          <img src={informationIcon} alt="info" />
                          <div className='passfomrmateboxTooltip'>
                            <h3>Password Format: </h3>
                            <ul>
                              <li>Minimum 8 characters (uppercase and lowercase).</li>
                              <li>Minimum 1 number.</li>
                              <li>Minimum 1 special character or symbol.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* <span className="text-danger  small  mb-0">
                        <ErrorMessage name="newPassword" />
                      </span> */}
                    </div>
                    <div className="formbox mt-3">
                      <div className={`forminnerbox passwordBox ${errors.confirmPassword && touched.confirmPassword ? 'border-danger' : ""}`}>
                        <Field
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid ' : ''}`}
                          required
                        />
                        <label>{"Confirm Password"}</label>
                        {/* <div className='passEye'>
                          {showConfirmPassword
                            ? <img src={passShow} alt='passShow img' className='passShow' onClick={() => setShowConfirmPassword(false)} />
                            : <img src={passHide} alt='passHide img' className='passHide' onClick={() => setShowConfirmPassword(true)} />}

                        </div> */}
                      </div>
                      {/* <span className="text-danger  small  mb-0">
                        <ErrorMessage name="confirmPassword" />
                      </span> */}
                    </div>

                    {(errors.password || errors.newPassword || errors.confirmPassword) && (
                      <div className="text-danger small mt-2">
                        {errors.password || errors.newPassword || errors.confirmPassword}
                      </div>
                    )}

                  {(Object.keys(errors).length === 0) ? (serverErrorMessage ? <p className='text-danger small mt-2'>{serverErrorMessage}</p> : <></>) : ""}

                    <div className="text-center">
                      <button type="submit" className="signbtn">
                        {"Change Password"}
                      </button>
                    </div>
                  </Form>
                }}
              </Formik> : <SuccessMessageComponent message={'created'} handleRemovePopup={handleRemovePopup} />

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
