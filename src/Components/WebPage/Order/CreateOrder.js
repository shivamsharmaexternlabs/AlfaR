import React, { useEffect, useState } from 'react'
import DropDownComponent from '../ReusableComponents/DropDownComponent'
import PhoneInput from "react-phone-input-2";
import { Link } from 'react-router-dom'
import icon from '../../Astes/icon7.svg'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as yup from "yup";
import Create from '../DesignPage/Create';
import UploadFile from '../ReusableComponents/UploadFile';
import SignaturePad from '../ReusableComponents/SignaturePad'
import { useDispatch, useSelector } from 'react-redux';
import { CreateOrderSlice, FabricColorsSlice, FabricNameSlice, FabricPrintsSlice, FabricTextureSlice, FabricThicknessSlice } from '../../Redux/slices/OrderApis';


const CreateOrder = () => {


  const [phoneNumber, setPhoneNumber] = useState(false)
  const [dropDownAllData, setdropDownAllData] = useState({
    "fabric": "",
    "texture": "",
    "thickness": "",
    "print": "",
    "color": "",
  })
  const [signnatureFileName, setSignnatureFileName] = useState("")
  const [signnatureFileError, setSignnatureFileError] = useState(true)
  const [uploadFileData, setUploadFileData] = useState("")

  let OrderApisReduxData = useSelector((state) => state?.OrderApisData);



  const dispatch = useDispatch()


  let dattaa = [
    { "lable": "1", "name": "4", "key": "sNew York" },
    { "lable": "2", "name": "5", "key": "sNew York-1" },
    { "lable": "3", "name": "6", "key": "sNew York-2" }
  ]




  const defaultValue = {

    brand: "rebock",
    quantity: "2",
    name: "sam",



  };

  const Validate = yup.object({
    brand: yup.string().required('brand is required'),
    quantity: yup.string().required('quantity is required'),
    name: yup.string().required('name is required'),
  });



  const SelectSearchFun = (data, value) => {

    console.log("ndvcsjdd", value, data)

    // dispatch(FabricNameSlice())



    if (data?.selectType == "Fabric type") {
      if (data?.error !== null) {
        setdropDownAllData({ ...dropDownAllData, fabric: data.value })
      } else {
        setdropDownAllData({ ...dropDownAllData, fabric: "" })
      }
      dispatch(FabricNameSlice({
        "search": value,
        "page": 1,
        "limit": 10
      }))



    }
    if (data?.selectType == "Texture") {
      if (data?.error !== null) {
        setdropDownAllData({ ...dropDownAllData, texture: data.value })
      } else {
        setdropDownAllData({ ...dropDownAllData, texture: "" })
      }
      dispatch(FabricTextureSlice({
        "search": value,
        "page": 1,
        "limit": 10
      }))


    }
    if (data?.selectType == "Thickness") {
      if (data?.error !== null) {
        setdropDownAllData({ ...dropDownAllData, thickness: data.value })
      } else {
        setdropDownAllData({ ...dropDownAllData, thickness: "" })
      }

      dispatch(FabricThicknessSlice({
        "search": value,
        "page": 1,
        "limit": 10
      }))


    }
    if (data?.selectType == "Option for Print") {
      if (data?.error !== null) {
        setdropDownAllData({ ...dropDownAllData, print: data.value })
      } else {
        setdropDownAllData({ ...dropDownAllData, print: "" })
      }
      dispatch(FabricPrintsSlice({
        "search": value,
        "page": 1,
        "limit": 10
      }))

    }
    if (data?.selectType == "Option for color") {

      if (data?.error !== null) {
        setdropDownAllData({ ...dropDownAllData, color: data.value })

      } else {
        setdropDownAllData({ ...dropDownAllData, color: "" })
      }
      dispatch(FabricColorsSlice({
        "search": value,
        "page": 1,
        "limit": 10
      }))

    }



  }


  const handleOnChange = (value, country) => {
    // Extract country code and phone number
    const countryCode = country?.dialCode;
    const phoneNumberWithoutCountryCode = value?.slice(countryCode?.length);

    setPhoneNumber({ countryCode, phoneNumberWithoutCountryCode })


  };


  console.log("ghdxchgsjdjsd",signnatureFileName)

  const handleSubmit = async (values) => {

    let trullyValue = true
    let trullyUploadFile = true

    // Note- this loop will check that all values of dropDownAllData is full fill , if not the returns false  
    Object.entries(dropDownAllData).map(([key, value]) => {
      if (value == "" || signnatureFileName == "") {
        trullyValue = false

      }
      if (signnatureFileName == "") {
        setSignnatureFileError(false)
      }
      else {
        setSignnatureFileError(true)
      }
    });


    if (uploadFileData == "") {
      trullyUploadFile = false
      setUploadFileData(false)
    }
    else {
      trullyUploadFile = true

    }



     

    if (trullyValue == true && trullyUploadFile == true) {
      console.log("dcnmdsdsd", trullyValue,trullyUploadFile)
      let newValue = {
        ...values,
        "phoneNumber": phoneNumber?.phoneNumberWithoutCountryCode,
        "countryCode": phoneNumber?.countryCode,
        ...dropDownAllData,
        "agreementImageUrl": signnatureFileName,
        // "uploadFile":uploadFileData
      }

      console.log("dcnmdsdsd", newValue)

      let responseData = await dispatch(CreateOrderSlice({ ...newValue })); 
      console.log("dcnmdsdsd", newValue,responseData)

      // if (responseData?.payload?.status === 201) { 
      // navigate("/signin")
      // } 


    }

  };


  useEffect(() => {
    const apiCallFun = async () => {

      let data = await dispatch(FabricNameSlice())


    }
    apiCallFun()


  }, [])

  console.log("mdcsjds", uploadFileData)



  return (
    <>
      <div className='orderDetailpage'>
        <h2>Order Details</h2>


        <Formik
          initialValues={defaultValue}
          validationSchema={Validate}
          onSubmit={handleSubmit}
        >
          <div className="login-box">
            <Form>
              <div className="formbox"  >
                <div className='forminnerbox'>
                  <Field
                    name="brand"
                    type="text"
                    className={`form-control `}
                    required
                  />
                  <label>Brand Name</label>
                </div>
                <span className="text-danger mb-0">
                  <ErrorMessage name="brand" />
                </span>
              </div>
              <div className="formbox mt-3"  >
                <div className='forminnerbox'>
                  <Field
                    name="quantity"
                    type="number"
                    className={`form-control `}
                    autoComplete="off"
                    required
                  />
                  <label >Qantity</label>
                </div>
                <span className="text-danger mb-0">
                  <ErrorMessage name="quantity" />
                </span>
              </div>

              <div className="formbox mt-3"  >
                <div className='forminnerbox'>
                  <Field
                    name="name"
                    type="name"
                    className={`form-control `}
                    autoComplete="off"
                    required
                  />
                  <label>Full Name</label>
                </div>
                <span className="text-danger mb-0">
                  <ErrorMessage name="name" />
                </span>
              </div>
              <div className="formbox mt-3"  >
                <div className={`${phoneNumber !== false && phoneNumber !== "" ? "phone-number" : "input-edit"} forminnerbox`}>
                  <PhoneInput

                    placeholder="Phone Number"
                    onChange={handleOnChange}
                    onFocus={setPhoneNumber}
                    required

                  />
                  {phoneNumber && <label>Contact Person Phone</label>}
                </div>
              </div>
              <h2 className='mt-5'>Fabric</h2>

              <div className='selectbox'>
                <DropDownComponent
                  ManageOrderTableSelectorDataProp={OrderApisReduxData?.FabricNameData?.data?.data}
                  newFun={SelectSearchFun}
                  EditTableData={true}
                  placeholder={"Fabric type"}
                  animation={"1"}
                  errorValue={"please Select Fabric type"}
                />
              </div>
              <div className='selectbox'>
                <DropDownComponent
                  ManageOrderTableSelectorDataProp={OrderApisReduxData?.FabricTextureData?.data?.data}
                  newFun={SelectSearchFun}
                  EditTableData={true}
                  placeholder={"Texture"}
                  animation={"2"}
                  errorValue={"please Select Texture "}
                />
              </div>
              <div className='selectbox'>
                <DropDownComponent
                  ManageOrderTableSelectorDataProp={OrderApisReduxData?.FabricThicknessData?.data?.data}
                  newFun={SelectSearchFun}
                  EditTableData={true}
                  placeholder={"Thickness"}
                  animation={"3"}
                  errorValue={"please Select Thickness "}

                />
              </div>
              <div className='selectbox'>
                <DropDownComponent
                  ManageOrderTableSelectorDataProp={OrderApisReduxData?.FabricPrintsData?.data?.data}
                  newFun={SelectSearchFun}
                  EditTableData={true}
                  placeholder={"Option for Print"}
                  animation={"4"}
                  errorValue={"please Select Option for Print"}

                />
              </div>


              <div className='selectbox'>
                <DropDownComponent
                  ManageOrderTableSelectorDataProp={OrderApisReduxData?.FabricColorsData?.data?.data}
                  newFun={SelectSearchFun}
                  EditTableData={true}
                  placeholder={"Option for color"}
                  errorValue={"please Select Option for color"}

                />
              </div>
              <div>
                <h2 className='mt-5'>Techpack</h2>
                <UploadFile
                  setUploadFileData={setUploadFileData}
                  uploadFileData={uploadFileData}
                />
              </div>


              <div>
                <SignaturePad

                  signnatureFileFun={setSignnatureFileName}
                  signnatureFileError={signnatureFileError}
                  setSignnatureFileError={setSignnatureFileError}
                />
              </div>


              <p className='reqtext mt-4'>By clicking Request quote you agree with, <Link to={'/order'}>Terms and Conditions</Link></p>

              <div className='orderDetailbtngroup'>
                <button type='button' className='backorderbtn'><img src={icon} alt="img" /> Back to Home</button>
                <div className=''>
                  <button type='button' className='cancelbtn'>Cancel</button>
                  <button type="submit" className='reqbtn'>Request Quote</button>
                </div>

              </div>
              {/* <div className="text-center">
                <button type="submit" className="signbtn">
                  {"Sign Up"}
                </button>
              </div> */}
            </Form>
          </div>
        </Formik>








      </div>


    </>
  )
}


export default CreateOrder