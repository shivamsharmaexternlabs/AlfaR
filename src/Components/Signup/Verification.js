import React, { useEffect, useState } from 'react'
import logoBlack from '../Astes/logoBl.svg'
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { forgetPasswordSlice, VarificationCode } from '../Redux/slices/Authorisation';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../Layout/AuthHeader';
import axios from "axios";

const Verification = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let email = localStorage.getItem("verify-email", false)

  const varifyEmail = localStorage.getItem("verify-email", false)
  // VarificationCode

  console.log(otp.length)

  // useEffect(() => {
  //     if (otp.length === 4) {
  //         dispatch(VarificationCode({otp,email}))
  //     }

  // }, [otp])

  const SubmitOtp = async () => {
    let responseData = await dispatch(VarificationCode({ otp, email }))
    // console.log("mghvdchjsdsd", responseData)
    if (responseData?.payload?.status === 200) {
      localStorage.setItem("Token", responseData?.data?.token);
      localStorage.setItem("UserId", responseData?.data?.data?.userId);
      navigate("/admin")
    }
     

     

  }

  const handleSubmitForgetPassword = async () => {
    let Email = localStorage.getItem("verify-email", false)
    let responseData = await dispatch(forgetPasswordSlice({ "email": Email }));

    // if (responseData.payload.status == 200) {
    //   navigate("/verification")
    // }
  }


  return (
    <>
      <AuthHeader />
      <div className="verifyOuterbox">
        <div className='verifybox'>
          <img src={logoBlack} alt='logoBlack ' />
          <p> Verification code has been sent to {varifyEmail} </p>

          <div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span> </span>}
              renderInput={(props) => <div> <input {...props} placeholder='*' className='otp-class' /> </div>}
            />
          </div>
          <button type='button' className='textlink' onClick={() => { navigate("/") }}> Sign in </button>
          <button type='button' className='textlink' onClick={handleSubmitForgetPassword}> Resend code </button>

          {/* <button type='button' className='textlink'> Resend Code by Phone Call </button>
                <button type='button' className='textlink'> Change Phone Number </button> */}
          <button type='button' className='signbtn' onClick={SubmitOtp}>Submit </button>
        </div>
      </div>


    </>
  )
}

export default Verification