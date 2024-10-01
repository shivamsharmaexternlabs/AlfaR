import { configureStore } from "@reduxjs/toolkit";
import  signInReducer   from "./slices/Authorisation";
import  userDetailsReducer   from "./slices/UserDetails";
import OrderApis from "./slices/OrderApis";
import DesignApis from "./slices/DesignApis";
import  TogglesValuesReducer  from "./slices/Toggles-Values";
 

export const store = configureStore({
  reducer: {
    SignInApiData: signInReducer, 
     UserApiData:userDetailsReducer,
     OrderApisData:OrderApis,
     DesignApisData:DesignApis,
     TogglesValuesData :TogglesValuesReducer
  },
});

