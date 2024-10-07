import React, { useState } from 'react';
import Style from './Sidebar.module.css';
import { NavLink, useLocation } from "react-router-dom";
import { customerBlack, customerWhite, employeesBlack, employeesWhite, profileBlack, profileWhite, routes } from '../../utils/Constants';

const Sidebar = () => {
  const param = useLocation();

  const isActive = (route) => param.pathname === route;

  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <>
      <div className={`${Style.sidebar} sidebar`}>
        <ul>
          <li className={isActive(`${routes.ADMIN}`) ? "active" : ""}>
            <NavLink
              to={`${routes.ADMIN}`}
              onMouseEnter={() => setHoveredItem('ADMIN')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img
                className='img-nav'
                src={isActive(`${routes.ADMIN}`) || hoveredItem === 'ADMIN' ? customerWhite : customerBlack}
                alt="customer"
                height={'20px'}
                width={'20px'}
              />
              <span className='ms-2'>{"Customers"}</span>
            </NavLink>
          </li>
          <li className={isActive(`${routes.EMPLOYEES}`) ? "active" : ""}>
            <NavLink
              to={`${routes.EMPLOYEES}`}
              onMouseEnter={() => setHoveredItem('EMPLOYEES')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img
                className='img-nav'
                src={isActive(`${routes.EMPLOYEES}`) || hoveredItem === 'EMPLOYEES' ? employeesWhite : employeesBlack}
                alt="employees"
                height={'20px'}
                width={'20px'}
              />
              <span className='ms-2'>{"Employees"}</span>
            </NavLink>
          </li>
          <li className={isActive(`${routes.PROFILE}`) ? "active" : ""}>
            <NavLink
              to={`${routes.PROFILE}`}
              onMouseEnter={() => setHoveredItem('PROFILE')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img
                className='img-nav'
                src={isActive(`${routes.PROFILE}`) || hoveredItem === 'PROFILE' ? profileWhite : profileBlack}
                alt="profile"
                height={'20px'}
                width={'20px'}
              />
              <span className='ms-2'>{"Profile"}</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
