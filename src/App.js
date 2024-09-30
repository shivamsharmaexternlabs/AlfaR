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

        return response;
      },
      (error) => {
        setLoadingValue(false)
        console.log("resolved+++++++++++++++reject")

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
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/resetpassword' element={<RestPassword />} />

        <Route path='/verification' element={<Verification />} />
        {/* <Route path='/profile' element={<Index />} /> */}
        {/* <Route path='/' element={<Home />} /> */}

        <Route element={<GuardedRoute />}>
          {/* <Route path='/design' element={<Design />} />
          <Route path='/order' element={<Order />} /> */}
        </Route>

      </Routes>
      <ToastContainer autoClose={2000} />

      {/* <ContactDetails /> */}

    </>
  );
}

export default App;
