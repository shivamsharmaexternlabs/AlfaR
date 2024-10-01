import React from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";


const AddCustomer = () => {
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
    // let responseData = await dispatch(SignInSlice({ ...values }));

    // if (responseData?.payload?.status === 200) {
    //   navigate("/profile#account-details")
    //   window.location.reload()
    // }
  };


  return (
    <>
      <PopupDetails PopupToggle={false} classNameProp='addCustomer'>
        <div className='popupinner'>
          <button type='button' className='closebtn'><img src={Closebtn} alt='close btn' /> </button>
          <h2>Add Customer</h2>
          <Formik
            initialValues={defaultValue}
            validationSchema={Validate}
            onSubmit={handleSubmit}>
            <Form>
              <div className="formbox mt-3">
                <div className='forminnerbox'>
                  <Field
                    name="email"
                    type="email"
                    className={`form-control`}
                    required
                  />
                  <label >Exchange</label>
                </div>
              </div>
              <div className="formbox mt-3">
                <div className='forminnerbox'>
                  <Field
                    name="text"
                    type="text"
                    className={`form-control`}
                    required
                  />
                  <label >API Key</label>
                </div>
              </div>
              <div className='text-end mt-5 mb-3'>
                <button type='button' className='btnWh me-3'>Cancel</button>
                <button type='button' className='btnBl'>Add</button>
              </div>
            </Form>
          </Formik>
        </div>



      </PopupDetails>
    </>
  )
}

export default AddCustomer