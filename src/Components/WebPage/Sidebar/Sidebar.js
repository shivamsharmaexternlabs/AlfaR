import React from 'react'
import Style from './Sidebar.module.css'
import { NavLink, useLocation } from "react-router-dom";
import { customerBlack, customerWhite, employeesBlack, employeesWhite, profileBlack, profileWhite, routes } from '../../utils/Constants';

//Sidebar
const Sidebar = () => {
  //Using useLocation Hook to get params from url 
  const param = useLocation();

  return (
    <>
      <div className={`${Style.sidebar} sidebar`}>
        <ul>
          <li className={`${param.pathname === `${routes.ADMIN}` ? "active" : ""}`}><NavLink to={`${routes.ADMIN}`} >
            <img src={`${param.pathname === `${routes.ADMIN}` ? customerWhite : customerBlack}`} alt="customer" height={'20px'} width={'20px'} />
            <span className='ms-2'>{"Customers"}</span>
          </NavLink> </li>
          <li className={`${param.pathname === `${routes.EMPLOYEES}` ? "active" : ""}`}><NavLink to={`${routes.EMPLOYEES}`} >
            <img src={`${param.pathname === `${routes.ADMIN}` ? employeesWhite : employeesBlack}`} alt="customer" height={'20px'} width={'20px'} />
            <span className='ms-2'>{"Employees"}</span>
          </NavLink> </li>
          <li className={`${param.pathname === `${routes.PROFILE}` ? "active" : ""}`}><NavLink to={`${routes.PROFILE}`}  >
            <img src={`${param.pathname === `${routes.ADMIN}` ? profileWhite : profileBlack}`} alt="customer" height={'20px'} width={'20px'} />
            <span className='ms-2'>{"Profile"} </span>
          </NavLink> </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar;