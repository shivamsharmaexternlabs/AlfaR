import React, { useState } from 'react'
import logoWh from "../Astes/logowh.svg"
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from 'react-router-dom';
import AuthHeader from '../Layout/AuthHeader';
import { ResetPasswordSlice } from '../Redux/slices/Authorisation';
import { informationIcon } from '../utils/Constants';
import SuccessMessageComponent from '../WebPage/ReusableComponents/SuccessMessageComponent';


const RestPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const routePath = useLocation();

    console.log("routePath",routePath)

    const [successMessagePopup, setSuccessMessagePopup] = useState(false);


    const defaultValue = {
        password: "",
        confirmPassword: ""

    };

    const Validate = yup.object({
        password: yup
            .string()
            .required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                "Password must be at least 8 characters long and include uppercase and lowercase letters, numbers, and symbols."
            )
            .matches(/^\S*$/, 'Password must not contain spaces'),
        confirmPassword: yup
            .string()
            .required("Confirm password is required")
            .oneOf([yup.ref('password'), null], "Passwords do not match"),
    });

    const handleSubmitPassword = async (values, { setSubmitting, setErrors }) => {
        // localStorage.setItem("verify-email", values.email)
        const TokenFromAuth = routePath?.pathname?.split("/")?.[2]

        let responseData = await dispatch(ResetPasswordSlice({ values, Token: TokenFromAuth }));

        if (responseData?.payload?.status == 200) {
            // navigate("/")
            setSuccessMessagePopup(true);

        } else {
            setErrors({
                form: "Password must meet the format requirements and match the confirm password."
            });
        }
    }

    return (
        <>
            <AuthHeader />
            < div className='accountbox'>
                < div className='leftpart' >
                    <img src={logoWh} alt='img' />
                </ div>
                <div className='rightpart'>
                    {!successMessagePopup ? <div className='accountinfo'>
                        <h2>{"Reset Password"}</h2>
                        <p>{"Please create a new password as per the password format."}</p>


                        <Formik
                            initialValues={defaultValue}
                            validationSchema={Validate}
                            onSubmit={handleSubmitPassword}>
                            {({ errors, touched }) => {
                                console.log("errors", errors, "touched", touched)
                                return <Form>
                                    <div className="formbox mt-3">
                                        <div className={`forminnerbox d-flex align-items-center justify-content-space-between pe-2  ${errors.password && touched.password ? 'border-danger' : ""}`}>
                                            <Field
                                                name="password"
                                                type="text"
                                                  // type="password"
                                                className={`form-control ${errors.password && touched.password ? 'is-invalid ' : ''}`}
                                                autoComplete="off"
                                                required
                                            />
                                            <label>{"New Password"}</label>
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
                                    </div>

                                    <div className="formbox mt-3">
                                        <div className={`forminnerbox ${errors.confirmPassword && touched.confirmPassword ? 'border-danger' : ""}`}>
                                            <Field
                                                name="confirmPassword"
                                                type="text"
                                                // type="password"
                                                className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid border-danger' : ''}`}
                                                autoComplete="off"
                                                required
                                            />
                                            <label>{"Confirm Password"}</label>
                                        </div>
                                    </div>

                                    {/* General Error Message */}
                                    {(errors.password || errors.confirmPassword) && (
                                        <div className="text-danger small mt-2">
                                            {errors.password || errors.confirmPassword}
                                        </div>
                                    )}

                                    <div className="d-flex">
                                        <button type="submit" className="signbtn mb-0 me-2">
                                            {"Submit"}
                                        </button>
                                    </div>
                                </Form>
                            }}
                        </Formik>
                        {/* <div className='newadd'>Already on board? Let us take you to  <button type='button' onClick={() => { navigate("/signup") }}>Sign In!</button></div> */}
                    </div> :
                        <SuccessMessageComponent message={'Reset'} />}
                </div>



            </div >
        </>
    )
}

export default RestPassword