import React, { useState } from 'react'
import logoWh from "../Astes/logowh.svg"
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../Layout/AuthHeader';
import { forgetPasswordSlice } from '../Redux/slices/Authorisation';
import SuccessMessageComponent from '../WebPage/ReusableComponents/SuccessMessageComponent';


const Forgot = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [successMessagePopup, setSuccessMessagePopup] = useState(false);

    const defaultValueForgetPassword = {
        email: "",

    };

    const ValidateForgetPassword = yup.object({
        email: yup.string()
            // .email('Invalid email format')
            .required('Email is required'),
    });

    const handleSubmitForgetPassword = async (values) => {
        localStorage.setItem("verify-email", values.email)
        const modifiedValues = {
            email: values.email + '@alfar-group.com',
        };

        setEmailValue(modifiedValues)

        // console.log("valuesvalues", values)
        let responseData = await dispatch(forgetPasswordSlice({ ...modifiedValues }));

        if (responseData?.payload?.status == 200) {
            // navigate("/")
            setSuccessMessagePopup(true);
        }
    }


    const handleSubmitResendLink = async () => {
        let payload = {
            email: emailValue.email,
        }
        dispatch(forgetPasswordSlice(payload));
    }

    // console.log("emailValue", emailValue)

    return (
        <>
            <AuthHeader />

            <div className='accountbox'>
                <div className='leftpart' >
                    <img src={logoWh} alt='img' />
                </ div>
                <div className='rightpart'>
                    {successMessagePopup == false ?
                        <div className='accountinfo'>
                            <h2>{"Forgot Password?"}</h2>
                            <p>{"Please provide your registered email address to get your password reset link."}</p>


                            <Formik
                                initialValues={defaultValueForgetPassword}
                                validationSchema={ValidateForgetPassword}
                                onSubmit={handleSubmitForgetPassword}>

                                {({ values, handleChange }) => (
                                    <Form>
                                        <div className="formbox">
                                            <div className='forminnerbox input-group'>
                                                <Field
                                                    name="email"
                                                    type="text"
                                                    // className={`form-control`}
                                                    required
                                                    value={values.email}
                                                    className={` form-control`}
                                                    onChange={handleChange}
                                                />
                                                <label >{"Email"}</label>
                                                <label >{"Email"}</label>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">{"@alfar-group.com"}</span>
                                                </div>
                                            </div>
                                            <span className="text-danger  small  mb-0">
                                                <ErrorMessage name="email" />
                                            </span>
                                        </div>

                                        <div className="  d-flex">
                                            <button type="submit" className="signbtn mb-0 me-2">
                                                {"Reset Password"}
                                            </button>


                                        </div>
                                    </Form>)}

                            </Formik>
                            <div className='newadd'>{"Back to"}  <button type='button' onClick={() => { navigate("/") }}>{"Sign in!"}</button></div>
                        </div> :

                        <SuccessMessageComponent successMessagePopup={successMessagePopup} message={"Forgot"} handleSubmitResendLink={handleSubmitResendLink} emailValue={emailValue} />}
                </div>



            </div >
        </>
    )
}

export default Forgot
