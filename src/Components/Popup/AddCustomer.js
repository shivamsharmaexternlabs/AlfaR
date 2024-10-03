import React from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import * as yup from "yup";
import { Formik, Form, Field } from "formik";

const AddCustomer = ({
  addCustomerPopup,
  setAddCustomerPopup,
  setSuccessfulPopup
}) => {

  const defaultValue = {
    exchange: "",
    apiKey: "",
  };
  const Validate = yup.object({
    exchange: yup.string()
      .required('Exchange is required'),
    apiKey: yup.string().required("Api-Key is required")
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
      <PopupDetails PopupToggle={addCustomerPopup} classNameProp='addCustomer'>
        <div className='popupinner'>
          <button type='button' className='closebtn'><img src={Closebtn} alt='close btn' /> </button>
          <h2>{"Add Customer"}</h2>
          <Formik
            initialValues={defaultValue}
            validationSchema={Validate}
            onSubmit={handleSubmit}>
            <Form>
              <div className="formbox mt-3">
                <div className='forminnerbox'>
                  <Field
                    name="exchange"
                    type="name"
                    className={`form-control`}
                    required
                  />
                  <label >{"Exchange"}</label>
                </div>
              </div>
              <div className="formbox mt-3">
                <div className='forminnerbox'>
                  <Field
                    name="apikey"
                    type="text"
                    className={`form-control`}
                    required
                  />
                  <label >{"API Key"}</label>
                </div>
              </div>
              <div className='text-end mt-5 mb-3'>
                <button type='button' className='btnWh me-3' onClick={() => setAddCustomerPopup(false)}>{"Cancel"}</button>
                <button type='button' className='btnBl' onClick={() => setSuccessfulPopup(true)}>{"Add"}</button>
              </div>
            </Form>
          </Formik>
        </div>
      </PopupDetails>
    </>
  )
}

export default AddCustomer