import React, { useState } from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CUSTOMERS, exchanges, exchangesOptions } from '../utils/Constants';
import { CreateCustomer, EditCustomer, GetCustomerDetails } from '../Redux/slices/CustomerSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddCustomer = ({
  addCustomerPopup,
  setAddCustomerPopup,
  setSuccessfulPopup,
  popupMethod,
  setMessage,
  editCustomerData,
  setEditCustomerData,
}) => {
  const dispatch = useDispatch();

  ;

  const [selectedExchange, setSelectedExcahnge] = useState('');
  // console.log("editCustomerData", editCustomerData);

  const defaultValue = {
    name: editCustomerData?.name === undefined ? "" : editCustomerData?.name,
    platform: editCustomerData?.platform === undefined ? "" : editCustomerData?.platform,
    secretKey: editCustomerData?.secretKey === undefined ? "" : editCustomerData?.secretKey,
    apiPassword: editCustomerData?.apiPassword === undefined ? "" : editCustomerData?.apiPassword,
    apiKey: editCustomerData?.apiKey === undefined ? "" : editCustomerData?.apiKey,
  };

  const Validate = yup.object().shape({
    // name: yup.string().required("Name is required"),
    platform: yup.string().required('Exchange is required'),
    secretKey: yup.string().nullable()
      .when('platform', ([platform], schema) => {
        if (platform === exchanges.BINANCE || platform === exchanges.OKX || platform === exchanges.COINBASE)
          return yup.string().required('Secret-Key is required');
        return schema;
      }),
    apiPassword: yup.string().nullable()
      .when('platform', ([platform], schema) => {
        if (platform === exchanges.OKX)
          return yup.string().required("Api-Password is required");
        return schema;
      }),
    apiKey: yup.string().nullable()
      .when('platform', ([platform], schema) => {
        if (platform === exchanges.BINANCE || platform === exchanges.OKX || platform === exchanges.COINBASE)
          return yup.string().required("Api-Key is required");
        return schema;
      }),
  });

  const handleSubmit = async (values) => {

    // console.log("values", values)


    let finalPayload = {
      // name: values.name,
      platform: values.platform,
      apiKey: values.apiKey,
      secretKey: values.secretKey,
    }

    let payload = (selectedExchange === exchanges.BINANCE || selectedExchange === exchanges.COINBASE)
      ? finalPayload
      : values;

    if (values) {
      if (popupMethod === CUSTOMERS.ADD_CUSTOMER) {
        dispatch(CreateCustomer({ ...payload })).then((res) => {
          // console.log("ress", res)
          if (res?.payload?.data?.message === "Customer added successfully") {
            setSuccessfulPopup(true);
            setAddCustomerPopup(false);
            dispatch(GetCustomerDetails())
            setMessage(res?.payload?.data?.message)
          }
        });
      } else {
        dispatch(EditCustomer({ ...payload, id: editCustomerData?._id })).then((res) => {
          // console.log("ress", res)
          if (res?.payload?.data?.message === "Customer updated successfully") {
            setSuccessfulPopup(true);
            dispatch(GetCustomerDetails())
            setMessage(res?.payload?.data?.message);
          }
        });
      }

    }

    // if (responseData?.payload?.status === 200) {
    //   navigate("/profile#account-details")
    //   window.location.reload()
    // }

  };


  const handleClosePopup = () => {
    setAddCustomerPopup(false);
    setEditCustomerData("");
  }

  return (
    <>
      <PopupDetails PopupToggle={addCustomerPopup} classNameProp='addCustomer'>
        <div className='popupinner'>
          <button type='button' className='closebtn' onClick={handleClosePopup}><img src={Closebtn} alt='close btn' /> </button>
          <h2>{popupMethod}</h2>
          <Formik
            initialValues={defaultValue}
            validationSchema={Validate}
            onSubmit={handleSubmit}>

            {({ setFieldValue, errors }) => {

              return <Form>
                <div className="formbox mt-3">
                  <div className='forminnerbox'>
                  <label>{"Name"}</label>
                    <Field
                      name="name"
                      type="name"
                      className={`form-control`}
                      // required

                      disabled
                    />
                   
                  </div>

                  <p className="text-danger  small ">
                    <ErrorMessage name="name" />
                  </p>
                </div>


                <div className="formbox mt-3">
                  <div className='forminnerbox addselectbox'>
                    <label>{"Exchange"}</label>
                    <select
                      name="platform"
                      value={selectedExchange || editCustomerData?.platform}

                      onChange={(e) => {
                        setFieldValue("platform", e.target.value)
                        setSelectedExcahnge(e.target.value)
                      }}
                      // onBlur={field.onBlur}
                      className="form-control"
                    >
                      <option value="" label="Select Exchange" />
                      {exchangesOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-danger  small  mb-0 small">
                      <ErrorMessage name="platform" />
                    </p>
                  </div>
                </div>

                <>

                  {((selectedExchange || editCustomerData?.platform) === exchanges.BINANCE || (selectedExchange || editCustomerData?.platform) === exchanges.COINBASE || (selectedExchange || editCustomerData?.platform) === exchanges.OKX) && <>

                    <div className="formbox mt-3">
                      <div className='forminnerbox'>
                        <Field
                          name="apiKey"
                          type="text"
                          className={`form-control`}
                          required
                        />
                        <label >{"API Key"}</label>
                      </div>

                      <p className="text-danger  small ">
                        <ErrorMessage name="apiKey" />
                      </p>

                    </div>

                    <div className="formbox mt-3">
                      <div className='forminnerbox'>
                        <Field
                          name="secretKey"
                          type="text"
                          className={`form-control`}
                          required
                        />
                        <label >{"Secret Key"}</label>
                      </div>
                      <p className="text-danger  small ">
                        <ErrorMessage name="secretKey" />
                      </p>

                    </div>



                  </>}

                  {(selectedExchange || editCustomerData?.platform) === exchanges.OKX && <div className="formbox mt-3">
                    <div className='forminnerbox'>
                      <Field
                        name="apiPassword"
                        type="text"
                        className={`form-control`}
                        required
                      />
                      <label >{"Api Password"}</label>
                    </div>
                    <p className="text-danger  small ">
                      <ErrorMessage name="apiPassword" />
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