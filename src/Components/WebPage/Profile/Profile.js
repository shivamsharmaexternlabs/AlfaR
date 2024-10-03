import React from 'react'
import Header from '../../Layout/Header'
import Sidebar from '../Sidebar/Sidebar'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Style from './Profile.module.css'


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
      <Header />
      <div className='dasboardpage profilepage'>
        <Sidebar />
        <div className='content'>
          <div className='adminTitle'>
            <h2> Profile </h2>
          </div>

          <div className={`${Style.profileForm}`}>

            <Formik
              initialValues={defaultValue}
              validationSchema={Validate}
              onSubmit={handleSubmit}>

              <Form>
                <div className={`${Style.profileForminner}`}>
                  <h3>Your Details</h3>
                  <div className="formbox mt-3">
                    <div className={`forminnerbox ${Style.forminnerbox}`}>
                      <Field
                        name="name"
                        type="text"
                        className={`form-control`}
                        required
                        autocomplete="off"
                      />
                      <label>Name</label>
                    </div>
                    <span className="text-danger text-small mb-0">
                      <ErrorMessage name="email" />
                    </span>
                  </div>

                  <div className="formbox mt-3">
                    <div className={`forminnerbox ${Style.forminnerbox}`}>
                      <Field
                        name="email"
                        type="text"
                        className={`form-control ${Style.formControl}`}
                        required
                        autocomplete="off"
                      />
                      <label >Email Address</label>
                    </div>
                    <span className="text-danger text-small mb-0">
                      <ErrorMessage name="email" />
                    </span>
                  </div>

                  <h3 className='mt-5'>Change Password</h3>

                  <div className="formbox mt-3">
                    <div className={`forminnerbox ${Style.forminnerbox}`}>
                      <Field
                        name="password"
                        type="password"
                        className={`form-control ${Style.formControl}`}
                        required
                      />
                      <label>Password</label>
                    </div>
                    <span className="text-danger text-small mb-0">
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                  <div className="formbox mt-3">
                    <div className={`forminnerbox ${Style.forminnerbox}`}>
                      <Field
                        name="password"
                        type="password"
                        className={`form-control ${Style.formControl}`}
                        required
                      />
                      <label>Password</label>
                    </div>
                    <span className="text-danger text-small mb-0">
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                  <div className="formbox mt-3">
                    <div className={`forminnerbox ${Style.forminnerbox}`}>
                      <Field
                        name="password"
                        type="password"
                        className={`form-control ${Style.formControl}`}
                        required
                      />
                      <label>Password</label>
                    </div>
                    <span className="text-danger text-small mb-0">
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                </div>

                <div className={`${Style.formBtn}`}>
                <button type="button" className={`${Style.canbtn}`}>
                    {"Cancel"}
                  </button>
                  <button type="submit" className={`${Style.scbtn}`}>
                    {"Save Changes"}
                  </button>                
                </div>
              </Form>
            </Formik>

          </div>
        </div>

      </div>

    </>
  )
}

export default Profile