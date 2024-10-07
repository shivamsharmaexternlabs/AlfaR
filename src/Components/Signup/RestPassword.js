import React from 'react'
import logoWh from "../Astes/logowh.svg"
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from 'react-router-dom';
import AuthHeader from '../Layout/AuthHeader';
import { ResetPasswordSlice } from '../Redux/slices/Authorisation';


const RestPassword = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const routePath = useLocation();


    const defaultValue = {

        password: "",
        confirmPassword: ""

    };

    const Validate = yup.object({
        password: yup.string().required("Password is required").matches(/^\S*$/, 'Password must not contain spaces'),
        confirmPassword: yup.string().required("confirm password is required").matches(/^\S*$/, 'confirm password must not contain spaces'),
    });

    const handleSubmitPassword = async (values) => {
        // localStorage.setItem("verify-email", values.email)
        const TokenFromAuth = routePath?.pathname?.split("/")?.[2]
        
        let responseData = await dispatch(ResetPasswordSlice({ values, Token: TokenFromAuth }));

        if (responseData.payload.status == 200) {
            navigate("/")
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
                    <div className='accountinfo'>
                        <h2>Forgot Password?</h2>
                        <p>Please provide your registered email address to get your password reset link.</p>


                        <Formik
                            initialValues={defaultValue}
                            validationSchema={Validate}
                            onSubmit={handleSubmitPassword}>
                            <Form>
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
                                    <span className="text-danger  small mb-0 small">
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
                                    <span className="text-danger  small mb-0 small">
                                        <ErrorMessage name="confirmPassword" />
                                    </span>
                                </div>

                                <div className="  d-flex">
                                    <button type="submit" className="signbtn mb-0 me-2">
                                        {"Submit"}
                                    </button>


                                </div>
                            </Form>

                        </Formik>
                        <div className='newadd'>Already on board? Let us take you to  <button type='button' onClick={() => { navigate("/signup") }}>Sign In!</button></div>
                    </div>
                </div>



            </div >
        </>
    )
}

export default RestPassword