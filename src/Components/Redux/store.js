import { configureStore } from "@reduxjs/toolkit";
import  signInReducer   from "./slices/Authorisation";
import  userDetailsReducer   from "./slices/UserDetails";
import OrderApis from "./slices/OrderApis";
import DesignApis from "./slices/DesignApis";
import  TogglesValuesReducer  from "./slices/Toggles-Values";
import  employeesSlice  from "./slices/EmployeeSlice";
import  customerSlice  from "./slices/CustomerSlice";
 

export const store = configureStore({
  reducer: {
    SignInApiData: signInReducer, 
     UserApiData:userDetailsReducer,
     OrderApisData:OrderApis,
     DesignApisData:DesignApis,
     TogglesValuesData :TogglesValuesReducer,
     EmployeesApiData :employeesSlice,
     CustomerApiData :customerSlice,
  },
});

