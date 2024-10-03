import React from 'react'
import Style from './Sidebar.module.css'
import { NavLink, useLocation } from "react-router-dom";
import { routes } from '../../utils/Constants';

//Sidebar
const Sidebar = () => {
  //Using useLocation Hook to get params from url 
  const param = useLocation();

  return (
    <>
      <div className={`${Style.sidebar} sidebar`}>
        <ul>
          <li className={`${param.pathname === `${routes.ADMIN}` ? "active" : ""}`}><NavLink to={`${routes.ADMIN}`} >  {"Customers"} </NavLink> </li>
          <li className={`${param.pathname === `${routes.EMPLOYEES}` ? "active" : ""}`}><NavLink to={`${routes.EMPLOYEES}`} >  {"Employees"} </NavLink> </li>
          <li className={`${param.pathname === `${routes.PROFILE}` ? "active" : ""}`}><NavLink to={`${routes.PROFILE}`}  > {"Profile"} </NavLink> </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar;