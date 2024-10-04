import React, { useState } from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { exchanges, exchangesOptions } from '../utils/Constants';
import { CreateCustomer } from '../Redux/slices/CustomerSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddCustomer = ({
  addCustomerPopup,
  setAddCustomerPopup,
  setSuccessfulPopup
}) => {
  const dispatch = useDispatch();

  const { createdCustomer } = useSelector((state) => state.CustomerApiData);

  const [selectedExchange, setSelectedExcahnge] = useState('');

  console.log("createdCustomer", createdCustomer);

  const defaultValue = {
    name: "",
    platform: "",
    secret_key: "",
    api_password: "",
    api_key: "",
  };

  const Validate = yup.object().shape({
    name: yup.string().required("Name is required"),
    platform: yup.string().required('Exchange is required'),
    secret_key: yup.string().nullable()
      .when('platform', ([platform], schema) => {
        if (platform === exchanges.BINANCE || platform === exchanges.OKX || platform === exchanges.COINBASE)
          return yup.string().required('Secret-Key is required');
        return schema;
      }),
    api_password: yup.string().nullable()
      .when('platform', ([platform], schema) => {
        if (platform === exchanges.OKX)
          return yup.string().required("Api-Password is required");
        return schema;
      }),
    api_key: yup.string().nullable()
      .when('platform', ([platform], schema) => {
        if (platform === exchanges.BINANCE || platform === exchanges.OKX || platform === exchanges.COINBASE)
          return yup.string().required("Api-Key is required");
        return schema;
      }),
  });

  const handleSubmit = async (values) => {

    console.log("values", values)

    let finalPayload = {
      name: values.name,
      platform: values.platform,
      api_key: values.api_key,
      secret_key: values.secret_key,
    }

    let payload = (selectedExchange === exchanges.BINANCE || selectedExchange === exchanges.COINBASE)
      ? finalPayload
      : values;

    if (values) {
      dispatch(CreateCustomer({ ...payload })).then((res) => console.log("res.data", res.data));
    }

    // if (responseData?.payload?.status === 200) {
    //   navigate("/profile#account-details")
    //   window.location.reload()
    // }

  };


  const handleClosePopup = () => {
    setAddCustomerPopup(false);
  }

  return (
    <>
      <PopupDetails PopupToggle={addCustomerPopup} classNameProp='addCustomer'>
        <div className='popupinner'>
          <button type='button' className='closebtn' onClick={handleClosePopup}><img src={Closebtn} alt='close btn' /> </button>
          <h2>{"Add Customer"}</h2>
          <Formik
            initialValues={defaultValue}
            validationSchema={Validate}
            onSubmit={handleSubmit}>

            {({ setFieldValue, errors }) => {

              console.log("EEErrors", errors)

              return <Form>
                <div className="formbox mt-3">
                  <div className='forminnerbox'>
                    <Field
                      name="name"
                      type="name"
                      className={`form-control`}
                      required
                    />
                    <label >{"Name"}</label>
                  </div>

                  <p className="text-danger">
                    <ErrorMessage name="name" />
                  </p>
                </div>


                <div className="formbox mt-3">
                  <div className='forminnerbox'>
                    <label>{"Exchange"}</label>
                    <select
                      name="platform"
                      value={selectedExchange}

                      onChange={(e) => {
                        setFieldValue("platform", e.target.value)
                        setSelectedExcahnge(e.target.value)
                      }}
                      // onBlur={field.onBlur}
                      className="form-control"
                    >
                      <option value="" label="Select device type" />
                      {exchangesOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-danger mb-0">
                      <ErrorMessage name="platform" />
                    </p>
                  </div>
                </div>

                <>

                  {(selectedExchange === exchanges.BINANCE || selectedExchange === exchanges.COINBASE || selectedExchange === exchanges.OKX) && <>
                    <div className="formbox mt-3">
                      <div className='forminnerbox'>
                        <Field
                          name="secret_key"
                          type="text"
                          className={`form-control`}
                          required
                        />
                        <label >{"Secret Key"}</label>
                      </div>
                      <p className="text-danger">
                        <ErrorMessage name="secret_key" />
                      </p>

                    </div>

                    <div className="formbox mt-3">
                      <div className='forminnerbox'>
                        <Field
                          name="api_key"
                          type="text"
                          className={`form-control`}
                          required
                        />
                        <label >{"API Key"}</label>
                      </div>

                      <p className="text-danger">
                        <ErrorMessage name="api_key" />
                      </p>

                    </div>

                  </>}

                  {selectedExchange === exchanges.OKX && <div className="formbox mt-3">
                    <div className='forminnerbox'>
                      <Field
                        name="api_password"
                        type="text"
                        className={`form-control`}
                        required
                      />
                      <label >{"Api Password"}</label>
                    </div>
                    <p className="text-danger">
                      <ErrorMessage name="api_password" />
                    </p>
                  </div>}

                </>
                <div className='text-end mt-5 mb-3'>
                  <button type='button' className='btnWh me-3' onClick={handleClosePopup}>{"Cancel"}</button>
                  <button type='submit' className='btnBl'

                  // onClick={() => setSuccessfulPopup(true)}
                  >{"Add"}</button>
                </div>
              </Form>
            }}
          </Formik>
        </div>
      </PopupDetails>
    </>
  )
}

export default AddCustomer