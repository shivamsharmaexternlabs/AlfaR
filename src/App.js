import React, { useEffect, useState } from 'react'
import './App.css';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify";
import { Route, Router, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Signin from './Components/Signup/Signin';
import Signup from './Components/Signup/Signup';
import Verification from './Components/Signup/Verification';
import axios from 'axios';
import LoadingSpinner from './Components/WebPage/ReusableComponents/LoadingSpinner';
import GuardedRoute from './Components/RouteGuards/GuardedRoutes';
import Forgot from './Components/Signup/Forgot';
import RestPassword from './Components/Signup/RestPassword';
import Admin from './Components/WebPage/Admin/Admin';
import Employees from './Components/WebPage/Employees/Employees';
import Profile from './Components/WebPage/Profile/Profile';
import { toast } from "react-toastify";
import { roles, routes } from './Components/utils/Constants';
import Layout from './Components/Layout/Layout';
import CustomerContent from './Components/WebPage/Admin/CustomerContent';
import EmployeesContent from './Components/WebPage/Employees/EmployeesContent';
import ProfileContent from './Components/WebPage/Profile/ProfileContent';
import { VerifyTokenCheck } from './Components/Redux/slices/Authorisation';
import { useDispatch } from 'react-redux';
import ResendLink from './Components/Signup/ResendLink';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const TokanValue = localStorage.getItem("Token", false);


  const [loadingValue, setLoadingValue] = useState(false);

  const locationName = useLocation();

  // const accessToken = locationName?.pathname?.split("/")[2] || locationName?.pathname?.split("/")[1];

  console.log("locationName?.pathname", locationName?.pathname)

  const searchParams = new URLSearchParams(locationName.search);
  const accessToken = searchParams.get('token');

  useEffect(() => {
    // Replace with your validation logic

    // Only set the token if the path is valid
    if (accessToken) {
      localStorage.setItem("Token", accessToken);
    }
  }, [locationName?.pathname, accessToken])

  // The token is the last part of the array
  // const token = parts[2];

  console.log("accessToken", accessToken)

  useEffect(() => {
    // Axios request interceptor
    axios.interceptors.request.use(
      function (config) {
        setLoadingValue(true);
        return config;
      },
      function (error) {
        setLoadingValue(false);
        return Promise.reject(error);
      }
    );

    // Axios response interceptor
    axios.interceptors.response.use(
      (response) => {
        console.log("bjkdskbjsd", response)
        if (response?.data?.message === "Link is valid") {
          if (response?.data?.user?.role === "user" && !response?.data?.user?.isPasswordChanged) {
            navigate(routes.ROOT, {
              state: {
                changePasswordScreen: true,
                userData: response?.data?.user
              }
            })
          } else {
            navigate(routes.ROOT)
          }
        }
        setLoadingValue(false);
        return response;
      },
      (error) => {
        setLoadingValue(false);

        // console.log("errsdsd", error)

        // Check for token expiration or 401 status
        if (error?.response?.status === 401) {
          const errorMessage = error?.response?.data?.message;

          toast.error(errorMessage)

          // If token is invalid, handle accordingly
          if (errorMessage === "Token is not valid" || errorMessage === "Token expired") {
            // Optionally dispatch action to clear token or handle logout
            // dispatch(sessionStorageClearFun());

            localStorage.clear();

            // Navigate to reset password or login page

            navigate(routes.RESEND_LINK, {
              state: { currentMessage: error?.response?.data?.data }
            });
          } else {
            // Handle other error cases
            toast.error(errorMessage);
          }
        } else {
          // Handle other errors
          // console.log("yaha")
          // toast.error(error?.response?.data?.message);
        }

        return Promise.reject(error);
      }
    );
  }, [dispatch, navigate]);

  useEffect(() => {
    if (accessToken) {
      let tokenCheckPayload = {
        Token: accessToken
      }
      if (tokenCheckPayload) {
        dispatch(VerifyTokenCheck(tokenCheckPayload))
        // .then((res) => {
        //   console.log("esbhjdsbh", res?.payload?.response?.data?.message)
        //   if (res?.payload?.response?.data?.message === "Token is not valid") {
        //     navigate(routes.RESET_PASSWORD, {
        //       state: {
        //         currentMessage: res?.paylaod?.data
        //       }
        //     })
        //   }
        // else if (res?.payload?.data?.user?.role === roles.ADMIN) {
        //   if (res?.payload?.data?.message === "Link is Valid") {
        //     navigate(routes.RESET_PASSWORD);
        //   } else {

        //   }
        // }

        // })
      }
    }

  }, [accessToken])

  // useEffect(() => {
  //   axios.interceptors.request.use(function (config) {
  //     // Do something before request is sent
  //     // console.log("resolved------------before")
  //     setLoadingValue(true)
  //     return config;
  //   }, function (error) {

  //     return Promise.reject(error);
  //   });


  //   axios.interceptors.response.use(
  //     (response) => {
  //       console.log('response', response)
  //       setLoadingValue(false)
  //       // console.log("resolved------------resolved")
  //       // toast.success(response?.data?.message);
  //       return response;
  //     }
  //     ,
  //     (error) => {
  //       setLoadingValue(false)
  //       // console.log("resolved+++++++++++++++reject", error)
  //       toast.error(error?.response?.data?.message);

  //       if (error?.response?.status == 401) {

  //         // const myTimeout = setTimeout(sessionStorageClearFun, 2000);
  //       }
  //       // return Promise.reject(error);
  //     }
  //   );

  // }, [])






  return (
    <>
      <LoadingSpinner loadingValue={loadingValue} />
      <Routes>
        <Route path={`${routes.ROOT}`} element={<Signin />} />
        <Route path={`${routes.SIGNUP}`} element={<Signup />} />
        <Route path={`${routes.FORGOT_PASSOWRD}`} element={<Forgot />} />
        <Route path={`${routes.RESET_PASSWORD}`} element={<RestPassword />} />
        <Route path={`${routes.VERIFICTAION}`} element={<Verification />} />
        <Route path={`${routes.RESEND_LINK}`} element={<ResendLink />} />
        <Route path={`${routes.ADMIN}`} element={<Layout />}>
          {/* Main Admin page */}
          <Route index element={<Admin />} />
          {/* Nested route */}
          <Route path="customer-content" element={<CustomerContent />} />
        </Route>

        <Route path={`${routes.EMPLOYEES}`} element={<Layout />}>
          {/* Main Employees page */}
          <Route index element={<Employees />} />
          {/* Nested route under Employees */}
          <Route path="employees-content" element={<EmployeesContent />} />
        </Route>

        <Route path={`${routes.PROFILE}`} element={<Layout />}>
          {/* Main Employees page */}
          <Route index element={<Profile />} />
          {/* Nested route under Employees */}
          <Route path="employees-content" element={<ProfileContent />} />
        </Route>


        {/* <Route path={`${routes.EMPLOYEES}`} element={<Employees />} /> */}
        {/* <Route path={`${routes.ADMIN}`} element={<Admin />} /> */}
        {/* <Route path={`${routes.PROFILE}`} element={<Profile />} /> */}

      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
