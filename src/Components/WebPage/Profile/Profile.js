import React from 'react'
import Header from '../../Layout/Header'
import Sidebar from '../Sidebar/Sidebar'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Style from './Profile.module.css'
import ProfileContent from './ProfileContent';
import { ChangePassword, ResetPasswordSlice } from '../../Redux/slices/Authorisation';


const Profile = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  let userName = localStorage.getItem('Name');
  let userEmail = localStorage.getItem('Email');
  let roleName = localStorage.getItem('Role');

  const defaultValue = {
    password: "",
    newPassword: "",
    confirmPassword: ""
  };

  const Validate = yup.object({
    password: yup.string().required("Password is required").matches(/^\S*$/, 'Password must not contain spaces'),
    newPassword: yup.string().required("New Password is required").matches(/^\S*$/, 'New Password must not contain spaces'),
    confirmPassword: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Confirm Password must not contain spaces'),
  });

  const handleSubmit = (values) => {
    if (values) {
      dispatch(ChangePassword({ ...values }))
    }

    // if (responseData?.payload?.status === 200) {
    //   navigate("/profile#account-details")
    //   window.location.reload()
    // }
  };


  return (
    <>
      <ProfileContent
        defaultValue={defaultValue}
        Validate={Validate}
        handleSubmit={handleSubmit}
        Style={Style}
        userName={userName}
        userEmail={userEmail}
        roleName={roleName}
      />
    </>
  )
}

export default Profile