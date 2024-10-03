import React, { useEffect, useState } from 'react'
import './App.css';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify";
import { Route, Router, Routes } from 'react-router-dom';
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
import { routes } from './Components/utils/Constants';


function App() {
  const TokanValue = localStorage.getItem("Token", false)
  const [loadingValue, setLoadingValue] = useState(false)

  console.log("nsdsdsd", TokanValue)
  useEffect(() => {


    // axios.interceptors.request.use((config) => {


    // // setLoadingValue(true)
    // if(config?.url.includes(`${process.env.REACT_APP_BASE_URL}design?search=`)){

    // }
    // else{
    //   // setLoadingValue(true)
    // }
    // console.log("mbhhsdsd",config?.url.includes(`${process.env.REACT_APP_BASE_URL}design?search=`))

    // },
    //   (error) => {
    //     // return Promise.reject(error)
    //   } 
    // )



    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      console.log("resolved------------before")
      setLoadingValue(true)
      return config;
    }, function (error) {

      return Promise.reject(error);
    });


    axios.interceptors.response.use(
      (response) => {
        setLoadingValue(false)
        console.log("resolved------------resolved")
        // toast.success(response?.data?.message);
        return response;
       }
       ,
      (error) => {
        setLoadingValue(false)
        console.log("resolved+++++++++++++++reject",error)
        toast.error(error?.response?.data?.message);

        if (error?.response?.status == 401) {

          // const myTimeout = setTimeout(sessionStorageClearFun, 2000);
        }
        // return Promise.reject(error);
      }
    );

  }, [])


  return (
    <>
      <LoadingSpinner loadingValue={loadingValue} />
      <Routes>
        <Route path={`${routes.ROOT}`} element={<Signin />} />
        <Route path={`${routes.SIGNUP}`} element={<Signup />} />
        <Route path={`${routes.FORGOT_PASSOWRD}`} element={<Forgot />} />
        <Route path={`${routes.RESET_PASSWORD}`} element={<RestPassword />} />
        <Route path={`${routes.VERIFICTAION}`} element={<Verification />} />
        <Route path={`${routes.ADMIN}`} element={<Admin />} />
        <Route path={`${routes.EMPLOYEES}`} element={<Employees />} />
        <Route path={`${routes.PROFILE}`} element={<Profile />} />        
      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
