import React, { useEffect, useRef, useState } from 'react'
import PopupDetails from './PopupDetails'
import Closebtn from '../Astes/close.svg'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CUSTOMERS, exchanges, exchangesOptions } from '../utils/Constants';
import { CreateCustomer, EditCustomer, GetCustomerDetails } from '../Redux/slices/CustomerSlice';
import { useDispatch } from 'react-redux';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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
  const [selectedExchange, setSelectedExcahnge] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  // console.log("editCustomerData", editCustomerData);

  const defaultValue = {
    // name: editCustomerData?.name === undefined ? "" : editCustomerData?.name,
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
          } else {
            if (res?.payload?.response?.data?.message) {
              setServerErrorMessage(res?.payload?.response?.data?.message)
            }

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectRef = useRef(null); // Ref for the select element

  const handleDropdownClick = (e) => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Detect when the dropdown is closed by clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Whenever selectedExchange is updated, close the dropdown
    if (selectedExchange || editCustomerData?.platform) {
      setIsDropdownOpen(false);
    }
  }, [selectedExchange, editCustomerData]);

  const [open, setOpen] = useState(false);

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

            {({ setFieldValue, errors, touched }) => {

              return <Form>

                {/* <div className="formbox mt-3">
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
                </div> */}

                <div className="mt-4">
                  <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">{"Exchange"}</InputLabel>
                    <Select
                      sx={{ borderRadius: "100px", borderColor: "black", border: "1px solid #E5E6F3",paddingRight:'10px' }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedExchange || editCustomerData?.platform}
                      label="Exchange"
                      onChange={(e) => {
                        setFieldValue("platform", e.target.value)
                        setSelectedExcahnge(e.target.value)
                      }}
                      onMouseDown={(e) => e.stopPropagation()}

                      open={open}
                      onOpen={() => setOpen(true)}
                      onClose={() => setOpen(false)}
                      IconComponent={() => open ? <FaChevronUp /> : <FaChevronDown />}
                    >
                      {exchangesOptions.map((option) => (<MenuItem value={option.value}>{option.name}</MenuItem>
                      ))}

                    </Select>
                  </FormControl>
                </div>


                {/* <div className="formbox mt-3">
                  <div className='forminnerbox addselectbox'>
                    <label>{"Exchange"}</label>
                    <div className="select-wrapper" onClick={()=>console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooo')} style={{ position: "relative" }} ref={selectRef}>
                      <select
                        name="platform"
                        value={selectedExchange || editCustomerData?.platform}

                        onChange={(e) => {
                          setFieldValue("platform", e.target.value)
                          setSelectedExcahnge(e.target.value)
                        }}
                        onClick={(e)=>{ handleDropdownClick()
                          // console.log("bhjsdjsd",e.target)
                          // if(e.target.name==="platform"){
                          //   setIsDropdownOpen(false)
                          // }
                        }}

                        // onFocus={() => {console.log("yaha aaya kya"); setIsDropdownOpen(true)}} // When the dropdown opens
                        // onBlur={() => setIsDropdownOpen(false)} // When the dropdown closes
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
                      <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}>
                        {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </div>
                    <p className="text-danger  small  mb-0 small">
                      <ErrorMessage name="platform" />
                    </p>
                  </div>
                </div> */}

                <>

                  {((selectedExchange || editCustomerData?.platform) === exchanges.BINANCE || (selectedExchange || editCustomerData?.platform) === exchanges.COINBASE || (selectedExchange || editCustomerData?.platform) === exchanges.OKX) && <>

                    <div className="formbox mt-3">
                      <div className={`forminnerbox  ${errors.apiKey && touched.apiKey ? 'border-danger' : ""}`}>
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
                      <div className={`forminnerbox  ${errors.secretKey && touched.secretKey ? 'border-danger' : ""}`}>
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
                    <div className={`forminnerbox  ${errors.apiPassword && touched.apiPassword ? 'border-danger' : ""}`}>
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

                  {(Object.keys(errors).length === 0) ? (serverErrorMessage ? <p className='text-danger small mt-2'>{serverErrorMessage}</p> : <></>) : ""}
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