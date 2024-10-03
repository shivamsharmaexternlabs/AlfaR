import React from 'react'
import Header from '../../Layout/Header'
import Sidebar from '../Sidebar/Sidebar'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Style from './Profile.module.css'
import ProfileContent from './ProfileContent';


const Profile = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    let responseData
    // = await dispatch(SignInSlice({ ...values }));
    if (responseData?.payload?.status === 200) {
      navigate("/profile#account-details")
      window.location.reload()
    }
  }


  return (
    <>
      <ProfileContent
        defaultValue={defaultValue}
        Validate={Validate}
        handleSubmit={handleSubmit}
        Style={Style}
      />
    </>
  )
}

export default Profile